'use strict';
// Style rule strings which will be inserted into a newly created stylesheet
import styles from './default-styles.css';
import Slider89 from './Slider89.js';
import Slider89StructureParser from './Slider89StructureParser.js';

export default class Slider89DOMBuilder extends Slider89StructureParser {
  thumbBase; // Clonable thumb node
  thumbParent;

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
    this.createMissingElements(node, thumbCount);
    return node;
  }

  createMissingElements(node, thumbCount) {
    // NOTE: thumb and track can be defined independently
    // I.e. track gets the class `sl89-track`, but this.thumbParent can be a different node
    if (!node.thumb) {
      this.thumbBase = this.assembleElement(node, 'thumb', 'div');
    } else {
      this.thumbBase = node.thumb;
      if (node.track) {
        this.thumbParent = node.thumb.parentNode;
      }
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

    node.thumb = new Array(thumbCount);
    for (let i = 0; i < thumbCount; i++) {
      node.thumb[i] = this.createNewThumb();
    }
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

  createStyleSheet() {
    const sheet = (function() {
      const firstHeadChild = document.head.firstElementChild;
      if (firstHeadChild) {
        return document.head.insertBefore(document.createElement('style'), firstHeadChild).sheet;
      } else {
        return document.head.appendChild(document.createElement('style')).sheet;
      }
    })();
    for (let i = 0; i < styles.length; i++) {
      sheet.insertRule(styles[i], 0);
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
}
