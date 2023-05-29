(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Slider89"] = factory();
	else
		root["Slider89"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/LibraryTypeCheck.js":
/*!**************************************!*\
  !*** ./src/core/LibraryTypeCheck.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ LibraryTypeCheck; }
/* harmony export */ });

class LibraryTypeCheck {
  static getType(value) {
    if (Array.isArray(value))
      return 'Array';
    else if (Number.isNaN(value))
      return 'NaN';
    else if (value === null)
      return 'null';
    else
      return typeof value;
  }

  static checkTypes(val, descriptor) {
    let msg;
    for (let i = 0; i < descriptor.length; i++) {
      const typeData = descriptor[i];
      const type = typeData.type;
      if (
        type === 'boolean' && typeof val === 'boolean' ||
        type === 'true' && val === true ||
        type === 'false' && val === false ||
        type === 'array' && Array.isArray(val) ||
        type === 'object' && Object.prototype.toString.call(val) === '[object Object]' ||
        type === 'number' && typeof val === 'number' && !Number.isNaN(val) ||
        type === 'function' && typeof val === 'function' ||
        type === 'string' && typeof val === 'string'
      ) {
        if (type === 'array') {
          for (let j = 0; j < val.length; j++) {
            if (msg = LibraryTypeCheck.checkTypes(val[j], typeData.descriptor)) break;
          }
        } else if (type === 'object') {
          for (let key in val) {
            if (msg = LibraryTypeCheck.checkTypes(val[key], typeData.descriptor)) break;
          }
        }

        if (msg) {
          return LibraryTypeCheck.toTitleCase(type) + '<' + msg + '>';
        }
        if (msg = LibraryTypeCheck.buildConditionTypeMessage(typeData.conditions, val)) break;
        else return false;
      }
    }
    return msg || LibraryTypeCheck.getType(val);
  }

  static buildConditionTypeMessage(conditions, val) {
    if (!conditions) return;

    if (conditions.nonnegative && val < 0) {
      return 'a negative number';
    }
    if (conditions.positive && val <= 0) {
      return 'a negative number or 0';
    }
    if (conditions.integer && val % 1 !== 0) {
      return 'a floating point number';
    }
    if (conditions.filled && val.trim() === '') {
      return 'an empty string';
    }
    if (conditions.keywords && conditions.keywords.indexOf(val) === -1) {
      return 'a different string';
    }
    if (conditions.wordChar && !Number.isNaN(Number(val))) {
      return 'a number string';
    }
    if (conditions.length && val.length !== conditions.length) {
      return 'an array of length ' + val.length;
    }
  }

  // Compute an automated error message regarding the property's types and conditions
  static buildDescriptorTypeMessage(descriptor) {
    let msg = '';
    for (let i = 0; i < descriptor.length; i++) {
      const typeData = descriptor[i];
      const type = typeData.type;
      const cond = typeData.conditions;

      if (msg) msg += ' OR ';

      if (type === 'number') {
        const nonnegative = cond && cond.nonnegative;
        const positive = cond && cond.positive;
        const isInt = cond && cond.integer;

        if (nonnegative) {
          msg += 'non-negative ';
        } else if (positive) {
          msg += 'positive '
        }
        msg += (isInt ? 'integer' : 'number');
      }

      else if (type === 'array') {
        const innerType = LibraryTypeCheck.buildDescriptorTypeMessage(typeData.descriptor);
        msg += 'Array<' + innerType + '>';
        if (cond && cond.length) {
          msg += ' of length ' + cond.length;
        }
      }

      else if (type === 'object') {
        const innerType = LibraryTypeCheck.buildDescriptorTypeMessage(typeData.descriptor);
        msg += 'Object<' + typeData.keyName + ', ' + innerType + '>';
      }

      else if (type === 'string') {
        if (cond && cond.keywords) {
          if (cond.keywords.length > 1) {
            msg += 'one of the keywords';
          } else {
            msg += 'the keyword';
          }
          cond.keywords.forEach(function(val, n, arr) {
            if (n !== 0 && n === arr.length - 1) {
              msg += ' or';
            } else if (n !== 0) {
              msg += ',';
            }
            msg += ' "' + val + '"';
          });
        } else {
          if (cond && cond.filled) msg += 'non-empty ';
          if (cond && cond.wordChar) msg += 'non-number ';
          msg += 'string';
        }
      }

      else {
        msg += type;
      }

      if (typeData.shape) {
        msg += ' (' + typeData.shape + ')';
      }
    }

    return msg;
  }

  // ---- Helper functions ----
  static toTitleCase(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
}


/***/ }),

/***/ "./src/core/Slider89.js":
/*!******************************!*\
  !*** ./src/core/Slider89.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89; }
/* harmony export */ });
/* harmony import */ var _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LibraryTypeCheck.js */ "./src/core/LibraryTypeCheck.js");
/* harmony import */ var _Slider89DOM_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89DOM.js */ "./src/core/Slider89DOM.js");
/* harmony import */ var _Slider89DOMBuilder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89DOMBuilder.js */ "./src/core/Slider89DOMBuilder.js");





class Slider89 extends _Slider89DOM_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
            + 'Available event types are:' + Slider89.arrayToListString(Slider89.eventTypes));
        }
      }
    }
  };

  constructor(target, config, replace = false) {
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
        this.updatePotentialStructureVar(variable);
      }
    }

    this.initial = false;
  }


  testInitialTarget(target) {
    if (!target) {
      throw new Slider89.InitializationError('No first argument has been supplied. It needs to be the DOM target node for the slider');
    } else if (!target.nodeType || target.nodeType !== 1) {
      throw new Slider89.InitializationError('The first argument must be a valid DOM node (got ' + _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"].getType(target) + ')');
    }
  }
  testInitialConfig(config) {
    if (typeof config !== 'object' || Array.isArray(config)) {
      throw new Slider89.InitializationError('The optional second argument needs to be a configuration object (got ' + _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"].getType(config) + ')');
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
      const propData = Slider89.propertyData[item];

      Object.defineProperty(this, item, {
        set: (val) => {
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
          const getterEndpoint = (propData.isDeepDefinedArray ? this.vals.$intermediateThis : this.vals);
          return (prop.getter ? prop.getter(getterEndpoint[item]) : getterEndpoint[item]);
        },
        enumerable: true
      });

      this.defineDeepProperty(this.vals, item, this.vals.$, prop.postSetter, propData.isDeepDefinedArray);

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
      const argCount = Slider89.methodData[item].args.length;
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

    _Slider89DOMBuilder_js__WEBPACK_IMPORTED_MODULE_2__["default"].injectStyleSheetIfNeeded();

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
      const typeMsg = _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"].checkTypes(arg, obj.args[i].descriptor);
      if (typeMsg) throw new Slider89.MethodArgTypeError(method, i, typeMsg);
    }
    if (obj.args[argList.length] && !obj.args[argList.length].optional) {
      throw new Slider89.MethodArgOmitError(method, argList.length);
    }
  }
  checkProp(prop, val) {
    const propertyInfo = Slider89.propertyData[prop];
    const typeMsg = _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"].checkTypes(val, propertyInfo.descriptor);
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


/***/ }),

/***/ "./src/core/Slider89Base.js":
/*!**********************************!*\
  !*** ./src/core/Slider89Base.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89Base; }
/* harmony export */ });
/* harmony import */ var _Slider89Error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89Error.js */ "./src/core/Slider89Error.js");



class Slider89Base extends _Slider89Error_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static methodData = {
    addEvent: {
      args: [
        {
          name: 'event type',
          descriptor: [{
            type: 'string'
          }]
        },
        {
          name: 'event function',
          descriptor: [{
            type: 'function'
          }]
        },
        {
          name: 'event namespace',
          optional: true,
          descriptor: [{
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
          descriptor: [
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
  static propertyData = {
    range: {
      isDeepDefinedArray: true,
      descriptor: [
        {
          type: 'array',
          shape: '[startValue, endValue]',
          conditions: {
            length: 2
          },
          descriptor: [
            { type: 'number' }
          ]
        },
        { type: 'boolean' }
      ]
    },
    values: {
      isDeepDefinedArray: true,
      descriptor: [{
        type: 'array',
        // TODO condition: at least of size 1
        descriptor: [{
          type: 'number'
        }]
      }]
    },
    value: {
      descriptor: [{
        type: 'number'
      }]
    },
    precision: {
      descriptor: [
        {
          type: 'number',
          conditions: {
            nonnegative: true,
            integer: true
          }
        },
        { type: 'false' }
      ]
    },
    step: {
      descriptor: [
        {
          type: 'number',
          conditions: {
            positive: true
          }
        },
        { type: 'false' }
      ]
    },
    structure: {
      constructorOnly: true,
      descriptor: [
        {
          type: 'string',
          conditions: {
            filled: true
          }
        },
        { type: 'false' }
      ]
    },
    node: {
      readOnly: true
    },
    orientation: {
      descriptor: [{
        type: 'string',
        conditions: {
          keywords: [
            'horizontal',
            'vertical'
          ]
        }
      }]
    },
    classList: {
      constructorOnly: true,
      descriptor: [
        {
          type: 'object',
          shape: '{nodeName: [...classes]}',
          keyName: 'nodeName',
          descriptor: [{
            type: 'array',
            descriptor: [
              { type: 'string' }
            ]
          }]
        },
        { type: 'false' }
      ]
    },
    events: {
      constructorOnly: true,
      descriptor: [
        {
          type: 'object',
          shape: '{eventName: [...functions]}',
          keyName: 'eventName',
          descriptor: [{
            type: 'array',
            descriptor: [{
              type: 'function'
            }]
          }]
        },
        { type: 'false' }
      ]
    }
  };

  methods;
  properties;

  vals = {}; // holding every class property
  initial = false;

  constructor() {
    super();

    /* Special properties which are only to be accessed by a getter/setter, never directly:
     *   $: Fixed endpoint for the values of all properties
     *   $intermediateThis: Intermediate property (between this and vals) for the keys of an array/object
     *   $intermediateVals: Intermediate property (between vals and vals.$) for the keys of an array/object
     *
     * This results in the following getter/setter paths:
     *   Normal (primitive & shallow) properties:
     *     <this.property>   --- Type check & Custom getter/setter --->
     *     <vals.property>   --- Internal property update --->
     *     <vals.$.property>
     *   Deeply defined Arrays:
     *     <this.property>                        --- Type check & Custom getter/setter --->
     *     <vals.$intermediateThis.property = []> --- Custom getter/setter on the keys/indexes --->
     *     <vals.property>                        --- Internal property update --->
     *     <vals.$intermediateVals.property = []> --- Internal property[key/index] update --->
     *     <vals.$.property>
     *
     * Object.defineProperties is used for non-enumerability & non-writability of these special properties.
     */
    Object.defineProperties(this.vals, {
      '$': {
        value: {}
      },
      '$intermediateThis': {
        value: {}
      },
      '$intermediateVals': {
        value: {}
      },
    });
  }
}


/***/ }),

/***/ "./src/core/Slider89DOM.js":
/*!*********************************!*\
  !*** ./src/core/Slider89DOM.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89DOM; }
/* harmony export */ });
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.js");
/* harmony import */ var _Slider89DOMBuilder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89DOMBuilder.js */ "./src/core/Slider89DOMBuilder.js");
/* harmony import */ var _Slider89Properties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89Properties.js */ "./src/core/Slider89Properties.js");





class Slider89DOM extends _Slider89Properties_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  activeTouchIDs = new Map();
  activeThumb;
  mouseDownPos;

  trackStyle;

  domBuilder;

  constructor() {
    super();

    this.mouseStart = this.mouseStart.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseEnd = this.mouseEnd.bind(this);

    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.keyDown = this.keyDown.bind(this);

    this.domBuilder = new _Slider89DOMBuilder_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.vals, {
      touchstart: this.touchStart,
      mousedown: this.mouseStart,
      keydown: this.keyDown
    });
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
    if (!_Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].floatIsEqual(ratio, prevRatio)) this.moveThumbRelative(this.vals.node.thumb[thumbIndex], ratio);
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
  removeLastThumbNode() {
    const thumb = this.domBuilder.removeThumbFromNode(this.vals.node);
    this.domBuilder.thumbParent.removeChild(thumb);
  }
  addNewThumbNode(thumbIndex) {
    this.domBuilder.addThumbToNode(this.vals.node);
    this.applyOneRatioDistance(thumbIndex);
  }

  setValuesWithValueChange(thumbIndex, value) {
    const prevVal = this.vals.values[thumbIndex];
    if (!_Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].floatIsEqual(value, prevVal)) {
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
    // changedTouches should always be of length 1 because no two touches can trigger one event.
    const touch = e.changedTouches[0];
    if (!this.activeTouchIDs.has(touch.identifier)) {
      const thumbNode = e.target;
      this.activeTouchIDs.set(touch.identifier, thumbNode);

      this.slideStart(thumbNode, touch, e);

      thumbNode.addEventListener('touchmove', this.touchMove, { passive: false });
      thumbNode.addEventListener('touchend', this.touchEnd);
      thumbNode.addEventListener('touchcancel', this.touchEnd);
    }
  }
  touchMove(e) {
    e.preventDefault();
    for (const touch of e.changedTouches) {
      if (this.activeTouchIDs.has(touch.identifier)) {
        const thumbNode = this.activeTouchIDs.get(touch.identifier);

        this.slideMove(thumbNode, touch, e);
      }
    }
  }
  touchEnd(e) {
    e.preventDefault();
    for (const touch of e.changedTouches) {
      if (this.activeTouchIDs.has(touch.identifier)) {
        const thumbNode = this.activeTouchIDs.get(touch.identifier);
        this.activeTouchIDs.delete(touch.identifier);

        this.slideEnd(thumbNode, touch, e);

        thumbNode.removeEventListener('touchmove', this.touchMove, { passive: false });
        thumbNode.removeEventListener('touchend', this.touchEnd);
        thumbNode.removeEventListener('touchcancel', this.touchEnd);
      }
    }
  }

  // ---- Mouse events ----
  mouseStart(e) {
    const thumbNode = e.currentTarget;
    document.body.classList.add('sl89-noselect');

    this.slideStart(thumbNode, e);

    if (!this.activeThumb) {
      this.activeThumb = thumbNode;
      window.addEventListener('mousemove', this.mouseMove);
      window.addEventListener('mouseup', this.mouseEnd);
    }
  }
  mouseMove(e) {
    this.slideMove(this.activeThumb, e);
  }
  mouseEnd(e) {
    this.slideEnd(this.activeThumb, e);

    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseEnd);
    this.mouseDownPos = null;
    this.activeThumb = null;
  }

  // ---- General event handlers ----
  slideStart(thumbNode, e, eventArg = e) {
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
  slideMove(thumbNode, e, eventArg = e) {
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
  slideEnd(thumbNode, e, eventArg = e) {
    const thumbIndex = this.vals.node.thumb.indexOf(thumbNode);

    this.applyOneRatioDistance(thumbIndex);
    thumbNode.style.removeProperty('transform');

    this.invokeEvent(['end'], eventArg);
    thumbNode.classList.remove('active');
    document.body.classList.remove('sl89-noselect');
  }


  // ---- Misc events ----
  keyDown(e) {
    if (!e.key.startsWith('Arrow')) return;

    const thumbIndex = this.vals.node.thumb.indexOf(e.currentTarget);

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


/***/ }),

/***/ "./src/core/Slider89DOMBuilder.js":
/*!****************************************!*\
  !*** ./src/core/Slider89DOMBuilder.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89DOMBuilder; }
/* harmony export */ });
/* harmony import */ var _css_default_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/default-styles.css */ "./src/css/default-styles.css");
/* harmony import */ var _css_default_styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_default_styles_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.js");
/* harmony import */ var _Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89StructureParser.js */ "./src/core/Slider89StructureParser.js");

// @ts-ignore




class Slider89DOMBuilder extends _Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  static hasInjectedStylesheet = false;

  thumbBase; // Clonable thumb node
  thumbParent;

  baseElements = {};

  structureVarThumbStrings = {};

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
    this.parsePostProcess(node, thumbCount);
    return node;
  }

  parsePostProcess(node, thumbCount) {
    // NOTE: thumb and track can be defined independently
    // I.e. track gets the class `sl89-track`, but this.thumbParent can be a different node
    if (!node.thumb) {
      this.thumbBase = this.assembleElement(node, 'thumb', 'div');
    } else {
      this.thumbBase = node.thumb;
      if (node.track) {
        this.thumbParent = node.thumb.parentNode;
      }
      // baseElements is only effective if a structure thumb has been defined
      this.baseElements.thumb = this.thumbBase;
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

    // Push thumb & descendants into node arrays
    node.thumb = new Array();
    for (const nodeName of this.thumbChildren) {
      this.baseElements[nodeName] = node[nodeName];
      node[nodeName] = new Array();
    }

    this.findStructureVarStringsInThumb(this.thumbBase);

    for (let i = 0; i < thumbCount; i++) {
      this.addThumbToNode(node);
    }
  }

  findStructureVarStringsInThumb(thumbBase) {
    for (const [ propName, stringList ] of Object.entries(this.structureVars)) {
      let thumbStrings = [];
      for (const [ str, nodeList ] of Object.entries(stringList)) {
        for (const node of nodeList) {
          if (this.nodeHasBaseElementOwner(node)) {
            thumbStrings.push(str);
            break;
          }
        }
      }
      if (thumbStrings.length > 0) {
        this.structureVarThumbStrings[propName] = thumbStrings;
      }
    }
  }


  // ---- Thumb helpers ----
  addThumbToNode(node) {
    const newThumb = this.createNewThumb();
    node.thumb.push(newThumb);

    Slider89DOMBuilder.findNodeChildren(newThumb)
      .forEach((childNode, j) => {
        const childName = this.thumbChildren[j];
        node[childName].push(childNode);
      });
  }
  removeThumbFromNode(node) {
    for (const nodeName of this.thumbChildren) {
      node[nodeName].pop();
    }
    return node.thumb.pop();
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
        "The given object contains items which aren't nodes of this slider:" + _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].arrayToListString(errNodes) +
        "Following nodes are part of this slider's node pool:" + _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].arrayToListString(Object.keys(node))
      throw new _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].Error(msg, 'classList', true);
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
      newThumb.addEventListener(eventName, callback, {
        passive: !eventName.startsWith('touch')
      });
    }
    this.thumbParent.appendChild(newThumb);
    return newThumb;
  }

  nodeHasBaseElementOwner(node) {
    for (const [ baseName, element ] of Object.entries(this.baseElements)) {
      if (_Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__["default"].getNodeOwner(node) === element) return baseName;
    }
    return false;
  }

  // ---- Static style sheet creation ----
  // NOTE: I think that a global Object (like Slider89) cannot be in multiple
  // documents at once. Thus, just setting a global flag to true should be
  // sufficient to mark the current document as already injected.
  static injectStyleSheetIfNeeded() {
    if (Slider89DOMBuilder.hasInjectedStylesheet === false) {
      const styleSheetElement = document.createElement('style');
      const firstHeadChild = document.head.firstElementChild;

      styleSheetElement.textContent = (_css_default_styles_css__WEBPACK_IMPORTED_MODULE_0___default());

      // Ensure that it is the first style sheet in the document
      if (firstHeadChild) {
        document.head.insertBefore(styleSheetElement, firstHeadChild);
      } else {
        document.head.appendChild(styleSheetElement);
      }

      Slider89DOMBuilder.hasInjectedStylesheet = true;
    }
  }

  /**
   * Recursively iterate through a node's children, collecting them in an array in order.
   * When used on a thumb node, the result is analogous to {@link thumbChildren}.
   * @param { HTMLElement } node The input node.
   * @param { Array<HTMLElement> } collector
   * @return { Array<HTMLElement> } All children of the input node.
   */
  static findNodeChildren(node, collector = []) {
    if (node.childElementCount === 0) return collector;

    for (const child of node.children) {
      collector.push(child);
      Slider89DOMBuilder.findNodeChildren(child, collector);
    }
    return collector;
  }
}


/***/ }),

/***/ "./src/core/Slider89Error.js":
/*!***********************************!*\
  !*** ./src/core/Slider89Error.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89Error; }
/* harmony export */ });
/* harmony import */ var _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LibraryTypeCheck.js */ "./src/core/LibraryTypeCheck.js");
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.js");




class Slider89Error {
  static COUNTS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];

  static Error = class extends Error {
    constructor(msg, target, abort = false) {
      if (target) {
        msg = '@ ' + target + ': ' + msg;
      }
      if (msg[msg.length - 1] !== '\n' && msg[msg.length - 1] !== '.') {
        msg += '.';
      }
      if (abort) {
        msg += '\nAborting the slider construction.';
      }

      super(msg);
      this.name = 'Slider89' + this.constructor.name;
    }
  }

  // ---- Constructor error ----
  static InitializationError = class extends Slider89Error.Error {
    constructor(msg) {
      super(msg, 'constructor', true);
    }
  }

  // ---- Property errors ----
  static PropertyError = class extends Slider89Error.Error {
    constructor(slider, property, msg) {
      let prevVal = slider[property];
      if (prevVal !== undefined) {
        if (Array.isArray(prevVal)) {
          prevVal = '[' + prevVal.join(', ') + ']';
        }
        msg += '.\nContinuing with the previous value (' + prevVal + ').';
      }

      super(msg, property, prevVal === undefined);
    }
  }
  static PropertyTypeError = class extends Slider89Error.PropertyError {
    constructor(slider, propertyName, propertyInfo, typeMsg) {
      let msg =
        'Type mismatch.'
        + _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].getTypeErrorMessage(propertyInfo.descriptor, typeMsg);

      super(slider, propertyName, msg);
    }
  }

  // ---- Method errors ----
  static MethodArgTypeError = class extends Slider89Error.Error {
    constructor(methodName, index, typeMsg) {
      const argInfo = _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].getMethodArgInfo(methodName, index);
      const msg =
        'Type mismatch on the ' + Slider89Error.getMethodArgMessage(argInfo, index) + '.'
        + _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].getTypeErrorMessage(argInfo.descriptor, typeMsg);

      super(msg, methodName);
    }
  }
  static MethodArgOmitError = class extends Slider89Error.Error {
    constructor(methodName, index) {
      const argInfo = _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].getMethodArgInfo(methodName, index);
      const msg =
        'The ' + Slider89Error.getMethodArgMessage(argInfo, index)
        + ' has been omitted but it is required'
        + ' (It must be of type ' + _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"].buildDescriptorTypeMessage(argInfo.descriptor) + ').';

      super(msg, methodName);
    }
  }

  // ---- Structure errors ----
  static StructureError = class extends Slider89Error.Error {
    constructor(msg) {
      super(msg, 'structure', true);
    }
  }
  static StructureParseError = class extends Slider89Error.StructureError {
    constructor(beforeFailure, pointOfFailure) {
      const msg =
        "Something has been declared wrongly and couldn't be parsed. Point of failure "
        + "(before " + beforeFailure + "):\n\n"
        + pointOfFailure + '\n';
      super(msg);
    }
  }

  // ---- Helper functions ----
  static getTypeErrorMessage(descriptor, typeMsg) {
    return ' Expected ' + _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"].buildDescriptorTypeMessage(descriptor) + ','
         + ' got ' + typeMsg;
  }

  static getMethodArgMessage(argInfo, index) {
    let msg = '';
    if (argInfo.optional) {
      msg += 'optional ';
    }
    msg += _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].COUNTS[index] + ' argument (' + argInfo.name + ')';
    return msg;
  }

  static getMethodArgInfo(methodName, index) {
    return _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].methodData[methodName].args[index];
  }

  static arrayToListString(arr) {
    return '\n - "' + arr.join('"\n - "') + '"\n';
  }
}


/***/ }),

/***/ "./src/core/Slider89Events.js":
/*!************************************!*\
  !*** ./src/core/Slider89Events.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89Events; }
/* harmony export */ });
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.js");
/* harmony import */ var _Slider89Base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89Base.js */ "./src/core/Slider89Base.js");




class Slider89Events extends _Slider89Base_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  static eventTypes = [
    'start',
    'move',
    'end',
    'change:$property'
  ];


  eventList = {}; // Storing event data (most notably the identifier) for event removability
  eventID = 0;


  // ---- Class methods ----
  addEvent(type, fn, name) {
    if (!this.checkEventType(type)) {
      throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].Error(
        'The specified event type ‘' + type + '’ is not valid. Available types are:' + _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].arrayToListString(Slider89Events.eventTypes),
        'addEvent');
    }

    if (!Array.isArray(this.vals.events[type])) this.vals.events[type] = new Array();
    this.vals.events[type].push(fn);
    const key = name || this.eventID;
    const obj = {
      type: type,
      fn: fn
    };
    if (name) {
      if (!Array.isArray(this.eventList[key])) this.eventList[key] = new Array();
      this.eventList[key].push(obj);
    } else {
      this.eventList[key] = obj;
    }
    return name || this.eventID++;
  }
  removeEvent(key) {
    const eventInfo = this.eventList[key];
    if (!eventInfo) return false;
    delete this.eventList[key];
    return Array.isArray(eventInfo)
      ? eventInfo.reduce(this.handleRemoveEvent.bind(this), new Array())
      : this.handleRemoveEvent(new Array(), eventInfo);
  }


  // ---- Helper functions ----
  handleRemoveEvent(deleteCollection, eventInfo) {
    const typeEvents = this.vals.events[eventInfo.type];
    const deleted = typeEvents.splice(typeEvents.indexOf(eventInfo.fn), 1)[0];
    if (typeEvents.length === 0) delete this.vals.events[eventInfo.type];
    deleteCollection.push(deleted);
    return deleteCollection;
  }

  invokeEvent(types) {
    const args = Array.from(arguments);
    args[0] = this;
    for (let i = 0; i < types.length; i++) {
      const functions = this.vals.events[types[i]];
      if (functions) {
        for (let n = 0; n < functions.length; n++) {
          functions[n].apply(this, args);
        }
      }
    }
  }

  checkEventType(type) {
    if (type.indexOf('change:') === 0) {
      // Edge case for 'change:$property'
      const customProp = type.slice('change:'.length);
      if (!Object.prototype.hasOwnProperty.call(this.vals, customProp)) {
        const msg =
          "‘" + type + "’ refers to ‘" + customProp + "’, which isn't a recognized property. "
          + "Check its spelling and be aware that custom properties need to be initialized";
        throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].Error(msg, 'addEvent');
      }
    } else if (Slider89Events.eventTypes.indexOf(type) === -1) return false;
    return true;
  }
}


/***/ }),

/***/ "./src/core/Slider89Properties.js":
/*!****************************************!*\
  !*** ./src/core/Slider89Properties.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89Properties; }
/* harmony export */ });
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.js");
/* harmony import */ var _Slider89Events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89Events.js */ "./src/core/Slider89Events.js");
/* harmony import */ var _Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89StructureParser.js */ "./src/core/Slider89StructureParser.js");





class Slider89Properties extends _Slider89Events_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  // ------ Object definition ------
  defineDeepProperty(target, item, endpoint, postSetter, isDeepDefinedArray) {
    Object.defineProperty(target, item, {
      set: (val) => {
        if (!this.initial) {
          var prevVal = (isDeepDefinedArray ? Array.from(this[item]) : this[item]);
        }
        endpoint[item] = val;
        if (isDeepDefinedArray) {
          // The endpoints (see doc comment at the start of file) are defined from bottom to top
          // This ensures compatibility with getters/setters
          this.defineDeepArrayIntermediateVals(item, val);
          this.defineDeepArrayIntermediateThis(item, val, this.properties[item].keySetter, this.properties[item].keyGetter);
          this.handleInternalDeepArrayChange(item, prevVal, val);
        } else {
          this.handleInternalPropertyChange(item, prevVal);
        }
        if (postSetter) {
          postSetter(val, prevVal);
        }
      },
      get: () => {
        return (isDeepDefinedArray ? this.vals.$intermediateVals : endpoint)[item];
      },
      enumerable: true
    });
  }

  // ------ Object definitions for the keys/indexes of deeply defined arrays ------
  defineDeepArrayIntermediateThis(parentItem, parentValue, keySetter, keyGetter) {
    const endpoint = this.vals;

    this.vals.$intermediateThis[parentItem] = [];
    for (let i = 0; i < parentValue.length; i++) {
      const value = parentValue[i];

      Object.defineProperty(this.vals.$intermediateThis[parentItem], i, {
        set: function(val) {
          if (!keySetter || !keySetter(val, i)) {
            endpoint[parentItem][i] = val;
          }
        },
        get: function() {
          return (keyGetter ? keyGetter(endpoint[parentItem][i], i) : endpoint[parentItem][i]);
        },
        enumerable: true
      });
      // This assignment is necessary to invoke a potential keySetter (e.g. from `values`)
      this.vals.$intermediateThis[parentItem][i] = parentValue[i];
    }
  }
  defineDeepArrayIntermediateVals(parentItem, parentValue) {
    const endpoint = this.vals.$;

    this.vals.$intermediateVals[parentItem] = [];
    for (let i = 0; i < parentValue.length; i++) {
      const value = parentValue[i];

      Object.defineProperty(this.vals.$intermediateVals[parentItem], i, {
        set: (val) => {
          if (!this.initial) {
            var prevVal = Array.from(this[parentItem]);
          }
          endpoint[parentItem][i] = val;
          this.handleInternalDeepArrayChange(parentItem, prevVal, null, i);
        },
        get: () => {
          return endpoint[parentItem][i];
        },
        enumerable: true
      });
    }
  }


  // ------ Property change tracking ------
  // `that` items are compared to accomodate for getters (e.g. `value` (precision))
  handleInternalPropertyChange(item, prevVal) {
    // Object types (arrays included) always invoke a variable update
    // due to inability to deeply compare them (efficiently)
    if (!this.initial && (typeof this[item] === 'object' || prevVal !== this[item])) {
      this.updatePotentialStructureVar(item);
      this.invokeEvent(['change:' + item], prevVal);
    }
  }
  handleInternalDeepArrayChange(item, prevVal, val, deepDefinedIndex) {
    if (!this.initial) {
      this.updatePotentialStructureVar(item);
      if (deepDefinedIndex != null) {
        this.invokeDeepArrayChangeEvent(item, prevVal, deepDefinedIndex);
      } else {
        for (let i = 0; i < val.length; i++) {
          this.invokeDeepArrayChangeEvent(item, prevVal, i);
        }
      }
    }
  }

  invokeDeepArrayChangeEvent(item, prevVal, deepDefinedIndex) {
    if (prevVal[deepDefinedIndex] !== this[item][deepDefinedIndex]) {
      this.invokeEvent(['change:' + item], prevVal, deepDefinedIndex);
    }
  }

  // ---- Structure variables ----
  updatePotentialStructureVar(propName) {
    if (!Object.prototype.hasOwnProperty.call(this.domBuilder.structureVars, propName)) return;

    for (const [ str, nodeList ] of Object.entries(this.domBuilder.structureVars[propName])) {
      this.replaceStructureVarStringInNodes(str, nodeList);
    }

    if (Object.prototype.hasOwnProperty.call(_Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__["default"].specialVariableProxy, propName)) {
      for (const varName of _Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__["default"].specialVariableProxy[propName]) {
        this.updatePotentialStructureVar(varName);
      }
    }
  }

  replaceStructureVarStringInNodes(str, nodeList) {
    for (const [ element, node, baseName ] of this.iterateStructureVarNodeList(nodeList)) {
      node.textContent =
        str.replace(_Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__["default"].regex.variable, (match, variableDelimit, variable) => {
          return this.getValueFromStructureVar(variableDelimit || variable, element, baseName);
        });
    }
  }

  *iterateStructureVarNodeList(nodeList) {
    for (const node of nodeList) {
      // Special case: Iterate over every thumb
      const baseName = this.domBuilder.nodeHasBaseElementOwner(node);
      if (baseName) {
        const elements = this.vals.node[baseName];

        if (node.nodeType === Node.ATTRIBUTE_NODE) {
          for (const element of elements) {
            yield [ element, element.getAttributeNode(node.name), baseName ];
          };
        } else {
          for (const element of elements) {
            // The text node is always the first child
            yield [ element, element.childNodes[0], baseName ];
          };
        }
      } else {
        const element = _Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__["default"].getNodeOwner(node);
        yield [ element, node, baseName ];
      }
    }
  }

  getValueFromStructureVar(varName, node, baseName) {
    const recursiveVar = varName.split('.');
    let value;
    if (recursiveVar[0] in _Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__["default"].specialVariables) {
      value = _Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__["default"].specialVariables[recursiveVar[0]].getter(node, this, baseName);
    } else {
      value = this[recursiveVar[0]];
    }
    if (recursiveVar.length > 1) {
      for (let i = 1; i < recursiveVar.length; i++) {
        try {
          value = value[recursiveVar[i]];
        } catch (e) {
          throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError("Variable ‘" + varName + "’ cannot access property ‘" + recursiveVar[i] + "’ on " + value);
        }
      }
    }
    return value;
  }
}


/***/ }),

/***/ "./src/core/Slider89StructureParser.js":
/*!*********************************************!*\
  !*** ./src/core/Slider89StructureParser.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89StructureParser; }
/* harmony export */ });
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.js");



/**
 * @typedef {Object} SpecialVariableData
 * @prop { (node: HTMLElement, slider?: Slider89, baseName?: string | false) => any } getter
 * @prop { boolean } [thumbOnly] Whether the variable should only be available in <thumb> and its children.
 */

class Slider89StructureParser {
  /**
   * Special variables inside the structure system.
   * Instead of being linked to properties, these can call arbitrary functions.
   * @type { Record<string, SpecialVariableData>  }
   */
  static specialVariables = {
    tag_node: {
      getter: node => node
    },
    thumb_index: {
      thumbOnly: true,
      getter: (node, slider, baseName) => slider.node[baseName].indexOf(node)
    },
    thumb_value: {
      thumbOnly: true,
      getter: (node, slider, baseName) => slider.values[slider.node[baseName].indexOf(node)]
    },
  };
  /**
   * Links {@link specialVariables} to potential slider properties they depend on,
   * so that the special variables get updated when the property updates.
   * @type { Record<string, string[]> }
   */
  static specialVariableProxy = {
    values: [ 'thumb_index', 'thumb_value' ]
  };

  // Static initialization blocks don't work with my current workflow
  static regex = (function() {
    const reg = {
      attr: {
        name: '[\\w-]+'
      },
      all: '[\\d\\D]',
      capName: '([\\w-]+)',
    };
    reg.attr.value = '(?:(?!<)' + reg.all + ')*?';
    reg.tagType = '(?:\\s+' + reg.capName + ')?';
    reg.content = '(?:\\s+"(' + reg.all + '+?)")?';
    reg.attribs = '(?:\\s+' + reg.attr.name + '=\\[' + reg.attr.value + '\\])*';
    reg.varContent = '\\$((?:\\w+(?:\\.(?=\\w))?)+)';

    const rgx = {
      variable: '\\{' + reg.varContent + '\\}|' + reg.varContent,
      attributes: '(' + reg.attr.name + ')=\\[(' + reg.attr.value + ')\\](?:\\s+|$)',
      tag: '<([/:])?' + reg.capName + reg.tagType + reg.content + '(' + reg.attribs + ')\\s*?>\\s*'
    };

    const finalExpressions = {};
    // ES5 can't `new RegExp` from another RegExp
    for (let expr in rgx) {
      finalExpressions[expr] = new RegExp(rgx[expr], 'g');
    }
    finalExpressions.variableNoFlag = new RegExp(rgx.variable);

    return finalExpressions;
  }());


  // ---- Properties ----
  structureVars = {};
  thumbChildren = [];

  vals;


  constructor(vals) {
    this.vals = vals;
  }


  // ---- Structure parser ----
  parseStructure(structureStr) {
    const node = {
      slider: document.createElement('div')
    };

    structureStr = structureStr.trim();

    // Reset the global RegExp-internal `lastIndex` flag
    // This would otherwise clash with multiple slider instances, because the regexes are global
    for (const regexpName in Slider89StructureParser.regex) {
      if (Slider89StructureParser.regex[regexpName].global) {
        Slider89StructureParser.regex[regexpName].lastIndex = 0;
      }
    }

    const stack = [];
    let currentIndex = 0;
    let match;
    // match: [matchedStr, type, name, tag, innerContent, attributes]
    while (match = Slider89StructureParser.regex.tag.exec(structureStr)) {
      if (match.index !== currentIndex) {
        const beforeFailure = 'tag ‘<' + (match[1] || '') + match[2] + '>’';
        const pointOfFailure = structureStr.slice(currentIndex, match.index).trim();
        throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureParseError(beforeFailure, pointOfFailure);
      }
      currentIndex = Slider89StructureParser.regex.tag.lastIndex;

      if (match[1] !== '/') {
        const lastName = stack[stack.length - 1] || 'slider';
        const element = this.assembleElement(node, match[2], stack, match[3], match[4], match[5]);
        node[match[2]] = element;
        node[lastName].appendChild(element);

        // This detects thumb children (Because it's called BEFORE 'thumb' is pushed onto the stack)
        if (stack.includes('thumb')) {
          this.thumbChildren.push(match[2]);
        }

        if (match[1] == null) {
          stack.push(match[2]);
        }
      } else {
        const lastItem = stack.pop();
        if (lastItem !== match[2]) {
          if (stack.indexOf(match[2]) !== -1) {
            this.closingTagError(lastItem);
          } else {
            throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError(
              "The closing tag ‘</" + match[2] + ">’ couldn't find a matching opening tag");
          }
        }
      }
    }

    if (currentIndex !== structureStr.length) {
      throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureParseError('end of string', structureStr.slice(currentIndex));
    }
    if (stack.length > 1) {
      throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError(
        "Couldn't find a matching closing tag for following elements:" + _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].arrayToListString(stack));
    } else if (stack.length === 1) {
      this.closingTagError(stack[0]);
    }

    return node;
  }

  assembleElement(node, name, nameStack, tag, content, attributes) {
    if (Object.prototype.hasOwnProperty.call(node, name)) {
      throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError(
        'Every element must have a unique name but there are mutiple elements called ‘' + name + '’');
    }
    const elem = document.createElement(tag || 'div');

    if (content != null) {
      const textNode = document.createTextNode(content);
      textNode.textContent = content;
      elem.appendChild(textNode);

      if (Slider89StructureParser.stringHasVariable(content)) {
        this.parseVariables(content, textNode, name, nameStack);
      }
    }

    if (attributes) {
      let match;
      while (match = Slider89StructureParser.regex.attributes.exec(attributes)) {
        const attribName = match[1];
        const attribValue = match[2];

        const attribNode = document.createAttribute(attribName);
        attribNode.textContent = attribValue;
        elem.setAttributeNode(attribNode);

        if (Slider89StructureParser.stringHasVariable(attribValue)) {
          this.parseVariables(attribValue, attribNode, name, nameStack);
        }
      }
    }

    return elem;
  }

  // ---- Structure variables register ----
  parseVariables(str, targetNode, tagName, tagNameStack) {
    // Memorize & skip already handled variables for the current string
    const propNameCache = new Array();
    let match;
    while (match = Slider89StructureParser.regex.variable.exec(str)) {
      const varName = match[1] || match[2];
      const propName = varName.indexOf('.') !== -1
        ? varName.slice(0, varName.indexOf('.'))
        : varName;

      if (!propNameCache.hasOwnProperty(propName)) {
        if (!Object.prototype.hasOwnProperty.call(this.vals, propName)
            && !Slider89StructureParser.checkForSpecialVariables(propName, tagName, tagNameStack)
        ) {
          throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError(
            "‘" + propName + "’ is not a recognized property and cannot be used as variable. Please check its spelling or initialize it in the constructor");
        }

        this.registerVariable(propName, str, targetNode);

        propNameCache.push(propName);
      }
    }
  }

  registerVariable(propName, str, targetNode) {
    if (this.structureVars[propName] == null) {
      this.structureVars[propName] = {}
    }
    if (this.structureVars[propName][str] == null) {
      this.structureVars[propName][str] = new Array();
    }
    this.structureVars[propName][str].push(targetNode);
  }


  // ---- Error helpers ----
  closingTagError(tagName) {
    throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError(
      "Couldn't find a closing tag for the element ‘<" + tagName + ">’ (Should it be a self-closing tag marked with ‘:’?)");
  }


  // ---- Static helpers ----
  static getNodeOwner(node) {
    return node.ownerElement || node.parentElement;
  }

  static stringHasVariable(str) {
    // Need to use a RegExp without /g/ because the internal `lastIndex` mustn't be advanced by a mere test
    return Slider89StructureParser.regex.variableNoFlag.test(str);
  }

  static checkForSpecialVariables(varName, tagName, tagNameStack) {
    if (Object.prototype.hasOwnProperty.call(Slider89StructureParser.specialVariables, varName)) {
      const varData = Slider89StructureParser.specialVariables[varName];
      if (varData.thumbOnly && tagName !== 'thumb' && !tagNameStack.includes('thumb')) {
        throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError(
          "The variable ‘$" + varName + "’ may only be used inside the ‘<thumb>’ tag and its children "
          + "(It was found in ‘<" + tagNameStack[tagNameStack.length - 1] + ">’)");
      }
      return true;
    }
    return false;
  }
}


/***/ }),

/***/ "./src/css/default-styles.css":
/*!************************************!*\
  !*** ./src/css/default-styles.css ***!
  \************************************/
/***/ (function(module) {


    module.exports = '.sl89-track{position:relative;width:200px;height:25px;background-color:hsl(0,0%,18%);}.slider89.vertical .sl89-track{height:200px;width:25px;}.sl89-thumb{position:absolute;width:16px;height:100%;background-color:hsl(0,0%,28%);cursor:pointer;}.slider89.vertical .sl89-thumb{height:16px;width:100%;}.sl89-noselect{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;}'
  

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!******************************!*\
  !*** ./src/core/Slider89.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89; }
/* harmony export */ });
/* harmony import */ var _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LibraryTypeCheck.js */ "./src/core/LibraryTypeCheck.js");
/* harmony import */ var _Slider89DOM_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89DOM.js */ "./src/core/Slider89DOM.js");
/* harmony import */ var _Slider89DOMBuilder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89DOMBuilder.js */ "./src/core/Slider89DOMBuilder.js");




class Slider89 extends _Slider89DOM_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(target, config, replace = false) {
        super();
        this.methods = {
            addEvent: {
                function: this.addEvent,
            },
            removeEvent: {
                function: this.removeEvent,
            }
        };
        this.properties = {
            range: {
                default: [0, 100],
                setter: (val) => {
                    if (val[0] === val[1]) {
                        throw new Slider89.PropertyError(this, 'range', 'The given range of [' + val.join(', ') + '] defines the same value for both range start and end');
                    }
                    if (!this.initial) {
                        this.applyAllRatioDistances({ range: val });
                    }
                },
                keySetter: (val, key) => {
                    // Compare `val` with the value at the other key (0 or 1)
                    if (val === this.vals.range[Math.abs(key - 1)]) {
                        throw new Slider89.PropertyError(this, 'range', 'The new range of [' + val + ', ' + val + '] defines the same value for both range start and end');
                    }
                    if (!this.initial) {
                        const newRange = Array.from(this.vals.range);
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
                        }
                        else if (val.length < this.vals.values.length) {
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
                        for (const [propName, stringList] of Object.entries(this.domBuilder.structureVarThumbStrings)) {
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
                        this.applyOneRatioDistance(key, { value: val });
                    }
                    else {
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
                        throw new Slider89.PropertyError(this, 'step', 'The given value of ' + val + ' exceeds the currently set precision of ' + this.vals.precision);
                    }
                    if (!this.initial) {
                        this.applyAllRatioDistances({ step: val });
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
                        }
                        else {
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
                        if (!this.checkEventType(eventType))
                            errTypes.push(eventType);
                    }
                    if (errTypes.length > 0) {
                        throw new Slider89.PropertyError(this, 'events', 'The given object contains items which are no valid event types:' + Slider89.arrayToListString(errTypes)
                            + 'Available event types are:' + Slider89.arrayToListString(Slider89.eventTypes));
                    }
                }
            }
        };
        this.initial = true;
        this.testInitialTarget(target);
        if (config == null || config === false)
            config = {};
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
                this.updatePotentialStructureVar(variable);
            }
        }
        this.initial = false;
    }
    testInitialTarget(target) {
        if (!target) {
            throw new Slider89.InitializationError('No first argument has been supplied. It needs to be the DOM target node for the slider');
        }
        else if (!target.nodeType || target.nodeType !== 1) {
            throw new Slider89.InitializationError('The first argument must be a valid DOM node (got ' + _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"].getType(target) + ')');
        }
    }
    testInitialConfig(config) {
        if (typeof config !== 'object' || Array.isArray(config)) {
            throw new Slider89.InitializationError('The optional second argument needs to be a configuration object (got ' + _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"].getType(config) + ')');
        }
        else if ('value' in config && 'values' in config) {
            throw new Slider89.InitializationError('Only one of ‘value’ and ‘values’ may be defined at once');
        }
    }
    // Initialize properties and methods
    initializeClassProperties(config) {
        for (let _ in this.properties) {
            // IE-support: item needs to be a scoped variable because defineProperty is async
            const item = _;
            const prop = this.properties[item];
            const propData = Slider89.propertyData[item];
            Object.defineProperty(this, item, {
                set: (val) => {
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
                    const getterEndpoint = (propData.isDeepDefinedArray ? this.vals.$intermediateThis : this.vals);
                    return (prop.getter ? prop.getter(getterEndpoint[item]) : getterEndpoint[item]);
                },
                enumerable: true
            });
            this.defineDeepProperty(this.vals, item, this.vals.$, prop.postSetter, propData.isDeepDefinedArray);
            if (item in config) {
                this[item] = config[item];
                delete config[item];
            }
            else if ('default' in prop) {
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
            }
            else {
                throw new Slider89.InitializationError('‘' + item + '’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_' + item + '’)');
            }
        }
    }
    initializeMethods() {
        const that = this;
        for (let _ in this.methods) {
            const item = _;
            const method = this.methods[item];
            const argCount = Slider89.methodData[item].args.length;
            this[item] = function () {
                const args = Array.prototype.slice.call(arguments, 0, argCount);
                that.checkMethod(item, args);
                return method.function.apply(this, args);
            };
        }
    }
    buildSlider(target, replace) {
        this.vals.node = this.domBuilder.createSliderNode(this.vals.values.length, this.vals.structure);
        if (replace) {
            this.domBuilder.addAttributesFromTarget(this.vals.node, target);
        }
        this.domBuilder.addClasses(this.vals.node, this.vals.classList, this.vals.orientation === 'vertical');
        _Slider89DOMBuilder_js__WEBPACK_IMPORTED_MODULE_2__["default"].injectStyleSheetIfNeeded();
        if (replace) {
            target.parentNode.replaceChild(this.vals.node.slider, target);
        }
        else {
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
            const typeMsg = _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"].checkTypes(arg, obj.args[i].descriptor);
            if (typeMsg)
                throw new Slider89.MethodArgTypeError(method, i, typeMsg);
        }
        if (obj.args[argList.length] && !obj.args[argList.length].optional) {
            throw new Slider89.MethodArgOmitError(method, argList.length);
        }
    }
    checkProp(prop, val) {
        const propertyInfo = Slider89.propertyData[prop];
        const typeMsg = _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_0__["default"].checkTypes(val, propertyInfo.descriptor);
        if (typeMsg) {
            throw new Slider89.PropertyTypeError(this, prop, propertyInfo, typeMsg);
        }
    }
    adaptValueToRange(value) {
        if (this.vals.range[0] < this.vals.range[1]) {
            if (value < this.vals.range[0]) {
                return this.vals.range[0];
            }
            else if (value > this.vals.range[1]) {
                return this.vals.range[1];
            }
        }
        else {
            if (value > this.vals.range[0]) {
                return this.vals.range[0];
            }
            else if (value < this.vals.range[1]) {
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

}();
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNyQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCw2QkFBNkI7SUFDN0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSTtRQUM1QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQztJQUMvQyxDQUFDO0NBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvY29yZS9MaWJyYXJ5VHlwZUNoZWNrLmpzIiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL2NvcmUvU2xpZGVyODkuanMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvY29yZS9TbGlkZXI4OUJhc2UuanMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvY29yZS9TbGlkZXI4OURPTS5qcyIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9jb3JlL1NsaWRlcjg5RE9NQnVpbGRlci5qcyIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9jb3JlL1NsaWRlcjg5RXJyb3IuanMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvY29yZS9TbGlkZXI4OUV2ZW50cy5qcyIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9jb3JlL1NsaWRlcjg5UHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9jb3JlL1NsaWRlcjg5U3RydWN0dXJlUGFyc2VyLmpzIiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL2Nzcy9kZWZhdWx0LXN0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1NsaWRlcjg5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9jb3JlL1NsaWRlcjg5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNsaWRlcjg5XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNsaWRlcjg5XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiJ3VzZSBzdHJpY3QnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlicmFyeVR5cGVDaGVjayB7XG4gIHN0YXRpYyBnZXRUeXBlKHZhbHVlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgICAgcmV0dXJuICdBcnJheSc7XG4gICAgZWxzZSBpZiAoTnVtYmVyLmlzTmFOKHZhbHVlKSlcbiAgICAgIHJldHVybiAnTmFOJztcbiAgICBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbClcbiAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZTtcbiAgfVxuXG4gIHN0YXRpYyBjaGVja1R5cGVzKHZhbCwgZGVzY3JpcHRvcikge1xuICAgIGxldCBtc2c7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNjcmlwdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0eXBlRGF0YSA9IGRlc2NyaXB0b3JbaV07XG4gICAgICBjb25zdCB0eXBlID0gdHlwZURhdGEudHlwZTtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZSA9PT0gJ2Jvb2xlYW4nICYmIHR5cGVvZiB2YWwgPT09ICdib29sZWFuJyB8fFxuICAgICAgICB0eXBlID09PSAndHJ1ZScgJiYgdmFsID09PSB0cnVlIHx8XG4gICAgICAgIHR5cGUgPT09ICdmYWxzZScgJiYgdmFsID09PSBmYWxzZSB8fFxuICAgICAgICB0eXBlID09PSAnYXJyYXknICYmIEFycmF5LmlzQXJyYXkodmFsKSB8fFxuICAgICAgICB0eXBlID09PSAnb2JqZWN0JyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgfHxcbiAgICAgICAgdHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHZhbCA9PT0gJ251bWJlcicgJiYgIU51bWJlci5pc05hTih2YWwpIHx8XG4gICAgICAgIHR5cGUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICB0eXBlID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJ1xuICAgICAgKSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2YWwubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChtc2cgPSBMaWJyYXJ5VHlwZUNoZWNrLmNoZWNrVHlwZXModmFsW2pdLCB0eXBlRGF0YS5kZXNjcmlwdG9yKSkgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgZm9yIChsZXQga2V5IGluIHZhbCkge1xuICAgICAgICAgICAgaWYgKG1zZyA9IExpYnJhcnlUeXBlQ2hlY2suY2hlY2tUeXBlcyh2YWxba2V5XSwgdHlwZURhdGEuZGVzY3JpcHRvcikpIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtc2cpIHtcbiAgICAgICAgICByZXR1cm4gTGlicmFyeVR5cGVDaGVjay50b1RpdGxlQ2FzZSh0eXBlKSArICc8JyArIG1zZyArICc+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAobXNnID0gTGlicmFyeVR5cGVDaGVjay5idWlsZENvbmRpdGlvblR5cGVNZXNzYWdlKHR5cGVEYXRhLmNvbmRpdGlvbnMsIHZhbCkpIGJyZWFrO1xuICAgICAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1zZyB8fCBMaWJyYXJ5VHlwZUNoZWNrLmdldFR5cGUodmFsKTtcbiAgfVxuXG4gIHN0YXRpYyBidWlsZENvbmRpdGlvblR5cGVNZXNzYWdlKGNvbmRpdGlvbnMsIHZhbCkge1xuICAgIGlmICghY29uZGl0aW9ucykgcmV0dXJuO1xuXG4gICAgaWYgKGNvbmRpdGlvbnMubm9ubmVnYXRpdmUgJiYgdmFsIDwgMCkge1xuICAgICAgcmV0dXJuICdhIG5lZ2F0aXZlIG51bWJlcic7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb25zLnBvc2l0aXZlICYmIHZhbCA8PSAwKSB7XG4gICAgICByZXR1cm4gJ2EgbmVnYXRpdmUgbnVtYmVyIG9yIDAnO1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9ucy5pbnRlZ2VyICYmIHZhbCAlIDEgIT09IDApIHtcbiAgICAgIHJldHVybiAnYSBmbG9hdGluZyBwb2ludCBudW1iZXInO1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9ucy5maWxsZWQgJiYgdmFsLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnYW4gZW1wdHkgc3RyaW5nJztcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbnMua2V5d29yZHMgJiYgY29uZGl0aW9ucy5rZXl3b3Jkcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2EgZGlmZmVyZW50IHN0cmluZyc7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb25zLndvcmRDaGFyICYmICFOdW1iZXIuaXNOYU4oTnVtYmVyKHZhbCkpKSB7XG4gICAgICByZXR1cm4gJ2EgbnVtYmVyIHN0cmluZyc7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb25zLmxlbmd0aCAmJiB2YWwubGVuZ3RoICE9PSBjb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuICdhbiBhcnJheSBvZiBsZW5ndGggJyArIHZhbC5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgLy8gQ29tcHV0ZSBhbiBhdXRvbWF0ZWQgZXJyb3IgbWVzc2FnZSByZWdhcmRpbmcgdGhlIHByb3BlcnR5J3MgdHlwZXMgYW5kIGNvbmRpdGlvbnNcbiAgc3RhdGljIGJ1aWxkRGVzY3JpcHRvclR5cGVNZXNzYWdlKGRlc2NyaXB0b3IpIHtcbiAgICBsZXQgbXNnID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNjcmlwdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0eXBlRGF0YSA9IGRlc2NyaXB0b3JbaV07XG4gICAgICBjb25zdCB0eXBlID0gdHlwZURhdGEudHlwZTtcbiAgICAgIGNvbnN0IGNvbmQgPSB0eXBlRGF0YS5jb25kaXRpb25zO1xuXG4gICAgICBpZiAobXNnKSBtc2cgKz0gJyBPUiAnO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uc3Qgbm9ubmVnYXRpdmUgPSBjb25kICYmIGNvbmQubm9ubmVnYXRpdmU7XG4gICAgICAgIGNvbnN0IHBvc2l0aXZlID0gY29uZCAmJiBjb25kLnBvc2l0aXZlO1xuICAgICAgICBjb25zdCBpc0ludCA9IGNvbmQgJiYgY29uZC5pbnRlZ2VyO1xuXG4gICAgICAgIGlmIChub25uZWdhdGl2ZSkge1xuICAgICAgICAgIG1zZyArPSAnbm9uLW5lZ2F0aXZlICc7XG4gICAgICAgIH0gZWxzZSBpZiAocG9zaXRpdmUpIHtcbiAgICAgICAgICBtc2cgKz0gJ3Bvc2l0aXZlICdcbiAgICAgICAgfVxuICAgICAgICBtc2cgKz0gKGlzSW50ID8gJ2ludGVnZXInIDogJ251bWJlcicpO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgICAgIGNvbnN0IGlubmVyVHlwZSA9IExpYnJhcnlUeXBlQ2hlY2suYnVpbGREZXNjcmlwdG9yVHlwZU1lc3NhZ2UodHlwZURhdGEuZGVzY3JpcHRvcik7XG4gICAgICAgIG1zZyArPSAnQXJyYXk8JyArIGlubmVyVHlwZSArICc+JztcbiAgICAgICAgaWYgKGNvbmQgJiYgY29uZC5sZW5ndGgpIHtcbiAgICAgICAgICBtc2cgKz0gJyBvZiBsZW5ndGggJyArIGNvbmQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IGlubmVyVHlwZSA9IExpYnJhcnlUeXBlQ2hlY2suYnVpbGREZXNjcmlwdG9yVHlwZU1lc3NhZ2UodHlwZURhdGEuZGVzY3JpcHRvcik7XG4gICAgICAgIG1zZyArPSAnT2JqZWN0PCcgKyB0eXBlRGF0YS5rZXlOYW1lICsgJywgJyArIGlubmVyVHlwZSArICc+JztcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKGNvbmQgJiYgY29uZC5rZXl3b3Jkcykge1xuICAgICAgICAgIGlmIChjb25kLmtleXdvcmRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIG1zZyArPSAnb25lIG9mIHRoZSBrZXl3b3Jkcyc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1zZyArPSAndGhlIGtleXdvcmQnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25kLmtleXdvcmRzLmZvckVhY2goZnVuY3Rpb24odmFsLCBuLCBhcnIpIHtcbiAgICAgICAgICAgIGlmIChuICE9PSAwICYmIG4gPT09IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgIG1zZyArPSAnIG9yJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiAhPT0gMCkge1xuICAgICAgICAgICAgICBtc2cgKz0gJywnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbXNnICs9ICcgXCInICsgdmFsICsgJ1wiJztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY29uZCAmJiBjb25kLmZpbGxlZCkgbXNnICs9ICdub24tZW1wdHkgJztcbiAgICAgICAgICBpZiAoY29uZCAmJiBjb25kLndvcmRDaGFyKSBtc2cgKz0gJ25vbi1udW1iZXIgJztcbiAgICAgICAgICBtc2cgKz0gJ3N0cmluZyc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZWxzZSB7XG4gICAgICAgIG1zZyArPSB0eXBlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZURhdGEuc2hhcGUpIHtcbiAgICAgICAgbXNnICs9ICcgKCcgKyB0eXBlRGF0YS5zaGFwZSArICcpJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbXNnO1xuICB9XG5cbiAgLy8gLS0tLSBIZWxwZXIgZnVuY3Rpb25zIC0tLS1cbiAgc3RhdGljIHRvVGl0bGVDYXNlKHN0cikge1xuICAgIHJldHVybiBzdHIuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IExpYnJhcnlUeXBlQ2hlY2sgZnJvbSAnLi9MaWJyYXJ5VHlwZUNoZWNrLmpzJztcbmltcG9ydCBTbGlkZXI4OURPTSBmcm9tICcuL1NsaWRlcjg5RE9NLmpzJztcbmltcG9ydCBTbGlkZXI4OURPTUJ1aWxkZXIgZnJvbSAnLi9TbGlkZXI4OURPTUJ1aWxkZXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXI4OSBleHRlbmRzIFNsaWRlcjg5RE9NIHtcbiAgbWV0aG9kcyA9IHtcbiAgICBhZGRFdmVudDoge1xuICAgICAgZnVuY3Rpb246IHRoaXMuYWRkRXZlbnQsXG4gICAgfSxcbiAgICByZW1vdmVFdmVudDoge1xuICAgICAgZnVuY3Rpb246IHRoaXMucmVtb3ZlRXZlbnQsXG4gICAgfVxuICB9O1xuXG4gIHByb3BlcnRpZXMgPSB7XG4gICAgcmFuZ2U6IHtcbiAgICAgIGRlZmF1bHQ6IFswLCAxMDBdLFxuICAgICAgc2V0dGVyOiAodmFsKSA9PiB7XG4gICAgICAgIGlmICh2YWxbMF0gPT09IHZhbFsxXSkge1xuICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Qcm9wZXJ0eUVycm9yKHRoaXMsICdyYW5nZScsXG4gICAgICAgICAgICAnVGhlIGdpdmVuIHJhbmdlIG9mIFsnICsgdmFsLmpvaW4oJywgJykgKyAnXSBkZWZpbmVzIHRoZSBzYW1lIHZhbHVlIGZvciBib3RoIHJhbmdlIHN0YXJ0IGFuZCBlbmQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIHRoaXMuYXBwbHlBbGxSYXRpb0Rpc3RhbmNlcyh7IHJhbmdlOiB2YWwgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXlTZXR0ZXI6ICh2YWwsIGtleSkgPT4ge1xuICAgICAgICAvLyBDb21wYXJlIGB2YWxgIHdpdGggdGhlIHZhbHVlIGF0IHRoZSBvdGhlciBrZXkgKDAgb3IgMSlcbiAgICAgICAgaWYgKHZhbCA9PT0gdGhpcy52YWxzLnJhbmdlW01hdGguYWJzKGtleSAtIDEpXSkge1xuICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Qcm9wZXJ0eUVycm9yKHRoaXMsICdyYW5nZScsXG4gICAgICAgICAgICAnVGhlIG5ldyByYW5nZSBvZiBbJyArIHZhbCArICcsICcgKyB2YWwgKyAnXSBkZWZpbmVzIHRoZSBzYW1lIHZhbHVlIGZvciBib3RoIHJhbmdlIHN0YXJ0IGFuZCBlbmQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIGNvbnN0IG5ld1JhbmdlID0gQXJyYXkuZnJvbSh0aGlzLnZhbHMucmFuZ2UpO1xuICAgICAgICAgIG5ld1JhbmdlW2tleV0gPSB2YWw7XG4gICAgICAgICAgdGhpcy5hcHBseUFsbFJhdGlvRGlzdGFuY2VzKHsgcmFuZ2U6IG5ld1JhbmdlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB2YWx1ZXM6IHtcbiAgICAgIGRlZmF1bHQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLnZhbHMucmFuZ2VbMF1dO1xuICAgICAgfSxcbiAgICAgIHNldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIC8vIEFkZC9yZW1vdmUgdGh1bWJzIGlmIHRoZSBnaXZlbiBhcnJheSBpcyBiaWdnZXIvc21hbGxlciB0aGFuIHRoZSBjdXJyZW50IGB2YWx1ZXNgIGFycmF5XG4gICAgICAgICAgaWYgKHZhbC5sZW5ndGggPiB0aGlzLnZhbHMudmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMudmFscy52YWx1ZXMubGVuZ3RoOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWRkTmV3VGh1bWJOb2RlKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmxlbmd0aCA8IHRoaXMudmFscy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdmFsLmxlbmd0aDsgaSA8IHRoaXMudmFscy52YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMYXN0VGh1bWJOb2RlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcG9zdFNldHRlcjogKHZhbCwgcHJldlZhbCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIC8vIE1hbnVhbGx5IGludm9rZSBgdmFsdWVgIHByb3BlcnR5IGNoYW5nZVxuICAgICAgICAgIHRoaXMuaGFuZGxlSW50ZXJuYWxQcm9wZXJ0eUNoYW5nZSgndmFsdWUnLCBwcmV2VmFsWzBdKTtcbiAgICAgICAgICB0aGlzLmhhbmRsZUludGVybmFsUHJvcGVydHlDaGFuZ2UoJ25vZGUnKTtcblxuICAgICAgICAgIC8vIFRPRE8gUGVyaGFwcyBtb3ZlIHRoaXMgaW50byBhbiBvd24gZnVuY3Rpb25cbiAgICAgICAgICAvLyBFeHBhbmRpbmcgc3RydWN0dXJlIHZhcmlhYmxlcyB3aGljaCBhcmUgdXNlZCBpbiBiYXNlIGVsZW1lbnQgdGFncyAodGh1bWIgYW5kIGRlc2NlbmRhbnRzKVxuICAgICAgICAgIGZvciAoY29uc3QgWyBwcm9wTmFtZSwgc3RyaW5nTGlzdCBdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuZG9tQnVpbGRlci5zdHJ1Y3R1cmVWYXJUaHVtYlN0cmluZ3MpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhclN0cmluZyBvZiBzdHJpbmdMaXN0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5vZGVMaXN0ID0gdGhpcy5kb21CdWlsZGVyLnN0cnVjdHVyZVZhcnNbcHJvcE5hbWVdW3ZhclN0cmluZ107XG4gICAgICAgICAgICAgIHRoaXMucmVwbGFjZVN0cnVjdHVyZVZhclN0cmluZ0luTm9kZXModmFyU3RyaW5nLCBub2RlTGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAga2V5U2V0dGVyOiAodmFsLCBrZXkpID0+IHtcbiAgICAgICAgdmFsID0gdGhpcy5hZGFwdFZhbHVlVG9SYW5nZSh2YWwpO1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIGlmIChrZXkgPT09IDApIHtcbiAgICAgICAgICAgIHZhciBwcmV2VmFsID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcHBseU9uZVJhdGlvRGlzdGFuY2Uoa2V5LCB7dmFsdWU6IHZhbH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmFscy52YWx1ZXNba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBrZXlHZXR0ZXI6ICh2YWwsIGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxzLnByZWNpc2lvbiAhPT0gZmFsc2UgPyBOdW1iZXIodmFsLnRvRml4ZWQodGhpcy52YWxzLnByZWNpc2lvbikpIDogdmFsO1xuICAgICAgfVxuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHNldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICB0aGlzLnZhbHVlc1swXSA9IHZhbDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgZ2V0dGVyOiAodmFsKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlc1swXTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHByZWNpc2lvbjoge1xuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICBzZXR0ZXI6ICh2YWwpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICB0aGlzLmFwcGx5QWxsUmF0aW9EaXN0YW5jZXMoeyBwcmVjaXNpb246IHZhbCB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc3RlcDoge1xuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICBzZXR0ZXI6ICh2YWwpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudmFscy5wcmVjaXNpb24gIT09IGZhbHNlICYmIHZhbCAhPT0gZmFsc2UgJiYgTnVtYmVyKHZhbC50b0ZpeGVkKHRoaXMudmFscy5wcmVjaXNpb24pKSAhPT0gdmFsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlByb3BlcnR5RXJyb3IodGhpcywgJ3N0ZXAnLFxuICAgICAgICAgICAgJ1RoZSBnaXZlbiB2YWx1ZSBvZiAnICsgdmFsICsgJyBleGNlZWRzIHRoZSBjdXJyZW50bHkgc2V0IHByZWNpc2lvbiBvZiAnICsgdGhpcy52YWxzLnByZWNpc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICB0aGlzLmFwcGx5QWxsUmF0aW9EaXN0YW5jZXMoeyBzdGVwOiB2YWwgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc3RydWN0dXJlOiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIG5vZGU6IHtcbiAgICAgIGRlZmF1bHQ6IHt9LFxuICAgIH0sXG4gICAgb3JpZW50YXRpb246IHtcbiAgICAgIGRlZmF1bHQ6ICdob3Jpem9udGFsJyxcbiAgICAgIHNldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIGlmICh2YWwgPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgICAgIHRoaXMudmFscy5ub2RlLnRodW1iLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdsZWZ0Jyk7XG4gICAgICAgICAgICB0aGlzLnZhbHMubm9kZS5zbGlkZXIuY2xhc3NMaXN0LmFkZCgndmVydGljYWwnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWxzLm5vZGUudGh1bWIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RvcCcpO1xuICAgICAgICAgICAgdGhpcy52YWxzLm5vZGUuc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ZlcnRpY2FsJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudmFscy5vcmllbnRhdGlvbiA9IHZhbDtcbiAgICAgICAgICB0aGlzLmFwcGx5QWxsUmF0aW9EaXN0YW5jZXMoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY2xhc3NMaXN0OiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgZGVmYXVsdDoge30sXG4gICAgICBzZXR0ZXI6ICh2YWwpID0+IHtcbiAgICAgICAgY29uc3QgZXJyVHlwZXMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgZm9yIChsZXQgZXZlbnRUeXBlIGluIHZhbCkge1xuICAgICAgICAgIGlmICghdGhpcy5jaGVja0V2ZW50VHlwZShldmVudFR5cGUpKSBlcnJUeXBlcy5wdXNoKGV2ZW50VHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVyclR5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU2xpZGVyODkuUHJvcGVydHlFcnJvcih0aGlzLCAnZXZlbnRzJyxcbiAgICAgICAgICAgICdUaGUgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5zIGl0ZW1zIHdoaWNoIGFyZSBubyB2YWxpZCBldmVudCB0eXBlczonICsgU2xpZGVyODkuYXJyYXlUb0xpc3RTdHJpbmcoZXJyVHlwZXMpXG4gICAgICAgICAgICArICdBdmFpbGFibGUgZXZlbnQgdHlwZXMgYXJlOicgKyBTbGlkZXI4OS5hcnJheVRvTGlzdFN0cmluZyhTbGlkZXI4OS5ldmVudFR5cGVzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3RydWN0b3IodGFyZ2V0LCBjb25maWcsIHJlcGxhY2UgPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pbml0aWFsID0gdHJ1ZTtcblxuICAgIHRoaXMudGVzdEluaXRpYWxUYXJnZXQodGFyZ2V0KTtcblxuICAgIGlmIChjb25maWcgPT0gbnVsbCB8fCBjb25maWcgPT09IGZhbHNlKSBjb25maWcgPSB7fTtcbiAgICB0aGlzLnRlc3RJbml0aWFsQ29uZmlnKGNvbmZpZyk7XG5cbiAgICB0aGlzLmluaXRpYWxpemVDbGFzc1Byb3BlcnRpZXMoY29uZmlnKTtcbiAgICB0aGlzLmluaXRpYWxpemVDdXN0b21Qcm9wZXJ0aWVzKGNvbmZpZyk7XG4gICAgdGhpcy5pbml0aWFsaXplTWV0aG9kcygpO1xuXG4gICAgdGhpcy5idWlsZFNsaWRlcih0YXJnZXQsIHJlcGxhY2UpO1xuXG4gICAgdGhpcy5hcHBseUFsbFJhdGlvRGlzdGFuY2VzKCk7XG5cbiAgICAvLyBFeHBhbmRpbmcgc3RydWN0dXJlIHZhcmlhYmxlcyBpbml0aWFsbHlcbiAgICAvLyBUaGlzIGhhcHBlbnMgc28gbGF0ZSB0byBlbnN1cmUgdGhhdCAkbm9kZSBjYW4gYmUgYWNjZXNzZWQgcHJvcGVybHlcbiAgICBpZiAodGhpcy52YWxzLnN0cnVjdHVyZSAhPT0gZmFsc2UpIHtcbiAgICAgIGZvciAobGV0IHZhcmlhYmxlIGluIHRoaXMuZG9tQnVpbGRlci5zdHJ1Y3R1cmVWYXJzKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUG90ZW50aWFsU3RydWN0dXJlVmFyKHZhcmlhYmxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmluaXRpYWwgPSBmYWxzZTtcbiAgfVxuXG5cbiAgdGVzdEluaXRpYWxUYXJnZXQodGFyZ2V0KSB7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Jbml0aWFsaXphdGlvbkVycm9yKCdObyBmaXJzdCBhcmd1bWVudCBoYXMgYmVlbiBzdXBwbGllZC4gSXQgbmVlZHMgdG8gYmUgdGhlIERPTSB0YXJnZXQgbm9kZSBmb3IgdGhlIHNsaWRlcicpO1xuICAgIH0gZWxzZSBpZiAoIXRhcmdldC5ub2RlVHlwZSB8fCB0YXJnZXQubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Jbml0aWFsaXphdGlvbkVycm9yKCdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHZhbGlkIERPTSBub2RlIChnb3QgJyArIExpYnJhcnlUeXBlQ2hlY2suZ2V0VHlwZSh0YXJnZXQpICsgJyknKTtcbiAgICB9XG4gIH1cbiAgdGVzdEluaXRpYWxDb25maWcoY29uZmlnKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkoY29uZmlnKSkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkluaXRpYWxpemF0aW9uRXJyb3IoJ1RoZSBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBjb25maWd1cmF0aW9uIG9iamVjdCAoZ290ICcgKyBMaWJyYXJ5VHlwZUNoZWNrLmdldFR5cGUoY29uZmlnKSArICcpJyk7XG4gICAgfSBlbHNlIGlmICgndmFsdWUnIGluIGNvbmZpZyAmJiAndmFsdWVzJyBpbiBjb25maWcpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Jbml0aWFsaXphdGlvbkVycm9yKCdPbmx5IG9uZSBvZiDigJh2YWx1ZeKAmSBhbmQg4oCYdmFsdWVz4oCZIG1heSBiZSBkZWZpbmVkIGF0IG9uY2UnKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIEluaXRpYWxpemUgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuICBpbml0aWFsaXplQ2xhc3NQcm9wZXJ0aWVzKGNvbmZpZykge1xuICAgIGZvciAobGV0IF8gaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAvLyBJRS1zdXBwb3J0OiBpdGVtIG5lZWRzIHRvIGJlIGEgc2NvcGVkIHZhcmlhYmxlIGJlY2F1c2UgZGVmaW5lUHJvcGVydHkgaXMgYXN5bmNcbiAgICAgIGNvbnN0IGl0ZW0gPSBfO1xuICAgICAgY29uc3QgcHJvcCA9IHRoaXMucHJvcGVydGllc1tpdGVtXTtcbiAgICAgIGNvbnN0IHByb3BEYXRhID0gU2xpZGVyODkucHJvcGVydHlEYXRhW2l0ZW1dO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgaXRlbSwge1xuICAgICAgICBzZXQ6ICh2YWwpID0+IHtcbiAgICAgICAgICBpZiAocHJvcERhdGEucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5FcnJvcignUHJvcGVydHkg4oCYJyArIGl0ZW0gKyAn4oCZIGlzIHJlYWQtb25seSAoSXQgd2FzIGp1c3Qgc2V0IHdpdGggdGhlIHZhbHVlIOKAmCcgKyB2YWwgKyAn4oCZKScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocHJvcERhdGEuY29uc3RydWN0b3JPbmx5ICYmICF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5FcnJvcignUHJvcGVydHkg4oCYJyArIGl0ZW0gKyAn4oCZIG1heSBvbmx5IGJlIGRlZmluZWQgaW4gdGhlIGNvbnN0cnVjdG9yIChJdCB3YXMganVzdCBzZXQgd2l0aCB0aGUgdmFsdWUg4oCYJyArIHZhbCArICfigJkpJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2hlY2tQcm9wKGl0ZW0sIHZhbCk7XG4gICAgICAgICAgaWYgKCFwcm9wLnNldHRlciB8fCAhcHJvcC5zZXR0ZXIodmFsKSkge1xuICAgICAgICAgICAgdGhpcy52YWxzW2l0ZW1dID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ2V0dGVyRW5kcG9pbnQgPSAocHJvcERhdGEuaXNEZWVwRGVmaW5lZEFycmF5ID8gdGhpcy52YWxzLiRpbnRlcm1lZGlhdGVUaGlzIDogdGhpcy52YWxzKTtcbiAgICAgICAgICByZXR1cm4gKHByb3AuZ2V0dGVyID8gcHJvcC5nZXR0ZXIoZ2V0dGVyRW5kcG9pbnRbaXRlbV0pIDogZ2V0dGVyRW5kcG9pbnRbaXRlbV0pO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kZWZpbmVEZWVwUHJvcGVydHkodGhpcy52YWxzLCBpdGVtLCB0aGlzLnZhbHMuJCwgcHJvcC5wb3N0U2V0dGVyLCBwcm9wRGF0YS5pc0RlZXBEZWZpbmVkQXJyYXkpO1xuXG4gICAgICBpZiAoaXRlbSBpbiBjb25maWcpIHtcbiAgICAgICAgdGhpc1tpdGVtXSA9IGNvbmZpZ1tpdGVtXTtcbiAgICAgICAgZGVsZXRlIGNvbmZpZ1tpdGVtXTtcbiAgICAgIH0gZWxzZSBpZiAoJ2RlZmF1bHQnIGluIHByb3ApIHtcbiAgICAgICAgY29uc3QgZGVmID0gcHJvcC5kZWZhdWx0O1xuICAgICAgICAoKHByb3AuZ2V0dGVyIHx8IHByb3Aua2V5R2V0dGVyKSA/IHRoaXMgOiB0aGlzLnZhbHMpW2l0ZW1dID0gKHR5cGVvZiBkZWYgPT09ICdmdW5jdGlvbicgPyBkZWYoKSA6IGRlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZUN1c3RvbVByb3BlcnRpZXMoY29uZmlnKSB7XG4gICAgZm9yIChsZXQgXyBpbiBjb25maWcpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBfO1xuXG4gICAgICBpZiAoaXRlbVswXSA9PT0gJ18nKSB7XG4gICAgICAgIHRoaXMuZGVmaW5lRGVlcFByb3BlcnR5KHRoaXMsIGl0ZW0sIHRoaXMudmFscyk7XG4gICAgICAgIHRoaXMudmFsc1tpdGVtXSA9IGNvbmZpZ1tpdGVtXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Jbml0aWFsaXphdGlvbkVycm9yKFxuICAgICAgICAgICfigJgnICsgaXRlbSArICfigJkgaXMgbm90IGEgdmFsaWQgcHJvcGVydHkgbmFtZS4gQ2hlY2sgaXRzIHNwZWxsaW5nIG9yIHByZWZpeCBpdCB3aXRoIGFuIHVuZGVyc2NvcmUgdG8gdXNlIGl0IGFzIGN1c3RvbSBwcm9wZXJ0eSAo4oCYXycgKyBpdGVtICsgJ+KAmSknKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXplTWV0aG9kcygpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgIGZvciAobGV0IF8gaW4gdGhpcy5tZXRob2RzKSB7XG4gICAgICBjb25zdCBpdGVtID0gXztcbiAgICAgIGNvbnN0IG1ldGhvZCA9IHRoaXMubWV0aG9kc1tpdGVtXTtcbiAgICAgIGNvbnN0IGFyZ0NvdW50ID0gU2xpZGVyODkubWV0aG9kRGF0YVtpdGVtXS5hcmdzLmxlbmd0aDtcbiAgICAgIHRoaXNbaXRlbV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgYXJnQ291bnQpO1xuICAgICAgICB0aGF0LmNoZWNrTWV0aG9kKGl0ZW0sIGFyZ3MpO1xuICAgICAgICByZXR1cm4gbWV0aG9kLmZ1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkU2xpZGVyKHRhcmdldCwgcmVwbGFjZSkge1xuICAgIHRoaXMudmFscy5ub2RlID0gdGhpcy5kb21CdWlsZGVyLmNyZWF0ZVNsaWRlck5vZGUodGhpcy52YWxzLnZhbHVlcy5sZW5ndGgsIHRoaXMudmFscy5zdHJ1Y3R1cmUpO1xuXG4gICAgaWYgKHJlcGxhY2UpIHtcbiAgICAgIHRoaXMuZG9tQnVpbGRlci5hZGRBdHRyaWJ1dGVzRnJvbVRhcmdldCh0aGlzLnZhbHMubm9kZSwgdGFyZ2V0KTtcbiAgICB9XG4gICAgdGhpcy5kb21CdWlsZGVyLmFkZENsYXNzZXModGhpcy52YWxzLm5vZGUsIHRoaXMudmFscy5jbGFzc0xpc3QsIHRoaXMudmFscy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyk7XG5cbiAgICBTbGlkZXI4OURPTUJ1aWxkZXIuaW5qZWN0U3R5bGVTaGVldElmTmVlZGVkKCk7XG5cbiAgICBpZiAocmVwbGFjZSkge1xuICAgICAgdGFyZ2V0LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHRoaXMudmFscy5ub2RlLnNsaWRlciwgdGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHRoaXMudmFscy5ub2RlLnNsaWRlcik7XG4gICAgfVxuXG4gICAgdGhpcy50cmFja1N0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLnZhbHMubm9kZS50cmFjayk7XG4gIH1cblxuICAvLyAtLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLVxuICAvLyBDaGVjayBwcm9wZXJ0aWVzICYgbWV0aG9kcyBmb3IgdGhlIGNvcnJlY3QgdHlwZSAmIGZvcm1hdFxuICBjaGVja01ldGhvZChtZXRob2QsIGFyZ0xpc3QpIHtcbiAgICBjb25zdCBvYmogPSBTbGlkZXI4OS5tZXRob2REYXRhW21ldGhvZF07XG4gICAgLy8gSWYgdGhlIG5leHQgYXJndW1lbnQgKGFyZ0xpc3QubGVuZ3RoIC0gMSArIDEpIGlzIG5vdCBvcHRpb25hbCwgYSByZXF1aXJlZCBhcmcgaXMgbWlzc2luZ1xuICAgIGZvciAobGV0IGkgaW4gYXJnTGlzdCkge1xuICAgICAgY29uc3QgYXJnID0gYXJnTGlzdFtpXTtcbiAgICAgIGNvbnN0IHR5cGVNc2cgPSBMaWJyYXJ5VHlwZUNoZWNrLmNoZWNrVHlwZXMoYXJnLCBvYmouYXJnc1tpXS5kZXNjcmlwdG9yKTtcbiAgICAgIGlmICh0eXBlTXNnKSB0aHJvdyBuZXcgU2xpZGVyODkuTWV0aG9kQXJnVHlwZUVycm9yKG1ldGhvZCwgaSwgdHlwZU1zZyk7XG4gICAgfVxuICAgIGlmIChvYmouYXJnc1thcmdMaXN0Lmxlbmd0aF0gJiYgIW9iai5hcmdzW2FyZ0xpc3QubGVuZ3RoXS5vcHRpb25hbCkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5Lk1ldGhvZEFyZ09taXRFcnJvcihtZXRob2QsIGFyZ0xpc3QubGVuZ3RoKTtcbiAgICB9XG4gIH1cbiAgY2hlY2tQcm9wKHByb3AsIHZhbCkge1xuICAgIGNvbnN0IHByb3BlcnR5SW5mbyA9IFNsaWRlcjg5LnByb3BlcnR5RGF0YVtwcm9wXTtcbiAgICBjb25zdCB0eXBlTXNnID0gTGlicmFyeVR5cGVDaGVjay5jaGVja1R5cGVzKHZhbCwgcHJvcGVydHlJbmZvLmRlc2NyaXB0b3IpO1xuICAgIGlmICh0eXBlTXNnKSB7XG4gICAgICB0aHJvdyBuZXcgU2xpZGVyODkuUHJvcGVydHlUeXBlRXJyb3IodGhpcywgcHJvcCwgcHJvcGVydHlJbmZvLCB0eXBlTXNnKTtcbiAgICB9XG4gIH1cblxuICBhZGFwdFZhbHVlVG9SYW5nZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnZhbHMucmFuZ2VbMF0gPCB0aGlzLnZhbHMucmFuZ2VbMV0pIHtcbiAgICAgIGlmICh2YWx1ZSA8IHRoaXMudmFscy5yYW5nZVswXSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxzLnJhbmdlWzBdO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IHRoaXMudmFscy5yYW5nZVsxXSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxzLnJhbmdlWzFdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsdWUgPiB0aGlzLnZhbHMucmFuZ2VbMF0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFscy5yYW5nZVswXTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCB0aGlzLnZhbHMucmFuZ2VbMV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFscy5yYW5nZVsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLy8gLS0tLSBIZWxwZXIgZnVuY3Rpb25zIC0tLS1cbiAgc3RhdGljIGZsb2F0SXNFcXVhbCh2YWwwLCB2YWwxKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHZhbDAgLSB2YWwxKSA8IDAuMDAwMDAwMDAwMDE7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBTbGlkZXI4OUVycm9yIGZyb20gJy4vU2xpZGVyODlFcnJvci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlcjg5QmFzZSBleHRlbmRzIFNsaWRlcjg5RXJyb3Ige1xuICBzdGF0aWMgbWV0aG9kRGF0YSA9IHtcbiAgICBhZGRFdmVudDoge1xuICAgICAgYXJnczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2V2ZW50IHR5cGUnLFxuICAgICAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnZXZlbnQgZnVuY3Rpb24nLFxuICAgICAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nXG4gICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdldmVudCBuYW1lc3BhY2UnLFxuICAgICAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICAgICAgZmlsbGVkOiB0cnVlLFxuICAgICAgICAgICAgICB3b3JkQ2hhcjogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHJlbW92ZUV2ZW50OiB7XG4gICAgICBhcmdzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnZXZlbnQgaWRlbnRpZmllci9uYW1lc3BhY2UnLFxuICAgICAgICAgIGRlc2NyaXB0b3I6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBub25uZWdhdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbnRlZ2VyOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgICBjb25kaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgZmlsbGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdvcmRDaGFyOiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cbiAgc3RhdGljIHByb3BlcnR5RGF0YSA9IHtcbiAgICByYW5nZToge1xuICAgICAgaXNEZWVwRGVmaW5lZEFycmF5OiB0cnVlLFxuICAgICAgZGVzY3JpcHRvcjogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBzaGFwZTogJ1tzdGFydFZhbHVlLCBlbmRWYWx1ZV0nLFxuICAgICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICAgIGxlbmd0aDogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVzY3JpcHRvcjogW1xuICAgICAgICAgICAgeyB0eXBlOiAnbnVtYmVyJyB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7IHR5cGU6ICdib29sZWFuJyB9XG4gICAgICBdXG4gICAgfSxcbiAgICB2YWx1ZXM6IHtcbiAgICAgIGlzRGVlcERlZmluZWRBcnJheTogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgIC8vIFRPRE8gY29uZGl0aW9uOiBhdCBsZWFzdCBvZiBzaXplIDFcbiAgICAgICAgZGVzY3JpcHRvcjogW3tcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9XVxuICAgICAgfV1cbiAgICB9LFxuICAgIHZhbHVlOiB7XG4gICAgICBkZXNjcmlwdG9yOiBbe1xuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgfV1cbiAgICB9LFxuICAgIHByZWNpc2lvbjoge1xuICAgICAgZGVzY3JpcHRvcjogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgY29uZGl0aW9uczoge1xuICAgICAgICAgICAgbm9ubmVnYXRpdmU6IHRydWUsXG4gICAgICAgICAgICBpbnRlZ2VyOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7IHR5cGU6ICdmYWxzZScgfVxuICAgICAgXVxuICAgIH0sXG4gICAgc3RlcDoge1xuICAgICAgZGVzY3JpcHRvcjogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgY29uZGl0aW9uczoge1xuICAgICAgICAgICAgcG9zaXRpdmU6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XG4gICAgICBdXG4gICAgfSxcbiAgICBzdHJ1Y3R1cmU6IHtcbiAgICAgIGNvbnN0cnVjdG9yT25seTogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0b3I6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICAgIGZpbGxlZDogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyB0eXBlOiAnZmFsc2UnIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIG5vZGU6IHtcbiAgICAgIHJlYWRPbmx5OiB0cnVlXG4gICAgfSxcbiAgICBvcmllbnRhdGlvbjoge1xuICAgICAgZGVzY3JpcHRvcjogW3tcbiAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICBrZXl3b3JkczogW1xuICAgICAgICAgICAgJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgJ3ZlcnRpY2FsJ1xuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfV1cbiAgICB9LFxuICAgIGNsYXNzTGlzdDoge1xuICAgICAgY29uc3RydWN0b3JPbmx5OiB0cnVlLFxuICAgICAgZGVzY3JpcHRvcjogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgc2hhcGU6ICd7bm9kZU5hbWU6IFsuLi5jbGFzc2VzXX0nLFxuICAgICAgICAgIGtleU5hbWU6ICdub2RlTmFtZScsXG4gICAgICAgICAgZGVzY3JpcHRvcjogW3tcbiAgICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgICBkZXNjcmlwdG9yOiBbXG4gICAgICAgICAgICAgIHsgdHlwZTogJ3N0cmluZycgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XG4gICAgICBdXG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgIGNvbnN0cnVjdG9yT25seTogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0b3I6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgIHNoYXBlOiAne2V2ZW50TmFtZTogWy4uLmZ1bmN0aW9uc119JyxcbiAgICAgICAgICBrZXlOYW1lOiAnZXZlbnROYW1lJyxcbiAgICAgICAgICBkZXNjcmlwdG9yOiBbe1xuICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAgeyB0eXBlOiAnZmFsc2UnIH1cbiAgICAgIF1cbiAgICB9XG4gIH07XG5cbiAgbWV0aG9kcztcbiAgcHJvcGVydGllcztcblxuICB2YWxzID0ge307IC8vIGhvbGRpbmcgZXZlcnkgY2xhc3MgcHJvcGVydHlcbiAgaW5pdGlhbCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKiBTcGVjaWFsIHByb3BlcnRpZXMgd2hpY2ggYXJlIG9ubHkgdG8gYmUgYWNjZXNzZWQgYnkgYSBnZXR0ZXIvc2V0dGVyLCBuZXZlciBkaXJlY3RseTpcbiAgICAgKiAgICQ6IEZpeGVkIGVuZHBvaW50IGZvciB0aGUgdmFsdWVzIG9mIGFsbCBwcm9wZXJ0aWVzXG4gICAgICogICAkaW50ZXJtZWRpYXRlVGhpczogSW50ZXJtZWRpYXRlIHByb3BlcnR5IChiZXR3ZWVuIHRoaXMgYW5kIHZhbHMpIGZvciB0aGUga2V5cyBvZiBhbiBhcnJheS9vYmplY3RcbiAgICAgKiAgICRpbnRlcm1lZGlhdGVWYWxzOiBJbnRlcm1lZGlhdGUgcHJvcGVydHkgKGJldHdlZW4gdmFscyBhbmQgdmFscy4kKSBmb3IgdGhlIGtleXMgb2YgYW4gYXJyYXkvb2JqZWN0XG4gICAgICpcbiAgICAgKiBUaGlzIHJlc3VsdHMgaW4gdGhlIGZvbGxvd2luZyBnZXR0ZXIvc2V0dGVyIHBhdGhzOlxuICAgICAqICAgTm9ybWFsIChwcmltaXRpdmUgJiBzaGFsbG93KSBwcm9wZXJ0aWVzOlxuICAgICAqICAgICA8dGhpcy5wcm9wZXJ0eT4gICAtLS0gVHlwZSBjaGVjayAmIEN1c3RvbSBnZXR0ZXIvc2V0dGVyIC0tLT5cbiAgICAgKiAgICAgPHZhbHMucHJvcGVydHk+ICAgLS0tIEludGVybmFsIHByb3BlcnR5IHVwZGF0ZSAtLS0+XG4gICAgICogICAgIDx2YWxzLiQucHJvcGVydHk+XG4gICAgICogICBEZWVwbHkgZGVmaW5lZCBBcnJheXM6XG4gICAgICogICAgIDx0aGlzLnByb3BlcnR5PiAgICAgICAgICAgICAgICAgICAgICAgIC0tLSBUeXBlIGNoZWNrICYgQ3VzdG9tIGdldHRlci9zZXR0ZXIgLS0tPlxuICAgICAqICAgICA8dmFscy4kaW50ZXJtZWRpYXRlVGhpcy5wcm9wZXJ0eSA9IFtdPiAtLS0gQ3VzdG9tIGdldHRlci9zZXR0ZXIgb24gdGhlIGtleXMvaW5kZXhlcyAtLS0+XG4gICAgICogICAgIDx2YWxzLnByb3BlcnR5PiAgICAgICAgICAgICAgICAgICAgICAgIC0tLSBJbnRlcm5hbCBwcm9wZXJ0eSB1cGRhdGUgLS0tPlxuICAgICAqICAgICA8dmFscy4kaW50ZXJtZWRpYXRlVmFscy5wcm9wZXJ0eSA9IFtdPiAtLS0gSW50ZXJuYWwgcHJvcGVydHlba2V5L2luZGV4XSB1cGRhdGUgLS0tPlxuICAgICAqICAgICA8dmFscy4kLnByb3BlcnR5PlxuICAgICAqXG4gICAgICogT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgaXMgdXNlZCBmb3Igbm9uLWVudW1lcmFiaWxpdHkgJiBub24td3JpdGFiaWxpdHkgb2YgdGhlc2Ugc3BlY2lhbCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMudmFscywge1xuICAgICAgJyQnOiB7XG4gICAgICAgIHZhbHVlOiB7fVxuICAgICAgfSxcbiAgICAgICckaW50ZXJtZWRpYXRlVGhpcyc6IHtcbiAgICAgICAgdmFsdWU6IHt9XG4gICAgICB9LFxuICAgICAgJyRpbnRlcm1lZGlhdGVWYWxzJzoge1xuICAgICAgICB2YWx1ZToge31cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBTbGlkZXI4OSBmcm9tICcuL1NsaWRlcjg5JztcbmltcG9ydCBTbGlkZXI4OURPTUJ1aWxkZXIgZnJvbSAnLi9TbGlkZXI4OURPTUJ1aWxkZXIuanMnO1xuaW1wb3J0IFNsaWRlcjg5UHJvcGVydGllcyBmcm9tICcuL1NsaWRlcjg5UHJvcGVydGllcy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlcjg5RE9NIGV4dGVuZHMgU2xpZGVyODlQcm9wZXJ0aWVzIHtcbiAgYWN0aXZlVG91Y2hJRHMgPSBuZXcgTWFwKCk7XG4gIGFjdGl2ZVRodW1iO1xuICBtb3VzZURvd25Qb3M7XG5cbiAgdHJhY2tTdHlsZTtcblxuICBkb21CdWlsZGVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm1vdXNlU3RhcnQgPSB0aGlzLm1vdXNlU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLm1vdXNlTW92ZSA9IHRoaXMubW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZUVuZCA9IHRoaXMubW91c2VFbmQuYmluZCh0aGlzKTtcblxuICAgIHRoaXMudG91Y2hTdGFydCA9IHRoaXMudG91Y2hTdGFydC5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG91Y2hNb3ZlID0gdGhpcy50b3VjaE1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRvdWNoRW5kID0gdGhpcy50b3VjaEVuZC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5rZXlEb3duID0gdGhpcy5rZXlEb3duLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmRvbUJ1aWxkZXIgPSBuZXcgU2xpZGVyODlET01CdWlsZGVyKHRoaXMudmFscywge1xuICAgICAgdG91Y2hzdGFydDogdGhpcy50b3VjaFN0YXJ0LFxuICAgICAgbW91c2Vkb3duOiB0aGlzLm1vdXNlU3RhcnQsXG4gICAgICBrZXlkb3duOiB0aGlzLmtleURvd25cbiAgICB9KTtcbiAgfVxuXG5cbiAgLy8gLS0tLSBET00gZ2V0dGVycyAtLS0tXG4gIGdldFRyYWNrUGFkZGluZyhkaXJlY3Rpb24pIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLnRyYWNrU3R5bGVbJ3BhZGRpbmcnICsgZGlyZWN0aW9uXSk7XG4gIH1cbiAgZ2V0VHJhY2tPZmZzZXQoZGlyZWN0aW9uKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy50cmFja1N0eWxlWydib3JkZXInICsgZGlyZWN0aW9uICsgJ1dpZHRoJ10pXG4gICAgICArIHRoaXMuZ2V0VHJhY2tQYWRkaW5nKGRpcmVjdGlvbik7XG4gIH1cblxuICBnZXREaXN0YW5jZSh0aHVtYikge1xuICAgIGlmICh0aGlzLnZhbHMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHJldHVybiB0aHVtYi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgICAgICAgLSB0aGlzLnZhbHMubm9kZS50cmFjay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3BcbiAgICAgICAgLSB0aGlzLmdldFRyYWNrT2Zmc2V0KCdUb3AnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRodW1iLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICAgICAgLSB0aGlzLnZhbHMubm9kZS50cmFjay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG4gICAgICAgIC0gdGhpcy5nZXRUcmFja09mZnNldCgnTGVmdCcpO1xuICAgIH1cbiAgfVxuICBnZXRBYnNvbHV0ZVRyYWNrU2l6ZSh0aHVtYikge1xuICAgIGlmICh0aGlzLnZhbHMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHMubm9kZS50cmFjay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbiAgICAgICAgLSB0aGlzLmdldFRyYWNrT2Zmc2V0KCdUb3AnKVxuICAgICAgICAtIHRoaXMuZ2V0VHJhY2tPZmZzZXQoJ0JvdHRvbScpXG4gICAgICAgIC0gdGh1bWIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxzLm5vZGUudHJhY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbiAgICAgICAgLSB0aGlzLmdldFRyYWNrT2Zmc2V0KCdMZWZ0JylcbiAgICAgICAgLSB0aGlzLmdldFRyYWNrT2Zmc2V0KCdSaWdodCcpXG4gICAgICAgIC0gdGh1bWIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tLSBUaHVtYiBtb3ZpbmcgLS0tLVxuICBtb3ZlVGh1bWJUcmFuc2xhdGUodGh1bWIsIGRpc3RhbmNlKSB7XG4gICAgY29uc3QgYXhpcyA9IHRoaXMudmFscy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/ICdZJyA6ICdYJztcbiAgICB0aHVtYi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyBkaXN0YW5jZSArICdweCknO1xuICB9XG4gIG1vdmVUaHVtYlJlbGF0aXZlKHRodW1iLCBkaXN0YW5jZSkge1xuICAgIC8vIFJlbGF0aXZlIHBvc2l0aW9uaW5nIHN0YXJ0cyBhdCB0aGUgcGFkZGluZywgc28gbG9va2luZyBhdCB0aGUgYm9yZGVyIGlzIG5vdCBuZWVkZWRcbiAgICBpZiAodGhpcy52YWxzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB2YXIgb2Zmc2V0U3RhcnQgPSB0aGlzLmdldFRyYWNrUGFkZGluZygnVG9wJyk7XG4gICAgICB2YXIgb2Zmc2V0RW5kID0gdGhpcy5nZXRUcmFja1BhZGRpbmcoJ0JvdHRvbScpO1xuICAgICAgdmFyIHRodW1iRGltID0gdGh1bWIuY2xpZW50SGVpZ2h0O1xuICAgICAgdmFyIHBvc0FuY2hvciA9ICd0b3AnO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgb2Zmc2V0U3RhcnQgPSB0aGlzLmdldFRyYWNrUGFkZGluZygnTGVmdCcpO1xuICAgICAgdmFyIG9mZnNldEVuZCA9IHRoaXMuZ2V0VHJhY2tQYWRkaW5nKCdSaWdodCcpO1xuICAgICAgdmFyIHRodW1iRGltID0gdGh1bWIuY2xpZW50V2lkdGg7XG4gICAgICB2YXIgcG9zQW5jaG9yID0gJ2xlZnQnO1xuICAgIH1cblxuICAgIGxldCBzdWJ0cmFjdCA9ICh0aHVtYkRpbSAqIGRpc3RhbmNlKSArICdweCc7XG4gICAgaWYgKG9mZnNldEVuZCkgc3VidHJhY3QgKz0gJyAtICcgKyAob2Zmc2V0RW5kICogZGlzdGFuY2UpICsgJ3B4JztcbiAgICBpZiAob2Zmc2V0U3RhcnQpIHN1YnRyYWN0ICs9ICcgKyAnICsgKG9mZnNldFN0YXJ0ICogKDEgLSBkaXN0YW5jZSkpICsgJ3B4JztcblxuICAgIHRodW1iLnN0eWxlW3Bvc0FuY2hvcl0gPSAnY2FsYygnICsgKGRpc3RhbmNlICogMTAwKSArICclIC0gJyArIHN1YnRyYWN0ICsgJyknO1xuICB9XG5cbiAgYXBwbHlBbGxSYXRpb0Rpc3RhbmNlcyhuZXdWYWxzKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHMudmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmFwcGx5T25lUmF0aW9EaXN0YW5jZShpLCBuZXdWYWxzKTtcbiAgICB9XG4gIH1cbiAgYXBwbHlPbmVSYXRpb0Rpc3RhbmNlKHRodW1iSW5kZXgsIG5ld1ZhbHMpIHtcbiAgICBjb25zdCB7IHZhbHVlLCBwcmV2UmF0aW8sIHJhdGlvIH0gPSB0aGlzLmNvbXB1dGVSYXRpb0Rpc3RhbmNlKHRodW1iSW5kZXgsIG5ld1ZhbHMpO1xuXG4gICAgdGhpcy5zZXRWYWx1ZXNXaXRoVmFsdWVDaGFuZ2UodGh1bWJJbmRleCwgdmFsdWUpO1xuICAgIGlmICghU2xpZGVyODkuZmxvYXRJc0VxdWFsKHJhdGlvLCBwcmV2UmF0aW8pKSB0aGlzLm1vdmVUaHVtYlJlbGF0aXZlKHRoaXMudmFscy5ub2RlLnRodW1iW3RodW1iSW5kZXhdLCByYXRpbyk7XG4gIH1cblxuICAvLyAtLS0tIERpc3RhbmNlIGNvbXB1dGF0aW9uIC0tLS1cbiAgY29tcHV0ZURpc3RhbmNlVmFsdWUodGh1bWIsIGRpc3RhbmNlLCBhYnNTaXplKSB7XG4gICAgaWYgKGFic1NpemUgPT0gbnVsbCkgYWJzU2l6ZSA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFja1NpemUodGh1bWIpO1xuICAgIHJldHVybiBkaXN0YW5jZSAvIGFic1NpemUgKiAodGhpcy52YWxzLnJhbmdlWzFdIC0gdGhpcy52YWxzLnJhbmdlWzBdKSArIHRoaXMudmFscy5yYW5nZVswXTtcbiAgfVxuXG4gIGNvbXB1dGVSYXRpb0Rpc3RhbmNlKHRodW1iSW5kZXgsIG5ld1ZhbHMpIHtcbiAgICBsZXQgdmFsdWUsIHJhdGlvO1xuICAgIGlmICghbmV3VmFscykge1xuICAgICAgbmV3VmFscyA9IHRoaXMudmFscztcbiAgICAgIHZhbHVlID0gdGhpcy52YWxzLnZhbHVlc1t0aHVtYkluZGV4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJvcHMgPSBbJ3JhbmdlJywgJ3N0ZXAnXTtcbiAgICAgIGZvciAobGV0IGkgaW4gcHJvcHMpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHNbcHJvcHNbaV1dID09IG51bGwpIG5ld1ZhbHNbcHJvcHNbaV1dID0gdGhpcy52YWxzW3Byb3BzW2ldXTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXdWYWxzLnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdmFsdWUgPSBuZXdWYWxzLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmF0aW8gPSAodGhpcy52YWxzLnZhbHVlc1t0aHVtYkluZGV4XSAtIHRoaXMudmFscy5yYW5nZVswXSkgLyAodGhpcy52YWxzLnJhbmdlWzFdIC0gdGhpcy52YWxzLnJhbmdlWzBdKTtcbiAgICAgICAgdmFsdWUgPSAobmV3VmFscy5yYW5nZVsxXSAtIG5ld1ZhbHMucmFuZ2VbMF0pICogcmF0aW8gKyBuZXdWYWxzLnJhbmdlWzBdO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBSb3VuZCB2YWx1ZSB0byBhIGdpdmVuIHN0ZXBcbiAgICBpZiAobmV3VmFscy5zdGVwICE9PSBmYWxzZSkge1xuICAgICAgaWYgKE1hdGguYWJzKG5ld1ZhbHMucmFuZ2VbMV0gLSBuZXdWYWxzLnJhbmdlWzBdKSA8IG5ld1ZhbHMuc3RlcCkge1xuICAgICAgICB2YWx1ZSA9IG5ld1ZhbHMucmFuZ2VbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IG5ld1ZhbHMucmFuZ2VbMF0gKyBNYXRoLnJvdW5kKCh2YWx1ZSAtIG5ld1ZhbHMucmFuZ2VbMF0pIC8gbmV3VmFscy5zdGVwKSAqIG5ld1ZhbHMuc3RlcDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbmV3UmF0aW8gPSAodmFsdWUgLSBuZXdWYWxzLnJhbmdlWzBdKSAvIChuZXdWYWxzLnJhbmdlWzFdIC0gbmV3VmFscy5yYW5nZVswXSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcHJldlJhdGlvOiByYXRpbyxcbiAgICAgIHJhdGlvOiBuZXdSYXRpb1xuICAgIH07XG4gIH1cblxuICAvLyAtLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLVxuICByZW1vdmVMYXN0VGh1bWJOb2RlKCkge1xuICAgIGNvbnN0IHRodW1iID0gdGhpcy5kb21CdWlsZGVyLnJlbW92ZVRodW1iRnJvbU5vZGUodGhpcy52YWxzLm5vZGUpO1xuICAgIHRoaXMuZG9tQnVpbGRlci50aHVtYlBhcmVudC5yZW1vdmVDaGlsZCh0aHVtYik7XG4gIH1cbiAgYWRkTmV3VGh1bWJOb2RlKHRodW1iSW5kZXgpIHtcbiAgICB0aGlzLmRvbUJ1aWxkZXIuYWRkVGh1bWJUb05vZGUodGhpcy52YWxzLm5vZGUpO1xuICAgIHRoaXMuYXBwbHlPbmVSYXRpb0Rpc3RhbmNlKHRodW1iSW5kZXgpO1xuICB9XG5cbiAgc2V0VmFsdWVzV2l0aFZhbHVlQ2hhbmdlKHRodW1iSW5kZXgsIHZhbHVlKSB7XG4gICAgY29uc3QgcHJldlZhbCA9IHRoaXMudmFscy52YWx1ZXNbdGh1bWJJbmRleF07XG4gICAgaWYgKCFTbGlkZXI4OS5mbG9hdElzRXF1YWwodmFsdWUsIHByZXZWYWwpKSB7XG4gICAgICB0aGlzLnZhbHMudmFsdWVzW3RodW1iSW5kZXhdID0gdmFsdWU7XG4gICAgICBpZiAodGh1bWJJbmRleCA9PT0gMCkge1xuICAgICAgICB0aGlzLmhhbmRsZUludGVybmFsUHJvcGVydHlDaGFuZ2UoJ3ZhbHVlJywgcHJldlZhbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cblxuICAvLyAtLS0tIFRvdWNoIGV2ZW50cyAtLS0tXG4gIHRvdWNoU3RhcnQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBjaGFuZ2VkVG91Y2hlcyBzaG91bGQgYWx3YXlzIGJlIG9mIGxlbmd0aCAxIGJlY2F1c2Ugbm8gdHdvIHRvdWNoZXMgY2FuIHRyaWdnZXIgb25lIGV2ZW50LlxuICAgIGNvbnN0IHRvdWNoID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICBpZiAoIXRoaXMuYWN0aXZlVG91Y2hJRHMuaGFzKHRvdWNoLmlkZW50aWZpZXIpKSB7XG4gICAgICBjb25zdCB0aHVtYk5vZGUgPSBlLnRhcmdldDtcbiAgICAgIHRoaXMuYWN0aXZlVG91Y2hJRHMuc2V0KHRvdWNoLmlkZW50aWZpZXIsIHRodW1iTm9kZSk7XG5cbiAgICAgIHRoaXMuc2xpZGVTdGFydCh0aHVtYk5vZGUsIHRvdWNoLCBlKTtcblxuICAgICAgdGh1bWJOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2hNb3ZlLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgdGh1bWJOb2RlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZCk7XG4gICAgICB0aHVtYk5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLnRvdWNoRW5kKTtcbiAgICB9XG4gIH1cbiAgdG91Y2hNb3ZlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZm9yIChjb25zdCB0b3VjaCBvZiBlLmNoYW5nZWRUb3VjaGVzKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVUb3VjaElEcy5oYXModG91Y2guaWRlbnRpZmllcikpIHtcbiAgICAgICAgY29uc3QgdGh1bWJOb2RlID0gdGhpcy5hY3RpdmVUb3VjaElEcy5nZXQodG91Y2guaWRlbnRpZmllcik7XG5cbiAgICAgICAgdGhpcy5zbGlkZU1vdmUodGh1bWJOb2RlLCB0b3VjaCwgZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHRvdWNoRW5kKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZm9yIChjb25zdCB0b3VjaCBvZiBlLmNoYW5nZWRUb3VjaGVzKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVUb3VjaElEcy5oYXModG91Y2guaWRlbnRpZmllcikpIHtcbiAgICAgICAgY29uc3QgdGh1bWJOb2RlID0gdGhpcy5hY3RpdmVUb3VjaElEcy5nZXQodG91Y2guaWRlbnRpZmllcik7XG4gICAgICAgIHRoaXMuYWN0aXZlVG91Y2hJRHMuZGVsZXRlKHRvdWNoLmlkZW50aWZpZXIpO1xuXG4gICAgICAgIHRoaXMuc2xpZGVFbmQodGh1bWJOb2RlLCB0b3VjaCwgZSk7XG5cbiAgICAgICAgdGh1bWJOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2hNb3ZlLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xuICAgICAgICB0aHVtYk5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kKTtcbiAgICAgICAgdGh1bWJOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy50b3VjaEVuZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tLSBNb3VzZSBldmVudHMgLS0tLVxuICBtb3VzZVN0YXJ0KGUpIHtcbiAgICBjb25zdCB0aHVtYk5vZGUgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzbDg5LW5vc2VsZWN0Jyk7XG5cbiAgICB0aGlzLnNsaWRlU3RhcnQodGh1bWJOb2RlLCBlKTtcblxuICAgIGlmICghdGhpcy5hY3RpdmVUaHVtYikge1xuICAgICAgdGhpcy5hY3RpdmVUaHVtYiA9IHRodW1iTm9kZTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VFbmQpO1xuICAgIH1cbiAgfVxuICBtb3VzZU1vdmUoZSkge1xuICAgIHRoaXMuc2xpZGVNb3ZlKHRoaXMuYWN0aXZlVGh1bWIsIGUpO1xuICB9XG4gIG1vdXNlRW5kKGUpIHtcbiAgICB0aGlzLnNsaWRlRW5kKHRoaXMuYWN0aXZlVGh1bWIsIGUpO1xuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubW91c2VFbmQpO1xuICAgIHRoaXMubW91c2VEb3duUG9zID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZVRodW1iID0gbnVsbDtcbiAgfVxuXG4gIC8vIC0tLS0gR2VuZXJhbCBldmVudCBoYW5kbGVycyAtLS0tXG4gIHNsaWRlU3RhcnQodGh1bWJOb2RlLCBlLCBldmVudEFyZyA9IGUpIHtcbiAgICB0aHVtYk5vZGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgLy8gaW52b2tlRXZlbnQoWydzdGFydCddLCBldmVudEFyZyk7XG5cbiAgICBpZiAodGhpcy52YWxzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB2YXIgcG9zQW5jaG9yID0gJ3RvcCc7XG4gICAgICB2YXIgY2xpZW50RGltID0gZS5jbGllbnRZO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcG9zQW5jaG9yID0gJ2xlZnQnO1xuICAgICAgdmFyIGNsaWVudERpbSA9IGUuY2xpZW50WDtcbiAgICB9XG4gICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmdldERpc3RhbmNlKHRodW1iTm9kZSk7XG4gICAgdGhpcy5tb3VzZURvd25Qb3MgPSBjbGllbnREaW0gLSBkaXN0YW5jZTtcbiAgICB0aGlzLm1vdmVUaHVtYlRyYW5zbGF0ZSh0aHVtYk5vZGUsIGRpc3RhbmNlKTtcbiAgICB0aHVtYk5vZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkocG9zQW5jaG9yKTtcbiAgfVxuICBzbGlkZU1vdmUodGh1bWJOb2RlLCBlLCBldmVudEFyZyA9IGUpIHtcbiAgICBjb25zdCB0aHVtYkluZGV4ID0gdGhpcy52YWxzLm5vZGUudGh1bWIuaW5kZXhPZih0aHVtYk5vZGUpO1xuICAgIGNvbnN0IGFic1NpemUgPSB0aGlzLmdldEFic29sdXRlVHJhY2tTaXplKHRodW1iTm9kZSk7XG4gICAgbGV0IGRpc3RhbmNlID0gKHRoaXMudmFscy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/IGUuY2xpZW50WSA6IGUuY2xpZW50WCkgLSB0aGlzLm1vdXNlRG93blBvcztcblxuICAgIGlmIChkaXN0YW5jZSA+IGFic1NpemUpXG4gICAgICBkaXN0YW5jZSA9IGFic1NpemU7XG4gICAgZWxzZSBpZiAoZGlzdGFuY2UgPCAwKVxuICAgICAgZGlzdGFuY2UgPSAwO1xuXG4gICAgbGV0IHZhbHVlID0gdGhpcy5jb21wdXRlRGlzdGFuY2VWYWx1ZSh0aHVtYk5vZGUsIGRpc3RhbmNlLCBhYnNTaXplKTtcbiAgICBpZiAodGhpcy52YWxzLnN0ZXAgIT09IGZhbHNlKSB7XG4gICAgICBjb25zdCBjb21wdXRlZFByb3BlcnRpZXMgPSB0aGlzLmNvbXB1dGVSYXRpb0Rpc3RhbmNlKHRodW1iSW5kZXgsIHsgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgdmFsdWUgPSBjb21wdXRlZFByb3BlcnRpZXMudmFsdWU7XG4gICAgICBkaXN0YW5jZSA9IGNvbXB1dGVkUHJvcGVydGllcy5yYXRpbyAqIGFic1NpemU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2V0VmFsdWVzV2l0aFZhbHVlQ2hhbmdlKHRodW1iSW5kZXgsIHZhbHVlKSkge1xuICAgICAgdGhpcy5tb3ZlVGh1bWJUcmFuc2xhdGUodGh1bWJOb2RlLCBkaXN0YW5jZSk7XG4gICAgICB0aGlzLmludm9rZUV2ZW50KFsnbW92ZSddLCBldmVudEFyZyk7XG4gICAgfVxuICB9XG4gIHNsaWRlRW5kKHRodW1iTm9kZSwgZSwgZXZlbnRBcmcgPSBlKSB7XG4gICAgY29uc3QgdGh1bWJJbmRleCA9IHRoaXMudmFscy5ub2RlLnRodW1iLmluZGV4T2YodGh1bWJOb2RlKTtcblxuICAgIHRoaXMuYXBwbHlPbmVSYXRpb0Rpc3RhbmNlKHRodW1iSW5kZXgpO1xuICAgIHRodW1iTm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNmb3JtJyk7XG5cbiAgICB0aGlzLmludm9rZUV2ZW50KFsnZW5kJ10sIGV2ZW50QXJnKTtcbiAgICB0aHVtYk5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdzbDg5LW5vc2VsZWN0Jyk7XG4gIH1cblxuXG4gIC8vIC0tLS0gTWlzYyBldmVudHMgLS0tLVxuICBrZXlEb3duKGUpIHtcbiAgICBpZiAoIWUua2V5LnN0YXJ0c1dpdGgoJ0Fycm93JykpIHJldHVybjtcblxuICAgIGNvbnN0IHRodW1iSW5kZXggPSB0aGlzLnZhbHMubm9kZS50aHVtYi5pbmRleE9mKGUuY3VycmVudFRhcmdldCk7XG5cbiAgICBsZXQgbW9kaWZpZXIgPSBNYXRoLnJvdW5kKCh0aGlzLnZhbHMucmFuZ2VbMV0gLSB0aGlzLnZhbHMucmFuZ2VbMF0pIC8gMTAwKTtcbiAgICBpZiAoZS5zaGlmdEtleSAmJiBlLmN0cmxLZXkpIHtcbiAgICAgIG1vZGlmaWVyICo9IDAuMTtcbiAgICB9IGVsc2UgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgIG1vZGlmaWVyICo9IDEwO1xuICAgIH1cblxuICAgIGlmIChlLmtleSA9PT0gJ0Fycm93TGVmdCcgfHwgZS5rZXkgPT09ICdBcnJvd1VwJykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy52YWx1ZXNbdGh1bWJJbmRleF0gLT0gbW9kaWZpZXI7XG4gICAgfSBlbHNlIGlmIChlLmtleSA9PT0gJ0Fycm93UmlnaHQnIHx8IGUua2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy52YWx1ZXNbdGh1bWJJbmRleF0gKz0gbW9kaWZpZXI7XG4gICAgfVxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgZGVmYXVsdFN0eWxlc1N0cmluZyBmcm9tICcuLi9jc3MvZGVmYXVsdC1zdHlsZXMuY3NzJztcbmltcG9ydCBTbGlkZXI4OSBmcm9tICcuL1NsaWRlcjg5JztcbmltcG9ydCBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlciBmcm9tICcuL1NsaWRlcjg5U3RydWN0dXJlUGFyc2VyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyODlET01CdWlsZGVyIGV4dGVuZHMgU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIge1xuICBzdGF0aWMgaGFzSW5qZWN0ZWRTdHlsZXNoZWV0ID0gZmFsc2U7XG5cbiAgdGh1bWJCYXNlOyAvLyBDbG9uYWJsZSB0aHVtYiBub2RlXG4gIHRodW1iUGFyZW50O1xuXG4gIGJhc2VFbGVtZW50cyA9IHt9O1xuXG4gIHN0cnVjdHVyZVZhclRodW1iU3RyaW5ncyA9IHt9O1xuXG4gIC8qKiBAdHlwZSBSZWNvcmQ8c3RyaW5nLCBGdW5jdGlvbj4gKi9cbiAgdGh1bWJFdmVudHMgPSB7fTtcblxuXG4gIGNvbnN0cnVjdG9yKHZhbHMsIHRodW1iRXZlbnRzKSB7XG4gICAgc3VwZXIodmFscyk7XG4gICAgdGhpcy50aHVtYkV2ZW50cyA9IHRodW1iRXZlbnRzO1xuICB9XG5cblxuICAvLyAtLS0tIEVsZW1lbnQgYnVpbGRlciAtLS0tXG4gIGNyZWF0ZVNsaWRlck5vZGUodGh1bWJDb3VudCwgc3RydWN0dXJlU3RyKSB7XG4gICAgcmV0dXJuIHN0cnVjdHVyZVN0ciA9PT0gZmFsc2VcbiAgICAgID8gdGhpcy5jcmVhdGVTbGlkZXJNYW51YWxseSh0aHVtYkNvdW50KVxuICAgICAgOiB0aGlzLmNyZWF0ZVNsaWRlckZyb21TdHJ1Y3R1cmUodGh1bWJDb3VudCwgc3RydWN0dXJlU3RyKTtcbiAgfVxuXG5cbiAgLy8gSW4gY2FzZSBubyBjdXN0b20gc3RydWN0dXJlIGlzIGRlZmluZWQsIG1hbnVhbGx5IGJ1aWxkIHRoZSBub2RlIHRvIGVuc3VyZSBiZXN0IHBlcmZvcm1hbmNlIChwYXJzZVN0cnVjdHVyZSB0YWtlcyBhIHdoaWxlKVxuICBjcmVhdGVTbGlkZXJNYW51YWxseSh0aHVtYkNvdW50KSB7XG4gICAgY29uc3Qgbm9kZSA9IHtcbiAgICAgIHNsaWRlcjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICB0cmFjazogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICB0aHVtYjogbmV3IEFycmF5KHRodW1iQ291bnQpXG4gICAgfTtcblxuICAgIHRoaXMudGh1bWJCYXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50aHVtYlBhcmVudCA9IG5vZGUudHJhY2s7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRodW1iQ291bnQ7IGkrKykge1xuICAgICAgbm9kZS50aHVtYltpXSA9IHRoaXMuY3JlYXRlTmV3VGh1bWIoKTtcbiAgICB9XG4gICAgbm9kZS5zbGlkZXIuYXBwZW5kQ2hpbGQobm9kZS50cmFjayk7XG5cbiAgICBmb3IgKGxldCBlbGVtZW50IGluIG5vZGUpIHtcbiAgICAgIC8vIFRodW1iIGNsYXNzZXMgYXJlIGFwcGxpZWQgaW4gYGNyZWF0ZU5ld1RodW1iYFxuICAgICAgaWYgKGVsZW1lbnQgIT09ICdzbGlkZXInICYmIGVsZW1lbnQgIT09ICd0aHVtYicpIHtcbiAgICAgICAgbm9kZVtlbGVtZW50XS5jbGFzc0xpc3QuYWRkKCdzbDg5LScgKyBlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjcmVhdGVTbGlkZXJGcm9tU3RydWN0dXJlKHRodW1iQ291bnQsIHN0cnVjdHVyZVN0cikge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLnBhcnNlU3RydWN0dXJlKHN0cnVjdHVyZVN0cik7XG4gICAgdGhpcy5wYXJzZVBvc3RQcm9jZXNzKG5vZGUsIHRodW1iQ291bnQpO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgcGFyc2VQb3N0UHJvY2Vzcyhub2RlLCB0aHVtYkNvdW50KSB7XG4gICAgLy8gTk9URTogdGh1bWIgYW5kIHRyYWNrIGNhbiBiZSBkZWZpbmVkIGluZGVwZW5kZW50bHlcbiAgICAvLyBJLmUuIHRyYWNrIGdldHMgdGhlIGNsYXNzIGBzbDg5LXRyYWNrYCwgYnV0IHRoaXMudGh1bWJQYXJlbnQgY2FuIGJlIGEgZGlmZmVyZW50IG5vZGVcbiAgICBpZiAoIW5vZGUudGh1bWIpIHtcbiAgICAgIHRoaXMudGh1bWJCYXNlID0gdGhpcy5hc3NlbWJsZUVsZW1lbnQobm9kZSwgJ3RodW1iJywgJ2RpdicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRodW1iQmFzZSA9IG5vZGUudGh1bWI7XG4gICAgICBpZiAobm9kZS50cmFjaykge1xuICAgICAgICB0aGlzLnRodW1iUGFyZW50ID0gbm9kZS50aHVtYi5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgICAgLy8gYmFzZUVsZW1lbnRzIGlzIG9ubHkgZWZmZWN0aXZlIGlmIGEgc3RydWN0dXJlIHRodW1iIGhhcyBiZWVuIGRlZmluZWRcbiAgICAgIHRoaXMuYmFzZUVsZW1lbnRzLnRodW1iID0gdGhpcy50aHVtYkJhc2U7XG4gICAgfVxuICAgIGlmICghbm9kZS50cmFjaykge1xuICAgICAgbm9kZS50cmFjayA9IHRoaXMuYXNzZW1ibGVFbGVtZW50KG5vZGUsICd0cmFjaycsICdkaXYnKTtcbiAgICAgIGlmIChub2RlLnRodW1iKSB7XG4gICAgICAgIG5vZGUudGh1bWIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChub2RlLnRyYWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuc2xpZGVyLmFwcGVuZENoaWxkKG5vZGUudHJhY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBvcmlnaW5hbCB0aHVtYiBub2RlXG4gICAgaWYgKG5vZGUudGh1bWIpIHtcbiAgICAgIG5vZGUudGh1bWIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlLnRodW1iKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnRodW1iUGFyZW50KSB7XG4gICAgICB0aGlzLnRodW1iUGFyZW50ID0gbm9kZS50cmFjaztcbiAgICB9XG5cbiAgICBub2RlLnRyYWNrLmNsYXNzTGlzdC5hZGQoJ3NsODktdHJhY2snKTtcblxuICAgIC8vIFB1c2ggdGh1bWIgJiBkZXNjZW5kYW50cyBpbnRvIG5vZGUgYXJyYXlzXG4gICAgbm9kZS50aHVtYiA9IG5ldyBBcnJheSgpO1xuICAgIGZvciAoY29uc3Qgbm9kZU5hbWUgb2YgdGhpcy50aHVtYkNoaWxkcmVuKSB7XG4gICAgICB0aGlzLmJhc2VFbGVtZW50c1tub2RlTmFtZV0gPSBub2RlW25vZGVOYW1lXTtcbiAgICAgIG5vZGVbbm9kZU5hbWVdID0gbmV3IEFycmF5KCk7XG4gICAgfVxuXG4gICAgdGhpcy5maW5kU3RydWN0dXJlVmFyU3RyaW5nc0luVGh1bWIodGhpcy50aHVtYkJhc2UpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aHVtYkNvdW50OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkVGh1bWJUb05vZGUobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgZmluZFN0cnVjdHVyZVZhclN0cmluZ3NJblRodW1iKHRodW1iQmFzZSkge1xuICAgIGZvciAoY29uc3QgWyBwcm9wTmFtZSwgc3RyaW5nTGlzdCBdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuc3RydWN0dXJlVmFycykpIHtcbiAgICAgIGxldCB0aHVtYlN0cmluZ3MgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgWyBzdHIsIG5vZGVMaXN0IF0gb2YgT2JqZWN0LmVudHJpZXMoc3RyaW5nTGlzdCkpIHtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVMaXN0KSB7XG4gICAgICAgICAgaWYgKHRoaXMubm9kZUhhc0Jhc2VFbGVtZW50T3duZXIobm9kZSkpIHtcbiAgICAgICAgICAgIHRodW1iU3RyaW5ncy5wdXNoKHN0cik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aHVtYlN0cmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnN0cnVjdHVyZVZhclRodW1iU3RyaW5nc1twcm9wTmFtZV0gPSB0aHVtYlN0cmluZ3M7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvLyAtLS0tIFRodW1iIGhlbHBlcnMgLS0tLVxuICBhZGRUaHVtYlRvTm9kZShub2RlKSB7XG4gICAgY29uc3QgbmV3VGh1bWIgPSB0aGlzLmNyZWF0ZU5ld1RodW1iKCk7XG4gICAgbm9kZS50aHVtYi5wdXNoKG5ld1RodW1iKTtcblxuICAgIFNsaWRlcjg5RE9NQnVpbGRlci5maW5kTm9kZUNoaWxkcmVuKG5ld1RodW1iKVxuICAgICAgLmZvckVhY2goKGNoaWxkTm9kZSwgaikgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZE5hbWUgPSB0aGlzLnRodW1iQ2hpbGRyZW5bal07XG4gICAgICAgIG5vZGVbY2hpbGROYW1lXS5wdXNoKGNoaWxkTm9kZSk7XG4gICAgICB9KTtcbiAgfVxuICByZW1vdmVUaHVtYkZyb21Ob2RlKG5vZGUpIHtcbiAgICBmb3IgKGNvbnN0IG5vZGVOYW1lIG9mIHRoaXMudGh1bWJDaGlsZHJlbikge1xuICAgICAgbm9kZVtub2RlTmFtZV0ucG9wKCk7XG4gICAgfVxuICAgIHJldHVybiBub2RlLnRodW1iLnBvcCgpO1xuICB9XG5cblxuICAvLyAtLS0tIE1pc2MgZnVuY3Rpb25zIC0tLS1cbiAgYWRkQXR0cmlidXRlc0Zyb21UYXJnZXQobm9kZSwgdGFyZ2V0Tm9kZSkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB0YXJnZXROb2RlLmF0dHJpYnV0ZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBub2RlLnNsaWRlci5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlc1tpXS5uYW1lLCBhdHRyaWJ1dGVzW2ldLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzc2VzKG5vZGUsIGNsYXNzTGlzdCwgaXNWZXJ0aWNhbCkge1xuICAgIG5vZGUuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcjg5Jyk7XG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIG5vZGUuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3ZlcnRpY2FsJyk7XG4gICAgfVxuICAgIGlmIChjbGFzc0xpc3QpIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3Nlc0Zyb21DbGFzc0xpc3Qobm9kZSwgY2xhc3NMaXN0KTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgdGhlIHNwZWNpZmllZCBjbGFzc2VzIGFuZCBjb2xsZWN0aW5nIGFsbCBub25leGlzdGVudCBub2RlcyBpbiBgZXJyTm9kZXNgXG4gIGFkZENsYXNzZXNGcm9tQ2xhc3NMaXN0KG5vZGUsIGNsYXNzTGlzdCkge1xuICAgIGNvbnN0IGVyck5vZGVzID0gbmV3IEFycmF5KCk7XG5cbiAgICBmb3IgKGxldCBub2RlTmFtZSBpbiBjbGFzc0xpc3QpIHtcbiAgICAgIGNvbnN0IGNsYXNzQXJyID0gY2xhc3NMaXN0W25vZGVOYW1lXTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5vZGUsIG5vZGVOYW1lKSkge1xuICAgICAgICBlcnJOb2Rlcy5wdXNoKG5vZGVOYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoZXJyTm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3NBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAobm9kZU5hbWUgPT09ICd0aHVtYicpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbm9kZVtub2RlTmFtZV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgbm9kZVtub2RlTmFtZV1bal0uY2xhc3NMaXN0LmFkZChjbGFzc0FycltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGVbbm9kZU5hbWVdLmNsYXNzTGlzdC5hZGQoY2xhc3NBcnJbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlcnJOb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBtc2cgPVxuICAgICAgICBcIlRoZSBnaXZlbiBvYmplY3QgY29udGFpbnMgaXRlbXMgd2hpY2ggYXJlbid0IG5vZGVzIG9mIHRoaXMgc2xpZGVyOlwiICsgU2xpZGVyODkuYXJyYXlUb0xpc3RTdHJpbmcoZXJyTm9kZXMpICtcbiAgICAgICAgXCJGb2xsb3dpbmcgbm9kZXMgYXJlIHBhcnQgb2YgdGhpcyBzbGlkZXIncyBub2RlIHBvb2w6XCIgKyBTbGlkZXI4OS5hcnJheVRvTGlzdFN0cmluZyhPYmplY3Qua2V5cyhub2RlKSlcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5FcnJvcihtc2csICdjbGFzc0xpc3QnLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLVxuICBjcmVhdGVOZXdUaHVtYigpIHtcbiAgICBjb25zdCBuZXdUaHVtYiA9IHRoaXMudGh1bWJCYXNlLmNsb25lTm9kZSh0cnVlKTtcbiAgICBuZXdUaHVtYi5jbGFzc0xpc3QuYWRkKCdzbDg5LXRodW1iJyk7XG4gICAgaWYgKG5ld1RodW1iLnRhYmluZGV4ID09IG51bGwpIHtcbiAgICAgIG5ld1RodW1iLnRhYkluZGV4ID0gMDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbIGV2ZW50TmFtZSwgY2FsbGJhY2sgXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLnRodW1iRXZlbnRzKSkge1xuICAgICAgbmV3VGh1bWIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCB7XG4gICAgICAgIHBhc3NpdmU6ICFldmVudE5hbWUuc3RhcnRzV2l0aCgndG91Y2gnKVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMudGh1bWJQYXJlbnQuYXBwZW5kQ2hpbGQobmV3VGh1bWIpO1xuICAgIHJldHVybiBuZXdUaHVtYjtcbiAgfVxuXG4gIG5vZGVIYXNCYXNlRWxlbWVudE93bmVyKG5vZGUpIHtcbiAgICBmb3IgKGNvbnN0IFsgYmFzZU5hbWUsIGVsZW1lbnQgXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmJhc2VFbGVtZW50cykpIHtcbiAgICAgIGlmIChTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5nZXROb2RlT3duZXIobm9kZSkgPT09IGVsZW1lbnQpIHJldHVybiBiYXNlTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gLS0tLSBTdGF0aWMgc3R5bGUgc2hlZXQgY3JlYXRpb24gLS0tLVxuICAvLyBOT1RFOiBJIHRoaW5rIHRoYXQgYSBnbG9iYWwgT2JqZWN0IChsaWtlIFNsaWRlcjg5KSBjYW5ub3QgYmUgaW4gbXVsdGlwbGVcbiAgLy8gZG9jdW1lbnRzIGF0IG9uY2UuIFRodXMsIGp1c3Qgc2V0dGluZyBhIGdsb2JhbCBmbGFnIHRvIHRydWUgc2hvdWxkIGJlXG4gIC8vIHN1ZmZpY2llbnQgdG8gbWFyayB0aGUgY3VycmVudCBkb2N1bWVudCBhcyBhbHJlYWR5IGluamVjdGVkLlxuICBzdGF0aWMgaW5qZWN0U3R5bGVTaGVldElmTmVlZGVkKCkge1xuICAgIGlmIChTbGlkZXI4OURPTUJ1aWxkZXIuaGFzSW5qZWN0ZWRTdHlsZXNoZWV0ID09PSBmYWxzZSkge1xuICAgICAgY29uc3Qgc3R5bGVTaGVldEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgY29uc3QgZmlyc3RIZWFkQ2hpbGQgPSBkb2N1bWVudC5oZWFkLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gICAgICBzdHlsZVNoZWV0RWxlbWVudC50ZXh0Q29udGVudCA9IGRlZmF1bHRTdHlsZXNTdHJpbmc7XG5cbiAgICAgIC8vIEVuc3VyZSB0aGF0IGl0IGlzIHRoZSBmaXJzdCBzdHlsZSBzaGVldCBpbiB0aGUgZG9jdW1lbnRcbiAgICAgIGlmIChmaXJzdEhlYWRDaGlsZCkge1xuICAgICAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZShzdHlsZVNoZWV0RWxlbWVudCwgZmlyc3RIZWFkQ2hpbGQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0RWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIFNsaWRlcjg5RE9NQnVpbGRlci5oYXNJbmplY3RlZFN0eWxlc2hlZXQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBpdGVyYXRlIHRocm91Z2ggYSBub2RlJ3MgY2hpbGRyZW4sIGNvbGxlY3RpbmcgdGhlbSBpbiBhbiBhcnJheSBpbiBvcmRlci5cbiAgICogV2hlbiB1c2VkIG9uIGEgdGh1bWIgbm9kZSwgdGhlIHJlc3VsdCBpcyBhbmFsb2dvdXMgdG8ge0BsaW5rIHRodW1iQ2hpbGRyZW59LlxuICAgKiBAcGFyYW0geyBIVE1MRWxlbWVudCB9IG5vZGUgVGhlIGlucHV0IG5vZGUuXG4gICAqIEBwYXJhbSB7IEFycmF5PEhUTUxFbGVtZW50PiB9IGNvbGxlY3RvclxuICAgKiBAcmV0dXJuIHsgQXJyYXk8SFRNTEVsZW1lbnQ+IH0gQWxsIGNoaWxkcmVuIG9mIHRoZSBpbnB1dCBub2RlLlxuICAgKi9cbiAgc3RhdGljIGZpbmROb2RlQ2hpbGRyZW4obm9kZSwgY29sbGVjdG9yID0gW10pIHtcbiAgICBpZiAobm9kZS5jaGlsZEVsZW1lbnRDb3VudCA9PT0gMCkgcmV0dXJuIGNvbGxlY3RvcjtcblxuICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgY29sbGVjdG9yLnB1c2goY2hpbGQpO1xuICAgICAgU2xpZGVyODlET01CdWlsZGVyLmZpbmROb2RlQ2hpbGRyZW4oY2hpbGQsIGNvbGxlY3Rvcik7XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0b3I7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBMaWJyYXJ5VHlwZUNoZWNrIGZyb20gJy4vTGlicmFyeVR5cGVDaGVjay5qcyc7XG5pbXBvcnQgU2xpZGVyODkgZnJvbSAnLi9TbGlkZXI4OSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlcjg5RXJyb3Ige1xuICBzdGF0aWMgQ09VTlRTID0gWydmaXJzdCcsICdzZWNvbmQnLCAndGhpcmQnLCAnZm91cnRoJywgJ2ZpZnRoJywgJ3NpeHRoJywgJ3NldmVudGgnLCAnZWlnaHRoJywgJ25pbnRoJ107XG5cbiAgc3RhdGljIEVycm9yID0gY2xhc3MgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobXNnLCB0YXJnZXQsIGFib3J0ID0gZmFsc2UpIHtcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgbXNnID0gJ0AgJyArIHRhcmdldCArICc6ICcgKyBtc2c7XG4gICAgICB9XG4gICAgICBpZiAobXNnW21zZy5sZW5ndGggLSAxXSAhPT0gJ1xcbicgJiYgbXNnW21zZy5sZW5ndGggLSAxXSAhPT0gJy4nKSB7XG4gICAgICAgIG1zZyArPSAnLic7XG4gICAgICB9XG4gICAgICBpZiAoYWJvcnQpIHtcbiAgICAgICAgbXNnICs9ICdcXG5BYm9ydGluZyB0aGUgc2xpZGVyIGNvbnN0cnVjdGlvbi4nO1xuICAgICAgfVxuXG4gICAgICBzdXBlcihtc2cpO1xuICAgICAgdGhpcy5uYW1lID0gJ1NsaWRlcjg5JyArIHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIENvbnN0cnVjdG9yIGVycm9yIC0tLS1cbiAgc3RhdGljIEluaXRpYWxpemF0aW9uRXJyb3IgPSBjbGFzcyBleHRlbmRzIFNsaWRlcjg5RXJyb3IuRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1zZykge1xuICAgICAgc3VwZXIobXNnLCAnY29uc3RydWN0b3InLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIFByb3BlcnR5IGVycm9ycyAtLS0tXG4gIHN0YXRpYyBQcm9wZXJ0eUVycm9yID0gY2xhc3MgZXh0ZW5kcyBTbGlkZXI4OUVycm9yLkVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIsIHByb3BlcnR5LCBtc2cpIHtcbiAgICAgIGxldCBwcmV2VmFsID0gc2xpZGVyW3Byb3BlcnR5XTtcbiAgICAgIGlmIChwcmV2VmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJldlZhbCkpIHtcbiAgICAgICAgICBwcmV2VmFsID0gJ1snICsgcHJldlZhbC5qb2luKCcsICcpICsgJ10nO1xuICAgICAgICB9XG4gICAgICAgIG1zZyArPSAnLlxcbkNvbnRpbnVpbmcgd2l0aCB0aGUgcHJldmlvdXMgdmFsdWUgKCcgKyBwcmV2VmFsICsgJykuJztcbiAgICAgIH1cblxuICAgICAgc3VwZXIobXNnLCBwcm9wZXJ0eSwgcHJldlZhbCA9PT0gdW5kZWZpbmVkKTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIFByb3BlcnR5VHlwZUVycm9yID0gY2xhc3MgZXh0ZW5kcyBTbGlkZXI4OUVycm9yLlByb3BlcnR5RXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlciwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eUluZm8sIHR5cGVNc2cpIHtcbiAgICAgIGxldCBtc2cgPVxuICAgICAgICAnVHlwZSBtaXNtYXRjaC4nXG4gICAgICAgICsgU2xpZGVyODkuZ2V0VHlwZUVycm9yTWVzc2FnZShwcm9wZXJ0eUluZm8uZGVzY3JpcHRvciwgdHlwZU1zZyk7XG5cbiAgICAgIHN1cGVyKHNsaWRlciwgcHJvcGVydHlOYW1lLCBtc2cpO1xuICAgIH1cbiAgfVxuXG4gIC8vIC0tLS0gTWV0aG9kIGVycm9ycyAtLS0tXG4gIHN0YXRpYyBNZXRob2RBcmdUeXBlRXJyb3IgPSBjbGFzcyBleHRlbmRzIFNsaWRlcjg5RXJyb3IuRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZE5hbWUsIGluZGV4LCB0eXBlTXNnKSB7XG4gICAgICBjb25zdCBhcmdJbmZvID0gU2xpZGVyODkuZ2V0TWV0aG9kQXJnSW5mbyhtZXRob2ROYW1lLCBpbmRleCk7XG4gICAgICBjb25zdCBtc2cgPVxuICAgICAgICAnVHlwZSBtaXNtYXRjaCBvbiB0aGUgJyArIFNsaWRlcjg5RXJyb3IuZ2V0TWV0aG9kQXJnTWVzc2FnZShhcmdJbmZvLCBpbmRleCkgKyAnLidcbiAgICAgICAgKyBTbGlkZXI4OS5nZXRUeXBlRXJyb3JNZXNzYWdlKGFyZ0luZm8uZGVzY3JpcHRvciwgdHlwZU1zZyk7XG5cbiAgICAgIHN1cGVyKG1zZywgbWV0aG9kTmFtZSk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBNZXRob2RBcmdPbWl0RXJyb3IgPSBjbGFzcyBleHRlbmRzIFNsaWRlcjg5RXJyb3IuRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZE5hbWUsIGluZGV4KSB7XG4gICAgICBjb25zdCBhcmdJbmZvID0gU2xpZGVyODkuZ2V0TWV0aG9kQXJnSW5mbyhtZXRob2ROYW1lLCBpbmRleCk7XG4gICAgICBjb25zdCBtc2cgPVxuICAgICAgICAnVGhlICcgKyBTbGlkZXI4OUVycm9yLmdldE1ldGhvZEFyZ01lc3NhZ2UoYXJnSW5mbywgaW5kZXgpXG4gICAgICAgICsgJyBoYXMgYmVlbiBvbWl0dGVkIGJ1dCBpdCBpcyByZXF1aXJlZCdcbiAgICAgICAgKyAnIChJdCBtdXN0IGJlIG9mIHR5cGUgJyArIExpYnJhcnlUeXBlQ2hlY2suYnVpbGREZXNjcmlwdG9yVHlwZU1lc3NhZ2UoYXJnSW5mby5kZXNjcmlwdG9yKSArICcpLic7XG5cbiAgICAgIHN1cGVyKG1zZywgbWV0aG9kTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tLSBTdHJ1Y3R1cmUgZXJyb3JzIC0tLS1cbiAgc3RhdGljIFN0cnVjdHVyZUVycm9yID0gY2xhc3MgZXh0ZW5kcyBTbGlkZXI4OUVycm9yLkVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihtc2cpIHtcbiAgICAgIHN1cGVyKG1zZywgJ3N0cnVjdHVyZScsIHRydWUpO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgU3RydWN0dXJlUGFyc2VFcnJvciA9IGNsYXNzIGV4dGVuZHMgU2xpZGVyODlFcnJvci5TdHJ1Y3R1cmVFcnJvciB7XG4gICAgY29uc3RydWN0b3IoYmVmb3JlRmFpbHVyZSwgcG9pbnRPZkZhaWx1cmUpIHtcbiAgICAgIGNvbnN0IG1zZyA9XG4gICAgICAgIFwiU29tZXRoaW5nIGhhcyBiZWVuIGRlY2xhcmVkIHdyb25nbHkgYW5kIGNvdWxkbid0IGJlIHBhcnNlZC4gUG9pbnQgb2YgZmFpbHVyZSBcIlxuICAgICAgICArIFwiKGJlZm9yZSBcIiArIGJlZm9yZUZhaWx1cmUgKyBcIik6XFxuXFxuXCJcbiAgICAgICAgKyBwb2ludE9mRmFpbHVyZSArICdcXG4nO1xuICAgICAgc3VwZXIobXNnKTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLVxuICBzdGF0aWMgZ2V0VHlwZUVycm9yTWVzc2FnZShkZXNjcmlwdG9yLCB0eXBlTXNnKSB7XG4gICAgcmV0dXJuICcgRXhwZWN0ZWQgJyArIExpYnJhcnlUeXBlQ2hlY2suYnVpbGREZXNjcmlwdG9yVHlwZU1lc3NhZ2UoZGVzY3JpcHRvcikgKyAnLCdcbiAgICAgICAgICsgJyBnb3QgJyArIHR5cGVNc2c7XG4gIH1cblxuICBzdGF0aWMgZ2V0TWV0aG9kQXJnTWVzc2FnZShhcmdJbmZvLCBpbmRleCkge1xuICAgIGxldCBtc2cgPSAnJztcbiAgICBpZiAoYXJnSW5mby5vcHRpb25hbCkge1xuICAgICAgbXNnICs9ICdvcHRpb25hbCAnO1xuICAgIH1cbiAgICBtc2cgKz0gU2xpZGVyODkuQ09VTlRTW2luZGV4XSArICcgYXJndW1lbnQgKCcgKyBhcmdJbmZvLm5hbWUgKyAnKSc7XG4gICAgcmV0dXJuIG1zZztcbiAgfVxuXG4gIHN0YXRpYyBnZXRNZXRob2RBcmdJbmZvKG1ldGhvZE5hbWUsIGluZGV4KSB7XG4gICAgcmV0dXJuIFNsaWRlcjg5Lm1ldGhvZERhdGFbbWV0aG9kTmFtZV0uYXJnc1tpbmRleF07XG4gIH1cblxuICBzdGF0aWMgYXJyYXlUb0xpc3RTdHJpbmcoYXJyKSB7XG4gICAgcmV0dXJuICdcXG4gLSBcIicgKyBhcnIuam9pbignXCJcXG4gLSBcIicpICsgJ1wiXFxuJztcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IFNsaWRlcjg5IGZyb20gJy4vU2xpZGVyODknO1xuaW1wb3J0IFNsaWRlcjg5QmFzZSBmcm9tICcuL1NsaWRlcjg5QmFzZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlcjg5RXZlbnRzIGV4dGVuZHMgU2xpZGVyODlCYXNlIHtcbiAgc3RhdGljIGV2ZW50VHlwZXMgPSBbXG4gICAgJ3N0YXJ0JyxcbiAgICAnbW92ZScsXG4gICAgJ2VuZCcsXG4gICAgJ2NoYW5nZTokcHJvcGVydHknXG4gIF07XG5cblxuICBldmVudExpc3QgPSB7fTsgLy8gU3RvcmluZyBldmVudCBkYXRhIChtb3N0IG5vdGFibHkgdGhlIGlkZW50aWZpZXIpIGZvciBldmVudCByZW1vdmFiaWxpdHlcbiAgZXZlbnRJRCA9IDA7XG5cblxuICAvLyAtLS0tIENsYXNzIG1ldGhvZHMgLS0tLVxuICBhZGRFdmVudCh0eXBlLCBmbiwgbmFtZSkge1xuICAgIGlmICghdGhpcy5jaGVja0V2ZW50VHlwZSh0eXBlKSkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkVycm9yKFxuICAgICAgICAnVGhlIHNwZWNpZmllZCBldmVudCB0eXBlIOKAmCcgKyB0eXBlICsgJ+KAmSBpcyBub3QgdmFsaWQuIEF2YWlsYWJsZSB0eXBlcyBhcmU6JyArIFNsaWRlcjg5LmFycmF5VG9MaXN0U3RyaW5nKFNsaWRlcjg5RXZlbnRzLmV2ZW50VHlwZXMpLFxuICAgICAgICAnYWRkRXZlbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy52YWxzLmV2ZW50c1t0eXBlXSkpIHRoaXMudmFscy5ldmVudHNbdHlwZV0gPSBuZXcgQXJyYXkoKTtcbiAgICB0aGlzLnZhbHMuZXZlbnRzW3R5cGVdLnB1c2goZm4pO1xuICAgIGNvbnN0IGtleSA9IG5hbWUgfHwgdGhpcy5ldmVudElEO1xuICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBmbjogZm5cbiAgICB9O1xuICAgIGlmIChuYW1lKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5ldmVudExpc3Rba2V5XSkpIHRoaXMuZXZlbnRMaXN0W2tleV0gPSBuZXcgQXJyYXkoKTtcbiAgICAgIHRoaXMuZXZlbnRMaXN0W2tleV0ucHVzaChvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdFtrZXldID0gb2JqO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZSB8fCB0aGlzLmV2ZW50SUQrKztcbiAgfVxuICByZW1vdmVFdmVudChrZXkpIHtcbiAgICBjb25zdCBldmVudEluZm8gPSB0aGlzLmV2ZW50TGlzdFtrZXldO1xuICAgIGlmICghZXZlbnRJbmZvKSByZXR1cm4gZmFsc2U7XG4gICAgZGVsZXRlIHRoaXMuZXZlbnRMaXN0W2tleV07XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZXZlbnRJbmZvKVxuICAgICAgPyBldmVudEluZm8ucmVkdWNlKHRoaXMuaGFuZGxlUmVtb3ZlRXZlbnQuYmluZCh0aGlzKSwgbmV3IEFycmF5KCkpXG4gICAgICA6IHRoaXMuaGFuZGxlUmVtb3ZlRXZlbnQobmV3IEFycmF5KCksIGV2ZW50SW5mbyk7XG4gIH1cblxuXG4gIC8vIC0tLS0gSGVscGVyIGZ1bmN0aW9ucyAtLS0tXG4gIGhhbmRsZVJlbW92ZUV2ZW50KGRlbGV0ZUNvbGxlY3Rpb24sIGV2ZW50SW5mbykge1xuICAgIGNvbnN0IHR5cGVFdmVudHMgPSB0aGlzLnZhbHMuZXZlbnRzW2V2ZW50SW5mby50eXBlXTtcbiAgICBjb25zdCBkZWxldGVkID0gdHlwZUV2ZW50cy5zcGxpY2UodHlwZUV2ZW50cy5pbmRleE9mKGV2ZW50SW5mby5mbiksIDEpWzBdO1xuICAgIGlmICh0eXBlRXZlbnRzLmxlbmd0aCA9PT0gMCkgZGVsZXRlIHRoaXMudmFscy5ldmVudHNbZXZlbnRJbmZvLnR5cGVdO1xuICAgIGRlbGV0ZUNvbGxlY3Rpb24ucHVzaChkZWxldGVkKTtcbiAgICByZXR1cm4gZGVsZXRlQ29sbGVjdGlvbjtcbiAgfVxuXG4gIGludm9rZUV2ZW50KHR5cGVzKSB7XG4gICAgY29uc3QgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICBhcmdzWzBdID0gdGhpcztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmdW5jdGlvbnMgPSB0aGlzLnZhbHMuZXZlbnRzW3R5cGVzW2ldXTtcbiAgICAgIGlmIChmdW5jdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBmdW5jdGlvbnMubGVuZ3RoOyBuKyspIHtcbiAgICAgICAgICBmdW5jdGlvbnNbbl0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjaGVja0V2ZW50VHlwZSh0eXBlKSB7XG4gICAgaWYgKHR5cGUuaW5kZXhPZignY2hhbmdlOicpID09PSAwKSB7XG4gICAgICAvLyBFZGdlIGNhc2UgZm9yICdjaGFuZ2U6JHByb3BlcnR5J1xuICAgICAgY29uc3QgY3VzdG9tUHJvcCA9IHR5cGUuc2xpY2UoJ2NoYW5nZTonLmxlbmd0aCk7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLnZhbHMsIGN1c3RvbVByb3ApKSB7XG4gICAgICAgIGNvbnN0IG1zZyA9XG4gICAgICAgICAgXCLigJhcIiArIHR5cGUgKyBcIuKAmSByZWZlcnMgdG8g4oCYXCIgKyBjdXN0b21Qcm9wICsgXCLigJksIHdoaWNoIGlzbid0IGEgcmVjb2duaXplZCBwcm9wZXJ0eS4gXCJcbiAgICAgICAgICArIFwiQ2hlY2sgaXRzIHNwZWxsaW5nIGFuZCBiZSBhd2FyZSB0aGF0IGN1c3RvbSBwcm9wZXJ0aWVzIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWRcIjtcbiAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkVycm9yKG1zZywgJ2FkZEV2ZW50Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChTbGlkZXI4OUV2ZW50cy5ldmVudFR5cGVzLmluZGV4T2YodHlwZSkgPT09IC0xKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBTbGlkZXI4OSBmcm9tICcuL1NsaWRlcjg5JztcbmltcG9ydCBTbGlkZXI4OUV2ZW50cyBmcm9tICcuL1NsaWRlcjg5RXZlbnRzLmpzJztcbmltcG9ydCBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlciBmcm9tICcuL1NsaWRlcjg5U3RydWN0dXJlUGFyc2VyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyODlQcm9wZXJ0aWVzIGV4dGVuZHMgU2xpZGVyODlFdmVudHMge1xuICAvLyAtLS0tLS0gT2JqZWN0IGRlZmluaXRpb24gLS0tLS0tXG4gIGRlZmluZURlZXBQcm9wZXJ0eSh0YXJnZXQsIGl0ZW0sIGVuZHBvaW50LCBwb3N0U2V0dGVyLCBpc0RlZXBEZWZpbmVkQXJyYXkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBpdGVtLCB7XG4gICAgICBzZXQ6ICh2YWwpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICB2YXIgcHJldlZhbCA9IChpc0RlZXBEZWZpbmVkQXJyYXkgPyBBcnJheS5mcm9tKHRoaXNbaXRlbV0pIDogdGhpc1tpdGVtXSk7XG4gICAgICAgIH1cbiAgICAgICAgZW5kcG9pbnRbaXRlbV0gPSB2YWw7XG4gICAgICAgIGlmIChpc0RlZXBEZWZpbmVkQXJyYXkpIHtcbiAgICAgICAgICAvLyBUaGUgZW5kcG9pbnRzIChzZWUgZG9jIGNvbW1lbnQgYXQgdGhlIHN0YXJ0IG9mIGZpbGUpIGFyZSBkZWZpbmVkIGZyb20gYm90dG9tIHRvIHRvcFxuICAgICAgICAgIC8vIFRoaXMgZW5zdXJlcyBjb21wYXRpYmlsaXR5IHdpdGggZ2V0dGVycy9zZXR0ZXJzXG4gICAgICAgICAgdGhpcy5kZWZpbmVEZWVwQXJyYXlJbnRlcm1lZGlhdGVWYWxzKGl0ZW0sIHZhbCk7XG4gICAgICAgICAgdGhpcy5kZWZpbmVEZWVwQXJyYXlJbnRlcm1lZGlhdGVUaGlzKGl0ZW0sIHZhbCwgdGhpcy5wcm9wZXJ0aWVzW2l0ZW1dLmtleVNldHRlciwgdGhpcy5wcm9wZXJ0aWVzW2l0ZW1dLmtleUdldHRlcik7XG4gICAgICAgICAgdGhpcy5oYW5kbGVJbnRlcm5hbERlZXBBcnJheUNoYW5nZShpdGVtLCBwcmV2VmFsLCB2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaGFuZGxlSW50ZXJuYWxQcm9wZXJ0eUNoYW5nZShpdGVtLCBwcmV2VmFsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9zdFNldHRlcikge1xuICAgICAgICAgIHBvc3RTZXR0ZXIodmFsLCBwcmV2VmFsKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gKGlzRGVlcERlZmluZWRBcnJheSA/IHRoaXMudmFscy4kaW50ZXJtZWRpYXRlVmFscyA6IGVuZHBvaW50KVtpdGVtXTtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICAvLyAtLS0tLS0gT2JqZWN0IGRlZmluaXRpb25zIGZvciB0aGUga2V5cy9pbmRleGVzIG9mIGRlZXBseSBkZWZpbmVkIGFycmF5cyAtLS0tLS1cbiAgZGVmaW5lRGVlcEFycmF5SW50ZXJtZWRpYXRlVGhpcyhwYXJlbnRJdGVtLCBwYXJlbnRWYWx1ZSwga2V5U2V0dGVyLCBrZXlHZXR0ZXIpIHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMudmFscztcblxuICAgIHRoaXMudmFscy4kaW50ZXJtZWRpYXRlVGhpc1twYXJlbnRJdGVtXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50VmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyZW50VmFsdWVbaV07XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnZhbHMuJGludGVybWVkaWF0ZVRoaXNbcGFyZW50SXRlbV0sIGksIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICBpZiAoIWtleVNldHRlciB8fCAha2V5U2V0dGVyKHZhbCwgaSkpIHtcbiAgICAgICAgICAgIGVuZHBvaW50W3BhcmVudEl0ZW1dW2ldID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gKGtleUdldHRlciA/IGtleUdldHRlcihlbmRwb2ludFtwYXJlbnRJdGVtXVtpXSwgaSkgOiBlbmRwb2ludFtwYXJlbnRJdGVtXVtpXSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgLy8gVGhpcyBhc3NpZ25tZW50IGlzIG5lY2Vzc2FyeSB0byBpbnZva2UgYSBwb3RlbnRpYWwga2V5U2V0dGVyIChlLmcuIGZyb20gYHZhbHVlc2ApXG4gICAgICB0aGlzLnZhbHMuJGludGVybWVkaWF0ZVRoaXNbcGFyZW50SXRlbV1baV0gPSBwYXJlbnRWYWx1ZVtpXTtcbiAgICB9XG4gIH1cbiAgZGVmaW5lRGVlcEFycmF5SW50ZXJtZWRpYXRlVmFscyhwYXJlbnRJdGVtLCBwYXJlbnRWYWx1ZSkge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy52YWxzLiQ7XG5cbiAgICB0aGlzLnZhbHMuJGludGVybWVkaWF0ZVZhbHNbcGFyZW50SXRlbV0gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcmVudFZhbHVlW2ldO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy52YWxzLiRpbnRlcm1lZGlhdGVWYWxzW3BhcmVudEl0ZW1dLCBpLCB7XG4gICAgICAgIHNldDogKHZhbCkgPT4ge1xuICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgICB2YXIgcHJldlZhbCA9IEFycmF5LmZyb20odGhpc1twYXJlbnRJdGVtXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVuZHBvaW50W3BhcmVudEl0ZW1dW2ldID0gdmFsO1xuICAgICAgICAgIHRoaXMuaGFuZGxlSW50ZXJuYWxEZWVwQXJyYXlDaGFuZ2UocGFyZW50SXRlbSwgcHJldlZhbCwgbnVsbCwgaSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBlbmRwb2ludFtwYXJlbnRJdGVtXVtpXTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cblxuICAvLyAtLS0tLS0gUHJvcGVydHkgY2hhbmdlIHRyYWNraW5nIC0tLS0tLVxuICAvLyBgdGhhdGAgaXRlbXMgYXJlIGNvbXBhcmVkIHRvIGFjY29tb2RhdGUgZm9yIGdldHRlcnMgKGUuZy4gYHZhbHVlYCAocHJlY2lzaW9uKSlcbiAgaGFuZGxlSW50ZXJuYWxQcm9wZXJ0eUNoYW5nZShpdGVtLCBwcmV2VmFsKSB7XG4gICAgLy8gT2JqZWN0IHR5cGVzIChhcnJheXMgaW5jbHVkZWQpIGFsd2F5cyBpbnZva2UgYSB2YXJpYWJsZSB1cGRhdGVcbiAgICAvLyBkdWUgdG8gaW5hYmlsaXR5IHRvIGRlZXBseSBjb21wYXJlIHRoZW0gKGVmZmljaWVudGx5KVxuICAgIGlmICghdGhpcy5pbml0aWFsICYmICh0eXBlb2YgdGhpc1tpdGVtXSA9PT0gJ29iamVjdCcgfHwgcHJldlZhbCAhPT0gdGhpc1tpdGVtXSkpIHtcbiAgICAgIHRoaXMudXBkYXRlUG90ZW50aWFsU3RydWN0dXJlVmFyKGl0ZW0pO1xuICAgICAgdGhpcy5pbnZva2VFdmVudChbJ2NoYW5nZTonICsgaXRlbV0sIHByZXZWYWwpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVJbnRlcm5hbERlZXBBcnJheUNoYW5nZShpdGVtLCBwcmV2VmFsLCB2YWwsIGRlZXBEZWZpbmVkSW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgdGhpcy51cGRhdGVQb3RlbnRpYWxTdHJ1Y3R1cmVWYXIoaXRlbSk7XG4gICAgICBpZiAoZGVlcERlZmluZWRJbmRleCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuaW52b2tlRGVlcEFycmF5Q2hhbmdlRXZlbnQoaXRlbSwgcHJldlZhbCwgZGVlcERlZmluZWRJbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuaW52b2tlRGVlcEFycmF5Q2hhbmdlRXZlbnQoaXRlbSwgcHJldlZhbCwgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbnZva2VEZWVwQXJyYXlDaGFuZ2VFdmVudChpdGVtLCBwcmV2VmFsLCBkZWVwRGVmaW5lZEluZGV4KSB7XG4gICAgaWYgKHByZXZWYWxbZGVlcERlZmluZWRJbmRleF0gIT09IHRoaXNbaXRlbV1bZGVlcERlZmluZWRJbmRleF0pIHtcbiAgICAgIHRoaXMuaW52b2tlRXZlbnQoWydjaGFuZ2U6JyArIGl0ZW1dLCBwcmV2VmFsLCBkZWVwRGVmaW5lZEluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIFN0cnVjdHVyZSB2YXJpYWJsZXMgLS0tLVxuICB1cGRhdGVQb3RlbnRpYWxTdHJ1Y3R1cmVWYXIocHJvcE5hbWUpIHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmRvbUJ1aWxkZXIuc3RydWN0dXJlVmFycywgcHJvcE5hbWUpKSByZXR1cm47XG5cbiAgICBmb3IgKGNvbnN0IFsgc3RyLCBub2RlTGlzdCBdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuZG9tQnVpbGRlci5zdHJ1Y3R1cmVWYXJzW3Byb3BOYW1lXSkpIHtcbiAgICAgIHRoaXMucmVwbGFjZVN0cnVjdHVyZVZhclN0cmluZ0luTm9kZXMoc3RyLCBub2RlTGlzdCk7XG4gICAgfVxuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5zcGVjaWFsVmFyaWFibGVQcm94eSwgcHJvcE5hbWUpKSB7XG4gICAgICBmb3IgKGNvbnN0IHZhck5hbWUgb2YgU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIuc3BlY2lhbFZhcmlhYmxlUHJveHlbcHJvcE5hbWVdKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUG90ZW50aWFsU3RydWN0dXJlVmFyKHZhck5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlcGxhY2VTdHJ1Y3R1cmVWYXJTdHJpbmdJbk5vZGVzKHN0ciwgbm9kZUxpc3QpIHtcbiAgICBmb3IgKGNvbnN0IFsgZWxlbWVudCwgbm9kZSwgYmFzZU5hbWUgXSBvZiB0aGlzLml0ZXJhdGVTdHJ1Y3R1cmVWYXJOb2RlTGlzdChub2RlTGlzdCkpIHtcbiAgICAgIG5vZGUudGV4dENvbnRlbnQgPVxuICAgICAgICBzdHIucmVwbGFjZShTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5yZWdleC52YXJpYWJsZSwgKG1hdGNoLCB2YXJpYWJsZURlbGltaXQsIHZhcmlhYmxlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWVGcm9tU3RydWN0dXJlVmFyKHZhcmlhYmxlRGVsaW1pdCB8fCB2YXJpYWJsZSwgZWxlbWVudCwgYmFzZU5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAqaXRlcmF0ZVN0cnVjdHVyZVZhck5vZGVMaXN0KG5vZGVMaXN0KSB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVMaXN0KSB7XG4gICAgICAvLyBTcGVjaWFsIGNhc2U6IEl0ZXJhdGUgb3ZlciBldmVyeSB0aHVtYlxuICAgICAgY29uc3QgYmFzZU5hbWUgPSB0aGlzLmRvbUJ1aWxkZXIubm9kZUhhc0Jhc2VFbGVtZW50T3duZXIobm9kZSk7XG4gICAgICBpZiAoYmFzZU5hbWUpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLnZhbHMubm9kZVtiYXNlTmFtZV07XG5cbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuQVRUUklCVVRFX05PREUpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIHlpZWxkIFsgZWxlbWVudCwgZWxlbWVudC5nZXRBdHRyaWJ1dGVOb2RlKG5vZGUubmFtZSksIGJhc2VOYW1lIF07XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIC8vIFRoZSB0ZXh0IG5vZGUgaXMgYWx3YXlzIHRoZSBmaXJzdCBjaGlsZFxuICAgICAgICAgICAgeWllbGQgWyBlbGVtZW50LCBlbGVtZW50LmNoaWxkTm9kZXNbMF0sIGJhc2VOYW1lIF07XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLmdldE5vZGVPd25lcihub2RlKTtcbiAgICAgICAgeWllbGQgWyBlbGVtZW50LCBub2RlLCBiYXNlTmFtZSBdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFZhbHVlRnJvbVN0cnVjdHVyZVZhcih2YXJOYW1lLCBub2RlLCBiYXNlTmFtZSkge1xuICAgIGNvbnN0IHJlY3Vyc2l2ZVZhciA9IHZhck5hbWUuc3BsaXQoJy4nKTtcbiAgICBsZXQgdmFsdWU7XG4gICAgaWYgKHJlY3Vyc2l2ZVZhclswXSBpbiBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5zcGVjaWFsVmFyaWFibGVzKSB7XG4gICAgICB2YWx1ZSA9IFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnNwZWNpYWxWYXJpYWJsZXNbcmVjdXJzaXZlVmFyWzBdXS5nZXR0ZXIobm9kZSwgdGhpcywgYmFzZU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXNbcmVjdXJzaXZlVmFyWzBdXTtcbiAgICB9XG4gICAgaWYgKHJlY3Vyc2l2ZVZhci5sZW5ndGggPiAxKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHJlY3Vyc2l2ZVZhci5sZW5ndGg7IGkrKykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWVbcmVjdXJzaXZlVmFyW2ldXTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVFcnJvcihcIlZhcmlhYmxlIOKAmFwiICsgdmFyTmFtZSArIFwi4oCZIGNhbm5vdCBhY2Nlc3MgcHJvcGVydHkg4oCYXCIgKyByZWN1cnNpdmVWYXJbaV0gKyBcIuKAmSBvbiBcIiArIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBTbGlkZXI4OSBmcm9tICcuL1NsaWRlcjg5JztcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTcGVjaWFsVmFyaWFibGVEYXRhXG4gKiBAcHJvcCB7IChub2RlOiBIVE1MRWxlbWVudCwgc2xpZGVyPzogU2xpZGVyODksIGJhc2VOYW1lPzogc3RyaW5nIHwgZmFsc2UpID0+IGFueSB9IGdldHRlclxuICogQHByb3AgeyBib29sZWFuIH0gW3RodW1iT25seV0gV2hldGhlciB0aGUgdmFyaWFibGUgc2hvdWxkIG9ubHkgYmUgYXZhaWxhYmxlIGluIDx0aHVtYj4gYW5kIGl0cyBjaGlsZHJlbi5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlciB7XG4gIC8qKlxuICAgKiBTcGVjaWFsIHZhcmlhYmxlcyBpbnNpZGUgdGhlIHN0cnVjdHVyZSBzeXN0ZW0uXG4gICAqIEluc3RlYWQgb2YgYmVpbmcgbGlua2VkIHRvIHByb3BlcnRpZXMsIHRoZXNlIGNhbiBjYWxsIGFyYml0cmFyeSBmdW5jdGlvbnMuXG4gICAqIEB0eXBlIHsgUmVjb3JkPHN0cmluZywgU3BlY2lhbFZhcmlhYmxlRGF0YT4gIH1cbiAgICovXG4gIHN0YXRpYyBzcGVjaWFsVmFyaWFibGVzID0ge1xuICAgIHRhZ19ub2RlOiB7XG4gICAgICBnZXR0ZXI6IG5vZGUgPT4gbm9kZVxuICAgIH0sXG4gICAgdGh1bWJfaW5kZXg6IHtcbiAgICAgIHRodW1iT25seTogdHJ1ZSxcbiAgICAgIGdldHRlcjogKG5vZGUsIHNsaWRlciwgYmFzZU5hbWUpID0+IHNsaWRlci5ub2RlW2Jhc2VOYW1lXS5pbmRleE9mKG5vZGUpXG4gICAgfSxcbiAgICB0aHVtYl92YWx1ZToge1xuICAgICAgdGh1bWJPbmx5OiB0cnVlLFxuICAgICAgZ2V0dGVyOiAobm9kZSwgc2xpZGVyLCBiYXNlTmFtZSkgPT4gc2xpZGVyLnZhbHVlc1tzbGlkZXIubm9kZVtiYXNlTmFtZV0uaW5kZXhPZihub2RlKV1cbiAgICB9LFxuICB9O1xuICAvKipcbiAgICogTGlua3Mge0BsaW5rIHNwZWNpYWxWYXJpYWJsZXN9IHRvIHBvdGVudGlhbCBzbGlkZXIgcHJvcGVydGllcyB0aGV5IGRlcGVuZCBvbixcbiAgICogc28gdGhhdCB0aGUgc3BlY2lhbCB2YXJpYWJsZXMgZ2V0IHVwZGF0ZWQgd2hlbiB0aGUgcHJvcGVydHkgdXBkYXRlcy5cbiAgICogQHR5cGUgeyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gfVxuICAgKi9cbiAgc3RhdGljIHNwZWNpYWxWYXJpYWJsZVByb3h5ID0ge1xuICAgIHZhbHVlczogWyAndGh1bWJfaW5kZXgnLCAndGh1bWJfdmFsdWUnIF1cbiAgfTtcblxuICAvLyBTdGF0aWMgaW5pdGlhbGl6YXRpb24gYmxvY2tzIGRvbid0IHdvcmsgd2l0aCBteSBjdXJyZW50IHdvcmtmbG93XG4gIHN0YXRpYyByZWdleCA9IChmdW5jdGlvbigpIHtcbiAgICBjb25zdCByZWcgPSB7XG4gICAgICBhdHRyOiB7XG4gICAgICAgIG5hbWU6ICdbXFxcXHctXSsnXG4gICAgICB9LFxuICAgICAgYWxsOiAnW1xcXFxkXFxcXERdJyxcbiAgICAgIGNhcE5hbWU6ICcoW1xcXFx3LV0rKScsXG4gICAgfTtcbiAgICByZWcuYXR0ci52YWx1ZSA9ICcoPzooPyE8KScgKyByZWcuYWxsICsgJykqPyc7XG4gICAgcmVnLnRhZ1R5cGUgPSAnKD86XFxcXHMrJyArIHJlZy5jYXBOYW1lICsgJyk/JztcbiAgICByZWcuY29udGVudCA9ICcoPzpcXFxccytcIignICsgcmVnLmFsbCArICcrPylcIik/JztcbiAgICByZWcuYXR0cmlicyA9ICcoPzpcXFxccysnICsgcmVnLmF0dHIubmFtZSArICc9XFxcXFsnICsgcmVnLmF0dHIudmFsdWUgKyAnXFxcXF0pKic7XG4gICAgcmVnLnZhckNvbnRlbnQgPSAnXFxcXCQoKD86XFxcXHcrKD86XFxcXC4oPz1cXFxcdykpPykrKSc7XG5cbiAgICBjb25zdCByZ3ggPSB7XG4gICAgICB2YXJpYWJsZTogJ1xcXFx7JyArIHJlZy52YXJDb250ZW50ICsgJ1xcXFx9fCcgKyByZWcudmFyQ29udGVudCxcbiAgICAgIGF0dHJpYnV0ZXM6ICcoJyArIHJlZy5hdHRyLm5hbWUgKyAnKT1cXFxcWygnICsgcmVnLmF0dHIudmFsdWUgKyAnKVxcXFxdKD86XFxcXHMrfCQpJyxcbiAgICAgIHRhZzogJzwoWy86XSk/JyArIHJlZy5jYXBOYW1lICsgcmVnLnRhZ1R5cGUgKyByZWcuY29udGVudCArICcoJyArIHJlZy5hdHRyaWJzICsgJylcXFxccyo/PlxcXFxzKidcbiAgICB9O1xuXG4gICAgY29uc3QgZmluYWxFeHByZXNzaW9ucyA9IHt9O1xuICAgIC8vIEVTNSBjYW4ndCBgbmV3IFJlZ0V4cGAgZnJvbSBhbm90aGVyIFJlZ0V4cFxuICAgIGZvciAobGV0IGV4cHIgaW4gcmd4KSB7XG4gICAgICBmaW5hbEV4cHJlc3Npb25zW2V4cHJdID0gbmV3IFJlZ0V4cChyZ3hbZXhwcl0sICdnJyk7XG4gICAgfVxuICAgIGZpbmFsRXhwcmVzc2lvbnMudmFyaWFibGVOb0ZsYWcgPSBuZXcgUmVnRXhwKHJneC52YXJpYWJsZSk7XG5cbiAgICByZXR1cm4gZmluYWxFeHByZXNzaW9ucztcbiAgfSgpKTtcblxuXG4gIC8vIC0tLS0gUHJvcGVydGllcyAtLS0tXG4gIHN0cnVjdHVyZVZhcnMgPSB7fTtcbiAgdGh1bWJDaGlsZHJlbiA9IFtdO1xuXG4gIHZhbHM7XG5cblxuICBjb25zdHJ1Y3Rvcih2YWxzKSB7XG4gICAgdGhpcy52YWxzID0gdmFscztcbiAgfVxuXG5cbiAgLy8gLS0tLSBTdHJ1Y3R1cmUgcGFyc2VyIC0tLS1cbiAgcGFyc2VTdHJ1Y3R1cmUoc3RydWN0dXJlU3RyKSB7XG4gICAgY29uc3Qgbm9kZSA9IHtcbiAgICAgIHNsaWRlcjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB9O1xuXG4gICAgc3RydWN0dXJlU3RyID0gc3RydWN0dXJlU3RyLnRyaW0oKTtcblxuICAgIC8vIFJlc2V0IHRoZSBnbG9iYWwgUmVnRXhwLWludGVybmFsIGBsYXN0SW5kZXhgIGZsYWdcbiAgICAvLyBUaGlzIHdvdWxkIG90aGVyd2lzZSBjbGFzaCB3aXRoIG11bHRpcGxlIHNsaWRlciBpbnN0YW5jZXMsIGJlY2F1c2UgdGhlIHJlZ2V4ZXMgYXJlIGdsb2JhbFxuICAgIGZvciAoY29uc3QgcmVnZXhwTmFtZSBpbiBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5yZWdleCkge1xuICAgICAgaWYgKFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnJlZ2V4W3JlZ2V4cE5hbWVdLmdsb2JhbCkge1xuICAgICAgICBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5yZWdleFtyZWdleHBOYW1lXS5sYXN0SW5kZXggPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN0YWNrID0gW107XG4gICAgbGV0IGN1cnJlbnRJbmRleCA9IDA7XG4gICAgbGV0IG1hdGNoO1xuICAgIC8vIG1hdGNoOiBbbWF0Y2hlZFN0ciwgdHlwZSwgbmFtZSwgdGFnLCBpbm5lckNvbnRlbnQsIGF0dHJpYnV0ZXNdXG4gICAgd2hpbGUgKG1hdGNoID0gU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIucmVnZXgudGFnLmV4ZWMoc3RydWN0dXJlU3RyKSkge1xuICAgICAgaWYgKG1hdGNoLmluZGV4ICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgY29uc3QgYmVmb3JlRmFpbHVyZSA9ICd0YWcg4oCYPCcgKyAobWF0Y2hbMV0gfHwgJycpICsgbWF0Y2hbMl0gKyAnPuKAmSc7XG4gICAgICAgIGNvbnN0IHBvaW50T2ZGYWlsdXJlID0gc3RydWN0dXJlU3RyLnNsaWNlKGN1cnJlbnRJbmRleCwgbWF0Y2guaW5kZXgpLnRyaW0oKTtcbiAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlN0cnVjdHVyZVBhcnNlRXJyb3IoYmVmb3JlRmFpbHVyZSwgcG9pbnRPZkZhaWx1cmUpO1xuICAgICAgfVxuICAgICAgY3VycmVudEluZGV4ID0gU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIucmVnZXgudGFnLmxhc3RJbmRleDtcblxuICAgICAgaWYgKG1hdGNoWzFdICE9PSAnLycpIHtcbiAgICAgICAgY29uc3QgbGFzdE5hbWUgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXSB8fCAnc2xpZGVyJztcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuYXNzZW1ibGVFbGVtZW50KG5vZGUsIG1hdGNoWzJdLCBzdGFjaywgbWF0Y2hbM10sIG1hdGNoWzRdLCBtYXRjaFs1XSk7XG4gICAgICAgIG5vZGVbbWF0Y2hbMl1dID0gZWxlbWVudDtcbiAgICAgICAgbm9kZVtsYXN0TmFtZV0uYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICAgICAgLy8gVGhpcyBkZXRlY3RzIHRodW1iIGNoaWxkcmVuIChCZWNhdXNlIGl0J3MgY2FsbGVkIEJFRk9SRSAndGh1bWInIGlzIHB1c2hlZCBvbnRvIHRoZSBzdGFjaylcbiAgICAgICAgaWYgKHN0YWNrLmluY2x1ZGVzKCd0aHVtYicpKSB7XG4gICAgICAgICAgdGhpcy50aHVtYkNoaWxkcmVuLnB1c2gobWF0Y2hbMl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1hdGNoWzFdID09IG51bGwpIHtcbiAgICAgICAgICBzdGFjay5wdXNoKG1hdGNoWzJdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW0gPSBzdGFjay5wb3AoKTtcbiAgICAgICAgaWYgKGxhc3RJdGVtICE9PSBtYXRjaFsyXSkge1xuICAgICAgICAgIGlmIChzdGFjay5pbmRleE9mKG1hdGNoWzJdKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2luZ1RhZ0Vycm9yKGxhc3RJdGVtKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlN0cnVjdHVyZUVycm9yKFxuICAgICAgICAgICAgICBcIlRoZSBjbG9zaW5nIHRhZyDigJg8L1wiICsgbWF0Y2hbMl0gKyBcIj7igJkgY291bGRuJ3QgZmluZCBhIG1hdGNoaW5nIG9wZW5pbmcgdGFnXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjdXJyZW50SW5kZXggIT09IHN0cnVjdHVyZVN0ci5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVQYXJzZUVycm9yKCdlbmQgb2Ygc3RyaW5nJywgc3RydWN0dXJlU3RyLnNsaWNlKGN1cnJlbnRJbmRleCkpO1xuICAgIH1cbiAgICBpZiAoc3RhY2subGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlN0cnVjdHVyZUVycm9yKFxuICAgICAgICBcIkNvdWxkbid0IGZpbmQgYSBtYXRjaGluZyBjbG9zaW5nIHRhZyBmb3IgZm9sbG93aW5nIGVsZW1lbnRzOlwiICsgU2xpZGVyODkuYXJyYXlUb0xpc3RTdHJpbmcoc3RhY2spKTtcbiAgICB9IGVsc2UgaWYgKHN0YWNrLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5jbG9zaW5nVGFnRXJyb3Ioc3RhY2tbMF0pO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgYXNzZW1ibGVFbGVtZW50KG5vZGUsIG5hbWUsIG5hbWVTdGFjaywgdGFnLCBjb250ZW50LCBhdHRyaWJ1dGVzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLCBuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlN0cnVjdHVyZUVycm9yKFxuICAgICAgICAnRXZlcnkgZWxlbWVudCBtdXN0IGhhdmUgYSB1bmlxdWUgbmFtZSBidXQgdGhlcmUgYXJlIG11dGlwbGUgZWxlbWVudHMgY2FsbGVkIOKAmCcgKyBuYW1lICsgJ+KAmScpO1xuICAgIH1cbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcgfHwgJ2RpdicpO1xuXG4gICAgaWYgKGNvbnRlbnQgIT0gbnVsbCkge1xuICAgICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjb250ZW50KTtcbiAgICAgIHRleHROb2RlLnRleHRDb250ZW50ID0gY29udGVudDtcbiAgICAgIGVsZW0uYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuXG4gICAgICBpZiAoU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIuc3RyaW5nSGFzVmFyaWFibGUoY29udGVudCkpIHtcbiAgICAgICAgdGhpcy5wYXJzZVZhcmlhYmxlcyhjb250ZW50LCB0ZXh0Tm9kZSwgbmFtZSwgbmFtZVN0YWNrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgbGV0IG1hdGNoO1xuICAgICAgd2hpbGUgKG1hdGNoID0gU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIucmVnZXguYXR0cmlidXRlcy5leGVjKGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYk5hbWUgPSBtYXRjaFsxXTtcbiAgICAgICAgY29uc3QgYXR0cmliVmFsdWUgPSBtYXRjaFsyXTtcblxuICAgICAgICBjb25zdCBhdHRyaWJOb2RlID0gZG9jdW1lbnQuY3JlYXRlQXR0cmlidXRlKGF0dHJpYk5hbWUpO1xuICAgICAgICBhdHRyaWJOb2RlLnRleHRDb250ZW50ID0gYXR0cmliVmFsdWU7XG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlTm9kZShhdHRyaWJOb2RlKTtcblxuICAgICAgICBpZiAoU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIuc3RyaW5nSGFzVmFyaWFibGUoYXR0cmliVmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5wYXJzZVZhcmlhYmxlcyhhdHRyaWJWYWx1ZSwgYXR0cmliTm9kZSwgbmFtZSwgbmFtZVN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtO1xuICB9XG5cbiAgLy8gLS0tLSBTdHJ1Y3R1cmUgdmFyaWFibGVzIHJlZ2lzdGVyIC0tLS1cbiAgcGFyc2VWYXJpYWJsZXMoc3RyLCB0YXJnZXROb2RlLCB0YWdOYW1lLCB0YWdOYW1lU3RhY2spIHtcbiAgICAvLyBNZW1vcml6ZSAmIHNraXAgYWxyZWFkeSBoYW5kbGVkIHZhcmlhYmxlcyBmb3IgdGhlIGN1cnJlbnQgc3RyaW5nXG4gICAgY29uc3QgcHJvcE5hbWVDYWNoZSA9IG5ldyBBcnJheSgpO1xuICAgIGxldCBtYXRjaDtcbiAgICB3aGlsZSAobWF0Y2ggPSBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5yZWdleC52YXJpYWJsZS5leGVjKHN0cikpIHtcbiAgICAgIGNvbnN0IHZhck5hbWUgPSBtYXRjaFsxXSB8fCBtYXRjaFsyXTtcbiAgICAgIGNvbnN0IHByb3BOYW1lID0gdmFyTmFtZS5pbmRleE9mKCcuJykgIT09IC0xXG4gICAgICAgID8gdmFyTmFtZS5zbGljZSgwLCB2YXJOYW1lLmluZGV4T2YoJy4nKSlcbiAgICAgICAgOiB2YXJOYW1lO1xuXG4gICAgICBpZiAoIXByb3BOYW1lQ2FjaGUuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMudmFscywgcHJvcE5hbWUpXG4gICAgICAgICAgICAmJiAhU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIuY2hlY2tGb3JTcGVjaWFsVmFyaWFibGVzKHByb3BOYW1lLCB0YWdOYW1lLCB0YWdOYW1lU3RhY2spXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVFcnJvcihcbiAgICAgICAgICAgIFwi4oCYXCIgKyBwcm9wTmFtZSArIFwi4oCZIGlzIG5vdCBhIHJlY29nbml6ZWQgcHJvcGVydHkgYW5kIGNhbm5vdCBiZSB1c2VkIGFzIHZhcmlhYmxlLiBQbGVhc2UgY2hlY2sgaXRzIHNwZWxsaW5nIG9yIGluaXRpYWxpemUgaXQgaW4gdGhlIGNvbnN0cnVjdG9yXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlclZhcmlhYmxlKHByb3BOYW1lLCBzdHIsIHRhcmdldE5vZGUpO1xuXG4gICAgICAgIHByb3BOYW1lQ2FjaGUucHVzaChwcm9wTmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJWYXJpYWJsZShwcm9wTmFtZSwgc3RyLCB0YXJnZXROb2RlKSB7XG4gICAgaWYgKHRoaXMuc3RydWN0dXJlVmFyc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgdGhpcy5zdHJ1Y3R1cmVWYXJzW3Byb3BOYW1lXSA9IHt9XG4gICAgfVxuICAgIGlmICh0aGlzLnN0cnVjdHVyZVZhcnNbcHJvcE5hbWVdW3N0cl0gPT0gbnVsbCkge1xuICAgICAgdGhpcy5zdHJ1Y3R1cmVWYXJzW3Byb3BOYW1lXVtzdHJdID0gbmV3IEFycmF5KCk7XG4gICAgfVxuICAgIHRoaXMuc3RydWN0dXJlVmFyc1twcm9wTmFtZV1bc3RyXS5wdXNoKHRhcmdldE5vZGUpO1xuICB9XG5cblxuICAvLyAtLS0tIEVycm9yIGhlbHBlcnMgLS0tLVxuICBjbG9zaW5nVGFnRXJyb3IodGFnTmFtZSkge1xuICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVFcnJvcihcbiAgICAgIFwiQ291bGRuJ3QgZmluZCBhIGNsb3NpbmcgdGFnIGZvciB0aGUgZWxlbWVudCDigJg8XCIgKyB0YWdOYW1lICsgXCI+4oCZIChTaG91bGQgaXQgYmUgYSBzZWxmLWNsb3NpbmcgdGFnIG1hcmtlZCB3aXRoIOKAmDrigJk/KVwiKTtcbiAgfVxuXG5cbiAgLy8gLS0tLSBTdGF0aWMgaGVscGVycyAtLS0tXG4gIHN0YXRpYyBnZXROb2RlT3duZXIobm9kZSkge1xuICAgIHJldHVybiBub2RlLm93bmVyRWxlbWVudCB8fCBub2RlLnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICBzdGF0aWMgc3RyaW5nSGFzVmFyaWFibGUoc3RyKSB7XG4gICAgLy8gTmVlZCB0byB1c2UgYSBSZWdFeHAgd2l0aG91dCAvZy8gYmVjYXVzZSB0aGUgaW50ZXJuYWwgYGxhc3RJbmRleGAgbXVzdG4ndCBiZSBhZHZhbmNlZCBieSBhIG1lcmUgdGVzdFxuICAgIHJldHVybiBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5yZWdleC52YXJpYWJsZU5vRmxhZy50ZXN0KHN0cik7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tGb3JTcGVjaWFsVmFyaWFibGVzKHZhck5hbWUsIHRhZ05hbWUsIHRhZ05hbWVTdGFjaykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIuc3BlY2lhbFZhcmlhYmxlcywgdmFyTmFtZSkpIHtcbiAgICAgIGNvbnN0IHZhckRhdGEgPSBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5zcGVjaWFsVmFyaWFibGVzW3Zhck5hbWVdO1xuICAgICAgaWYgKHZhckRhdGEudGh1bWJPbmx5ICYmIHRhZ05hbWUgIT09ICd0aHVtYicgJiYgIXRhZ05hbWVTdGFjay5pbmNsdWRlcygndGh1bWInKSkge1xuICAgICAgICB0aHJvdyBuZXcgU2xpZGVyODkuU3RydWN0dXJlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgdmFyaWFibGUg4oCYJFwiICsgdmFyTmFtZSArIFwi4oCZIG1heSBvbmx5IGJlIHVzZWQgaW5zaWRlIHRoZSDigJg8dGh1bWI+4oCZIHRhZyBhbmQgaXRzIGNoaWxkcmVuIFwiXG4gICAgICAgICAgKyBcIihJdCB3YXMgZm91bmQgaW4g4oCYPFwiICsgdGFnTmFtZVN0YWNrW3RhZ05hbWVTdGFjay5sZW5ndGggLSAxXSArIFwiPuKAmSlcIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iLCJcbiAgICBtb2R1bGUuZXhwb3J0cyA9ICcuc2w4OS10cmFja3twb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoyMDBweDtoZWlnaHQ6MjVweDtiYWNrZ3JvdW5kLWNvbG9yOmhzbCgwLDAlLDE4JSk7fS5zbGlkZXI4OS52ZXJ0aWNhbCAuc2w4OS10cmFja3toZWlnaHQ6MjAwcHg7d2lkdGg6MjVweDt9LnNsODktdGh1bWJ7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTZweDtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOmhzbCgwLDAlLDI4JSk7Y3Vyc29yOnBvaW50ZXI7fS5zbGlkZXI4OS52ZXJ0aWNhbCAuc2w4OS10aHVtYntoZWlnaHQ6MTZweDt3aWR0aDoxMDAlO30uc2w4OS1ub3NlbGVjdHstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7cG9pbnRlci1ldmVudHM6bm9uZTt9J1xuICAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IExpYnJhcnlUeXBlQ2hlY2sgZnJvbSAnLi9MaWJyYXJ5VHlwZUNoZWNrLmpzJztcbmltcG9ydCBTbGlkZXI4OURPTSBmcm9tICcuL1NsaWRlcjg5RE9NLmpzJztcbmltcG9ydCBTbGlkZXI4OURPTUJ1aWxkZXIgZnJvbSAnLi9TbGlkZXI4OURPTUJ1aWxkZXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXI4OSBleHRlbmRzIFNsaWRlcjg5RE9NIHtcbiAgcmFuZ2U6IFsgbnVtYmVyLCBudW1iZXIgXTtcbiAgdmFsdWVzOiBudW1iZXJbXTtcbiAgdmFsdWU6IG51bWJlcjtcbiAgcHJlY2lzaW9uOiBudW1iZXIgfCBmYWxzZTtcbiAgc3RlcDogbnVtYmVyIHwgZmFsc2U7XG4gIHN0cnVjdHVyZTogc3RyaW5nIHwgZmFsc2U7XG4gIG5vZGU6IE9iamVjdDtcbiAgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCc7XG4gIGNsYXNzTGlzdDogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+IHwgZmFsc2U7XG4gIGV2ZW50czogUmVjb3JkPHN0cmluZywgRnVuY3Rpb25bXT4gfCBmYWxzZTtcblxuICBtZXRob2RzID0ge1xuICAgIGFkZEV2ZW50OiB7XG4gICAgICBmdW5jdGlvbjogdGhpcy5hZGRFdmVudCxcbiAgICB9LFxuICAgIHJlbW92ZUV2ZW50OiB7XG4gICAgICBmdW5jdGlvbjogdGhpcy5yZW1vdmVFdmVudCxcbiAgICB9XG4gIH07XG5cbiAgcHJvcGVydGllcyA9IHtcbiAgICByYW5nZToge1xuICAgICAgZGVmYXVsdDogWzAsIDEwMF0sXG4gICAgICBzZXR0ZXI6ICh2YWwpID0+IHtcbiAgICAgICAgaWYgKHZhbFswXSA9PT0gdmFsWzFdKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlByb3BlcnR5RXJyb3IodGhpcywgJ3JhbmdlJyxcbiAgICAgICAgICAgICdUaGUgZ2l2ZW4gcmFuZ2Ugb2YgWycgKyB2YWwuam9pbignLCAnKSArICddIGRlZmluZXMgdGhlIHNhbWUgdmFsdWUgZm9yIGJvdGggcmFuZ2Ugc3RhcnQgYW5kIGVuZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgdGhpcy5hcHBseUFsbFJhdGlvRGlzdGFuY2VzKHsgcmFuZ2U6IHZhbCB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGtleVNldHRlcjogKHZhbCwga2V5KSA9PiB7XG4gICAgICAgIC8vIENvbXBhcmUgYHZhbGAgd2l0aCB0aGUgdmFsdWUgYXQgdGhlIG90aGVyIGtleSAoMCBvciAxKVxuICAgICAgICBpZiAodmFsID09PSB0aGlzLnZhbHMucmFuZ2VbTWF0aC5hYnMoa2V5IC0gMSldKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlByb3BlcnR5RXJyb3IodGhpcywgJ3JhbmdlJyxcbiAgICAgICAgICAgICdUaGUgbmV3IHJhbmdlIG9mIFsnICsgdmFsICsgJywgJyArIHZhbCArICddIGRlZmluZXMgdGhlIHNhbWUgdmFsdWUgZm9yIGJvdGggcmFuZ2Ugc3RhcnQgYW5kIGVuZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgY29uc3QgbmV3UmFuZ2UgPSBBcnJheS5mcm9tKHRoaXMudmFscy5yYW5nZSk7XG4gICAgICAgICAgbmV3UmFuZ2Vba2V5XSA9IHZhbDtcbiAgICAgICAgICB0aGlzLmFwcGx5QWxsUmF0aW9EaXN0YW5jZXMoeyByYW5nZTogbmV3UmFuZ2UgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHZhbHVlczoge1xuICAgICAgZGVmYXVsdDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gW3RoaXMudmFscy5yYW5nZVswXV07XG4gICAgICB9LFxuICAgICAgc2V0dGVyOiAodmFsKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgLy8gQWRkL3JlbW92ZSB0aHVtYnMgaWYgdGhlIGdpdmVuIGFycmF5IGlzIGJpZ2dlci9zbWFsbGVyIHRoYW4gdGhlIGN1cnJlbnQgYHZhbHVlc2AgYXJyYXlcbiAgICAgICAgICBpZiAodmFsLmxlbmd0aCA+IHRoaXMudmFscy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy52YWxzLnZhbHVlcy5sZW5ndGg7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5hZGROZXdUaHVtYk5vZGUoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwubGVuZ3RoIDwgdGhpcy52YWxzLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB2YWwubGVuZ3RoOyBpIDwgdGhpcy52YWxzLnZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxhc3RUaHVtYk5vZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwb3N0U2V0dGVyOiAodmFsLCBwcmV2VmFsKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgLy8gTWFudWFsbHkgaW52b2tlIGB2YWx1ZWAgcHJvcGVydHkgY2hhbmdlXG4gICAgICAgICAgdGhpcy5oYW5kbGVJbnRlcm5hbFByb3BlcnR5Q2hhbmdlKCd2YWx1ZScsIHByZXZWYWxbMF0pO1xuICAgICAgICAgIHRoaXMuaGFuZGxlSW50ZXJuYWxQcm9wZXJ0eUNoYW5nZSgnbm9kZScpO1xuXG4gICAgICAgICAgLy8gVE9ETyBQZXJoYXBzIG1vdmUgdGhpcyBpbnRvIGFuIG93biBmdW5jdGlvblxuICAgICAgICAgIC8vIEV4cGFuZGluZyBzdHJ1Y3R1cmUgdmFyaWFibGVzIHdoaWNoIGFyZSB1c2VkIGluIGJhc2UgZWxlbWVudCB0YWdzICh0aHVtYiBhbmQgZGVzY2VuZGFudHMpXG4gICAgICAgICAgZm9yIChjb25zdCBbIHByb3BOYW1lLCBzdHJpbmdMaXN0IF0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5kb21CdWlsZGVyLnN0cnVjdHVyZVZhclRodW1iU3RyaW5ncykpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFyU3RyaW5nIG9mIHN0cmluZ0xpc3QpIHtcbiAgICAgICAgICAgICAgY29uc3Qgbm9kZUxpc3QgPSB0aGlzLmRvbUJ1aWxkZXIuc3RydWN0dXJlVmFyc1twcm9wTmFtZV1bdmFyU3RyaW5nXTtcbiAgICAgICAgICAgICAgdGhpcy5yZXBsYWNlU3RydWN0dXJlVmFyU3RyaW5nSW5Ob2Rlcyh2YXJTdHJpbmcsIG5vZGVMaXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXlTZXR0ZXI6ICh2YWwsIGtleSkgPT4ge1xuICAgICAgICB2YWwgPSB0aGlzLmFkYXB0VmFsdWVUb1JhbmdlKHZhbCk7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgaWYgKGtleSA9PT0gMCkge1xuICAgICAgICAgICAgdmFyIHByZXZWYWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFwcGx5T25lUmF0aW9EaXN0YW5jZShrZXksIHt2YWx1ZTogdmFsfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52YWxzLnZhbHVlc1trZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIGtleUdldHRlcjogKHZhbCwga2V5KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHMucHJlY2lzaW9uICE9PSBmYWxzZSA/IE51bWJlcih2YWwudG9GaXhlZCh0aGlzLnZhbHMucHJlY2lzaW9uKSkgOiB2YWw7XG4gICAgICB9XG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgc2V0dGVyOiAodmFsKSA9PiB7XG4gICAgICAgIHRoaXMudmFsdWVzWzBdID0gdmFsO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBnZXR0ZXI6ICh2YWwpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzWzBdO1xuICAgICAgfVxuICAgIH0sXG4gICAgcHJlY2lzaW9uOiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIHNldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIHRoaXMuYXBwbHlBbGxSYXRpb0Rpc3RhbmNlcyh7IHByZWNpc2lvbjogdmFsIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGVwOiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgIHNldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICBpZiAodGhpcy52YWxzLnByZWNpc2lvbiAhPT0gZmFsc2UgJiYgdmFsICE9PSBmYWxzZSAmJiBOdW1iZXIodmFsLnRvRml4ZWQodGhpcy52YWxzLnByZWNpc2lvbikpICE9PSB2YWwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU2xpZGVyODkuUHJvcGVydHlFcnJvcih0aGlzLCAnc3RlcCcsXG4gICAgICAgICAgICAnVGhlIGdpdmVuIHZhbHVlIG9mICcgKyB2YWwgKyAnIGV4Y2VlZHMgdGhlIGN1cnJlbnRseSBzZXQgcHJlY2lzaW9uIG9mICcgKyB0aGlzLnZhbHMucHJlY2lzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIHRoaXMuYXBwbHlBbGxSYXRpb0Rpc3RhbmNlcyh7IHN0ZXA6IHZhbCB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdHJ1Y3R1cmU6IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gICAgbm9kZToge1xuICAgICAgZGVmYXVsdDoge30sXG4gICAgfSxcbiAgICBvcmllbnRhdGlvbjoge1xuICAgICAgZGVmYXVsdDogJ2hvcml6b250YWwnLFxuICAgICAgc2V0dGVyOiAodmFsKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgaWYgKHZhbCA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgdGhpcy52YWxzLm5vZGUudGh1bWIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2xlZnQnKTtcbiAgICAgICAgICAgIHRoaXMudmFscy5ub2RlLnNsaWRlci5jbGFzc0xpc3QuYWRkKCd2ZXJ0aWNhbCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHMubm9kZS50aHVtYi5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndG9wJyk7XG4gICAgICAgICAgICB0aGlzLnZhbHMubm9kZS5zbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgndmVydGljYWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWxzLm9yaWVudGF0aW9uID0gdmFsO1xuICAgICAgICAgIHRoaXMuYXBwbHlBbGxSYXRpb0Rpc3RhbmNlcygpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjbGFzc0xpc3Q6IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICBkZWZhdWx0OiB7fSxcbiAgICAgIHNldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICBjb25zdCBlcnJUeXBlcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICBmb3IgKGxldCBldmVudFR5cGUgaW4gdmFsKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLmNoZWNrRXZlbnRUeXBlKGV2ZW50VHlwZSkpIGVyclR5cGVzLnB1c2goZXZlbnRUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyVHlwZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Qcm9wZXJ0eUVycm9yKHRoaXMsICdldmVudHMnLFxuICAgICAgICAgICAgJ1RoZSBnaXZlbiBvYmplY3QgY29udGFpbnMgaXRlbXMgd2hpY2ggYXJlIG5vIHZhbGlkIGV2ZW50IHR5cGVzOicgKyBTbGlkZXI4OS5hcnJheVRvTGlzdFN0cmluZyhlcnJUeXBlcylcbiAgICAgICAgICAgICsgJ0F2YWlsYWJsZSBldmVudCB0eXBlcyBhcmU6JyArIFNsaWRlcjg5LmFycmF5VG9MaXN0U3RyaW5nKFNsaWRlcjg5LmV2ZW50VHlwZXMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGNvbmZpZywgcmVwbGFjZSA9IGZhbHNlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmluaXRpYWwgPSB0cnVlO1xuXG4gICAgdGhpcy50ZXN0SW5pdGlhbFRhcmdldCh0YXJnZXQpO1xuXG4gICAgaWYgKGNvbmZpZyA9PSBudWxsIHx8IGNvbmZpZyA9PT0gZmFsc2UpIGNvbmZpZyA9IHt9O1xuICAgIHRoaXMudGVzdEluaXRpYWxDb25maWcoY29uZmlnKTtcblxuICAgIHRoaXMuaW5pdGlhbGl6ZUNsYXNzUHJvcGVydGllcyhjb25maWcpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZUN1c3RvbVByb3BlcnRpZXMoY29uZmlnKTtcbiAgICB0aGlzLmluaXRpYWxpemVNZXRob2RzKCk7XG5cbiAgICB0aGlzLmJ1aWxkU2xpZGVyKHRhcmdldCwgcmVwbGFjZSk7XG5cbiAgICB0aGlzLmFwcGx5QWxsUmF0aW9EaXN0YW5jZXMoKTtcblxuICAgIC8vIEV4cGFuZGluZyBzdHJ1Y3R1cmUgdmFyaWFibGVzIGluaXRpYWxseVxuICAgIC8vIFRoaXMgaGFwcGVucyBzbyBsYXRlIHRvIGVuc3VyZSB0aGF0ICRub2RlIGNhbiBiZSBhY2Nlc3NlZCBwcm9wZXJseVxuICAgIGlmICh0aGlzLnZhbHMuc3RydWN0dXJlICE9PSBmYWxzZSkge1xuICAgICAgZm9yIChsZXQgdmFyaWFibGUgaW4gdGhpcy5kb21CdWlsZGVyLnN0cnVjdHVyZVZhcnMpIHtcbiAgICAgICAgdGhpcy51cGRhdGVQb3RlbnRpYWxTdHJ1Y3R1cmVWYXIodmFyaWFibGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaW5pdGlhbCA9IGZhbHNlO1xuICB9XG5cblxuICB0ZXN0SW5pdGlhbFRhcmdldCh0YXJnZXQpIHtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkluaXRpYWxpemF0aW9uRXJyb3IoJ05vIGZpcnN0IGFyZ3VtZW50IGhhcyBiZWVuIHN1cHBsaWVkLiBJdCBuZWVkcyB0byBiZSB0aGUgRE9NIHRhcmdldCBub2RlIGZvciB0aGUgc2xpZGVyJyk7XG4gICAgfSBlbHNlIGlmICghdGFyZ2V0Lm5vZGVUeXBlIHx8IHRhcmdldC5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkluaXRpYWxpemF0aW9uRXJyb3IoJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgdmFsaWQgRE9NIG5vZGUgKGdvdCAnICsgTGlicmFyeVR5cGVDaGVjay5nZXRUeXBlKHRhcmdldCkgKyAnKScpO1xuICAgIH1cbiAgfVxuICB0ZXN0SW5pdGlhbENvbmZpZyhjb25maWcpIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZyAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShjb25maWcpKSB7XG4gICAgICB0aHJvdyBuZXcgU2xpZGVyODkuSW5pdGlhbGl6YXRpb25FcnJvcignVGhlIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0IChnb3QgJyArIExpYnJhcnlUeXBlQ2hlY2suZ2V0VHlwZShjb25maWcpICsgJyknKTtcbiAgICB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gY29uZmlnICYmICd2YWx1ZXMnIGluIGNvbmZpZykge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkluaXRpYWxpemF0aW9uRXJyb3IoJ09ubHkgb25lIG9mIOKAmHZhbHVl4oCZIGFuZCDigJh2YWx1ZXPigJkgbWF5IGJlIGRlZmluZWQgYXQgb25jZScpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gSW5pdGlhbGl6ZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXG4gIGluaXRpYWxpemVDbGFzc1Byb3BlcnRpZXMoY29uZmlnKSB7XG4gICAgZm9yIChsZXQgXyBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgIC8vIElFLXN1cHBvcnQ6IGl0ZW0gbmVlZHMgdG8gYmUgYSBzY29wZWQgdmFyaWFibGUgYmVjYXVzZSBkZWZpbmVQcm9wZXJ0eSBpcyBhc3luY1xuICAgICAgY29uc3QgaXRlbSA9IF87XG4gICAgICBjb25zdCBwcm9wID0gdGhpcy5wcm9wZXJ0aWVzW2l0ZW1dO1xuICAgICAgY29uc3QgcHJvcERhdGEgPSBTbGlkZXI4OS5wcm9wZXJ0eURhdGFbaXRlbV07XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBpdGVtLCB7XG4gICAgICAgIHNldDogKHZhbCkgPT4ge1xuICAgICAgICAgIGlmIChwcm9wRGF0YS5yZWFkT25seSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkVycm9yKCdQcm9wZXJ0eSDigJgnICsgaXRlbSArICfigJkgaXMgcmVhZC1vbmx5IChJdCB3YXMganVzdCBzZXQgd2l0aCB0aGUgdmFsdWUg4oCYJyArIHZhbCArICfigJkpJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwcm9wRGF0YS5jb25zdHJ1Y3Rvck9ubHkgJiYgIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkVycm9yKCdQcm9wZXJ0eSDigJgnICsgaXRlbSArICfigJkgbWF5IG9ubHkgYmUgZGVmaW5lZCBpbiB0aGUgY29uc3RydWN0b3IgKEl0IHdhcyBqdXN0IHNldCB3aXRoIHRoZSB2YWx1ZSDigJgnICsgdmFsICsgJ+KAmSknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jaGVja1Byb3AoaXRlbSwgdmFsKTtcbiAgICAgICAgICBpZiAoIXByb3Auc2V0dGVyIHx8ICFwcm9wLnNldHRlcih2YWwpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHNbaXRlbV0gPSB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBnZXR0ZXJFbmRwb2ludCA9IChwcm9wRGF0YS5pc0RlZXBEZWZpbmVkQXJyYXkgPyB0aGlzLnZhbHMuJGludGVybWVkaWF0ZVRoaXMgOiB0aGlzLnZhbHMpO1xuICAgICAgICAgIHJldHVybiAocHJvcC5nZXR0ZXIgPyBwcm9wLmdldHRlcihnZXR0ZXJFbmRwb2ludFtpdGVtXSkgOiBnZXR0ZXJFbmRwb2ludFtpdGVtXSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRlZmluZURlZXBQcm9wZXJ0eSh0aGlzLnZhbHMsIGl0ZW0sIHRoaXMudmFscy4kLCBwcm9wLnBvc3RTZXR0ZXIsIHByb3BEYXRhLmlzRGVlcERlZmluZWRBcnJheSk7XG5cbiAgICAgIGlmIChpdGVtIGluIGNvbmZpZykge1xuICAgICAgICB0aGlzW2l0ZW1dID0gY29uZmlnW2l0ZW1dO1xuICAgICAgICBkZWxldGUgY29uZmlnW2l0ZW1dO1xuICAgICAgfSBlbHNlIGlmICgnZGVmYXVsdCcgaW4gcHJvcCkge1xuICAgICAgICBjb25zdCBkZWYgPSBwcm9wLmRlZmF1bHQ7XG4gICAgICAgICgocHJvcC5nZXR0ZXIgfHwgcHJvcC5rZXlHZXR0ZXIpID8gdGhpcyA6IHRoaXMudmFscylbaXRlbV0gPSAodHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJyA/IGRlZigpIDogZGVmKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXplQ3VzdG9tUHJvcGVydGllcyhjb25maWcpIHtcbiAgICBmb3IgKGxldCBfIGluIGNvbmZpZykge1xuICAgICAgY29uc3QgaXRlbSA9IF87XG5cbiAgICAgIGlmIChpdGVtWzBdID09PSAnXycpIHtcbiAgICAgICAgdGhpcy5kZWZpbmVEZWVwUHJvcGVydHkodGhpcywgaXRlbSwgdGhpcy52YWxzKTtcbiAgICAgICAgdGhpcy52YWxzW2l0ZW1dID0gY29uZmlnW2l0ZW1dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkluaXRpYWxpemF0aW9uRXJyb3IoXG4gICAgICAgICAgJ+KAmCcgKyBpdGVtICsgJ+KAmSBpcyBub3QgYSB2YWxpZCBwcm9wZXJ0eSBuYW1lLiBDaGVjayBpdHMgc3BlbGxpbmcgb3IgcHJlZml4IGl0IHdpdGggYW4gdW5kZXJzY29yZSB0byB1c2UgaXQgYXMgY3VzdG9tIHByb3BlcnR5ICjigJhfJyArIGl0ZW0gKyAn4oCZKScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxpemVNZXRob2RzKCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgZm9yIChsZXQgXyBpbiB0aGlzLm1ldGhvZHMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBfO1xuICAgICAgY29uc3QgbWV0aG9kID0gdGhpcy5tZXRob2RzW2l0ZW1dO1xuICAgICAgY29uc3QgYXJnQ291bnQgPSBTbGlkZXI4OS5tZXRob2REYXRhW2l0ZW1dLmFyZ3MubGVuZ3RoO1xuICAgICAgdGhpc1tpdGVtXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBhcmdDb3VudCk7XG4gICAgICAgIHRoYXQuY2hlY2tNZXRob2QoaXRlbSwgYXJncyk7XG4gICAgICAgIHJldHVybiBtZXRob2QuZnVuY3Rpb24uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYnVpbGRTbGlkZXIodGFyZ2V0LCByZXBsYWNlKSB7XG4gICAgdGhpcy52YWxzLm5vZGUgPSB0aGlzLmRvbUJ1aWxkZXIuY3JlYXRlU2xpZGVyTm9kZSh0aGlzLnZhbHMudmFsdWVzLmxlbmd0aCwgdGhpcy52YWxzLnN0cnVjdHVyZSk7XG5cbiAgICBpZiAocmVwbGFjZSkge1xuICAgICAgdGhpcy5kb21CdWlsZGVyLmFkZEF0dHJpYnV0ZXNGcm9tVGFyZ2V0KHRoaXMudmFscy5ub2RlLCB0YXJnZXQpO1xuICAgIH1cbiAgICB0aGlzLmRvbUJ1aWxkZXIuYWRkQ2xhc3Nlcyh0aGlzLnZhbHMubm9kZSwgdGhpcy52YWxzLmNsYXNzTGlzdCwgdGhpcy52YWxzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKTtcblxuICAgIFNsaWRlcjg5RE9NQnVpbGRlci5pbmplY3RTdHlsZVNoZWV0SWZOZWVkZWQoKTtcblxuICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICB0YXJnZXQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGhpcy52YWxzLm5vZGUuc2xpZGVyLCB0YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQodGhpcy52YWxzLm5vZGUuc2xpZGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLnRyYWNrU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMudmFscy5ub2RlLnRyYWNrKTtcbiAgfVxuXG4gIC8vIC0tLS0gSGVscGVyIGZ1bmN0aW9ucyAtLS0tXG4gIC8vIENoZWNrIHByb3BlcnRpZXMgJiBtZXRob2RzIGZvciB0aGUgY29ycmVjdCB0eXBlICYgZm9ybWF0XG4gIGNoZWNrTWV0aG9kKG1ldGhvZCwgYXJnTGlzdCkge1xuICAgIGNvbnN0IG9iaiA9IFNsaWRlcjg5Lm1ldGhvZERhdGFbbWV0aG9kXTtcbiAgICAvLyBJZiB0aGUgbmV4dCBhcmd1bWVudCAoYXJnTGlzdC5sZW5ndGggLSAxICsgMSkgaXMgbm90IG9wdGlvbmFsLCBhIHJlcXVpcmVkIGFyZyBpcyBtaXNzaW5nXG4gICAgZm9yIChsZXQgaSBpbiBhcmdMaXN0KSB7XG4gICAgICBjb25zdCBhcmcgPSBhcmdMaXN0W2ldO1xuICAgICAgY29uc3QgdHlwZU1zZyA9IExpYnJhcnlUeXBlQ2hlY2suY2hlY2tUeXBlcyhhcmcsIG9iai5hcmdzW2ldLmRlc2NyaXB0b3IpO1xuICAgICAgaWYgKHR5cGVNc2cpIHRocm93IG5ldyBTbGlkZXI4OS5NZXRob2RBcmdUeXBlRXJyb3IobWV0aG9kLCBpLCB0eXBlTXNnKTtcbiAgICB9XG4gICAgaWYgKG9iai5hcmdzW2FyZ0xpc3QubGVuZ3RoXSAmJiAhb2JqLmFyZ3NbYXJnTGlzdC5sZW5ndGhdLm9wdGlvbmFsKSB7XG4gICAgICB0aHJvdyBuZXcgU2xpZGVyODkuTWV0aG9kQXJnT21pdEVycm9yKG1ldGhvZCwgYXJnTGlzdC5sZW5ndGgpO1xuICAgIH1cbiAgfVxuICBjaGVja1Byb3AocHJvcCwgdmFsKSB7XG4gICAgY29uc3QgcHJvcGVydHlJbmZvID0gU2xpZGVyODkucHJvcGVydHlEYXRhW3Byb3BdO1xuICAgIGNvbnN0IHR5cGVNc2cgPSBMaWJyYXJ5VHlwZUNoZWNrLmNoZWNrVHlwZXModmFsLCBwcm9wZXJ0eUluZm8uZGVzY3JpcHRvcik7XG4gICAgaWYgKHR5cGVNc2cpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Qcm9wZXJ0eVR5cGVFcnJvcih0aGlzLCBwcm9wLCBwcm9wZXJ0eUluZm8sIHR5cGVNc2cpO1xuICAgIH1cbiAgfVxuXG4gIGFkYXB0VmFsdWVUb1JhbmdlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMudmFscy5yYW5nZVswXSA8IHRoaXMudmFscy5yYW5nZVsxXSkge1xuICAgICAgaWYgKHZhbHVlIDwgdGhpcy52YWxzLnJhbmdlWzBdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHMucmFuZ2VbMF07XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlID4gdGhpcy52YWxzLnJhbmdlWzFdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHMucmFuZ2VbMV07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh2YWx1ZSA+IHRoaXMudmFscy5yYW5nZVswXSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxzLnJhbmdlWzBdO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA8IHRoaXMudmFscy5yYW5nZVsxXSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxzLnJhbmdlWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvLyAtLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLVxuICBzdGF0aWMgZmxvYXRJc0VxdWFsKHZhbDAsIHZhbDEpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModmFsMCAtIHZhbDEpIDwgMC4wMDAwMDAwMDAwMTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9