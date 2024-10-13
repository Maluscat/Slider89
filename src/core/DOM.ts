'use strict';
import type { Properties as Props } from './Base';
import { DOMVariables } from './dom-handler/DOMVariables';
import { Slider89 } from './Slider89';
import { Definition } from './Definition';

interface ClientXY {
  clientX: number;
  clientY: number;
}

/**
 * Contains strings that are useful for getting distance and dimension
 * information, adapted to the slider's current orientation.
 */
export interface DirectionRect {
  sizeC: 'Width' | 'Height';
  size: 'width' | 'height';
  start: 'left' | 'top';
  end: 'right' | 'bottom';
}

export type StyleDirection = 'top' | 'right' | 'bottom' | 'left';
export type RecomputationNewVals = Partial<Pick<Props.Base, 'value' | 'range' | 'step'>>;

export class DOM extends Definition {
  activeTouchIDs = new Map<number, HTMLDivElement>();
  activeThumb: HTMLDivElement;
  mouseDownPos: number;

  /** Live style of the slider track. */
  trackStyle: CSSStyleDeclaration;

  constructor() {
    super();

    this.mouseStart = this.mouseStart.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseEnd = this.mouseEnd.bind(this);

    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.keyDown = this.keyDown.bind(this);

    this.domHandler = new DOMVariables(this as unknown as Slider89, this.vals, {
      touchstart: this.touchStart,
      mousedown: this.mouseStart,
      keydown: this.keyDown
    });
  }


  // ---- Basic DOM getters ----
  /**
   * Get an object containing strings useful for getting distance and
   * dimension information, automatically adapted to the slider's orientation.
   */
  getDirection(): DirectionRect {
    if (this.vals.orientation === 'vertical') {
      return {
        sizeC: 'Height',
        size: 'height',
        start: 'top',
        end: 'bottom',
      };
    } else return {
      sizeC: 'Width',
      size: 'width',
      start: 'left',
      end: 'right',
    };
  }

  /** Get the padding of the track element for the given direction.  */
  getTrackPadding(direction: StyleDirection): number {
    return parseFloat(this.trackStyle.getPropertyValue('padding-' + direction));
  }
  /**
   * Get the offset (border AND padding) of the track element
   * for the given direction.
   */
  getTrackOffset(direction: StyleDirection): number {
    return parseFloat(this.trackStyle.getPropertyValue('border-' + direction + '-width'))
      + this.getTrackPadding(direction);
  }
  /**
   * Get the absolute pixel position of the *active* track
   * relative to the window, at the specified direction.
   *
   * The active track describes the track element
   * minus any effective offsets (border and padding).
   */
  getTrackPosition(direction: StyleDirection): number {
    return this.vals.node.track.getBoundingClientRect()[direction]
      + this.getTrackOffset(direction);
  }

  // ---- Automatic DOM getters ----
  /**
   * Get the absolute pixel distance to the given offset in the
   * *active* track, automatically adapted to the slider's orientation.
   *
   * The active track describes the track element
   * minus any effective offsets (border and padding).
   *
   * @param offset A point of the viewport at which to get the distance.
   */
  getDistance(offset: number) {
    const direction = this.getDirection().start;
    return offset - this.getTrackPosition(direction);
  }
  /**
   * Get the absolute pixel distance of the given thumb element in the
   * *active* track, automatically adapted to the slider's orientation.
   *
   * This is anchored at the front of the thumb,
   * so either the left or top edge.
   *
   * @remarks
   * Because of floating-point math, the result may be slightly imprecise
   * and should not be compared directly with other values.
   * {@link Slider89.floatIsEqual} is a convenient helper.
   *
   * @param thumb The thumb element to get the distance of.
   */
  getThumbDistance(thumb: HTMLDivElement): number {
    const direction = this.getDirection().start;
    return this.getDistance(thumb.getBoundingClientRect()[direction]);
  }
  /**
   * Same as {@link getThumbDistance} but instead of being anchored at the
   * thumb's left or top edge, the result is centered to the thumb.
   */
  getThumbDistanceCentered(thumb: HTMLDivElement): number {
    const direction = this.getDirection();
    const rect = thumb.getBoundingClientRect();
    return this.getDistance(rect[direction.start] + rect[direction.size] / 2);
  }

  /**
   * Get the absolute pixel size of the *absolute* track,
   * automatically adapted to the slider's current orientation.
   *
   * The absolute track is the part of the track element that contributes
   * to the dragged thumb, so minus any offsets (border and padding)
   * and minus the thumb's width/height. 
   *
   * @param thumb The thumb element to test the distance against.
   */
  getAbsoluteTrackSize(thumb: HTMLDivElement): number {
    const direction = this.getDirection();
    return this.vals.node.track.getBoundingClientRect()[direction.size]
      - this.getTrackOffset(direction.start)
      - this.getTrackOffset(direction.end)
      - thumb.getBoundingClientRect()[direction.size]
  }

  // ---- Thumb movement ----
  /**
   * Translate an element by the given absolute pixel distance.
   * @param element The element to transform(translate), most likely a thumb on the track.
   * @param distance The absolute pixel distance to translate the element by.
   */
  moveElementTranslate(element: HTMLElement, distance: number) {
    const axis = this.vals.orientation === 'vertical' ? 'Y' : 'X';
    element.style.transform = 'translate' + axis + '(' + distance + 'px)';
  }
  /**
   * Move an element (most likely the thumb) using relative
   * positioning (CSS "top" or "left" properties), automatically
   * adapted to the slider's current orientation.
   *
   * The benefit of relative positioning over translation is that nothing
   * has to be recomputed if the parent element's dimensions change.
   *
   * @remarks
   * Moving an element  this way is extremely costly for the browser.
   * In Slider89, the thumb is moved using `translate` and only upon thumb
   * release the movement is converted into a relative position. **Please**
   * think twice before using this method in conjunction with a mouse event.
   *
   * @param element The element to move
   * @param ratio The distance as percentage in the interval [0, 1]
   * @param elementForDims A differing element that is used for the position offset.
   */
  moveElementRelative(element: HTMLElement, ratio: number, elementForDims: HTMLElement = element) {
    const direction = this.getDirection();
    // Relative positioning starts at the padding, so looking at the border is not needed
    const offsetStart = this.getTrackPadding(direction.start);
    const offsetEnd = this.getTrackPadding(direction.end);
    const elementDim = elementForDims.getBoundingClientRect()[direction.size];

    let subtract = (elementDim * ratio) + 'px';
    if (offsetEnd) subtract += ' - ' + (offsetEnd * ratio) + 'px';
    if (offsetStart) subtract += ' + ' + (offsetStart * (1 - ratio)) + 'px';

    element.style[direction.start] = 'calc(' + (ratio * 100) + '% - ' + subtract + ')';
  }

  applyAllRelativeValues(newVals?: RecomputationNewVals) {
    for (let i = 0; i < this.vals.values.length; i++) {
      this.applyRelativeValue(i, newVals);
    }
  }
  /**
   * Apply the new value of the given index according to the passed
   * property values and move the thumb accordingly.
   *
   * Does not set the given values.
   *
   * @param thumbIndex The value/thumb index that should be recomputed.
   * @param newVals New property values to apply, or none to recompute in-place.
  */
  applyRelativeValue(thumbIndex: number, newVals?: RecomputationNewVals) {
    const { value, prevRatio, ratio } = this.computeRelativeValue(thumbIndex, newVals);

    this.vals.values[thumbIndex] = value;
    if (!Slider89.floatIsEqual(ratio, prevRatio)) {
      this.moveElementRelative(this.vals.nodes.thumb[thumbIndex], ratio);
    }
  }

  // ---- Distance computation ----
  /**
   * Compute the resulting value of the given thumb at the given
   * absolute pixel distance of the *absolute* track.
   *
   * The absolute track is the part of the track element that contributes
   * to the dragged thumb, so minus any offsets (border and padding) and
   * minus the thumb's width/height.
   *
   * @param thumb The affected thumb. Only needs to be passed to get its dimensions.
   * @param distance The distance to get the value for.
   * @param absSize HERE FOR PERFORMANCE REASONS; CAN BE DISREGARDED.
   *                The absolute pixel dimensions of the affected thumb.
   */
  computeDistanceValue(
    thumb: HTMLDivElement,
    distance: number,
    absSize = this.getAbsoluteTrackSize(thumb)
  ): number {
    return distance / absSize * (this.vals.range[1] - this.vals.range[0]) + this.vals.range[0];
  }

  computeRelativeValue(thumbIndex: number, newVals?: RecomputationNewVals) {
    let value: Props.Base['value'];
    let ratio: number;

    if (!newVals) {
      newVals = this.vals;
      value = this.vals.values[thumbIndex];
    } else {
      for (let prop of [ 'range', 'step' ] as const) {
        // @ts-ignore ???
        if (newVals[prop] == null) newVals[prop] = this.vals[prop];
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
      if (typeof newVals.step === 'number') {
        value = this.clampValueToStep(value, newVals.step, newVals.range);
      } else {
        value = Slider89.getClosestNumber(value, newVals.step);
      }
    }
    const newRatio = this.getValueRatio(value, newVals.range);

    return {
      value: value,
      prevRatio: ratio,
      ratio: newRatio
    };
  }

  // ---- Thumb helpers ----
  /**
   * Add a new thumb element along with all of its descendants to {@link nodes}
   * at the specified index (or push it to the end if unspecified).
   *
   * @remarks
   * This does *not* add a new value to {@link values}.
   */
  addThumbElement(thumbValue: number, thumbIndex = this.vals.nodes.thumb.length - 1) {
    const thumb = this.domHandler.addThumbToNodes(this.vals.nodes, thumbIndex);
    this.setThumbAttributes(thumb, thumbValue);
  }
  /**
   * Remove a thumb element along with all of its descendants from {@link nodes}
   * at the specified index (or the last thumb if unspecified).
   *
   * @remarks
   * This does *not* modify {@link values} in any way.
   */
  removeThumbElement(thumbIndex = -1) {
    this.domHandler.removeThumbFromNodes(this.vals.nodes, thumbIndex);
  }
  /**
   * Set the required attributes to a thumb at the specified index.
   * @internal
   */
  setThumbAttributes(thumb: HTMLDivElement, thumbValue: number) {
    thumb.classList.add('sl89-thumb');
    thumb.setAttribute('role', 'slider');
    thumb.setAttribute('aria-valuenow', thumbValue.toString());
    thumb.setAttribute('aria-valuemin', this.vals.range[0].toString());
    thumb.setAttribute('aria-valuemax', this.vals.range[1].toString());
    thumb.setAttribute('aria-orientation', this.vals.orientation);
    if (thumb.tabIndex === -1) {
      thumb.tabIndex = 0;
    }
  }

  // ---- Helper functions ----
  /**
   * Set a value at the specified (thumb) index and invoke an 'update' event
   * if the values are not equal. You can also pass an event object as
   * additional parameter for the event callback.
   *
   * This method can be used by plugins when modifying the value
   * in a non-trivial way (e.g. when changing the value with the arrow keys).
   */
  setValueWithUpdateEvent(value: Props.Base['value'], index = 0, eventArg?: UIEvent) {
    const prevValThis = this.values[index];
    this.values[index] = value;
    if (!Slider89.floatIsEqual(value, this.values[index])) {
      this.invokeEvent('update', this.values[index], prevValThis, index, event);
    }
  }
  /**
   * Same as {@link setValueWithUpdateEvent} but it is assumed that `value` is
   * in its final state and does not need to be modified and checked further.
   *
   * Do not use this unless you know exactly what you're doing.
   */
  setValueWithUpdateEventUnsafe(value: Props.Base['value'], index: number, eventArg: UIEvent) {
    const prevValThis = this.values[index];
    this.vals.values[index] = value;
    this.invokeEvent('update', this.values[index], prevValThis, index, event);
  }

  /**
   * Get the ratio of the supplied value (or the slider's current value)
   * in relation to the supplied range (or the slider's current range).
   * @param The value to get the ratio of.
   * @param The range to test the value against.
   * @return The relation of `value` to `range` in a [0, 1] interval.
   *
   * @remarks
   * The returned ratio can be used in {@link moveElementRelative}.
   */
  getValueRatio(value = this.vals.value, range = this.vals.range) {
    return (value - range[0]) / (range[1] - range[0]);
  }

  changeDOMOrientation(newOrientation: Props.Base['orientation']) {
    if (newOrientation === 'vertical') {
      this.#removeThumbsDOMProperty('left');
      this.vals.node.slider.classList.add('vertical');
    } else {
      this.#removeThumbsDOMProperty('top');
      this.vals.node.slider.classList.remove('vertical');
    }
    this.nodes.thumb.forEach(thumb => {
      thumb.setAttribute('aria-orientation', newOrientation);
    });
  }
  #removeThumbsDOMProperty(property: string) {
    for (const thumb of this.vals.nodes.thumb) {
      thumb.style.removeProperty(property);
    }
  }

  /**
   * Modify and return the passed value to match the confines
   * of the given step. Is always clamped to the given range.
   */
  clampValueToStep(value: Props.Base['value'], step: number, range: Props.Base['range']) {
    if (range[0] < range[1]) {
      return Math.min(range[1],
        Math.max(range[0],
          range[0] + Math.ceil((value - range[0]) / step) * step));
    } else {
      return Math.min(range[0],
        Math.max(range[1],
          range[0] + Math.floor((value - range[0]) / step) * step));
    }
  }

  /**
   * Clamp the given `value` to the given `range`, ensuring
   * that the value does not exceed the range.
   */
  clampValueToRange(value: Props.Base['value'], range: Props.Base['range']) {
    if (range[0] < range[1]) {
      if (value < range[0]) {
        return range[0];
      } else if (value > range[1]) {
        return range[1];
      }
    } else {
      if (value > range[0]) {
        return range[0];
      } else if (value < range[1]) {
        return range[1];
      }
    }
    return value;
  }

  // ---- Touch events ----
  touchStart(e: TouchEvent) {
    e.preventDefault();
    // changedTouches should always be of length 1 because no two touches can trigger one event.
    const touch = e.changedTouches[0];
    if (!this.activeTouchIDs.has(touch.identifier)) {
      const thumbNode = e.currentTarget as HTMLDivElement;
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
  mouseStart(e: MouseEvent, thumbNode = e.currentTarget as HTMLDivElement) {
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
    this.activeThumb = null;
  }

  // ---- General event handlers ----
  slideStart(thumbNode: HTMLDivElement, e: ClientXY, eventArg: UIEvent) {
    const thumbIndex = this.vals.nodes.thumb.indexOf(thumbNode);
    const distance = this.getThumbDistance(thumbNode);

    thumbNode.classList.add('active');
    if (this.vals.orientation === 'vertical') {
      var posAnchor = 'top';
      var clientDim = e.clientY;
    } else {
      var posAnchor = 'left';
      var clientDim = e.clientX;
    }
    this.mouseDownPos = clientDim - distance;
    this.moveElementTranslate(thumbNode, distance);

    this.invokeEvent('start', thumbIndex, eventArg);
    thumbNode.style.removeProperty(posAnchor);
  }
  slideMove(thumbNode: HTMLDivElement, e: ClientXY, eventArg: UIEvent) {
    const thumbIndex = this.vals.nodes.thumb.indexOf(thumbNode);
    const absSize = this.getAbsoluteTrackSize(thumbNode);
    let distance = (this.vals.orientation === 'vertical' ? e.clientY : e.clientX) - this.mouseDownPos;

    if (distance > absSize)
      distance = absSize;
    else if (distance < 0)
      distance = 0;

    let value = this.computeDistanceValue(thumbNode, distance, absSize);
    if (this.vals.step !== false) {
      const computedProperties = this.computeRelativeValue(thumbIndex, { value: value });
      value = computedProperties.value;
      distance = computedProperties.ratio * absSize;
    }

    if (!Slider89.floatIsEqual(value, this.vals.values[thumbIndex])) {
      this.setValueWithUpdateEventUnsafe(value, thumbIndex, eventArg);
      this.moveElementTranslate(thumbNode, distance);
      this.invokeEvent('move', thumbIndex, eventArg);
    }
  }
  slideEnd(thumbNode: HTMLDivElement, e: ClientXY, eventArg: UIEvent) {
    const thumbIndex = this.vals.nodes.thumb.indexOf(thumbNode);

    this.applyRelativeValue(thumbIndex);
    thumbNode.style.removeProperty('transform');

    this.invokeEvent('end', thumbIndex, eventArg);
    thumbNode.classList.remove('active');
    document.body.classList.remove('sl89-noselect');
    this.mouseDownPos = null;
  }


  // ---- Misc events ----
  keyDown(e: KeyboardEvent) {
    if (!e.key.startsWith('Arrow')) return;

    const thumbIndex = this.vals.nodes.thumb.indexOf(e.currentTarget as HTMLDivElement);

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
