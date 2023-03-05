'use strict';
import defaultStylesString from './default-styles.css';
import Slider89 from './Slider89.js';
import Slider89StructureParser from './Slider89StructureParser.js';

export default class Slider89DOMBuilder extends Slider89StructureParser {
  static hasInjectedStylesheet = false;

  thumbBase; // Clonable thumb node
  thumbParent;

  baseElements = {};

  structureVarThumbStrings = {};

  /** @type Record<string, Function> */
  thumbEvents = {};


  constructor(vals, thumbEvents) {
    super(vals);
    this.thumbEvents = thumbEvents;
  }


  // ---- Element builder ----
  createSliderNode(thumbCount, structureStr) {
    return structureStr === false
      ? this.createSliderManually(thumbCount)
      : this.createSliderFromStructure(thumbCount, structureStr);
  }


  // In case no custom structure is defined, manually build the node to ensure best performance (parseStructure takes a while)
  createSliderManually(thumbCount) {
    const node = {
      slider: document.createElement('div'),
      track: document.createElement('div'),
      thumb: new Array(thumbCount)
    };

    this.thumbBase = document.createElement('div');
    this.thumbParent = node.track;

    for (let i = 0; i < thumbCount; i++) {
      node.thumb[i] = this.createNewThumb();
    }
    node.slider.appendChild(node.track);

    for (let element in node) {
      // Thumb classes are applied in `createNewThumb`
      if (element !== 'slider' && element !== 'thumb') {
        node[element].classList.add('sl89-' + element);
      }
    }
    return node;
  }

  createSliderFromStructure(thumbCount, structureStr) {
    const node = this.parseStructure(structureStr);
    this.parsePostProcess(node, thumbCount);
    return node;
  }

  parsePostProcess(node, thumbCount) {
    // NOTE: thumb and track can be defined independently
    // I.e. track gets the class `sl89-track`, but this.thumbParent can be a different node
    if (!node.thumb) {
      this.thumbBase = this.assembleElement(node, 'thumb', 'div');
    } else {
      this.thumbBase = node.thumb;
      if (node.track) {
        this.thumbParent = node.thumb.parentNode;
      }
      // baseElements is only effective if a structure thumb has been defined
      this.baseElements.thumb = this.thumbBase;
    }
    if (!node.track) {
      node.track = this.assembleElement(node, 'track', 'div');
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

    node.track.classList.add('sl89-track');

    // Push thumb & descendants into node arrays
    node.thumb = new Array();
    for (const nodeName of this.thumbChildren) {
      this.baseElements[nodeName] = node[nodeName];
      node[nodeName] = new Array();
    }

    this.findStructureVarStringsInThumb(this.thumbBase);

    for (let i = 0; i < thumbCount; i++) {
      this.addThumbToNode(node);
    }
  }

  findStructureVarStringsInThumb(thumbBase) {
    for (const [ propName, stringList ] of Object.entries(this.structureVars)) {
      let thumbStrings = [];
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
  addThumbToNode(node) {
    const newThumb = this.createNewThumb();
    node.thumb.push(newThumb);

    Slider89DOMBuilder.findNodeChildren(newThumb)
      .forEach((childNode, j) => {
        const childName = this.thumbChildren[j];
        node[childName].push(childNode);
      });
  }
  removeThumbFromNode(node) {
    for (const nodeName of this.thumbChildren) {
      node[nodeName].pop();
    }
    return node.thumb.pop();
  }


  // ---- Misc functions ----
  addAttributesFromTarget(node, targetNode) {
    const attributes = targetNode.attributes;
    for (let i = 0; i < attributes.length; i++) {
      node.slider.setAttribute(attributes[i].name, attributes[i].value);
    }
  }

  addClasses(node, classList, isVertical) {
    node.slider.classList.add('slider89');
    if (isVertical) {
      node.slider.classList.add('vertical');
    }
    if (classList) {
      this.addClassesFromClassList(node, classList);
    }
  }

  // Add the specified classes and collecting all nonexistent nodes in `errNodes`
  addClassesFromClassList(node, classList) {
    const errNodes = new Array();

    for (let nodeName in classList) {
      const classArr = classList[nodeName];
      if (!Object.prototype.hasOwnProperty.call(node, nodeName)) {
        errNodes.push(nodeName);
      } else if (errNodes.length === 0) {
        for (let i = 0; i < classArr.length; i++) {
          if (nodeName === 'thumb') {
            for (let j = 0; j < node[nodeName].length; j++) {
              node[nodeName][j].classList.add(classArr[i]);
            }
          } else {
            node[nodeName].classList.add(classArr[i]);
          }
        }
      }
    }

    if (errNodes.length > 0) {
      const msg =
        "The given object contains items which aren't nodes of this slider:" + Slider89.arrayToListString(errNodes) +
        "Following nodes are part of this slider's node pool:" + Slider89.arrayToListString(Object.keys(node))
      throw new Slider89.Error(msg, 'classList', true);
    }
  }

  // ---- Helper functions ----
  createNewThumb() {
    const newThumb = this.thumbBase.cloneNode(true);
    newThumb.classList.add('sl89-thumb');
    if (newThumb.tabindex == null) {
      newThumb.tabIndex = 0;
    }
    for (const [ eventName, callback ] of Object.entries(this.thumbEvents)) {
      newThumb.addEventListener(eventName, callback);
    }
    this.thumbParent.appendChild(newThumb);
    return newThumb;
  }

  nodeHasBaseElementOwner(node) {
    for (const [ baseName, element ] of Object.entries(this.baseElements)) {
      if (Slider89StructureParser.getStructureVarNodeOwner(node) === element) return baseName;
    }
    return false;
  }

  // ---- Static style sheet creation ----
  // NOTE: I think that a global Object (like Slider89) cannot be in multiple
  // documents at once. Thus, just setting a global flag to true should be
  // sufficient to mark the current document as already injected.
  static injectStyleSheetIfNeeded() {
    if (Slider89DOMBuilder.hasInjectedStylesheet === false) {
      const styleSheetElement = document.createElement('style');
      const firstHeadChild = document.head.firstElementChild;

      styleSheetElement.textContent = defaultStylesString;

      // Ensure that it is the first style sheet in the document
      if (firstHeadChild) {
        document.head.insertBefore(styleSheetElement, firstHeadChild);
      } else {
        document.head.appendChild(styleSheetElement);
      }

      Slider89DOMBuilder.hasInjectedStylesheet = true;
    }
  }

  /**
   * Recursively iterate through a node's children, collecting them in an array in order.
   * When used on a thumb node, the result is analogous to {@link thumbChildren}.
   * @param { HTMLElement } node The input node.
   * @param { Array<HTMLElement> } collector
   * @return { Array<HTMLElement> } All children of the input node.
   */
  static findNodeChildren(node, collector = []) {
    if (node.childElementCount === 0) return collector;

    for (const child of node.children) {
      collector.push(child);
      Slider89DOMBuilder.findNodeChildren(child, collector);
    }
    return collector;
  }

}
