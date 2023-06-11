'use strict';
import type { Properties } from 'Slider89Base';
import type { EventType } from 'Slider89Events';
import type { VariableName } from 'Slider89StructureParser';
import Slider89 from './Slider89';
import Slider89Events from './Slider89Events';
import Slider89StructureParser from './Slider89StructureParser';


namespace DeepKey {
  export type Type<Prop extends keyof Properties.Deep> = Properties.Deep[Prop][number];

  export type Setter<Prop extends keyof Properties.Deep> =
    (val: Type<Prop>, index: number) => void | boolean;

  export type Getter<Prop extends keyof Properties.Deep> =
    (val: Type<Prop>, index: number) => typeof val;
}


export default class Slider89Properties extends Slider89Events {
  // ------ Object definition ------
  defineDeepProperty(
    target: Object,
    item: keyof Properties.WithCustom,
    endpoint: Properties.Vals[keyof Properties.Vals],
    postSetter?: (val: Properties.WithCustom[typeof item], prevVal: typeof val) => void | boolean,
    isDeepDefinedArray?: boolean
  ) {
    Object.defineProperty(target, item, {
      set: (val) => {
        if (!this.initial) {
          var prevVal = (isDeepDefinedArray ? Array.from(this[item]) : this[item]);
        }
        endpoint[item] = val;
        if (isDeepDefinedArray) {
          const outline = this.properties[item];
          // The endpoints (see doc comment at the start of file) are defined from bottom to top
          // This ensures compatibility with getters/setters
          this.defineDeepArrayIntermediateVals(item as keyof Properties.Deep, val);
          this.defineDeepArrayIntermediateThis(item as keyof Properties.Deep, val, outline.keySetter, outline.keyGetter);
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
  defineDeepArrayIntermediateThis(
    parentItem: keyof Properties.Deep,
    parentValue: Properties.Deep[typeof parentItem],
    keySetter?: DeepKey.Setter<typeof parentItem>,
    keyGetter?: DeepKey.Getter<typeof parentItem>
  ) {
    const endpoint = this.vals;

    // @ts-ignore (Only setup)
    this.vals.$intermediateThis[parentItem] = [];
    for (let i = 0; i < parentValue.length; i++) {
      const value = parentValue[i];

      Object.defineProperty(this.vals.$intermediateThis[parentItem], i, {
        set: (val: DeepKey.Type<typeof parentItem>) => {
          if (!keySetter || !keySetter(val, i)) {
            endpoint[parentItem][i] = val;
          }
        },
        get: () => {
          return (keyGetter ? keyGetter(endpoint[parentItem][i], i) : endpoint[parentItem][i]);
        },
        enumerable: true
      });
      // This assignment is necessary to invoke a potential keySetter (e.g. from `values`)
      this.vals.$intermediateThis[parentItem][i] = parentValue[i];
    }
  }
  defineDeepArrayIntermediateVals(
    parentItem: keyof Properties.Deep,
    parentValue: Properties.Deep[typeof parentItem]
  ) {
    const endpoint = this.vals.$;

    // @ts-ignore (Only Setup)
    this.vals.$intermediateVals[parentItem] = [];
    for (let i = 0; i < parentValue.length; i++) {
      const value = parentValue[i];

      Object.defineProperty(this.vals.$intermediateVals[parentItem], i, {
        set: (val: DeepKey.Type<typeof parentItem>) => {
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
  handleInternalPropertyChange(
    item: keyof Properties.WithCustom,
    prevVal?: Properties.WithCustom[typeof item]
  ) {
    // Object types (arrays included) always invoke a variable update
    // due to inability to deeply compare them (efficiently)
    if (!this.initial && (typeof this[item] === 'object' || prevVal !== this[item])) {
      this.updatePotentialStructureVar(item);
      this.invokeEvent(['change:' + item] as EventType.Base[], prevVal);
    }
  }
  handleInternalDeepArrayChange(
    item: keyof Properties.WithCustom,
    prevVal: Properties.WithCustom[typeof item],
    val: Properties.WithCustom[typeof item],
    deepDefinedIndex?: number
  ) {
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

  invokeDeepArrayChangeEvent(
    item: keyof Properties.WithCustom,
    prevVal: Properties.WithCustom[typeof item],
    deepDefinedIndex: number
  ) {
    if (prevVal[deepDefinedIndex] !== this[item][deepDefinedIndex]) {
      this.invokeEvent(['change:' + item] as EventType.Base[], prevVal, deepDefinedIndex);
    }
  }

  // ---- Structure variables ----
  updatePotentialStructureVar(propName: VariableName) {
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

  replaceStructureVarStringInNodes(str: string, nodeList: Node[]) {
    for (const [ element, node, baseName ] of this.iterateStructureVarNodeList(nodeList)) {
      node.textContent =
        str.replace(Slider89StructureParser.regex.variable, (match, variableDelimit, variable) => {
          return this.getValueFromStructureVar(variableDelimit || variable, element, baseName);
        });
    }
  }

  *iterateStructureVarNodeList(nodeList: Node[]) {
    for (const node of nodeList) {
      // Special case: Iterate over every thumb
      const baseName: string = this.domBuilder.nodeHasBaseElementOwner(node);
      if (baseName) {
        const elements = this.vals.node[baseName];

        if (node.nodeType === Node.ATTRIBUTE_NODE) {
          for (const element of elements as Element[]) {
            yield [ element, element.getAttributeNode(node.name), baseName ];
          };
        } else {
          for (const element of elements as Element[]) {
            // The text node is always the first child
            yield [ element, element.childNodes[0], baseName ];
          };
        }
      } else {
        const element = Slider89StructureParser.getNodeOwner(node);
        yield [ element, node, baseName ];
      }
    }
  }

  getValueFromStructureVar(
    varName: VariableName,
    element: Element,
    baseName: string
  ): Properties.WithCustom[keyof Properties.WithCustom] {
    const recursiveVar = varName.split('.');
    let value: Properties.WithCustom[keyof Properties.WithCustom];
    if (recursiveVar[0] in Slider89StructureParser.specialVariables) {
      value = Slider89StructureParser.specialVariables[recursiveVar[0]].getter(element, this, baseName);
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
