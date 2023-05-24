'use strict';
import Slider89 from './Slider89.js';

/**
 * @typedef {Object} SpecialVariableData
 * @prop { (node: HTMLElement, slider?: Slider89) => any } getter
 * @prop { string } [mandatoryTag]
 */

export default class Slider89StructureParser {
  // ---- Static properties ----
  /**
   * Special variables inside the structure system.
   * Instead of being linked to properties, these can call arbitrary functions.
   * @type { Record<string, SpecialVariableData>  }
   */
  static specialVariables = {
    tag_node: {
      getter: node => node
    },
    thumb_index: {
      mandatoryTag: 'thumb',
      getter: (node, slider) => slider.node.thumb.indexOf(node)
    },
    thumb_value: {
      mandatoryTag: 'thumb',
      getter: (node, slider) => slider.values[slider.node.thumb.indexOf(node)]
    },
  };
  /**
   * Links {@link specialVariables} to potential slider properties they depend on,
   * so that the special variables get updated when the property updates.
   * @type { Record<string, string[]> }
   */
  static specialVariableProxy = {
    values: [ 'thumb_index', 'thumb_value' ]
  };

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
  thumbChildren = [];

  vals;


  constructor(vals) {
    this.vals = vals;
  }


  // ---- Structure parser ----
  parseStructure(structureStr) {
    const node = {
      slider: document.createElement('div')
    };

    structureStr = structureStr.trim();

    // Reset the global RegExp-internal `lastIndex` flag
    // This would otherwise clash with multiple slider instances, because the regexes are global
    for (const regexpName in Slider89StructureParser.regex) {
      if (Slider89StructureParser.regex[regexpName].global) {
        Slider89StructureParser.regex[regexpName].lastIndex = 0;
      }
    }

    const stack = [];
    let currentIndex = 0;
    let match;
    // match: [matchedStr, type, name, tag, innerContent, attributes]
    while (match = Slider89StructureParser.regex.tag.exec(structureStr)) {
      if (match.index !== currentIndex) {
        const beforeFailure = 'tag ‘<' + (match[1] || '') + match[2] + '>’';
        const pointOfFailure = structureStr.slice(currentIndex, match.index).trim();
        throw new Slider89.StructureParseError(beforeFailure, pointOfFailure);
      }
      currentIndex = Slider89StructureParser.regex.tag.lastIndex;

      if (match[1] !== '/') {
        const elem = this.assembleElement(node, match[2], match[3], match[4], match[5]);
        node[match[2]] = elem;
        node[stack[stack.length - 1] || 'slider'].appendChild(elem);

        // This detects thumb children (Because it's called BEFORE 'thumb' is pushed onto the stack)
        if (stack.includes('thumb')) {
          this.thumbChildren.push(match[2]);
        }

        if (match[1] == null) {
          stack.push(match[2]);
        }
      } else {
        const lastItem = stack.pop();
        if (lastItem !== match[2]) {
          if (stack.indexOf(match[2]) !== -1) {
            this.closingTagError(lastItem);
          } else {
            throw new Slider89.StructureError(
              "The closing tag ‘</" + match[2] + ">’ couldn't find a matching opening tag");
          }
        }
      }
    }

    if (currentIndex !== structureStr.length) {
      throw new Slider89.StructureParseError('end of string', structureStr.slice(currentIndex));
    }
    if (stack.length > 1) {
      throw new Slider89.StructureError(
        "Couldn't find a matching closing tag for following elements:" + Slider89.arrayToListString(stack));
    } else if (stack.length === 1) {
      this.closingTagError(stack[0]);
    }

    return node;
  }

  assembleElement(node, name, tag, content, attributes) {
    if (name in node) {
      throw new Slider89.StructureError(
        'Every element must have a unique name but there are mutiple elements called ‘' + name + '’');
    }
    const elem = document.createElement(tag || 'div');

    if (content != null) {
      const textNode = document.createTextNode(content);
      textNode.textContent = content;
      elem.appendChild(textNode);

      if (Slider89StructureParser.stringHasVariable(content)) {
        this.parseVariables(content, textNode, name);
      }
    }

    if (attributes) {
      let match;
      while (match = Slider89StructureParser.regex.attributes.exec(attributes)) {
        const attribName = match[1];
        const attribValue = match[2];

        const attribNode = document.createAttribute(attribName);
        attribNode.textContent = attribValue;
        elem.setAttributeNode(attribNode);

        if (Slider89StructureParser.stringHasVariable(attribValue)) {
          this.parseVariables(attribValue, attribNode, name);
        }
      }
    }

    return elem;
  }

  // ---- Structure variables register ----
  parseVariables(str, targetNode, tagName) {
    // Memorize & skip already handled variables for the current string
    const propNameCache = new Array();
    let match;
    while (match = Slider89StructureParser.regex.variable.exec(str)) {
      const varName = match[1] || match[2];
      const propName = varName.indexOf('.') !== -1
        ? varName.slice(0, varName.indexOf('.'))
        : varName;

      if (!propNameCache.hasOwnProperty(propName)) {
        if (!Object.prototype.hasOwnProperty.call(this.vals, propName)
            && !Slider89StructureParser.checkForSpecialVariables(propName, tagName)
        ) {
          throw new Slider89.StructureError(
            "‘" + propName + "’ is not a recognized property and cannot be used as variable. Please check its spelling or initialize it in the constructor");
        }

        this.registerVariable(propName, str, targetNode);

        propNameCache.push(propName);
      }
    }
  }

  registerVariable(propName, str, targetNode) {
    if (this.structureVars[propName] == null) {
      this.structureVars[propName] = {}
    }
    if (this.structureVars[propName][str] == null) {
      this.structureVars[propName][str] = new Array();
    }
    this.structureVars[propName][str].push(targetNode);
  }


  // ---- Error helpers ----
  closingTagError(tagName) {
    throw new Slider89.StructureError(
      "Couldn't find a closing tag for the element ‘<" + tagName + ">’ (Should it be a self-closing tag marked with ‘:’?)");
  }


  // ---- Static helpers ----
  static getNodeOwner(node) {
    return node.ownerElement || node.parentElement;
  }

  static stringHasVariable(str) {
    // Need to use a RegExp without /g/ because the internal `lastIndex` mustn't be advanced by a mere test
    return Slider89StructureParser.regex.variableNoFlag.test(str);
  }

  static checkForSpecialVariables(varName, tagName) {
    if (Object.prototype.hasOwnProperty.call(Slider89StructureParser.specialVariables, varName)) {
      const varData = Slider89StructureParser.specialVariables[varName];
      if ('mandatoryTag' in varData && varData.mandatoryTag !== tagName) {
        throw new Slider89.StructureError(
          "The variable ‘$" + varName + "’ may only be used inside the ‘<" + varData.mandatoryTag + ">’ tag (It was found in ‘<" + tagName + ">’)");
      }
      return true;
    }
    return false;
  }
}
