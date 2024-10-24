'use strict';
import type { Properties, PropertyNode } from '../Base';
import type { VariableName } from './StructureParser';
import { StructureParser } from './StructureParser';

type VariableThumbStrings = Partial<Record<VariableName, string[]>>;

export type AccessibilityVals = Pick<Properties.Base, 'range' | 'value' | 'orientation'>;

export class DOMBuilder extends StructureParser {
  /** A basic thumb node used for cloning. */
  thumbBase: HTMLDivElement;
  thumbParent: HTMLElement;

  baseElements: Record<string, HTMLElement> = {};

  /**
   * Keeps track of structure variables and their respective variable strings
   * which are used in the thumb and its descendants.
   */
  structureVarThumbStrings: VariableThumbStrings = {};

  thumbEvents: Record<string, EventListenerOrEventListenerObject> = {};


  constructor(
    vals: Properties.Vals,
    thumbEvents: Record<string, EventListenerOrEventListenerObject>
  ) {
    super(vals);
    this.thumbEvents = thumbEvents;
  }


  // ---- Element builder ----
  createSliderNode(
    thumbCount: number,
    structureStr: Properties.Base['structure'],
    wrapper: HTMLElement
  ): PropertyNode.Mult {
    const nodes = !structureStr
      ? this.createSliderManually(thumbCount, wrapper)
      : this.createSliderFromStructure(thumbCount, structureStr, wrapper);

    for (let i = 0; i < thumbCount; i++) {
      this.addThumbToNodes(nodes, Infinity);
    }
    return nodes;
  }


  // In case no custom structure is defined, manually build the node to ensure best performance (parseStructure takes a while)
  createSliderManually(thumbCount: number, wrapper: HTMLElement) {
    const track = document.createElement('div');
    const nodes: PropertyNode.KnownMult = {
      slider: [ wrapper ],
      track: [ track ],
      thumb: [],
    };

    this.thumbBase = document.createElement('div');
    this.thumbParent = track;

    // Thumb classes are applied in `createNewThumb`;
    // Slider classes are applied in `addClasses`.
    wrapper.appendChild(track);
    return nodes;
  }

  createSliderFromStructure(
    thumbCount: number,
    structureStr: string,
    wrapper: HTMLElement
  ) {
    const node = this.parseStructure(structureStr, wrapper);
    this.#parsePostProcess(node);
    return this.#expandThumbs(node as PropertyNode.Single, thumbCount);
  }

  #expandThumbs(node: PropertyNode.Single, thumbCount: number) {
    const nodes = {
      thumb: []
    } as PropertyNode.Mult;

    // Convert `node` into `nodes`, differentiating between thumb children & other nodes
    // The thumb itself gets expanded below.
    for (const [ nodeName, element ] of Object.entries(node)) {
      if (this.thumbChildren.includes(nodeName)) {
        this.baseElements[nodeName] = node[nodeName];
        nodes[nodeName] = [];
      } else if (nodeName !== 'thumb') {
        nodes[nodeName] = [ element ];
      }
    }

    // NOTE: This needs to be called after `baseElements` is fully populated (i.e. above).
    this.#findStructureVarStringsInThumb(this.thumbBase);
    return nodes;
  }

  #parsePostProcess(node: Partial<PropertyNode.Single>) {
    // NOTE: thumb and track can be defined independently
    // I.e. track gets the class `sl89-track`, but this.thumbParent can be a different node
    if (!node.thumb) {
      this.thumbBase = this.assembleElement(node, 'thumb', [], 'div');
    } else {
      this.thumbBase = node.thumb;
      if (node.track) {
        this.thumbParent = node.thumb.parentElement;
      }
      // baseElements is only effective if a structure thumb has been defined
      this.baseElements.thumb = this.thumbBase;
    }
    if (!node.track) {
      node.track = this.assembleElement(node, 'track', [], 'div');
      if (node.thumb) {
        node.thumb.parentNode.appendChild(node.track);
      } else {
        node.slider.appendChild(node.track);
      }
    }

    // Remove original thumb node
    if (node.thumb) {
      node.thumb.parentNode.removeChild(node.thumb);
    }
    if (!this.thumbParent) {
      this.thumbParent = node.track;
    }
    // NOTE: From here on, `node` is of type `PropertyNode.Single`
  }

  #findStructureVarStringsInThumb(thumbBase: typeof this.thumbBase) {
    for (const [ propName, stringList ] of Object.entries(this.structureVars)) {
      let thumbStrings: string[] = [];
      for (const [ str, nodeList ] of Object.entries(stringList)) {
        for (const node of nodeList) {
          if (this.nodeHasBaseElementOwner(node)) {
            thumbStrings.push(str);
            break;
          }
        }
      }
      if (thumbStrings.length > 0) {
        this.structureVarThumbStrings[propName] = thumbStrings;
      }
    }
  }


  // ---- Thumb helpers ----
  /**
   * Add a new thumb element with all of its descendants to the
   * passed {@link Properties.Base.nodes} at the specified index
   * (can be negative, counting backwards).
   */
  addThumbToNodes(nodes: PropertyNode.Mult, thumbIndex: number) {
    const newThumb = this.#createNewBlankThumb();
    nodes.thumb.splice(thumbIndex, 0, newThumb);
    (DOMBuilder.findNodeChildren(newThumb) as HTMLElement[])
      .forEach((childNode, i) => {
        const childName = this.thumbChildren[i];
        nodes[childName].splice(thumbIndex, 0, childNode);
      });
    return newThumb;
  }
  /**
   * Remove a thumb and all of its descendants from the passed
   * {@link Properties.Base.nodes} at the specified index
   * (can be negative, counting backwards).
   */
  removeThumbFromNodes(nodes: PropertyNode.Mult, thumbIndex: number) {
    const thumb = nodes.thumb.at(thumbIndex);
    nodes.thumb.splice(thumbIndex, 1);
    for (const nodeName of this.thumbChildren) {
      nodes[nodeName].splice(thumbIndex, 1);
    }
    this.thumbParent.removeChild(thumb);
    return thumb;
  }


  // ---- Helper functions ----
  #createNewBlankThumb() {
    const newThumb = this.thumbBase.cloneNode(true) as typeof this.thumbBase;
    for (const [ eventName, callback ] of Object.entries(this.thumbEvents)) {
      newThumb.addEventListener(eventName, callback, {
        passive: !(eventName.startsWith('touch') || eventName.startsWith('key'))
      });
    }
    this.thumbParent.appendChild(newThumb);
    return newThumb;
  }

  nodeHasBaseElementOwner(node: Node) {
    for (const [ baseName, element ] of Object.entries(this.baseElements)) {
      if (DOMBuilder.getNodeOwner(node) === element) return baseName;
    }
    return false;
  }


  // ---- Static helpers ----
  static getNodeOwner(node: Node): HTMLElement {
    // @ts-ignore
    return node.ownerElement || node.parentElement;
  }

  /**
   * Recursively iterate through a node's children, collecting them in an array in order.
   * When used on a thumb node, the result is analogous to {@link thumbChildren}.
   * @param node The input node.
   * @return All children of the input node.
   */
  static findNodeChildren(node: Element, collector: (typeof node)[] = []) {
    if (node.childElementCount === 0) return collector;

    for (const child of node.children) {
      collector.push(child);
      DOMBuilder.findNodeChildren(child, collector);
    }
    return collector;
  }
}
