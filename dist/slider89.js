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

/***/ "./src/LibraryTypeCheck.js":
/*!*********************************!*\
  !*** ./src/LibraryTypeCheck.js ***!
  \*********************************/
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

/***/ "./src/Slider89.js":
/*!*************************!*\
  !*** ./src/Slider89.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89; }
/* harmony export */ });
/* harmony import */ var _Slider89DOM_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89DOM.js */ "./src/Slider89DOM.js");
/* harmony import */ var _Slider89DOMBuilder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89DOMBuilder.js */ "./src/Slider89DOMBuilder.js");




class Slider89 extends _Slider89DOM_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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

    _Slider89DOMBuilder_js__WEBPACK_IMPORTED_MODULE_1__["default"].injectStyleSheetIfNeeded();

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
      const typeMsg = Slider89.TypeCheck.checkTypes(arg, obj.args[i].descriptor);
      if (typeMsg) throw new Slider89.MethodArgTypeError(method, i, typeMsg);
    }
    if (obj.args[argList.length] && !obj.args[argList.length].optional) {
      throw new Slider89.MethodArgOmitError(method, argList.length);
    }
  }
  checkProp(prop, val) {
    const propertyInfo = Slider89.propertyData[prop];
    const typeMsg = Slider89.TypeCheck.checkTypes(val, propertyInfo.descriptor);
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

/***/ "./src/Slider89Base.js":
/*!*****************************!*\
  !*** ./src/Slider89Base.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89Base; }
/* harmony export */ });
/* harmony import */ var _Slider89Error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89Error.js */ "./src/Slider89Error.js");
/* harmony import */ var _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LibraryTypeCheck.js */ "./src/LibraryTypeCheck.js");




class Slider89Base extends _Slider89Error_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static TypeCheck = _LibraryTypeCheck_js__WEBPACK_IMPORTED_MODULE_1__["default"];

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

  TypeCheck;

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

/***/ "./src/Slider89DOM.js":
/*!****************************!*\
  !*** ./src/Slider89DOM.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89DOM; }
/* harmony export */ });
/* harmony import */ var _Slider89_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89.js */ "./src/Slider89.js");
/* harmony import */ var _Slider89DOMBuilder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89DOMBuilder.js */ "./src/Slider89DOMBuilder.js");
/* harmony import */ var _Slider89Properties_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89Properties.js */ "./src/Slider89Properties.js");





class Slider89DOM extends _Slider89Properties_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  activeThumb;
  activeTouchID;
  mouseDownPos;

  trackStyle;

  domBuilder;

  constructor() {
    super();

    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.slideStart = this.slideStart.bind(this);
    this.slideMove = this.slideMove.bind(this);
    this.slideEnd = this.slideEnd.bind(this);

    this.keyDown = this.keyDown.bind(this);

    this.domBuilder = new _Slider89DOMBuilder_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.vals, {
      touchstart: this.touchStart,
      mousedown: this.slideStart,
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
    if (!_Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].floatIsEqual(ratio, prevRatio)) this.moveThumbRelative(this.vals.node.thumb[thumbIndex], ratio);
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

    // Expanding relevant structure variables
    for (const [ propName, stringList ] of Object.entries(this.domBuilder.structureVarThumbStrings)) {
      for (const varString of stringList) {
        const nodeList = this.domBuilder.structureVars[propName][varString];
        this.replaceStructureVarString(varString, nodeList);
      }
    }
  }

  setValuesWithValueChange(thumbIndex, value) {
    const prevVal = this.vals.values[thumbIndex];
    if (!_Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].floatIsEqual(value, prevVal)) {
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

/***/ "./src/Slider89DOMBuilder.js":
/*!***********************************!*\
  !*** ./src/Slider89DOMBuilder.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89DOMBuilder; }
/* harmony export */ });
/* harmony import */ var _default_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-styles.css */ "./src/default-styles.css");
/* harmony import */ var _default_styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_default_styles_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Slider89_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89.js */ "./src/Slider89.js");
/* harmony import */ var _Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89StructureParser.js */ "./src/Slider89StructureParser.js");





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
        "The given object contains items which aren't nodes of this slider:" + _Slider89_js__WEBPACK_IMPORTED_MODULE_1__["default"].arrayToListString(errNodes) +
        "Following nodes are part of this slider's node pool:" + _Slider89_js__WEBPACK_IMPORTED_MODULE_1__["default"].arrayToListString(Object.keys(node))
      throw new _Slider89_js__WEBPACK_IMPORTED_MODULE_1__["default"].Error(msg, 'classList', true);
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
      newThumb.addEventListener(eventName, callback);
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

      styleSheetElement.textContent = (_default_styles_css__WEBPACK_IMPORTED_MODULE_0___default());

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

/***/ "./src/Slider89Error.js":
/*!******************************!*\
  !*** ./src/Slider89Error.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89Error; }
/* harmony export */ });
/* harmony import */ var _Slider89_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89.js */ "./src/Slider89.js");



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
        + _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].getTypeErrorMessage(propertyInfo.descriptor, typeMsg);

      super(slider, propertyName, msg);
    }
  }

  // ---- Method errors ----
  static MethodArgTypeError = class extends Slider89Error.Error {
    constructor(methodName, index, typeMsg) {
      const argInfo = _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].getMethodArgInfo(methodName, index);
      const msg =
        'Type mismatch on the ' + Slider89Error.getMethodArgMessage(argInfo, index) + '.'
        + _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].getTypeErrorMessage(argInfo.descriptor, typeMsg);

      super(msg, methodName);
    }
  }
  static MethodArgOmitError = class extends Slider89Error.Error {
    constructor(methodName, index) {
      const argInfo = _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].getMethodArgInfo(methodName, index);
      const msg =
        'The ' + Slider89Error.getMethodArgMessage(argInfo, index)
        + ' has been omitted but it is required'
        + ' (It must be of type ' + _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].TypeCheck.buildDescriptorTypeMessage(argInfo.descriptor) + ').';

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
    return ' Expected ' + _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].TypeCheck.buildDescriptorTypeMessage(descriptor) + ','
         + ' got ' + typeMsg;
  }

  static getMethodArgMessage(argInfo, index) {
    let msg = '';
    if (argInfo.optional) {
      msg += 'optional ';
    }
    msg += _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].COUNTS[index] + ' argument (' + argInfo.name + ')';
    return msg;
  }

  static getMethodArgInfo(methodName, index) {
    return _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].methodData[methodName].args[index];
  }

  static arrayToListString(arr) {
    return '\n - "' + arr.join('"\n - "') + '"\n';
  }
}


/***/ }),

/***/ "./src/Slider89Events.js":
/*!*******************************!*\
  !*** ./src/Slider89Events.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89Events; }
/* harmony export */ });
/* harmony import */ var _Slider89_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89.js */ "./src/Slider89.js");
/* harmony import */ var _Slider89Base_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89Base.js */ "./src/Slider89Base.js");




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
      throw new _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].Error(
        'The specified event type ‘' + type + '’ is not valid. Available types are:' + _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].arrayToListString(Slider89Events.eventTypes),
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
        throw new _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].Error(msg, 'addEvent');
      }
    } else if (Slider89Events.eventTypes.indexOf(type) === -1) return false;
    return true;
  }
}


/***/ }),

/***/ "./src/Slider89Properties.js":
/*!***********************************!*\
  !*** ./src/Slider89Properties.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89Properties; }
/* harmony export */ });
/* harmony import */ var _Slider89_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89.js */ "./src/Slider89.js");
/* harmony import */ var _Slider89Events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89Events.js */ "./src/Slider89Events.js");
/* harmony import */ var _Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89StructureParser.js */ "./src/Slider89StructureParser.js");





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
      this.replaceStructureVarString(str, nodeList);
    }
  }

  replaceStructureVarString(str, nodeList) {
    const replacedStr = str.replace(_Slider89StructureParser_js__WEBPACK_IMPORTED_MODULE_2__["default"].regex.variable, (match, variableDelimit, variable) => {
      return this.getValueFromStructureVar(variableDelimit || variable);
    });
    for (const node of nodeList) {
      this.replaceStructureVarInNode(node, replacedStr);
    }
  }
  replaceStructureVarInNode(node, replacedStr) {
    // Special case: Iterate over every thumb
    const baseName = this.domBuilder.nodeHasBaseElementOwner(node);
    if (baseName) {
      const elements = this.vals.node[baseName];
      if (node.nodeType === Node.ATTRIBUTE_NODE) {
        elements.forEach(element => {
          element.getAttributeNode(node.name).textContent = replacedStr;
        });
      } else {
        // The text node is always the first child
        elements.forEach(element => {
          element.childNodes[0].textContent = replacedStr;
        });
      }
    } else {
      node.textContent = replacedStr;
    }
  }

  getValueFromStructureVar(varName) {
    const recursiveVar = varName.split('.');
    let value = this[recursiveVar[0]];
    if (recursiveVar.length > 1) {
      for (let i = 1; i < recursiveVar.length; i++) {
        try {
          value = value[recursiveVar[i]];
        } catch (e) {
          throw new _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError("Variable ‘" + varName + "’ cannot access property ‘" + recursiveVar[i] + "’ on " + value);
        }
      }
    }
    return value;
  }
}


/***/ }),

/***/ "./src/Slider89StructureParser.js":
/*!****************************************!*\
  !*** ./src/Slider89StructureParser.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89StructureParser; }
/* harmony export */ });
/* harmony import */ var _Slider89_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89.js */ "./src/Slider89.js");



class Slider89StructureParser {
  // ---- Static properties ----
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

    const stack = new Array();
    let currentIndex = 0;
    let isThumbChild = false;
    let match;
    // match: [matchedStr, type, name, tag, innerContent, attributes]
    while (match = Slider89StructureParser.regex.tag.exec(structureStr)) {
      if (match.index !== currentIndex) {
        const beforeFailure = 'tag ‘<' + (match[1] || '') + match[2] + '>’';
        const pointOfFailure = structureStr.slice(currentIndex, match.index).trim();
        throw new _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].StructureParseError(beforeFailure, pointOfFailure);
      }
      currentIndex = Slider89StructureParser.regex.tag.lastIndex;

      if (match[1] !== '/') {
        const elem = this.assembleElement(node, match[2], match[3], match[4], match[5]);
        node[match[2]] = elem;
        node[stack[stack.length - 1] || 'slider'].appendChild(elem);
        if (match[1] == null) {
          stack.push(match[2]);
        }
        // Detecting thumb so that we know when we are inside it
        if (match[2] === 'thumb') {
          isThumbChild = true;
        } else if (isThumbChild === true) {
          this.thumbChildren.push(match[2]);
        }
      } else {
        const lastItem = stack.pop();
        if (lastItem !== match[2]) {
          if (stack.indexOf(match[2]) !== -1) {
            this.closingTagError(lastItem);
          } else {
            throw new _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError(
              "The closing tag ‘</" + match[2] + ">’ couldn't find a matching opening tag");
          }
        }
        if (lastItem === 'thumb') {
          isThumbChild = false;
        }
      }
    }

    if (currentIndex !== structureStr.length) {
      throw new _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].StructureParseError('end of string', structureStr.slice(currentIndex));
    }
    if (stack.length > 1) {
      throw new _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError(
        "Couldn't find a matching closing tag for following elements:" + _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].arrayToListString(stack));
    } else if (stack.length === 1) {
      this.closingTagError(stack[0]);
    }

    return node;
  }

  assembleElement(node, name, tag, content, attributes) {
    if (name in node) {
      throw new _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError(
        'Every element must have a unique name but there are mutiple elements called ‘' + name + '’');
    }
    const elem = document.createElement(tag || 'div');

    if (content != null) {
      const textNode = document.createTextNode(content);
      textNode.textContent = content;
      elem.appendChild(textNode);

      if (Slider89StructureParser.stringHasVariable(content)) {
        this.parseVariables(content, textNode);
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
          this.parseVariables(attribValue, attribNode);
        }
      }
    }

    return elem;
  }

  // ---- Structure variables register ----
  parseVariables(str, targetNode) {
    // Memorize & skip already handled variables for the current string
    const propNameCache = new Array();
    let match;
    while (match = Slider89StructureParser.regex.variable.exec(str)) {
      const varName = match[1] || match[2];
      const propName = varName.indexOf('.') !== -1
        ? varName.slice(0, varName.indexOf('.'))
        : varName;

      if (!propNameCache.hasOwnProperty(propName)) {
        if (!Object.prototype.hasOwnProperty.call(this.vals, propName)) {
          throw new _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError(
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
    throw new _Slider89_js__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError(
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
}


/***/ }),

/***/ "./src/default-styles.css":
/*!********************************!*\
  !*** ./src/default-styles.css ***!
  \********************************/
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Slider89.js");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLHVGQUEyQzs7QUFFL0M7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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ZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvTGlicmFyeVR5cGVDaGVjay5qcyIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9TbGlkZXI4OS5qcyIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9TbGlkZXI4OUJhc2UuanMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvU2xpZGVyODlET00uanMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvU2xpZGVyODlET01CdWlsZGVyLmpzIiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL1NsaWRlcjg5RXJyb3IuanMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvU2xpZGVyODlFdmVudHMuanMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvU2xpZGVyODlQcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL1NsaWRlcjg5U3RydWN0dXJlUGFyc2VyLmpzIiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL2RlZmF1bHQtc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1NsaWRlcjg5L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL1NsaWRlcjg5L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTbGlkZXI4OVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTbGlkZXI4OVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIid1c2Ugc3RyaWN0JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpYnJhcnlUeXBlQ2hlY2sge1xuICBzdGF0aWMgZ2V0VHlwZSh2YWx1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICAgIHJldHVybiAnQXJyYXknO1xuICAgIGVsc2UgaWYgKE51bWJlci5pc05hTih2YWx1ZSkpXG4gICAgICByZXR1cm4gJ05hTic7XG4gICAgZWxzZSBpZiAodmFsdWUgPT09IG51bGwpXG4gICAgICByZXR1cm4gJ251bGwnO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsdWU7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tUeXBlcyh2YWwsIGRlc2NyaXB0b3IpIHtcbiAgICBsZXQgbXNnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVzY3JpcHRvci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdHlwZURhdGEgPSBkZXNjcmlwdG9yW2ldO1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVEYXRhLnR5cGU7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGUgPT09ICdib29sZWFuJyAmJiB0eXBlb2YgdmFsID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgdHlwZSA9PT0gJ3RydWUnICYmIHZhbCA9PT0gdHJ1ZSB8fFxuICAgICAgICB0eXBlID09PSAnZmFsc2UnICYmIHZhbCA9PT0gZmFsc2UgfHxcbiAgICAgICAgdHlwZSA9PT0gJ2FycmF5JyAmJiBBcnJheS5pc0FycmF5KHZhbCkgfHxcbiAgICAgICAgdHlwZSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IE9iamVjdF0nIHx8XG4gICAgICAgIHR5cGUgPT09ICdudW1iZXInICYmIHR5cGVvZiB2YWwgPT09ICdudW1iZXInICYmICFOdW1iZXIuaXNOYU4odmFsKSB8fFxuICAgICAgICB0eXBlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgdHlwZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbCA9PT0gJ3N0cmluZydcbiAgICAgICkge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdmFsLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAobXNnID0gTGlicmFyeVR5cGVDaGVjay5jaGVja1R5cGVzKHZhbFtqXSwgdHlwZURhdGEuZGVzY3JpcHRvcikpIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGZvciAobGV0IGtleSBpbiB2YWwpIHtcbiAgICAgICAgICAgIGlmIChtc2cgPSBMaWJyYXJ5VHlwZUNoZWNrLmNoZWNrVHlwZXModmFsW2tleV0sIHR5cGVEYXRhLmRlc2NyaXB0b3IpKSBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobXNnKSB7XG4gICAgICAgICAgcmV0dXJuIExpYnJhcnlUeXBlQ2hlY2sudG9UaXRsZUNhc2UodHlwZSkgKyAnPCcgKyBtc2cgKyAnPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1zZyA9IExpYnJhcnlUeXBlQ2hlY2suYnVpbGRDb25kaXRpb25UeXBlTWVzc2FnZSh0eXBlRGF0YS5jb25kaXRpb25zLCB2YWwpKSBicmVhaztcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtc2cgfHwgTGlicmFyeVR5cGVDaGVjay5nZXRUeXBlKHZhbCk7XG4gIH1cblxuICBzdGF0aWMgYnVpbGRDb25kaXRpb25UeXBlTWVzc2FnZShjb25kaXRpb25zLCB2YWwpIHtcbiAgICBpZiAoIWNvbmRpdGlvbnMpIHJldHVybjtcblxuICAgIGlmIChjb25kaXRpb25zLm5vbm5lZ2F0aXZlICYmIHZhbCA8IDApIHtcbiAgICAgIHJldHVybiAnYSBuZWdhdGl2ZSBudW1iZXInO1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9ucy5wb3NpdGl2ZSAmJiB2YWwgPD0gMCkge1xuICAgICAgcmV0dXJuICdhIG5lZ2F0aXZlIG51bWJlciBvciAwJztcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbnMuaW50ZWdlciAmJiB2YWwgJSAxICE9PSAwKSB7XG4gICAgICByZXR1cm4gJ2EgZmxvYXRpbmcgcG9pbnQgbnVtYmVyJztcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbnMuZmlsbGVkICYmIHZhbC50cmltKCkgPT09ICcnKSB7XG4gICAgICByZXR1cm4gJ2FuIGVtcHR5IHN0cmluZyc7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb25zLmtleXdvcmRzICYmIGNvbmRpdGlvbnMua2V5d29yZHMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgcmV0dXJuICdhIGRpZmZlcmVudCBzdHJpbmcnO1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9ucy53b3JkQ2hhciAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcih2YWwpKSkge1xuICAgICAgcmV0dXJuICdhIG51bWJlciBzdHJpbmcnO1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9ucy5sZW5ndGggJiYgdmFsLmxlbmd0aCAhPT0gY29uZGl0aW9ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAnYW4gYXJyYXkgb2YgbGVuZ3RoICcgKyB2YWwubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIC8vIENvbXB1dGUgYW4gYXV0b21hdGVkIGVycm9yIG1lc3NhZ2UgcmVnYXJkaW5nIHRoZSBwcm9wZXJ0eSdzIHR5cGVzIGFuZCBjb25kaXRpb25zXG4gIHN0YXRpYyBidWlsZERlc2NyaXB0b3JUeXBlTWVzc2FnZShkZXNjcmlwdG9yKSB7XG4gICAgbGV0IG1zZyA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVzY3JpcHRvci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdHlwZURhdGEgPSBkZXNjcmlwdG9yW2ldO1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVEYXRhLnR5cGU7XG4gICAgICBjb25zdCBjb25kID0gdHlwZURhdGEuY29uZGl0aW9ucztcblxuICAgICAgaWYgKG1zZykgbXNnICs9ICcgT1IgJztcblxuICAgICAgaWYgKHR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvbnN0IG5vbm5lZ2F0aXZlID0gY29uZCAmJiBjb25kLm5vbm5lZ2F0aXZlO1xuICAgICAgICBjb25zdCBwb3NpdGl2ZSA9IGNvbmQgJiYgY29uZC5wb3NpdGl2ZTtcbiAgICAgICAgY29uc3QgaXNJbnQgPSBjb25kICYmIGNvbmQuaW50ZWdlcjtcblxuICAgICAgICBpZiAobm9ubmVnYXRpdmUpIHtcbiAgICAgICAgICBtc2cgKz0gJ25vbi1uZWdhdGl2ZSAnO1xuICAgICAgICB9IGVsc2UgaWYgKHBvc2l0aXZlKSB7XG4gICAgICAgICAgbXNnICs9ICdwb3NpdGl2ZSAnXG4gICAgICAgIH1cbiAgICAgICAgbXNnICs9IChpc0ludCA/ICdpbnRlZ2VyJyA6ICdudW1iZXInKTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICBjb25zdCBpbm5lclR5cGUgPSBMaWJyYXJ5VHlwZUNoZWNrLmJ1aWxkRGVzY3JpcHRvclR5cGVNZXNzYWdlKHR5cGVEYXRhLmRlc2NyaXB0b3IpO1xuICAgICAgICBtc2cgKz0gJ0FycmF5PCcgKyBpbm5lclR5cGUgKyAnPic7XG4gICAgICAgIGlmIChjb25kICYmIGNvbmQubGVuZ3RoKSB7XG4gICAgICAgICAgbXNnICs9ICcgb2YgbGVuZ3RoICcgKyBjb25kLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCBpbm5lclR5cGUgPSBMaWJyYXJ5VHlwZUNoZWNrLmJ1aWxkRGVzY3JpcHRvclR5cGVNZXNzYWdlKHR5cGVEYXRhLmRlc2NyaXB0b3IpO1xuICAgICAgICBtc2cgKz0gJ09iamVjdDwnICsgdHlwZURhdGEua2V5TmFtZSArICcsICcgKyBpbm5lclR5cGUgKyAnPic7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChjb25kICYmIGNvbmQua2V5d29yZHMpIHtcbiAgICAgICAgICBpZiAoY29uZC5rZXl3b3Jkcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBtc2cgKz0gJ29uZSBvZiB0aGUga2V5d29yZHMnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtc2cgKz0gJ3RoZSBrZXl3b3JkJztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uZC5rZXl3b3Jkcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgbiwgYXJyKSB7XG4gICAgICAgICAgICBpZiAobiAhPT0gMCAmJiBuID09PSBhcnIubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICBtc2cgKz0gJyBvcic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gIT09IDApIHtcbiAgICAgICAgICAgICAgbXNnICs9ICcsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1zZyArPSAnIFwiJyArIHZhbCArICdcIic7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNvbmQgJiYgY29uZC5maWxsZWQpIG1zZyArPSAnbm9uLWVtcHR5ICc7XG4gICAgICAgICAgaWYgKGNvbmQgJiYgY29uZC53b3JkQ2hhcikgbXNnICs9ICdub24tbnVtYmVyICc7XG4gICAgICAgICAgbXNnICs9ICdzdHJpbmcnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGVsc2Uge1xuICAgICAgICBtc2cgKz0gdHlwZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVEYXRhLnNoYXBlKSB7XG4gICAgICAgIG1zZyArPSAnICgnICsgdHlwZURhdGEuc2hhcGUgKyAnKSc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1zZztcbiAgfVxuXG4gIC8vIC0tLS0gSGVscGVyIGZ1bmN0aW9ucyAtLS0tXG4gIHN0YXRpYyB0b1RpdGxlQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBTbGlkZXI4OURPTSBmcm9tICcuL1NsaWRlcjg5RE9NLmpzJztcbmltcG9ydCBTbGlkZXI4OURPTUJ1aWxkZXIgZnJvbSAnLi9TbGlkZXI4OURPTUJ1aWxkZXIuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXI4OSBleHRlbmRzIFNsaWRlcjg5RE9NIHtcbiAgbWV0aG9kcyA9IHtcbiAgICBhZGRFdmVudDoge1xuICAgICAgZnVuY3Rpb246IHRoaXMuYWRkRXZlbnQsXG4gICAgfSxcbiAgICByZW1vdmVFdmVudDoge1xuICAgICAgZnVuY3Rpb246IHRoaXMucmVtb3ZlRXZlbnQsXG4gICAgfVxuICB9O1xuXG4gIHByb3BlcnRpZXMgPSB7XG4gICAgcmFuZ2U6IHtcbiAgICAgIGRlZmF1bHQ6IFswLCAxMDBdLFxuICAgICAgc2V0dGVyOiAodmFsKSA9PiB7XG4gICAgICAgIGlmICh2YWxbMF0gPT09IHZhbFsxXSkge1xuICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Qcm9wZXJ0eUVycm9yKHRoaXMsICdyYW5nZScsXG4gICAgICAgICAgICAnVGhlIGdpdmVuIHJhbmdlIG9mIFsnICsgdmFsLmpvaW4oJywgJykgKyAnXSBkZWZpbmVzIHRoZSBzYW1lIHZhbHVlIGZvciBib3RoIHJhbmdlIHN0YXJ0IGFuZCBlbmQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIHRoaXMuYXBwbHlBbGxSYXRpb0Rpc3RhbmNlcyh7IHJhbmdlOiB2YWwgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBrZXlTZXR0ZXI6ICh2YWwsIGtleSkgPT4ge1xuICAgICAgICAvLyBDb21wYXJlIGB2YWxgIHdpdGggdGhlIHZhbHVlIGF0IHRoZSBvdGhlciBrZXkgKDAgb3IgMSlcbiAgICAgICAgaWYgKHZhbCA9PT0gdGhpcy52YWxzLnJhbmdlW01hdGguYWJzKGtleSAtIDEpXSkge1xuICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Qcm9wZXJ0eUVycm9yKHRoaXMsICdyYW5nZScsXG4gICAgICAgICAgICAnVGhlIG5ldyByYW5nZSBvZiBbJyArIHZhbCArICcsICcgKyB2YWwgKyAnXSBkZWZpbmVzIHRoZSBzYW1lIHZhbHVlIGZvciBib3RoIHJhbmdlIHN0YXJ0IGFuZCBlbmQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIGNvbnN0IG5ld1JhbmdlID0gQXJyYXkuZnJvbSh0aGlzLnZhbHMucmFuZ2UpO1xuICAgICAgICAgIG5ld1JhbmdlW2tleV0gPSB2YWw7XG4gICAgICAgICAgdGhpcy5hcHBseUFsbFJhdGlvRGlzdGFuY2VzKHsgcmFuZ2U6IG5ld1JhbmdlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB2YWx1ZXM6IHtcbiAgICAgIGRlZmF1bHQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLnZhbHMucmFuZ2VbMF1dO1xuICAgICAgfSxcbiAgICAgIHNldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIC8vIEFkZC9yZW1vdmUgdGh1bWJzIGlmIHRoZSBnaXZlbiBhcnJheSBpcyBiaWdnZXIvc21hbGxlciB0aGFuIHRoZSBjdXJyZW50IGB2YWx1ZXNgIGFycmF5XG4gICAgICAgICAgaWYgKHZhbC5sZW5ndGggPiB0aGlzLnZhbHMudmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMudmFscy52YWx1ZXMubGVuZ3RoOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWRkTmV3VGh1bWJOb2RlKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmxlbmd0aCA8IHRoaXMudmFscy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdmFsLmxlbmd0aDsgaSA8IHRoaXMudmFscy52YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMYXN0VGh1bWJOb2RlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcG9zdFNldHRlcjogKHZhbCwgcHJldlZhbCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIC8vIE1hbnVhbGx5IGludm9rZSBgdmFsdWVgIHByb3BlcnR5IGNoYW5nZVxuICAgICAgICAgIHRoaXMuaGFuZGxlSW50ZXJuYWxQcm9wZXJ0eUNoYW5nZSgndmFsdWUnLCBwcmV2VmFsWzBdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGtleVNldHRlcjogKHZhbCwga2V5KSA9PiB7XG4gICAgICAgIHZhbCA9IHRoaXMuYWRhcHRWYWx1ZVRvUmFuZ2UodmFsKTtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICBpZiAoa2V5ID09PSAwKSB7XG4gICAgICAgICAgICB2YXIgcHJldlZhbCA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXBwbHlPbmVSYXRpb0Rpc3RhbmNlKGtleSwge3ZhbHVlOiB2YWx9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZhbHMudmFsdWVzW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAga2V5R2V0dGVyOiAodmFsLCBrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFscy5wcmVjaXNpb24gIT09IGZhbHNlID8gTnVtYmVyKHZhbC50b0ZpeGVkKHRoaXMudmFscy5wcmVjaXNpb24pKSA6IHZhbDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHZhbHVlOiB7XG4gICAgICBzZXR0ZXI6ICh2YWwpID0+IHtcbiAgICAgICAgdGhpcy52YWx1ZXNbMF0gPSB2YWw7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICAgIGdldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXNbMF07XG4gICAgICB9XG4gICAgfSxcbiAgICBwcmVjaXNpb246IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgc2V0dGVyOiAodmFsKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgdGhpcy5hcHBseUFsbFJhdGlvRGlzdGFuY2VzKHsgcHJlY2lzaW9uOiB2YWwgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHN0ZXA6IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgc2V0dGVyOiAodmFsKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnZhbHMucHJlY2lzaW9uICE9PSBmYWxzZSAmJiB2YWwgIT09IGZhbHNlICYmIE51bWJlcih2YWwudG9GaXhlZCh0aGlzLnZhbHMucHJlY2lzaW9uKSkgIT09IHZhbCkge1xuICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Qcm9wZXJ0eUVycm9yKHRoaXMsICdzdGVwJyxcbiAgICAgICAgICAgICdUaGUgZ2l2ZW4gdmFsdWUgb2YgJyArIHZhbCArICcgZXhjZWVkcyB0aGUgY3VycmVudGx5IHNldCBwcmVjaXNpb24gb2YgJyArIHRoaXMudmFscy5wcmVjaXNpb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgdGhpcy5hcHBseUFsbFJhdGlvRGlzdGFuY2VzKHsgc3RlcDogdmFsIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHN0cnVjdHVyZToge1xuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgfSxcbiAgICBub2RlOiB7XG4gICAgICBkZWZhdWx0OiB7fSxcbiAgICB9LFxuICAgIG9yaWVudGF0aW9uOiB7XG4gICAgICBkZWZhdWx0OiAnaG9yaXpvbnRhbCcsXG4gICAgICBzZXR0ZXI6ICh2YWwpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICBpZiAodmFsID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHMubm9kZS50aHVtYi5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnbGVmdCcpO1xuICAgICAgICAgICAgdGhpcy52YWxzLm5vZGUuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3ZlcnRpY2FsJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudmFscy5ub2RlLnRodW1iLnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0b3AnKTtcbiAgICAgICAgICAgIHRoaXMudmFscy5ub2RlLnNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCd2ZXJ0aWNhbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZhbHMub3JpZW50YXRpb24gPSB2YWw7XG4gICAgICAgICAgdGhpcy5hcHBseUFsbFJhdGlvRGlzdGFuY2VzKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNsYXNzTGlzdDoge1xuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgIGRlZmF1bHQ6IHt9LFxuICAgICAgc2V0dGVyOiAodmFsKSA9PiB7XG4gICAgICAgIGNvbnN0IGVyclR5cGVzID0gbmV3IEFycmF5KCk7XG4gICAgICAgIGZvciAobGV0IGV2ZW50VHlwZSBpbiB2YWwpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tFdmVudFR5cGUoZXZlbnRUeXBlKSkgZXJyVHlwZXMucHVzaChldmVudFR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJUeXBlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlByb3BlcnR5RXJyb3IodGhpcywgJ2V2ZW50cycsXG4gICAgICAgICAgICAnVGhlIGdpdmVuIG9iamVjdCBjb250YWlucyBpdGVtcyB3aGljaCBhcmUgbm8gdmFsaWQgZXZlbnQgdHlwZXM6JyArIFNsaWRlcjg5LmFycmF5VG9MaXN0U3RyaW5nKGVyclR5cGVzKVxuICAgICAgICAgICAgKyAnQXZhaWxhYmxlIGV2ZW50IHR5cGVzIGFyZTonICsgU2xpZGVyODkuYXJyYXlUb0xpc3RTdHJpbmcoU2xpZGVyODkuZXZlbnRUeXBlcykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHRhcmdldCwgY29uZmlnLCByZXBsYWNlID0gZmFsc2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5pdGlhbCA9IHRydWU7XG5cbiAgICB0aGlzLnRlc3RJbml0aWFsVGFyZ2V0KHRhcmdldCk7XG5cbiAgICBpZiAoY29uZmlnID09IG51bGwgfHwgY29uZmlnID09PSBmYWxzZSkgY29uZmlnID0ge307XG4gICAgdGhpcy50ZXN0SW5pdGlhbENvbmZpZyhjb25maWcpO1xuXG4gICAgdGhpcy5pbml0aWFsaXplQ2xhc3NQcm9wZXJ0aWVzKGNvbmZpZyk7XG4gICAgdGhpcy5pbml0aWFsaXplQ3VzdG9tUHJvcGVydGllcyhjb25maWcpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZU1ldGhvZHMoKTtcblxuICAgIHRoaXMuYnVpbGRTbGlkZXIodGFyZ2V0LCByZXBsYWNlKTtcblxuICAgIHRoaXMuYXBwbHlBbGxSYXRpb0Rpc3RhbmNlcygpO1xuXG4gICAgLy8gRXhwYW5kaW5nIHN0cnVjdHVyZSB2YXJpYWJsZXMgaW5pdGlhbGx5XG4gICAgLy8gVGhpcyBoYXBwZW5zIHNvIGxhdGUgdG8gZW5zdXJlIHRoYXQgJG5vZGUgY2FuIGJlIGFjY2Vzc2VkIHByb3Blcmx5XG4gICAgaWYgKHRoaXMudmFscy5zdHJ1Y3R1cmUgIT09IGZhbHNlKSB7XG4gICAgICBmb3IgKGxldCB2YXJpYWJsZSBpbiB0aGlzLmRvbUJ1aWxkZXIuc3RydWN0dXJlVmFycykge1xuICAgICAgICB0aGlzLnVwZGF0ZVBvdGVudGlhbFN0cnVjdHVyZVZhcih2YXJpYWJsZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsID0gZmFsc2U7XG4gIH1cblxuXG4gIHRlc3RJbml0aWFsVGFyZ2V0KHRhcmdldCkge1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0aHJvdyBuZXcgU2xpZGVyODkuSW5pdGlhbGl6YXRpb25FcnJvcignTm8gZmlyc3QgYXJndW1lbnQgaGFzIGJlZW4gc3VwcGxpZWQuIEl0IG5lZWRzIHRvIGJlIHRoZSBET00gdGFyZ2V0IG5vZGUgZm9yIHRoZSBzbGlkZXInKTtcbiAgICB9IGVsc2UgaWYgKCF0YXJnZXQubm9kZVR5cGUgfHwgdGFyZ2V0Lm5vZGVUeXBlICE9PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgU2xpZGVyODkuSW5pdGlhbGl6YXRpb25FcnJvcignVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSB2YWxpZCBET00gbm9kZSAoZ290ICcgKyBTbGlkZXI4OS5UeXBlQ2hlY2suZ2V0VHlwZSh0YXJnZXQpICsgJyknKTtcbiAgICB9XG4gIH1cbiAgdGVzdEluaXRpYWxDb25maWcoY29uZmlnKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkoY29uZmlnKSkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkluaXRpYWxpemF0aW9uRXJyb3IoJ1RoZSBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBjb25maWd1cmF0aW9uIG9iamVjdCAoZ290ICcgKyBTbGlkZXI4OS5UeXBlQ2hlY2suZ2V0VHlwZShjb25maWcpICsgJyknKTtcbiAgICB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gY29uZmlnICYmICd2YWx1ZXMnIGluIGNvbmZpZykge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkluaXRpYWxpemF0aW9uRXJyb3IoJ09ubHkgb25lIG9mIOKAmHZhbHVl4oCZIGFuZCDigJh2YWx1ZXPigJkgbWF5IGJlIGRlZmluZWQgYXQgb25jZScpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gSW5pdGlhbGl6ZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXG4gIGluaXRpYWxpemVDbGFzc1Byb3BlcnRpZXMoY29uZmlnKSB7XG4gICAgZm9yIChsZXQgXyBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgIC8vIElFLXN1cHBvcnQ6IGl0ZW0gbmVlZHMgdG8gYmUgYSBzY29wZWQgdmFyaWFibGUgYmVjYXVzZSBkZWZpbmVQcm9wZXJ0eSBpcyBhc3luY1xuICAgICAgY29uc3QgaXRlbSA9IF87XG4gICAgICBjb25zdCBwcm9wID0gdGhpcy5wcm9wZXJ0aWVzW2l0ZW1dO1xuICAgICAgY29uc3QgcHJvcERhdGEgPSBTbGlkZXI4OS5wcm9wZXJ0eURhdGFbaXRlbV07XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBpdGVtLCB7XG4gICAgICAgIHNldDogKHZhbCkgPT4ge1xuICAgICAgICAgIGlmIChwcm9wRGF0YS5yZWFkT25seSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkVycm9yKCdQcm9wZXJ0eSDigJgnICsgaXRlbSArICfigJkgaXMgcmVhZC1vbmx5IChJdCB3YXMganVzdCBzZXQgd2l0aCB0aGUgdmFsdWUg4oCYJyArIHZhbCArICfigJkpJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwcm9wRGF0YS5jb25zdHJ1Y3Rvck9ubHkgJiYgIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkVycm9yKCdQcm9wZXJ0eSDigJgnICsgaXRlbSArICfigJkgbWF5IG9ubHkgYmUgZGVmaW5lZCBpbiB0aGUgY29uc3RydWN0b3IgKEl0IHdhcyBqdXN0IHNldCB3aXRoIHRoZSB2YWx1ZSDigJgnICsgdmFsICsgJ+KAmSknKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jaGVja1Byb3AoaXRlbSwgdmFsKTtcbiAgICAgICAgICBpZiAoIXByb3Auc2V0dGVyIHx8ICFwcm9wLnNldHRlcih2YWwpKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHNbaXRlbV0gPSB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBnZXR0ZXJFbmRwb2ludCA9IChwcm9wRGF0YS5pc0RlZXBEZWZpbmVkQXJyYXkgPyB0aGlzLnZhbHMuJGludGVybWVkaWF0ZVRoaXMgOiB0aGlzLnZhbHMpO1xuICAgICAgICAgIHJldHVybiAocHJvcC5nZXR0ZXIgPyBwcm9wLmdldHRlcihnZXR0ZXJFbmRwb2ludFtpdGVtXSkgOiBnZXR0ZXJFbmRwb2ludFtpdGVtXSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRlZmluZURlZXBQcm9wZXJ0eSh0aGlzLnZhbHMsIGl0ZW0sIHRoaXMudmFscy4kLCBwcm9wLnBvc3RTZXR0ZXIsIHByb3BEYXRhLmlzRGVlcERlZmluZWRBcnJheSk7XG5cbiAgICAgIGlmIChpdGVtIGluIGNvbmZpZykge1xuICAgICAgICB0aGlzW2l0ZW1dID0gY29uZmlnW2l0ZW1dO1xuICAgICAgICBkZWxldGUgY29uZmlnW2l0ZW1dO1xuICAgICAgfSBlbHNlIGlmICgnZGVmYXVsdCcgaW4gcHJvcCkge1xuICAgICAgICBjb25zdCBkZWYgPSBwcm9wLmRlZmF1bHQ7XG4gICAgICAgICgocHJvcC5nZXR0ZXIgfHwgcHJvcC5rZXlHZXR0ZXIpID8gdGhpcyA6IHRoaXMudmFscylbaXRlbV0gPSAodHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJyA/IGRlZigpIDogZGVmKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXplQ3VzdG9tUHJvcGVydGllcyhjb25maWcpIHtcbiAgICBmb3IgKGxldCBfIGluIGNvbmZpZykge1xuICAgICAgY29uc3QgaXRlbSA9IF87XG5cbiAgICAgIGlmIChpdGVtWzBdID09PSAnXycpIHtcbiAgICAgICAgdGhpcy5kZWZpbmVEZWVwUHJvcGVydHkodGhpcywgaXRlbSwgdGhpcy52YWxzKTtcbiAgICAgICAgdGhpcy52YWxzW2l0ZW1dID0gY29uZmlnW2l0ZW1dO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkluaXRpYWxpemF0aW9uRXJyb3IoXG4gICAgICAgICAgJ+KAmCcgKyBpdGVtICsgJ+KAmSBpcyBub3QgYSB2YWxpZCBwcm9wZXJ0eSBuYW1lLiBDaGVjayBpdHMgc3BlbGxpbmcgb3IgcHJlZml4IGl0IHdpdGggYW4gdW5kZXJzY29yZSB0byB1c2UgaXQgYXMgY3VzdG9tIHByb3BlcnR5ICjigJhfJyArIGl0ZW0gKyAn4oCZKScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxpemVNZXRob2RzKCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgZm9yIChsZXQgXyBpbiB0aGlzLm1ldGhvZHMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBfO1xuICAgICAgY29uc3QgbWV0aG9kID0gdGhpcy5tZXRob2RzW2l0ZW1dO1xuICAgICAgY29uc3QgYXJnQ291bnQgPSBTbGlkZXI4OS5tZXRob2REYXRhW2l0ZW1dLmFyZ3MubGVuZ3RoO1xuICAgICAgdGhpc1tpdGVtXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBhcmdDb3VudCk7XG4gICAgICAgIHRoYXQuY2hlY2tNZXRob2QoaXRlbSwgYXJncyk7XG4gICAgICAgIHJldHVybiBtZXRob2QuZnVuY3Rpb24uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYnVpbGRTbGlkZXIodGFyZ2V0LCByZXBsYWNlKSB7XG4gICAgdGhpcy52YWxzLm5vZGUgPSB0aGlzLmRvbUJ1aWxkZXIuY3JlYXRlU2xpZGVyTm9kZSh0aGlzLnZhbHMudmFsdWVzLmxlbmd0aCwgdGhpcy52YWxzLnN0cnVjdHVyZSk7XG5cbiAgICBpZiAocmVwbGFjZSkge1xuICAgICAgdGhpcy5kb21CdWlsZGVyLmFkZEF0dHJpYnV0ZXNGcm9tVGFyZ2V0KHRoaXMudmFscy5ub2RlLCB0YXJnZXQpO1xuICAgIH1cbiAgICB0aGlzLmRvbUJ1aWxkZXIuYWRkQ2xhc3Nlcyh0aGlzLnZhbHMubm9kZSwgdGhpcy52YWxzLmNsYXNzTGlzdCwgdGhpcy52YWxzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKTtcblxuICAgIFNsaWRlcjg5RE9NQnVpbGRlci5pbmplY3RTdHlsZVNoZWV0SWZOZWVkZWQoKTtcblxuICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICB0YXJnZXQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGhpcy52YWxzLm5vZGUuc2xpZGVyLCB0YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQodGhpcy52YWxzLm5vZGUuc2xpZGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLnRyYWNrU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMudmFscy5ub2RlLnRyYWNrKTtcbiAgfVxuXG4gIC8vIC0tLS0gSGVscGVyIGZ1bmN0aW9ucyAtLS0tXG4gIC8vIENoZWNrIHByb3BlcnRpZXMgJiBtZXRob2RzIGZvciB0aGUgY29ycmVjdCB0eXBlICYgZm9ybWF0XG4gIGNoZWNrTWV0aG9kKG1ldGhvZCwgYXJnTGlzdCkge1xuICAgIGNvbnN0IG9iaiA9IFNsaWRlcjg5Lm1ldGhvZERhdGFbbWV0aG9kXTtcbiAgICAvLyBJZiB0aGUgbmV4dCBhcmd1bWVudCAoYXJnTGlzdC5sZW5ndGggLSAxICsgMSkgaXMgbm90IG9wdGlvbmFsLCBhIHJlcXVpcmVkIGFyZyBpcyBtaXNzaW5nXG4gICAgZm9yIChsZXQgaSBpbiBhcmdMaXN0KSB7XG4gICAgICBjb25zdCBhcmcgPSBhcmdMaXN0W2ldO1xuICAgICAgY29uc3QgdHlwZU1zZyA9IFNsaWRlcjg5LlR5cGVDaGVjay5jaGVja1R5cGVzKGFyZywgb2JqLmFyZ3NbaV0uZGVzY3JpcHRvcik7XG4gICAgICBpZiAodHlwZU1zZykgdGhyb3cgbmV3IFNsaWRlcjg5Lk1ldGhvZEFyZ1R5cGVFcnJvcihtZXRob2QsIGksIHR5cGVNc2cpO1xuICAgIH1cbiAgICBpZiAob2JqLmFyZ3NbYXJnTGlzdC5sZW5ndGhdICYmICFvYmouYXJnc1thcmdMaXN0Lmxlbmd0aF0ub3B0aW9uYWwpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5NZXRob2RBcmdPbWl0RXJyb3IobWV0aG9kLCBhcmdMaXN0Lmxlbmd0aCk7XG4gICAgfVxuICB9XG4gIGNoZWNrUHJvcChwcm9wLCB2YWwpIHtcbiAgICBjb25zdCBwcm9wZXJ0eUluZm8gPSBTbGlkZXI4OS5wcm9wZXJ0eURhdGFbcHJvcF07XG4gICAgY29uc3QgdHlwZU1zZyA9IFNsaWRlcjg5LlR5cGVDaGVjay5jaGVja1R5cGVzKHZhbCwgcHJvcGVydHlJbmZvLmRlc2NyaXB0b3IpO1xuICAgIGlmICh0eXBlTXNnKSB7XG4gICAgICB0aHJvdyBuZXcgU2xpZGVyODkuUHJvcGVydHlUeXBlRXJyb3IodGhpcywgcHJvcCwgcHJvcGVydHlJbmZvLCB0eXBlTXNnKTtcbiAgICB9XG4gIH1cblxuICBhZGFwdFZhbHVlVG9SYW5nZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnZhbHMucmFuZ2VbMF0gPCB0aGlzLnZhbHMucmFuZ2VbMV0pIHtcbiAgICAgIGlmICh2YWx1ZSA8IHRoaXMudmFscy5yYW5nZVswXSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxzLnJhbmdlWzBdO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IHRoaXMudmFscy5yYW5nZVsxXSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxzLnJhbmdlWzFdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsdWUgPiB0aGlzLnZhbHMucmFuZ2VbMF0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFscy5yYW5nZVswXTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPCB0aGlzLnZhbHMucmFuZ2VbMV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFscy5yYW5nZVsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLy8gLS0tLSBIZWxwZXIgZnVuY3Rpb25zIC0tLS1cbiAgc3RhdGljIGZsb2F0SXNFcXVhbCh2YWwwLCB2YWwxKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHZhbDAgLSB2YWwxKSA8IDAuMDAwMDAwMDAwMDE7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBTbGlkZXI4OUVycm9yIGZyb20gJy4vU2xpZGVyODlFcnJvci5qcyc7XG5pbXBvcnQgTGlicmFyeVR5cGVDaGVjayBmcm9tICcuL0xpYnJhcnlUeXBlQ2hlY2suanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXI4OUJhc2UgZXh0ZW5kcyBTbGlkZXI4OUVycm9yIHtcbiAgc3RhdGljIFR5cGVDaGVjayA9IExpYnJhcnlUeXBlQ2hlY2s7XG5cbiAgc3RhdGljIG1ldGhvZERhdGEgPSB7XG4gICAgYWRkRXZlbnQ6IHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdldmVudCB0eXBlJyxcbiAgICAgICAgICBkZXNjcmlwdG9yOiBbe1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2V2ZW50IGZ1bmN0aW9uJyxcbiAgICAgICAgICBkZXNjcmlwdG9yOiBbe1xuICAgICAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJ1xuICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnZXZlbnQgbmFtZXNwYWNlJyxcbiAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgICAgICBkZXNjcmlwdG9yOiBbe1xuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICBjb25kaXRpb25zOiB7XG4gICAgICAgICAgICAgIGZpbGxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgd29yZENoYXI6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICByZW1vdmVFdmVudDoge1xuICAgICAgYXJnczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2V2ZW50IGlkZW50aWZpZXIvbmFtZXNwYWNlJyxcbiAgICAgICAgICBkZXNjcmlwdG9yOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICBjb25kaXRpb25zOiB7XG4gICAgICAgICAgICAgICAgbm9ubmVnYXRpdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgaW50ZWdlcjogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgICAgY29uZGl0aW9uczoge1xuICAgICAgICAgICAgICAgIGZpbGxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3b3JkQ2hhcjogdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG4gIHN0YXRpYyBwcm9wZXJ0eURhdGEgPSB7XG4gICAgcmFuZ2U6IHtcbiAgICAgIGlzRGVlcERlZmluZWRBcnJheTogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0b3I6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgc2hhcGU6ICdbc3RhcnRWYWx1ZSwgZW5kVmFsdWVdJyxcbiAgICAgICAgICBjb25kaXRpb25zOiB7XG4gICAgICAgICAgICBsZW5ndGg6IDJcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRlc2NyaXB0b3I6IFtcbiAgICAgICAgICAgIHsgdHlwZTogJ251bWJlcicgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgeyB0eXBlOiAnYm9vbGVhbicgfVxuICAgICAgXVxuICAgIH0sXG4gICAgdmFsdWVzOiB7XG4gICAgICBpc0RlZXBEZWZpbmVkQXJyYXk6IHRydWUsXG4gICAgICBkZXNjcmlwdG9yOiBbe1xuICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAvLyBUT0RPIGNvbmRpdGlvbjogYXQgbGVhc3Qgb2Ygc2l6ZSAxXG4gICAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgZGVzY3JpcHRvcjogW3tcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgIH1dXG4gICAgfSxcbiAgICBwcmVjaXNpb246IHtcbiAgICAgIGRlc2NyaXB0b3I6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICAgIG5vbm5lZ2F0aXZlOiB0cnVlLFxuICAgICAgICAgICAgaW50ZWdlcjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyB0eXBlOiAnZmFsc2UnIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHN0ZXA6IHtcbiAgICAgIGRlc2NyaXB0b3I6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICAgIHBvc2l0aXZlOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7IHR5cGU6ICdmYWxzZScgfVxuICAgICAgXVxuICAgIH0sXG4gICAgc3RydWN0dXJlOiB7XG4gICAgICBjb25zdHJ1Y3Rvck9ubHk6IHRydWUsXG4gICAgICBkZXNjcmlwdG9yOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICBjb25kaXRpb25zOiB7XG4gICAgICAgICAgICBmaWxsZWQ6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XG4gICAgICBdXG4gICAgfSxcbiAgICBub2RlOiB7XG4gICAgICByZWFkT25seTogdHJ1ZVxuICAgIH0sXG4gICAgb3JpZW50YXRpb246IHtcbiAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBjb25kaXRpb25zOiB7XG4gICAgICAgICAga2V5d29yZHM6IFtcbiAgICAgICAgICAgICdob3Jpem9udGFsJyxcbiAgICAgICAgICAgICd2ZXJ0aWNhbCdcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1dXG4gICAgfSxcbiAgICBjbGFzc0xpc3Q6IHtcbiAgICAgIGNvbnN0cnVjdG9yT25seTogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0b3I6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgIHNoYXBlOiAne25vZGVOYW1lOiBbLi4uY2xhc3Nlc119JyxcbiAgICAgICAgICBrZXlOYW1lOiAnbm9kZU5hbWUnLFxuICAgICAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgICAgZGVzY3JpcHRvcjogW1xuICAgICAgICAgICAgICB7IHR5cGU6ICdzdHJpbmcnIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICB7IHR5cGU6ICdmYWxzZScgfVxuICAgICAgXVxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICBjb25zdHJ1Y3Rvck9ubHk6IHRydWUsXG4gICAgICBkZXNjcmlwdG9yOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICBzaGFwZTogJ3tldmVudE5hbWU6IFsuLi5mdW5jdGlvbnNdfScsXG4gICAgICAgICAga2V5TmFtZTogJ2V2ZW50TmFtZScsXG4gICAgICAgICAgZGVzY3JpcHRvcjogW3tcbiAgICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgICBkZXNjcmlwdG9yOiBbe1xuICAgICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XG4gICAgICBdXG4gICAgfVxuICB9O1xuXG4gIG1ldGhvZHM7XG4gIHByb3BlcnRpZXM7XG5cbiAgVHlwZUNoZWNrO1xuXG4gIHZhbHMgPSB7fTsgLy8gaG9sZGluZyBldmVyeSBjbGFzcyBwcm9wZXJ0eVxuICBpbml0aWFsID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIC8qIFNwZWNpYWwgcHJvcGVydGllcyB3aGljaCBhcmUgb25seSB0byBiZSBhY2Nlc3NlZCBieSBhIGdldHRlci9zZXR0ZXIsIG5ldmVyIGRpcmVjdGx5OlxuICAgICAqICAgJDogRml4ZWQgZW5kcG9pbnQgZm9yIHRoZSB2YWx1ZXMgb2YgYWxsIHByb3BlcnRpZXNcbiAgICAgKiAgICRpbnRlcm1lZGlhdGVUaGlzOiBJbnRlcm1lZGlhdGUgcHJvcGVydHkgKGJldHdlZW4gdGhpcyBhbmQgdmFscykgZm9yIHRoZSBrZXlzIG9mIGFuIGFycmF5L29iamVjdFxuICAgICAqICAgJGludGVybWVkaWF0ZVZhbHM6IEludGVybWVkaWF0ZSBwcm9wZXJ0eSAoYmV0d2VlbiB2YWxzIGFuZCB2YWxzLiQpIGZvciB0aGUga2V5cyBvZiBhbiBhcnJheS9vYmplY3RcbiAgICAgKlxuICAgICAqIFRoaXMgcmVzdWx0cyBpbiB0aGUgZm9sbG93aW5nIGdldHRlci9zZXR0ZXIgcGF0aHM6XG4gICAgICogICBOb3JtYWwgKHByaW1pdGl2ZSAmIHNoYWxsb3cpIHByb3BlcnRpZXM6XG4gICAgICogICAgIDx0aGlzLnByb3BlcnR5PiAgIC0tLSBUeXBlIGNoZWNrICYgQ3VzdG9tIGdldHRlci9zZXR0ZXIgLS0tPlxuICAgICAqICAgICA8dmFscy5wcm9wZXJ0eT4gICAtLS0gSW50ZXJuYWwgcHJvcGVydHkgdXBkYXRlIC0tLT5cbiAgICAgKiAgICAgPHZhbHMuJC5wcm9wZXJ0eT5cbiAgICAgKiAgIERlZXBseSBkZWZpbmVkIEFycmF5czpcbiAgICAgKiAgICAgPHRoaXMucHJvcGVydHk+ICAgICAgICAgICAgICAgICAgICAgICAgLS0tIFR5cGUgY2hlY2sgJiBDdXN0b20gZ2V0dGVyL3NldHRlciAtLS0+XG4gICAgICogICAgIDx2YWxzLiRpbnRlcm1lZGlhdGVUaGlzLnByb3BlcnR5ID0gW10+IC0tLSBDdXN0b20gZ2V0dGVyL3NldHRlciBvbiB0aGUga2V5cy9pbmRleGVzIC0tLT5cbiAgICAgKiAgICAgPHZhbHMucHJvcGVydHk+ICAgICAgICAgICAgICAgICAgICAgICAgLS0tIEludGVybmFsIHByb3BlcnR5IHVwZGF0ZSAtLS0+XG4gICAgICogICAgIDx2YWxzLiRpbnRlcm1lZGlhdGVWYWxzLnByb3BlcnR5ID0gW10+IC0tLSBJbnRlcm5hbCBwcm9wZXJ0eVtrZXkvaW5kZXhdIHVwZGF0ZSAtLS0+XG4gICAgICogICAgIDx2YWxzLiQucHJvcGVydHk+XG4gICAgICpcbiAgICAgKiBPYmplY3QuZGVmaW5lUHJvcGVydGllcyBpcyB1c2VkIGZvciBub24tZW51bWVyYWJpbGl0eSAmIG5vbi13cml0YWJpbGl0eSBvZiB0aGVzZSBzcGVjaWFsIHByb3BlcnRpZXMuXG4gICAgICovXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcy52YWxzLCB7XG4gICAgICAnJCc6IHtcbiAgICAgICAgdmFsdWU6IHt9XG4gICAgICB9LFxuICAgICAgJyRpbnRlcm1lZGlhdGVUaGlzJzoge1xuICAgICAgICB2YWx1ZToge31cbiAgICAgIH0sXG4gICAgICAnJGludGVybWVkaWF0ZVZhbHMnOiB7XG4gICAgICAgIHZhbHVlOiB7fVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IFNsaWRlcjg5IGZyb20gJy4vU2xpZGVyODkuanMnO1xuaW1wb3J0IFNsaWRlcjg5RE9NQnVpbGRlciBmcm9tICcuL1NsaWRlcjg5RE9NQnVpbGRlci5qcyc7XG5pbXBvcnQgU2xpZGVyODlQcm9wZXJ0aWVzIGZyb20gJy4vU2xpZGVyODlQcm9wZXJ0aWVzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyODlET00gZXh0ZW5kcyBTbGlkZXI4OVByb3BlcnRpZXMge1xuICBhY3RpdmVUaHVtYjtcbiAgYWN0aXZlVG91Y2hJRDtcbiAgbW91c2VEb3duUG9zO1xuXG4gIHRyYWNrU3R5bGU7XG5cbiAgZG9tQnVpbGRlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy50b3VjaFN0YXJ0ID0gdGhpcy50b3VjaFN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy50b3VjaE1vdmUgPSB0aGlzLnRvdWNoTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG91Y2hFbmQgPSB0aGlzLnRvdWNoRW5kLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnNsaWRlU3RhcnQgPSB0aGlzLnNsaWRlU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnNsaWRlTW92ZSA9IHRoaXMuc2xpZGVNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zbGlkZUVuZCA9IHRoaXMuc2xpZGVFbmQuYmluZCh0aGlzKTtcblxuICAgIHRoaXMua2V5RG93biA9IHRoaXMua2V5RG93bi5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5kb21CdWlsZGVyID0gbmV3IFNsaWRlcjg5RE9NQnVpbGRlcih0aGlzLnZhbHMsIHtcbiAgICAgIHRvdWNoc3RhcnQ6IHRoaXMudG91Y2hTdGFydCxcbiAgICAgIG1vdXNlZG93bjogdGhpcy5zbGlkZVN0YXJ0LFxuICAgICAga2V5ZG93bjogdGhpcy5rZXlEb3duXG4gICAgfSk7XG4gIH1cblxuXG4gIC8vIC0tLS0gRE9NIGdldHRlcnMgLS0tLVxuICBnZXRUcmFja1BhZGRpbmcoZGlyZWN0aW9uKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy50cmFja1N0eWxlWydwYWRkaW5nJyArIGRpcmVjdGlvbl0pO1xuICB9XG4gIGdldFRyYWNrT2Zmc2V0KGRpcmVjdGlvbikge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHRoaXMudHJhY2tTdHlsZVsnYm9yZGVyJyArIGRpcmVjdGlvbiArICdXaWR0aCddKVxuICAgICAgKyB0aGlzLmdldFRyYWNrUGFkZGluZyhkaXJlY3Rpb24pO1xuICB9XG5cbiAgZ2V0RGlzdGFuY2UodGh1bWIpIHtcbiAgICBpZiAodGhpcy52YWxzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm4gdGh1bWIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG4gICAgICAgIC0gdGhpcy52YWxzLm5vZGUudHJhY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wXG4gICAgICAgIC0gdGhpcy5nZXRUcmFja09mZnNldCgnVG9wJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aHVtYi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0XG4gICAgICAgIC0gdGhpcy52YWxzLm5vZGUudHJhY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdFxuICAgICAgICAtIHRoaXMuZ2V0VHJhY2tPZmZzZXQoJ0xlZnQnKTtcbiAgICB9XG4gIH1cbiAgZ2V0QWJzb2x1dGVUcmFja1NpemUodGh1bWIpIHtcbiAgICBpZiAodGhpcy52YWxzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxzLm5vZGUudHJhY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG4gICAgICAgIC0gdGhpcy5nZXRUcmFja09mZnNldCgnVG9wJylcbiAgICAgICAgLSB0aGlzLmdldFRyYWNrT2Zmc2V0KCdCb3R0b20nKVxuICAgICAgICAtIHRodW1iLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudmFscy5ub2RlLnRyYWNrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICAgIC0gdGhpcy5nZXRUcmFja09mZnNldCgnTGVmdCcpXG4gICAgICAgIC0gdGhpcy5nZXRUcmFja09mZnNldCgnUmlnaHQnKVxuICAgICAgICAtIHRodW1iLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgIH1cbiAgfVxuXG4gIC8vIC0tLS0gVGh1bWIgbW92aW5nIC0tLS1cbiAgbW92ZVRodW1iVHJhbnNsYXRlKHRodW1iLCBkaXN0YW5jZSkge1xuICAgIGNvbnN0IGF4aXMgPSB0aGlzLnZhbHMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgPyAnWScgOiAnWCc7XG4gICAgdGh1bWIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZScgKyBheGlzICsgJygnICsgZGlzdGFuY2UgKyAncHgpJztcbiAgfVxuICBtb3ZlVGh1bWJSZWxhdGl2ZSh0aHVtYiwgZGlzdGFuY2UpIHtcbiAgICAvLyBSZWxhdGl2ZSBwb3NpdGlvbmluZyBzdGFydHMgYXQgdGhlIHBhZGRpbmcsIHNvIGxvb2tpbmcgYXQgdGhlIGJvcmRlciBpcyBub3QgbmVlZGVkXG4gICAgaWYgKHRoaXMudmFscy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgdmFyIG9mZnNldFN0YXJ0ID0gdGhpcy5nZXRUcmFja1BhZGRpbmcoJ1RvcCcpO1xuICAgICAgdmFyIG9mZnNldEVuZCA9IHRoaXMuZ2V0VHJhY2tQYWRkaW5nKCdCb3R0b20nKTtcbiAgICAgIHZhciB0aHVtYkRpbSA9IHRodW1iLmNsaWVudEhlaWdodDtcbiAgICAgIHZhciBwb3NBbmNob3IgPSAndG9wJztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG9mZnNldFN0YXJ0ID0gdGhpcy5nZXRUcmFja1BhZGRpbmcoJ0xlZnQnKTtcbiAgICAgIHZhciBvZmZzZXRFbmQgPSB0aGlzLmdldFRyYWNrUGFkZGluZygnUmlnaHQnKTtcbiAgICAgIHZhciB0aHVtYkRpbSA9IHRodW1iLmNsaWVudFdpZHRoO1xuICAgICAgdmFyIHBvc0FuY2hvciA9ICdsZWZ0JztcbiAgICB9XG5cbiAgICBsZXQgc3VidHJhY3QgPSAodGh1bWJEaW0gKiBkaXN0YW5jZSkgKyAncHgnO1xuICAgIGlmIChvZmZzZXRFbmQpIHN1YnRyYWN0ICs9ICcgLSAnICsgKG9mZnNldEVuZCAqIGRpc3RhbmNlKSArICdweCc7XG4gICAgaWYgKG9mZnNldFN0YXJ0KSBzdWJ0cmFjdCArPSAnICsgJyArIChvZmZzZXRTdGFydCAqICgxIC0gZGlzdGFuY2UpKSArICdweCc7XG5cbiAgICB0aHVtYi5zdHlsZVtwb3NBbmNob3JdID0gJ2NhbGMoJyArIChkaXN0YW5jZSAqIDEwMCkgKyAnJSAtICcgKyBzdWJ0cmFjdCArICcpJztcbiAgfVxuXG4gIGFwcGx5QWxsUmF0aW9EaXN0YW5jZXMobmV3VmFscykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWxzLnZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5hcHBseU9uZVJhdGlvRGlzdGFuY2UoaSwgbmV3VmFscyk7XG4gICAgfVxuICB9XG4gIGFwcGx5T25lUmF0aW9EaXN0YW5jZSh0aHVtYkluZGV4LCBuZXdWYWxzKSB7XG4gICAgY29uc3QgeyB2YWx1ZSwgcHJldlJhdGlvLCByYXRpbyB9ID0gdGhpcy5jb21wdXRlUmF0aW9EaXN0YW5jZSh0aHVtYkluZGV4LCBuZXdWYWxzKTtcblxuICAgIHRoaXMuc2V0VmFsdWVzV2l0aFZhbHVlQ2hhbmdlKHRodW1iSW5kZXgsIHZhbHVlKTtcbiAgICBpZiAoIVNsaWRlcjg5LmZsb2F0SXNFcXVhbChyYXRpbywgcHJldlJhdGlvKSkgdGhpcy5tb3ZlVGh1bWJSZWxhdGl2ZSh0aGlzLnZhbHMubm9kZS50aHVtYlt0aHVtYkluZGV4XSwgcmF0aW8pO1xuICB9XG5cbiAgLy8gLS0tLSBEaXN0YW5jZSBjb21wdXRhdGlvbiAtLS0tXG4gIGNvbXB1dGVEaXN0YW5jZVZhbHVlKHRodW1iLCBkaXN0YW5jZSwgYWJzU2l6ZSkge1xuICAgIGlmIChhYnNTaXplID09IG51bGwpIGFic1NpemUgPSB0aGlzLmdldEFic29sdXRlVHJhY2tTaXplKHRodW1iKTtcbiAgICByZXR1cm4gZGlzdGFuY2UgLyBhYnNTaXplICogKHRoaXMudmFscy5yYW5nZVsxXSAtIHRoaXMudmFscy5yYW5nZVswXSkgKyB0aGlzLnZhbHMucmFuZ2VbMF07XG4gIH1cblxuICBjb21wdXRlUmF0aW9EaXN0YW5jZSh0aHVtYkluZGV4LCBuZXdWYWxzKSB7XG4gICAgbGV0IHZhbHVlLCByYXRpbztcbiAgICBpZiAoIW5ld1ZhbHMpIHtcbiAgICAgIG5ld1ZhbHMgPSB0aGlzLnZhbHM7XG4gICAgICB2YWx1ZSA9IHRoaXMudmFscy52YWx1ZXNbdGh1bWJJbmRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByb3BzID0gWydyYW5nZScsICdzdGVwJ107XG4gICAgICBmb3IgKGxldCBpIGluIHByb3BzKSB7XG4gICAgICAgIGlmIChuZXdWYWxzW3Byb3BzW2ldXSA9PSBudWxsKSBuZXdWYWxzW3Byb3BzW2ldXSA9IHRoaXMudmFsc1twcm9wc1tpXV07XG4gICAgICB9XG4gICAgICBpZiAobmV3VmFscy52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gbmV3VmFscy52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhdGlvID0gKHRoaXMudmFscy52YWx1ZXNbdGh1bWJJbmRleF0gLSB0aGlzLnZhbHMucmFuZ2VbMF0pIC8gKHRoaXMudmFscy5yYW5nZVsxXSAtIHRoaXMudmFscy5yYW5nZVswXSk7XG4gICAgICAgIHZhbHVlID0gKG5ld1ZhbHMucmFuZ2VbMV0gLSBuZXdWYWxzLnJhbmdlWzBdKSAqIHJhdGlvICsgbmV3VmFscy5yYW5nZVswXTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUm91bmQgdmFsdWUgdG8gYSBnaXZlbiBzdGVwXG4gICAgaWYgKG5ld1ZhbHMuc3RlcCAhPT0gZmFsc2UpIHtcbiAgICAgIGlmIChNYXRoLmFicyhuZXdWYWxzLnJhbmdlWzFdIC0gbmV3VmFscy5yYW5nZVswXSkgPCBuZXdWYWxzLnN0ZXApIHtcbiAgICAgICAgdmFsdWUgPSBuZXdWYWxzLnJhbmdlWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBuZXdWYWxzLnJhbmdlWzBdICsgTWF0aC5yb3VuZCgodmFsdWUgLSBuZXdWYWxzLnJhbmdlWzBdKSAvIG5ld1ZhbHMuc3RlcCkgKiBuZXdWYWxzLnN0ZXA7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IG5ld1JhdGlvID0gKHZhbHVlIC0gbmV3VmFscy5yYW5nZVswXSkgLyAobmV3VmFscy5yYW5nZVsxXSAtIG5ld1ZhbHMucmFuZ2VbMF0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIHByZXZSYXRpbzogcmF0aW8sXG4gICAgICByYXRpbzogbmV3UmF0aW9cbiAgICB9O1xuICB9XG5cbiAgLy8gLS0tLSBIZWxwZXIgZnVuY3Rpb25zIC0tLS1cbiAgcmVtb3ZlTGFzdFRodW1iTm9kZSgpIHtcbiAgICBjb25zdCB0aHVtYiA9IHRoaXMuZG9tQnVpbGRlci5yZW1vdmVUaHVtYkZyb21Ob2RlKHRoaXMudmFscy5ub2RlKTtcbiAgICB0aGlzLmRvbUJ1aWxkZXIudGh1bWJQYXJlbnQucmVtb3ZlQ2hpbGQodGh1bWIpO1xuICB9XG4gIGFkZE5ld1RodW1iTm9kZSh0aHVtYkluZGV4KSB7XG4gICAgdGhpcy5kb21CdWlsZGVyLmFkZFRodW1iVG9Ob2RlKHRoaXMudmFscy5ub2RlKTtcbiAgICB0aGlzLmFwcGx5T25lUmF0aW9EaXN0YW5jZSh0aHVtYkluZGV4KTtcblxuICAgIC8vIEV4cGFuZGluZyByZWxldmFudCBzdHJ1Y3R1cmUgdmFyaWFibGVzXG4gICAgZm9yIChjb25zdCBbIHByb3BOYW1lLCBzdHJpbmdMaXN0IF0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5kb21CdWlsZGVyLnN0cnVjdHVyZVZhclRodW1iU3RyaW5ncykpIHtcbiAgICAgIGZvciAoY29uc3QgdmFyU3RyaW5nIG9mIHN0cmluZ0xpc3QpIHtcbiAgICAgICAgY29uc3Qgbm9kZUxpc3QgPSB0aGlzLmRvbUJ1aWxkZXIuc3RydWN0dXJlVmFyc1twcm9wTmFtZV1bdmFyU3RyaW5nXTtcbiAgICAgICAgdGhpcy5yZXBsYWNlU3RydWN0dXJlVmFyU3RyaW5nKHZhclN0cmluZywgbm9kZUxpc3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlc1dpdGhWYWx1ZUNoYW5nZSh0aHVtYkluZGV4LCB2YWx1ZSkge1xuICAgIGNvbnN0IHByZXZWYWwgPSB0aGlzLnZhbHMudmFsdWVzW3RodW1iSW5kZXhdO1xuICAgIGlmICghU2xpZGVyODkuZmxvYXRJc0VxdWFsKHZhbHVlLCBwcmV2VmFsKSkge1xuICAgICAgdGhpcy52YWxzLnZhbHVlc1t0aHVtYkluZGV4XSA9IHZhbHVlO1xuICAgICAgaWYgKHRodW1iSW5kZXggPT09IDApIHtcbiAgICAgICAgdGhpcy5oYW5kbGVJbnRlcm5hbFByb3BlcnR5Q2hhbmdlKCd2YWx1ZScsIHByZXZWYWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG5cbiAgLy8gLS0tLSBUb3VjaCBldmVudHMgLS0tLVxuICB0b3VjaFN0YXJ0KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHRoaXMuYWN0aXZlVG91Y2hJRCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRvdWNoSUQgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG4gICAgICB0aGlzLnNsaWRlU3RhcnQuY2FsbCh0aGlzLCBlLmNoYW5nZWRUb3VjaGVzWzBdLCBlKTtcblxuICAgICAgdGhpcy52YWxzLm5vZGUudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50b3VjaE1vdmUpO1xuICAgICAgdGhpcy52YWxzLm5vZGUudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kKTtcbiAgICAgIHRoaXMudmFscy5ub2RlLnRodW1iLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy50b3VjaEVuZCk7XG4gICAgfVxuICB9XG4gIHRvdWNoTW92ZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gdGhpcy5hY3RpdmVUb3VjaElEKSB7XG4gICAgICAgIHRoaXMuc2xpZGVNb3ZlLmNhbGwodGhpcywgZS5jaGFuZ2VkVG91Y2hlc1tpXSwgZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB0b3VjaEVuZChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gdGhpcy5hY3RpdmVUb3VjaElEKSB7XG4gICAgICAgIHRoaXMudmFscy5ub2RlLnRodW1iLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMudG91Y2hNb3ZlKTtcbiAgICAgICAgdGhpcy52YWxzLm5vZGUudGh1bWIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kKTtcbiAgICAgICAgdGhpcy52YWxzLm5vZGUudGh1bWIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLnRvdWNoRW5kKTtcblxuICAgICAgICB0aGlzLnNsaWRlRW5kLmNhbGwodGhpcywgZS5jaGFuZ2VkVG91Y2hlc1tpXSwgZSk7XG4gICAgICAgIHRoaXMuYWN0aXZlVG91Y2hJRCA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbiAgLy8gLS0tLSBNb3VzZSBldmVudHMgLS0tLVxuICBzbGlkZVN0YXJ0KGUsIHRvdWNoRXZlbnQpIHtcbiAgICB0aGlzLmFjdGl2ZVRodW1iID0gZS5jdXJyZW50VGFyZ2V0O1xuXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzbDg5LW5vc2VsZWN0Jyk7XG4gICAgdGhpcy5hY3RpdmVUaHVtYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAvLyBpbnZva2VFdmVudChbJ3N0YXJ0J10sIHRvdWNoRXZlbnQgfHwgZSk7XG5cbiAgICBpZiAodGhpcy52YWxzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICB2YXIgcG9zQW5jaG9yID0gJ3RvcCc7XG4gICAgICB2YXIgY2xpZW50RGltID0gZS5jbGllbnRZO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcG9zQW5jaG9yID0gJ2xlZnQnO1xuICAgICAgdmFyIGNsaWVudERpbSA9IGUuY2xpZW50WDtcbiAgICB9XG4gICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzLmdldERpc3RhbmNlKHRoaXMuYWN0aXZlVGh1bWIpO1xuICAgIHRoaXMubW91c2VEb3duUG9zID0gY2xpZW50RGltIC0gZGlzdGFuY2U7XG4gICAgdGhpcy5tb3ZlVGh1bWJUcmFuc2xhdGUodGhpcy5hY3RpdmVUaHVtYiwgZGlzdGFuY2UpO1xuICAgIHRoaXMuYWN0aXZlVGh1bWIuc3R5bGUucmVtb3ZlUHJvcGVydHkocG9zQW5jaG9yKTtcblxuICAgIGlmICghdG91Y2hFdmVudCkge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnNsaWRlRW5kKTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnNsaWRlTW92ZSk7XG4gICAgfVxuICB9XG4gIHNsaWRlTW92ZShlLCB0b3VjaEV2ZW50KSB7XG4gICAgY29uc3QgdGh1bWJJbmRleCA9IHRoaXMudmFscy5ub2RlLnRodW1iLmluZGV4T2YodGhpcy5hY3RpdmVUaHVtYik7XG4gICAgY29uc3QgYWJzU2l6ZSA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFja1NpemUodGhpcy5hY3RpdmVUaHVtYik7XG4gICAgbGV0IGRpc3RhbmNlID0gKHRoaXMudmFscy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/IGUuY2xpZW50WSA6IGUuY2xpZW50WCkgLSB0aGlzLm1vdXNlRG93blBvcztcblxuICAgIGlmIChkaXN0YW5jZSA+IGFic1NpemUpXG4gICAgICBkaXN0YW5jZSA9IGFic1NpemU7XG4gICAgZWxzZSBpZiAoZGlzdGFuY2UgPCAwKVxuICAgICAgZGlzdGFuY2UgPSAwO1xuXG4gICAgbGV0IHZhbHVlID0gdGhpcy5jb21wdXRlRGlzdGFuY2VWYWx1ZSh0aGlzLmFjdGl2ZVRodW1iLCBkaXN0YW5jZSwgYWJzU2l6ZSk7XG4gICAgaWYgKHRoaXMudmFscy5zdGVwICE9PSBmYWxzZSkge1xuICAgICAgY29uc3QgY29tcHV0ZWRQcm9wZXJ0aWVzID0gdGhpcy5jb21wdXRlUmF0aW9EaXN0YW5jZSh0aHVtYkluZGV4LCB7IHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgIHZhbHVlID0gY29tcHV0ZWRQcm9wZXJ0aWVzLnZhbHVlO1xuICAgICAgZGlzdGFuY2UgPSBjb21wdXRlZFByb3BlcnRpZXMucmF0aW8gKiBhYnNTaXplO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnNldFZhbHVlc1dpdGhWYWx1ZUNoYW5nZSh0aHVtYkluZGV4LCB2YWx1ZSkpIHtcbiAgICAgIHRoaXMubW92ZVRodW1iVHJhbnNsYXRlKHRoaXMuYWN0aXZlVGh1bWIsIGRpc3RhbmNlKTtcbiAgICAgIHRoaXMuaW52b2tlRXZlbnQoWydtb3ZlJ10sIHRvdWNoRXZlbnQgfHwgZSk7XG4gICAgfVxuICB9XG4gIHNsaWRlRW5kKGUsIHRvdWNoRXZlbnQpIHtcbiAgICBpZiAoIXRvdWNoRXZlbnQpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5zbGlkZUVuZCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5zbGlkZU1vdmUpO1xuICAgIH1cblxuICAgIGNvbnN0IHRodW1iSW5kZXggPSB0aGlzLnZhbHMubm9kZS50aHVtYi5pbmRleE9mKHRoaXMuYWN0aXZlVGh1bWIpO1xuXG4gICAgdGhpcy5hcHBseU9uZVJhdGlvRGlzdGFuY2UodGh1bWJJbmRleCk7XG4gICAgdGhpcy5hY3RpdmVUaHVtYi5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNmb3JtJyk7XG5cbiAgICB0aGlzLmludm9rZUV2ZW50KFsnZW5kJ10sIHRvdWNoRXZlbnQgfHwgZSk7XG4gICAgdGhpcy5hY3RpdmVUaHVtYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3NsODktbm9zZWxlY3QnKTtcblxuICAgIHRoaXMubW91c2VEb3duUG9zID0gbnVsbDtcbiAgICB0aGlzLmFjdGl2ZVRodW1iID0gbnVsbDtcbiAgfVxuXG5cbiAgLy8gLS0tLSBNaXNjIGV2ZW50cyAtLS0tXG4gIGtleURvd24oZSkge1xuICAgIGlmICghZS5rZXkuc3RhcnRzV2l0aCgnQXJyb3cnKSkgcmV0dXJuO1xuXG4gICAgY29uc3QgdGh1bWJJbmRleCA9IHRoaXMudmFscy5ub2RlLnRodW1iLmluZGV4T2YoZS5jdXJyZW50VGFyZ2V0KTtcblxuICAgIGxldCBtb2RpZmllciA9IE1hdGgucm91bmQoKHRoaXMudmFscy5yYW5nZVsxXSAtIHRoaXMudmFscy5yYW5nZVswXSkgLyAxMDApO1xuICAgIGlmIChlLnNoaWZ0S2V5ICYmIGUuY3RybEtleSkge1xuICAgICAgbW9kaWZpZXIgKj0gMC4xO1xuICAgIH0gZWxzZSBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgbW9kaWZpZXIgKj0gMTA7XG4gICAgfVxuXG4gICAgaWYgKGUua2V5ID09PSAnQXJyb3dMZWZ0JyB8fCBlLmtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnZhbHVlc1t0aHVtYkluZGV4XSAtPSBtb2RpZmllcjtcbiAgICB9IGVsc2UgaWYgKGUua2V5ID09PSAnQXJyb3dSaWdodCcgfHwgZS5rZXkgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnZhbHVlc1t0aHVtYkluZGV4XSArPSBtb2RpZmllcjtcbiAgICB9XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBkZWZhdWx0U3R5bGVzU3RyaW5nIGZyb20gJy4vZGVmYXVsdC1zdHlsZXMuY3NzJztcbmltcG9ydCBTbGlkZXI4OSBmcm9tICcuL1NsaWRlcjg5LmpzJztcbmltcG9ydCBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlciBmcm9tICcuL1NsaWRlcjg5U3RydWN0dXJlUGFyc2VyLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyODlET01CdWlsZGVyIGV4dGVuZHMgU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIge1xuICBzdGF0aWMgaGFzSW5qZWN0ZWRTdHlsZXNoZWV0ID0gZmFsc2U7XG5cbiAgdGh1bWJCYXNlOyAvLyBDbG9uYWJsZSB0aHVtYiBub2RlXG4gIHRodW1iUGFyZW50O1xuXG4gIGJhc2VFbGVtZW50cyA9IHt9O1xuXG4gIHN0cnVjdHVyZVZhclRodW1iU3RyaW5ncyA9IHt9O1xuXG4gIC8qKiBAdHlwZSBSZWNvcmQ8c3RyaW5nLCBGdW5jdGlvbj4gKi9cbiAgdGh1bWJFdmVudHMgPSB7fTtcblxuXG4gIGNvbnN0cnVjdG9yKHZhbHMsIHRodW1iRXZlbnRzKSB7XG4gICAgc3VwZXIodmFscyk7XG4gICAgdGhpcy50aHVtYkV2ZW50cyA9IHRodW1iRXZlbnRzO1xuICB9XG5cblxuICAvLyAtLS0tIEVsZW1lbnQgYnVpbGRlciAtLS0tXG4gIGNyZWF0ZVNsaWRlck5vZGUodGh1bWJDb3VudCwgc3RydWN0dXJlU3RyKSB7XG4gICAgcmV0dXJuIHN0cnVjdHVyZVN0ciA9PT0gZmFsc2VcbiAgICAgID8gdGhpcy5jcmVhdGVTbGlkZXJNYW51YWxseSh0aHVtYkNvdW50KVxuICAgICAgOiB0aGlzLmNyZWF0ZVNsaWRlckZyb21TdHJ1Y3R1cmUodGh1bWJDb3VudCwgc3RydWN0dXJlU3RyKTtcbiAgfVxuXG5cbiAgLy8gSW4gY2FzZSBubyBjdXN0b20gc3RydWN0dXJlIGlzIGRlZmluZWQsIG1hbnVhbGx5IGJ1aWxkIHRoZSBub2RlIHRvIGVuc3VyZSBiZXN0IHBlcmZvcm1hbmNlIChwYXJzZVN0cnVjdHVyZSB0YWtlcyBhIHdoaWxlKVxuICBjcmVhdGVTbGlkZXJNYW51YWxseSh0aHVtYkNvdW50KSB7XG4gICAgY29uc3Qgbm9kZSA9IHtcbiAgICAgIHNsaWRlcjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICB0cmFjazogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICB0aHVtYjogbmV3IEFycmF5KHRodW1iQ291bnQpXG4gICAgfTtcblxuICAgIHRoaXMudGh1bWJCYXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50aHVtYlBhcmVudCA9IG5vZGUudHJhY2s7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRodW1iQ291bnQ7IGkrKykge1xuICAgICAgbm9kZS50aHVtYltpXSA9IHRoaXMuY3JlYXRlTmV3VGh1bWIoKTtcbiAgICB9XG4gICAgbm9kZS5zbGlkZXIuYXBwZW5kQ2hpbGQobm9kZS50cmFjayk7XG5cbiAgICBmb3IgKGxldCBlbGVtZW50IGluIG5vZGUpIHtcbiAgICAgIC8vIFRodW1iIGNsYXNzZXMgYXJlIGFwcGxpZWQgaW4gYGNyZWF0ZU5ld1RodW1iYFxuICAgICAgaWYgKGVsZW1lbnQgIT09ICdzbGlkZXInICYmIGVsZW1lbnQgIT09ICd0aHVtYicpIHtcbiAgICAgICAgbm9kZVtlbGVtZW50XS5jbGFzc0xpc3QuYWRkKCdzbDg5LScgKyBlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjcmVhdGVTbGlkZXJGcm9tU3RydWN0dXJlKHRodW1iQ291bnQsIHN0cnVjdHVyZVN0cikge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLnBhcnNlU3RydWN0dXJlKHN0cnVjdHVyZVN0cik7XG4gICAgdGhpcy5wYXJzZVBvc3RQcm9jZXNzKG5vZGUsIHRodW1iQ291bnQpO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgcGFyc2VQb3N0UHJvY2Vzcyhub2RlLCB0aHVtYkNvdW50KSB7XG4gICAgLy8gTk9URTogdGh1bWIgYW5kIHRyYWNrIGNhbiBiZSBkZWZpbmVkIGluZGVwZW5kZW50bHlcbiAgICAvLyBJLmUuIHRyYWNrIGdldHMgdGhlIGNsYXNzIGBzbDg5LXRyYWNrYCwgYnV0IHRoaXMudGh1bWJQYXJlbnQgY2FuIGJlIGEgZGlmZmVyZW50IG5vZGVcbiAgICBpZiAoIW5vZGUudGh1bWIpIHtcbiAgICAgIHRoaXMudGh1bWJCYXNlID0gdGhpcy5hc3NlbWJsZUVsZW1lbnQobm9kZSwgJ3RodW1iJywgJ2RpdicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRodW1iQmFzZSA9IG5vZGUudGh1bWI7XG4gICAgICBpZiAobm9kZS50cmFjaykge1xuICAgICAgICB0aGlzLnRodW1iUGFyZW50ID0gbm9kZS50aHVtYi5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgICAgLy8gYmFzZUVsZW1lbnRzIGlzIG9ubHkgZWZmZWN0aXZlIGlmIGEgc3RydWN0dXJlIHRodW1iIGhhcyBiZWVuIGRlZmluZWRcbiAgICAgIHRoaXMuYmFzZUVsZW1lbnRzLnRodW1iID0gdGhpcy50aHVtYkJhc2U7XG4gICAgfVxuICAgIGlmICghbm9kZS50cmFjaykge1xuICAgICAgbm9kZS50cmFjayA9IHRoaXMuYXNzZW1ibGVFbGVtZW50KG5vZGUsICd0cmFjaycsICdkaXYnKTtcbiAgICAgIGlmIChub2RlLnRodW1iKSB7XG4gICAgICAgIG5vZGUudGh1bWIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChub2RlLnRyYWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuc2xpZGVyLmFwcGVuZENoaWxkKG5vZGUudHJhY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBvcmlnaW5hbCB0aHVtYiBub2RlXG4gICAgaWYgKG5vZGUudGh1bWIpIHtcbiAgICAgIG5vZGUudGh1bWIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlLnRodW1iKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnRodW1iUGFyZW50KSB7XG4gICAgICB0aGlzLnRodW1iUGFyZW50ID0gbm9kZS50cmFjaztcbiAgICB9XG5cbiAgICBub2RlLnRyYWNrLmNsYXNzTGlzdC5hZGQoJ3NsODktdHJhY2snKTtcblxuICAgIC8vIFB1c2ggdGh1bWIgJiBkZXNjZW5kYW50cyBpbnRvIG5vZGUgYXJyYXlzXG4gICAgbm9kZS50aHVtYiA9IG5ldyBBcnJheSgpO1xuICAgIGZvciAoY29uc3Qgbm9kZU5hbWUgb2YgdGhpcy50aHVtYkNoaWxkcmVuKSB7XG4gICAgICB0aGlzLmJhc2VFbGVtZW50c1tub2RlTmFtZV0gPSBub2RlW25vZGVOYW1lXTtcbiAgICAgIG5vZGVbbm9kZU5hbWVdID0gbmV3IEFycmF5KCk7XG4gICAgfVxuXG4gICAgdGhpcy5maW5kU3RydWN0dXJlVmFyU3RyaW5nc0luVGh1bWIodGhpcy50aHVtYkJhc2UpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aHVtYkNvdW50OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkVGh1bWJUb05vZGUobm9kZSk7XG4gICAgfVxuICB9XG5cbiAgZmluZFN0cnVjdHVyZVZhclN0cmluZ3NJblRodW1iKHRodW1iQmFzZSkge1xuICAgIGZvciAoY29uc3QgWyBwcm9wTmFtZSwgc3RyaW5nTGlzdCBdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuc3RydWN0dXJlVmFycykpIHtcbiAgICAgIGxldCB0aHVtYlN0cmluZ3MgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgWyBzdHIsIG5vZGVMaXN0IF0gb2YgT2JqZWN0LmVudHJpZXMoc3RyaW5nTGlzdCkpIHtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVMaXN0KSB7XG4gICAgICAgICAgaWYgKHRoaXMubm9kZUhhc0Jhc2VFbGVtZW50T3duZXIobm9kZSkpIHtcbiAgICAgICAgICAgIHRodW1iU3RyaW5ncy5wdXNoKHN0cik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aHVtYlN0cmluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnN0cnVjdHVyZVZhclRodW1iU3RyaW5nc1twcm9wTmFtZV0gPSB0aHVtYlN0cmluZ3M7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvLyAtLS0tIFRodW1iIGhlbHBlcnMgLS0tLVxuICBhZGRUaHVtYlRvTm9kZShub2RlKSB7XG4gICAgY29uc3QgbmV3VGh1bWIgPSB0aGlzLmNyZWF0ZU5ld1RodW1iKCk7XG4gICAgbm9kZS50aHVtYi5wdXNoKG5ld1RodW1iKTtcblxuICAgIFNsaWRlcjg5RE9NQnVpbGRlci5maW5kTm9kZUNoaWxkcmVuKG5ld1RodW1iKVxuICAgICAgLmZvckVhY2goKGNoaWxkTm9kZSwgaikgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZE5hbWUgPSB0aGlzLnRodW1iQ2hpbGRyZW5bal07XG4gICAgICAgIG5vZGVbY2hpbGROYW1lXS5wdXNoKGNoaWxkTm9kZSk7XG4gICAgICB9KTtcbiAgfVxuICByZW1vdmVUaHVtYkZyb21Ob2RlKG5vZGUpIHtcbiAgICBmb3IgKGNvbnN0IG5vZGVOYW1lIG9mIHRoaXMudGh1bWJDaGlsZHJlbikge1xuICAgICAgbm9kZVtub2RlTmFtZV0ucG9wKCk7XG4gICAgfVxuICAgIHJldHVybiBub2RlLnRodW1iLnBvcCgpO1xuICB9XG5cblxuICAvLyAtLS0tIE1pc2MgZnVuY3Rpb25zIC0tLS1cbiAgYWRkQXR0cmlidXRlc0Zyb21UYXJnZXQobm9kZSwgdGFyZ2V0Tm9kZSkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB0YXJnZXROb2RlLmF0dHJpYnV0ZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBub2RlLnNsaWRlci5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlc1tpXS5uYW1lLCBhdHRyaWJ1dGVzW2ldLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzc2VzKG5vZGUsIGNsYXNzTGlzdCwgaXNWZXJ0aWNhbCkge1xuICAgIG5vZGUuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcjg5Jyk7XG4gICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgIG5vZGUuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3ZlcnRpY2FsJyk7XG4gICAgfVxuICAgIGlmIChjbGFzc0xpc3QpIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3Nlc0Zyb21DbGFzc0xpc3Qobm9kZSwgY2xhc3NMaXN0KTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgdGhlIHNwZWNpZmllZCBjbGFzc2VzIGFuZCBjb2xsZWN0aW5nIGFsbCBub25leGlzdGVudCBub2RlcyBpbiBgZXJyTm9kZXNgXG4gIGFkZENsYXNzZXNGcm9tQ2xhc3NMaXN0KG5vZGUsIGNsYXNzTGlzdCkge1xuICAgIGNvbnN0IGVyck5vZGVzID0gbmV3IEFycmF5KCk7XG5cbiAgICBmb3IgKGxldCBub2RlTmFtZSBpbiBjbGFzc0xpc3QpIHtcbiAgICAgIGNvbnN0IGNsYXNzQXJyID0gY2xhc3NMaXN0W25vZGVOYW1lXTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5vZGUsIG5vZGVOYW1lKSkge1xuICAgICAgICBlcnJOb2Rlcy5wdXNoKG5vZGVOYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoZXJyTm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3NBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAobm9kZU5hbWUgPT09ICd0aHVtYicpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbm9kZVtub2RlTmFtZV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgbm9kZVtub2RlTmFtZV1bal0uY2xhc3NMaXN0LmFkZChjbGFzc0FycltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGVbbm9kZU5hbWVdLmNsYXNzTGlzdC5hZGQoY2xhc3NBcnJbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlcnJOb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBtc2cgPVxuICAgICAgICBcIlRoZSBnaXZlbiBvYmplY3QgY29udGFpbnMgaXRlbXMgd2hpY2ggYXJlbid0IG5vZGVzIG9mIHRoaXMgc2xpZGVyOlwiICsgU2xpZGVyODkuYXJyYXlUb0xpc3RTdHJpbmcoZXJyTm9kZXMpICtcbiAgICAgICAgXCJGb2xsb3dpbmcgbm9kZXMgYXJlIHBhcnQgb2YgdGhpcyBzbGlkZXIncyBub2RlIHBvb2w6XCIgKyBTbGlkZXI4OS5hcnJheVRvTGlzdFN0cmluZyhPYmplY3Qua2V5cyhub2RlKSlcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5FcnJvcihtc2csICdjbGFzc0xpc3QnLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLVxuICBjcmVhdGVOZXdUaHVtYigpIHtcbiAgICBjb25zdCBuZXdUaHVtYiA9IHRoaXMudGh1bWJCYXNlLmNsb25lTm9kZSh0cnVlKTtcbiAgICBuZXdUaHVtYi5jbGFzc0xpc3QuYWRkKCdzbDg5LXRodW1iJyk7XG4gICAgaWYgKG5ld1RodW1iLnRhYmluZGV4ID09IG51bGwpIHtcbiAgICAgIG5ld1RodW1iLnRhYkluZGV4ID0gMDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBbIGV2ZW50TmFtZSwgY2FsbGJhY2sgXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLnRodW1iRXZlbnRzKSkge1xuICAgICAgbmV3VGh1bWIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgdGhpcy50aHVtYlBhcmVudC5hcHBlbmRDaGlsZChuZXdUaHVtYik7XG4gICAgcmV0dXJuIG5ld1RodW1iO1xuICB9XG5cbiAgbm9kZUhhc0Jhc2VFbGVtZW50T3duZXIobm9kZSkge1xuICAgIGZvciAoY29uc3QgWyBiYXNlTmFtZSwgZWxlbWVudCBdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuYmFzZUVsZW1lbnRzKSkge1xuICAgICAgaWYgKFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLmdldE5vZGVPd25lcihub2RlKSA9PT0gZWxlbWVudCkgcmV0dXJuIGJhc2VOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyAtLS0tIFN0YXRpYyBzdHlsZSBzaGVldCBjcmVhdGlvbiAtLS0tXG4gIC8vIE5PVEU6IEkgdGhpbmsgdGhhdCBhIGdsb2JhbCBPYmplY3QgKGxpa2UgU2xpZGVyODkpIGNhbm5vdCBiZSBpbiBtdWx0aXBsZVxuICAvLyBkb2N1bWVudHMgYXQgb25jZS4gVGh1cywganVzdCBzZXR0aW5nIGEgZ2xvYmFsIGZsYWcgdG8gdHJ1ZSBzaG91bGQgYmVcbiAgLy8gc3VmZmljaWVudCB0byBtYXJrIHRoZSBjdXJyZW50IGRvY3VtZW50IGFzIGFscmVhZHkgaW5qZWN0ZWQuXG4gIHN0YXRpYyBpbmplY3RTdHlsZVNoZWV0SWZOZWVkZWQoKSB7XG4gICAgaWYgKFNsaWRlcjg5RE9NQnVpbGRlci5oYXNJbmplY3RlZFN0eWxlc2hlZXQgPT09IGZhbHNlKSB7XG4gICAgICBjb25zdCBzdHlsZVNoZWV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBjb25zdCBmaXJzdEhlYWRDaGlsZCA9IGRvY3VtZW50LmhlYWQuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICAgIHN0eWxlU2hlZXRFbGVtZW50LnRleHRDb250ZW50ID0gZGVmYXVsdFN0eWxlc1N0cmluZztcblxuICAgICAgLy8gRW5zdXJlIHRoYXQgaXQgaXMgdGhlIGZpcnN0IHN0eWxlIHNoZWV0IGluIHRoZSBkb2N1bWVudFxuICAgICAgaWYgKGZpcnN0SGVhZENoaWxkKSB7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlU2hlZXRFbGVtZW50LCBmaXJzdEhlYWRDaGlsZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlU2hlZXRFbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgU2xpZGVyODlET01CdWlsZGVyLmhhc0luamVjdGVkU3R5bGVzaGVldCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGl0ZXJhdGUgdGhyb3VnaCBhIG5vZGUncyBjaGlsZHJlbiwgY29sbGVjdGluZyB0aGVtIGluIGFuIGFycmF5IGluIG9yZGVyLlxuICAgKiBXaGVuIHVzZWQgb24gYSB0aHVtYiBub2RlLCB0aGUgcmVzdWx0IGlzIGFuYWxvZ291cyB0byB7QGxpbmsgdGh1bWJDaGlsZHJlbn0uXG4gICAqIEBwYXJhbSB7IEhUTUxFbGVtZW50IH0gbm9kZSBUaGUgaW5wdXQgbm9kZS5cbiAgICogQHBhcmFtIHsgQXJyYXk8SFRNTEVsZW1lbnQ+IH0gY29sbGVjdG9yXG4gICAqIEByZXR1cm4geyBBcnJheTxIVE1MRWxlbWVudD4gfSBBbGwgY2hpbGRyZW4gb2YgdGhlIGlucHV0IG5vZGUuXG4gICAqL1xuICBzdGF0aWMgZmluZE5vZGVDaGlsZHJlbihub2RlLCBjb2xsZWN0b3IgPSBbXSkge1xuICAgIGlmIChub2RlLmNoaWxkRWxlbWVudENvdW50ID09PSAwKSByZXR1cm4gY29sbGVjdG9yO1xuXG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICBjb2xsZWN0b3IucHVzaChjaGlsZCk7XG4gICAgICBTbGlkZXI4OURPTUJ1aWxkZXIuZmluZE5vZGVDaGlsZHJlbihjaGlsZCwgY29sbGVjdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3RvcjtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQgU2xpZGVyODkgZnJvbSAnLi9TbGlkZXI4OS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlcjg5RXJyb3Ige1xuICBzdGF0aWMgQ09VTlRTID0gWydmaXJzdCcsICdzZWNvbmQnLCAndGhpcmQnLCAnZm91cnRoJywgJ2ZpZnRoJywgJ3NpeHRoJywgJ3NldmVudGgnLCAnZWlnaHRoJywgJ25pbnRoJ107XG5cbiAgc3RhdGljIEVycm9yID0gY2xhc3MgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobXNnLCB0YXJnZXQsIGFib3J0ID0gZmFsc2UpIHtcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgbXNnID0gJ0AgJyArIHRhcmdldCArICc6ICcgKyBtc2c7XG4gICAgICB9XG4gICAgICBpZiAobXNnW21zZy5sZW5ndGggLSAxXSAhPT0gJ1xcbicgJiYgbXNnW21zZy5sZW5ndGggLSAxXSAhPT0gJy4nKSB7XG4gICAgICAgIG1zZyArPSAnLic7XG4gICAgICB9XG4gICAgICBpZiAoYWJvcnQpIHtcbiAgICAgICAgbXNnICs9ICdcXG5BYm9ydGluZyB0aGUgc2xpZGVyIGNvbnN0cnVjdGlvbi4nO1xuICAgICAgfVxuXG4gICAgICBzdXBlcihtc2cpO1xuICAgICAgdGhpcy5uYW1lID0gJ1NsaWRlcjg5JyArIHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIENvbnN0cnVjdG9yIGVycm9yIC0tLS1cbiAgc3RhdGljIEluaXRpYWxpemF0aW9uRXJyb3IgPSBjbGFzcyBleHRlbmRzIFNsaWRlcjg5RXJyb3IuRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1zZykge1xuICAgICAgc3VwZXIobXNnLCAnY29uc3RydWN0b3InLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIFByb3BlcnR5IGVycm9ycyAtLS0tXG4gIHN0YXRpYyBQcm9wZXJ0eUVycm9yID0gY2xhc3MgZXh0ZW5kcyBTbGlkZXI4OUVycm9yLkVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihzbGlkZXIsIHByb3BlcnR5LCBtc2cpIHtcbiAgICAgIGxldCBwcmV2VmFsID0gc2xpZGVyW3Byb3BlcnR5XTtcbiAgICAgIGlmIChwcmV2VmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJldlZhbCkpIHtcbiAgICAgICAgICBwcmV2VmFsID0gJ1snICsgcHJldlZhbC5qb2luKCcsICcpICsgJ10nO1xuICAgICAgICB9XG4gICAgICAgIG1zZyArPSAnLlxcbkNvbnRpbnVpbmcgd2l0aCB0aGUgcHJldmlvdXMgdmFsdWUgKCcgKyBwcmV2VmFsICsgJykuJztcbiAgICAgIH1cblxuICAgICAgc3VwZXIobXNnLCBwcm9wZXJ0eSwgcHJldlZhbCA9PT0gdW5kZWZpbmVkKTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIFByb3BlcnR5VHlwZUVycm9yID0gY2xhc3MgZXh0ZW5kcyBTbGlkZXI4OUVycm9yLlByb3BlcnR5RXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlciwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eUluZm8sIHR5cGVNc2cpIHtcbiAgICAgIGxldCBtc2cgPVxuICAgICAgICAnVHlwZSBtaXNtYXRjaC4nXG4gICAgICAgICsgU2xpZGVyODkuZ2V0VHlwZUVycm9yTWVzc2FnZShwcm9wZXJ0eUluZm8uZGVzY3JpcHRvciwgdHlwZU1zZyk7XG5cbiAgICAgIHN1cGVyKHNsaWRlciwgcHJvcGVydHlOYW1lLCBtc2cpO1xuICAgIH1cbiAgfVxuXG4gIC8vIC0tLS0gTWV0aG9kIGVycm9ycyAtLS0tXG4gIHN0YXRpYyBNZXRob2RBcmdUeXBlRXJyb3IgPSBjbGFzcyBleHRlbmRzIFNsaWRlcjg5RXJyb3IuRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZE5hbWUsIGluZGV4LCB0eXBlTXNnKSB7XG4gICAgICBjb25zdCBhcmdJbmZvID0gU2xpZGVyODkuZ2V0TWV0aG9kQXJnSW5mbyhtZXRob2ROYW1lLCBpbmRleCk7XG4gICAgICBjb25zdCBtc2cgPVxuICAgICAgICAnVHlwZSBtaXNtYXRjaCBvbiB0aGUgJyArIFNsaWRlcjg5RXJyb3IuZ2V0TWV0aG9kQXJnTWVzc2FnZShhcmdJbmZvLCBpbmRleCkgKyAnLidcbiAgICAgICAgKyBTbGlkZXI4OS5nZXRUeXBlRXJyb3JNZXNzYWdlKGFyZ0luZm8uZGVzY3JpcHRvciwgdHlwZU1zZyk7XG5cbiAgICAgIHN1cGVyKG1zZywgbWV0aG9kTmFtZSk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBNZXRob2RBcmdPbWl0RXJyb3IgPSBjbGFzcyBleHRlbmRzIFNsaWRlcjg5RXJyb3IuRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1ldGhvZE5hbWUsIGluZGV4KSB7XG4gICAgICBjb25zdCBhcmdJbmZvID0gU2xpZGVyODkuZ2V0TWV0aG9kQXJnSW5mbyhtZXRob2ROYW1lLCBpbmRleCk7XG4gICAgICBjb25zdCBtc2cgPVxuICAgICAgICAnVGhlICcgKyBTbGlkZXI4OUVycm9yLmdldE1ldGhvZEFyZ01lc3NhZ2UoYXJnSW5mbywgaW5kZXgpXG4gICAgICAgICsgJyBoYXMgYmVlbiBvbWl0dGVkIGJ1dCBpdCBpcyByZXF1aXJlZCdcbiAgICAgICAgKyAnIChJdCBtdXN0IGJlIG9mIHR5cGUgJyArIFNsaWRlcjg5LlR5cGVDaGVjay5idWlsZERlc2NyaXB0b3JUeXBlTWVzc2FnZShhcmdJbmZvLmRlc2NyaXB0b3IpICsgJykuJztcblxuICAgICAgc3VwZXIobXNnLCBtZXRob2ROYW1lKTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIFN0cnVjdHVyZSBlcnJvcnMgLS0tLVxuICBzdGF0aWMgU3RydWN0dXJlRXJyb3IgPSBjbGFzcyBleHRlbmRzIFNsaWRlcjg5RXJyb3IuRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1zZykge1xuICAgICAgc3VwZXIobXNnLCAnc3RydWN0dXJlJywgdHJ1ZSk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBTdHJ1Y3R1cmVQYXJzZUVycm9yID0gY2xhc3MgZXh0ZW5kcyBTbGlkZXI4OUVycm9yLlN0cnVjdHVyZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihiZWZvcmVGYWlsdXJlLCBwb2ludE9mRmFpbHVyZSkge1xuICAgICAgY29uc3QgbXNnID1cbiAgICAgICAgXCJTb21ldGhpbmcgaGFzIGJlZW4gZGVjbGFyZWQgd3JvbmdseSBhbmQgY291bGRuJ3QgYmUgcGFyc2VkLiBQb2ludCBvZiBmYWlsdXJlIFwiXG4gICAgICAgICsgXCIoYmVmb3JlIFwiICsgYmVmb3JlRmFpbHVyZSArIFwiKTpcXG5cXG5cIlxuICAgICAgICArIHBvaW50T2ZGYWlsdXJlICsgJ1xcbic7XG4gICAgICBzdXBlcihtc2cpO1xuICAgIH1cbiAgfVxuXG4gIC8vIC0tLS0gSGVscGVyIGZ1bmN0aW9ucyAtLS0tXG4gIHN0YXRpYyBnZXRUeXBlRXJyb3JNZXNzYWdlKGRlc2NyaXB0b3IsIHR5cGVNc2cpIHtcbiAgICByZXR1cm4gJyBFeHBlY3RlZCAnICsgU2xpZGVyODkuVHlwZUNoZWNrLmJ1aWxkRGVzY3JpcHRvclR5cGVNZXNzYWdlKGRlc2NyaXB0b3IpICsgJywnXG4gICAgICAgICArICcgZ290ICcgKyB0eXBlTXNnO1xuICB9XG5cbiAgc3RhdGljIGdldE1ldGhvZEFyZ01lc3NhZ2UoYXJnSW5mbywgaW5kZXgpIHtcbiAgICBsZXQgbXNnID0gJyc7XG4gICAgaWYgKGFyZ0luZm8ub3B0aW9uYWwpIHtcbiAgICAgIG1zZyArPSAnb3B0aW9uYWwgJztcbiAgICB9XG4gICAgbXNnICs9IFNsaWRlcjg5LkNPVU5UU1tpbmRleF0gKyAnIGFyZ3VtZW50ICgnICsgYXJnSW5mby5uYW1lICsgJyknO1xuICAgIHJldHVybiBtc2c7XG4gIH1cblxuICBzdGF0aWMgZ2V0TWV0aG9kQXJnSW5mbyhtZXRob2ROYW1lLCBpbmRleCkge1xuICAgIHJldHVybiBTbGlkZXI4OS5tZXRob2REYXRhW21ldGhvZE5hbWVdLmFyZ3NbaW5kZXhdO1xuICB9XG5cbiAgc3RhdGljIGFycmF5VG9MaXN0U3RyaW5nKGFycikge1xuICAgIHJldHVybiAnXFxuIC0gXCInICsgYXJyLmpvaW4oJ1wiXFxuIC0gXCInKSArICdcIlxcbic7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBTbGlkZXI4OSBmcm9tICcuL1NsaWRlcjg5LmpzJztcbmltcG9ydCBTbGlkZXI4OUJhc2UgZnJvbSAnLi9TbGlkZXI4OUJhc2UuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXI4OUV2ZW50cyBleHRlbmRzIFNsaWRlcjg5QmFzZSB7XG4gIHN0YXRpYyBldmVudFR5cGVzID0gW1xuICAgICdzdGFydCcsXG4gICAgJ21vdmUnLFxuICAgICdlbmQnLFxuICAgICdjaGFuZ2U6JHByb3BlcnR5J1xuICBdO1xuXG5cbiAgZXZlbnRMaXN0ID0ge307IC8vIFN0b3JpbmcgZXZlbnQgZGF0YSAobW9zdCBub3RhYmx5IHRoZSBpZGVudGlmaWVyKSBmb3IgZXZlbnQgcmVtb3ZhYmlsaXR5XG4gIGV2ZW50SUQgPSAwO1xuXG5cbiAgLy8gLS0tLSBDbGFzcyBtZXRob2RzIC0tLS1cbiAgYWRkRXZlbnQodHlwZSwgZm4sIG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tFdmVudFR5cGUodHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5FcnJvcihcbiAgICAgICAgJ1RoZSBzcGVjaWZpZWQgZXZlbnQgdHlwZSDigJgnICsgdHlwZSArICfigJkgaXMgbm90IHZhbGlkLiBBdmFpbGFibGUgdHlwZXMgYXJlOicgKyBTbGlkZXI4OS5hcnJheVRvTGlzdFN0cmluZyhTbGlkZXI4OUV2ZW50cy5ldmVudFR5cGVzKSxcbiAgICAgICAgJ2FkZEV2ZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMudmFscy5ldmVudHNbdHlwZV0pKSB0aGlzLnZhbHMuZXZlbnRzW3R5cGVdID0gbmV3IEFycmF5KCk7XG4gICAgdGhpcy52YWxzLmV2ZW50c1t0eXBlXS5wdXNoKGZuKTtcbiAgICBjb25zdCBrZXkgPSBuYW1lIHx8IHRoaXMuZXZlbnRJRDtcbiAgICBjb25zdCBvYmogPSB7XG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgZm46IGZuXG4gICAgfTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuZXZlbnRMaXN0W2tleV0pKSB0aGlzLmV2ZW50TGlzdFtrZXldID0gbmV3IEFycmF5KCk7XG4gICAgICB0aGlzLmV2ZW50TGlzdFtrZXldLnB1c2gob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ldmVudExpc3Rba2V5XSA9IG9iajtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUgfHwgdGhpcy5ldmVudElEKys7XG4gIH1cbiAgcmVtb3ZlRXZlbnQoa2V5KSB7XG4gICAgY29uc3QgZXZlbnRJbmZvID0gdGhpcy5ldmVudExpc3Rba2V5XTtcbiAgICBpZiAoIWV2ZW50SW5mbykgcmV0dXJuIGZhbHNlO1xuICAgIGRlbGV0ZSB0aGlzLmV2ZW50TGlzdFtrZXldO1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGV2ZW50SW5mbylcbiAgICAgID8gZXZlbnRJbmZvLnJlZHVjZSh0aGlzLmhhbmRsZVJlbW92ZUV2ZW50LmJpbmQodGhpcyksIG5ldyBBcnJheSgpKVxuICAgICAgOiB0aGlzLmhhbmRsZVJlbW92ZUV2ZW50KG5ldyBBcnJheSgpLCBldmVudEluZm8pO1xuICB9XG5cblxuICAvLyAtLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLVxuICBoYW5kbGVSZW1vdmVFdmVudChkZWxldGVDb2xsZWN0aW9uLCBldmVudEluZm8pIHtcbiAgICBjb25zdCB0eXBlRXZlbnRzID0gdGhpcy52YWxzLmV2ZW50c1tldmVudEluZm8udHlwZV07XG4gICAgY29uc3QgZGVsZXRlZCA9IHR5cGVFdmVudHMuc3BsaWNlKHR5cGVFdmVudHMuaW5kZXhPZihldmVudEluZm8uZm4pLCAxKVswXTtcbiAgICBpZiAodHlwZUV2ZW50cy5sZW5ndGggPT09IDApIGRlbGV0ZSB0aGlzLnZhbHMuZXZlbnRzW2V2ZW50SW5mby50eXBlXTtcbiAgICBkZWxldGVDb2xsZWN0aW9uLnB1c2goZGVsZXRlZCk7XG4gICAgcmV0dXJuIGRlbGV0ZUNvbGxlY3Rpb247XG4gIH1cblxuICBpbnZva2VFdmVudCh0eXBlcykge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgYXJnc1swXSA9IHRoaXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgZnVuY3Rpb25zID0gdGhpcy52YWxzLmV2ZW50c1t0eXBlc1tpXV07XG4gICAgICBpZiAoZnVuY3Rpb25zKSB7XG4gICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgZnVuY3Rpb25zLmxlbmd0aDsgbisrKSB7XG4gICAgICAgICAgZnVuY3Rpb25zW25dLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2hlY2tFdmVudFR5cGUodHlwZSkge1xuICAgIGlmICh0eXBlLmluZGV4T2YoJ2NoYW5nZTonKSA9PT0gMCkge1xuICAgICAgLy8gRWRnZSBjYXNlIGZvciAnY2hhbmdlOiRwcm9wZXJ0eSdcbiAgICAgIGNvbnN0IGN1c3RvbVByb3AgPSB0eXBlLnNsaWNlKCdjaGFuZ2U6Jy5sZW5ndGgpO1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy52YWxzLCBjdXN0b21Qcm9wKSkge1xuICAgICAgICBjb25zdCBtc2cgPVxuICAgICAgICAgIFwi4oCYXCIgKyB0eXBlICsgXCLigJkgcmVmZXJzIHRvIOKAmFwiICsgY3VzdG9tUHJvcCArIFwi4oCZLCB3aGljaCBpc24ndCBhIHJlY29nbml6ZWQgcHJvcGVydHkuIFwiXG4gICAgICAgICAgKyBcIkNoZWNrIGl0cyBzcGVsbGluZyBhbmQgYmUgYXdhcmUgdGhhdCBjdXN0b20gcHJvcGVydGllcyBuZWVkIHRvIGJlIGluaXRpYWxpemVkXCI7XG4gICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5FcnJvcihtc2csICdhZGRFdmVudCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoU2xpZGVyODlFdmVudHMuZXZlbnRUeXBlcy5pbmRleE9mKHR5cGUpID09PSAtMSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQgU2xpZGVyODkgZnJvbSAnLi9TbGlkZXI4OS5qcyc7XG5pbXBvcnQgU2xpZGVyODlFdmVudHMgZnJvbSAnLi9TbGlkZXI4OUV2ZW50cy5qcyc7XG5pbXBvcnQgU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIgZnJvbSAnLi9TbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlcjg5UHJvcGVydGllcyBleHRlbmRzIFNsaWRlcjg5RXZlbnRzIHtcbiAgLy8gLS0tLS0tIE9iamVjdCBkZWZpbml0aW9uIC0tLS0tLVxuICBkZWZpbmVEZWVwUHJvcGVydHkodGFyZ2V0LCBpdGVtLCBlbmRwb2ludCwgcG9zdFNldHRlciwgaXNEZWVwRGVmaW5lZEFycmF5KSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgaXRlbSwge1xuICAgICAgc2V0OiAodmFsKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsKSB7XG4gICAgICAgICAgdmFyIHByZXZWYWwgPSAoaXNEZWVwRGVmaW5lZEFycmF5ID8gQXJyYXkuZnJvbSh0aGlzW2l0ZW1dKSA6IHRoaXNbaXRlbV0pO1xuICAgICAgICB9XG4gICAgICAgIGVuZHBvaW50W2l0ZW1dID0gdmFsO1xuICAgICAgICBpZiAoaXNEZWVwRGVmaW5lZEFycmF5KSB7XG4gICAgICAgICAgLy8gVGhlIGVuZHBvaW50cyAoc2VlIGRvYyBjb21tZW50IGF0IHRoZSBzdGFydCBvZiBmaWxlKSBhcmUgZGVmaW5lZCBmcm9tIGJvdHRvbSB0byB0b3BcbiAgICAgICAgICAvLyBUaGlzIGVuc3VyZXMgY29tcGF0aWJpbGl0eSB3aXRoIGdldHRlcnMvc2V0dGVyc1xuICAgICAgICAgIHRoaXMuZGVmaW5lRGVlcEFycmF5SW50ZXJtZWRpYXRlVmFscyhpdGVtLCB2YWwpO1xuICAgICAgICAgIHRoaXMuZGVmaW5lRGVlcEFycmF5SW50ZXJtZWRpYXRlVGhpcyhpdGVtLCB2YWwsIHRoaXMucHJvcGVydGllc1tpdGVtXS5rZXlTZXR0ZXIsIHRoaXMucHJvcGVydGllc1tpdGVtXS5rZXlHZXR0ZXIpO1xuICAgICAgICAgIHRoaXMuaGFuZGxlSW50ZXJuYWxEZWVwQXJyYXlDaGFuZ2UoaXRlbSwgcHJldlZhbCwgdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZUludGVybmFsUHJvcGVydHlDaGFuZ2UoaXRlbSwgcHJldlZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBvc3RTZXR0ZXIpIHtcbiAgICAgICAgICBwb3N0U2V0dGVyKHZhbCwgcHJldlZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIChpc0RlZXBEZWZpbmVkQXJyYXkgPyB0aGlzLnZhbHMuJGludGVybWVkaWF0ZVZhbHMgOiBlbmRwb2ludClbaXRlbV07XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLy8gLS0tLS0tIE9iamVjdCBkZWZpbml0aW9ucyBmb3IgdGhlIGtleXMvaW5kZXhlcyBvZiBkZWVwbHkgZGVmaW5lZCBhcnJheXMgLS0tLS0tXG4gIGRlZmluZURlZXBBcnJheUludGVybWVkaWF0ZVRoaXMocGFyZW50SXRlbSwgcGFyZW50VmFsdWUsIGtleVNldHRlciwga2V5R2V0dGVyKSB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLnZhbHM7XG5cbiAgICB0aGlzLnZhbHMuJGludGVybWVkaWF0ZVRoaXNbcGFyZW50SXRlbV0gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcmVudFZhbHVlW2ldO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy52YWxzLiRpbnRlcm1lZGlhdGVUaGlzW3BhcmVudEl0ZW1dLCBpLCB7XG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgaWYgKCFrZXlTZXR0ZXIgfHwgIWtleVNldHRlcih2YWwsIGkpKSB7XG4gICAgICAgICAgICBlbmRwb2ludFtwYXJlbnRJdGVtXVtpXSA9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIChrZXlHZXR0ZXIgPyBrZXlHZXR0ZXIoZW5kcG9pbnRbcGFyZW50SXRlbV1baV0sIGkpIDogZW5kcG9pbnRbcGFyZW50SXRlbV1baV0pO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIC8vIFRoaXMgYXNzaWdubWVudCBpcyBuZWNlc3NhcnkgdG8gaW52b2tlIGEgcG90ZW50aWFsIGtleVNldHRlciAoZS5nLiBmcm9tIGB2YWx1ZXNgKVxuICAgICAgdGhpcy52YWxzLiRpbnRlcm1lZGlhdGVUaGlzW3BhcmVudEl0ZW1dW2ldID0gcGFyZW50VmFsdWVbaV07XG4gICAgfVxuICB9XG4gIGRlZmluZURlZXBBcnJheUludGVybWVkaWF0ZVZhbHMocGFyZW50SXRlbSwgcGFyZW50VmFsdWUpIHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMudmFscy4kO1xuXG4gICAgdGhpcy52YWxzLiRpbnRlcm1lZGlhdGVWYWxzW3BhcmVudEl0ZW1dID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnRWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdmFsdWUgPSBwYXJlbnRWYWx1ZVtpXTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMudmFscy4kaW50ZXJtZWRpYXRlVmFsc1twYXJlbnRJdGVtXSwgaSwge1xuICAgICAgICBzZXQ6ICh2YWwpID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgICAgdmFyIHByZXZWYWwgPSBBcnJheS5mcm9tKHRoaXNbcGFyZW50SXRlbV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbmRwb2ludFtwYXJlbnRJdGVtXVtpXSA9IHZhbDtcbiAgICAgICAgICB0aGlzLmhhbmRsZUludGVybmFsRGVlcEFycmF5Q2hhbmdlKHBhcmVudEl0ZW0sIHByZXZWYWwsIG51bGwsIGkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gZW5kcG9pbnRbcGFyZW50SXRlbV1baV07XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gLS0tLS0tIFByb3BlcnR5IGNoYW5nZSB0cmFja2luZyAtLS0tLS1cbiAgLy8gYHRoYXRgIGl0ZW1zIGFyZSBjb21wYXJlZCB0byBhY2NvbW9kYXRlIGZvciBnZXR0ZXJzIChlLmcuIGB2YWx1ZWAgKHByZWNpc2lvbikpXG4gIGhhbmRsZUludGVybmFsUHJvcGVydHlDaGFuZ2UoaXRlbSwgcHJldlZhbCkge1xuICAgIC8vIE9iamVjdCB0eXBlcyAoYXJyYXlzIGluY2x1ZGVkKSBhbHdheXMgaW52b2tlIGEgdmFyaWFibGUgdXBkYXRlXG4gICAgLy8gZHVlIHRvIGluYWJpbGl0eSB0byBkZWVwbHkgY29tcGFyZSB0aGVtIChlZmZpY2llbnRseSlcbiAgICBpZiAoIXRoaXMuaW5pdGlhbCAmJiAodHlwZW9mIHRoaXNbaXRlbV0gPT09ICdvYmplY3QnIHx8IHByZXZWYWwgIT09IHRoaXNbaXRlbV0pKSB7XG4gICAgICB0aGlzLnVwZGF0ZVBvdGVudGlhbFN0cnVjdHVyZVZhcihpdGVtKTtcbiAgICAgIHRoaXMuaW52b2tlRXZlbnQoWydjaGFuZ2U6JyArIGl0ZW1dLCBwcmV2VmFsKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlSW50ZXJuYWxEZWVwQXJyYXlDaGFuZ2UoaXRlbSwgcHJldlZhbCwgdmFsLCBkZWVwRGVmaW5lZEluZGV4KSB7XG4gICAgaWYgKCF0aGlzLmluaXRpYWwpIHtcbiAgICAgIHRoaXMudXBkYXRlUG90ZW50aWFsU3RydWN0dXJlVmFyKGl0ZW0pO1xuICAgICAgaWYgKGRlZXBEZWZpbmVkSW5kZXggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmludm9rZURlZXBBcnJheUNoYW5nZUV2ZW50KGl0ZW0sIHByZXZWYWwsIGRlZXBEZWZpbmVkSW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLmludm9rZURlZXBBcnJheUNoYW5nZUV2ZW50KGl0ZW0sIHByZXZWYWwsIGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW52b2tlRGVlcEFycmF5Q2hhbmdlRXZlbnQoaXRlbSwgcHJldlZhbCwgZGVlcERlZmluZWRJbmRleCkge1xuICAgIGlmIChwcmV2VmFsW2RlZXBEZWZpbmVkSW5kZXhdICE9PSB0aGlzW2l0ZW1dW2RlZXBEZWZpbmVkSW5kZXhdKSB7XG4gICAgICB0aGlzLmludm9rZUV2ZW50KFsnY2hhbmdlOicgKyBpdGVtXSwgcHJldlZhbCwgZGVlcERlZmluZWRJbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tLSBTdHJ1Y3R1cmUgdmFyaWFibGVzIC0tLS1cbiAgdXBkYXRlUG90ZW50aWFsU3RydWN0dXJlVmFyKHByb3BOYW1lKSB7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5kb21CdWlsZGVyLnN0cnVjdHVyZVZhcnMsIHByb3BOYW1lKSkgcmV0dXJuO1xuXG4gICAgZm9yIChjb25zdCBbIHN0ciwgbm9kZUxpc3QgXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmRvbUJ1aWxkZXIuc3RydWN0dXJlVmFyc1twcm9wTmFtZV0pKSB7XG4gICAgICB0aGlzLnJlcGxhY2VTdHJ1Y3R1cmVWYXJTdHJpbmcoc3RyLCBub2RlTGlzdCk7XG4gICAgfVxuICB9XG5cbiAgcmVwbGFjZVN0cnVjdHVyZVZhclN0cmluZyhzdHIsIG5vZGVMaXN0KSB7XG4gICAgY29uc3QgcmVwbGFjZWRTdHIgPSBzdHIucmVwbGFjZShTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5yZWdleC52YXJpYWJsZSwgKG1hdGNoLCB2YXJpYWJsZURlbGltaXQsIHZhcmlhYmxlKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRWYWx1ZUZyb21TdHJ1Y3R1cmVWYXIodmFyaWFibGVEZWxpbWl0IHx8IHZhcmlhYmxlKTtcbiAgICB9KTtcbiAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZUxpc3QpIHtcbiAgICAgIHRoaXMucmVwbGFjZVN0cnVjdHVyZVZhckluTm9kZShub2RlLCByZXBsYWNlZFN0cik7XG4gICAgfVxuICB9XG4gIHJlcGxhY2VTdHJ1Y3R1cmVWYXJJbk5vZGUobm9kZSwgcmVwbGFjZWRTdHIpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IEl0ZXJhdGUgb3ZlciBldmVyeSB0aHVtYlxuICAgIGNvbnN0IGJhc2VOYW1lID0gdGhpcy5kb21CdWlsZGVyLm5vZGVIYXNCYXNlRWxlbWVudE93bmVyKG5vZGUpO1xuICAgIGlmIChiYXNlTmFtZSkge1xuICAgICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLnZhbHMubm9kZVtiYXNlTmFtZV07XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5BVFRSSUJVVEVfTk9ERSkge1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgIGVsZW1lbnQuZ2V0QXR0cmlidXRlTm9kZShub2RlLm5hbWUpLnRleHRDb250ZW50ID0gcmVwbGFjZWRTdHI7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhlIHRleHQgbm9kZSBpcyBhbHdheXMgdGhlIGZpcnN0IGNoaWxkXG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgZWxlbWVudC5jaGlsZE5vZGVzWzBdLnRleHRDb250ZW50ID0gcmVwbGFjZWRTdHI7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBub2RlLnRleHRDb250ZW50ID0gcmVwbGFjZWRTdHI7XG4gICAgfVxuICB9XG5cbiAgZ2V0VmFsdWVGcm9tU3RydWN0dXJlVmFyKHZhck5hbWUpIHtcbiAgICBjb25zdCByZWN1cnNpdmVWYXIgPSB2YXJOYW1lLnNwbGl0KCcuJyk7XG4gICAgbGV0IHZhbHVlID0gdGhpc1tyZWN1cnNpdmVWYXJbMF1dO1xuICAgIGlmIChyZWN1cnNpdmVWYXIubGVuZ3RoID4gMSkge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCByZWN1cnNpdmVWYXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlW3JlY3Vyc2l2ZVZhcltpXV07XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU2xpZGVyODkuU3RydWN0dXJlRXJyb3IoXCJWYXJpYWJsZSDigJhcIiArIHZhck5hbWUgKyBcIuKAmSBjYW5ub3QgYWNjZXNzIHByb3BlcnR5IOKAmFwiICsgcmVjdXJzaXZlVmFyW2ldICsgXCLigJkgb24gXCIgKyB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5pbXBvcnQgU2xpZGVyODkgZnJvbSAnLi9TbGlkZXI4OS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyIHtcbiAgLy8gLS0tLSBTdGF0aWMgcHJvcGVydGllcyAtLS0tXG4gIC8vIFN0YXRpYyBpbml0aWFsaXphdGlvbiBibG9ja3MgZG9uJ3Qgd29yayB3aXRoIG15IGN1cnJlbnQgd29ya2Zsb3dcbiAgc3RhdGljIHJlZ2V4ID0gKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHJlZyA9IHtcbiAgICAgIGF0dHI6IHtcbiAgICAgICAgbmFtZTogJ1tcXFxcdy1dKydcbiAgICAgIH0sXG4gICAgICBhbGw6ICdbXFxcXGRcXFxcRF0nLFxuICAgICAgY2FwTmFtZTogJyhbXFxcXHctXSspJyxcbiAgICB9O1xuICAgIHJlZy5hdHRyLnZhbHVlID0gJyg/Oig/ITwpJyArIHJlZy5hbGwgKyAnKSo/JztcbiAgICByZWcudGFnVHlwZSA9ICcoPzpcXFxccysnICsgcmVnLmNhcE5hbWUgKyAnKT8nO1xuICAgIHJlZy5jb250ZW50ID0gJyg/OlxcXFxzK1wiKCcgKyByZWcuYWxsICsgJys/KVwiKT8nO1xuICAgIHJlZy5hdHRyaWJzID0gJyg/OlxcXFxzKycgKyByZWcuYXR0ci5uYW1lICsgJz1cXFxcWycgKyByZWcuYXR0ci52YWx1ZSArICdcXFxcXSkqJztcbiAgICByZWcudmFyQ29udGVudCA9ICdcXFxcJCgoPzpcXFxcdysoPzpcXFxcLig/PVxcXFx3KSk/KSspJztcblxuICAgIGNvbnN0IHJneCA9IHtcbiAgICAgIHZhcmlhYmxlOiAnXFxcXHsnICsgcmVnLnZhckNvbnRlbnQgKyAnXFxcXH18JyArIHJlZy52YXJDb250ZW50LFxuICAgICAgYXR0cmlidXRlczogJygnICsgcmVnLmF0dHIubmFtZSArICcpPVxcXFxbKCcgKyByZWcuYXR0ci52YWx1ZSArICcpXFxcXF0oPzpcXFxccyt8JCknLFxuICAgICAgdGFnOiAnPChbLzpdKT8nICsgcmVnLmNhcE5hbWUgKyByZWcudGFnVHlwZSArIHJlZy5jb250ZW50ICsgJygnICsgcmVnLmF0dHJpYnMgKyAnKVxcXFxzKj8+XFxcXHMqJ1xuICAgIH07XG5cbiAgICBjb25zdCBmaW5hbEV4cHJlc3Npb25zID0ge307XG4gICAgLy8gRVM1IGNhbid0IGBuZXcgUmVnRXhwYCBmcm9tIGFub3RoZXIgUmVnRXhwXG4gICAgZm9yIChsZXQgZXhwciBpbiByZ3gpIHtcbiAgICAgIGZpbmFsRXhwcmVzc2lvbnNbZXhwcl0gPSBuZXcgUmVnRXhwKHJneFtleHByXSwgJ2cnKTtcbiAgICB9XG4gICAgZmluYWxFeHByZXNzaW9ucy52YXJpYWJsZU5vRmxhZyA9IG5ldyBSZWdFeHAocmd4LnZhcmlhYmxlKTtcblxuICAgIHJldHVybiBmaW5hbEV4cHJlc3Npb25zO1xuICB9KCkpO1xuXG5cbiAgLy8gLS0tLSBQcm9wZXJ0aWVzIC0tLS1cbiAgc3RydWN0dXJlVmFycyA9IHt9O1xuICB0aHVtYkNoaWxkcmVuID0gW107XG5cbiAgdmFscztcblxuXG4gIGNvbnN0cnVjdG9yKHZhbHMpIHtcbiAgICB0aGlzLnZhbHMgPSB2YWxzO1xuICB9XG5cblxuICAvLyAtLS0tIFN0cnVjdHVyZSBwYXJzZXIgLS0tLVxuICBwYXJzZVN0cnVjdHVyZShzdHJ1Y3R1cmVTdHIpIHtcbiAgICBjb25zdCBub2RlID0ge1xuICAgICAgc2xpZGVyOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIH07XG5cbiAgICBzdHJ1Y3R1cmVTdHIgPSBzdHJ1Y3R1cmVTdHIudHJpbSgpO1xuXG4gICAgLy8gUmVzZXQgdGhlIGdsb2JhbCBSZWdFeHAtaW50ZXJuYWwgYGxhc3RJbmRleGAgZmxhZ1xuICAgIC8vIFRoaXMgd291bGQgb3RoZXJ3aXNlIGNsYXNoIHdpdGggbXVsdGlwbGUgc2xpZGVyIGluc3RhbmNlcywgYmVjYXVzZSB0aGUgcmVnZXhlcyBhcmUgZ2xvYmFsXG4gICAgZm9yIChjb25zdCByZWdleHBOYW1lIGluIFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnJlZ2V4KSB7XG4gICAgICBpZiAoU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIucmVnZXhbcmVnZXhwTmFtZV0uZ2xvYmFsKSB7XG4gICAgICAgIFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnJlZ2V4W3JlZ2V4cE5hbWVdLmxhc3RJbmRleCA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgQXJyYXkoKTtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gMDtcbiAgICBsZXQgaXNUaHVtYkNoaWxkID0gZmFsc2U7XG4gICAgbGV0IG1hdGNoO1xuICAgIC8vIG1hdGNoOiBbbWF0Y2hlZFN0ciwgdHlwZSwgbmFtZSwgdGFnLCBpbm5lckNvbnRlbnQsIGF0dHJpYnV0ZXNdXG4gICAgd2hpbGUgKG1hdGNoID0gU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIucmVnZXgudGFnLmV4ZWMoc3RydWN0dXJlU3RyKSkge1xuICAgICAgaWYgKG1hdGNoLmluZGV4ICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgY29uc3QgYmVmb3JlRmFpbHVyZSA9ICd0YWcg4oCYPCcgKyAobWF0Y2hbMV0gfHwgJycpICsgbWF0Y2hbMl0gKyAnPuKAmSc7XG4gICAgICAgIGNvbnN0IHBvaW50T2ZGYWlsdXJlID0gc3RydWN0dXJlU3RyLnNsaWNlKGN1cnJlbnRJbmRleCwgbWF0Y2guaW5kZXgpLnRyaW0oKTtcbiAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlN0cnVjdHVyZVBhcnNlRXJyb3IoYmVmb3JlRmFpbHVyZSwgcG9pbnRPZkZhaWx1cmUpO1xuICAgICAgfVxuICAgICAgY3VycmVudEluZGV4ID0gU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIucmVnZXgudGFnLmxhc3RJbmRleDtcblxuICAgICAgaWYgKG1hdGNoWzFdICE9PSAnLycpIHtcbiAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuYXNzZW1ibGVFbGVtZW50KG5vZGUsIG1hdGNoWzJdLCBtYXRjaFszXSwgbWF0Y2hbNF0sIG1hdGNoWzVdKTtcbiAgICAgICAgbm9kZVttYXRjaFsyXV0gPSBlbGVtO1xuICAgICAgICBub2RlW3N0YWNrW3N0YWNrLmxlbmd0aCAtIDFdIHx8ICdzbGlkZXInXS5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgICAgaWYgKG1hdGNoWzFdID09IG51bGwpIHtcbiAgICAgICAgICBzdGFjay5wdXNoKG1hdGNoWzJdKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBEZXRlY3RpbmcgdGh1bWIgc28gdGhhdCB3ZSBrbm93IHdoZW4gd2UgYXJlIGluc2lkZSBpdFxuICAgICAgICBpZiAobWF0Y2hbMl0gPT09ICd0aHVtYicpIHtcbiAgICAgICAgICBpc1RodW1iQ2hpbGQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKGlzVGh1bWJDaGlsZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMudGh1bWJDaGlsZHJlbi5wdXNoKG1hdGNoWzJdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbGFzdEl0ZW0gPSBzdGFjay5wb3AoKTtcbiAgICAgICAgaWYgKGxhc3RJdGVtICE9PSBtYXRjaFsyXSkge1xuICAgICAgICAgIGlmIChzdGFjay5pbmRleE9mKG1hdGNoWzJdKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2luZ1RhZ0Vycm9yKGxhc3RJdGVtKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlN0cnVjdHVyZUVycm9yKFxuICAgICAgICAgICAgICBcIlRoZSBjbG9zaW5nIHRhZyDigJg8L1wiICsgbWF0Y2hbMl0gKyBcIj7igJkgY291bGRuJ3QgZmluZCBhIG1hdGNoaW5nIG9wZW5pbmcgdGFnXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdEl0ZW0gPT09ICd0aHVtYicpIHtcbiAgICAgICAgICBpc1RodW1iQ2hpbGQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjdXJyZW50SW5kZXggIT09IHN0cnVjdHVyZVN0ci5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVQYXJzZUVycm9yKCdlbmQgb2Ygc3RyaW5nJywgc3RydWN0dXJlU3RyLnNsaWNlKGN1cnJlbnRJbmRleCkpO1xuICAgIH1cbiAgICBpZiAoc3RhY2subGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlN0cnVjdHVyZUVycm9yKFxuICAgICAgICBcIkNvdWxkbid0IGZpbmQgYSBtYXRjaGluZyBjbG9zaW5nIHRhZyBmb3IgZm9sbG93aW5nIGVsZW1lbnRzOlwiICsgU2xpZGVyODkuYXJyYXlUb0xpc3RTdHJpbmcoc3RhY2spKTtcbiAgICB9IGVsc2UgaWYgKHN0YWNrLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGhpcy5jbG9zaW5nVGFnRXJyb3Ioc3RhY2tbMF0pO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgYXNzZW1ibGVFbGVtZW50KG5vZGUsIG5hbWUsIHRhZywgY29udGVudCwgYXR0cmlidXRlcykge1xuICAgIGlmIChuYW1lIGluIG5vZGUpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVFcnJvcihcbiAgICAgICAgJ0V2ZXJ5IGVsZW1lbnQgbXVzdCBoYXZlIGEgdW5pcXVlIG5hbWUgYnV0IHRoZXJlIGFyZSBtdXRpcGxlIGVsZW1lbnRzIGNhbGxlZCDigJgnICsgbmFtZSArICfigJknKTtcbiAgICB9XG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnIHx8ICdkaXYnKTtcblxuICAgIGlmIChjb250ZW50ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCk7XG4gICAgICB0ZXh0Tm9kZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKHRleHROb2RlKTtcblxuICAgICAgaWYgKFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnN0cmluZ0hhc1ZhcmlhYmxlKGNvbnRlbnQpKSB7XG4gICAgICAgIHRoaXMucGFyc2VWYXJpYWJsZXMoY29udGVudCwgdGV4dE5vZGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICBsZXQgbWF0Y2g7XG4gICAgICB3aGlsZSAobWF0Y2ggPSBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5yZWdleC5hdHRyaWJ1dGVzLmV4ZWMoYXR0cmlidXRlcykpIHtcbiAgICAgICAgY29uc3QgYXR0cmliTmFtZSA9IG1hdGNoWzFdO1xuICAgICAgICBjb25zdCBhdHRyaWJWYWx1ZSA9IG1hdGNoWzJdO1xuXG4gICAgICAgIGNvbnN0IGF0dHJpYk5vZGUgPSBkb2N1bWVudC5jcmVhdGVBdHRyaWJ1dGUoYXR0cmliTmFtZSk7XG4gICAgICAgIGF0dHJpYk5vZGUudGV4dENvbnRlbnQgPSBhdHRyaWJWYWx1ZTtcbiAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGVOb2RlKGF0dHJpYk5vZGUpO1xuXG4gICAgICAgIGlmIChTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5zdHJpbmdIYXNWYXJpYWJsZShhdHRyaWJWYWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLnBhcnNlVmFyaWFibGVzKGF0dHJpYlZhbHVlLCBhdHRyaWJOb2RlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtO1xuICB9XG5cbiAgLy8gLS0tLSBTdHJ1Y3R1cmUgdmFyaWFibGVzIHJlZ2lzdGVyIC0tLS1cbiAgcGFyc2VWYXJpYWJsZXMoc3RyLCB0YXJnZXROb2RlKSB7XG4gICAgLy8gTWVtb3JpemUgJiBza2lwIGFscmVhZHkgaGFuZGxlZCB2YXJpYWJsZXMgZm9yIHRoZSBjdXJyZW50IHN0cmluZ1xuICAgIGNvbnN0IHByb3BOYW1lQ2FjaGUgPSBuZXcgQXJyYXkoKTtcbiAgICBsZXQgbWF0Y2g7XG4gICAgd2hpbGUgKG1hdGNoID0gU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIucmVnZXgudmFyaWFibGUuZXhlYyhzdHIpKSB7XG4gICAgICBjb25zdCB2YXJOYW1lID0gbWF0Y2hbMV0gfHwgbWF0Y2hbMl07XG4gICAgICBjb25zdCBwcm9wTmFtZSA9IHZhck5hbWUuaW5kZXhPZignLicpICE9PSAtMVxuICAgICAgICA/IHZhck5hbWUuc2xpY2UoMCwgdmFyTmFtZS5pbmRleE9mKCcuJykpXG4gICAgICAgIDogdmFyTmFtZTtcblxuICAgICAgaWYgKCFwcm9wTmFtZUNhY2hlLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLnZhbHMsIHByb3BOYW1lKSkge1xuICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVFcnJvcihcbiAgICAgICAgICAgIFwi4oCYXCIgKyBwcm9wTmFtZSArIFwi4oCZIGlzIG5vdCBhIHJlY29nbml6ZWQgcHJvcGVydHkgYW5kIGNhbm5vdCBiZSB1c2VkIGFzIHZhcmlhYmxlLiBQbGVhc2UgY2hlY2sgaXRzIHNwZWxsaW5nIG9yIGluaXRpYWxpemUgaXQgaW4gdGhlIGNvbnN0cnVjdG9yXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlclZhcmlhYmxlKHByb3BOYW1lLCBzdHIsIHRhcmdldE5vZGUpO1xuXG4gICAgICAgIHByb3BOYW1lQ2FjaGUucHVzaChwcm9wTmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJWYXJpYWJsZShwcm9wTmFtZSwgc3RyLCB0YXJnZXROb2RlKSB7XG4gICAgaWYgKHRoaXMuc3RydWN0dXJlVmFyc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgdGhpcy5zdHJ1Y3R1cmVWYXJzW3Byb3BOYW1lXSA9IHt9XG4gICAgfVxuICAgIGlmICh0aGlzLnN0cnVjdHVyZVZhcnNbcHJvcE5hbWVdW3N0cl0gPT0gbnVsbCkge1xuICAgICAgdGhpcy5zdHJ1Y3R1cmVWYXJzW3Byb3BOYW1lXVtzdHJdID0gbmV3IEFycmF5KCk7XG4gICAgfVxuICAgIHRoaXMuc3RydWN0dXJlVmFyc1twcm9wTmFtZV1bc3RyXS5wdXNoKHRhcmdldE5vZGUpO1xuICB9XG5cblxuICAvLyAtLS0tIEVycm9yIGhlbHBlcnMgLS0tLVxuICBjbG9zaW5nVGFnRXJyb3IodGFnTmFtZSkge1xuICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVFcnJvcihcbiAgICAgIFwiQ291bGRuJ3QgZmluZCBhIGNsb3NpbmcgdGFnIGZvciB0aGUgZWxlbWVudCDigJg8XCIgKyB0YWdOYW1lICsgXCI+4oCZIChTaG91bGQgaXQgYmUgYSBzZWxmLWNsb3NpbmcgdGFnIG1hcmtlZCB3aXRoIOKAmDrigJk/KVwiKTtcbiAgfVxuXG5cbiAgLy8gLS0tLSBTdGF0aWMgaGVscGVycyAtLS0tXG4gIHN0YXRpYyBnZXROb2RlT3duZXIobm9kZSkge1xuICAgIHJldHVybiBub2RlLm93bmVyRWxlbWVudCB8fCBub2RlLnBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICBzdGF0aWMgc3RyaW5nSGFzVmFyaWFibGUoc3RyKSB7XG4gICAgLy8gTmVlZCB0byB1c2UgYSBSZWdFeHAgd2l0aG91dCAvZy8gYmVjYXVzZSB0aGUgaW50ZXJuYWwgYGxhc3RJbmRleGAgbXVzdG4ndCBiZSBhZHZhbmNlZCBieSBhIG1lcmUgdGVzdFxuICAgIHJldHVybiBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5yZWdleC52YXJpYWJsZU5vRmxhZy50ZXN0KHN0cik7XG4gIH1cbn1cbiIsIlxuICAgIG1vZHVsZS5leHBvcnRzID0gJy5zbDg5LXRyYWNre3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjIwMHB4O2hlaWdodDoyNXB4O2JhY2tncm91bmQtY29sb3I6aHNsKDAsMCUsMTglKTt9LnNsaWRlcjg5LnZlcnRpY2FsIC5zbDg5LXRyYWNre2hlaWdodDoyMDBweDt3aWR0aDoyNXB4O30uc2w4OS10aHVtYntwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxNnB4O2hlaWdodDoxMDAlO2JhY2tncm91bmQtY29sb3I6aHNsKDAsMCUsMjglKTtjdXJzb3I6cG9pbnRlcjt9LnNsaWRlcjg5LnZlcnRpY2FsIC5zbDg5LXRodW1ie2hlaWdodDoxNnB4O3dpZHRoOjEwMCU7fS5zbDg5LW5vc2VsZWN0ey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtwb2ludGVyLWV2ZW50czpub25lO30nXG4gICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9TbGlkZXI4OS5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==