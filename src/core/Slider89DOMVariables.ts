import type { Properties } from './Slider89Base';
import type { VariableName } from './Slider89StructureParser';
import Slider89 from './Slider89';
import Slider89Events from './Slider89Events';
import Slider89DOMBuilder from './Slider89DOMBuilder';
import Slider89StructureParser from './Slider89StructureParser';


export default class Slider89Variables extends Slider89DOMBuilder {
  slider: Slider89;


  constructor(
    slider: Slider89,
    vals: Properties.Vals,
    thumbEvents: Record<string, EventListenerOrEventListenerObject>
  ) {
    super(vals, thumbEvents);
    this.slider = slider;
  }
  

  updatePotentialStructureVar(propName: VariableName) {
    if (!Object.prototype.hasOwnProperty.call(this.structureVars, propName)) return;

    for (const [ str, nodeList ] of Object.entries(this.structureVars[propName])) {
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

  *iterateStructureVarNodeList(nodeList: Node[]): IterableIterator<[ Element, Node, string | false ]> {
    for (const node of nodeList) {
      // Special case: Iterate over every thumb
      const baseName = this.nodeHasBaseElementOwner(node);
      if (baseName) {
        const elements = this.vals.node[baseName];

        if (node.nodeType === Node.ATTRIBUTE_NODE) {
          for (const element of elements as Element[]) {
            yield [ element, element.getAttributeNode((node as Attr).name), baseName ];
          };
        } else {
          for (const element of elements as Element[]) {
            // The text node is always the first child
            yield [ element, element.childNodes[0], baseName ];
          };
        }
      } else {
        const element = Slider89DOMBuilder.getNodeOwner(node);
        yield [ element, node, baseName ];
      }
    }
  }

  getValueFromStructureVar(
    varName: VariableName,
    element: Element,
    baseName: string | false
  ): Properties.WithCustom[keyof Properties.WithCustom] {
    const recursiveVar = varName.split('.');
    let value: Properties.WithCustom[keyof Properties.WithCustom];
    if (recursiveVar[0] in Slider89StructureParser.specialVariables) {
      value = Slider89StructureParser.specialVariables[recursiveVar[0]].getter(element, this.slider, baseName);
    } else {
      value = this.slider[recursiveVar[0]];
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
