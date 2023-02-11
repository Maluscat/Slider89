'use strict';
import Slider89 from './Slider89.js';

export default class Slider89StructureParser {
  // ---- Static properties ----
  // Static initialization blocks don't work with my current workflow
  static regex = (function() {
    const reg = {
      attr: {
        name: '[\\w-]+'
      },
      all: '[\\d\\D]',
      capName: '([\\w-]+)',
    };
    reg.attr.value = '(?:(?!<)' + reg.all + ')*?';
    reg.tagType = '(?:\\s+' + reg.capName + ')?';
    reg.content = '(?:\\s+"(' + reg.all + '+?)")?';
    reg.attribs = '(?:\\s+' + reg.attr.name + '=\\[' + reg.attr.value + '\\])*';
    reg.varContent = '\\$((?:\\w+(?:\\.(?=\\w))?)+)';

    const rgx = {
      variable: '\\{' + reg.varContent + '\\}|' + reg.varContent,
      attributes: '(' + reg.attr.name + ')=\\[(' + reg.attr.value + ')\\](?:\\s+|$)',
      tag: '<([/:])?' + reg.capName + reg.tagType + reg.content + '(' + reg.attribs + ')\\s*?>\\s*'
    };

    const finalExpressions = {};
    // ES5 can't `new RegExp` from another RegExp
    for (let expr in rgx) {
      finalExpressions[expr] = new RegExp(rgx[expr], 'g');
    }
    finalExpressions.variableNoFlag = new RegExp(rgx.variable);

    return finalExpressions;
  }());


  // ---- Properties ----
  structureVars = {};
  vals;


  constructor(vals) {
    this.vals = vals;
  }


  // ---- Structure parser ----
  parseStructure(structureStr) {
    const node = {
      slider: document.createElement('div')
    };

    const variables = {};

    structureStr = structureStr.trim();

    // Reset the global RegExp-internal `lastIndex` flag
    // This would otherwise clash with multiple slider instances, because the regexes are global
    for (const regexpName in Slider89StructureParser.regex) {
      if (Slider89StructureParser.regex[regexpName].global) {
        Slider89StructureParser.regex[regexpName].lastIndex = 0;
      }
    }

    const stack = new Array();
    let currentIndex = 0;
    let match;
    // match: [matchedStr, type, name, tag, innerContent, attributes]
    while (match = Slider89StructureParser.regex.tag.exec(structureStr)) {
      if (match.index !== currentIndex) {
        this.parseError(
          'tag ‘<' + (match[1] || '') + match[2] + '>’',
          structureStr.slice(currentIndex, match.index).trim()
        );
      }
      currentIndex = Slider89StructureParser.regex.tag.lastIndex;

      if (match[1] !== '/') {
        const elem = this.assembleElement(node, match[2], match[3], match[4], match[5]);
        node[match[2]] = elem;
        node[stack[stack.length - 1] || 'slider'].appendChild(elem);
        if (match[1] == null) {
          stack.push(match[2]);
        }
      } else {
        const lastItem = stack.pop();
        if (lastItem !== match[2]) {
          if (stack.indexOf(match[2]) !== -1) {
            this.closingTagError(lastItem);
          } else {
            propError('structure', "the closing tag ‘</" + match[2] + ">’ couldn't find a matching opening tag");
          }
        }
      }
    }

    if (currentIndex !== structureStr.length) {
      this.parseError('end of string', structureStr.slice(currentIndex));
    }
    if (stack.length > 1) {
      propError('structure', "couldn't find a matching closing tag for following elements:" + Slider89.arrayToListString(stack));
    } else if (stack.length === 1) {
      this.closingTagError(stack[0]);
    }

    return node;
  }

  assembleElement(node, name, tag, content, attributes) {
    if (name in node) {
      this.propError('structure', 'Every element must have a unique name but there are mutiple elements called ‘' + name + '’');
    }
    const elem = document.createElement(tag || 'div');
    // Content with variables gets added after parseStructure, due to unavailability of some properties
    if (!this.registerVariables(content, elem, false)) {
      elem.textContent = content;
    }
    if (attributes) {
      let match;
      while (match = Slider89StructureParser.regex.attributes.exec(attributes)) {
        const attribName = match[1];
        let value = match[2];
        if (!this.registerVariables(value, elem, attribName)) {
          elem.setAttribute(attribName, value);
        }
      }
    }
    return elem;
  }

  registerVariables(str, elem, attribName) {
    // Need to use a RegExp without /g/ because the internal `lastIndex` counter would clash with the `exec` below
    if (Slider89StructureParser.regex.variableNoFlag.test(str)) {
      // Memorize & skip already handled variables for the current string
      const cache = {};
      let match;
      while (match = Slider89StructureParser.regex.variable.exec(str)) {
        const varName = match[1] || match[2];
        const propName = varName.indexOf('.') !== -1 ? varName.slice(0, varName.indexOf('.')) : varName;
        if (!cache.hasOwnProperty(propName)) {
          if (!Object.prototype.hasOwnProperty.call(this.vals, propName)) {
            this.propError('structure', "‘" + propName + "’ is not a recognized property and cannot be used as variable. Please check its spelling or initialize it in the constructor");
          }

          if (this.structureVars[propName] == null) this.structureVars[propName] = new Array();
          const item = {
            str: str,
            elem: elem
          };
          if (attribName) item.attr = attribName;
          this.structureVars[propName].push(item);

          cache[propName] = item;
        }
      }
      return true;
    }
    return false;
  }


  // ---- Error functions ----
  parseError(endPoint, failedStructure) {
    propError('structure',
      "something has been declared wrongly and couldn't be parsed. Point of failure before " +
      endPoint + ":\n  " + failedStructure + '\n');
  }
  closingTagError(tagName) {
    propError('structure',
      "couldn't find a matching closing tag for the element ‘<" + tagName + ">’ (Should it be a self-closing tag marked with ‘:’?)");
  }
}
