'use strict';
// @ts-ignore (Webpack import)
import defaultStylesString from '../css/default-styles.css';

import type { Properties as Props } from './Base';
import type { Operation } from './Definition.ts';
import type { EventType } from './Events';
import RuntimeTypeCheck, { TypeCheckError } from './type-check/RuntimeTypeCheck';
import DOM from './DOM';

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

export default class Slider89 extends DOM {
  /**
   * Controls whether to inject the slider's style sheet into the current
   * document. Is simply tested for truthyness when creating a new slider.
   *
   * The style sheet is only injected *once* per document upon creating the
   * first slider with this flag present. It will not be removed again when
   * setting this value to false.
   *
   * @remarks
   * Because of this, you have to set this flag *before* creating your first slider.
   * Setting it to falsey will throw a console warning when there is already
   * a style sheet present.
   *
   * @see {@link injectedStyleSheet}
   * @see {@link injectStyleSheetIfNeeded}
   */
  static injectCSS = true;
  /**
   * Contains the style sheet that has been injected into the document, if any.
   *
   * You can use this to insert custom styles for a slider or related elements,
   * for example when creating a plugin.
   * 
   * @see {@link injectCSS}
   * @see {@link injectStyleSheetIfNeeded}
   */
  static injectedStyleSheet: HTMLStyleElement | null;

  properties: PropertiesOutline = {
    range: {
      default: [0, 100],
      setter: (val) => {
        if (val[0] === val[1]) {
          throw new Slider89.PropertyError(this, 'range',
            'The given range of [' + val.join(', ') + '] defines the same value for both range start and end');
        }
        if (!this.initial) {
          this.applyAllRatioDistances({ range: val });
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
          this.applyAllRatioDistances({ range: newRange });
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
              this.appendNewThumbNode();
            }
          } else if (val.length < this.vals.values.length) {
            for (let i = val.length; i < this.vals.values.length; i++) {
              this.removeLastThumbNode();
            }
          }
        }
      },
      postSetter: (val, prevVal) => {
        if (!this.initial) {
          // Invoke `node(s)` property change and expand all `thumb` structure variables
          // if the `values` length has changed.
          if (prevVal.length !== val.length) {
            this.invokeInternalPropertyChange('node');
            this.invokeInternalPropertyChange('nodes');
            this.domHandler.expandAllBaseElementVariables();
          }
        }
      },
      internalKeySetter: (val, key, prevValTop) => {
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
        val = this.adaptValueToRange(val);
        if (!this.initial) {
          this.applyOneRatioDistance(key, {value: val});
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
          this.applyAllRatioDistances();
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
          this.applyAllRatioDistances({ step: val })
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
          this.changeOrientationDOM(val);
          this.vals.orientation = val;
          this.applyAllRatioDistances();
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
        if (val === false) {
          this.vals.events = {};
          return true;
        } else {
          const errTypes = [];
          for (let eventType in val) {
            if (!this.checkEventType(eventType as EventType.Base)) errTypes.push(eventType);
          }
          if (errTypes.length > 0) {
            throw new Slider89.PropertyError(this, 'events',
              'The given object contains items which are no valid event types:' + Slider89.arrayToListString(errTypes)
              + 'Available event types are:' + Slider89.arrayToListString(Slider89.availableEventTypes));
          }
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
        // Special case: Assigners can only be reached if `target.extend` is given.
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
    this.initializeProperties(config);

    this.buildSlider(target, replace);
    this.applyAllRatioDistances();
    // This needs to happen as the last step in the initialization process.
    this.domHandler.updateAllVariables();

    this.initial = false;

    this.callPlugins(this.vals.plugins);
  }


  // ---- Tests ----
  testInitialTarget(target: HTMLElement) {
    if (!target) {
      throw new Slider89.InitializationError('No first argument has been supplied. It needs to be the DOM target node for the slider');
    } else if (!target.nodeType || target.nodeType !== 1) {
      throw new Slider89.InitializationError('The first argument must be a valid DOM node (got ' + RuntimeTypeCheck.getType(target) + ')');
    }
  }
  testInitialConfig(config: Props.Config) {
    if (typeof config !== 'object' || Array.isArray(config)) {
      throw new Slider89.InitializationError('The optional second argument needs to be a configuration object (got ' + RuntimeTypeCheck.getType(config) + ')');
    } else if ('value' in config && 'values' in config) {
      throw new Slider89.InitializationError('Only one of ‘value’ and ‘values’ may be defined at once');
    }
  }

  testConfig(config: Props.Config) {
    for (const [ item, value ] of Object.entries(config)) {
      if (item in this.properties) {
        this.checkProp(item as keyof PropertiesOutline, value);
      } else if (item[0] !== '_') {
        throw new Slider89.InitializationError(
          '‘' + item + '’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_' + item + '’)');
      }
    }
  }


  // ---- Initialization ----
  testAndExtendConfig(config: Readonly<Props.Config>, target: Props.Config = config) {
    this.testConfig(config);
    if (config.extend) {
      for (let i = config.extend.length - 1; i >= 0; i--) {
        const mixin = config.extend[i];

        for (const [ item, value ] of Object.entries(mixin)) {
          if (this.properties[item]?.extendAssigner) {
            if (value !== false && config[item] !== false) {
              this.properties[item].extendAssigner(target, value, i);
            }
          } else if (!(item in target)) {
            target[item] = value;
          }
        }
        this.testAndExtendConfig(mixin, target);
      }
    }
  }

  initializeProperties(config: Props.Config) {
    for (const [ item, prop ] of Object.entries(this.properties)) {
      this.initializeProperty(item as keyof PropertiesOutline, prop);

      if (item in config) {
        this[item] = config[item];
        delete config[item];
      } else if ('default' in prop) {
        const def = prop.default;
        ((prop.getter || prop.keyGetter) ? this : this.vals)[item] = (typeof def === 'function' ? def() : def);
      }
    }

    for (const item in config) {
      this.defineInternalProperty(this, this.vals, item as keyof Props.Custom);
      this.vals[item] = config[item];
    }
  }

  buildSlider(target: HTMLElement, replace: boolean) {
    const wrapper = (replace ? target : document.createElement('div'));
    this.vals.nodes = this.domHandler.createSliderNode(this.vals.values.length, this.vals.structure, wrapper);
    this.defineNodeGetters(this.vals.nodes);

    if (!replace) {
      target.appendChild(this.vals.node.slider);
    }

    this.domHandler.addClasses(
      this.vals.nodes,
      this.vals.classList,
      this.vals.orientation === 'vertical');

    Slider89.injectStyleSheetIfNeeded();

    this.trackStyle = getComputedStyle(this.vals.node.track);
  }

  // ---- Plugins ----
  callPlugins(plugins: Props.Base['plugins']) {
    if (plugins === false) return;

    for (const callback of plugins) {
      callback(this);
    }
  }

  // ---- Initialization helpers ----
  initializeProperty<I extends keyof PropertiesOutline>(item: I, outline: PropertiesOutline[I]) {
    this.defineInternalBuiltinProperty(item, outline);
    this.defineInternalProperty(this.vals, this.vals.$, item, outline);
  }

  defineInternalBuiltinProperty<I extends keyof PropertiesOutline>(item: I, outline: PropertiesOutline[I]) {
    const propData = Slider89.propertyData[item];
    Object.defineProperty(this, item, {
      set: (val: Props.Base[I]) => {
        if ((propData as any).constructorOnly && !this.initial) {
          throw new Slider89.Error('Property ‘' + item + '’ may only be defined in the constructor (It was just set with the value ‘' + val + '’)');
        }

        this.checkProp(item, val);

        if (!outline.setter || !outline.setter(val)) {
          // @ts-ignore ???
          this.vals[item] = val;
        }
      },
      get: () => {
        const getterEndpoint = (propData as any).isDeepDefinedArray
          ? this.vals.$intermediateThis
          : this.vals;
        // @ts-ignore `getterEndpoint` is safe here
        return (outline.getter ? outline.getter(getterEndpoint[item]) : getterEndpoint[item]);
      },
      enumerable: true
    });
  }

  // ---- Helper functions ----
  defineNodeGetters(nodes) {
    for (const nodeName in nodes) {
      Object.defineProperty(this.vals.node, nodeName, {
        get: () => {
          return nodes[nodeName][0];
        },
        enumerable: true
      });
    }
  }

  checkProp(prop: keyof Props.Base, val: any) {
    const propData = Slider89.propertyData[prop];

    if ('readOnly' in propData) {
      throw new Slider89.Error('Property ‘' + prop + '’ is read-only (It was just set with the value ‘' + val + '’)');
    }

    try {
      RuntimeTypeCheck.checkType(val, propData.descriptor);
    } catch (e) {
      if (e instanceof TypeCheckError) {
        throw new Slider89.PropertyTypeError(this, prop as keyof Props.Writable, e.message);
      } else throw e;
    }
  }

  adaptValueToRange(value: Props.Base['value']) {
    if (this.vals.range[0] < this.vals.range[1]) {
      if (value < this.vals.range[0]) {
        return this.vals.range[0];
      } else if (value > this.vals.range[1]) {
        return this.vals.range[1];
      }
    } else {
      if (value > this.vals.range[0]) {
        return this.vals.range[0];
      } else if (value < this.vals.range[1]) {
        return this.vals.range[1];
      }
    }
    return value;
  }

  // ---- Helper functions ----
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


  /**
   * Inject Slider89's style sheet into the document. This happens only once
   * per document.
   * @see {@link injectCSS} for a way to disable the automatic injection.
   * @see {@link injectedStyleSheet} for the injected style sheet element.
   *
   * @privateRemarks
   * I think that a global Object (like Slider89) cannot be in multiple
   * documents at once. Thus, just setting a global flag to true should be
   * sufficient to mark the current document as already injected.
   */
  static injectStyleSheetIfNeeded() {
    if (this.injectCSS && this.injectedStyleSheet == null) {
      const styleSheetElement = document.createElement('style');
      const firstHeadChild = document.head.firstElementChild;

      styleSheetElement.textContent = defaultStylesString;

      // Ensure that it is the first style sheet in the document
      if (firstHeadChild) {
        document.head.insertBefore(styleSheetElement, firstHeadChild);
      } else {
        document.head.appendChild(styleSheetElement);
      }

      this.injectedStyleSheet = styleSheetElement;
    }
  }
  /**
   * Remove Slider89's style sheet again, if it has already been injected
   * by {@link injectStyleSheetIfNeeded}.
   * @see {@link injectedStyleSheet}.
   */
  static removeInjectedStyleSheet() {
    if (this.injectedStyleSheet != null) {
      document.head.removeChild(this.injectedStyleSheet);
      this.injectedStyleSheet = null;
    }
  }

  // ---- Internal helpers ----
  /**
   * General extend assigner that merges two "array objects" of the form
   * { key: any[] }. Can easily be utilized with `bind()`.
   * @see {@link #mergeArrayObjects}.
   */
  static #arrayObjectAssigner<P extends keyof Props.Config>(
    propertyName: P,
    target: Props.Config,
    value: Exclude<Props.Config[P], false>
  ) {
    target[propertyName] ||= {};
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
