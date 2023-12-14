import type { Properties } from './Slider89Base';
import type { VariableName } from './Slider89StructureParser';
import Slider89 from './Slider89';
import Slider89Events from './Slider89Events';
import Slider89DOMBuilder from './Slider89DOMBuilder';
import Slider89StructureParser from './Slider89StructureParser';


export default class Slider89DOMVariables extends Slider89DOMBuilder {
  slider: Slider89;


  constructor(
    slider: Slider89,
    vals: Properties.Vals,
    thumbEvents: Record<string, EventListenerOrEventListenerObject>
  ) {
    super(vals, thumbEvents);
    this.slider = slider;
  }
  

  updatePotentialVariable(propName: VariableName) {
    if (!Object.prototype.hasOwnProperty.call(this.structureVars, propName)) return;

    for (const [ str, nodeList ] of Object.entries(this.structureVars[propName])) {
      this.replaceVariableStringInNodes(str, nodeList);
    }

    if (Object.prototype.hasOwnProperty.call(Slider89StructureParser.specialVariableProxy, propName)) {
      for (const varName of Slider89StructureParser.specialVariableProxy[propName]) {
        this.updatePotentialVariable(varName);
      }
    }
  }
  updateAllVariables() {
    if (this.vals.structure !== false) {
      for (const variable in this.structureVars) {
        this.updatePotentialVariable(variable as VariableName);
      }
    }
  }

  expandAllBaseElementVariables() {
    for (const [ propName, varStrings ] of Object.entries(this.structureVarThumbStrings)) {
      for (const varString of varStrings) {
        const nodeList = this.structureVars[propName][varString];
        this.replaceVariableStringInNodes(varString, nodeList);
      }
    }
  }

  // ---- Helper functions ----
  replaceVariableStringInNodes(str: string, nodeList: Node[]) {
    for (const [ element, node, baseName ] of this.#iterateVariableNodeList(nodeList)) {
      node.textContent =
        str.replace(Slider89StructureParser.regex.variable, (match, variableDelimit, variable) => {
          return this.getValueFromVariableName(variableDelimit || variable, element, baseName);
        });
    }
  }

  getValueFromVariableName(
    fullVar: VariableName,
    element: Element,
    baseName: string | false
  ): Properties.WithCustom[keyof Properties.WithCustom] {
    const varIterator = fullVar.split('.').values();
    const initialVarName = varIterator.next().value;
    let value: Properties.WithCustom[keyof Properties.WithCustom];

    if (initialVarName in Slider89StructureParser.specialVariables) {
      const specialVarData = Slider89StructureParser.specialVariables[initialVarName];
      value = specialVarData.getter(element, this.slider, baseName);
    } else {
      value = this.slider[initialVarName];
    }

    for (const varName of varIterator) {
      try {
        value = value[varName];
      } catch (e) {
        throw new Slider89.StructureError("Variable ‘" + fullVar + "’ cannot access property ‘" + varName + "’ on " + value);
      }
    }
    return value;
  }

  *#iterateVariableNodeList(nodeList: Node[]): IterableIterator<[ Element, Node, string | false ]> {
    for (const node of nodeList) {
      // Special case: Iterate over every thumb
      const baseName = this.nodeHasBaseElementOwner(node);
      if (baseName) {
        const elements = this.vals.nodes[baseName];

        if (node.nodeType === Node.ATTRIBUTE_NODE) {
          for (const element of elements) {
            yield [ element, element.getAttributeNode((node as Attr).name), baseName ];
          }
        } else {
          for (const element of elements) {
            // The text node is always the first child
            yield [ element, element.childNodes[0], baseName ];
          }
        }
      } else {
        const element = Slider89DOMBuilder.getNodeOwner(node);
        yield [ element, node, baseName ];
      }
    }
  }
}
