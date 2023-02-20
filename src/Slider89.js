'use strict';
import Slider89DOM from './Slider89DOM.js';
import Slider89DOMBuilder from './Slider89DOMBuilder.js';

export default class Slider89 extends Slider89DOM {
  methods = {
    addEvent: {
      function: this.addEvent,
    },
    removeEvent: {
      function: this.removeEvent,
    }
  };

  properties = {
    range: {
      isDeepDefinedArray: true,
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
          const newRange = Array.from(this.vals.range);
          newRange[key] = val;
          this.applyAllRatioDistances({ range: newRange });
        }
      }
    },
    values: {
      isDeepDefinedArray: true,
      default: () => {
        return [this.vals.range[0]];
      },
      setter: (val) => {
        if (!this.initial) {
          // Add/remove thumbs if the given array is bigger/smaller than the current `values` array
          if (val.length > this.vals.values.length) {
            for (let i = this.vals.values.length; i < val.length; i++) {
              this.vals.node.thumb.push(this.domBuilder.createNewThumb());
              this.applyOneRatioDistance(i);
            }
          } else if (val.length < this.vals.values.length) {
            for (let i = val.length; i < this.vals.values.length; i++) {
              this.domBuilder.thumbParent.removeChild(this.vals.node.thumb.pop());
            }
          }
        }
      },
      postSetter: (val, prevVal) => {
        if (!this.initial) {
          // Manually invoke `value` property change
          this.handleInternalPropertyChange('value', prevVal[0]);
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
      initial: true
    },
    node: {
      default: {},
      static: true
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
      initial: true,
    },
    events: {
      default: {},
      initial: true,
      setter: (val) => {
        const errTypes = new Array();
        for (let eventType in val) {
          if (!this.checkEventType(eventType)) errTypes.push(eventType);
        }
        if (errTypes.length > 0) {
          throw new Slider89.PropertyError(this, 'events',
            'The given object contains items which are no valid event types:' + Slider89.arrayToListString(errTypes)
            + 'Available event types are:' + Slider89.arrayToListString(Slider89.eventTypes));
        }
      }
    }
  };

  domBuilder;

  constructor(target, config, replace = false) {
    super();
    this.initial = true;

    this.testInitialTarget(target);

    if (config == null || config === false) config = {};
    this.testInitialConfig(config);

    this.domBuilder = new Slider89DOMBuilder(this.vals, {
      touchstart: this.touchStart,
      mousedown: this.slideStart,
      keydown: this.keyDown
    });

    this.initializeClassProperties(config);
    this.initializeCustomProperties(config);
    this.initializeMethods();

    this.buildSlider(target, replace);

    this.applyAllRatioDistances();

    // Expanding structure variables initially
    // This happens so late to ensure that $node can be accessed properly
    if (this.vals.structure !== false) {
      for (let variable in this.domBuilder.structureVars) {
        this.updatePotentialStructureVar(variable);
      }
    }

    this.initial = false;
  }


  testInitialTarget(target) {
    if (!target) {
      throw new Slider89.InitializationError('No first argument has been supplied. It needs to be the DOM target node for the slider');
    } else if (!target.nodeType || target.nodeType !== 1) {
      throw new Slider89.InitializationError('The first argument must be a valid DOM node (got ' + Slider89.TypeCheck.getType(target) + ')');
    }
  }
  testInitialConfig(config) {
    if (typeof config !== 'object' || Array.isArray(config)) {
      throw new Slider89.InitializationError('The optional second argument needs to be a configuration object (got ' + Slider89.TypeCheck.getType(config) + ')');
    } else if ('value' in config && 'values' in config) {
      throw new Slider89.InitializationError('Only one of ‘value’ and ‘values’ may be defined at once');
    }
  }


  // Initialize properties and methods
  initializeClassProperties(config) {
    for (let _ in this.properties) {
      // IE-support: item needs to be a scoped variable because defineProperty is async
      const item = _;
      const prop = this.properties[item];

      Object.defineProperty(this, item, {
        set: (val) => {
          if (prop.static) {
            throw new Slider89.Error('Property ‘' + item + '’ is read-only (It was just set with the value ‘' + val + '’)');
          }
          if (prop.initial && !this.initial) {
            throw new Slider89.Error('Property ‘' + item + '’ may only be set at init time (It was just set with the value ‘' + val + '’)');
          }
          this.checkProp(item, val);
          if (!prop.setter || !prop.setter(val)) {
            this.vals[item] = val;
          }
        },
        get: () => {
          const getterEndpoint = (prop.isDeepDefinedArray ? this.vals.$intermediateThis : this.vals);
          return (prop.getter ? prop.getter(getterEndpoint[item]) : getterEndpoint[item]);
        },
        enumerable: true
      });

      this.defineDeepProperty(this.vals, item, this.vals.$, prop.postSetter, prop.isDeepDefinedArray);

      if (item in config) {
        this[item] = config[item];
        delete config[item];
      } else if ('default' in prop) {
        const def = prop.default;
        ((prop.getter || prop.keyGetter) ? this : this.vals)[item] = (typeof def === 'function' ? def() : def);
      }
    }
  }

  initializeCustomProperties(config) {
    for (let _ in config) {
      const item = _;

      if (item[0] === '_') {
        this.defineDeepProperty(this, item, this.vals);
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
      const argCount = Slider89.methodStructure[item].args.length;
      this[item] = function() {
        const args = Array.prototype.slice.call(arguments, 0, argCount);
        that.checkMethod(item, args);
        return method.function.apply(this, args);
      }
    }
  }

  buildSlider(target, replace) {
    this.vals.node = this.domBuilder.createSliderNode(this.vals.values.length, this.vals.structure);

    if (replace) {
      this.domBuilder.addAttributesFromTarget(this.vals.node, target);
    }
    this.domBuilder.addClasses(this.vals.node, this.vals.classList, this.vals.orientation === 'vertical');
    this.domBuilder.createStyleSheet();

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
    const obj = Slider89.methodStructure[method];
    // If the next argument (argList.length - 1 + 1) is not optional, a required arg is missing
    for (let i in argList) {
      const arg = argList[i];
      const typeMsg = Slider89.TypeCheck.checkTypes(arg, obj.args[i].structure);
      if (typeMsg) throw new Slider89.MethodArgTypeError(method, i, typeMsg);
    }
    if (obj.args[argList.length] && !obj.args[argList.length].optional) {
      throw new Slider89.MethodArgOmitError(method, argList.length);
    }
  }
  checkProp(prop, val) {
    const propertyInfo = Slider89.propertyStructure[prop];
    const typeMsg = Slider89.TypeCheck.checkTypes(val, propertyInfo.structure);
    if (typeMsg) {
      throw new Slider89.PropertyTypeError(this, prop, propertyInfo, typeMsg);
    }
  }

  adaptValueToRange(value) {
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
  static floatIsEqual(val0, val1) {
    return Math.abs(val0 - val1) < 0.00000000001;
  }
}
