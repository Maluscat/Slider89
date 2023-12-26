'use strict';
import type { Properties } from './Slider89Base';
import type { EventType } from './Slider89Events';
import LibraryTypeCheck from './LibraryTypeCheck';
import Slider89DOM from './Slider89DOM';
import Slider89DOMBuilder from './Slider89DOMBuilder';

type PropertiesOutline = {
  [ Prop in keyof Properties.Base ]: PropertyOutline.self<Properties.Base[Prop]>;
}

namespace PropertyOutline {
  export type self<Type> =
      Default<Type> & Partial<GetterSetter<Type>> & Partial<Additional<Type>>
    | GetterSetter<Type> & Partial<Default<Type>> & Partial<Additional<Type>>;

  type Default<Type> = {
    default: Type | (() => Type);
  }
  type GetterSetter<Type> = {
    setter: (val: Type) => void | boolean;
    getter: (val: Type) => typeof val;
  }
  type Additional<Type> = {
    postSetter: (val: Type, prevVal: Type) => void | boolean;
    keySetter: Type extends Array<any>
      ? (val: Type[0], key: number) => void | boolean
      : never;
    keyGetter: Type extends Array<any>
      ? (val: Type[0], key: number) => typeof val
      : never;
  }
}

export default class Slider89 extends Slider89DOM {
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
          const lengthHasChanged = prevVal.length !== val.length;
          // Manually invoke some property changes
          this.handleInternalPropertyChange('value', prevVal[0]);
          // Invoke `node(s)` property change
          // and invoke a change event if the `values` length has changed.
          this.handleInternalPropertyChange('node', null, !lengthHasChanged);
          this.handleInternalPropertyChange('nodes', null, !lengthHasChanged);
          this.domHandler.expandAllBaseElementVariables();
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
      default: false,
    },
    events: {
      default: {},
      setter: (val) => {
        if (val !== false) {
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
      }
    },
    plugins: {
      default: false
    }
  };

  constructor(target: HTMLElement, config?: Partial<Properties.Config> | false, replace = false) {
    super();
    this.initial = true;

    this.testInitialTarget(target);

    if (config == null || config === false) config = {};
    this.testInitialConfig(config);

    this.initializeClassProperties(config);
    this.initializeCustomProperties(config);

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
      throw new Slider89.InitializationError('The first argument must be a valid DOM node (got ' + LibraryTypeCheck.getType(target) + ')');
    }
  }
  testInitialConfig(config: Partial<Properties.Config>) {
    if (typeof config !== 'object' || Array.isArray(config)) {
      throw new Slider89.InitializationError('The optional second argument needs to be a configuration object (got ' + LibraryTypeCheck.getType(config) + ')');
    } else if ('value' in config && 'values' in config) {
      throw new Slider89.InitializationError('Only one of ‘value’ and ‘values’ may be defined at once');
    }
  }


  // ---- Initialization ----
  initializeClassProperties(config: Partial<Properties.Config>) {
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
  }

  initializeCustomProperties(config: Partial<Properties.Custom>) {
    for (const item in config) {
      if (item[0] === '_') {
        this.defineDeepProperty(this, item as keyof Properties.Custom, this.vals);
        this.vals[item] = config[item];
      } else {
        throw new Slider89.InitializationError(
          '‘' + item + '’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_' + item + '’)');
      }
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
      this.vals.node.slider,
      this.vals.nodes,
      this.vals.classList,
      this.vals.orientation === 'vertical');

    Slider89DOMBuilder.injectStyleSheetIfNeeded();

    this.trackStyle = getComputedStyle(this.vals.node.track);
  }

  // ---- Plugins ----
  callPlugins(plugins: Properties.Base['plugins']) {
    if (plugins === false) return;

    for (const callback of plugins) {
      callback(this);
    }
  }

  // ---- Initialization helpers ----
  initializeProperty<Item extends keyof PropertiesOutline>(item: Item, prop: PropertiesOutline[Item]) {
    const propData = Slider89.propertyData[item];
    const isDeep = 'isDeepDefinedArray' in propData;

    Object.defineProperty(this, item, {
      set: (val: Properties.Base[Item]) => {
        if ('readonly' in propData) {
          throw new Slider89.Error('Property ‘' + item + '’ is read-only (It was just set with the value ‘' + val + '’)');
        }
        if (('constructorOnly' in propData) && !this.initial) {
          throw new Slider89.Error('Property ‘' + item + '’ may only be defined in the constructor (It was just set with the value ‘' + val + '’)');
        }

        this.checkProp(item as keyof Properties.Writable, val);

        if (!prop.setter || !prop.setter(val)) {
          // @ts-ignore ???
          this.vals[item] = val;
        }
      },
      get: () => {
        const getterEndpoint = (isDeep)
          ? this.vals.$intermediateThis
          : this.vals;
        // @ts-ignore `getterEndpoint` is safe here
        return (prop.getter ? prop.getter(getterEndpoint[item]) : getterEndpoint[item]);
      },
      enumerable: true
    });

    this.defineDeepProperty(this.vals, item as keyof Properties.Base, this.vals.$, prop.postSetter, isDeep);
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

  checkProp(prop: keyof Properties.Writable, val: any) {
    const propertyInfo = Slider89.propertyData[prop];
    const typeMsg = LibraryTypeCheck.checkTypes(val, propertyInfo.descriptor);
    if (typeMsg) {
      throw new Slider89.PropertyTypeError(this, prop, propertyInfo, typeMsg);
    }
  }

  adaptValueToRange(value: Properties.Base['value']) {
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
}
