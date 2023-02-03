'use strict';
import Slider89DOM from './Slider89DOM.js';
import Slider89DOMBuilder from './Slider89DOMBuilder.js';
import LibraryTypeCheck from './LibraryTypeCheck.js';

export default class Slider89 extends Slider89DOM {
  methodStructure = {
    addEvent: {
      args: [
        {
          name: 'event type',
          structure: [{
            type: 'string'
          }]
        },
        {
          name: 'event function',
          structure: [{
            type: 'function'
          }]
        },
        {
          name: 'event namespace',
          optional: true,
          structure: [{
            type: 'string',
            conditions: {
              filled: true,
              wordChar: true
            }
          }]
        }
      ]
    },
    removeEvent: {
      args: [
        {
          name: 'event identifier/namespace',
          structure: [
            {
              type: 'number',
              conditions: {
                nonnegative: true,
                integer: true
              }
            },
            {
              type: 'string',
              conditions: {
                filled: true,
                wordChar: true
              }
            }
          ]
        }
      ]
    }
  }

  propertyStructure = {
    range: {
      structure: [
        {
          type: 'array',
          conditions: {
            length: 2
          },
          structure: [
            { type: 'number' }
          ]
        },
        { type: 'boolean' }
      ],
      shape: '[startValue, endValue]',
    },
    values: {
      structure: [{
        type: 'array',
        // TODO condition: at least of size 1
        structure: [{
          type: 'number'
        }]
      }],
    },
    value: {
      structure: [{
        type: 'number'
      }],
    },
    precision: {
      structure: [
        {
          type: 'number',
          conditions: {
            nonnegative: true,
            integer: true
          }
        },
        { type: 'false' }
      ],
    },
    step: {
      structure: [
        {
          type: 'number',
          conditions: {
            positive: true
          }
        },
        { type: 'false' }
      ],
    },
    structure: {
      structure: [
        {
          type: 'string',
          conditions: {
            filled: true
          }
        },
        { type: 'false' }
      ],
    },
    node: {
      default: {},
    },
    orientation: {
      structure: [{
        type: 'string',
        conditions: {
          keywords: [
            'horizontal',
            'vertical'
          ]
        }
      }],
    },
    classList: {
      structure: [
        {
          type: 'object',
          structure: [{
            type: 'array',
            structure: [
              { type: 'string' }
            ]
          }]
        },
        { type: 'false' }
      ],
      shape: '{nodeName: [...classes]}'
    },
    events: {
      structure: [
        {
          type: 'object',
          structure: [{
            type: 'array',
            structure: [{
              type: 'function'
            }]
          }]
        },
        { type: 'false' }
      ],
    }
  };

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
          this.propError('range', 'the given range of [' + val.join(', ') + '] defines the same value for both range start and end');
        }
        if (!this.initial) {
          this.computeAllRatioDistances({range: val});
        }
      },
      keySetter: (val, key) => {
        // Compare `val` with the value at the other key (0 or 1)
        if (val === this.vals.range[Math.abs(key - 1)]) {
          this.propError('range', 'the new range of [' + val + ', ' + val + '] defines the same value for both range start and end');
          return true;
        }
        if (!this.initial) {
          const newRange = Array.from(this.vals.range);
          newRange[key] = val;
          this.computeAllRatioDistances({ range: newRange });
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
              this.computeOneRatioDistance(i);
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
          this.computeOneRatioDistance(key, {value: val});
          if (key === 0) {
            this.handleInternalPropertyChange('value', prevVal);
          }
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
        if (this.initial && this.configHasValues) {
          this.propError('value', 'only one of ‘value’ and ‘values’ may be set in the constructor');
        }
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
          this.computeAllRatioDistances({precision: val});
        }
      }
    },
    step: {
      default: false,
      setter: (val) => {
        if (this.vals.precision !== false && val !== false && Number(val.toFixed(this.vals.precision)) !== val) {
          this.propError('step', 'the given value of ' + val + ' exceeds the currently set precision of ' + this.vals.precision);
        }
        if (!this.initial) {
          this.computeAllRatioDistances({step: val})
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
          this.computeAllRatioDistances();
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
          const msg =
            'the given object contains items which are no valid event types:' + enlistArray(errTypes) +
            'Available event types are:' + enlistArray(Slider89Events.eventTypes);
          this.propError('events', msg);
        }
      }
    }
  };

  domBuilder;
  typeChecker;

  constructor(target, config = {}, replace = false) {
    super();
    this.initial = true;
    this.configHasValues = 'values' in config;

    this.testInitialTarget(target);
    // TODO Bring back possibility to skip `config` with `false`
    this.testInitialConfig(config);

    this.domBuilder = new Slider89DOMBuilder(this.vals, this.touchStart, this.slideStart);
    this.typeChecker = new LibraryTypeCheck();

    this.initializeClassProperties(config);
    this.initializeCustomProperties(config);
    this.initializeMethods();

    this.buildSlider(target, replace);

    this.computeAllRatioDistances();

    // Expanding structure variables initially
    // This happens so late to ensure that $node can be accessed properly
    if (this.vals.structure !== false) {
      for (let variable in this.domBuilder.structureVars) {
        this.updatePotentialVariable(variable);
      }
    }

    this.initial = false;
  }


  testInitialTarget(target) {
    if (!target) {
      this.error('no first argument has been supplied. It needs to be the DOM target node for the slider', 'constructor', true);
    } else if (!target.nodeType || target.nodeType !== 1) {
      this.error('the first argument must be a valid DOM node the slider will be placed into ' + this.typeChecker.typeMsg(target), 'constructor', true);
    }
  }
  testInitialConfig(config) {
    if (config == null || config === false) {
      config = {};
    } else if (typeof config !== 'object' || Array.isArray(config)) {
      this.error('the optional second argument needs to be an object for configuration ' + this.typeChecker.typeMsg(config), 'constructor', true);
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
            this.error('property ‘' + item + '’ may only be read from but it was just set with the value ‘' + val + '’');
          }
          if (prop.initial && !this.initial) {
            this.error('property ‘' + item + '’ may only be set at init time but it was just set with the value ‘' + val + '’');
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
        this.error('‘' + item + '’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_' + item + '’)');
      }
    }
  }

  initializeMethods() {
    const that = this;

    for (let _ in this.methods) {
      const item = _;
      const method = this.methods[item];
      const argCount = this.methodStructure[item].args.length;
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
    const obj = this.methodStructure[method];
    // If the next argument (argList.length - 1 + 1) is not optional, a required arg is missing
    for (let i in argList) {
      const arg = argList[i];
      const msg = this.typeChecker.checkTypes(arg, obj.args[i].structure, false);
      if (msg) this.methodError(method, i, msg);
    }
    if (obj.args[argList.length] && !obj.args[argList.length].optional) {
      this.methodError(method, argList.length, null, true);
    }
  }
  checkProp(prop, val) {
    const item = this.propertyStructure[prop];
    const msg = this.typeChecker.checkTypes(val, item.structure, false);
    if (msg) {
      this.propError(prop, 'property ‘' + prop + '’ must be ' + this.typeChecker.computeTypeMsg(item.structure, item.shape) + ' but it' + msg, true);
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
}

function enlistArray(arr) {
  return '\n - "' + arr.join('"\n - "') + '"\n';
}
