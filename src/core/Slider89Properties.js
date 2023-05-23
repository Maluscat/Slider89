'use strict';
import Slider89 from './Slider89.js';
import Slider89Events from './Slider89Events.js';
import Slider89StructureParser from './Slider89StructureParser.js';

export default class Slider89Properties extends Slider89Events {
  // ------ Object definition ------
  defineDeepProperty(target, item, endpoint, postSetter, isDeepDefinedArray) {
    Object.defineProperty(target, item, {
      set: (val) => {
        if (!this.initial) {
          var prevVal = (isDeepDefinedArray ? Array.from(this[item]) : this[item]);
        }
        endpoint[item] = val;
        if (isDeepDefinedArray) {
          // The endpoints (see doc comment at the start of file) are defined from bottom to top
          // This ensures compatibility with getters/setters
          this.defineDeepArrayIntermediateVals(item, val);
          this.defineDeepArrayIntermediateThis(item, val, this.properties[item].keySetter, this.properties[item].keyGetter);
          this.handleInternalDeepArrayChange(item, prevVal, val);
        } else {
          this.handleInternalPropertyChange(item, prevVal);
        }
        if (postSetter) {
          postSetter(val, prevVal);
        }
      },
      get: () => {
        return (isDeepDefinedArray ? this.vals.$intermediateVals : endpoint)[item];
      },
      enumerable: true
    });
  }

  // ------ Object definitions for the keys/indexes of deeply defined arrays ------
  defineDeepArrayIntermediateThis(parentItem, parentValue, keySetter, keyGetter) {
    const endpoint = this.vals;

    this.vals.$intermediateThis[parentItem] = [];
    for (let i = 0; i < parentValue.length; i++) {
      const value = parentValue[i];

      Object.defineProperty(this.vals.$intermediateThis[parentItem], i, {
        set: function(val) {
          if (!keySetter || !keySetter(val, i)) {
            endpoint[parentItem][i] = val;
          }
        },
        get: function() {
          return (keyGetter ? keyGetter(endpoint[parentItem][i], i) : endpoint[parentItem][i]);
        },
        enumerable: true
      });
      // This assignment is necessary to invoke a potential keySetter (e.g. from `values`)
      this.vals.$intermediateThis[parentItem][i] = parentValue[i];
    }
  }
  defineDeepArrayIntermediateVals(parentItem, parentValue) {
    const endpoint = this.vals.$;

    this.vals.$intermediateVals[parentItem] = [];
    for (let i = 0; i < parentValue.length; i++) {
      const value = parentValue[i];

      Object.defineProperty(this.vals.$intermediateVals[parentItem], i, {
        set: (val) => {
          if (!this.initial) {
            var prevVal = Array.from(this[parentItem]);
          }
          endpoint[parentItem][i] = val;
          this.handleInternalDeepArrayChange(parentItem, prevVal, null, i);
        },
        get: () => {
          return endpoint[parentItem][i];
        },
        enumerable: true
      });
    }
  }


  // ------ Property change tracking ------
  // `that` items are compared to accomodate for getters (e.g. `value` (precision))
  handleInternalPropertyChange(item, prevVal) {
    // Object types (arrays included) always invoke a variable update
    // due to inability to deeply compare them (efficiently)
    if (!this.initial && (typeof this[item] === 'object' || prevVal !== this[item])) {
      this.updatePotentialStructureVar(item);
      this.invokeEvent(['change:' + item], prevVal);
    }
  }
  handleInternalDeepArrayChange(item, prevVal, val, deepDefinedIndex) {
    if (!this.initial) {
      this.updatePotentialStructureVar(item);
      if (deepDefinedIndex != null) {
        this.invokeDeepArrayChangeEvent(item, prevVal, deepDefinedIndex);
      } else {
        for (let i = 0; i < val.length; i++) {
          this.invokeDeepArrayChangeEvent(item, prevVal, i);
        }
      }
    }
  }

  invokeDeepArrayChangeEvent(item, prevVal, deepDefinedIndex) {
    if (prevVal[deepDefinedIndex] !== this[item][deepDefinedIndex]) {
      this.invokeEvent(['change:' + item], prevVal, deepDefinedIndex);
    }
  }

  // ---- Structure variables ----
  updatePotentialStructureVar(propName) {
    if (!Object.prototype.hasOwnProperty.call(this.domBuilder.structureVars, propName)) return;

    for (const [ str, nodeList ] of Object.entries(this.domBuilder.structureVars[propName])) {
      this.replaceStructureVarStringInNodes(str, nodeList);
    }

    if (Object.prototype.hasOwnProperty.call(Slider89StructureParser.specialVariableProxy, propName)) {
      for (const varName of Slider89StructureParser.specialVariableProxy[propName]) {
        this.updatePotentialStructureVar(varName);
      }
    }
  }

  replaceStructureVarStringInNodes(str, nodeList) {
    for (const node of nodeList) {
      // Special case: Iterate over every thumb
      const baseName = this.domBuilder.nodeHasBaseElementOwner(node);
      if (baseName) {
        const elements = this.vals.node[baseName];
        if (node.nodeType === Node.ATTRIBUTE_NODE) {
          elements.forEach(element => {
            element.getAttributeNode(node.name).textContent =
              this.getReplacedStructureStr(str, element);
          });
        } else {
          // The text node is always the first child
          elements.forEach(element => {
            element.childNodes[0].textContent =
              this.getReplacedStructureStr(str, element);
          });
        }
      } else {
        const element = Slider89StructureParser.getNodeOwner(node);
        node.textContent = this.getReplacedStructureStr(str, element);
      }
    }
  }

  getReplacedStructureStr(str, node) {
    return str.replace(Slider89StructureParser.regex.variable, (match, variableDelimit, variable) => {
      return this.getValueFromStructureVar(variableDelimit || variable, node);
    });
  }

  getValueFromStructureVar(varName, node) {
    const recursiveVar = varName.split('.');
    let value;
    if (recursiveVar[0] in Slider89StructureParser.specialVariables) {
      value = Slider89StructureParser.specialVariables[recursiveVar[0]].getter(node, this);
    } else {
      value = this[recursiveVar[0]];
    }
    if (recursiveVar.length > 1) {
      for (let i = 1; i < recursiveVar.length; i++) {
        try {
          value = value[recursiveVar[i]];
        } catch (e) {
          throw new Slider89.StructureError("Variable ‘" + varName + "’ cannot access property ‘" + recursiveVar[i] + "’ on " + value);
        }
      }
    }
    return value;
  }
}
