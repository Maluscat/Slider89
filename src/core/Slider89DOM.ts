'use strict';
import type { Properties } from 'Slider89Base';
import Slider89 from './Slider89';
import Slider89DOMBuilder from './Slider89DOMBuilder';
import Slider89Properties from './Slider89Properties';

interface ClientXY {
  clientX: number;
  clientY: number;
}

type StyleDirection = 'Top' | 'Right' | 'Bottom' | 'Left';

type RecomputationNewVals = Partial<{
  [ Prop in 'value' | 'range' | 'step' ]: Properties.Base[Prop]
}>

export default class Slider89DOM extends Slider89Properties {
  activeTouchIDs = new Map<number, HTMLDivElement>();
  activeThumb: HTMLDivElement;
  mouseDownPos: number;

  trackStyle: CSSStyleDeclaration;

  domBuilder: Slider89DOMBuilder;

  constructor() {
    super();

    this.mouseStart = this.mouseStart.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseEnd = this.mouseEnd.bind(this);

    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.keyDown = this.keyDown.bind(this);

    this.domBuilder = new Slider89DOMBuilder(this.vals, {
      touchstart: this.touchStart,
      mousedown: this.mouseStart,
      keydown: this.keyDown
    });
  }


  // ---- DOM getters ----
  getTrackPadding(direction): number {
    return parseFloat(this.trackStyle['padding' + direction]);
  }
  getTrackOffset(direction): number {
    return parseFloat(this.trackStyle['border' + direction + 'Width'])
      + this.getTrackPadding(direction);
  }

  getDistance(thumb: HTMLDivElement): number {
    if (this.vals.orientation === 'vertical') {
      return thumb.getBoundingClientRect().top
        - this.vals.node.track.getBoundingClientRect().top
        - this.getTrackOffset('Top');
    } else {
      return thumb.getBoundingClientRect().left
        - this.vals.node.track.getBoundingClientRect().left
        - this.getTrackOffset('Left');
    }
  }
  getAbsoluteTrackSize(thumb: HTMLDivElement): number {
    if (this.vals.orientation === 'vertical') {
      return this.vals.node.track.getBoundingClientRect().height
        - this.getTrackOffset('Top')
        - this.getTrackOffset('Bottom')
        - thumb.getBoundingClientRect().height;
    } else {
      return this.vals.node.track.getBoundingClientRect().width
        - this.getTrackOffset('Left')
        - this.getTrackOffset('Right')
        - thumb.getBoundingClientRect().width;
    }
  }

  // ---- Thumb moving ----
  moveThumbTranslate(thumb: HTMLDivElement, distance: number) {
    const axis = this.vals.orientation === 'vertical' ? 'Y' : 'X';
    thumb.style.transform = 'translate' + axis + '(' + distance + 'px)';
  }
  moveThumbRelative(thumb: HTMLDivElement, distance: number) {
    // Relative positioning starts at the padding, so looking at the border is not needed
    if (this.vals.orientation === 'vertical') {
      var offsetStart = this.getTrackPadding('Top');
      var offsetEnd = this.getTrackPadding('Bottom');
      var thumbDim = thumb.clientHeight;
      var posAnchor = 'top';
    } else {
      var offsetStart = this.getTrackPadding('Left');
      var offsetEnd = this.getTrackPadding('Right');
      var thumbDim = thumb.clientWidth;
      var posAnchor = 'left';
    }

    let subtract = (thumbDim * distance) + 'px';
    if (offsetEnd) subtract += ' - ' + (offsetEnd * distance) + 'px';
    if (offsetStart) subtract += ' + ' + (offsetStart * (1 - distance)) + 'px';

    thumb.style[posAnchor] = 'calc(' + (distance * 100) + '% - ' + subtract + ')';
  }

  applyAllRatioDistances(newVals?: RecomputationNewVals) {
    for (let i = 0; i < this.vals.values.length; i++) {
      this.applyOneRatioDistance(i, newVals);
    }
  }
  applyOneRatioDistance(thumbIndex: number, newVals?: RecomputationNewVals) {
    const { value, prevRatio, ratio } = this.computeRatioDistance(thumbIndex, newVals);

    this.setValuesWithValueChange(thumbIndex, value);
    if (!Slider89.floatIsEqual(ratio, prevRatio)) this.moveThumbRelative(this.vals.node.thumb[thumbIndex], ratio);
  }

  // ---- Distance computation ----
  computeDistanceValue(thumb: HTMLDivElement, distance: number, absSize: number): number {
    if (absSize == null) absSize = this.getAbsoluteTrackSize(thumb);
    return distance / absSize * (this.vals.range[1] - this.vals.range[0]) + this.vals.range[0];
  }

  computeRatioDistance(thumbIndex: number, newVals?: RecomputationNewVals) {
    let value: Properties.Base['value'];
    let ratio: number;

    if (!newVals) {
      newVals = this.vals;
      value = this.vals.values[thumbIndex];
    } else {
      const props = ['range', 'step'];
      for (let i in props) {
        if (newVals[props[i]] == null) newVals[props[i]] = this.vals[props[i]];
      }
      if (newVals.value != null) {
        value = newVals.value;
      } else {
        ratio = (this.vals.values[thumbIndex] - this.vals.range[0]) / (this.vals.range[1] - this.vals.range[0]);
        value = (newVals.range[1] - newVals.range[0]) * ratio + newVals.range[0];
      }
    }
    // Round value to a given step
    if (newVals.step !== false) {
      if (Math.abs(newVals.range[1] - newVals.range[0]) < newVals.step) {
        value = newVals.range[0];
      } else {
        value = newVals.range[0] + Math.round((value - newVals.range[0]) / newVals.step) * newVals.step;
      }
    }
    const newRatio = (value - newVals.range[0]) / (newVals.range[1] - newVals.range[0]);

    return {
      value: value,
      prevRatio: ratio,
      ratio: newRatio
    };
  }

  // ---- Helper functions ----
  removeLastThumbNode() {
    const thumb = this.domBuilder.removeThumbFromNode(this.vals.node);
    this.domBuilder.thumbParent.removeChild(thumb);
  }
  addNewThumbNode(thumbIndex: number) {
    this.domBuilder.addThumbToNode(this.vals.node);
    this.applyOneRatioDistance(thumbIndex);
  }

  setValuesWithValueChange(thumbIndex: number, value: Properties.Base['value']): boolean {
    const prevVal = this.vals.values[thumbIndex];
    if (!Slider89.floatIsEqual(value, prevVal)) {
      this.vals.values[thumbIndex] = value;
      if (thumbIndex === 0) {
        this.handleInternalPropertyChange('value', prevVal);
      }
      return true;
    }
    return false;
  }


  // ---- Touch events ----
  touchStart(e: TouchEvent) {
    e.preventDefault();
    // changedTouches should always be of length 1 because no two touches can trigger one event.
    const touch = e.changedTouches[0];
    if (!this.activeTouchIDs.has(touch.identifier)) {
      const thumbNode = e.target as HTMLDivElement;
      this.activeTouchIDs.set(touch.identifier, thumbNode);

      this.slideStart(thumbNode, touch, e);

      thumbNode.addEventListener('touchmove', this.touchMove, { passive: false });
      thumbNode.addEventListener('touchend', this.touchEnd);
      thumbNode.addEventListener('touchcancel', this.touchEnd);
    }
  }
  touchMove(e: TouchEvent) {
    e.preventDefault();
    for (const touch of e.changedTouches) {
      if (this.activeTouchIDs.has(touch.identifier)) {
        const thumbNode = this.activeTouchIDs.get(touch.identifier);

        this.slideMove(thumbNode, touch, e);
      }
    }
  }
  touchEnd(e: TouchEvent) {
    e.preventDefault();
    for (const touch of e.changedTouches) {
      if (this.activeTouchIDs.has(touch.identifier)) {
        const thumbNode = this.activeTouchIDs.get(touch.identifier);
        this.activeTouchIDs.delete(touch.identifier);

        this.slideEnd(thumbNode, touch, e);

        // @ts-ignore
        thumbNode.removeEventListener('touchmove', this.touchMove, { passive: false });
        thumbNode.removeEventListener('touchend', this.touchEnd);
        thumbNode.removeEventListener('touchcancel', this.touchEnd);
      }
    }
  }

  // ---- Mouse events ----
  mouseStart(e: MouseEvent) {
    const thumbNode = e.currentTarget as HTMLDivElement;
    document.body.classList.add('sl89-noselect');

    this.slideStart(thumbNode, e, e);

    if (!this.activeThumb) {
      this.activeThumb = thumbNode;
      window.addEventListener('mousemove', this.mouseMove);
      window.addEventListener('mouseup', this.mouseEnd);
    }
  }
  mouseMove(e: MouseEvent) {
    this.slideMove(this.activeThumb, e, e);
  }
  mouseEnd(e: MouseEvent) {
    this.slideEnd(this.activeThumb, e, e);

    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseEnd);
    this.mouseDownPos = null;
    this.activeThumb = null;
  }

  // ---- General event handlers ----
  slideStart(thumbNode: HTMLDivElement, e: ClientXY, eventArg: UIEvent) {
    thumbNode.classList.add('active');
    // invokeEvent(['start'], eventArg);

    if (this.vals.orientation === 'vertical') {
      var posAnchor = 'top';
      var clientDim = e.clientY;
    } else {
      var posAnchor = 'left';
      var clientDim = e.clientX;
    }
    const distance = this.getDistance(thumbNode);
    this.mouseDownPos = clientDim - distance;
    this.moveThumbTranslate(thumbNode, distance);
    thumbNode.style.removeProperty(posAnchor);
  }
  slideMove(thumbNode: HTMLDivElement, e: ClientXY, eventArg: UIEvent) {
    const thumbIndex = this.vals.node.thumb.indexOf(thumbNode);
    const absSize = this.getAbsoluteTrackSize(thumbNode);
    let distance = (this.vals.orientation === 'vertical' ? e.clientY : e.clientX) - this.mouseDownPos;

    if (distance > absSize)
      distance = absSize;
    else if (distance < 0)
      distance = 0;

    let value = this.computeDistanceValue(thumbNode, distance, absSize);
    if (this.vals.step !== false) {
      const computedProperties = this.computeRatioDistance(thumbIndex, { value: value });
      value = computedProperties.value;
      distance = computedProperties.ratio * absSize;
    }

    if (this.setValuesWithValueChange(thumbIndex, value)) {
      this.moveThumbTranslate(thumbNode, distance);
      this.invokeEvent(['move'], eventArg);
    }
  }
  slideEnd(thumbNode: HTMLDivElement, e: ClientXY, eventArg: UIEvent) {
    const thumbIndex = this.vals.node.thumb.indexOf(thumbNode);

    this.applyOneRatioDistance(thumbIndex);
    thumbNode.style.removeProperty('transform');

    this.invokeEvent(['end'], eventArg);
    thumbNode.classList.remove('active');
    document.body.classList.remove('sl89-noselect');
  }


  // ---- Misc events ----
  keyDown(e: KeyboardEvent) {
    if (!e.key.startsWith('Arrow')) return;

    const thumbIndex = this.vals.node.thumb.indexOf(e.currentTarget as HTMLDivElement);

    let modifier = Math.round((this.vals.range[1] - this.vals.range[0]) / 100);
    if (e.shiftKey && e.ctrlKey) {
      modifier *= 0.1;
    } else if (e.shiftKey) {
      modifier *= 10;
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.values[thumbIndex] -= modifier;
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.values[thumbIndex] += modifier;
    }
  }
}
