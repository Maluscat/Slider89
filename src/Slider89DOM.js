'use strict';
import Slider89 from './Slider89.js';
import Slider89Properties from './Slider89Properties.js';

export default class Slider89DOM extends Slider89Properties {
  activeThumb;
  activeTouchID;
  mouseDownPos;

  trackStyle;


  constructor() {
    super();

    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.slideStart = this.slideStart.bind(this);
    this.slideMove = this.slideMove.bind(this);
    this.slideEnd = this.slideEnd.bind(this);

    this.keyDown = this.keyDown.bind(this);

    window.addEventListener('keydown', this.keyDown);
  }


  // ---- DOM getters ----
  getTrackPadding(direction) {
    return parseFloat(this.trackStyle['padding' + direction]);
  }
  getTrackOffset(direction) {
    return parseFloat(this.trackStyle['border' + direction + 'Width'])
      + this.getTrackPadding(direction);
  }

  getDistance(thumb) {
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
  getAbsoluteTrackSize(thumb) {
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
  moveThumbTranslate(thumb, distance) {
    const axis = this.vals.orientation === 'vertical' ? 'Y' : 'X';
    thumb.style.transform = 'translate' + axis + '(' + distance + 'px)';
  }
  moveThumbRelative(thumb, distance) {
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

  applyAllRatioDistances(newVals) {
    for (let i = 0; i < this.vals.values.length; i++) {
      this.applyOneRatioDistance(i, newVals);
    }
  }
  applyOneRatioDistance(thumbIndex, newVals) {
    const { value, prevRatio, ratio } = this.computeRatioDistance(thumbIndex, newVals);

    this.setValuesWithValueChange(thumbIndex, value);
    if (!Slider89.floatIsEqual(ratio, prevRatio)) this.moveThumbRelative(this.vals.node.thumb[thumbIndex], ratio);
  }

  // ---- Distance computation ----
  computeDistanceValue(thumb, distance, absSize) {
    if (absSize == null) absSize = this.getAbsoluteTrackSize(thumb);
    return distance / absSize * (this.vals.range[1] - this.vals.range[0]) + this.vals.range[0];
  }

  computeRatioDistance(thumbIndex, newVals) {
    let value, ratio;
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
  setValuesWithValueChange(thumbIndex, value) {
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
  touchStart(e) {
    e.preventDefault();
    if (this.activeTouchID == null) {
      this.activeTouchID = e.changedTouches[0].identifier;
      this.slideStart.call(this, e.changedTouches[0], e);

      this.vals.node.thumb.addEventListener('touchmove', this.touchMove);
      this.vals.node.thumb.addEventListener('touchend', this.touchEnd);
      this.vals.node.thumb.addEventListener('touchcancel', this.touchEnd);
    }
  }
  touchMove(e) {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === this.activeTouchID) {
        this.slideMove.call(this, e.changedTouches[i], e);
        break;
      }
    }
  }
  touchEnd(e) {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === this.activeTouchID) {
        this.vals.node.thumb.removeEventListener('touchmove', this.touchMove);
        this.vals.node.thumb.removeEventListener('touchend', this.touchEnd);
        this.vals.node.thumb.removeEventListener('touchcancel', this.touchEnd);

        this.slideEnd.call(this, e.changedTouches[i], e);
        this.activeTouchID = null;
        break;
      }
    }
  }


  // ---- Mouse events ----
  slideStart(e, touchEvent) {
    this.activeThumb = e.currentTarget;

    document.body.classList.add('sl89-noselect');
    this.activeThumb.classList.add('active');
    // invokeEvent(['start'], touchEvent || e);

    if (this.vals.orientation === 'vertical') {
      var posAnchor = 'top';
      var clientDim = e.clientY;
    } else {
      var posAnchor = 'left';
      var clientDim = e.clientX;
    }
    const distance = this.getDistance(this.activeThumb);
    this.mouseDownPos = clientDim - distance;
    this.moveThumbTranslate(this.activeThumb, distance);
    this.activeThumb.style.removeProperty(posAnchor);

    if (!touchEvent) {
      window.addEventListener('mouseup', this.slideEnd);
      window.addEventListener('mousemove', this.slideMove);
    }
  }
  slideMove(e, touchEvent) {
    const thumbIndex = this.vals.node.thumb.indexOf(this.activeThumb);
    const absSize = this.getAbsoluteTrackSize(this.activeThumb);
    let distance = (this.vals.orientation === 'vertical' ? e.clientY : e.clientX) - this.mouseDownPos;

    if (distance > absSize)
      distance = absSize;
    else if (distance < 0)
      distance = 0;

    let value = this.computeDistanceValue(this.activeThumb, distance, absSize);
    if (this.vals.step !== false) {
      const computedProperties = this.computeRatioDistance(thumbIndex, { value: value });
      value = computedProperties.value;
      distance = computedProperties.ratio * absSize;
    }

    if (this.setValuesWithValueChange(thumbIndex, value)) {
      this.moveThumbTranslate(this.activeThumb, distance);
      this.invokeEvent(['move'], touchEvent || e);
    }
  }
  slideEnd(e, touchEvent) {
    if (!touchEvent) {
      window.removeEventListener('mouseup', this.slideEnd);
      window.removeEventListener('mousemove', this.slideMove);
    }

    const thumbIndex = this.vals.node.thumb.indexOf(this.activeThumb);

    this.applyOneRatioDistance(thumbIndex);
    this.activeThumb.style.removeProperty('transform');

    this.invokeEvent(['end'], touchEvent || e);
    this.activeThumb.classList.remove('active');
    document.body.classList.remove('sl89-noselect');

    this.mouseDownPos = null;
    this.activeThumb = null;
  }


  // ---- Misc events ----
  keyDown(e) {
    if (document.activeElement === this.vals.node.thumb) {
      let modifier = Math.round((this.vals.range[1] - this.vals.range[0]) / 100);
      if (e.shiftKey && e.ctrlKey) {
        modifier *= 0.1;
      } else if (e.shiftKey) {
        modifier *= 10;
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.value -= modifier;
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        this.value += modifier;
      }
    }
  }
}
