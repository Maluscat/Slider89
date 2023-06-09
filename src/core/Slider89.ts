'use strict';
import type { Properties } from 'Slider89Base';
import type { VariableName } from 'Slider89StructureParser';
import LibraryTypeCheck from './LibraryTypeCheck.js';
import Slider89DOM from './Slider89DOM.js';
import Slider89DOMBuilder from './Slider89DOMBuilder.js';

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
    setter: (val?: Type) => void | boolean;
    getter: (val?: Type) => typeof val;
  }
  type Additional<Type> = {
    postSetter: (val: Type, prevVal: Type) => void | boolean;
    keySetter: Type extends Array<any>
      ? (val?: Type[0], key?: number) => void | boolean
      : never;
    keyGetter: Type extends Array<any>
      ? (val?: Type[0], key?: number) => typeof val
      : never;
  }
}

export default class Slider89 extends Slider89DOM {
  methods = {
    addEvent: {
      function: this.addEvent,
    },
    removeEvent: {
      function: this.removeEvent,
    }
  };

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
              this.addNewThumbNode(i);
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
          // Manually invoke `value` property change
          this.handleInternalPropertyChange('value', prevVal[0]);
          this.handleInternalPropertyChange('node');

          // TODO Perhaps move this into an own function
          // Expanding structure variables which are used in base element tags (thumb and descendants)
          for (const [ propName, stringList ] of Object.entries(this.domBuilder.structureVarThumbStrings)) {
            for (const varString of stringList) {
              const nodeList = this.domBuilder.structureVars[propName][varString];
              this.replaceStructureVarStringInNodes(varString, nodeList);
            }
          }
        }
      },
      keySetter: (val, key) => {
        val = this.adaptValueToRange(val);
        if (!this.initial) {
          if (key === 0) {
            var prevVal = this.value;
          }
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
          this.applyAllRatioDistances({ precision: val });
        }
      }
    },
    step: {
      default: false,
      setter: (val) => {
        if (this.vals.precision !== false && val !== false && Number(val.toFixed(this.vals.precision)) !== val) {
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
      default: {},
    },
    orientation: {
      default: 'horizontal',
      setter: (val) => {
        if (!this.initial) {
          if (val === 'vertical') {
            this.vals.node.thumb.style.removeProperty('left');
            this.vals.node.slider.classList.add('vertical');
          } else {
            this.vals.node.thumb.style.removeProperty('top');
            this.vals.node.slider.classList.remove('vertical');
          }
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
        const errTypes = new Array();
        for (let eventType in val) {
          if (!this.checkEventType(eventType)) errTypes.push(eventType);
        }
        if (errTypes.length > 0) {
          throw new Slider89.PropertyError(this, 'events',
            'The given object contains items which are no valid event types:' + Slider89.arrayToListString(errTypes)
            + 'Available event types are:' + Slider89.arrayToListString(Slider89.availableEventTypes));
        }
      }
    }
  };

  // TODO Make separate typ `PropertiesConfig`, excluding readOnly properties
  // (Like `node`)
  constructor(target: HTMLElement, config?: Partial<Properties.Config> | false, replace = false) {
    super();
    this.initial = true;

    this.testInitialTarget(target);

    if (config == null || config === false) config = {};
    this.testInitialConfig(config);

    this.initializeClassProperties(config);
    this.initializeCustomProperties(config);
    this.initializeMethods();

    this.buildSlider(target, replace);

    this.applyAllRatioDistances();

    // Expanding structure variables initially
    // This happens so late to ensure that $node can be accessed properly
    if (this.vals.structure !== false) {
      for (let variable in this.domBuilder.structureVars) {
        this.updatePotentialStructureVar(variable as VariableName);
      }
    }

    this.initial = false;
  }


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


  // Initialize properties and methods
  initializeClassProperties(config: Partial<Properties.Config>) {
    // NOTE: This section has no strong type checking because propData is of type any
    // Don't even bother trying to fix this, for your own sake
    for (let _ in this.properties) {
      // IE-support: item needs to be a scoped variable because defineProperty is async
      const item = _;
      const prop = this.properties[item];
      const propData = Slider89.propertyData[item];

      Object.defineProperty(this, item, {
        set: (val: Properties.Base[keyof Properties.Base]) => {
          if (propData.readOnly) {
            throw new Slider89.Error('Property ‘' + item + '’ is read-only (It was just set with the value ‘' + val + '’)');
          }
          if (propData.constructorOnly && !this.initial) {
            throw new Slider89.Error('Property ‘' + item + '’ may only be defined in the constructor (It was just set with the value ‘' + val + '’)');
          }

          this.checkProp(item, val);

          if (!prop.setter || !prop.setter(val)) {
            this.vals[item] = val;
          }
        },
        get: () => {
          const getterEndpoint = (propData.isDeepDefinedArray)
            ? this.vals.$intermediateThis
            : this.vals;
          return (prop.getter ? prop.getter(getterEndpoint[item]) : getterEndpoint[item]);
        },
        enumerable: true
      });

      this.defineDeepProperty(this.vals, item as keyof Properties.Base, this.vals.$, prop.postSetter, propData.isDeepDefinedArray);

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
    for (let _ in config) {
      const item = _;

      if (item[0] === '_') {
        this.defineDeepProperty(this, item as keyof Properties.Custom, this.vals);
        this.vals[item] = config[item];
      } else {
        throw new Slider89.InitializationError(
          '‘' + item + '’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_' + item + '’)');
      }
    }
  }

  initializeMethods() {
    const that = this;

    for (let _ in this.methods) {
      const item = _;
      const method = this.methods[item];
      const argCount = Slider89.methodData[item].args.length;
      this[item] = function() {
        const args = Array.prototype.slice.call(arguments, 0, argCount);
        that.checkMethod(item, args);
        return method.function.apply(this, args);
      }
    }
  }

  buildSlider(target: HTMLElement, replace: boolean) {
    this.vals.node = this.domBuilder.createSliderNode(this.vals.values.length, this.vals.structure);

    if (replace) {
      this.domBuilder.addAttributesFromTarget(this.vals.node, target);
    }
    this.domBuilder.addClasses(this.vals.node, this.vals.classList, this.vals.orientation === 'vertical');

    Slider89DOMBuilder.injectStyleSheetIfNeeded();

    if (replace) {
      target.parentNode.replaceChild(this.vals.node.slider, target);
    } else {
      target.appendChild(this.vals.node.slider);
    }

    this.trackStyle = getComputedStyle(this.vals.node.track);
  }

  // ---- Helper functions ----
  // Check properties & methods for the correct type & format
  checkMethod(method, argList) {
    const obj = Slider89.methodData[method];
    // If the next argument (argList.length - 1 + 1) is not optional, a required arg is missing
    for (let i in argList) {
      const arg = argList[i];
      const typeMsg = LibraryTypeCheck.checkTypes(arg, obj.args[i].descriptor);
      if (typeMsg) throw new Slider89.MethodArgTypeError(method, i, typeMsg);
    }
    if (obj.args[argList.length] && !obj.args[argList.length].optional) {
      throw new Slider89.MethodArgOmitError(method, argList.length);
    }
  }
  checkProp(prop, val) {
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
}
