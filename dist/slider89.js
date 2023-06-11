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

/***/ "./src/core/LibraryTypeCheck.ts":
/*!**************************************!*\
  !*** ./src/core/LibraryTypeCheck.ts ***!
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
            if (type === 'boolean' && typeof val === 'boolean' ||
                type === 'true' && val === true ||
                type === 'false' && val === false ||
                type === 'array' && Array.isArray(val) ||
                type === 'object' && Object.prototype.toString.call(val) === '[object Object]' ||
                type === 'number' && typeof val === 'number' && !Number.isNaN(val) ||
                type === 'function' && typeof val === 'function' ||
                type === 'string' && typeof val === 'string') {
                if (type === 'array') {
                    for (let j = 0; j < val.length; j++) {
                        if (msg = LibraryTypeCheck.checkTypes(val[j], typeData.descriptor))
                            break;
                    }
                }
                else if (type === 'object') {
                    for (let key in val) {
                        if (msg = LibraryTypeCheck.checkTypes(val[key], typeData.descriptor))
                            break;
                    }
                }
                if (msg) {
                    return LibraryTypeCheck.toTitleCase(type) + '<' + msg + '>';
                }
                if (msg = LibraryTypeCheck.buildConditionTypeMessage(typeData.conditions, val))
                    break;
                else
                    return false;
            }
        }
        return msg || LibraryTypeCheck.getType(val);
    }
    static buildConditionTypeMessage(conditions, val) {
        if (!conditions)
            return;
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
            if (msg)
                msg += ' OR ';
            if (type === 'number') {
                const nonnegative = cond && cond.nonnegative;
                const positive = cond && cond.positive;
                const isInt = cond && cond.integer;
                if (nonnegative) {
                    msg += 'non-negative ';
                }
                else if (positive) {
                    msg += 'positive ';
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
                    }
                    else {
                        msg += 'the keyword';
                    }
                    cond.keywords.forEach(function (val, n, arr) {
                        if (n !== 0 && n === arr.length - 1) {
                            msg += ' or';
                        }
                        else if (n !== 0) {
                            msg += ',';
                        }
                        msg += ' "' + val + '"';
                    });
                }
                else {
                    if (cond && cond.filled)
                        msg += 'non-empty ';
                    if (cond && cond.wordChar)
                        msg += 'non-number ';
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

/***/ "./src/core/Slider89.ts":
/*!******************************!*\
  !*** ./src/core/Slider89.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89; }
/* harmony export */ });
/* harmony import */ var _LibraryTypeCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LibraryTypeCheck */ "./src/core/LibraryTypeCheck.ts");
/* harmony import */ var _Slider89DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89DOM */ "./src/core/Slider89DOM.ts");
/* harmony import */ var _Slider89DOMBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89DOMBuilder */ "./src/core/Slider89DOMBuilder.ts");




class Slider89 extends _Slider89DOM__WEBPACK_IMPORTED_MODULE_1__["default"] {
    // TODO Make separate typ `PropertiesConfig`, excluding readOnly properties
    // (Like `node`)
    constructor(target, config, replace = false) {
        super();
        this.methods = ({
            addEvent: {
                function: this.addEvent,
            },
            removeEvent: {
                function: this.removeEvent,
            }
        });
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
                        this.applyAllRatioDistances();
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
                // @ts-ignore (only Setup)
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
                            if (!this.checkEventType(eventType))
                                errTypes.push(eventType);
                        }
                        if (errTypes.length > 0) {
                            throw new Slider89.PropertyError(this, 'events', 'The given object contains items which are no valid event types:' + Slider89.arrayToListString(errTypes)
                                + 'Available event types are:' + Slider89.arrayToListString(Slider89.availableEventTypes));
                        }
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
            throw new Slider89.InitializationError('The first argument must be a valid DOM node (got ' + _LibraryTypeCheck__WEBPACK_IMPORTED_MODULE_0__["default"].getType(target) + ')');
        }
    }
    testInitialConfig(config) {
        if (typeof config !== 'object' || Array.isArray(config)) {
            throw new Slider89.InitializationError('The optional second argument needs to be a configuration object (got ' + _LibraryTypeCheck__WEBPACK_IMPORTED_MODULE_0__["default"].getType(config) + ')');
        }
        else if ('value' in config && 'values' in config) {
            throw new Slider89.InitializationError('Only one of ‘value’ and ‘values’ may be defined at once');
        }
    }
    // Initialize properties and methods
    initializeClassProperties(config) {
        // NOTE: This section has no strong type checking because propData is of type any
        // Don't even bother trying to fix this, for your own sake
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
                    const getterEndpoint = (propData.isDeepDefinedArray)
                        ? this.vals.$intermediateThis
                        : this.vals;
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
        _Slider89DOMBuilder__WEBPACK_IMPORTED_MODULE_2__["default"].injectStyleSheetIfNeeded();
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
        for (let i = 0; i < argList.length; i++) {
            const arg = argList[i];
            const typeMsg = _LibraryTypeCheck__WEBPACK_IMPORTED_MODULE_0__["default"].checkTypes(arg, obj.args[i].descriptor);
            if (typeMsg)
                throw new Slider89.MethodArgTypeError(method, i, typeMsg);
        }
        // @ts-ignore
        if (obj.args[argList.length] && !obj.args[argList.length].optional) {
            throw new Slider89.MethodArgOmitError(method, argList.length);
        }
    }
    checkProp(prop, val) {
        const propertyInfo = Slider89.propertyData[prop];
        const typeMsg = _LibraryTypeCheck__WEBPACK_IMPORTED_MODULE_0__["default"].checkTypes(val, propertyInfo.descriptor);
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


/***/ }),

/***/ "./src/core/Slider89Base.ts":
/*!**********************************!*\
  !*** ./src/core/Slider89Base.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Slider89Error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89Error */ "./src/core/Slider89Error.ts");


class Slider89Base extends _Slider89Error__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        // @ts-ignore
        this.vals = {}; // holding every class property
        this.initial = false;
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
Slider89Base.methodData = ({
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
});
Slider89Base.propertyData = ({
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
});
/* harmony default export */ __webpack_exports__["default"] = (Slider89Base);


/***/ }),

/***/ "./src/core/Slider89DOM.ts":
/*!*********************************!*\
  !*** ./src/core/Slider89DOM.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89DOM; }
/* harmony export */ });
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.ts");
/* harmony import */ var _Slider89DOMBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89DOMBuilder */ "./src/core/Slider89DOMBuilder.ts");
/* harmony import */ var _Slider89Properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89Properties */ "./src/core/Slider89Properties.ts");

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Slider89DOM_instances, _Slider89DOM_removeThumbsDOMProperty;



class Slider89DOM extends _Slider89Properties__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super();
        _Slider89DOM_instances.add(this);
        this.activeTouchIDs = new Map();
        this.mouseStart = this.mouseStart.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseEnd = this.mouseEnd.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.domBuilder = new _Slider89DOMBuilder__WEBPACK_IMPORTED_MODULE_1__["default"](this.vals, {
            touchstart: this.touchStart,
            mousedown: this.mouseStart,
            keydown: this.keyDown
        });
    }
    // ---- DOM getters ----
    getTrackPadding(direction) {
        return parseFloat(this.trackStyle.getPropertyValue('padding' + direction));
    }
    getTrackOffset(direction) {
        return parseFloat(this.trackStyle.getPropertyValue('border' + direction + 'Width'))
            + this.getTrackPadding(direction);
    }
    getDistance(thumb) {
        if (this.vals.orientation === 'vertical') {
            return thumb.getBoundingClientRect().top
                - this.vals.node.track.getBoundingClientRect().top
                - this.getTrackOffset('Top');
        }
        else {
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
        }
        else {
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
        }
        else {
            var offsetStart = this.getTrackPadding('Left');
            var offsetEnd = this.getTrackPadding('Right');
            var thumbDim = thumb.clientWidth;
            var posAnchor = 'left';
        }
        let subtract = (thumbDim * distance) + 'px';
        if (offsetEnd)
            subtract += ' - ' + (offsetEnd * distance) + 'px';
        if (offsetStart)
            subtract += ' + ' + (offsetStart * (1 - distance)) + 'px';
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
        if (!_Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].floatIsEqual(ratio, prevRatio))
            this.moveThumbRelative(this.vals.node.thumb[thumbIndex], ratio);
    }
    // ---- Distance computation ----
    computeDistanceValue(thumb, distance, absSize) {
        if (absSize == null)
            absSize = this.getAbsoluteTrackSize(thumb);
        return distance / absSize * (this.vals.range[1] - this.vals.range[0]) + this.vals.range[0];
    }
    computeRatioDistance(thumbIndex, newVals) {
        let value;
        let ratio;
        if (!newVals) {
            newVals = this.vals;
            value = this.vals.values[thumbIndex];
        }
        else {
            for (let prop of ['range', 'step']) {
                // @ts-ignore ???
                if (newVals[prop] == null)
                    newVals[prop] = this.vals[prop];
            }
            if (newVals.value != null) {
                value = newVals.value;
            }
            else {
                ratio = (this.vals.values[thumbIndex] - this.vals.range[0]) / (this.vals.range[1] - this.vals.range[0]);
                value = (newVals.range[1] - newVals.range[0]) * ratio + newVals.range[0];
            }
        }
        // Round value to a given step
        if (newVals.step !== false) {
            if (Math.abs(newVals.range[1] - newVals.range[0]) < newVals.step) {
                value = newVals.range[0];
            }
            else {
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
    changeOrientationDOM(newOrientation) {
        if (newOrientation === 'vertical') {
            __classPrivateFieldGet(this, _Slider89DOM_instances, "m", _Slider89DOM_removeThumbsDOMProperty).call(this, 'left');
            this.vals.node.slider.classList.add('vertical');
        }
        else {
            __classPrivateFieldGet(this, _Slider89DOM_instances, "m", _Slider89DOM_removeThumbsDOMProperty).call(this, 'top');
            this.vals.node.slider.classList.remove('vertical');
        }
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
                // @ts-ignore
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
        this.slideStart(thumbNode, e, e);
        if (!this.activeThumb) {
            this.activeThumb = thumbNode;
            window.addEventListener('mousemove', this.mouseMove);
            window.addEventListener('mouseup', this.mouseEnd);
        }
    }
    mouseMove(e) {
        this.slideMove(this.activeThumb, e, e);
    }
    mouseEnd(e) {
        this.slideEnd(this.activeThumb, e, e);
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('mouseup', this.mouseEnd);
        this.mouseDownPos = null;
        this.activeThumb = null;
    }
    // ---- General event handlers ----
    slideStart(thumbNode, e, eventArg) {
        thumbNode.classList.add('active');
        // invokeEvent(['start'], eventArg);
        if (this.vals.orientation === 'vertical') {
            var posAnchor = 'top';
            var clientDim = e.clientY;
        }
        else {
            var posAnchor = 'left';
            var clientDim = e.clientX;
        }
        const distance = this.getDistance(thumbNode);
        this.mouseDownPos = clientDim - distance;
        this.moveThumbTranslate(thumbNode, distance);
        thumbNode.style.removeProperty(posAnchor);
    }
    slideMove(thumbNode, e, eventArg) {
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
    slideEnd(thumbNode, e, eventArg) {
        const thumbIndex = this.vals.node.thumb.indexOf(thumbNode);
        this.applyOneRatioDistance(thumbIndex);
        thumbNode.style.removeProperty('transform');
        this.invokeEvent(['end'], eventArg);
        thumbNode.classList.remove('active');
        document.body.classList.remove('sl89-noselect');
    }
    // ---- Misc events ----
    keyDown(e) {
        if (!e.key.startsWith('Arrow'))
            return;
        const thumbIndex = this.vals.node.thumb.indexOf(e.currentTarget);
        let modifier = Math.round((this.vals.range[1] - this.vals.range[0]) / 100);
        if (e.shiftKey && e.ctrlKey) {
            modifier *= 0.1;
        }
        else if (e.shiftKey) {
            modifier *= 10;
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.values[thumbIndex] -= modifier;
        }
        else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            this.values[thumbIndex] += modifier;
        }
    }
}
_Slider89DOM_instances = new WeakSet(), _Slider89DOM_removeThumbsDOMProperty = function _Slider89DOM_removeThumbsDOMProperty(property) {
    for (const thumb of this.vals.node.thumb) {
        thumb.style.removeProperty(property);
    }
};


/***/ }),

/***/ "./src/core/Slider89DOMBuilder.ts":
/*!****************************************!*\
  !*** ./src/core/Slider89DOMBuilder.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_default_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/default-styles.css */ "./src/css/default-styles.css");
/* harmony import */ var _css_default_styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_default_styles_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.ts");
/* harmony import */ var _Slider89StructureParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89StructureParser */ "./src/core/Slider89StructureParser.ts");

// @ts-ignore (Webpack import)



class Slider89DOMBuilder extends _Slider89StructureParser__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor(vals, thumbEvents) {
        super(vals);
        this.baseElements = {};
        /**
         * Keeps track of structure variables and their respective variable strings
         * which are used in the thumb and its descendants.
         */
        this.structureVarThumbStrings = {};
        this.thumbEvents = {};
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
        // @ts-ignore
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
            this.thumbBase = this.assembleElement(node, 'thumb', [], 'div');
        }
        else {
            this.thumbBase = node.thumb;
            if (node.track) {
                this.thumbParent = node.thumb.parentNode;
            }
            // baseElements is only effective if a structure thumb has been defined
            this.baseElements.thumb = this.thumbBase;
        }
        if (!node.track) {
            node.track = this.assembleElement(node, 'track', [], 'div');
            if (node.thumb) {
                node.thumb.parentNode.appendChild(node.track);
            }
            else {
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
        // NOTE: From here on, `node` is of type `PropertyNode`
        // Push thumb & descendants into node arrays
        node.thumb = [];
        for (const nodeName of this.thumbChildren) {
            this.baseElements[nodeName] = node[nodeName];
            node[nodeName] = [];
        }
        this.findStructureVarStringsInThumb(this.thumbBase);
        for (let i = 0; i < thumbCount; i++) {
            this.addThumbToNode(node);
        }
    }
    findStructureVarStringsInThumb(thumbBase) {
        for (const [propName, stringList] of Object.entries(this.structureVars)) {
            let thumbStrings = [];
            for (const [str, nodeList] of Object.entries(stringList)) {
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
        const errNodes = [];
        for (let nodeName in classList) {
            const classArr = classList[nodeName];
            if (!Object.prototype.hasOwnProperty.call(node, nodeName)) {
                errNodes.push(nodeName);
            }
            else if (errNodes.length === 0) {
                for (let i = 0; i < classArr.length; i++) {
                    if (nodeName === 'thumb') {
                        for (let j = 0; j < node[nodeName].length; j++) {
                            node[nodeName][j].classList.add(classArr[i]);
                        }
                    }
                    else {
                        // @ts-ignore TODO + test
                        node[nodeName].classList.add(classArr[i]);
                    }
                }
            }
        }
        if (errNodes.length > 0) {
            const msg = "The given object contains items which aren't nodes of this slider:" + _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].arrayToListString(errNodes) +
                "Following nodes are part of this slider's node pool:" + _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].arrayToListString(Object.keys(node));
            throw new _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].Error(msg, 'classList', true);
        }
    }
    // ---- Helper functions ----
    createNewThumb() {
        const newThumb = this.thumbBase.cloneNode(true);
        newThumb.classList.add('sl89-thumb');
        if (newThumb.tabIndex == null) {
            newThumb.tabIndex = 0;
        }
        for (const [eventName, callback] of Object.entries(this.thumbEvents)) {
            newThumb.addEventListener(eventName, callback, {
                passive: !eventName.startsWith('touch')
            });
        }
        this.thumbParent.appendChild(newThumb);
        return newThumb;
    }
    nodeHasBaseElementOwner(node) {
        for (const [baseName, element] of Object.entries(this.baseElements)) {
            if (_Slider89StructureParser__WEBPACK_IMPORTED_MODULE_2__["default"].getNodeOwner(node) === element)
                return baseName;
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
            }
            else {
                document.head.appendChild(styleSheetElement);
            }
            Slider89DOMBuilder.hasInjectedStylesheet = true;
        }
    }
    /**
     * Recursively iterate through a node's children, collecting them in an array in order.
     * When used on a thumb node, the result is analogous to {@link thumbChildren}.
     * @param node The input node.
     * @return All children of the input node.
     */
    static findNodeChildren(node, collector = []) {
        if (node.childElementCount === 0)
            return collector;
        for (const child of node.children) {
            collector.push(child);
            Slider89DOMBuilder.findNodeChildren(child, collector);
        }
        return collector;
    }
}
Slider89DOMBuilder.hasInjectedStylesheet = false;
/* harmony default export */ __webpack_exports__["default"] = (Slider89DOMBuilder);


/***/ }),

/***/ "./src/core/Slider89Error.ts":
/*!***********************************!*\
  !*** ./src/core/Slider89Error.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LibraryTypeCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LibraryTypeCheck */ "./src/core/LibraryTypeCheck.ts");
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.ts");



class Slider89Error {
    // ---- Helper functions ----
    static getTypeErrorMessage(descriptor, typeMsg) {
        return ' Expected ' + _LibraryTypeCheck__WEBPACK_IMPORTED_MODULE_0__["default"].buildDescriptorTypeMessage(descriptor) + ','
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
Slider89Error.COUNTS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];
Slider89Error.Error = class extends Error {
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
};
// ---- Constructor error ----
Slider89Error.InitializationError = class extends Slider89Error.Error {
    constructor(msg) {
        super(msg, 'constructor', true);
    }
};
// ---- Property errors ----
Slider89Error.PropertyError = class extends Slider89Error.Error {
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
};
Slider89Error.PropertyTypeError = class extends Slider89Error.PropertyError {
    constructor(slider, propertyName, propertyInfo, typeMsg) {
        let msg = 'Type mismatch.'
            + _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].getTypeErrorMessage(propertyInfo.descriptor, typeMsg);
        super(slider, propertyName, msg);
    }
};
// ---- Method errors ----
Slider89Error.MethodArgTypeError = class extends Slider89Error.Error {
    constructor(methodName, index, typeMsg) {
        const argInfo = _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].getMethodArgInfo(methodName, index);
        const msg = 'Type mismatch on the ' + Slider89Error.getMethodArgMessage(argInfo, index) + '.'
            + _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].getTypeErrorMessage(argInfo.descriptor, typeMsg);
        super(msg, methodName);
    }
};
Slider89Error.MethodArgOmitError = class extends Slider89Error.Error {
    constructor(methodName, index) {
        const argInfo = _Slider89__WEBPACK_IMPORTED_MODULE_1__["default"].getMethodArgInfo(methodName, index);
        const msg = 'The ' + Slider89Error.getMethodArgMessage(argInfo, index)
            + ' has been omitted but it is required'
            + ' (It must be of type ' + _LibraryTypeCheck__WEBPACK_IMPORTED_MODULE_0__["default"].buildDescriptorTypeMessage(argInfo.descriptor) + ').';
        super(msg, methodName);
    }
};
// ---- Structure errors ----
Slider89Error.StructureError = class extends Slider89Error.Error {
    constructor(msg) {
        super(msg, 'structure', true);
    }
};
Slider89Error.StructureParseError = class extends Slider89Error.StructureError {
    constructor(beforeFailure, pointOfFailure) {
        const msg = "Something has been declared wrongly and couldn't be parsed. Point of failure "
            + "(before " + beforeFailure + "):\n\n"
            + pointOfFailure + '\n';
        super(msg);
    }
};
/* harmony default export */ __webpack_exports__["default"] = (Slider89Error);


/***/ }),

/***/ "./src/core/Slider89Events.ts":
/*!************************************!*\
  !*** ./src/core/Slider89Events.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.ts");
/* harmony import */ var _Slider89Base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89Base */ "./src/core/Slider89Base.ts");

var _a;


class Slider89Events extends _Slider89Base__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super(...arguments);
        // ---- Properties ----
        // Storing event data for removability
        this.eventList = {};
        this.eventID = 0;
    }
    // ---- Methods ----
    addEvent(type, fn, customID) {
        if (!this.checkEventType(type)) {
            const msg = 'The specified event type ‘' + type + '’ is not valid. Available types are:'
                + _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].arrayToListString(Slider89Events.availableEventTypes);
            throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].Error(msg, 'addEvent');
        }
        if (!Array.isArray(this.vals.events[type])) {
            this.vals.events[type] = [];
        }
        this.vals.events[type].push(fn);
        const identifier = customID || this.eventID;
        const eventData = {
            type: type,
            fn: fn
        };
        if (customID) {
            if (!Array.isArray(this.eventList[identifier])) {
                this.eventList[identifier] = [];
            }
            this.eventList[identifier].push(eventData);
        }
        else {
            this.eventList[identifier] = eventData;
        }
        return customID || this.eventID++;
    }
    removeEvent(key) {
        if (!(key in this.eventList)) {
            return false;
        }
        const eventData = this.eventList[key];
        delete this.eventList[key];
        return Array.isArray(eventData)
            ? eventData.reduce(this.handleRemoveEvent.bind(this), [])
            : this.handleRemoveEvent([], eventData);
    }
    // ---- Helper functions ----
    handleRemoveEvent(deleteCollection, eventInfo) {
        const type = eventInfo.type;
        const eventFns = this.vals.events[type];
        const deletedFn = eventFns.splice(eventFns.indexOf(eventInfo.fn), 1)[0];
        if (eventFns.length === 0) {
            delete this.vals.events[type];
        }
        deleteCollection.push(deletedFn);
        return deleteCollection;
    }
    invokeEvent(types, ...args) {
        args[0] = this;
        for (const type of types) {
            if (this.vals.events !== false) {
                if (type in this.vals.events) {
                    for (const eventFunc of this.vals.events[type]) {
                        eventFunc.apply(this, args);
                    }
                }
            }
        }
    }
    checkEventType(type) {
        for (const eventTypeData of Object.values(Slider89Events.eventTypesSpecial)) {
            if (type.startsWith(eventTypeData.prefix)) {
                const suffix = type.slice(eventTypeData.prefix.length);
                eventTypeData.fn(this, suffix, type);
                return true;
            }
        }
        // @ts-ignore
        return Slider89Events.eventTypes.includes(type);
    }
}
_a = Slider89Events;
// ---- Constant statics ----
Slider89Events.eventTypes = [
    'start',
    'move',
    'end',
];
Slider89Events.eventTypesSpecial = ({
    'change:$property': {
        prefix: 'change:',
        fn: (slider, customProp, eventType) => {
            if (!Object.prototype.hasOwnProperty.call(slider.vals, customProp)) {
                const msg = "‘" + eventType + "’ refers to ‘" + customProp + "’, which isn't a recognized property. "
                    + "Check its spelling and be aware that custom properties need to be initialized";
                throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].Error(msg, 'addEvent');
            }
        }
    }
});
// Statically getting the name of all event types. This is just for humans.
Slider89Events.availableEventTypes = (() => {
    // @ts-ignore
    return _a.eventTypes.concat(Object.keys(_a.eventTypesSpecial));
})();
/* harmony default export */ __webpack_exports__["default"] = (Slider89Events);


/***/ }),

/***/ "./src/core/Slider89Properties.ts":
/*!****************************************!*\
  !*** ./src/core/Slider89Properties.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Slider89Properties; }
/* harmony export */ });
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.ts");
/* harmony import */ var _Slider89Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Slider89Events */ "./src/core/Slider89Events.ts");
/* harmony import */ var _Slider89StructureParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Slider89StructureParser */ "./src/core/Slider89StructureParser.ts");




class Slider89Properties extends _Slider89Events__WEBPACK_IMPORTED_MODULE_1__["default"] {
    // ------ Object definition ------
    defineDeepProperty(target, item, endpoint, postSetter, isDeepDefinedArray) {
        Object.defineProperty(target, item, {
            set: (val) => {
                if (!this.initial) {
                    var prevVal = (isDeepDefinedArray ? Array.from(this[item]) : this[item]);
                }
                endpoint[item] = val;
                if (isDeepDefinedArray) {
                    const outline = this.properties[item];
                    // The endpoints (see doc comment at the start of file) are defined from bottom to top
                    // This ensures compatibility with getters/setters
                    this.defineDeepArrayIntermediateVals(item, val);
                    this.defineDeepArrayIntermediateThis(item, val, outline.keySetter, outline.keyGetter);
                    this.handleInternalDeepArrayChange(item, prevVal, val);
                }
                else {
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
        // @ts-ignore (Only setup)
        this.vals.$intermediateThis[parentItem] = [];
        for (let i = 0; i < parentValue.length; i++) {
            const value = parentValue[i];
            Object.defineProperty(this.vals.$intermediateThis[parentItem], i, {
                set: (val) => {
                    if (!keySetter || !keySetter(val, i)) {
                        endpoint[parentItem][i] = val;
                    }
                },
                get: () => {
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
        // @ts-ignore (Only Setup)
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
            }
            else {
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
        // @ts-ignore TODO
        if (!Object.prototype.hasOwnProperty.call(this.domBuilder.structureVars, propName))
            return;
        // @ts-ignore TODO
        for (const [str, nodeList] of Object.entries(this.domBuilder.structureVars[propName])) {
            // @ts-ignore TODO
            this.replaceStructureVarStringInNodes(str, nodeList);
        }
        if (Object.prototype.hasOwnProperty.call(_Slider89StructureParser__WEBPACK_IMPORTED_MODULE_2__["default"].specialVariableProxy, propName)) {
            for (const varName of _Slider89StructureParser__WEBPACK_IMPORTED_MODULE_2__["default"].specialVariableProxy[propName]) {
                this.updatePotentialStructureVar(varName);
            }
        }
    }
    replaceStructureVarStringInNodes(str, nodeList) {
        for (const [element, node, baseName] of this.iterateStructureVarNodeList(nodeList)) {
            node.textContent =
                str.replace(_Slider89StructureParser__WEBPACK_IMPORTED_MODULE_2__["default"].regex.variable, (match, variableDelimit, variable) => {
                    return this.getValueFromStructureVar(variableDelimit || variable, element, baseName);
                });
        }
    }
    // TODO Check whether this signature is correct (no internet rn lol)
    *iterateStructureVarNodeList(nodeList) {
        for (const node of nodeList) {
            // Special case: Iterate over every thumb
            // @ts-ignore TODO
            const baseName = this.domBuilder.nodeHasBaseElementOwner(node);
            if (baseName) {
                const elements = this.vals.node[baseName];
                if (node.nodeType === Node.ATTRIBUTE_NODE) {
                    for (const element of elements) {
                        yield [element, element.getAttributeNode(node.name), baseName];
                    }
                    ;
                }
                else {
                    for (const element of elements) {
                        // The text node is always the first child
                        yield [element, element.childNodes[0], baseName];
                    }
                    ;
                }
            }
            else {
                const element = _Slider89StructureParser__WEBPACK_IMPORTED_MODULE_2__["default"].getNodeOwner(node);
                yield [element, node, baseName];
            }
        }
    }
    getValueFromStructureVar(varName, element, baseName) {
        const recursiveVar = varName.split('.');
        let value;
        if (recursiveVar[0] in _Slider89StructureParser__WEBPACK_IMPORTED_MODULE_2__["default"].specialVariables) {
            value = _Slider89StructureParser__WEBPACK_IMPORTED_MODULE_2__["default"].specialVariables[recursiveVar[0]].getter(element, this, baseName);
        }
        else {
            value = this[recursiveVar[0]];
        }
        if (recursiveVar.length > 1) {
            for (let i = 1; i < recursiveVar.length; i++) {
                try {
                    value = value[recursiveVar[i]];
                }
                catch (e) {
                    throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError("Variable ‘" + varName + "’ cannot access property ‘" + recursiveVar[i] + "’ on " + value);
                }
            }
        }
        return value;
    }
}


/***/ }),

/***/ "./src/core/Slider89StructureParser.ts":
/*!*********************************************!*\
  !*** ./src/core/Slider89StructureParser.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Slider89__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slider89 */ "./src/core/Slider89.ts");


class Slider89StructureParser {
    constructor(vals) {
        // ---- Properties ----
        this.structureVars = {};
        this.thumbChildren = [];
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
            }
            else {
                const lastItem = stack.pop();
                if (lastItem !== match[2]) {
                    if (stack.indexOf(match[2]) !== -1) {
                        this.closingTagError(lastItem);
                    }
                    else {
                        throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError("The closing tag ‘</" + match[2] + ">’ couldn't find a matching opening tag");
                    }
                }
            }
        }
        if (currentIndex !== structureStr.length) {
            throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureParseError('end of string', structureStr.slice(currentIndex));
        }
        if (stack.length > 1) {
            throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError("Couldn't find a matching closing tag for following elements:" + _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].arrayToListString(stack));
        }
        else if (stack.length === 1) {
            this.closingTagError(stack[0]);
        }
        return node;
    }
    assembleElement(node, name, nameStack, tag, content, attributes) {
        if (Object.prototype.hasOwnProperty.call(node, name)) {
            throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError('Every element must have a unique name but there are mutiple elements called ‘' + name + '’');
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
        const propNameCache = [];
        let match;
        while (match = Slider89StructureParser.regex.variable.exec(str)) {
            const varName = match[1] || match[2];
            const propName = varName.indexOf('.') !== -1
                ? varName.slice(0, varName.indexOf('.'))
                : varName;
            if (!propNameCache.hasOwnProperty(propName)) {
                if (!Object.prototype.hasOwnProperty.call(this.vals, propName)
                    && !Slider89StructureParser.checkForSpecialVariables(propName, tagName, tagNameStack)) {
                    throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError("‘" + propName + "’ is not a recognized property and cannot be used as variable."
                        + "Please check its spelling or initialize it in the constructor");
                }
                this.registerVariable(propName, str, targetNode);
                propNameCache.push(propName);
            }
        }
    }
    registerVariable(propName, str, targetNode) {
        if (this.structureVars[propName] == null) {
            this.structureVars[propName] = {};
        }
        if (this.structureVars[propName][str] == null) {
            this.structureVars[propName][str] = new Array();
        }
        this.structureVars[propName][str].push(targetNode);
    }
    // ---- Error helpers ----
    closingTagError(tagName) {
        throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError("Couldn't find a closing tag for the element ‘<" + tagName + ">’ (Should it be a self-closing tag marked with ‘:’?)");
    }
    // ---- Static helpers ----
    static getNodeOwner(node) {
        // @ts-ignore
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
                throw new _Slider89__WEBPACK_IMPORTED_MODULE_0__["default"].StructureError("The variable ‘$" + varName + "’ may only be used inside the ‘<thumb>’ tag and its children "
                    + "(It was found in ‘<" + tagNameStack[tagNameStack.length - 1] + ">’)");
            }
            return true;
        }
        return false;
    }
}
/**
 * Special variables inside the structure system.
 * Instead of being linked to properties, these can call arbitrary functions.
 */
Slider89StructureParser.specialVariables = ({
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
});
/**
 * Links {@link specialVariables} to potential slider properties they depend on,
 * so that the special variables get updated when the property updates.
 */
Slider89StructureParser.specialVariableProxy = {
    values: ['thumb_index', 'thumb_value']
};
// Static initialization blocks don't work with my current workflow
Slider89StructureParser.regex = (function () {
    // Fuck you
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
/* harmony default export */ __webpack_exports__["default"] = (Slider89StructureParser);


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/core/Slider89.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzsrREF4RGMsdUJBQXVCOzs7Ozs7Ozs7Ozs7QUN6QzVDLGtDQUFrQyxrQkFBa0IsWUFBWSxZQUFZLGdDQUFnQywrQkFBK0IsYUFBYSxZQUFZLFlBQVksa0JBQWtCLFdBQVcsWUFBWSwrQkFBK0IsZ0JBQWdCLCtCQUErQixZQUFZLFlBQVksZUFBZSx5QkFBeUIsc0JBQXNCLHFCQUFxQixpQkFBaUIscUJBQXFCO0FBQ3hiOzs7Ozs7VUNGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxlQUFlLDRCQUE0QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBLDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL2NvcmUvTGlicmFyeVR5cGVDaGVjay50cyIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9jb3JlL1NsaWRlcjg5LnRzIiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL2NvcmUvU2xpZGVyODlCYXNlLnRzIiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL2NvcmUvU2xpZGVyODlET00udHMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvY29yZS9TbGlkZXI4OURPTUJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvY29yZS9TbGlkZXI4OUVycm9yLnRzIiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL2NvcmUvU2xpZGVyODlFdmVudHMudHMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvY29yZS9TbGlkZXI4OVByb3BlcnRpZXMudHMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvY29yZS9TbGlkZXI4OVN0cnVjdHVyZVBhcnNlci50cyIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9jc3MvZGVmYXVsdC1zdHlsZXMuY3NzIiwid2VicGFjazovL1NsaWRlcjg5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NsaWRlcjg5L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL1NsaWRlcjg5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL1NsaWRlcjg5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNsaWRlcjg5XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNsaWRlcjg5XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiJ3VzZSBzdHJpY3QnO1xuLy8gLS0tLSBVdGlsaXR5IHR5cGVzIC0tLS1cbi8vIEZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzYwODM5NzE4XG5leHBvcnQgdHlwZSBEZWVwUmVhZG9ubHlPYmplY3Q8VD4gPSBUIGV4dGVuZHMgb2JqZWN0ID8ge1xuICByZWFkb25seSBbUCBpbiBrZXlvZiBUXTogRGVlcFJlYWRvbmx5T2JqZWN0PFRbUF0+O1xufSA6IFQ7XG5cblxuLy8gLS0tLSBUeXBlOiBEZXNjcmlwdG9yIC0tLS1cbmV4cG9ydCBuYW1lc3BhY2UgRGVzY3JpcHRvciB7XG4gIGludGVyZmFjZSBUeXBlc1dpdGhDb25kaXRpb25zIHtcbiAgICBib29sZWFuOiBuZXZlcjtcbiAgICB0cnVlOiBuZXZlcjtcbiAgICBmYWxzZTogbmV2ZXI7XG4gICAgb2JqZWN0OiBuZXZlcjtcbiAgICBmdW5jdGlvbjogbmV2ZXI7XG4gICAgYXJyYXk6ICdsZW5ndGgnO1xuICAgIG51bWJlcjogJ25vbm5lZ2F0aXZlJyB8ICdwb3NpdGl2ZScgfCAnaW50ZWdlcic7XG4gICAgc3RyaW5nOiAnZmlsbGVkJyB8ICd3b3JkQ2hhcicgfCAna2V5d29yZHMnO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29uZGl0aW9ucyB7XG4gICAgbm9ubmVnYXRpdmU6IGJvb2xlYW47XG4gICAgcG9zaXRpdmU6IGJvb2xlYW47XG4gICAgaW50ZWdlcjogYm9vbGVhbjtcbiAgICBsZW5ndGg6IG51bWJlcjtcbiAgICBrZXl3b3Jkczogc3RyaW5nW107XG4gICAgZmlsbGVkOiBib29sZWFuO1xuICAgIHdvcmRDaGFyOiBib29sZWFuXG4gIH1cblxuICBleHBvcnQgdHlwZSBBcnJheVR5cGUgPSB7XG4gICAgdHlwZTogJ2FycmF5JztcbiAgICBkZXNjcmlwdG9yOiBzZWxmO1xuICB9XG4gIGV4cG9ydCB0eXBlIE9iamVjdFR5cGUgPSB7XG4gICAgdHlwZTogJ29iamVjdCc7XG4gICAgZGVzY3JpcHRvcjogc2VsZjtcbiAgICBrZXlOYW1lPzogc3RyaW5nO1xuICB9XG4gIHR5cGUgRGVmYXVsdFR5cGUgPSB7XG4gICAgdHlwZToga2V5b2YgT21pdDxUeXBlc1dpdGhDb25kaXRpb25zLCAoQXJyYXlUeXBlIHwgT2JqZWN0VHlwZSlbJ3R5cGUnXT47XG4gIH1cblxuICB0eXBlIEJhc2UgPSAoT2JqZWN0VHlwZSB8IEFycmF5VHlwZSB8IERlZmF1bHRUeXBlKSAmIHtcbiAgICBzaGFwZT86IHN0cmluZztcbiAgICBjb25kaXRpb25zPzogUGFydGlhbDx7XG4gICAgICBbIENvbmQgaW4gVHlwZXNXaXRoQ29uZGl0aW9uc1tCYXNlWyd0eXBlJ11dIF06IENvbmRpdGlvbnNbQ29uZF07XG4gICAgfT47XG4gIH1cblxuICBleHBvcnQgdHlwZSBzZWxmID0gRGVlcFJlYWRvbmx5T2JqZWN0PEFycmF5PEJhc2U+Pjtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaWJyYXJ5VHlwZUNoZWNrIHtcbiAgc3RhdGljIGdldFR5cGUodmFsdWUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpXG4gICAgICByZXR1cm4gJ0FycmF5JztcbiAgICBlbHNlIGlmIChOdW1iZXIuaXNOYU4odmFsdWUpKVxuICAgICAgcmV0dXJuICdOYU4nO1xuICAgIGVsc2UgaWYgKHZhbHVlID09PSBudWxsKVxuICAgICAgcmV0dXJuICdudWxsJztcbiAgICBlbHNlXG4gICAgICByZXR1cm4gdHlwZW9mIHZhbHVlO1xuICB9XG5cbiAgc3RhdGljIGNoZWNrVHlwZXModmFsOiBhbnksIGRlc2NyaXB0b3I6IERlc2NyaXB0b3Iuc2VsZik6IHN0cmluZyB8IGZhbHNlIHtcbiAgICBsZXQgbXNnOiBzdHJpbmcgfCBmYWxzZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVzY3JpcHRvci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdHlwZURhdGEgPSBkZXNjcmlwdG9yW2ldO1xuICAgICAgY29uc3QgdHlwZSA9IHR5cGVEYXRhLnR5cGU7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGUgPT09ICdib29sZWFuJyAmJiB0eXBlb2YgdmFsID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgdHlwZSA9PT0gJ3RydWUnICYmIHZhbCA9PT0gdHJ1ZSB8fFxuICAgICAgICB0eXBlID09PSAnZmFsc2UnICYmIHZhbCA9PT0gZmFsc2UgfHxcbiAgICAgICAgdHlwZSA9PT0gJ2FycmF5JyAmJiBBcnJheS5pc0FycmF5KHZhbCkgfHxcbiAgICAgICAgdHlwZSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IE9iamVjdF0nIHx8XG4gICAgICAgIHR5cGUgPT09ICdudW1iZXInICYmIHR5cGVvZiB2YWwgPT09ICdudW1iZXInICYmICFOdW1iZXIuaXNOYU4odmFsKSB8fFxuICAgICAgICB0eXBlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgdHlwZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbCA9PT0gJ3N0cmluZydcbiAgICAgICkge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdmFsLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAobXNnID0gTGlicmFyeVR5cGVDaGVjay5jaGVja1R5cGVzKHZhbFtqXSwgdHlwZURhdGEuZGVzY3JpcHRvcikpIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGZvciAobGV0IGtleSBpbiB2YWwpIHtcbiAgICAgICAgICAgIGlmIChtc2cgPSBMaWJyYXJ5VHlwZUNoZWNrLmNoZWNrVHlwZXModmFsW2tleV0sIHR5cGVEYXRhLmRlc2NyaXB0b3IpKSBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobXNnKSB7XG4gICAgICAgICAgcmV0dXJuIExpYnJhcnlUeXBlQ2hlY2sudG9UaXRsZUNhc2UodHlwZSkgKyAnPCcgKyBtc2cgKyAnPic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1zZyA9IExpYnJhcnlUeXBlQ2hlY2suYnVpbGRDb25kaXRpb25UeXBlTWVzc2FnZSh0eXBlRGF0YS5jb25kaXRpb25zLCB2YWwpKSBicmVhaztcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1zZyB8fCBMaWJyYXJ5VHlwZUNoZWNrLmdldFR5cGUodmFsKTtcbiAgfVxuXG4gIHN0YXRpYyBidWlsZENvbmRpdGlvblR5cGVNZXNzYWdlKGNvbmRpdGlvbnM6IFBhcnRpYWw8RGVlcFJlYWRvbmx5T2JqZWN0PERlc2NyaXB0b3IuQ29uZGl0aW9ucz4+LCB2YWw6IGFueSkge1xuICAgIGlmICghY29uZGl0aW9ucykgcmV0dXJuO1xuXG4gICAgaWYgKGNvbmRpdGlvbnMubm9ubmVnYXRpdmUgJiYgdmFsIDwgMCkge1xuICAgICAgcmV0dXJuICdhIG5lZ2F0aXZlIG51bWJlcic7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb25zLnBvc2l0aXZlICYmIHZhbCA8PSAwKSB7XG4gICAgICByZXR1cm4gJ2EgbmVnYXRpdmUgbnVtYmVyIG9yIDAnO1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9ucy5pbnRlZ2VyICYmIHZhbCAlIDEgIT09IDApIHtcbiAgICAgIHJldHVybiAnYSBmbG9hdGluZyBwb2ludCBudW1iZXInO1xuICAgIH1cbiAgICBpZiAoY29uZGl0aW9ucy5maWxsZWQgJiYgdmFsLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHJldHVybiAnYW4gZW1wdHkgc3RyaW5nJztcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbnMua2V5d29yZHMgJiYgY29uZGl0aW9ucy5rZXl3b3Jkcy5pbmRleE9mKHZhbCkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2EgZGlmZmVyZW50IHN0cmluZyc7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb25zLndvcmRDaGFyICYmICFOdW1iZXIuaXNOYU4oTnVtYmVyKHZhbCkpKSB7XG4gICAgICByZXR1cm4gJ2EgbnVtYmVyIHN0cmluZyc7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb25zLmxlbmd0aCAmJiB2YWwubGVuZ3RoICE9PSBjb25kaXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuICdhbiBhcnJheSBvZiBsZW5ndGggJyArIHZhbC5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgLy8gQ29tcHV0ZSBhbiBhdXRvbWF0ZWQgZXJyb3IgbWVzc2FnZSByZWdhcmRpbmcgdGhlIHByb3BlcnR5J3MgdHlwZXMgYW5kIGNvbmRpdGlvbnNcbiAgc3RhdGljIGJ1aWxkRGVzY3JpcHRvclR5cGVNZXNzYWdlKGRlc2NyaXB0b3I6IERlc2NyaXB0b3Iuc2VsZikge1xuICAgIGxldCBtc2cgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlc2NyaXB0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHR5cGVEYXRhID0gZGVzY3JpcHRvcltpXTtcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlRGF0YS50eXBlO1xuICAgICAgY29uc3QgY29uZCA9IHR5cGVEYXRhLmNvbmRpdGlvbnM7XG5cbiAgICAgIGlmIChtc2cpIG1zZyArPSAnIE9SICc7XG5cbiAgICAgIGlmICh0eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICBjb25zdCBub25uZWdhdGl2ZSA9IGNvbmQgJiYgY29uZC5ub25uZWdhdGl2ZTtcbiAgICAgICAgY29uc3QgcG9zaXRpdmUgPSBjb25kICYmIGNvbmQucG9zaXRpdmU7XG4gICAgICAgIGNvbnN0IGlzSW50ID0gY29uZCAmJiBjb25kLmludGVnZXI7XG5cbiAgICAgICAgaWYgKG5vbm5lZ2F0aXZlKSB7XG4gICAgICAgICAgbXNnICs9ICdub24tbmVnYXRpdmUgJztcbiAgICAgICAgfSBlbHNlIGlmIChwb3NpdGl2ZSkge1xuICAgICAgICAgIG1zZyArPSAncG9zaXRpdmUgJ1xuICAgICAgICB9XG4gICAgICAgIG1zZyArPSAoaXNJbnQgPyAnaW50ZWdlcicgOiAnbnVtYmVyJyk7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgY29uc3QgaW5uZXJUeXBlID0gTGlicmFyeVR5cGVDaGVjay5idWlsZERlc2NyaXB0b3JUeXBlTWVzc2FnZSh0eXBlRGF0YS5kZXNjcmlwdG9yKTtcbiAgICAgICAgbXNnICs9ICdBcnJheTwnICsgaW5uZXJUeXBlICsgJz4nO1xuICAgICAgICBpZiAoY29uZCAmJiBjb25kLmxlbmd0aCkge1xuICAgICAgICAgIG1zZyArPSAnIG9mIGxlbmd0aCAnICsgY29uZC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgaW5uZXJUeXBlID0gTGlicmFyeVR5cGVDaGVjay5idWlsZERlc2NyaXB0b3JUeXBlTWVzc2FnZSh0eXBlRGF0YS5kZXNjcmlwdG9yKTtcbiAgICAgICAgbXNnICs9ICdPYmplY3Q8JyArIHR5cGVEYXRhLmtleU5hbWUgKyAnLCAnICsgaW5uZXJUeXBlICsgJz4nO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoY29uZCAmJiBjb25kLmtleXdvcmRzKSB7XG4gICAgICAgICAgaWYgKGNvbmQua2V5d29yZHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgbXNnICs9ICdvbmUgb2YgdGhlIGtleXdvcmRzJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbXNnICs9ICd0aGUga2V5d29yZCc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbmQua2V5d29yZHMuZm9yRWFjaChmdW5jdGlvbih2YWwsIG4sIGFycikge1xuICAgICAgICAgICAgaWYgKG4gIT09IDAgJiYgbiA9PT0gYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgbXNnICs9ICcgb3InO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuICE9PSAwKSB7XG4gICAgICAgICAgICAgIG1zZyArPSAnLCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtc2cgKz0gJyBcIicgKyB2YWwgKyAnXCInO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjb25kICYmIGNvbmQuZmlsbGVkKSBtc2cgKz0gJ25vbi1lbXB0eSAnO1xuICAgICAgICAgIGlmIChjb25kICYmIGNvbmQud29yZENoYXIpIG1zZyArPSAnbm9uLW51bWJlciAnO1xuICAgICAgICAgIG1zZyArPSAnc3RyaW5nJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBlbHNlIHtcbiAgICAgICAgbXNnICs9IHR5cGU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlRGF0YS5zaGFwZSkge1xuICAgICAgICBtc2cgKz0gJyAoJyArIHR5cGVEYXRhLnNoYXBlICsgJyknO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtc2c7XG4gIH1cblxuICAvLyAtLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLVxuICBzdGF0aWMgdG9UaXRsZUNhc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzdHIuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHR5cGUgeyBQcm9wZXJ0aWVzIH0gZnJvbSAnLi9TbGlkZXI4OUJhc2UnO1xuaW1wb3J0IHR5cGUgeyBFdmVudFR5cGUgfSBmcm9tICcuL1NsaWRlcjg5RXZlbnRzJztcbmltcG9ydCB0eXBlIHsgVmFyaWFibGVOYW1lIH0gZnJvbSAnLi9TbGlkZXI4OVN0cnVjdHVyZVBhcnNlcic7XG5pbXBvcnQgTGlicmFyeVR5cGVDaGVjayBmcm9tICcuL0xpYnJhcnlUeXBlQ2hlY2snO1xuaW1wb3J0IFNsaWRlcjg5RE9NIGZyb20gJy4vU2xpZGVyODlET00nO1xuaW1wb3J0IFNsaWRlcjg5RE9NQnVpbGRlciBmcm9tICcuL1NsaWRlcjg5RE9NQnVpbGRlcic7XG5cbnR5cGUgUHJvcGVydGllc091dGxpbmUgPSB7XG4gIFsgUHJvcCBpbiBrZXlvZiBQcm9wZXJ0aWVzLkJhc2UgXTogUHJvcGVydHlPdXRsaW5lLnNlbGY8UHJvcGVydGllcy5CYXNlW1Byb3BdPjtcbn1cblxubmFtZXNwYWNlIFByb3BlcnR5T3V0bGluZSB7XG4gIGV4cG9ydCB0eXBlIHNlbGY8VHlwZT4gPVxuICAgICAgRGVmYXVsdDxUeXBlPiAmIFBhcnRpYWw8R2V0dGVyU2V0dGVyPFR5cGU+PiAmIFBhcnRpYWw8QWRkaXRpb25hbDxUeXBlPj5cbiAgICB8IEdldHRlclNldHRlcjxUeXBlPiAmIFBhcnRpYWw8RGVmYXVsdDxUeXBlPj4gJiBQYXJ0aWFsPEFkZGl0aW9uYWw8VHlwZT4+O1xuXG4gIHR5cGUgRGVmYXVsdDxUeXBlPiA9IHtcbiAgICBkZWZhdWx0OiBUeXBlIHwgKCgpID0+IFR5cGUpO1xuICB9XG4gIHR5cGUgR2V0dGVyU2V0dGVyPFR5cGU+ID0ge1xuICAgIHNldHRlcjogKHZhbDogVHlwZSkgPT4gdm9pZCB8IGJvb2xlYW47XG4gICAgZ2V0dGVyOiAodmFsOiBUeXBlKSA9PiB0eXBlb2YgdmFsO1xuICB9XG4gIHR5cGUgQWRkaXRpb25hbDxUeXBlPiA9IHtcbiAgICBwb3N0U2V0dGVyOiAodmFsOiBUeXBlLCBwcmV2VmFsOiBUeXBlKSA9PiB2b2lkIHwgYm9vbGVhbjtcbiAgICBrZXlTZXR0ZXI6IFR5cGUgZXh0ZW5kcyBBcnJheTxhbnk+XG4gICAgICA/ICh2YWw6IFR5cGVbMF0sIGtleTogbnVtYmVyKSA9PiB2b2lkIHwgYm9vbGVhblxuICAgICAgOiBuZXZlcjtcbiAgICBrZXlHZXR0ZXI6IFR5cGUgZXh0ZW5kcyBBcnJheTxhbnk+XG4gICAgICA/ICh2YWw6IFR5cGVbMF0sIGtleTogbnVtYmVyKSA9PiB0eXBlb2YgdmFsXG4gICAgICA6IG5ldmVyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlcjg5IGV4dGVuZHMgU2xpZGVyODlET00ge1xuICBtZXRob2RzID0gPGNvbnN0PiAoe1xuICAgIGFkZEV2ZW50OiB7XG4gICAgICBmdW5jdGlvbjogdGhpcy5hZGRFdmVudCxcbiAgICB9LFxuICAgIHJlbW92ZUV2ZW50OiB7XG4gICAgICBmdW5jdGlvbjogdGhpcy5yZW1vdmVFdmVudCxcbiAgICB9XG4gIH0pO1xuXG4gIHByb3BlcnRpZXM6IFByb3BlcnRpZXNPdXRsaW5lID0ge1xuICAgIHJhbmdlOiB7XG4gICAgICBkZWZhdWx0OiBbMCwgMTAwXSxcbiAgICAgIHNldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICBpZiAodmFsWzBdID09PSB2YWxbMV0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU2xpZGVyODkuUHJvcGVydHlFcnJvcih0aGlzLCAncmFuZ2UnLFxuICAgICAgICAgICAgJ1RoZSBnaXZlbiByYW5nZSBvZiBbJyArIHZhbC5qb2luKCcsICcpICsgJ10gZGVmaW5lcyB0aGUgc2FtZSB2YWx1ZSBmb3IgYm90aCByYW5nZSBzdGFydCBhbmQgZW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICB0aGlzLmFwcGx5QWxsUmF0aW9EaXN0YW5jZXMoeyByYW5nZTogdmFsIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAga2V5U2V0dGVyOiAodmFsLCBrZXkpID0+IHtcbiAgICAgICAgLy8gQ29tcGFyZSBgdmFsYCB3aXRoIHRoZSB2YWx1ZSBhdCB0aGUgb3RoZXIga2V5ICgwIG9yIDEpXG4gICAgICAgIGlmICh2YWwgPT09IHRoaXMudmFscy5yYW5nZVtNYXRoLmFicyhrZXkgLSAxKV0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU2xpZGVyODkuUHJvcGVydHlFcnJvcih0aGlzLCAncmFuZ2UnLFxuICAgICAgICAgICAgJ1RoZSBuZXcgcmFuZ2Ugb2YgWycgKyB2YWwgKyAnLCAnICsgdmFsICsgJ10gZGVmaW5lcyB0aGUgc2FtZSB2YWx1ZSBmb3IgYm90aCByYW5nZSBzdGFydCBhbmQgZW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICBjb25zdCBuZXdSYW5nZSA9IEFycmF5LmZyb20odGhpcy52YWxzLnJhbmdlKSBhcyB0eXBlb2YgdGhpcy52YWxzLnJhbmdlO1xuICAgICAgICAgIG5ld1JhbmdlW2tleV0gPSB2YWw7XG4gICAgICAgICAgdGhpcy5hcHBseUFsbFJhdGlvRGlzdGFuY2VzKHsgcmFuZ2U6IG5ld1JhbmdlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB2YWx1ZXM6IHtcbiAgICAgIGRlZmF1bHQ6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLnZhbHMucmFuZ2VbMF1dO1xuICAgICAgfSxcbiAgICAgIHNldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIC8vIEFkZC9yZW1vdmUgdGh1bWJzIGlmIHRoZSBnaXZlbiBhcnJheSBpcyBiaWdnZXIvc21hbGxlciB0aGFuIHRoZSBjdXJyZW50IGB2YWx1ZXNgIGFycmF5XG4gICAgICAgICAgaWYgKHZhbC5sZW5ndGggPiB0aGlzLnZhbHMudmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMudmFscy52YWx1ZXMubGVuZ3RoOyBpIDwgdmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWRkTmV3VGh1bWJOb2RlKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmxlbmd0aCA8IHRoaXMudmFscy52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gdmFsLmxlbmd0aDsgaSA8IHRoaXMudmFscy52YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMYXN0VGh1bWJOb2RlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcG9zdFNldHRlcjogKHZhbCwgcHJldlZhbCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIC8vIE1hbnVhbGx5IGludm9rZSBgdmFsdWVgIHByb3BlcnR5IGNoYW5nZVxuICAgICAgICAgIHRoaXMuaGFuZGxlSW50ZXJuYWxQcm9wZXJ0eUNoYW5nZSgndmFsdWUnLCBwcmV2VmFsWzBdKTtcbiAgICAgICAgICB0aGlzLmhhbmRsZUludGVybmFsUHJvcGVydHlDaGFuZ2UoJ25vZGUnKTtcblxuICAgICAgICAgIC8vIFRPRE8gUGVyaGFwcyBtb3ZlIHRoaXMgaW50byBhbiBvd24gZnVuY3Rpb25cbiAgICAgICAgICAvLyBFeHBhbmRpbmcgc3RydWN0dXJlIHZhcmlhYmxlcyB3aGljaCBhcmUgdXNlZCBpbiBiYXNlIGVsZW1lbnQgdGFncyAodGh1bWIgYW5kIGRlc2NlbmRhbnRzKVxuICAgICAgICAgIGZvciAoY29uc3QgWyBwcm9wTmFtZSwgc3RyaW5nTGlzdCBdIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuZG9tQnVpbGRlci5zdHJ1Y3R1cmVWYXJUaHVtYlN0cmluZ3MpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHZhclN0cmluZyBvZiBzdHJpbmdMaXN0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IG5vZGVMaXN0ID0gdGhpcy5kb21CdWlsZGVyLnN0cnVjdHVyZVZhcnNbcHJvcE5hbWVdW3ZhclN0cmluZ107XG4gICAgICAgICAgICAgIHRoaXMucmVwbGFjZVN0cnVjdHVyZVZhclN0cmluZ0luTm9kZXModmFyU3RyaW5nLCBub2RlTGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAga2V5U2V0dGVyOiAodmFsLCBrZXkpID0+IHtcbiAgICAgICAgdmFsID0gdGhpcy5hZGFwdFZhbHVlVG9SYW5nZSh2YWwpO1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIGlmIChrZXkgPT09IDApIHtcbiAgICAgICAgICAgIHZhciBwcmV2VmFsID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcHBseU9uZVJhdGlvRGlzdGFuY2Uoa2V5LCB7dmFsdWU6IHZhbH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmFscy52YWx1ZXNba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBrZXlHZXR0ZXI6ICh2YWwsIGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy52YWxzLnByZWNpc2lvbiAhPT0gZmFsc2UgPyBOdW1iZXIodmFsLnRvRml4ZWQodGhpcy52YWxzLnByZWNpc2lvbikpIDogdmFsO1xuICAgICAgfVxuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgIHNldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICB0aGlzLnZhbHVlc1swXSA9IHZhbDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgZ2V0dGVyOiAodmFsKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlc1swXTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHByZWNpc2lvbjoge1xuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICBzZXR0ZXI6ICh2YWwpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICB0aGlzLmFwcGx5QWxsUmF0aW9EaXN0YW5jZXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc3RlcDoge1xuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICBzZXR0ZXI6ICh2YWwpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudmFscy5wcmVjaXNpb24gIT09IGZhbHNlICYmIHZhbCAhPT0gZmFsc2UgJiYgTnVtYmVyKHZhbC50b0ZpeGVkKHRoaXMudmFscy5wcmVjaXNpb24pKSAhPT0gdmFsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlByb3BlcnR5RXJyb3IodGhpcywgJ3N0ZXAnLFxuICAgICAgICAgICAgJ1RoZSBnaXZlbiB2YWx1ZSBvZiAnICsgdmFsICsgJyBleGNlZWRzIHRoZSBjdXJyZW50bHkgc2V0IHByZWNpc2lvbiBvZiAnICsgdGhpcy52YWxzLnByZWNpc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICB0aGlzLmFwcGx5QWxsUmF0aW9EaXN0YW5jZXMoeyBzdGVwOiB2YWwgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc3RydWN0dXJlOiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIG5vZGU6IHtcbiAgICAgIC8vIEB0cy1pZ25vcmUgKG9ubHkgU2V0dXApXG4gICAgICBkZWZhdWx0OiB7fSxcbiAgICB9LFxuICAgIG9yaWVudGF0aW9uOiB7XG4gICAgICBkZWZhdWx0OiAnaG9yaXpvbnRhbCcsXG4gICAgICBzZXR0ZXI6ICh2YWwpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICB0aGlzLmNoYW5nZU9yaWVudGF0aW9uRE9NKHZhbCk7XG4gICAgICAgICAgdGhpcy52YWxzLm9yaWVudGF0aW9uID0gdmFsO1xuICAgICAgICAgIHRoaXMuYXBwbHlBbGxSYXRpb0Rpc3RhbmNlcygpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjbGFzc0xpc3Q6IHtcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICBkZWZhdWx0OiB7fSxcbiAgICAgIHNldHRlcjogKHZhbCkgPT4ge1xuICAgICAgICBpZiAodmFsICE9PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnN0IGVyclR5cGVzID0gW107XG4gICAgICAgICAgZm9yIChsZXQgZXZlbnRUeXBlIGluIHZhbCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrRXZlbnRUeXBlKGV2ZW50VHlwZSBhcyBFdmVudFR5cGUuQmFzZSkpIGVyclR5cGVzLnB1c2goZXZlbnRUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGVyclR5cGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Qcm9wZXJ0eUVycm9yKHRoaXMsICdldmVudHMnLFxuICAgICAgICAgICAgICAnVGhlIGdpdmVuIG9iamVjdCBjb250YWlucyBpdGVtcyB3aGljaCBhcmUgbm8gdmFsaWQgZXZlbnQgdHlwZXM6JyArIFNsaWRlcjg5LmFycmF5VG9MaXN0U3RyaW5nKGVyclR5cGVzKVxuICAgICAgICAgICAgICArICdBdmFpbGFibGUgZXZlbnQgdHlwZXMgYXJlOicgKyBTbGlkZXI4OS5hcnJheVRvTGlzdFN0cmluZyhTbGlkZXI4OS5hdmFpbGFibGVFdmVudFR5cGVzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFRPRE8gTWFrZSBzZXBhcmF0ZSB0eXAgYFByb3BlcnRpZXNDb25maWdgLCBleGNsdWRpbmcgcmVhZE9ubHkgcHJvcGVydGllc1xuICAvLyAoTGlrZSBgbm9kZWApXG4gIGNvbnN0cnVjdG9yKHRhcmdldDogSFRNTEVsZW1lbnQsIGNvbmZpZz86IFBhcnRpYWw8UHJvcGVydGllcy5Db25maWc+IHwgZmFsc2UsIHJlcGxhY2UgPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pbml0aWFsID0gdHJ1ZTtcblxuICAgIHRoaXMudGVzdEluaXRpYWxUYXJnZXQodGFyZ2V0KTtcblxuICAgIGlmIChjb25maWcgPT0gbnVsbCB8fCBjb25maWcgPT09IGZhbHNlKSBjb25maWcgPSB7fTtcbiAgICB0aGlzLnRlc3RJbml0aWFsQ29uZmlnKGNvbmZpZyk7XG5cbiAgICB0aGlzLmluaXRpYWxpemVDbGFzc1Byb3BlcnRpZXMoY29uZmlnKTtcbiAgICB0aGlzLmluaXRpYWxpemVDdXN0b21Qcm9wZXJ0aWVzKGNvbmZpZyk7XG4gICAgdGhpcy5pbml0aWFsaXplTWV0aG9kcygpO1xuXG4gICAgdGhpcy5idWlsZFNsaWRlcih0YXJnZXQsIHJlcGxhY2UpO1xuXG4gICAgdGhpcy5hcHBseUFsbFJhdGlvRGlzdGFuY2VzKCk7XG5cbiAgICAvLyBFeHBhbmRpbmcgc3RydWN0dXJlIHZhcmlhYmxlcyBpbml0aWFsbHlcbiAgICAvLyBUaGlzIGhhcHBlbnMgc28gbGF0ZSB0byBlbnN1cmUgdGhhdCAkbm9kZSBjYW4gYmUgYWNjZXNzZWQgcHJvcGVybHlcbiAgICBpZiAodGhpcy52YWxzLnN0cnVjdHVyZSAhPT0gZmFsc2UpIHtcbiAgICAgIGZvciAobGV0IHZhcmlhYmxlIGluIHRoaXMuZG9tQnVpbGRlci5zdHJ1Y3R1cmVWYXJzKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUG90ZW50aWFsU3RydWN0dXJlVmFyKHZhcmlhYmxlIGFzIFZhcmlhYmxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsID0gZmFsc2U7XG4gIH1cblxuXG4gIHRlc3RJbml0aWFsVGFyZ2V0KHRhcmdldDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkluaXRpYWxpemF0aW9uRXJyb3IoJ05vIGZpcnN0IGFyZ3VtZW50IGhhcyBiZWVuIHN1cHBsaWVkLiBJdCBuZWVkcyB0byBiZSB0aGUgRE9NIHRhcmdldCBub2RlIGZvciB0aGUgc2xpZGVyJyk7XG4gICAgfSBlbHNlIGlmICghdGFyZ2V0Lm5vZGVUeXBlIHx8IHRhcmdldC5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkluaXRpYWxpemF0aW9uRXJyb3IoJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgdmFsaWQgRE9NIG5vZGUgKGdvdCAnICsgTGlicmFyeVR5cGVDaGVjay5nZXRUeXBlKHRhcmdldCkgKyAnKScpO1xuICAgIH1cbiAgfVxuICB0ZXN0SW5pdGlhbENvbmZpZyhjb25maWc6IFBhcnRpYWw8UHJvcGVydGllcy5Db25maWc+KSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcgIT09ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkoY29uZmlnKSkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LkluaXRpYWxpemF0aW9uRXJyb3IoJ1RoZSBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBjb25maWd1cmF0aW9uIG9iamVjdCAoZ290ICcgKyBMaWJyYXJ5VHlwZUNoZWNrLmdldFR5cGUoY29uZmlnKSArICcpJyk7XG4gICAgfSBlbHNlIGlmICgndmFsdWUnIGluIGNvbmZpZyAmJiAndmFsdWVzJyBpbiBjb25maWcpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Jbml0aWFsaXphdGlvbkVycm9yKCdPbmx5IG9uZSBvZiDigJh2YWx1ZeKAmSBhbmQg4oCYdmFsdWVz4oCZIG1heSBiZSBkZWZpbmVkIGF0IG9uY2UnKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIEluaXRpYWxpemUgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuICBpbml0aWFsaXplQ2xhc3NQcm9wZXJ0aWVzKGNvbmZpZzogUGFydGlhbDxQcm9wZXJ0aWVzLkNvbmZpZz4pIHtcbiAgICAvLyBOT1RFOiBUaGlzIHNlY3Rpb24gaGFzIG5vIHN0cm9uZyB0eXBlIGNoZWNraW5nIGJlY2F1c2UgcHJvcERhdGEgaXMgb2YgdHlwZSBhbnlcbiAgICAvLyBEb24ndCBldmVuIGJvdGhlciB0cnlpbmcgdG8gZml4IHRoaXMsIGZvciB5b3VyIG93biBzYWtlXG4gICAgZm9yIChsZXQgXyBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgIC8vIElFLXN1cHBvcnQ6IGl0ZW0gbmVlZHMgdG8gYmUgYSBzY29wZWQgdmFyaWFibGUgYmVjYXVzZSBkZWZpbmVQcm9wZXJ0eSBpcyBhc3luY1xuICAgICAgY29uc3QgaXRlbSA9IF87XG4gICAgICBjb25zdCBwcm9wID0gdGhpcy5wcm9wZXJ0aWVzW2l0ZW1dO1xuICAgICAgY29uc3QgcHJvcERhdGEgPSBTbGlkZXI4OS5wcm9wZXJ0eURhdGFbaXRlbV07XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBpdGVtLCB7XG4gICAgICAgIHNldDogKHZhbDogUHJvcGVydGllcy5CYXNlW2tleW9mIFByb3BlcnRpZXMuQmFzZV0pID0+IHtcbiAgICAgICAgICBpZiAocHJvcERhdGEucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5FcnJvcignUHJvcGVydHkg4oCYJyArIGl0ZW0gKyAn4oCZIGlzIHJlYWQtb25seSAoSXQgd2FzIGp1c3Qgc2V0IHdpdGggdGhlIHZhbHVlIOKAmCcgKyB2YWwgKyAn4oCZKScpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocHJvcERhdGEuY29uc3RydWN0b3JPbmx5ICYmICF0aGlzLmluaXRpYWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5FcnJvcignUHJvcGVydHkg4oCYJyArIGl0ZW0gKyAn4oCZIG1heSBvbmx5IGJlIGRlZmluZWQgaW4gdGhlIGNvbnN0cnVjdG9yIChJdCB3YXMganVzdCBzZXQgd2l0aCB0aGUgdmFsdWUg4oCYJyArIHZhbCArICfigJkpJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5jaGVja1Byb3AoaXRlbSBhcyBrZXlvZiBQcm9wZXJ0aWVzLldyaXRhYmxlLCB2YWwpO1xuXG4gICAgICAgICAgaWYgKCFwcm9wLnNldHRlciB8fCAhcHJvcC5zZXR0ZXIodmFsKSkge1xuICAgICAgICAgICAgdGhpcy52YWxzW2l0ZW1dID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ2V0dGVyRW5kcG9pbnQgPSAocHJvcERhdGEuaXNEZWVwRGVmaW5lZEFycmF5KVxuICAgICAgICAgICAgPyB0aGlzLnZhbHMuJGludGVybWVkaWF0ZVRoaXNcbiAgICAgICAgICAgIDogdGhpcy52YWxzO1xuICAgICAgICAgIHJldHVybiAocHJvcC5nZXR0ZXIgPyBwcm9wLmdldHRlcihnZXR0ZXJFbmRwb2ludFtpdGVtXSkgOiBnZXR0ZXJFbmRwb2ludFtpdGVtXSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRlZmluZURlZXBQcm9wZXJ0eSh0aGlzLnZhbHMsIGl0ZW0gYXMga2V5b2YgUHJvcGVydGllcy5CYXNlLCB0aGlzLnZhbHMuJCwgcHJvcC5wb3N0U2V0dGVyLCBwcm9wRGF0YS5pc0RlZXBEZWZpbmVkQXJyYXkpO1xuXG4gICAgICBpZiAoaXRlbSBpbiBjb25maWcpIHtcbiAgICAgICAgdGhpc1tpdGVtXSA9IGNvbmZpZ1tpdGVtXTtcbiAgICAgICAgZGVsZXRlIGNvbmZpZ1tpdGVtXTtcbiAgICAgIH0gZWxzZSBpZiAoJ2RlZmF1bHQnIGluIHByb3ApIHtcbiAgICAgICAgY29uc3QgZGVmID0gcHJvcC5kZWZhdWx0O1xuICAgICAgICAoKHByb3AuZ2V0dGVyIHx8IHByb3Aua2V5R2V0dGVyKSA/IHRoaXMgOiB0aGlzLnZhbHMpW2l0ZW1dID0gKHR5cGVvZiBkZWYgPT09ICdmdW5jdGlvbicgPyBkZWYoKSA6IGRlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZUN1c3RvbVByb3BlcnRpZXMoY29uZmlnOiBQYXJ0aWFsPFByb3BlcnRpZXMuQ3VzdG9tPikge1xuICAgIGZvciAobGV0IF8gaW4gY29uZmlnKSB7XG4gICAgICBjb25zdCBpdGVtID0gXztcblxuICAgICAgaWYgKGl0ZW1bMF0gPT09ICdfJykge1xuICAgICAgICB0aGlzLmRlZmluZURlZXBQcm9wZXJ0eSh0aGlzLCBpdGVtIGFzIGtleW9mIFByb3BlcnRpZXMuQ3VzdG9tLCB0aGlzLnZhbHMpO1xuICAgICAgICB0aGlzLnZhbHNbaXRlbV0gPSBjb25maWdbaXRlbV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgU2xpZGVyODkuSW5pdGlhbGl6YXRpb25FcnJvcihcbiAgICAgICAgICAn4oCYJyArIGl0ZW0gKyAn4oCZIGlzIG5vdCBhIHZhbGlkIHByb3BlcnR5IG5hbWUuIENoZWNrIGl0cyBzcGVsbGluZyBvciBwcmVmaXggaXQgd2l0aCBhbiB1bmRlcnNjb3JlIHRvIHVzZSBpdCBhcyBjdXN0b20gcHJvcGVydHkgKOKAmF8nICsgaXRlbSArICfigJkpJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZU1ldGhvZHMoKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICBmb3IgKGxldCBfIGluIHRoaXMubWV0aG9kcykge1xuICAgICAgY29uc3QgaXRlbSA9IF87XG4gICAgICBjb25zdCBtZXRob2QgPSB0aGlzLm1ldGhvZHNbaXRlbV07XG4gICAgICBjb25zdCBhcmdDb3VudCA9IFNsaWRlcjg5Lm1ldGhvZERhdGFbaXRlbV0uYXJncy5sZW5ndGg7XG4gICAgICB0aGlzW2l0ZW1dID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIGFyZ0NvdW50KTtcbiAgICAgICAgdGhhdC5jaGVja01ldGhvZChpdGVtIGFzIGtleW9mIHR5cGVvZiB0aGlzLm1ldGhvZHMsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gbWV0aG9kLmZ1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkU2xpZGVyKHRhcmdldDogSFRNTEVsZW1lbnQsIHJlcGxhY2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnZhbHMubm9kZSA9IHRoaXMuZG9tQnVpbGRlci5jcmVhdGVTbGlkZXJOb2RlKHRoaXMudmFscy52YWx1ZXMubGVuZ3RoLCB0aGlzLnZhbHMuc3RydWN0dXJlKTtcblxuICAgIGlmIChyZXBsYWNlKSB7XG4gICAgICB0aGlzLmRvbUJ1aWxkZXIuYWRkQXR0cmlidXRlc0Zyb21UYXJnZXQodGhpcy52YWxzLm5vZGUsIHRhcmdldCk7XG4gICAgfVxuICAgIHRoaXMuZG9tQnVpbGRlci5hZGRDbGFzc2VzKHRoaXMudmFscy5ub2RlLCB0aGlzLnZhbHMuY2xhc3NMaXN0LCB0aGlzLnZhbHMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpO1xuXG4gICAgU2xpZGVyODlET01CdWlsZGVyLmluamVjdFN0eWxlU2hlZXRJZk5lZWRlZCgpO1xuXG4gICAgaWYgKHJlcGxhY2UpIHtcbiAgICAgIHRhcmdldC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh0aGlzLnZhbHMubm9kZS5zbGlkZXIsIHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZCh0aGlzLnZhbHMubm9kZS5zbGlkZXIpO1xuICAgIH1cblxuICAgIHRoaXMudHJhY2tTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy52YWxzLm5vZGUudHJhY2spO1xuICB9XG5cbiAgLy8gLS0tLSBIZWxwZXIgZnVuY3Rpb25zIC0tLS1cbiAgLy8gQ2hlY2sgcHJvcGVydGllcyAmIG1ldGhvZHMgZm9yIHRoZSBjb3JyZWN0IHR5cGUgJiBmb3JtYXRcbiAgY2hlY2tNZXRob2QobWV0aG9kOiBrZXlvZiB0eXBlb2YgdGhpcy5tZXRob2RzLCBhcmdMaXN0OiBhbnlbXSkge1xuICAgIGNvbnN0IG9iaiA9IFNsaWRlcjg5Lm1ldGhvZERhdGFbbWV0aG9kXTtcbiAgICAvLyBJZiB0aGUgbmV4dCBhcmd1bWVudCAoYXJnTGlzdC5sZW5ndGggLSAxICsgMSkgaXMgbm90IG9wdGlvbmFsLCBhIHJlcXVpcmVkIGFyZyBpcyBtaXNzaW5nXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBhcmcgPSBhcmdMaXN0W2ldO1xuICAgICAgY29uc3QgdHlwZU1zZyA9IExpYnJhcnlUeXBlQ2hlY2suY2hlY2tUeXBlcyhhcmcsIG9iai5hcmdzW2ldLmRlc2NyaXB0b3IpO1xuICAgICAgaWYgKHR5cGVNc2cpIHRocm93IG5ldyBTbGlkZXI4OS5NZXRob2RBcmdUeXBlRXJyb3IobWV0aG9kLCBpLCB0eXBlTXNnKTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmIChvYmouYXJnc1thcmdMaXN0Lmxlbmd0aF0gJiYgIW9iai5hcmdzW2FyZ0xpc3QubGVuZ3RoXS5vcHRpb25hbCkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5Lk1ldGhvZEFyZ09taXRFcnJvcihtZXRob2QsIGFyZ0xpc3QubGVuZ3RoKTtcbiAgICB9XG4gIH1cbiAgY2hlY2tQcm9wKHByb3A6IGtleW9mIFByb3BlcnRpZXMuV3JpdGFibGUsIHZhbDogYW55KSB7XG4gICAgY29uc3QgcHJvcGVydHlJbmZvID0gU2xpZGVyODkucHJvcGVydHlEYXRhW3Byb3BdO1xuICAgIGNvbnN0IHR5cGVNc2cgPSBMaWJyYXJ5VHlwZUNoZWNrLmNoZWNrVHlwZXModmFsLCBwcm9wZXJ0eUluZm8uZGVzY3JpcHRvcik7XG4gICAgaWYgKHR5cGVNc2cpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5Qcm9wZXJ0eVR5cGVFcnJvcih0aGlzLCBwcm9wLCBwcm9wZXJ0eUluZm8sIHR5cGVNc2cpO1xuICAgIH1cbiAgfVxuXG4gIGFkYXB0VmFsdWVUb1JhbmdlKHZhbHVlOiBQcm9wZXJ0aWVzLkJhc2VbJ3ZhbHVlJ10pIHtcbiAgICBpZiAodGhpcy52YWxzLnJhbmdlWzBdIDwgdGhpcy52YWxzLnJhbmdlWzFdKSB7XG4gICAgICBpZiAodmFsdWUgPCB0aGlzLnZhbHMucmFuZ2VbMF0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFscy5yYW5nZVswXTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiB0aGlzLnZhbHMucmFuZ2VbMV0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFscy5yYW5nZVsxXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbHVlID4gdGhpcy52YWxzLnJhbmdlWzBdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHMucmFuZ2VbMF07XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlIDwgdGhpcy52YWxzLnJhbmdlWzFdKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHMucmFuZ2VbMV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8vIC0tLS0gSGVscGVyIGZ1bmN0aW9ucyAtLS0tXG4gIHN0YXRpYyBmbG9hdElzRXF1YWwodmFsMDogbnVtYmVyLCB2YWwxOiBudW1iZXIpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModmFsMCAtIHZhbDEpIDwgMC4wMDAwMDAwMDAwMTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHR5cGUgeyBEZWVwUmVhZG9ubHlPYmplY3QsIERlc2NyaXB0b3IgfSBmcm9tICcuL0xpYnJhcnlUeXBlQ2hlY2snO1xuaW1wb3J0IHR5cGUgeyBFdmVudFR5cGUsIEV2ZW50RGF0YSB9IGZyb20gJy4vU2xpZGVyODlFdmVudHMnO1xuaW1wb3J0IFNsaWRlcjg5RXJyb3IgZnJvbSAnLi9TbGlkZXI4OUVycm9yJztcblxuLy8gLS0tLSBNaXNjIHR5cGVzIC0tLS1cbnR5cGUgQ3VzdG9tUHJvcGVydHlOYW1lID0gYF8ke3N0cmluZ31gO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb3BlcnR5Tm9kZUJhc2VFbGVtZW50cyB7XG4gIHNsaWRlcjogSFRNTERpdkVsZW1lbnQ7XG4gIHRyYWNrOiBIVE1MRGl2RWxlbWVudDtcbiAgdGh1bWI6IEhUTUxEaXZFbGVtZW50W107XG59XG5leHBvcnQgdHlwZSBQcm9wZXJ0eU5vZGUgPSBQcm9wZXJ0eU5vZGVCYXNlRWxlbWVudHMgJiB7XG4gIFsgS2V5OiBzdHJpbmcgXTogRWxlbWVudCB8IEVsZW1lbnRbXTtcbn07XG5cbnR5cGUgRXZlbnRMaXN0ID0ge1xuICBbIFR5cGUgaW4gRXZlbnRUeXBlLkJhc2UgXTogRXZlbnREYXRhLkZuW11cbn1cblxuLy8gLS0tLSBQcm9wZXJ0eSB0eXBlcyAtLS0tXG5leHBvcnQgbmFtZXNwYWNlIFByb3BlcnRpZXMge1xuICBleHBvcnQgaW50ZXJmYWNlIEJhc2Uge1xuICAgIHJhbmdlOiBbIG51bWJlciwgbnVtYmVyIF07XG4gICAgdmFsdWVzOiBudW1iZXJbXTtcbiAgICB2YWx1ZTogbnVtYmVyO1xuICAgIHByZWNpc2lvbjogbnVtYmVyIHwgZmFsc2U7XG4gICAgc3RlcDogbnVtYmVyIHwgZmFsc2U7XG4gICAgc3RydWN0dXJlOiBzdHJpbmcgfCBmYWxzZTtcbiAgICBub2RlOiBQcm9wZXJ0eU5vZGU7XG4gICAgb3JpZW50YXRpb246ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCc7XG4gICAgY2xhc3NMaXN0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gfCBmYWxzZTtcbiAgICBldmVudHM6IFBhcnRpYWw8RXZlbnRMaXN0PiB8IGZhbHNlO1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgVmFscyBleHRlbmRzIEJhc2Uge1xuICAgIHJlYWRvbmx5ICQ6IEJhc2U7XG4gICAgcmVhZG9ubHkgJGludGVybWVkaWF0ZVRoaXM6IERlZXA7XG4gICAgcmVhZG9ubHkgJGludGVybWVkaWF0ZVZhbHM6IERlZXA7XG4gIH1cblxuICBleHBvcnQgdHlwZSBDdXN0b20gPSBSZWNvcmQ8Q3VzdG9tUHJvcGVydHlOYW1lLCBhbnk+O1xuICBleHBvcnQgdHlwZSBXaXRoQ3VzdG9tID0gQmFzZSAmIEN1c3RvbTtcbiAgZXhwb3J0IHR5cGUgQ29uZmlnID0gT21pdDxXaXRoQ3VzdG9tLCBSZWFkb25seVByb3BlcnR5TmFtZXM+O1xuXG4gIGV4cG9ydCB0eXBlIFdyaXRhYmxlID0gT21pdDxCYXNlLCBSZWFkb25seVByb3BlcnR5TmFtZXM+O1xuXG4gIGV4cG9ydCB0eXBlIERlZXAgPSB7XG4gICAgWyBQcm9wIGluIERlZXBQcm9wZXJ0eU5hbWVzIF06IEJhc2VbUHJvcF1cbiAgfVxufVxuXG5cbmV4cG9ydCB0eXBlIFByb3BlcnR5SW5mbzxQcm9wPiA9IFByb3AgZXh0ZW5kcyBSZWFkb25seVByb3BlcnR5TmFtZXNcbiAgPyB7IHJlYWRPbmx5OiB0cnVlOyB9XG4gIDoge1xuICAgICAgY29uc3RydWN0b3JPbmx5PzogYm9vbGVhbjtcbiAgICAgIGlzRGVlcERlZmluZWRBcnJheT86IGJvb2xlYW47XG4gICAgICBkZXNjcmlwdG9yOiBEZXNjcmlwdG9yLnNlbGY7XG4gICAgfVxuXG50eXBlIFByb3BlcnR5RGF0YSA9IERlZXBSZWFkb25seU9iamVjdDx7XG4gIFsgUHJvcCBpbiBrZXlvZiBQcm9wZXJ0aWVzLkJhc2UgXTogUHJvcGVydHlJbmZvPFByb3A+XG59PlxuXG4vLyAtLS0tIE1ldGhvZCB0eXBlcyAtLS0tXG4vLyBUT0RPIFRoZSBjdXJyZW50IG1ldGhvZCBzeXN0ZW0gaGFzIGEgbG90IG9mIG92ZXJoZWFkIGFuZCBpcyBvdmVycHJvdGVjdGl2ZSDigJNcbi8vICAgICAgRXNwZWNpYWxseSBzaW5jZSBtb3N0IG90aGVyIG1ldGhvZHMgYXJlIHB1YmxpYyBhcyB3ZWxsLlxudHlwZSBNZXRob2REYXRhID0gRGVlcFJlYWRvbmx5T2JqZWN0PHtcbiAgWyBLZXk6IHN0cmluZyBdOiB7XG4gICAgYXJnczogQXJyYXk8e1xuICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgb3B0aW9uYWw/OiBib29sZWFuO1xuICAgICAgZGVzY3JpcHRvcjogRGVzY3JpcHRvci5zZWxmXG4gICAgfT5cbiAgfVxufT5cblxuXG4vLyAtLS0tIFR5cGVzIHRvIGtlZXAgdHJhY2sgb2YgLS0tLVxuLy8gVGhpcyBpbmZvcm1hdGlvbiBjYW5ub3QgYmUgZXh0cmFjdGVkIGZyb20gdGhlIHJlYWRvbmx5IGBwcm9wZXJ0eURhdGFgIGJlbG93LlxuLy8gVGhpcywgTk9URTogS2VlcCB0cmFjayBvZiB0aGlzIHdoZW4gbW9kaWZ5aW5nIHByb3BlcnRpZXMuXG50eXBlIERlZXBQcm9wZXJ0eU5hbWVzID0gJ3JhbmdlJyB8ICd2YWx1ZXMnO1xudHlwZSBSZWFkb25seVByb3BlcnR5TmFtZXMgPSAnbm9kZSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyODlCYXNlIGV4dGVuZHMgU2xpZGVyODlFcnJvciB7XG4gIC8vIFR5cGVTY3JpcHQgZG9lcyBub3QgYWxsb3cgY3VzdG9tIHByb3BlcnRpZXMgaW4gY2xhc3Nlc1xuICAvLyBiZWNhdXNlIHRoZXkgYXJlIGJ1c3kgaWdub3JpbmcgYWxsIG9wZW4gaXNzdWVzIHdpdGggZ29vZCBzdWdnZXN0aW9uc1xuICAvLyBUaHVzLCBOT1RFOiBFeHBhbmQgdGhpcyAoY29weS1wYXN0ZSkgd2hlbmV2ZXIgdGhlIHByb3BlcnRpZXMgY2hhbmdlLlxuICByYW5nZTogUHJvcGVydGllcy5CYXNlWydyYW5nZSddXG4gIHZhbHVlczogUHJvcGVydGllcy5CYXNlWyd2YWx1ZXMnXVxuICB2YWx1ZTogUHJvcGVydGllcy5CYXNlWyd2YWx1ZSddXG4gIHByZWNpc2lvbjogUHJvcGVydGllcy5CYXNlWydwcmVjaXNpb24nXVxuICBzdGVwOiBQcm9wZXJ0aWVzLkJhc2VbJ3N0ZXAnXVxuICBzdHJ1Y3R1cmU6IFByb3BlcnRpZXMuQmFzZVsnc3RydWN0dXJlJ11cbiAgbm9kZTogUHJvcGVydGllcy5CYXNlWydub2RlJ11cbiAgb3JpZW50YXRpb246IFByb3BlcnRpZXMuQmFzZVsnb3JpZW50YXRpb24nXVxuICBjbGFzc0xpc3Q6IFByb3BlcnRpZXMuQmFzZVsnY2xhc3NMaXN0J11cbiAgZXZlbnRzOiBQcm9wZXJ0aWVzLkJhc2VbJ2V2ZW50cyddXG5cbiAgc3RhdGljIG1ldGhvZERhdGEgPSAoe1xuICAgIGFkZEV2ZW50OiB7XG4gICAgICBhcmdzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnZXZlbnQgdHlwZScsXG4gICAgICAgICAgZGVzY3JpcHRvcjogW3tcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgfV1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdldmVudCBmdW5jdGlvbicsXG4gICAgICAgICAgZGVzY3JpcHRvcjogW3tcbiAgICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcbiAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2V2ZW50IG5hbWVzcGFjZScsXG4gICAgICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICAgICAgZGVzY3JpcHRvcjogW3tcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgY29uZGl0aW9uczoge1xuICAgICAgICAgICAgICBmaWxsZWQ6IHRydWUsXG4gICAgICAgICAgICAgIHdvcmRDaGFyOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgcmVtb3ZlRXZlbnQ6IHtcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdldmVudCBpZGVudGlmaWVyL25hbWVzcGFjZScsXG4gICAgICAgICAgZGVzY3JpcHRvcjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgY29uZGl0aW9uczoge1xuICAgICAgICAgICAgICAgIG5vbm5lZ2F0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGludGVnZXI6IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBmaWxsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgd29yZENoYXI6IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfSkgYXMgY29uc3Qgc2F0aXNmaWVzIE1ldGhvZERhdGE7XG4gIHN0YXRpYyBwcm9wZXJ0eURhdGE6IFByb3BlcnR5RGF0YSA9IDxjb25zdD4gKHtcbiAgICByYW5nZToge1xuICAgICAgaXNEZWVwRGVmaW5lZEFycmF5OiB0cnVlLFxuICAgICAgZGVzY3JpcHRvcjogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBzaGFwZTogJ1tzdGFydFZhbHVlLCBlbmRWYWx1ZV0nLFxuICAgICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICAgIGxlbmd0aDogMlxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVzY3JpcHRvcjogW1xuICAgICAgICAgICAgeyB0eXBlOiAnbnVtYmVyJyB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7IHR5cGU6ICdib29sZWFuJyB9XG4gICAgICBdXG4gICAgfSxcbiAgICB2YWx1ZXM6IHtcbiAgICAgIGlzRGVlcERlZmluZWRBcnJheTogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfV1cbiAgICAgIH1dXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgZGVzY3JpcHRvcjogW3tcbiAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgIH1dXG4gICAgfSxcbiAgICBwcmVjaXNpb246IHtcbiAgICAgIGRlc2NyaXB0b3I6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICAgIG5vbm5lZ2F0aXZlOiB0cnVlLFxuICAgICAgICAgICAgaW50ZWdlcjogdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgeyB0eXBlOiAnZmFsc2UnIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHN0ZXA6IHtcbiAgICAgIGRlc2NyaXB0b3I6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgIGNvbmRpdGlvbnM6IHtcbiAgICAgICAgICAgIHBvc2l0aXZlOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7IHR5cGU6ICdmYWxzZScgfVxuICAgICAgXVxuICAgIH0sXG4gICAgc3RydWN0dXJlOiB7XG4gICAgICBjb25zdHJ1Y3Rvck9ubHk6IHRydWUsXG4gICAgICBkZXNjcmlwdG9yOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICBjb25kaXRpb25zOiB7XG4gICAgICAgICAgICBmaWxsZWQ6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XG4gICAgICBdXG4gICAgfSxcbiAgICBub2RlOiB7XG4gICAgICByZWFkT25seTogdHJ1ZVxuICAgIH0sXG4gICAgb3JpZW50YXRpb246IHtcbiAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICBjb25kaXRpb25zOiB7XG4gICAgICAgICAga2V5d29yZHM6IFtcbiAgICAgICAgICAgICdob3Jpem9udGFsJyxcbiAgICAgICAgICAgICd2ZXJ0aWNhbCdcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH1dXG4gICAgfSxcbiAgICBjbGFzc0xpc3Q6IHtcbiAgICAgIGNvbnN0cnVjdG9yT25seTogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0b3I6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgIHNoYXBlOiAne25vZGVOYW1lOiBbLi4uY2xhc3Nlc119JyxcbiAgICAgICAgICBrZXlOYW1lOiAnbm9kZU5hbWUnLFxuICAgICAgICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgICAgZGVzY3JpcHRvcjogW1xuICAgICAgICAgICAgICB7IHR5cGU6ICdzdHJpbmcnIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICB7IHR5cGU6ICdmYWxzZScgfVxuICAgICAgXVxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICBjb25zdHJ1Y3Rvck9ubHk6IHRydWUsXG4gICAgICBkZXNjcmlwdG9yOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICBzaGFwZTogJ3tldmVudE5hbWU6IFsuLi5mdW5jdGlvbnNdfScsXG4gICAgICAgICAga2V5TmFtZTogJ2V2ZW50TmFtZScsXG4gICAgICAgICAgZGVzY3JpcHRvcjogW3tcbiAgICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgICBkZXNjcmlwdG9yOiBbe1xuICAgICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1dXG4gICAgICAgIH0sXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XG4gICAgICBdXG4gICAgfVxuICB9KTtcblxuICBtZXRob2RzO1xuICBwcm9wZXJ0aWVzO1xuXG4gIC8vIEB0cy1pZ25vcmVcbiAgdmFsczogUHJvcGVydGllcy5WYWxzID0ge307IC8vIGhvbGRpbmcgZXZlcnkgY2xhc3MgcHJvcGVydHlcbiAgaW5pdGlhbCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICAvKiBTcGVjaWFsIHByb3BlcnRpZXMgd2hpY2ggYXJlIG9ubHkgdG8gYmUgYWNjZXNzZWQgYnkgYSBnZXR0ZXIvc2V0dGVyLCBuZXZlciBkaXJlY3RseTpcbiAgICAgKiAgICQ6IEZpeGVkIGVuZHBvaW50IGZvciB0aGUgdmFsdWVzIG9mIGFsbCBwcm9wZXJ0aWVzXG4gICAgICogICAkaW50ZXJtZWRpYXRlVGhpczogSW50ZXJtZWRpYXRlIHByb3BlcnR5IChiZXR3ZWVuIHRoaXMgYW5kIHZhbHMpIGZvciB0aGUga2V5cyBvZiBhbiBhcnJheS9vYmplY3RcbiAgICAgKiAgICRpbnRlcm1lZGlhdGVWYWxzOiBJbnRlcm1lZGlhdGUgcHJvcGVydHkgKGJldHdlZW4gdmFscyBhbmQgdmFscy4kKSBmb3IgdGhlIGtleXMgb2YgYW4gYXJyYXkvb2JqZWN0XG4gICAgICpcbiAgICAgKiBUaGlzIHJlc3VsdHMgaW4gdGhlIGZvbGxvd2luZyBnZXR0ZXIvc2V0dGVyIHBhdGhzOlxuICAgICAqICAgTm9ybWFsIChwcmltaXRpdmUgJiBzaGFsbG93KSBwcm9wZXJ0aWVzOlxuICAgICAqICAgICA8dGhpcy5wcm9wZXJ0eT4gICAtLS0gVHlwZSBjaGVjayAmIEN1c3RvbSBnZXR0ZXIvc2V0dGVyIC0tLT5cbiAgICAgKiAgICAgPHZhbHMucHJvcGVydHk+ICAgLS0tIEludGVybmFsIHByb3BlcnR5IHVwZGF0ZSAtLS0+XG4gICAgICogICAgIDx2YWxzLiQucHJvcGVydHk+XG4gICAgICogICBEZWVwbHkgZGVmaW5lZCBBcnJheXM6XG4gICAgICogICAgIDx0aGlzLnByb3BlcnR5PiAgICAgICAgICAgICAgICAgICAgICAgIC0tLSBUeXBlIGNoZWNrICYgQ3VzdG9tIGdldHRlci9zZXR0ZXIgLS0tPlxuICAgICAqICAgICA8dmFscy4kaW50ZXJtZWRpYXRlVGhpcy5wcm9wZXJ0eSA9IFtdPiAtLS0gQ3VzdG9tIGdldHRlci9zZXR0ZXIgb24gdGhlIGtleXMvaW5kZXhlcyAtLS0+XG4gICAgICogICAgIDx2YWxzLnByb3BlcnR5PiAgICAgICAgICAgICAgICAgICAgICAgIC0tLSBJbnRlcm5hbCBwcm9wZXJ0eSB1cGRhdGUgLS0tPlxuICAgICAqICAgICA8dmFscy4kaW50ZXJtZWRpYXRlVmFscy5wcm9wZXJ0eSA9IFtdPiAtLS0gSW50ZXJuYWwgcHJvcGVydHlba2V5L2luZGV4XSB1cGRhdGUgLS0tPlxuICAgICAqICAgICA8dmFscy4kLnByb3BlcnR5PlxuICAgICAqXG4gICAgICogT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgaXMgdXNlZCBmb3Igbm9uLWVudW1lcmFiaWxpdHkgJiBub24td3JpdGFiaWxpdHkgb2YgdGhlc2Ugc3BlY2lhbCBwcm9wZXJ0aWVzLlxuICAgICAqL1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMudmFscywge1xuICAgICAgJyQnOiB7XG4gICAgICAgIHZhbHVlOiB7fVxuICAgICAgfSxcbiAgICAgICckaW50ZXJtZWRpYXRlVGhpcyc6IHtcbiAgICAgICAgdmFsdWU6IHt9XG4gICAgICB9LFxuICAgICAgJyRpbnRlcm1lZGlhdGVWYWxzJzoge1xuICAgICAgICB2YWx1ZToge31cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCB0eXBlIHsgUHJvcGVydGllcyB9IGZyb20gJy4vU2xpZGVyODlCYXNlJztcbmltcG9ydCBTbGlkZXI4OSBmcm9tICcuL1NsaWRlcjg5JztcbmltcG9ydCBTbGlkZXI4OURPTUJ1aWxkZXIgZnJvbSAnLi9TbGlkZXI4OURPTUJ1aWxkZXInO1xuaW1wb3J0IFNsaWRlcjg5UHJvcGVydGllcyBmcm9tICcuL1NsaWRlcjg5UHJvcGVydGllcyc7XG5cbmludGVyZmFjZSBDbGllbnRYWSB7XG4gIGNsaWVudFg6IG51bWJlcjtcbiAgY2xpZW50WTogbnVtYmVyO1xufVxuXG50eXBlIFN0eWxlRGlyZWN0aW9uID0gJ1RvcCcgfCAnUmlnaHQnIHwgJ0JvdHRvbScgfCAnTGVmdCc7XG5cbnR5cGUgUmVjb21wdXRhdGlvbk5ld1ZhbHMgPSBQYXJ0aWFsPHtcbiAgWyBQcm9wIGluICd2YWx1ZScgfCAncmFuZ2UnIHwgJ3N0ZXAnIF06IFByb3BlcnRpZXMuQmFzZVtQcm9wXVxufT5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyODlET00gZXh0ZW5kcyBTbGlkZXI4OVByb3BlcnRpZXMge1xuICBhY3RpdmVUb3VjaElEcyA9IG5ldyBNYXA8bnVtYmVyLCBIVE1MRGl2RWxlbWVudD4oKTtcbiAgYWN0aXZlVGh1bWI6IEhUTUxEaXZFbGVtZW50O1xuICBtb3VzZURvd25Qb3M6IG51bWJlcjtcblxuICB0cmFja1N0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uO1xuXG4gIGRvbUJ1aWxkZXI6IFNsaWRlcjg5RE9NQnVpbGRlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5tb3VzZVN0YXJ0ID0gdGhpcy5tb3VzZVN0YXJ0LmJpbmQodGhpcyk7XG4gICAgdGhpcy5tb3VzZU1vdmUgPSB0aGlzLm1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMubW91c2VFbmQgPSB0aGlzLm1vdXNlRW5kLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnRvdWNoU3RhcnQgPSB0aGlzLnRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLnRvdWNoTW92ZSA9IHRoaXMudG91Y2hNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy50b3VjaEVuZCA9IHRoaXMudG91Y2hFbmQuYmluZCh0aGlzKTtcblxuICAgIHRoaXMua2V5RG93biA9IHRoaXMua2V5RG93bi5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5kb21CdWlsZGVyID0gbmV3IFNsaWRlcjg5RE9NQnVpbGRlcih0aGlzLnZhbHMsIHtcbiAgICAgIHRvdWNoc3RhcnQ6IHRoaXMudG91Y2hTdGFydCxcbiAgICAgIG1vdXNlZG93bjogdGhpcy5tb3VzZVN0YXJ0LFxuICAgICAga2V5ZG93bjogdGhpcy5rZXlEb3duXG4gICAgfSk7XG4gIH1cblxuXG4gIC8vIC0tLS0gRE9NIGdldHRlcnMgLS0tLVxuICBnZXRUcmFja1BhZGRpbmcoZGlyZWN0aW9uOiBTdHlsZURpcmVjdGlvbik6IG51bWJlciB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy50cmFja1N0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmcnICsgZGlyZWN0aW9uKSk7XG4gIH1cbiAgZ2V0VHJhY2tPZmZzZXQoZGlyZWN0aW9uOiBTdHlsZURpcmVjdGlvbik6IG51bWJlciB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy50cmFja1N0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JvcmRlcicgKyBkaXJlY3Rpb24gKyAnV2lkdGgnKSlcbiAgICAgICsgdGhpcy5nZXRUcmFja1BhZGRpbmcoZGlyZWN0aW9uKTtcbiAgfVxuXG4gIGdldERpc3RhbmNlKHRodW1iOiBIVE1MRGl2RWxlbWVudCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMudmFscy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuIHRodW1iLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICAgICAgICAtIHRoaXMudmFscy5ub2RlLnRyYWNrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICAgICAgICAtIHRoaXMuZ2V0VHJhY2tPZmZzZXQoJ1RvcCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGh1bWIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdFxuICAgICAgICAtIHRoaXMudmFscy5ub2RlLnRyYWNrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnRcbiAgICAgICAgLSB0aGlzLmdldFRyYWNrT2Zmc2V0KCdMZWZ0Jyk7XG4gICAgfVxuICB9XG4gIGdldEFic29sdXRlVHJhY2tTaXplKHRodW1iOiBIVE1MRGl2RWxlbWVudCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMudmFscy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuIHRoaXMudmFscy5ub2RlLnRyYWNrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxuICAgICAgICAtIHRoaXMuZ2V0VHJhY2tPZmZzZXQoJ1RvcCcpXG4gICAgICAgIC0gdGhpcy5nZXRUcmFja09mZnNldCgnQm90dG9tJylcbiAgICAgICAgLSB0aHVtYi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHMubm9kZS50cmFjay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICAgICAtIHRoaXMuZ2V0VHJhY2tPZmZzZXQoJ0xlZnQnKVxuICAgICAgICAtIHRoaXMuZ2V0VHJhY2tPZmZzZXQoJ1JpZ2h0JylcbiAgICAgICAgLSB0aHVtYi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIFRodW1iIG1vdmluZyAtLS0tXG4gIG1vdmVUaHVtYlRyYW5zbGF0ZSh0aHVtYjogSFRNTERpdkVsZW1lbnQsIGRpc3RhbmNlOiBudW1iZXIpIHtcbiAgICBjb25zdCBheGlzID0gdGhpcy52YWxzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ1knIDogJ1gnO1xuICAgIHRodW1iLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIGRpc3RhbmNlICsgJ3B4KSc7XG4gIH1cbiAgbW92ZVRodW1iUmVsYXRpdmUodGh1bWI6IEhUTUxEaXZFbGVtZW50LCBkaXN0YW5jZTogbnVtYmVyKSB7XG4gICAgLy8gUmVsYXRpdmUgcG9zaXRpb25pbmcgc3RhcnRzIGF0IHRoZSBwYWRkaW5nLCBzbyBsb29raW5nIGF0IHRoZSBib3JkZXIgaXMgbm90IG5lZWRlZFxuICAgIGlmICh0aGlzLnZhbHMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHZhciBvZmZzZXRTdGFydCA9IHRoaXMuZ2V0VHJhY2tQYWRkaW5nKCdUb3AnKTtcbiAgICAgIHZhciBvZmZzZXRFbmQgPSB0aGlzLmdldFRyYWNrUGFkZGluZygnQm90dG9tJyk7XG4gICAgICB2YXIgdGh1bWJEaW0gPSB0aHVtYi5jbGllbnRIZWlnaHQ7XG4gICAgICB2YXIgcG9zQW5jaG9yID0gJ3RvcCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBvZmZzZXRTdGFydCA9IHRoaXMuZ2V0VHJhY2tQYWRkaW5nKCdMZWZ0Jyk7XG4gICAgICB2YXIgb2Zmc2V0RW5kID0gdGhpcy5nZXRUcmFja1BhZGRpbmcoJ1JpZ2h0Jyk7XG4gICAgICB2YXIgdGh1bWJEaW0gPSB0aHVtYi5jbGllbnRXaWR0aDtcbiAgICAgIHZhciBwb3NBbmNob3IgPSAnbGVmdCc7XG4gICAgfVxuXG4gICAgbGV0IHN1YnRyYWN0ID0gKHRodW1iRGltICogZGlzdGFuY2UpICsgJ3B4JztcbiAgICBpZiAob2Zmc2V0RW5kKSBzdWJ0cmFjdCArPSAnIC0gJyArIChvZmZzZXRFbmQgKiBkaXN0YW5jZSkgKyAncHgnO1xuICAgIGlmIChvZmZzZXRTdGFydCkgc3VidHJhY3QgKz0gJyArICcgKyAob2Zmc2V0U3RhcnQgKiAoMSAtIGRpc3RhbmNlKSkgKyAncHgnO1xuXG4gICAgdGh1bWIuc3R5bGVbcG9zQW5jaG9yXSA9ICdjYWxjKCcgKyAoZGlzdGFuY2UgKiAxMDApICsgJyUgLSAnICsgc3VidHJhY3QgKyAnKSc7XG4gIH1cblxuICBhcHBseUFsbFJhdGlvRGlzdGFuY2VzKG5ld1ZhbHM/OiBSZWNvbXB1dGF0aW9uTmV3VmFscykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy52YWxzLnZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5hcHBseU9uZVJhdGlvRGlzdGFuY2UoaSwgbmV3VmFscyk7XG4gICAgfVxuICB9XG4gIGFwcGx5T25lUmF0aW9EaXN0YW5jZSh0aHVtYkluZGV4OiBudW1iZXIsIG5ld1ZhbHM/OiBSZWNvbXB1dGF0aW9uTmV3VmFscykge1xuICAgIGNvbnN0IHsgdmFsdWUsIHByZXZSYXRpbywgcmF0aW8gfSA9IHRoaXMuY29tcHV0ZVJhdGlvRGlzdGFuY2UodGh1bWJJbmRleCwgbmV3VmFscyk7XG5cbiAgICB0aGlzLnNldFZhbHVlc1dpdGhWYWx1ZUNoYW5nZSh0aHVtYkluZGV4LCB2YWx1ZSk7XG4gICAgaWYgKCFTbGlkZXI4OS5mbG9hdElzRXF1YWwocmF0aW8sIHByZXZSYXRpbykpIHRoaXMubW92ZVRodW1iUmVsYXRpdmUodGhpcy52YWxzLm5vZGUudGh1bWJbdGh1bWJJbmRleF0sIHJhdGlvKTtcbiAgfVxuXG4gIC8vIC0tLS0gRGlzdGFuY2UgY29tcHV0YXRpb24gLS0tLVxuICBjb21wdXRlRGlzdGFuY2VWYWx1ZSh0aHVtYjogSFRNTERpdkVsZW1lbnQsIGRpc3RhbmNlOiBudW1iZXIsIGFic1NpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKGFic1NpemUgPT0gbnVsbCkgYWJzU2l6ZSA9IHRoaXMuZ2V0QWJzb2x1dGVUcmFja1NpemUodGh1bWIpO1xuICAgIHJldHVybiBkaXN0YW5jZSAvIGFic1NpemUgKiAodGhpcy52YWxzLnJhbmdlWzFdIC0gdGhpcy52YWxzLnJhbmdlWzBdKSArIHRoaXMudmFscy5yYW5nZVswXTtcbiAgfVxuXG4gIGNvbXB1dGVSYXRpb0Rpc3RhbmNlKHRodW1iSW5kZXg6IG51bWJlciwgbmV3VmFscz86IFJlY29tcHV0YXRpb25OZXdWYWxzKSB7XG4gICAgbGV0IHZhbHVlOiBQcm9wZXJ0aWVzLkJhc2VbJ3ZhbHVlJ107XG4gICAgbGV0IHJhdGlvOiBudW1iZXI7XG5cbiAgICBpZiAoIW5ld1ZhbHMpIHtcbiAgICAgIG5ld1ZhbHMgPSB0aGlzLnZhbHM7XG4gICAgICB2YWx1ZSA9IHRoaXMudmFscy52YWx1ZXNbdGh1bWJJbmRleF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IHByb3Agb2YgWyAncmFuZ2UnLCAnc3RlcCcgXSBhcyBjb25zdCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlID8/P1xuICAgICAgICBpZiAobmV3VmFsc1twcm9wXSA9PSBudWxsKSBuZXdWYWxzW3Byb3BdID0gdGhpcy52YWxzW3Byb3BdO1xuICAgICAgfVxuICAgICAgaWYgKG5ld1ZhbHMudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICB2YWx1ZSA9IG5ld1ZhbHMudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYXRpbyA9ICh0aGlzLnZhbHMudmFsdWVzW3RodW1iSW5kZXhdIC0gdGhpcy52YWxzLnJhbmdlWzBdKSAvICh0aGlzLnZhbHMucmFuZ2VbMV0gLSB0aGlzLnZhbHMucmFuZ2VbMF0pO1xuICAgICAgICB2YWx1ZSA9IChuZXdWYWxzLnJhbmdlWzFdIC0gbmV3VmFscy5yYW5nZVswXSkgKiByYXRpbyArIG5ld1ZhbHMucmFuZ2VbMF07XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJvdW5kIHZhbHVlIHRvIGEgZ2l2ZW4gc3RlcFxuICAgIGlmIChuZXdWYWxzLnN0ZXAgIT09IGZhbHNlKSB7XG4gICAgICBpZiAoTWF0aC5hYnMobmV3VmFscy5yYW5nZVsxXSAtIG5ld1ZhbHMucmFuZ2VbMF0pIDwgbmV3VmFscy5zdGVwKSB7XG4gICAgICAgIHZhbHVlID0gbmV3VmFscy5yYW5nZVswXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gbmV3VmFscy5yYW5nZVswXSArIE1hdGgucm91bmQoKHZhbHVlIC0gbmV3VmFscy5yYW5nZVswXSkgLyBuZXdWYWxzLnN0ZXApICogbmV3VmFscy5zdGVwO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBuZXdSYXRpbyA9ICh2YWx1ZSAtIG5ld1ZhbHMucmFuZ2VbMF0pIC8gKG5ld1ZhbHMucmFuZ2VbMV0gLSBuZXdWYWxzLnJhbmdlWzBdKTtcblxuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBwcmV2UmF0aW86IHJhdGlvLFxuICAgICAgcmF0aW86IG5ld1JhdGlvXG4gICAgfTtcbiAgfVxuXG4gIC8vIC0tLS0gSGVscGVyIGZ1bmN0aW9ucyAtLS0tXG4gIHJlbW92ZUxhc3RUaHVtYk5vZGUoKSB7XG4gICAgY29uc3QgdGh1bWIgPSB0aGlzLmRvbUJ1aWxkZXIucmVtb3ZlVGh1bWJGcm9tTm9kZSh0aGlzLnZhbHMubm9kZSk7XG4gICAgdGhpcy5kb21CdWlsZGVyLnRodW1iUGFyZW50LnJlbW92ZUNoaWxkKHRodW1iKTtcbiAgfVxuICBhZGROZXdUaHVtYk5vZGUodGh1bWJJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5kb21CdWlsZGVyLmFkZFRodW1iVG9Ob2RlKHRoaXMudmFscy5ub2RlKTtcbiAgICB0aGlzLmFwcGx5T25lUmF0aW9EaXN0YW5jZSh0aHVtYkluZGV4KTtcbiAgfVxuXG4gIGNoYW5nZU9yaWVudGF0aW9uRE9NKG5ld09yaWVudGF0aW9uOiBQcm9wZXJ0aWVzLkJhc2VbJ29yaWVudGF0aW9uJ10pIHtcbiAgICBpZiAobmV3T3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHRoaXMuI3JlbW92ZVRodW1ic0RPTVByb3BlcnR5KCdsZWZ0Jyk7XG4gICAgICB0aGlzLnZhbHMubm9kZS5zbGlkZXIuY2xhc3NMaXN0LmFkZCgndmVydGljYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4jcmVtb3ZlVGh1bWJzRE9NUHJvcGVydHkoJ3RvcCcpO1xuICAgICAgdGhpcy52YWxzLm5vZGUuc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3ZlcnRpY2FsJyk7XG4gICAgfVxuICB9XG4gICNyZW1vdmVUaHVtYnNET01Qcm9wZXJ0eShwcm9wZXJ0eTogc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCB0aHVtYiBvZiB0aGlzLnZhbHMubm9kZS50aHVtYikge1xuICAgICAgdGh1bWIuc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHkpO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbHVlc1dpdGhWYWx1ZUNoYW5nZSh0aHVtYkluZGV4OiBudW1iZXIsIHZhbHVlOiBQcm9wZXJ0aWVzLkJhc2VbJ3ZhbHVlJ10pOiBib29sZWFuIHtcbiAgICBjb25zdCBwcmV2VmFsID0gdGhpcy52YWxzLnZhbHVlc1t0aHVtYkluZGV4XTtcbiAgICBpZiAoIVNsaWRlcjg5LmZsb2F0SXNFcXVhbCh2YWx1ZSwgcHJldlZhbCkpIHtcbiAgICAgIHRoaXMudmFscy52YWx1ZXNbdGh1bWJJbmRleF0gPSB2YWx1ZTtcbiAgICAgIGlmICh0aHVtYkluZGV4ID09PSAwKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlSW50ZXJuYWxQcm9wZXJ0eUNoYW5nZSgndmFsdWUnLCBwcmV2VmFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuXG4gIC8vIC0tLS0gVG91Y2ggZXZlbnRzIC0tLS1cbiAgdG91Y2hTdGFydChlOiBUb3VjaEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGNoYW5nZWRUb3VjaGVzIHNob3VsZCBhbHdheXMgYmUgb2YgbGVuZ3RoIDEgYmVjYXVzZSBubyB0d28gdG91Y2hlcyBjYW4gdHJpZ2dlciBvbmUgZXZlbnQuXG4gICAgY29uc3QgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuICAgIGlmICghdGhpcy5hY3RpdmVUb3VjaElEcy5oYXModG91Y2guaWRlbnRpZmllcikpIHtcbiAgICAgIGNvbnN0IHRodW1iTm9kZSA9IGUudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgdGhpcy5hY3RpdmVUb3VjaElEcy5zZXQodG91Y2guaWRlbnRpZmllciwgdGh1bWJOb2RlKTtcblxuICAgICAgdGhpcy5zbGlkZVN0YXJ0KHRodW1iTm9kZSwgdG91Y2gsIGUpO1xuXG4gICAgICB0aHVtYk5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy50b3VjaE1vdmUsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XG4gICAgICB0aHVtYk5vZGUuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kKTtcbiAgICAgIHRodW1iTm9kZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMudG91Y2hFbmQpO1xuICAgIH1cbiAgfVxuICB0b3VjaE1vdmUoZTogVG91Y2hFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBmb3IgKGNvbnN0IHRvdWNoIG9mIGUuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgIGlmICh0aGlzLmFjdGl2ZVRvdWNoSURzLmhhcyh0b3VjaC5pZGVudGlmaWVyKSkge1xuICAgICAgICBjb25zdCB0aHVtYk5vZGUgPSB0aGlzLmFjdGl2ZVRvdWNoSURzLmdldCh0b3VjaC5pZGVudGlmaWVyKTtcblxuICAgICAgICB0aGlzLnNsaWRlTW92ZSh0aHVtYk5vZGUsIHRvdWNoLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdG91Y2hFbmQoZTogVG91Y2hFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBmb3IgKGNvbnN0IHRvdWNoIG9mIGUuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgIGlmICh0aGlzLmFjdGl2ZVRvdWNoSURzLmhhcyh0b3VjaC5pZGVudGlmaWVyKSkge1xuICAgICAgICBjb25zdCB0aHVtYk5vZGUgPSB0aGlzLmFjdGl2ZVRvdWNoSURzLmdldCh0b3VjaC5pZGVudGlmaWVyKTtcbiAgICAgICAgdGhpcy5hY3RpdmVUb3VjaElEcy5kZWxldGUodG91Y2guaWRlbnRpZmllcik7XG5cbiAgICAgICAgdGhpcy5zbGlkZUVuZCh0aHVtYk5vZGUsIHRvdWNoLCBlKTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRodW1iTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLnRvdWNoTW92ZSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcbiAgICAgICAgdGh1bWJOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEVuZCk7XG4gICAgICAgIHRodW1iTm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMudG91Y2hFbmQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIC0tLS0gTW91c2UgZXZlbnRzIC0tLS1cbiAgbW91c2VTdGFydChlOiBNb3VzZUV2ZW50KSB7XG4gICAgY29uc3QgdGh1bWJOb2RlID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnc2w4OS1ub3NlbGVjdCcpO1xuXG4gICAgdGhpcy5zbGlkZVN0YXJ0KHRodW1iTm9kZSwgZSwgZSk7XG5cbiAgICBpZiAoIXRoaXMuYWN0aXZlVGh1bWIpIHtcbiAgICAgIHRoaXMuYWN0aXZlVGh1bWIgPSB0aHVtYk5vZGU7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tb3VzZU1vdmUpO1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlRW5kKTtcbiAgICB9XG4gIH1cbiAgbW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLnNsaWRlTW92ZSh0aGlzLmFjdGl2ZVRodW1iLCBlLCBlKTtcbiAgfVxuICBtb3VzZUVuZChlOiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5zbGlkZUVuZCh0aGlzLmFjdGl2ZVRodW1iLCBlLCBlKTtcblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlRW5kKTtcbiAgICB0aGlzLm1vdXNlRG93blBvcyA9IG51bGw7XG4gICAgdGhpcy5hY3RpdmVUaHVtYiA9IG51bGw7XG4gIH1cblxuICAvLyAtLS0tIEdlbmVyYWwgZXZlbnQgaGFuZGxlcnMgLS0tLVxuICBzbGlkZVN0YXJ0KHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIGU6IENsaWVudFhZLCBldmVudEFyZzogVUlFdmVudCkge1xuICAgIHRodW1iTm9kZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAvLyBpbnZva2VFdmVudChbJ3N0YXJ0J10sIGV2ZW50QXJnKTtcblxuICAgIGlmICh0aGlzLnZhbHMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHZhciBwb3NBbmNob3IgPSAndG9wJztcbiAgICAgIHZhciBjbGllbnREaW0gPSBlLmNsaWVudFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwb3NBbmNob3IgPSAnbGVmdCc7XG4gICAgICB2YXIgY2xpZW50RGltID0gZS5jbGllbnRYO1xuICAgIH1cbiAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2UodGh1bWJOb2RlKTtcbiAgICB0aGlzLm1vdXNlRG93blBvcyA9IGNsaWVudERpbSAtIGRpc3RhbmNlO1xuICAgIHRoaXMubW92ZVRodW1iVHJhbnNsYXRlKHRodW1iTm9kZSwgZGlzdGFuY2UpO1xuICAgIHRodW1iTm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwb3NBbmNob3IpO1xuICB9XG4gIHNsaWRlTW92ZSh0aHVtYk5vZGU6IEhUTUxEaXZFbGVtZW50LCBlOiBDbGllbnRYWSwgZXZlbnRBcmc6IFVJRXZlbnQpIHtcbiAgICBjb25zdCB0aHVtYkluZGV4ID0gdGhpcy52YWxzLm5vZGUudGh1bWIuaW5kZXhPZih0aHVtYk5vZGUpO1xuICAgIGNvbnN0IGFic1NpemUgPSB0aGlzLmdldEFic29sdXRlVHJhY2tTaXplKHRodW1iTm9kZSk7XG4gICAgbGV0IGRpc3RhbmNlID0gKHRoaXMudmFscy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/IGUuY2xpZW50WSA6IGUuY2xpZW50WCkgLSB0aGlzLm1vdXNlRG93blBvcztcblxuICAgIGlmIChkaXN0YW5jZSA+IGFic1NpemUpXG4gICAgICBkaXN0YW5jZSA9IGFic1NpemU7XG4gICAgZWxzZSBpZiAoZGlzdGFuY2UgPCAwKVxuICAgICAgZGlzdGFuY2UgPSAwO1xuXG4gICAgbGV0IHZhbHVlID0gdGhpcy5jb21wdXRlRGlzdGFuY2VWYWx1ZSh0aHVtYk5vZGUsIGRpc3RhbmNlLCBhYnNTaXplKTtcbiAgICBpZiAodGhpcy52YWxzLnN0ZXAgIT09IGZhbHNlKSB7XG4gICAgICBjb25zdCBjb21wdXRlZFByb3BlcnRpZXMgPSB0aGlzLmNvbXB1dGVSYXRpb0Rpc3RhbmNlKHRodW1iSW5kZXgsIHsgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgdmFsdWUgPSBjb21wdXRlZFByb3BlcnRpZXMudmFsdWU7XG4gICAgICBkaXN0YW5jZSA9IGNvbXB1dGVkUHJvcGVydGllcy5yYXRpbyAqIGFic1NpemU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2V0VmFsdWVzV2l0aFZhbHVlQ2hhbmdlKHRodW1iSW5kZXgsIHZhbHVlKSkge1xuICAgICAgdGhpcy5tb3ZlVGh1bWJUcmFuc2xhdGUodGh1bWJOb2RlLCBkaXN0YW5jZSk7XG4gICAgICB0aGlzLmludm9rZUV2ZW50KFsnbW92ZSddLCBldmVudEFyZyk7XG4gICAgfVxuICB9XG4gIHNsaWRlRW5kKHRodW1iTm9kZTogSFRNTERpdkVsZW1lbnQsIGU6IENsaWVudFhZLCBldmVudEFyZzogVUlFdmVudCkge1xuICAgIGNvbnN0IHRodW1iSW5kZXggPSB0aGlzLnZhbHMubm9kZS50aHVtYi5pbmRleE9mKHRodW1iTm9kZSk7XG5cbiAgICB0aGlzLmFwcGx5T25lUmF0aW9EaXN0YW5jZSh0aHVtYkluZGV4KTtcbiAgICB0aHVtYk5vZGUuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zZm9ybScpO1xuXG4gICAgdGhpcy5pbnZva2VFdmVudChbJ2VuZCddLCBldmVudEFyZyk7XG4gICAgdGh1bWJOb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2w4OS1ub3NlbGVjdCcpO1xuICB9XG5cblxuICAvLyAtLS0tIE1pc2MgZXZlbnRzIC0tLS1cbiAga2V5RG93bihlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKCFlLmtleS5zdGFydHNXaXRoKCdBcnJvdycpKSByZXR1cm47XG5cbiAgICBjb25zdCB0aHVtYkluZGV4ID0gdGhpcy52YWxzLm5vZGUudGh1bWIuaW5kZXhPZihlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTERpdkVsZW1lbnQpO1xuXG4gICAgbGV0IG1vZGlmaWVyID0gTWF0aC5yb3VuZCgodGhpcy52YWxzLnJhbmdlWzFdIC0gdGhpcy52YWxzLnJhbmdlWzBdKSAvIDEwMCk7XG4gICAgaWYgKGUuc2hpZnRLZXkgJiYgZS5jdHJsS2V5KSB7XG4gICAgICBtb2RpZmllciAqPSAwLjE7XG4gICAgfSBlbHNlIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICBtb2RpZmllciAqPSAxMDtcbiAgICB9XG5cbiAgICBpZiAoZS5rZXkgPT09ICdBcnJvd0xlZnQnIHx8IGUua2V5ID09PSAnQXJyb3dVcCcpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudmFsdWVzW3RodW1iSW5kZXhdIC09IG1vZGlmaWVyO1xuICAgIH0gZWxzZSBpZiAoZS5rZXkgPT09ICdBcnJvd1JpZ2h0JyB8fCBlLmtleSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMudmFsdWVzW3RodW1iSW5kZXhdICs9IG1vZGlmaWVyO1xuICAgIH1cbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gQHRzLWlnbm9yZSAoV2VicGFjayBpbXBvcnQpXG5pbXBvcnQgZGVmYXVsdFN0eWxlc1N0cmluZyBmcm9tICcuLi9jc3MvZGVmYXVsdC1zdHlsZXMuY3NzJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wZXJ0aWVzLCBQcm9wZXJ0eU5vZGUsIFByb3BlcnR5Tm9kZUJhc2VFbGVtZW50cyB9IGZyb20gJy4vU2xpZGVyODlCYXNlJztcbmltcG9ydCB0eXBlIHsgUHJvcGVydHlOb2RlV2l0aG91dEFycmF5LCBWYXJpYWJsZU5hbWUgfSBmcm9tICcuL1NsaWRlcjg5U3RydWN0dXJlUGFyc2VyJztcbmltcG9ydCBTbGlkZXI4OSBmcm9tICcuL1NsaWRlcjg5JztcbmltcG9ydCBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlciBmcm9tICcuL1NsaWRlcjg5U3RydWN0dXJlUGFyc2VyJztcblxudHlwZSBWYXJpYWJsZVRodW1iU3RyaW5ncyA9IFBhcnRpYWw8UmVjb3JkPFZhcmlhYmxlTmFtZSwgc3RyaW5nW10+PlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXI4OURPTUJ1aWxkZXIgZXh0ZW5kcyBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlciB7XG4gIHN0YXRpYyBoYXNJbmplY3RlZFN0eWxlc2hlZXQgPSBmYWxzZTtcblxuICAvKiogQSBiYXNpYyB0aHVtYiBub2RlIHVzZWQgZm9yIGNsb25pbmcuICovXG4gIHRodW1iQmFzZTogSFRNTERpdkVsZW1lbnQ7XG4gIHRodW1iUGFyZW50OiBFbGVtZW50O1xuXG4gIGJhc2VFbGVtZW50czogUmVjb3JkPHN0cmluZywgRWxlbWVudD4gPSB7fTtcblxuICAvKipcbiAgICogS2VlcHMgdHJhY2sgb2Ygc3RydWN0dXJlIHZhcmlhYmxlcyBhbmQgdGhlaXIgcmVzcGVjdGl2ZSB2YXJpYWJsZSBzdHJpbmdzXG4gICAqIHdoaWNoIGFyZSB1c2VkIGluIHRoZSB0aHVtYiBhbmQgaXRzIGRlc2NlbmRhbnRzLlxuICAgKi9cbiAgc3RydWN0dXJlVmFyVGh1bWJTdHJpbmdzOiBWYXJpYWJsZVRodW1iU3RyaW5ncyA9IHt9O1xuXG4gIHRodW1iRXZlbnRzOiBSZWNvcmQ8c3RyaW5nLCBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0PiA9IHt9O1xuXG5cbiAgY29uc3RydWN0b3IodmFsczogUHJvcGVydGllcy5WYWxzLCB0aHVtYkV2ZW50czogUmVjb3JkPHN0cmluZywgRXZlbnRMaXN0ZW5lck9yRXZlbnRMaXN0ZW5lck9iamVjdD4pIHtcbiAgICBzdXBlcih2YWxzKTtcbiAgICB0aGlzLnRodW1iRXZlbnRzID0gdGh1bWJFdmVudHM7XG4gIH1cblxuXG4gIC8vIC0tLS0gRWxlbWVudCBidWlsZGVyIC0tLS1cbiAgY3JlYXRlU2xpZGVyTm9kZSh0aHVtYkNvdW50OiBudW1iZXIsIHN0cnVjdHVyZVN0cjogUHJvcGVydGllcy5CYXNlWydzdHJ1Y3R1cmUnXSk6IFByb3BlcnR5Tm9kZSB7XG4gICAgcmV0dXJuIHN0cnVjdHVyZVN0ciA9PT0gZmFsc2VcbiAgICAgID8gdGhpcy5jcmVhdGVTbGlkZXJNYW51YWxseSh0aHVtYkNvdW50KVxuICAgICAgOiB0aGlzLmNyZWF0ZVNsaWRlckZyb21TdHJ1Y3R1cmUodGh1bWJDb3VudCwgc3RydWN0dXJlU3RyKTtcbiAgfVxuXG5cbiAgLy8gSW4gY2FzZSBubyBjdXN0b20gc3RydWN0dXJlIGlzIGRlZmluZWQsIG1hbnVhbGx5IGJ1aWxkIHRoZSBub2RlIHRvIGVuc3VyZSBiZXN0IHBlcmZvcm1hbmNlIChwYXJzZVN0cnVjdHVyZSB0YWtlcyBhIHdoaWxlKVxuICBjcmVhdGVTbGlkZXJNYW51YWxseSh0aHVtYkNvdW50OiBudW1iZXIpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3Qgbm9kZTogUHJvcGVydHlOb2RlQmFzZUVsZW1lbnRzID0ge1xuICAgICAgc2xpZGVyOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIHRyYWNrOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIHRodW1iOiBuZXcgQXJyYXk8SFRNTERpdkVsZW1lbnQ+KHRodW1iQ291bnQpXG4gICAgfTtcblxuICAgIHRoaXMudGh1bWJCYXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy50aHVtYlBhcmVudCA9IG5vZGUudHJhY2s7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRodW1iQ291bnQ7IGkrKykge1xuICAgICAgbm9kZS50aHVtYltpXSA9IHRoaXMuY3JlYXRlTmV3VGh1bWIoKTtcbiAgICB9XG4gICAgbm9kZS5zbGlkZXIuYXBwZW5kQ2hpbGQobm9kZS50cmFjayk7XG5cbiAgICBmb3IgKGxldCBlbGVtZW50IGluIG5vZGUpIHtcbiAgICAgIC8vIFRodW1iIGNsYXNzZXMgYXJlIGFwcGxpZWQgaW4gYGNyZWF0ZU5ld1RodW1iYFxuICAgICAgaWYgKGVsZW1lbnQgIT09ICdzbGlkZXInICYmIGVsZW1lbnQgIT09ICd0aHVtYicpIHtcbiAgICAgICAgbm9kZVtlbGVtZW50XS5jbGFzc0xpc3QuYWRkKCdzbDg5LScgKyBlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGUgYXMgUHJvcGVydHlOb2RlO1xuICB9XG5cbiAgY3JlYXRlU2xpZGVyRnJvbVN0cnVjdHVyZSh0aHVtYkNvdW50OiBudW1iZXIsIHN0cnVjdHVyZVN0cjogc3RyaW5nKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMucGFyc2VTdHJ1Y3R1cmUoc3RydWN0dXJlU3RyKTtcbiAgICB0aGlzLnBhcnNlUG9zdFByb2Nlc3Mobm9kZSwgdGh1bWJDb3VudCk7XG4gICAgcmV0dXJuIG5vZGUgYXMgdW5rbm93biBhcyBQcm9wZXJ0eU5vZGU7XG4gIH1cblxuICBwYXJzZVBvc3RQcm9jZXNzKG5vZGU6IFByb3BlcnR5Tm9kZVdpdGhvdXRBcnJheSwgdGh1bWJDb3VudDogbnVtYmVyKSB7XG4gICAgLy8gTk9URTogdGh1bWIgYW5kIHRyYWNrIGNhbiBiZSBkZWZpbmVkIGluZGVwZW5kZW50bHlcbiAgICAvLyBJLmUuIHRyYWNrIGdldHMgdGhlIGNsYXNzIGBzbDg5LXRyYWNrYCwgYnV0IHRoaXMudGh1bWJQYXJlbnQgY2FuIGJlIGEgZGlmZmVyZW50IG5vZGVcbiAgICBpZiAoIW5vZGUudGh1bWIpIHtcbiAgICAgIHRoaXMudGh1bWJCYXNlID0gdGhpcy5hc3NlbWJsZUVsZW1lbnQobm9kZSwgJ3RodW1iJywgW10sICdkaXYnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aHVtYkJhc2UgPSBub2RlLnRodW1iO1xuICAgICAgaWYgKG5vZGUudHJhY2spIHtcbiAgICAgICAgdGhpcy50aHVtYlBhcmVudCA9IG5vZGUudGh1bWIucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIH1cbiAgICAgIC8vIGJhc2VFbGVtZW50cyBpcyBvbmx5IGVmZmVjdGl2ZSBpZiBhIHN0cnVjdHVyZSB0aHVtYiBoYXMgYmVlbiBkZWZpbmVkXG4gICAgICB0aGlzLmJhc2VFbGVtZW50cy50aHVtYiA9IHRoaXMudGh1bWJCYXNlO1xuICAgIH1cbiAgICBpZiAoIW5vZGUudHJhY2spIHtcbiAgICAgIG5vZGUudHJhY2sgPSB0aGlzLmFzc2VtYmxlRWxlbWVudChub2RlLCAndHJhY2snLCBbXSwgJ2RpdicpO1xuICAgICAgaWYgKG5vZGUudGh1bWIpIHtcbiAgICAgICAgbm9kZS50aHVtYi5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5vZGUudHJhY2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS5zbGlkZXIuYXBwZW5kQ2hpbGQobm9kZS50cmFjayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIG9yaWdpbmFsIHRodW1iIG5vZGVcbiAgICBpZiAobm9kZS50aHVtYikge1xuICAgICAgbm9kZS50aHVtYi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUudGh1bWIpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMudGh1bWJQYXJlbnQpIHtcbiAgICAgIHRoaXMudGh1bWJQYXJlbnQgPSBub2RlLnRyYWNrO1xuICAgIH1cblxuICAgIG5vZGUudHJhY2suY2xhc3NMaXN0LmFkZCgnc2w4OS10cmFjaycpO1xuXG4gICAgLy8gTk9URTogRnJvbSBoZXJlIG9uLCBgbm9kZWAgaXMgb2YgdHlwZSBgUHJvcGVydHlOb2RlYFxuXG4gICAgLy8gUHVzaCB0aHVtYiAmIGRlc2NlbmRhbnRzIGludG8gbm9kZSBhcnJheXNcbiAgICAobm9kZSBhcyB1bmtub3duIGFzIFByb3BlcnR5Tm9kZSkudGh1bWIgPSBbXTtcbiAgICBmb3IgKGNvbnN0IG5vZGVOYW1lIG9mIHRoaXMudGh1bWJDaGlsZHJlbikge1xuICAgICAgdGhpcy5iYXNlRWxlbWVudHNbbm9kZU5hbWVdID0gbm9kZVtub2RlTmFtZV07XG4gICAgICAobm9kZSBhcyB1bmtub3duIGFzIFByb3BlcnR5Tm9kZSlbbm9kZU5hbWVdID0gW107XG4gICAgfVxuXG4gICAgdGhpcy5maW5kU3RydWN0dXJlVmFyU3RyaW5nc0luVGh1bWIodGhpcy50aHVtYkJhc2UpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aHVtYkNvdW50OyBpKyspIHtcbiAgICAgIHRoaXMuYWRkVGh1bWJUb05vZGUoKG5vZGUgYXMgdW5rbm93biBhcyBQcm9wZXJ0eU5vZGUpKTtcbiAgICB9XG4gIH1cblxuICBmaW5kU3RydWN0dXJlVmFyU3RyaW5nc0luVGh1bWIodGh1bWJCYXNlOiB0eXBlb2YgdGhpcy50aHVtYkJhc2UpIHtcbiAgICBmb3IgKGNvbnN0IFsgcHJvcE5hbWUsIHN0cmluZ0xpc3QgXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLnN0cnVjdHVyZVZhcnMpKSB7XG4gICAgICBsZXQgdGh1bWJTdHJpbmdzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBbIHN0ciwgbm9kZUxpc3QgXSBvZiBPYmplY3QuZW50cmllcyhzdHJpbmdMaXN0KSkge1xuICAgICAgICBmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZUxpc3QpIHtcbiAgICAgICAgICBpZiAodGhpcy5ub2RlSGFzQmFzZUVsZW1lbnRPd25lcihub2RlKSkge1xuICAgICAgICAgICAgdGh1bWJTdHJpbmdzLnB1c2goc3RyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRodW1iU3RyaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc3RydWN0dXJlVmFyVGh1bWJTdHJpbmdzW3Byb3BOYW1lXSA9IHRodW1iU3RyaW5ncztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC8vIC0tLS0gVGh1bWIgaGVscGVycyAtLS0tXG4gIGFkZFRodW1iVG9Ob2RlKG5vZGU6IFByb3BlcnR5Tm9kZSkge1xuICAgIGNvbnN0IG5ld1RodW1iID0gdGhpcy5jcmVhdGVOZXdUaHVtYigpO1xuICAgIG5vZGUudGh1bWIucHVzaChuZXdUaHVtYik7XG5cbiAgICBTbGlkZXI4OURPTUJ1aWxkZXIuZmluZE5vZGVDaGlsZHJlbihuZXdUaHVtYilcbiAgICAgIC5mb3JFYWNoKChjaGlsZE5vZGUsIGopID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGROYW1lID0gdGhpcy50aHVtYkNoaWxkcmVuW2pdO1xuICAgICAgICAobm9kZVtjaGlsZE5hbWVdIGFzIEVsZW1lbnRbXSkucHVzaChjaGlsZE5vZGUpO1xuICAgICAgfSk7XG4gIH1cbiAgcmVtb3ZlVGh1bWJGcm9tTm9kZShub2RlOiBQcm9wZXJ0eU5vZGUpIHtcbiAgICBmb3IgKGNvbnN0IG5vZGVOYW1lIG9mIHRoaXMudGh1bWJDaGlsZHJlbikge1xuICAgICAgKG5vZGVbbm9kZU5hbWVdIGFzIEVsZW1lbnRbXSkucG9wKCk7XG4gICAgfVxuICAgIHJldHVybiBub2RlLnRodW1iLnBvcCgpO1xuICB9XG5cblxuICAvLyAtLS0tIE1pc2MgZnVuY3Rpb25zIC0tLS1cbiAgYWRkQXR0cmlidXRlc0Zyb21UYXJnZXQobm9kZTogUHJvcGVydHlOb2RlLCB0YXJnZXROb2RlOiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB0YXJnZXROb2RlLmF0dHJpYnV0ZXM7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBub2RlLnNsaWRlci5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlc1tpXS5uYW1lLCBhdHRyaWJ1dGVzW2ldLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzc2VzKG5vZGU6IFByb3BlcnR5Tm9kZSwgY2xhc3NMaXN0OiBQcm9wZXJ0aWVzLkJhc2VbJ2NsYXNzTGlzdCddLCBpc1ZlcnRpY2FsOiBib29sZWFuKSB7XG4gICAgbm9kZS5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyODknKTtcbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgbm9kZS5zbGlkZXIuY2xhc3NMaXN0LmFkZCgndmVydGljYWwnKTtcbiAgICB9XG4gICAgaWYgKGNsYXNzTGlzdCkge1xuICAgICAgdGhpcy5hZGRDbGFzc2VzRnJvbUNsYXNzTGlzdChub2RlLCBjbGFzc0xpc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCB0aGUgc3BlY2lmaWVkIGNsYXNzZXMgYW5kIGNvbGxlY3RpbmcgYWxsIG5vbmV4aXN0ZW50IG5vZGVzIGluIGBlcnJOb2Rlc2BcbiAgYWRkQ2xhc3Nlc0Zyb21DbGFzc0xpc3Qobm9kZTogUHJvcGVydHlOb2RlLCBjbGFzc0xpc3Q6IEV4Y2x1ZGU8UHJvcGVydGllcy5CYXNlWydjbGFzc0xpc3QnXSwgZmFsc2U+KSB7XG4gICAgY29uc3QgZXJyTm9kZXM6IHN0cmluZ1tdID0gW107XG5cbiAgICBmb3IgKGxldCBub2RlTmFtZSBpbiBjbGFzc0xpc3QpIHtcbiAgICAgIGNvbnN0IGNsYXNzQXJyID0gY2xhc3NMaXN0W25vZGVOYW1lXTtcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5vZGUsIG5vZGVOYW1lKSkge1xuICAgICAgICBlcnJOb2Rlcy5wdXNoKG5vZGVOYW1lKTtcbiAgICAgIH0gZWxzZSBpZiAoZXJyTm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3NBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAobm9kZU5hbWUgPT09ICd0aHVtYicpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbm9kZVtub2RlTmFtZV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgbm9kZVtub2RlTmFtZV1bal0uY2xhc3NMaXN0LmFkZChjbGFzc0FycltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgVE9ETyArIHRlc3RcbiAgICAgICAgICAgIG5vZGVbbm9kZU5hbWVdLmNsYXNzTGlzdC5hZGQoY2xhc3NBcnJbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChlcnJOb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBtc2cgPVxuICAgICAgICBcIlRoZSBnaXZlbiBvYmplY3QgY29udGFpbnMgaXRlbXMgd2hpY2ggYXJlbid0IG5vZGVzIG9mIHRoaXMgc2xpZGVyOlwiICsgU2xpZGVyODkuYXJyYXlUb0xpc3RTdHJpbmcoZXJyTm9kZXMpICtcbiAgICAgICAgXCJGb2xsb3dpbmcgbm9kZXMgYXJlIHBhcnQgb2YgdGhpcyBzbGlkZXIncyBub2RlIHBvb2w6XCIgKyBTbGlkZXI4OS5hcnJheVRvTGlzdFN0cmluZyhPYmplY3Qua2V5cyhub2RlKSlcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5FcnJvcihtc2csICdjbGFzc0xpc3QnLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLVxuICBjcmVhdGVOZXdUaHVtYigpIHtcbiAgICBjb25zdCBuZXdUaHVtYiA9IHRoaXMudGh1bWJCYXNlLmNsb25lTm9kZSh0cnVlKSBhcyB0eXBlb2YgdGhpcy50aHVtYkJhc2U7XG4gICAgbmV3VGh1bWIuY2xhc3NMaXN0LmFkZCgnc2w4OS10aHVtYicpO1xuICAgIGlmIChuZXdUaHVtYi50YWJJbmRleCA9PSBudWxsKSB7XG4gICAgICBuZXdUaHVtYi50YWJJbmRleCA9IDA7XG4gICAgfVxuICAgIGZvciAoY29uc3QgWyBldmVudE5hbWUsIGNhbGxiYWNrIF0gb2YgT2JqZWN0LmVudHJpZXModGhpcy50aHVtYkV2ZW50cykpIHtcbiAgICAgIG5ld1RodW1iLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywge1xuICAgICAgICBwYXNzaXZlOiAhZXZlbnROYW1lLnN0YXJ0c1dpdGgoJ3RvdWNoJylcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnRodW1iUGFyZW50LmFwcGVuZENoaWxkKG5ld1RodW1iKTtcbiAgICByZXR1cm4gbmV3VGh1bWI7XG4gIH1cblxuICBub2RlSGFzQmFzZUVsZW1lbnRPd25lcihub2RlOiBOb2RlKSB7XG4gICAgZm9yIChjb25zdCBbIGJhc2VOYW1lLCBlbGVtZW50IF0gb2YgT2JqZWN0LmVudHJpZXModGhpcy5iYXNlRWxlbWVudHMpKSB7XG4gICAgICBpZiAoU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIuZ2V0Tm9kZU93bmVyKG5vZGUpID09PSBlbGVtZW50KSByZXR1cm4gYmFzZU5hbWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIC0tLS0gU3RhdGljIHN0eWxlIHNoZWV0IGNyZWF0aW9uIC0tLS1cbiAgLy8gTk9URTogSSB0aGluayB0aGF0IGEgZ2xvYmFsIE9iamVjdCAobGlrZSBTbGlkZXI4OSkgY2Fubm90IGJlIGluIG11bHRpcGxlXG4gIC8vIGRvY3VtZW50cyBhdCBvbmNlLiBUaHVzLCBqdXN0IHNldHRpbmcgYSBnbG9iYWwgZmxhZyB0byB0cnVlIHNob3VsZCBiZVxuICAvLyBzdWZmaWNpZW50IHRvIG1hcmsgdGhlIGN1cnJlbnQgZG9jdW1lbnQgYXMgYWxyZWFkeSBpbmplY3RlZC5cbiAgc3RhdGljIGluamVjdFN0eWxlU2hlZXRJZk5lZWRlZCgpIHtcbiAgICBpZiAoU2xpZGVyODlET01CdWlsZGVyLmhhc0luamVjdGVkU3R5bGVzaGVldCA9PT0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IHN0eWxlU2hlZXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIGNvbnN0IGZpcnN0SGVhZENoaWxkID0gZG9jdW1lbnQuaGVhZC5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgICAgc3R5bGVTaGVldEVsZW1lbnQudGV4dENvbnRlbnQgPSBkZWZhdWx0U3R5bGVzU3RyaW5nO1xuXG4gICAgICAvLyBFbnN1cmUgdGhhdCBpdCBpcyB0aGUgZmlyc3Qgc3R5bGUgc2hlZXQgaW4gdGhlIGRvY3VtZW50XG4gICAgICBpZiAoZmlyc3RIZWFkQ2hpbGQpIHtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVTaGVldEVsZW1lbnQsIGZpcnN0SGVhZENoaWxkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVTaGVldEVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBTbGlkZXI4OURPTUJ1aWxkZXIuaGFzSW5qZWN0ZWRTdHlsZXNoZWV0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgaXRlcmF0ZSB0aHJvdWdoIGEgbm9kZSdzIGNoaWxkcmVuLCBjb2xsZWN0aW5nIHRoZW0gaW4gYW4gYXJyYXkgaW4gb3JkZXIuXG4gICAqIFdoZW4gdXNlZCBvbiBhIHRodW1iIG5vZGUsIHRoZSByZXN1bHQgaXMgYW5hbG9nb3VzIHRvIHtAbGluayB0aHVtYkNoaWxkcmVufS5cbiAgICogQHBhcmFtIG5vZGUgVGhlIGlucHV0IG5vZGUuXG4gICAqIEByZXR1cm4gQWxsIGNoaWxkcmVuIG9mIHRoZSBpbnB1dCBub2RlLlxuICAgKi9cbiAgc3RhdGljIGZpbmROb2RlQ2hpbGRyZW4obm9kZTogRWxlbWVudCwgY29sbGVjdG9yOiAodHlwZW9mIG5vZGUpW10gPSBbXSkge1xuICAgIGlmIChub2RlLmNoaWxkRWxlbWVudENvdW50ID09PSAwKSByZXR1cm4gY29sbGVjdG9yO1xuXG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICBjb2xsZWN0b3IucHVzaChjaGlsZCk7XG4gICAgICBTbGlkZXI4OURPTUJ1aWxkZXIuZmluZE5vZGVDaGlsZHJlbihjaGlsZCwgY29sbGVjdG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3RvcjtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHR5cGUgeyBEZXNjcmlwdG9yIH0gZnJvbSAnLi9MaWJyYXJ5VHlwZUNoZWNrJztcbmltcG9ydCB0eXBlIHsgUHJvcGVydGllcywgUHJvcGVydHlJbmZvIH0gZnJvbSAnLi9TbGlkZXI4OUJhc2UnO1xuaW1wb3J0IExpYnJhcnlUeXBlQ2hlY2sgZnJvbSAnLi9MaWJyYXJ5VHlwZUNoZWNrJztcbmltcG9ydCBTbGlkZXI4OSBmcm9tICcuL1NsaWRlcjg5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyODlFcnJvciB7XG4gIHN0YXRpYyBDT1VOVFMgPSA8Y29uc3Q+IFsnZmlyc3QnLCAnc2Vjb25kJywgJ3RoaXJkJywgJ2ZvdXJ0aCcsICdmaWZ0aCcsICdzaXh0aCcsICdzZXZlbnRoJywgJ2VpZ2h0aCcsICduaW50aCddO1xuXG4gIHN0YXRpYyBFcnJvciA9IGNsYXNzIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1zZzogc3RyaW5nLCB0YXJnZXQ/OiBzdHJpbmcsIGFib3J0ID0gZmFsc2UpIHtcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgbXNnID0gJ0AgJyArIHRhcmdldCArICc6ICcgKyBtc2c7XG4gICAgICB9XG4gICAgICBpZiAobXNnW21zZy5sZW5ndGggLSAxXSAhPT0gJ1xcbicgJiYgbXNnW21zZy5sZW5ndGggLSAxXSAhPT0gJy4nKSB7XG4gICAgICAgIG1zZyArPSAnLic7XG4gICAgICB9XG4gICAgICBpZiAoYWJvcnQpIHtcbiAgICAgICAgbXNnICs9ICdcXG5BYm9ydGluZyB0aGUgc2xpZGVyIGNvbnN0cnVjdGlvbi4nO1xuICAgICAgfVxuXG4gICAgICBzdXBlcihtc2cpO1xuICAgICAgdGhpcy5uYW1lID0gJ1NsaWRlcjg5JyArIHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIENvbnN0cnVjdG9yIGVycm9yIC0tLS1cbiAgc3RhdGljIEluaXRpYWxpemF0aW9uRXJyb3IgPSBjbGFzcyBleHRlbmRzIFNsaWRlcjg5RXJyb3IuRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1zZzogc3RyaW5nKSB7XG4gICAgICBzdXBlcihtc2csICdjb25zdHJ1Y3RvcicsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIC0tLS0gUHJvcGVydHkgZXJyb3JzIC0tLS1cbiAgc3RhdGljIFByb3BlcnR5RXJyb3IgPSBjbGFzcyBleHRlbmRzIFNsaWRlcjg5RXJyb3IuRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHNsaWRlcjogU2xpZGVyODksIHByb3BlcnR5OiBzdHJpbmcsIG1zZzogc3RyaW5nKSB7XG4gICAgICBsZXQgcHJldlZhbCA9IHNsaWRlcltwcm9wZXJ0eV07XG4gICAgICBpZiAocHJldlZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByZXZWYWwpKSB7XG4gICAgICAgICAgcHJldlZhbCA9ICdbJyArIHByZXZWYWwuam9pbignLCAnKSArICddJztcbiAgICAgICAgfVxuICAgICAgICBtc2cgKz0gJy5cXG5Db250aW51aW5nIHdpdGggdGhlIHByZXZpb3VzIHZhbHVlICgnICsgcHJldlZhbCArICcpLic7XG4gICAgICB9XG5cbiAgICAgIHN1cGVyKG1zZywgcHJvcGVydHksIHByZXZWYWwgPT09IHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBQcm9wZXJ0eVR5cGVFcnJvciA9IGNsYXNzIGV4dGVuZHMgU2xpZGVyODlFcnJvci5Qcm9wZXJ0eUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHNsaWRlcjogU2xpZGVyODksXG4gICAgICBwcm9wZXJ0eU5hbWU6IGtleW9mIFByb3BlcnRpZXMuV3JpdGFibGUsXG4gICAgICBwcm9wZXJ0eUluZm86IFByb3BlcnR5SW5mbzx0eXBlb2YgcHJvcGVydHlOYW1lPixcbiAgICAgIHR5cGVNc2c6IHN0cmluZ1xuICAgICkge1xuICAgICAgbGV0IG1zZyA9XG4gICAgICAgICdUeXBlIG1pc21hdGNoLidcbiAgICAgICAgKyBTbGlkZXI4OS5nZXRUeXBlRXJyb3JNZXNzYWdlKHByb3BlcnR5SW5mby5kZXNjcmlwdG9yLCB0eXBlTXNnKTtcblxuICAgICAgc3VwZXIoc2xpZGVyLCBwcm9wZXJ0eU5hbWUsIG1zZyk7XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tLSBNZXRob2QgZXJyb3JzIC0tLS1cbiAgc3RhdGljIE1ldGhvZEFyZ1R5cGVFcnJvciA9IGNsYXNzIGV4dGVuZHMgU2xpZGVyODlFcnJvci5FcnJvciB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kTmFtZTogc3RyaW5nLCBpbmRleDogbnVtYmVyLCB0eXBlTXNnOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGFyZ0luZm8gPSBTbGlkZXI4OS5nZXRNZXRob2RBcmdJbmZvKG1ldGhvZE5hbWUsIGluZGV4KTtcbiAgICAgIGNvbnN0IG1zZyA9XG4gICAgICAgICdUeXBlIG1pc21hdGNoIG9uIHRoZSAnICsgU2xpZGVyODlFcnJvci5nZXRNZXRob2RBcmdNZXNzYWdlKGFyZ0luZm8sIGluZGV4KSArICcuJ1xuICAgICAgICArIFNsaWRlcjg5LmdldFR5cGVFcnJvck1lc3NhZ2UoYXJnSW5mby5kZXNjcmlwdG9yLCB0eXBlTXNnKTtcblxuICAgICAgc3VwZXIobXNnLCBtZXRob2ROYW1lKTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIE1ldGhvZEFyZ09taXRFcnJvciA9IGNsYXNzIGV4dGVuZHMgU2xpZGVyODlFcnJvci5FcnJvciB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kTmFtZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICBjb25zdCBhcmdJbmZvID0gU2xpZGVyODkuZ2V0TWV0aG9kQXJnSW5mbyhtZXRob2ROYW1lLCBpbmRleCk7XG4gICAgICBjb25zdCBtc2cgPVxuICAgICAgICAnVGhlICcgKyBTbGlkZXI4OUVycm9yLmdldE1ldGhvZEFyZ01lc3NhZ2UoYXJnSW5mbywgaW5kZXgpXG4gICAgICAgICsgJyBoYXMgYmVlbiBvbWl0dGVkIGJ1dCBpdCBpcyByZXF1aXJlZCdcbiAgICAgICAgKyAnIChJdCBtdXN0IGJlIG9mIHR5cGUgJyArIExpYnJhcnlUeXBlQ2hlY2suYnVpbGREZXNjcmlwdG9yVHlwZU1lc3NhZ2UoYXJnSW5mby5kZXNjcmlwdG9yKSArICcpLic7XG5cbiAgICAgIHN1cGVyKG1zZywgbWV0aG9kTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tLSBTdHJ1Y3R1cmUgZXJyb3JzIC0tLS1cbiAgc3RhdGljIFN0cnVjdHVyZUVycm9yID0gY2xhc3MgZXh0ZW5kcyBTbGlkZXI4OUVycm9yLkVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihtc2c6IHN0cmluZykge1xuICAgICAgc3VwZXIobXNnLCAnc3RydWN0dXJlJywgdHJ1ZSk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBTdHJ1Y3R1cmVQYXJzZUVycm9yID0gY2xhc3MgZXh0ZW5kcyBTbGlkZXI4OUVycm9yLlN0cnVjdHVyZUVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihiZWZvcmVGYWlsdXJlOiBzdHJpbmcsIHBvaW50T2ZGYWlsdXJlOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IG1zZyA9XG4gICAgICAgIFwiU29tZXRoaW5nIGhhcyBiZWVuIGRlY2xhcmVkIHdyb25nbHkgYW5kIGNvdWxkbid0IGJlIHBhcnNlZC4gUG9pbnQgb2YgZmFpbHVyZSBcIlxuICAgICAgICArIFwiKGJlZm9yZSBcIiArIGJlZm9yZUZhaWx1cmUgKyBcIik6XFxuXFxuXCJcbiAgICAgICAgKyBwb2ludE9mRmFpbHVyZSArICdcXG4nO1xuICAgICAgc3VwZXIobXNnKTtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLVxuICBzdGF0aWMgZ2V0VHlwZUVycm9yTWVzc2FnZShkZXNjcmlwdG9yOiBEZXNjcmlwdG9yLnNlbGYsIHR5cGVNc2c6IHN0cmluZykge1xuICAgIHJldHVybiAnIEV4cGVjdGVkICcgKyBMaWJyYXJ5VHlwZUNoZWNrLmJ1aWxkRGVzY3JpcHRvclR5cGVNZXNzYWdlKGRlc2NyaXB0b3IpICsgJywnXG4gICAgICAgICArICcgZ290ICcgKyB0eXBlTXNnO1xuICB9XG5cbiAgc3RhdGljIGdldE1ldGhvZEFyZ01lc3NhZ2UoYXJnSW5mbywgaW5kZXg6IG51bWJlcikge1xuICAgIGxldCBtc2cgPSAnJztcbiAgICBpZiAoYXJnSW5mby5vcHRpb25hbCkge1xuICAgICAgbXNnICs9ICdvcHRpb25hbCAnO1xuICAgIH1cbiAgICBtc2cgKz0gU2xpZGVyODkuQ09VTlRTW2luZGV4XSArICcgYXJndW1lbnQgKCcgKyBhcmdJbmZvLm5hbWUgKyAnKSc7XG4gICAgcmV0dXJuIG1zZztcbiAgfVxuXG4gIHN0YXRpYyBnZXRNZXRob2RBcmdJbmZvKG1ldGhvZE5hbWU6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgIHJldHVybiBTbGlkZXI4OS5tZXRob2REYXRhW21ldGhvZE5hbWVdLmFyZ3NbaW5kZXhdO1xuICB9XG5cbiAgc3RhdGljIGFycmF5VG9MaXN0U3RyaW5nKGFycjogQXJyYXk8YW55Pikge1xuICAgIHJldHVybiAnXFxuIC0gXCInICsgYXJyLmpvaW4oJ1wiXFxuIC0gXCInKSArICdcIlxcbic7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCB0eXBlIHsgUHJvcGVydGllcyB9IGZyb20gJy4vU2xpZGVyODlCYXNlJztcbmltcG9ydCBTbGlkZXI4OSBmcm9tICcuL1NsaWRlcjg5JztcbmltcG9ydCBTbGlkZXI4OUJhc2UgZnJvbSAnLi9TbGlkZXI4OUJhc2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEV2ZW50VHlwZSB7XG4gIHR5cGUgTmFtZXNCYXNpYyA9IHR5cGVvZiBTbGlkZXI4OUV2ZW50cy5ldmVudFR5cGVzW251bWJlcl07XG4gIHR5cGUgTmFtZXNTcGVjaWFsID0ga2V5b2YgdHlwZW9mIFNsaWRlcjg5RXZlbnRzLmV2ZW50VHlwZXNTcGVjaWFsO1xuXG4gIGV4cG9ydCB0eXBlIEh1bWFuTGlzdCA9IEFycmF5PE5hbWVzQmFzaWMgfCBOYW1lc1NwZWNpYWw+O1xuICBleHBvcnQgaW50ZXJmYWNlIFNwZWNpYWwge1xuICAgIFsgS2V5OiBzdHJpbmcgXToge1xuICAgICAgcHJlZml4OiBzdHJpbmcsXG4gICAgICBmbjogKHNsaWRlcjogU2xpZGVyODksIHN1ZmZpeDogc3RyaW5nLCBldmVudFR5cGU6IHN0cmluZykgPT4gdm9pZDtcbiAgICB9XG4gIH1cblxuICAvLyAtLS0tIFR5cGVzIHRvIGtlZXAgdHJhY2sgb2YgLS0tLVxuICBleHBvcnQgdHlwZSBCYXNlID0gTmFtZXNCYXNpYyB8IGBjaGFuZ2U6JHtrZXlvZiBQcm9wZXJ0aWVzLldpdGhDdXN0b219YDtcbn1cblxuXG5leHBvcnQgbmFtZXNwYWNlIEV2ZW50RGF0YSB7XG4gIGV4cG9ydCB0eXBlIEZuID0gKHRoaXM6IFNsaWRlcjg5LCAuLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuICBleHBvcnQgdHlwZSBMaXN0ID0gUmVjb3JkPEV2ZW50TGlzdGVuZXJJZGVudGlmaWVyLCBCYXNlW10gfCBCYXNlPjtcblxuICBleHBvcnQgaW50ZXJmYWNlIEJhc2Uge1xuICAgIHR5cGU6IEV2ZW50VHlwZS5CYXNlLFxuICAgIGZuOiBGblxuICB9XG59XG5cbnR5cGUgRXZlbnRMaXN0ZW5lcklkZW50aWZpZXIgPSBudW1iZXIgfCBzdHJpbmc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyODlFdmVudHMgZXh0ZW5kcyBTbGlkZXI4OUJhc2Uge1xuICAvLyAtLS0tIENvbnN0YW50IHN0YXRpY3MgLS0tLVxuICBzdGF0aWMgZXZlbnRUeXBlcyA9IFtcbiAgICAnc3RhcnQnLFxuICAgICdtb3ZlJyxcbiAgICAnZW5kJyxcbiAgXSBhcyBjb25zdDtcblxuICBzdGF0aWMgZXZlbnRUeXBlc1NwZWNpYWwgPSAoe1xuICAgICdjaGFuZ2U6JHByb3BlcnR5Jzoge1xuICAgICAgcHJlZml4OiAnY2hhbmdlOicsXG4gICAgICBmbjogKHNsaWRlciwgY3VzdG9tUHJvcCwgZXZlbnRUeXBlKSA9PiB7XG4gICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNsaWRlci52YWxzLCBjdXN0b21Qcm9wKSkge1xuICAgICAgICAgIGNvbnN0IG1zZyA9XG4gICAgICAgICAgICBcIuKAmFwiICsgZXZlbnRUeXBlICsgXCLigJkgcmVmZXJzIHRvIOKAmFwiICsgY3VzdG9tUHJvcCArIFwi4oCZLCB3aGljaCBpc24ndCBhIHJlY29nbml6ZWQgcHJvcGVydHkuIFwiXG4gICAgICAgICAgICArIFwiQ2hlY2sgaXRzIHNwZWxsaW5nIGFuZCBiZSBhd2FyZSB0aGF0IGN1c3RvbSBwcm9wZXJ0aWVzIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWRcIjtcbiAgICAgICAgICB0aHJvdyBuZXcgU2xpZGVyODkuRXJyb3IobXNnLCAnYWRkRXZlbnQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSkgYXMgY29uc3Qgc2F0aXNmaWVzIEV2ZW50VHlwZS5TcGVjaWFsO1xuXG4gIC8vIFN0YXRpY2FsbHkgZ2V0dGluZyB0aGUgbmFtZSBvZiBhbGwgZXZlbnQgdHlwZXMuIFRoaXMgaXMganVzdCBmb3IgaHVtYW5zLlxuICBzdGF0aWMgYXZhaWxhYmxlRXZlbnRUeXBlcyA9ICgoKSA9PiB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHJldHVybiB0aGlzLmV2ZW50VHlwZXMuY29uY2F0KE9iamVjdC5rZXlzKHRoaXMuZXZlbnRUeXBlc1NwZWNpYWwpKSBhcyBFdmVudFR5cGUuSHVtYW5MaXN0O1xuICB9KSgpO1xuXG5cbiAgLy8gLS0tLSBQcm9wZXJ0aWVzIC0tLS1cbiAgLy8gU3RvcmluZyBldmVudCBkYXRhIGZvciByZW1vdmFiaWxpdHlcbiAgZXZlbnRMaXN0OiBFdmVudERhdGEuTGlzdCA9IHt9O1xuICBldmVudElEID0gMDtcblxuXG4gIC8vIC0tLS0gTWV0aG9kcyAtLS0tXG4gIGFkZEV2ZW50KHR5cGU6IEV2ZW50VHlwZS5CYXNlLCBmbjogRXZlbnREYXRhLkZuLCBjdXN0b21JRD86IHN0cmluZyk6IEV2ZW50TGlzdGVuZXJJZGVudGlmaWVyIHtcbiAgICBpZiAoIXRoaXMuY2hlY2tFdmVudFR5cGUodHlwZSkpIHtcbiAgICAgIGNvbnN0IG1zZyA9XG4gICAgICAgICdUaGUgc3BlY2lmaWVkIGV2ZW50IHR5cGUg4oCYJyArIHR5cGUgKyAn4oCZIGlzIG5vdCB2YWxpZC4gQXZhaWxhYmxlIHR5cGVzIGFyZTonXG4gICAgICAgICsgU2xpZGVyODkuYXJyYXlUb0xpc3RTdHJpbmcoU2xpZGVyODlFdmVudHMuYXZhaWxhYmxlRXZlbnRUeXBlcyk7XG4gICAgICB0aHJvdyBuZXcgU2xpZGVyODkuRXJyb3IobXNnLCAnYWRkRXZlbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy52YWxzLmV2ZW50c1t0eXBlXSkpIHtcbiAgICAgIHRoaXMudmFscy5ldmVudHNbdHlwZV0gPSBbXTtcbiAgICB9XG4gICAgdGhpcy52YWxzLmV2ZW50c1t0eXBlXS5wdXNoKGZuKTtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gY3VzdG9tSUQgfHwgdGhpcy5ldmVudElEO1xuICAgIGNvbnN0IGV2ZW50RGF0YSA9IHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBmbjogZm5cbiAgICB9O1xuXG4gICAgaWYgKGN1c3RvbUlEKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5ldmVudExpc3RbaWRlbnRpZmllcl0pKSB7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0W2lkZW50aWZpZXJdID0gW107XG4gICAgICB9XG4gICAgICAodGhpcy5ldmVudExpc3RbaWRlbnRpZmllcl0gYXMgRXZlbnREYXRhLkJhc2VbXSkucHVzaChldmVudERhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmV2ZW50TGlzdFtpZGVudGlmaWVyXSA9IGV2ZW50RGF0YTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VzdG9tSUQgfHwgdGhpcy5ldmVudElEKys7XG4gIH1cbiAgcmVtb3ZlRXZlbnQoa2V5OiBFdmVudExpc3RlbmVySWRlbnRpZmllcik6IGZhbHNlIHwgRXZlbnREYXRhLkZuW10ge1xuICAgIGlmICghKGtleSBpbiB0aGlzLmV2ZW50TGlzdCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZXZlbnREYXRhID0gdGhpcy5ldmVudExpc3Rba2V5XTtcbiAgICBkZWxldGUgdGhpcy5ldmVudExpc3Rba2V5XTtcblxuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGV2ZW50RGF0YSlcbiAgICAgID8gZXZlbnREYXRhLnJlZHVjZSh0aGlzLmhhbmRsZVJlbW92ZUV2ZW50LmJpbmQodGhpcyksIFtdKVxuICAgICAgOiB0aGlzLmhhbmRsZVJlbW92ZUV2ZW50KFtdLCBldmVudERhdGEpO1xuICB9XG5cblxuICAvLyAtLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLVxuICBoYW5kbGVSZW1vdmVFdmVudChkZWxldGVDb2xsZWN0aW9uOiBFdmVudERhdGEuRm5bXSwgZXZlbnRJbmZvOiBFdmVudERhdGEuQmFzZSkge1xuICAgIGNvbnN0IHR5cGUgPSBldmVudEluZm8udHlwZTtcbiAgICBjb25zdCBldmVudEZucyA9IHRoaXMudmFscy5ldmVudHNbdHlwZV07XG4gICAgY29uc3QgZGVsZXRlZEZuID0gZXZlbnRGbnMuc3BsaWNlKGV2ZW50Rm5zLmluZGV4T2YoZXZlbnRJbmZvLmZuKSwgMSlbMF07XG5cbiAgICBpZiAoZXZlbnRGbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICBkZWxldGUgdGhpcy52YWxzLmV2ZW50c1t0eXBlXTtcbiAgICB9XG4gICAgZGVsZXRlQ29sbGVjdGlvbi5wdXNoKGRlbGV0ZWRGbik7XG5cbiAgICByZXR1cm4gZGVsZXRlQ29sbGVjdGlvbjtcbiAgfVxuXG4gIGludm9rZUV2ZW50KHR5cGVzOiBFdmVudFR5cGUuQmFzZVtdLCAuLi5hcmdzOiBhbnlbXSkge1xuICAgIGFyZ3NbMF0gPSB0aGlzO1xuICAgIGZvciAoY29uc3QgdHlwZSBvZiB0eXBlcykge1xuICAgICAgaWYgKHRoaXMudmFscy5ldmVudHMgIT09IGZhbHNlKSB7XG4gICAgICAgIGlmICh0eXBlIGluIHRoaXMudmFscy5ldmVudHMpIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGV2ZW50RnVuYyBvZiB0aGlzLnZhbHMuZXZlbnRzW3R5cGVdKSB7XG4gICAgICAgICAgICBldmVudEZ1bmMuYXBwbHkodGhpcyBhcyB1bmtub3duIGFzIFNsaWRlcjg5LCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjaGVja0V2ZW50VHlwZSh0eXBlOiBFdmVudFR5cGUuQmFzZSkge1xuICAgIGZvciAoY29uc3QgZXZlbnRUeXBlRGF0YSBvZiBPYmplY3QudmFsdWVzKFNsaWRlcjg5RXZlbnRzLmV2ZW50VHlwZXNTcGVjaWFsKSkge1xuICAgICAgaWYgKHR5cGUuc3RhcnRzV2l0aChldmVudFR5cGVEYXRhLnByZWZpeCkpIHtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gdHlwZS5zbGljZShldmVudFR5cGVEYXRhLnByZWZpeC5sZW5ndGgpO1xuICAgICAgICBldmVudFR5cGVEYXRhLmZuKHRoaXMgYXMgdW5rbm93biBhcyBTbGlkZXI4OSwgc3VmZml4LCB0eXBlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gU2xpZGVyODlFdmVudHMuZXZlbnRUeXBlcy5pbmNsdWRlcyh0eXBlKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHR5cGUgeyBQcm9wZXJ0aWVzIH0gZnJvbSAnLi9TbGlkZXI4OUJhc2UnO1xuaW1wb3J0IHR5cGUgeyBFdmVudFR5cGUgfSBmcm9tICcuL1NsaWRlcjg5RXZlbnRzJztcbmltcG9ydCB0eXBlIHsgVmFyaWFibGVOYW1lIH0gZnJvbSAnLi9TbGlkZXI4OVN0cnVjdHVyZVBhcnNlcic7XG5pbXBvcnQgU2xpZGVyODkgZnJvbSAnLi9TbGlkZXI4OSc7XG5pbXBvcnQgU2xpZGVyODlFdmVudHMgZnJvbSAnLi9TbGlkZXI4OUV2ZW50cyc7XG5pbXBvcnQgU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIgZnJvbSAnLi9TbGlkZXI4OVN0cnVjdHVyZVBhcnNlcic7XG5cblxubmFtZXNwYWNlIERlZXBLZXkge1xuICBleHBvcnQgdHlwZSBUeXBlPFByb3AgZXh0ZW5kcyBrZXlvZiBQcm9wZXJ0aWVzLkRlZXA+ID0gUHJvcGVydGllcy5EZWVwW1Byb3BdW251bWJlcl07XG5cbiAgZXhwb3J0IHR5cGUgU2V0dGVyPFByb3AgZXh0ZW5kcyBrZXlvZiBQcm9wZXJ0aWVzLkRlZXA+ID1cbiAgICAodmFsOiBUeXBlPFByb3A+LCBpbmRleDogbnVtYmVyKSA9PiB2b2lkIHwgYm9vbGVhbjtcblxuICBleHBvcnQgdHlwZSBHZXR0ZXI8UHJvcCBleHRlbmRzIGtleW9mIFByb3BlcnRpZXMuRGVlcD4gPVxuICAgICh2YWw6IFR5cGU8UHJvcD4sIGluZGV4OiBudW1iZXIpID0+IHR5cGVvZiB2YWw7XG59XG5cblxudHlwZSBWYXJpYWJsZU5vZGVJdGVyYXRvclJlc3VsdCA9IFsgRWxlbWVudCwgTm9kZSwgc3RyaW5nIF07XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyODlQcm9wZXJ0aWVzIGV4dGVuZHMgU2xpZGVyODlFdmVudHMge1xuICAvLyAtLS0tLS0gT2JqZWN0IGRlZmluaXRpb24gLS0tLS0tXG4gIGRlZmluZURlZXBQcm9wZXJ0eShcbiAgICB0YXJnZXQ6IE9iamVjdCxcbiAgICBpdGVtOiBrZXlvZiBQcm9wZXJ0aWVzLldpdGhDdXN0b20sXG4gICAgZW5kcG9pbnQ6IFByb3BlcnRpZXMuVmFsc1trZXlvZiBQcm9wZXJ0aWVzLlZhbHNdLFxuICAgIHBvc3RTZXR0ZXI/OiAodmFsOiBQcm9wZXJ0aWVzLldpdGhDdXN0b21bdHlwZW9mIGl0ZW1dLCBwcmV2VmFsOiB0eXBlb2YgdmFsKSA9PiB2b2lkIHwgYm9vbGVhbixcbiAgICBpc0RlZXBEZWZpbmVkQXJyYXk/OiBib29sZWFuXG4gICkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGl0ZW0sIHtcbiAgICAgIHNldDogKHZhbCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgIHZhciBwcmV2VmFsID0gKGlzRGVlcERlZmluZWRBcnJheSA/IEFycmF5LmZyb20odGhpc1tpdGVtXSkgOiB0aGlzW2l0ZW1dKTtcbiAgICAgICAgfVxuICAgICAgICBlbmRwb2ludFtpdGVtXSA9IHZhbDtcbiAgICAgICAgaWYgKGlzRGVlcERlZmluZWRBcnJheSkge1xuICAgICAgICAgIGNvbnN0IG91dGxpbmUgPSB0aGlzLnByb3BlcnRpZXNbaXRlbV07XG4gICAgICAgICAgLy8gVGhlIGVuZHBvaW50cyAoc2VlIGRvYyBjb21tZW50IGF0IHRoZSBzdGFydCBvZiBmaWxlKSBhcmUgZGVmaW5lZCBmcm9tIGJvdHRvbSB0byB0b3BcbiAgICAgICAgICAvLyBUaGlzIGVuc3VyZXMgY29tcGF0aWJpbGl0eSB3aXRoIGdldHRlcnMvc2V0dGVyc1xuICAgICAgICAgIHRoaXMuZGVmaW5lRGVlcEFycmF5SW50ZXJtZWRpYXRlVmFscyhpdGVtIGFzIGtleW9mIFByb3BlcnRpZXMuRGVlcCwgdmFsKTtcbiAgICAgICAgICB0aGlzLmRlZmluZURlZXBBcnJheUludGVybWVkaWF0ZVRoaXMoaXRlbSBhcyBrZXlvZiBQcm9wZXJ0aWVzLkRlZXAsIHZhbCwgb3V0bGluZS5rZXlTZXR0ZXIsIG91dGxpbmUua2V5R2V0dGVyKTtcbiAgICAgICAgICB0aGlzLmhhbmRsZUludGVybmFsRGVlcEFycmF5Q2hhbmdlKGl0ZW0sIHByZXZWYWwsIHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVJbnRlcm5hbFByb3BlcnR5Q2hhbmdlKGl0ZW0sIHByZXZWYWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3N0U2V0dGVyKSB7XG4gICAgICAgICAgcG9zdFNldHRlcih2YWwsIHByZXZWYWwpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiAoaXNEZWVwRGVmaW5lZEFycmF5ID8gdGhpcy52YWxzLiRpbnRlcm1lZGlhdGVWYWxzIDogZW5kcG9pbnQpW2l0ZW1dO1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuXG4gIC8vIC0tLS0tLSBPYmplY3QgZGVmaW5pdGlvbnMgZm9yIHRoZSBrZXlzL2luZGV4ZXMgb2YgZGVlcGx5IGRlZmluZWQgYXJyYXlzIC0tLS0tLVxuICBkZWZpbmVEZWVwQXJyYXlJbnRlcm1lZGlhdGVUaGlzKFxuICAgIHBhcmVudEl0ZW06IGtleW9mIFByb3BlcnRpZXMuRGVlcCxcbiAgICBwYXJlbnRWYWx1ZTogUHJvcGVydGllcy5EZWVwW3R5cGVvZiBwYXJlbnRJdGVtXSxcbiAgICBrZXlTZXR0ZXI/OiBEZWVwS2V5LlNldHRlcjx0eXBlb2YgcGFyZW50SXRlbT4sXG4gICAga2V5R2V0dGVyPzogRGVlcEtleS5HZXR0ZXI8dHlwZW9mIHBhcmVudEl0ZW0+XG4gICkge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gdGhpcy52YWxzO1xuXG4gICAgLy8gQHRzLWlnbm9yZSAoT25seSBzZXR1cClcbiAgICB0aGlzLnZhbHMuJGludGVybWVkaWF0ZVRoaXNbcGFyZW50SXRlbV0gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudFZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcmVudFZhbHVlW2ldO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy52YWxzLiRpbnRlcm1lZGlhdGVUaGlzW3BhcmVudEl0ZW1dLCBpLCB7XG4gICAgICAgIHNldDogKHZhbDogRGVlcEtleS5UeXBlPHR5cGVvZiBwYXJlbnRJdGVtPikgPT4ge1xuICAgICAgICAgIGlmICgha2V5U2V0dGVyIHx8ICFrZXlTZXR0ZXIodmFsLCBpKSkge1xuICAgICAgICAgICAgZW5kcG9pbnRbcGFyZW50SXRlbV1baV0gPSB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gKGtleUdldHRlciA/IGtleUdldHRlcihlbmRwb2ludFtwYXJlbnRJdGVtXVtpXSwgaSkgOiBlbmRwb2ludFtwYXJlbnRJdGVtXVtpXSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgLy8gVGhpcyBhc3NpZ25tZW50IGlzIG5lY2Vzc2FyeSB0byBpbnZva2UgYSBwb3RlbnRpYWwga2V5U2V0dGVyIChlLmcuIGZyb20gYHZhbHVlc2ApXG4gICAgICB0aGlzLnZhbHMuJGludGVybWVkaWF0ZVRoaXNbcGFyZW50SXRlbV1baV0gPSBwYXJlbnRWYWx1ZVtpXTtcbiAgICB9XG4gIH1cbiAgZGVmaW5lRGVlcEFycmF5SW50ZXJtZWRpYXRlVmFscyhcbiAgICBwYXJlbnRJdGVtOiBrZXlvZiBQcm9wZXJ0aWVzLkRlZXAsXG4gICAgcGFyZW50VmFsdWU6IFByb3BlcnRpZXMuRGVlcFt0eXBlb2YgcGFyZW50SXRlbV1cbiAgKSB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLnZhbHMuJDtcblxuICAgIC8vIEB0cy1pZ25vcmUgKE9ubHkgU2V0dXApXG4gICAgdGhpcy52YWxzLiRpbnRlcm1lZGlhdGVWYWxzW3BhcmVudEl0ZW1dID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnRWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdmFsdWUgPSBwYXJlbnRWYWx1ZVtpXTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMudmFscy4kaW50ZXJtZWRpYXRlVmFsc1twYXJlbnRJdGVtXSwgaSwge1xuICAgICAgICBzZXQ6ICh2YWw6IERlZXBLZXkuVHlwZTx0eXBlb2YgcGFyZW50SXRlbT4pID0+IHtcbiAgICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgICAgICAgdmFyIHByZXZWYWwgPSBBcnJheS5mcm9tKHRoaXNbcGFyZW50SXRlbV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbmRwb2ludFtwYXJlbnRJdGVtXVtpXSA9IHZhbDtcbiAgICAgICAgICB0aGlzLmhhbmRsZUludGVybmFsRGVlcEFycmF5Q2hhbmdlKHBhcmVudEl0ZW0sIHByZXZWYWwsIG51bGwsIGkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gZW5kcG9pbnRbcGFyZW50SXRlbV1baV07XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gLS0tLS0tIFByb3BlcnR5IGNoYW5nZSB0cmFja2luZyAtLS0tLS1cbiAgLy8gYHRoYXRgIGl0ZW1zIGFyZSBjb21wYXJlZCB0byBhY2NvbW9kYXRlIGZvciBnZXR0ZXJzIChlLmcuIGB2YWx1ZWAgKHByZWNpc2lvbikpXG4gIGhhbmRsZUludGVybmFsUHJvcGVydHlDaGFuZ2UoXG4gICAgaXRlbToga2V5b2YgUHJvcGVydGllcy5XaXRoQ3VzdG9tLFxuICAgIHByZXZWYWw/OiBQcm9wZXJ0aWVzLldpdGhDdXN0b21bdHlwZW9mIGl0ZW1dXG4gICkge1xuICAgIC8vIE9iamVjdCB0eXBlcyAoYXJyYXlzIGluY2x1ZGVkKSBhbHdheXMgaW52b2tlIGEgdmFyaWFibGUgdXBkYXRlXG4gICAgLy8gZHVlIHRvIGluYWJpbGl0eSB0byBkZWVwbHkgY29tcGFyZSB0aGVtIChlZmZpY2llbnRseSlcbiAgICBpZiAoIXRoaXMuaW5pdGlhbCAmJiAodHlwZW9mIHRoaXNbaXRlbV0gPT09ICdvYmplY3QnIHx8IHByZXZWYWwgIT09IHRoaXNbaXRlbV0pKSB7XG4gICAgICB0aGlzLnVwZGF0ZVBvdGVudGlhbFN0cnVjdHVyZVZhcihpdGVtKTtcbiAgICAgIHRoaXMuaW52b2tlRXZlbnQoWydjaGFuZ2U6JyArIGl0ZW1dIGFzIEV2ZW50VHlwZS5CYXNlW10sIHByZXZWYWwpO1xuICAgIH1cbiAgfVxuICBoYW5kbGVJbnRlcm5hbERlZXBBcnJheUNoYW5nZShcbiAgICBpdGVtOiBrZXlvZiBQcm9wZXJ0aWVzLldpdGhDdXN0b20sXG4gICAgcHJldlZhbDogUHJvcGVydGllcy5XaXRoQ3VzdG9tW3R5cGVvZiBpdGVtXSxcbiAgICB2YWw6IFByb3BlcnRpZXMuV2l0aEN1c3RvbVt0eXBlb2YgaXRlbV0sXG4gICAgZGVlcERlZmluZWRJbmRleD86IG51bWJlclxuICApIHtcbiAgICBpZiAoIXRoaXMuaW5pdGlhbCkge1xuICAgICAgdGhpcy51cGRhdGVQb3RlbnRpYWxTdHJ1Y3R1cmVWYXIoaXRlbSk7XG4gICAgICBpZiAoZGVlcERlZmluZWRJbmRleCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuaW52b2tlRGVlcEFycmF5Q2hhbmdlRXZlbnQoaXRlbSwgcHJldlZhbCwgZGVlcERlZmluZWRJbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuaW52b2tlRGVlcEFycmF5Q2hhbmdlRXZlbnQoaXRlbSwgcHJldlZhbCwgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbnZva2VEZWVwQXJyYXlDaGFuZ2VFdmVudChcbiAgICBpdGVtOiBrZXlvZiBQcm9wZXJ0aWVzLldpdGhDdXN0b20sXG4gICAgcHJldlZhbDogUHJvcGVydGllcy5XaXRoQ3VzdG9tW3R5cGVvZiBpdGVtXSxcbiAgICBkZWVwRGVmaW5lZEluZGV4OiBudW1iZXJcbiAgKSB7XG4gICAgaWYgKHByZXZWYWxbZGVlcERlZmluZWRJbmRleF0gIT09IHRoaXNbaXRlbV1bZGVlcERlZmluZWRJbmRleF0pIHtcbiAgICAgIHRoaXMuaW52b2tlRXZlbnQoWydjaGFuZ2U6JyArIGl0ZW1dIGFzIEV2ZW50VHlwZS5CYXNlW10sIHByZXZWYWwsIGRlZXBEZWZpbmVkSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIC0tLS0gU3RydWN0dXJlIHZhcmlhYmxlcyAtLS0tXG4gIHVwZGF0ZVBvdGVudGlhbFN0cnVjdHVyZVZhcihwcm9wTmFtZTogVmFyaWFibGVOYW1lKSB7XG4gICAgLy8gQHRzLWlnbm9yZSBUT0RPXG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5kb21CdWlsZGVyLnN0cnVjdHVyZVZhcnMsIHByb3BOYW1lKSkgcmV0dXJuO1xuXG4gICAgLy8gQHRzLWlnbm9yZSBUT0RPXG4gICAgZm9yIChjb25zdCBbIHN0ciwgbm9kZUxpc3QgXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmRvbUJ1aWxkZXIuc3RydWN0dXJlVmFyc1twcm9wTmFtZV0pKSB7XG4gICAgICAvLyBAdHMtaWdub3JlIFRPRE9cbiAgICAgIHRoaXMucmVwbGFjZVN0cnVjdHVyZVZhclN0cmluZ0luTm9kZXMoc3RyLCBub2RlTGlzdCk7XG4gICAgfVxuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5zcGVjaWFsVmFyaWFibGVQcm94eSwgcHJvcE5hbWUpKSB7XG4gICAgICBmb3IgKGNvbnN0IHZhck5hbWUgb2YgU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIuc3BlY2lhbFZhcmlhYmxlUHJveHlbcHJvcE5hbWVdKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUG90ZW50aWFsU3RydWN0dXJlVmFyKHZhck5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlcGxhY2VTdHJ1Y3R1cmVWYXJTdHJpbmdJbk5vZGVzKHN0cjogc3RyaW5nLCBub2RlTGlzdDogTm9kZVtdKSB7XG4gICAgZm9yIChjb25zdCBbIGVsZW1lbnQsIG5vZGUsIGJhc2VOYW1lIF0gb2YgdGhpcy5pdGVyYXRlU3RydWN0dXJlVmFyTm9kZUxpc3Qobm9kZUxpc3QpKSB7XG4gICAgICBub2RlLnRleHRDb250ZW50ID1cbiAgICAgICAgc3RyLnJlcGxhY2UoU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIucmVnZXgudmFyaWFibGUsIChtYXRjaCwgdmFyaWFibGVEZWxpbWl0LCB2YXJpYWJsZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhbHVlRnJvbVN0cnVjdHVyZVZhcih2YXJpYWJsZURlbGltaXQgfHwgdmFyaWFibGUsIGVsZW1lbnQsIGJhc2VOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBDaGVjayB3aGV0aGVyIHRoaXMgc2lnbmF0dXJlIGlzIGNvcnJlY3QgKG5vIGludGVybmV0IHJuIGxvbClcbiAgKml0ZXJhdGVTdHJ1Y3R1cmVWYXJOb2RlTGlzdChub2RlTGlzdDogTm9kZVtdKTogR2VuZXJhdG9yPFZhcmlhYmxlTm9kZUl0ZXJhdG9yUmVzdWx0LCB2b2lkLCBOb2RlPiB7XG4gICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVMaXN0KSB7XG4gICAgICAvLyBTcGVjaWFsIGNhc2U6IEl0ZXJhdGUgb3ZlciBldmVyeSB0aHVtYlxuICAgICAgLy8gQHRzLWlnbm9yZSBUT0RPXG4gICAgICBjb25zdCBiYXNlTmFtZTogc3RyaW5nID0gdGhpcy5kb21CdWlsZGVyLm5vZGVIYXNCYXNlRWxlbWVudE93bmVyKG5vZGUpO1xuICAgICAgaWYgKGJhc2VOYW1lKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gdGhpcy52YWxzLm5vZGVbYmFzZU5hbWVdO1xuXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkFUVFJJQlVURV9OT0RFKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBlbGVtZW50IG9mIGVsZW1lbnRzIGFzIEVsZW1lbnRbXSkge1xuICAgICAgICAgICAgeWllbGQgWyBlbGVtZW50LCBlbGVtZW50LmdldEF0dHJpYnV0ZU5vZGUoKG5vZGUgYXMgQXR0cikubmFtZSksIGJhc2VOYW1lIF07XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgZWxlbWVudHMgYXMgRWxlbWVudFtdKSB7XG4gICAgICAgICAgICAvLyBUaGUgdGV4dCBub2RlIGlzIGFsd2F5cyB0aGUgZmlyc3QgY2hpbGRcbiAgICAgICAgICAgIHlpZWxkIFsgZWxlbWVudCwgZWxlbWVudC5jaGlsZE5vZGVzWzBdLCBiYXNlTmFtZSBdO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5nZXROb2RlT3duZXIobm9kZSk7XG4gICAgICAgIHlpZWxkIFsgZWxlbWVudCwgbm9kZSwgYmFzZU5hbWUgXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZUZyb21TdHJ1Y3R1cmVWYXIoXG4gICAgdmFyTmFtZTogVmFyaWFibGVOYW1lLFxuICAgIGVsZW1lbnQ6IEVsZW1lbnQsXG4gICAgYmFzZU5hbWU6IHN0cmluZ1xuICApOiBQcm9wZXJ0aWVzLldpdGhDdXN0b21ba2V5b2YgUHJvcGVydGllcy5XaXRoQ3VzdG9tXSB7XG4gICAgY29uc3QgcmVjdXJzaXZlVmFyID0gdmFyTmFtZS5zcGxpdCgnLicpO1xuICAgIGxldCB2YWx1ZTogUHJvcGVydGllcy5XaXRoQ3VzdG9tW2tleW9mIFByb3BlcnRpZXMuV2l0aEN1c3RvbV07XG4gICAgaWYgKHJlY3Vyc2l2ZVZhclswXSBpbiBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5zcGVjaWFsVmFyaWFibGVzKSB7XG4gICAgICB2YWx1ZSA9IFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnNwZWNpYWxWYXJpYWJsZXNbcmVjdXJzaXZlVmFyWzBdXS5nZXR0ZXIoZWxlbWVudCwgdGhpcywgYmFzZU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXNbcmVjdXJzaXZlVmFyWzBdXTtcbiAgICB9XG4gICAgaWYgKHJlY3Vyc2l2ZVZhci5sZW5ndGggPiAxKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHJlY3Vyc2l2ZVZhci5sZW5ndGg7IGkrKykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWVbcmVjdXJzaXZlVmFyW2ldXTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVFcnJvcihcIlZhcmlhYmxlIOKAmFwiICsgdmFyTmFtZSArIFwi4oCZIGNhbm5vdCBhY2Nlc3MgcHJvcGVydHkg4oCYXCIgKyByZWN1cnNpdmVWYXJbaV0gKyBcIuKAmSBvbiBcIiArIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCB0eXBlIHsgUHJvcGVydGllcyB9IGZyb20gJy4vU2xpZGVyODlCYXNlJztcbmltcG9ydCBTbGlkZXI4OSBmcm9tICcuL1NsaWRlcjg5JztcblxuLy8gLS0tLSBUeXBlOiBNaXNjIC0tLS1cbmV4cG9ydCB0eXBlIFByb3BlcnR5Tm9kZVdpdGhvdXRBcnJheSA9IHtcbiAgWyBrZXk6IHN0cmluZyBdOiBFbGVtZW50O1xuICBzbGlkZXI6IEhUTUxEaXZFbGVtZW50O1xuICB0cmFjaz86IEhUTUxEaXZFbGVtZW50O1xuICB0aHVtYj86IEhUTUxEaXZFbGVtZW50O1xufVxuXG5cbi8vIC0tLS0gVHlwZTogU3BlY2lhbCB2YXJpYWJsZXMgLS0tLVxubmFtZXNwYWNlIFNwZWNpYWxWYXJpYWJsZXMge1xuICB0eXBlIERhdGE8VmFyTmFtZT4gPSB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIHZhcmlhYmxlIHNob3VsZCBvbmx5IGJlIGF2YWlsYWJsZSBpbiA8dGh1bWI+IGFuZCBpdHMgY2hpbGRyZW4uICovXG4gICAgdGh1bWJPbmx5PzogYm9vbGVhbjtcbiAgICBnZXR0ZXI6IFZhck5hbWUgZXh0ZW5kcyBgdGh1bWJfJHtzdHJpbmd9YFxuICAgICAgPyAobm9kZTogSFRNTERpdkVsZW1lbnQsIHNsaWRlcjogU2xpZGVyODksIGJhc2VOYW1lOiBzdHJpbmcpID0+IGFueVxuICAgICAgOiAobm9kZTogRWxlbWVudCwgc2xpZGVyOiBTbGlkZXI4OSkgPT4gYW55XG4gIH1cblxuICBleHBvcnQgdHlwZSBCYXNlID0ge1xuICAgIFsgVmFyTmFtZSBpbiBTcGVjaWFsVmFyaWFibGVOYW1lcyBdOiBEYXRhPFZhck5hbWU+XG4gIH07XG4gIGV4cG9ydCB0eXBlIFByb3h5ID0gUGFydGlhbDxSZWNvcmQ8a2V5b2YgU3RydWN0dXJlVmFyaWFibGVzLCBTcGVjaWFsVmFyaWFibGVOYW1lc1tdPj47XG59XG5cblxuLy8gLS0tLSBUeXBlOiBTdHJ1Y3R1cmUgdmFyaWFibGVzIC0tLS1cbmV4cG9ydCB0eXBlIFZhcmlhYmxlTmFtZSA9IFNwZWNpYWxWYXJpYWJsZU5hbWVzIHwga2V5b2YgUHJvcGVydGllcy5XaXRoQ3VzdG9tO1xuXG50eXBlIFN0cnVjdHVyZVZhcmlhYmxlcyA9IFBhcnRpYWw8e1xuICBbIFYgaW4gVmFyaWFibGVOYW1lIF06IFJlY29yZDxzdHJpbmcsIE5vZGVbXT5cbn0+XG5cblxuLy8gLS0tLSBUeXBlcyB0byBrZWVwIHRyYWNrIG9mIC0tLS1cbnR5cGUgU3BlY2lhbFZhcmlhYmxlTmFtZXMgPSAndGFnX25vZGUnIHwgJ3RodW1iX2luZGV4JyB8ICd0aHVtYl92YWx1ZSc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIge1xuICAvKipcbiAgICogU3BlY2lhbCB2YXJpYWJsZXMgaW5zaWRlIHRoZSBzdHJ1Y3R1cmUgc3lzdGVtLlxuICAgKiBJbnN0ZWFkIG9mIGJlaW5nIGxpbmtlZCB0byBwcm9wZXJ0aWVzLCB0aGVzZSBjYW4gY2FsbCBhcmJpdHJhcnkgZnVuY3Rpb25zLlxuICAgKi9cbiAgc3RhdGljIHNwZWNpYWxWYXJpYWJsZXM6IFNwZWNpYWxWYXJpYWJsZXMuQmFzZSA9IDxjb25zdD4gKHtcbiAgICB0YWdfbm9kZToge1xuICAgICAgZ2V0dGVyOiBub2RlID0+IG5vZGVcbiAgICB9LFxuICAgIHRodW1iX2luZGV4OiB7XG4gICAgICB0aHVtYk9ubHk6IHRydWUsXG4gICAgICBnZXR0ZXI6IChub2RlLCBzbGlkZXIsIGJhc2VOYW1lKSA9PiAoc2xpZGVyLm5vZGVbYmFzZU5hbWVdIGFzIEVsZW1lbnRbXSkuaW5kZXhPZihub2RlKVxuICAgIH0sXG4gICAgdGh1bWJfdmFsdWU6IHtcbiAgICAgIHRodW1iT25seTogdHJ1ZSxcbiAgICAgIGdldHRlcjogKG5vZGUsIHNsaWRlciwgYmFzZU5hbWUpID0+IHNsaWRlci52YWx1ZXNbKHNsaWRlci5ub2RlW2Jhc2VOYW1lXSBhcyBFbGVtZW50W10pLmluZGV4T2Yobm9kZSldXG4gICAgfSxcbiAgfSk7XG4gIC8qKlxuICAgKiBMaW5rcyB7QGxpbmsgc3BlY2lhbFZhcmlhYmxlc30gdG8gcG90ZW50aWFsIHNsaWRlciBwcm9wZXJ0aWVzIHRoZXkgZGVwZW5kIG9uLFxuICAgKiBzbyB0aGF0IHRoZSBzcGVjaWFsIHZhcmlhYmxlcyBnZXQgdXBkYXRlZCB3aGVuIHRoZSBwcm9wZXJ0eSB1cGRhdGVzLlxuICAgKi9cbiAgc3RhdGljIHNwZWNpYWxWYXJpYWJsZVByb3h5OiBTcGVjaWFsVmFyaWFibGVzLlByb3h5ID0ge1xuICAgIHZhbHVlczogWyAndGh1bWJfaW5kZXgnLCAndGh1bWJfdmFsdWUnIF1cbiAgfTtcblxuICAvLyBTdGF0aWMgaW5pdGlhbGl6YXRpb24gYmxvY2tzIGRvbid0IHdvcmsgd2l0aCBteSBjdXJyZW50IHdvcmtmbG93XG4gIHN0YXRpYyByZWdleCA9IChmdW5jdGlvbigpIHtcbiAgICAvLyBGdWNrIHlvdVxuICAgIGNvbnN0IHJlZzogYW55ID0ge1xuICAgICAgYXR0cjoge1xuICAgICAgICBuYW1lOiAnW1xcXFx3LV0rJ1xuICAgICAgfSxcbiAgICAgIGFsbDogJ1tcXFxcZFxcXFxEXScsXG4gICAgICBjYXBOYW1lOiAnKFtcXFxcdy1dKyknLFxuICAgIH07XG4gICAgcmVnLmF0dHIudmFsdWUgPSAnKD86KD8hPCknICsgcmVnLmFsbCArICcpKj8nO1xuICAgIHJlZy50YWdUeXBlID0gJyg/OlxcXFxzKycgKyByZWcuY2FwTmFtZSArICcpPyc7XG4gICAgcmVnLmNvbnRlbnQgPSAnKD86XFxcXHMrXCIoJyArIHJlZy5hbGwgKyAnKz8pXCIpPyc7XG4gICAgcmVnLmF0dHJpYnMgPSAnKD86XFxcXHMrJyArIHJlZy5hdHRyLm5hbWUgKyAnPVxcXFxbJyArIHJlZy5hdHRyLnZhbHVlICsgJ1xcXFxdKSonO1xuICAgIHJlZy52YXJDb250ZW50ID0gJ1xcXFwkKCg/OlxcXFx3Kyg/OlxcXFwuKD89XFxcXHcpKT8pKyknO1xuXG4gICAgY29uc3Qgcmd4ID0ge1xuICAgICAgdmFyaWFibGU6ICdcXFxceycgKyByZWcudmFyQ29udGVudCArICdcXFxcfXwnICsgcmVnLnZhckNvbnRlbnQsXG4gICAgICBhdHRyaWJ1dGVzOiAnKCcgKyByZWcuYXR0ci5uYW1lICsgJyk9XFxcXFsoJyArIHJlZy5hdHRyLnZhbHVlICsgJylcXFxcXSg/OlxcXFxzK3wkKScsXG4gICAgICB0YWc6ICc8KFsvOl0pPycgKyByZWcuY2FwTmFtZSArIHJlZy50YWdUeXBlICsgcmVnLmNvbnRlbnQgKyAnKCcgKyByZWcuYXR0cmlicyArICcpXFxcXHMqPz5cXFxccyonXG4gICAgfSBhcyBjb25zdDtcblxuICAgIGNvbnN0IGZpbmFsRXhwcmVzc2lvbnMgPSB7fSBhcyB7IFsgcCBpbiBrZXlvZiB0eXBlb2Ygcmd4IF06IFJlZ0V4cCB9ICYgeyB2YXJpYWJsZU5vRmxhZzogUmVnRXhwIH07XG4gICAgLy8gRVM1IGNhbid0IGBuZXcgUmVnRXhwYCBmcm9tIGFub3RoZXIgUmVnRXhwXG4gICAgZm9yIChsZXQgZXhwciBpbiByZ3gpIHtcbiAgICAgIGZpbmFsRXhwcmVzc2lvbnNbZXhwcl0gPSBuZXcgUmVnRXhwKHJneFtleHByXSwgJ2cnKTtcbiAgICB9XG4gICAgZmluYWxFeHByZXNzaW9ucy52YXJpYWJsZU5vRmxhZyA9IG5ldyBSZWdFeHAocmd4LnZhcmlhYmxlKTtcblxuICAgIHJldHVybiBmaW5hbEV4cHJlc3Npb25zO1xuICB9KCkpO1xuXG5cbiAgLy8gLS0tLSBQcm9wZXJ0aWVzIC0tLS1cbiAgc3RydWN0dXJlVmFyczogU3RydWN0dXJlVmFyaWFibGVzID0ge307XG4gIHRodW1iQ2hpbGRyZW46IHN0cmluZ1tdID0gW107XG5cbiAgdmFsczogUHJvcGVydGllcy5WYWxzO1xuXG5cbiAgY29uc3RydWN0b3IodmFsczogUHJvcGVydGllcy5WYWxzKSB7XG4gICAgdGhpcy52YWxzID0gdmFscztcbiAgfVxuXG5cbiAgLy8gLS0tLSBTdHJ1Y3R1cmUgcGFyc2VyIC0tLS1cbiAgcGFyc2VTdHJ1Y3R1cmUoc3RydWN0dXJlU3RyOiBzdHJpbmcpIHtcbiAgICBjb25zdCBub2RlOiBQYXJ0aWFsPFByb3BlcnR5Tm9kZVdpdGhvdXRBcnJheT4gPSB7XG4gICAgICBzbGlkZXI6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgfTtcblxuICAgIHN0cnVjdHVyZVN0ciA9IHN0cnVjdHVyZVN0ci50cmltKCk7XG5cbiAgICAvLyBSZXNldCB0aGUgZ2xvYmFsIFJlZ0V4cC1pbnRlcm5hbCBgbGFzdEluZGV4YCBmbGFnXG4gICAgLy8gVGhpcyB3b3VsZCBvdGhlcndpc2UgY2xhc2ggd2l0aCBtdWx0aXBsZSBzbGlkZXIgaW5zdGFuY2VzLCBiZWNhdXNlIHRoZSByZWdleGVzIGFyZSBnbG9iYWxcbiAgICBmb3IgKGNvbnN0IHJlZ2V4cE5hbWUgaW4gU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIucmVnZXgpIHtcbiAgICAgIGlmIChTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5yZWdleFtyZWdleHBOYW1lXS5nbG9iYWwpIHtcbiAgICAgICAgU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIucmVnZXhbcmVnZXhwTmFtZV0ubGFzdEluZGV4ID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzdGFjazogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gMDtcbiAgICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheTtcbiAgICAvLyBtYXRjaDogW21hdGNoZWRTdHIsIHR5cGUsIG5hbWUsIHRhZywgaW5uZXJDb250ZW50LCBhdHRyaWJ1dGVzXVxuICAgIHdoaWxlIChtYXRjaCA9IFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnJlZ2V4LnRhZy5leGVjKHN0cnVjdHVyZVN0cikpIHtcbiAgICAgIGlmIChtYXRjaC5pbmRleCAhPT0gY3VycmVudEluZGV4KSB7XG4gICAgICAgIGNvbnN0IGJlZm9yZUZhaWx1cmUgPSAndGFnIOKAmDwnICsgKG1hdGNoWzFdIHx8ICcnKSArIG1hdGNoWzJdICsgJz7igJknO1xuICAgICAgICBjb25zdCBwb2ludE9mRmFpbHVyZSA9IHN0cnVjdHVyZVN0ci5zbGljZShjdXJyZW50SW5kZXgsIG1hdGNoLmluZGV4KS50cmltKCk7XG4gICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVQYXJzZUVycm9yKGJlZm9yZUZhaWx1cmUsIHBvaW50T2ZGYWlsdXJlKTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRJbmRleCA9IFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnJlZ2V4LnRhZy5sYXN0SW5kZXg7XG5cbiAgICAgIGlmIChtYXRjaFsxXSAhPT0gJy8nKSB7XG4gICAgICAgIGNvbnN0IGxhc3ROYW1lID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0gfHwgJ3NsaWRlcic7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmFzc2VtYmxlRWxlbWVudChub2RlLCBtYXRjaFsyXSwgc3RhY2ssIG1hdGNoWzNdLCBtYXRjaFs0XSwgbWF0Y2hbNV0pO1xuICAgICAgICBub2RlW21hdGNoWzJdXSA9IGVsZW1lbnQ7XG4gICAgICAgIG5vZGVbbGFzdE5hbWVdLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIC8vIFRoaXMgZGV0ZWN0cyB0aHVtYiBjaGlsZHJlbiAoQmVjYXVzZSBpdCdzIGNhbGxlZCBCRUZPUkUgJ3RodW1iJyBpcyBwdXNoZWQgb250byB0aGUgc3RhY2spXG4gICAgICAgIGlmIChzdGFjay5pbmNsdWRlcygndGh1bWInKSkge1xuICAgICAgICAgIHRoaXMudGh1bWJDaGlsZHJlbi5wdXNoKG1hdGNoWzJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYXRjaFsxXSA9PSBudWxsKSB7XG4gICAgICAgICAgc3RhY2sucHVzaChtYXRjaFsyXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxhc3RJdGVtID0gc3RhY2sucG9wKCk7XG4gICAgICAgIGlmIChsYXN0SXRlbSAhPT0gbWF0Y2hbMl0pIHtcbiAgICAgICAgICBpZiAoc3RhY2suaW5kZXhPZihtYXRjaFsyXSkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NpbmdUYWdFcnJvcihsYXN0SXRlbSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVFcnJvcihcbiAgICAgICAgICAgICAgXCJUaGUgY2xvc2luZyB0YWcg4oCYPC9cIiArIG1hdGNoWzJdICsgXCI+4oCZIGNvdWxkbid0IGZpbmQgYSBtYXRjaGluZyBvcGVuaW5nIHRhZ1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY3VycmVudEluZGV4ICE9PSBzdHJ1Y3R1cmVTdHIubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgU2xpZGVyODkuU3RydWN0dXJlUGFyc2VFcnJvcignZW5kIG9mIHN0cmluZycsIHN0cnVjdHVyZVN0ci5zbGljZShjdXJyZW50SW5kZXgpKTtcbiAgICB9XG4gICAgaWYgKHN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVFcnJvcihcbiAgICAgICAgXCJDb3VsZG4ndCBmaW5kIGEgbWF0Y2hpbmcgY2xvc2luZyB0YWcgZm9yIGZvbGxvd2luZyBlbGVtZW50czpcIiArIFNsaWRlcjg5LmFycmF5VG9MaXN0U3RyaW5nKHN0YWNrKSk7XG4gICAgfSBlbHNlIGlmIChzdGFjay5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuY2xvc2luZ1RhZ0Vycm9yKHN0YWNrWzBdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZSBhcyBQcm9wZXJ0eU5vZGVXaXRob3V0QXJyYXk7XG4gIH1cblxuICBhc3NlbWJsZUVsZW1lbnQ8VCBleHRlbmRzIHN0cmluZz4oXG4gICAgbm9kZTogUGFydGlhbDxQcm9wZXJ0aWVzLkJhc2VbJ25vZGUnXSB8IFByb3BlcnR5Tm9kZVdpdGhvdXRBcnJheT4sXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG5hbWVTdGFjazogc3RyaW5nW10sXG4gICAgdGFnPzogVCxcbiAgICBjb250ZW50Pzogc3RyaW5nLFxuICAgIGF0dHJpYnV0ZXM/OiBzdHJpbmdcbiAgKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLCBuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFNsaWRlcjg5LlN0cnVjdHVyZUVycm9yKFxuICAgICAgICAnRXZlcnkgZWxlbWVudCBtdXN0IGhhdmUgYSB1bmlxdWUgbmFtZSBidXQgdGhlcmUgYXJlIG11dGlwbGUgZWxlbWVudHMgY2FsbGVkIOKAmCcgKyBuYW1lICsgJ+KAmScpO1xuICAgIH1cbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcgfHwgJ2RpdicpIGFzIChUIGV4dGVuZHMgJ2RpdicgPyBIVE1MRGl2RWxlbWVudCA6IEhUTUxFbGVtZW50KTtcblxuICAgIGlmIChjb250ZW50ICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY29udGVudCk7XG4gICAgICB0ZXh0Tm9kZS50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKHRleHROb2RlKTtcblxuICAgICAgaWYgKFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnN0cmluZ0hhc1ZhcmlhYmxlKGNvbnRlbnQpKSB7XG4gICAgICAgIHRoaXMucGFyc2VWYXJpYWJsZXMoY29udGVudCwgdGV4dE5vZGUsIG5hbWUsIG5hbWVTdGFjayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgIGxldCBtYXRjaDtcbiAgICAgIHdoaWxlIChtYXRjaCA9IFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnJlZ2V4LmF0dHJpYnV0ZXMuZXhlYyhhdHRyaWJ1dGVzKSkge1xuICAgICAgICBjb25zdCBhdHRyaWJOYW1lID0gbWF0Y2hbMV07XG4gICAgICAgIGNvbnN0IGF0dHJpYlZhbHVlID0gbWF0Y2hbMl07XG5cbiAgICAgICAgY29uc3QgYXR0cmliTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUF0dHJpYnV0ZShhdHRyaWJOYW1lKTtcbiAgICAgICAgYXR0cmliTm9kZS50ZXh0Q29udGVudCA9IGF0dHJpYlZhbHVlO1xuICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZU5vZGUoYXR0cmliTm9kZSk7XG5cbiAgICAgICAgaWYgKFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnN0cmluZ0hhc1ZhcmlhYmxlKGF0dHJpYlZhbHVlKSkge1xuICAgICAgICAgIHRoaXMucGFyc2VWYXJpYWJsZXMoYXR0cmliVmFsdWUsIGF0dHJpYk5vZGUsIG5hbWUsIG5hbWVTdGFjayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbTtcbiAgfVxuXG4gIC8vIC0tLS0gU3RydWN0dXJlIHZhcmlhYmxlcyByZWdpc3RlciAtLS0tXG4gIHBhcnNlVmFyaWFibGVzKHN0cjogc3RyaW5nLCB0YXJnZXROb2RlOiBOb2RlLCB0YWdOYW1lOiBzdHJpbmcsIHRhZ05hbWVTdGFjazogc3RyaW5nW10pIHtcbiAgICAvLyBNZW1vcml6ZSAmIHNraXAgYWxyZWFkeSBoYW5kbGVkIHZhcmlhYmxlcyBmb3IgdGhlIGN1cnJlbnQgc3RyaW5nXG4gICAgY29uc3QgcHJvcE5hbWVDYWNoZTogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQgbWF0Y2g6IFJlZ0V4cEV4ZWNBcnJheTtcbiAgICB3aGlsZSAobWF0Y2ggPSBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5yZWdleC52YXJpYWJsZS5leGVjKHN0cikpIHtcbiAgICAgIGNvbnN0IHZhck5hbWUgPSBtYXRjaFsxXSB8fCBtYXRjaFsyXTtcbiAgICAgIGNvbnN0IHByb3BOYW1lID0gdmFyTmFtZS5pbmRleE9mKCcuJykgIT09IC0xXG4gICAgICAgID8gdmFyTmFtZS5zbGljZSgwLCB2YXJOYW1lLmluZGV4T2YoJy4nKSlcbiAgICAgICAgOiB2YXJOYW1lO1xuXG4gICAgICBpZiAoIXByb3BOYW1lQ2FjaGUuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMudmFscywgcHJvcE5hbWUpXG4gICAgICAgICAgICAmJiAhU2xpZGVyODlTdHJ1Y3R1cmVQYXJzZXIuY2hlY2tGb3JTcGVjaWFsVmFyaWFibGVzKHByb3BOYW1lLCB0YWdOYW1lLCB0YWdOYW1lU3RhY2spXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVFcnJvcihcbiAgICAgICAgICAgIFwi4oCYXCIgKyBwcm9wTmFtZSArIFwi4oCZIGlzIG5vdCBhIHJlY29nbml6ZWQgcHJvcGVydHkgYW5kIGNhbm5vdCBiZSB1c2VkIGFzIHZhcmlhYmxlLlwiXG4gICAgICAgICAgICArIFwiUGxlYXNlIGNoZWNrIGl0cyBzcGVsbGluZyBvciBpbml0aWFsaXplIGl0IGluIHRoZSBjb25zdHJ1Y3RvclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJWYXJpYWJsZShwcm9wTmFtZSBhcyBrZXlvZiBTdHJ1Y3R1cmVWYXJpYWJsZXMsIHN0ciwgdGFyZ2V0Tm9kZSk7XG5cbiAgICAgICAgcHJvcE5hbWVDYWNoZS5wdXNoKHByb3BOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWdpc3RlclZhcmlhYmxlKHByb3BOYW1lOiBrZXlvZiBTdHJ1Y3R1cmVWYXJpYWJsZXMsIHN0cjogc3RyaW5nLCB0YXJnZXROb2RlOiBOb2RlKSB7XG4gICAgaWYgKHRoaXMuc3RydWN0dXJlVmFyc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgdGhpcy5zdHJ1Y3R1cmVWYXJzW3Byb3BOYW1lXSA9IHt9XG4gICAgfVxuICAgIGlmICh0aGlzLnN0cnVjdHVyZVZhcnNbcHJvcE5hbWVdW3N0cl0gPT0gbnVsbCkge1xuICAgICAgdGhpcy5zdHJ1Y3R1cmVWYXJzW3Byb3BOYW1lXVtzdHJdID0gbmV3IEFycmF5KCk7XG4gICAgfVxuICAgIHRoaXMuc3RydWN0dXJlVmFyc1twcm9wTmFtZV1bc3RyXS5wdXNoKHRhcmdldE5vZGUpO1xuICB9XG5cblxuICAvLyAtLS0tIEVycm9yIGhlbHBlcnMgLS0tLVxuICBjbG9zaW5nVGFnRXJyb3IodGFnTmFtZTogc3RyaW5nKSB7XG4gICAgdGhyb3cgbmV3IFNsaWRlcjg5LlN0cnVjdHVyZUVycm9yKFxuICAgICAgXCJDb3VsZG4ndCBmaW5kIGEgY2xvc2luZyB0YWcgZm9yIHRoZSBlbGVtZW50IOKAmDxcIiArIHRhZ05hbWUgKyBcIj7igJkgKFNob3VsZCBpdCBiZSBhIHNlbGYtY2xvc2luZyB0YWcgbWFya2VkIHdpdGgg4oCYOuKAmT8pXCIpO1xuICB9XG5cblxuICAvLyAtLS0tIFN0YXRpYyBoZWxwZXJzIC0tLS1cbiAgc3RhdGljIGdldE5vZGVPd25lcihub2RlOiBOb2RlKTogSFRNTEVsZW1lbnQge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICByZXR1cm4gbm9kZS5vd25lckVsZW1lbnQgfHwgbm9kZS5wYXJlbnRFbGVtZW50O1xuICB9XG5cbiAgc3RhdGljIHN0cmluZ0hhc1ZhcmlhYmxlKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gTmVlZCB0byB1c2UgYSBSZWdFeHAgd2l0aG91dCAvZy8gYmVjYXVzZSB0aGUgaW50ZXJuYWwgYGxhc3RJbmRleGAgbXVzdG4ndCBiZSBhZHZhbmNlZCBieSBhIG1lcmUgdGVzdFxuICAgIHJldHVybiBTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5yZWdleC52YXJpYWJsZU5vRmxhZy50ZXN0KHN0cik7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tGb3JTcGVjaWFsVmFyaWFibGVzKHZhck5hbWU6IHN0cmluZywgdGFnTmFtZTogc3RyaW5nLCB0YWdOYW1lU3RhY2s6IHN0cmluZ1tdKTogYm9vbGVhbiB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChTbGlkZXI4OVN0cnVjdHVyZVBhcnNlci5zcGVjaWFsVmFyaWFibGVzLCB2YXJOYW1lKSkge1xuICAgICAgY29uc3QgdmFyRGF0YSA9IFNsaWRlcjg5U3RydWN0dXJlUGFyc2VyLnNwZWNpYWxWYXJpYWJsZXNbdmFyTmFtZV07XG4gICAgICBpZiAodmFyRGF0YS50aHVtYk9ubHkgJiYgdGFnTmFtZSAhPT0gJ3RodW1iJyAmJiAhdGFnTmFtZVN0YWNrLmluY2x1ZGVzKCd0aHVtYicpKSB7XG4gICAgICAgIHRocm93IG5ldyBTbGlkZXI4OS5TdHJ1Y3R1cmVFcnJvcihcbiAgICAgICAgICBcIlRoZSB2YXJpYWJsZSDigJgkXCIgKyB2YXJOYW1lICsgXCLigJkgbWF5IG9ubHkgYmUgdXNlZCBpbnNpZGUgdGhlIOKAmDx0aHVtYj7igJkgdGFnIGFuZCBpdHMgY2hpbGRyZW4gXCJcbiAgICAgICAgICArIFwiKEl0IHdhcyBmb3VuZCBpbiDigJg8XCIgKyB0YWdOYW1lU3RhY2tbdGFnTmFtZVN0YWNrLmxlbmd0aCAtIDFdICsgXCI+4oCZKVwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiIsIlxuICAgIG1vZHVsZS5leHBvcnRzID0gJy5zbDg5LXRyYWNre3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjIwMHB4O2hlaWdodDoyNXB4O2JhY2tncm91bmQtY29sb3I6aHNsKDAsMCUsMTglKTt9LnNsaWRlcjg5LnZlcnRpY2FsIC5zbDg5LXRyYWNre2hlaWdodDoyMDBweDt3aWR0aDoyNXB4O30uc2w4OS10aHVtYntwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxNnB4O2hlaWdodDoxMDAlO2JhY2tncm91bmQtY29sb3I6aHNsKDAsMCUsMjglKTtjdXJzb3I6cG9pbnRlcjt9LnNsaWRlcjg5LnZlcnRpY2FsIC5zbDg5LXRodW1ie2hlaWdodDoxNnB4O3dpZHRoOjEwMCU7fS5zbDg5LW5vc2VsZWN0ey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtwb2ludGVyLWV2ZW50czpub25lO30nXG4gICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9jb3JlL1NsaWRlcjg5LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9