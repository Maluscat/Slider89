'use strict';
import type { Properties as Props } from './Base';
import type { Operation } from './Definition.ts';
import type { EventType } from './Events';
import { Setup } from './Setup';

export type PropertiesOutline = {
  [ Prop in keyof Props.Base ]: PropertyOutline.self<Prop>;
}

namespace PropertyOutline {
  type Type<I extends keyof Props.Base> = Props.Base[I];

  export type self<I extends keyof Props.Base> =
      Default<I> & Partial<GetterSetter<I>> & Partial<Additional<I>>
    | GetterSetter<I> & Partial<Default<I>> & Partial<Additional<I>>;

  type Default<I extends keyof Props.Base> = {
    default: Type<I> | (() => Type<I>);
  }
  type GetterSetter<I extends keyof Props.Base> = {
    setter: Operation.Setter<I>;
    getter: Operation.Getter<I>;
  }
  type Additional<I extends keyof Props.Base> = {
    /**
     * Can be called to call a custom assignment when `extend`ing this property.
     * For example, this is used to merge two configs with overlapping `events`.
     * @param target The config the property will be assigned to.
     * @param value The value of the assigned property.
     * @param index The currently handled index of the `extend` array.
     */
    extendAssigner: (target: Props.Config, value: Exclude<Type<I>, false>, index: number) => void,
    postSetter: Operation.PostSetter<I>;
    internalKeySetter: Operation.KeySetter<I>;
    keySetter: Operation.KeySetter<I>;
    keyGetter: Operation.KeyGetter<I>;
  }
}

export class Slider89 extends Setup {
  properties: PropertiesOutline = {
    range: {
      default: [0, 100],
      setter: (val) => {
        if (val[0] === val[1]) {
          throw new Slider89.PropertyError(this, 'range',
            'The given range of [' + val.join(', ') + '] defines the same value for both range start and end');
        }
        if (!this.initial) {
          this.applyAllRelativeValues({ range: val });
        }
      },
      internalKeySetter: (val, key) => {
        if (this.nodes) {
          const attributeName = key === 0 ? 'aria-valuemin' : 'aria-valuemax';
          this.nodes.thumb.forEach(thumb => {
            thumb.setAttribute(attributeName, val.toString());
          });
        }
      },
      keySetter: (val, key) => {
        // Compare `val` with the value at the other key (0 or 1)
        if (val === this.vals.range[Math.abs(key - 1)]) {
          throw new Slider89.PropertyError(this, 'range',
            'The new range of [' + val + ', ' + val + '] defines the same value for both range start and end');
        }
        if (!this.initial) {
          const newRange = Array.from(this.vals.range) as typeof this.vals.range;
          newRange[key] = val;
          this.applyAllRelativeValues({ range: newRange });
        }
      }
    },
    values: {
      default: () => {
        return [this.vals.range[0]];
      },
      setter: (val) => {
        if (!this.initial) {
          // Add/remove thumbs if the given array is bigger/smaller than the current `values` array
          if (val.length > this.vals.values.length) {
            for (let i = this.vals.values.length; i < val.length; i++) {
              this.addThumbElement(val[i]);
            }
          } else if (val.length < this.vals.values.length) {
            for (let i = val.length; i < this.vals.values.length; i++) {
              this.removeThumbElement();
            }
          }
        }
      },
      postSetter: (val, prevVal) => {
        if (!this.initial) {
          if (prevVal.length !== val.length) {
            this.invokeInternalPropertyChange('node');
            this.invokeInternalPropertyChange('nodes');
          }
          this.domHandler.expandAllBaseElementVariables();
        }
      },
      internalKeySetter: (val, key, prevValTop) => {
        if (this.nodes) {
          this.nodes.thumb[key].setAttribute('aria-valuenow', val.toString());
        }
        if (!this.initial && key === 0) {
          let prevVal;
          if (prevValTop) {
            prevVal = prevValTop[key];
          } else {
            prevVal = this.vals.values[key];
            this.vals.$.values[key] = val;
          }
          this.invokeInternalPropertyChange('value', prevVal);
          return true;
        }
      },
      keySetter: (val, key) => {
        val = this.clampValueToRange(val, this.vals.range);
        if (!this.initial) {
          this.applyRelativeValue(key, {value: val});
        } else {
          this.vals.values[key] = val;
        }
        return true;
      },
      keyGetter: (val, key) => {
        return this.vals.precision !== false ? Number(val.toFixed(this.vals.precision)) : val;
      }
    },
    value: {
      setter: (val) => {
        this.values[0] = val;
        return true;
      },
      getter: (val) => {
        return this.values[0];
      }
    },
    precision: {
      default: false,
      setter: (val) => {
        if (!this.initial) {
          this.applyAllRelativeValues();
        }
      }
    },
    step: {
      default: false,
      setter: (val) => {
        if (this.vals.precision !== false
            && typeof val === 'number'
            && Number(val.toFixed(this.vals.precision)) !== val) {
          throw new Slider89.PropertyError(this, 'step',
            'The given value of ' + val + ' exceeds the currently set precision of ' + this.vals.precision);
        }
        if (!this.initial) {
          this.applyAllRelativeValues({ step: val })
        }
      }
    },
    structure: {
      default: false,
    },
    node: {
      // @ts-ignore (only setup)
      default: {},
    },
    nodes: {
      // @ts-ignore (only setup)
      default: {},
    },
    orientation: {
      default: 'horizontal',
      setter: (val) => {
        if (!this.initial) {
          this.changeDOMOrientation(val);
          this.vals.orientation = val;
          this.applyAllRelativeValues();
          return true;
        }
      }
    },
    classList: {
      default: {},
      extendAssigner: Slider89.#arrayObjectAssigner.bind(Slider89, 'classList')
    },
    events: {
      default: {},
      setter: (val) => {
        const errTypes = [];
        for (let eventType in val) {
          if (!this.checkEventType(eventType as EventType.Base)) errTypes.push(eventType);
        }
        if (errTypes.length > 0) {
          throw new Slider89.PropertyError(this, 'events',
            'The given object contains items which are no valid event types:' + Slider89.arrayToListString(errTypes)
            + 'Available event types are:' + Slider89.arrayToListString(Slider89.availableEventTypes));
        }
      },
      extendAssigner: Slider89.#arrayObjectAssigner.bind(Slider89, 'events')
    },
    plugins: {
      default: [],
      extendAssigner: (target, value) => {
        target.plugins ||= [];
        target.plugins.unshift(
          // @ts-ignore `target.plugins` is asserted not to be false.
          ...value.filter(val => !target.plugins.includes(val)));
      }
    },
    extend: {
      default: [],
      extendAssigner: (target, value, i) => {
        // Special case: `target.extend` must be defined since
        // only then an assigner can be reached
        (target.extend as Props.Config[]).splice(i, 0, ...value);
      }
    },
    data: {
      default: {},
      extendAssigner: (target, value) => {
        target.data = Object.assign(value, target.data || {});
      }
    }
  };

  constructor(target: HTMLElement, config?: Props.Config | false, replace = false) {
    super();
    this.initial = true;

    if (config == null || config === false) config = {};
    this.testInitialTarget(target);
    this.testInitialConfig(config);
    this.testAndExtendConfig(config);
    this.initializeProperties(config, this.properties);

    this.buildSlider(target, replace);
    this.applyAllRelativeValues();
    // This needs to happen as the last step in the initialization process.
    this.domHandler.updateAllVariables();

    this.initial = false;

    this.callPlugins(this.vals.plugins);
  }

  // ---- Static helpers ----
  /**
   * Check for rough equality of two floats, with a
   * sensible threshold that works well with Slider89.
   */
  static floatIsEqual(val0: number, val1: number) {
    return Math.abs(val0 - val1) < 0.00000000001;
  }

  /**
   * Get the number closest to a given number in a number array.
   * number number number number. Now the word looks weird.
   * @param val The number to check against.
   * @param arr The non-empty array to perform the check on.
   */
  static getClosestNumber(val: number, arr: number[]) {
    return arr.reduce((prev, current) => {
      return Math.abs(prev - val) < Math.abs(current - val)
        ? prev
        : current
    });
  }

  // ---- Internal helpers ----
  /**
   * General extend assigner that merges two "array objects" of the form
   * { key: any[] }. Can easily be utilized with `bind()`.
   * @see {@link #mergeArrayObjects}.
   */
  static #arrayObjectAssigner<P extends keyof Props.Mergable>(
    propertyName: P,
    target: Props.Config,
    value: Props.Mergable[P]
  ) {
    // @ts-ignore
    target[propertyName] ||= {};
    // @ts-ignore
    this.#mergeArrayObjects(target[propertyName], value);
  }

  /**
   * Merge two identically typed "array objects" of the form { key: any[] }
   * into the former, keeping only unique values.
   */
  static #mergeArrayObjects<V extends any[]>(target: Record<string, V>, source: Record<string, V>) {
    for (const [ key, value ] of Object.entries(source)) {
      // @ts-ignore
      target[key] ||= [];
      target[key].push(
        ...value.filter(val => !target[key].includes(val)));
    }
  }
}
