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
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/default-styles.css":
/*!********************************!*\
  !*** ./src/default-styles.css ***!
  \********************************/
/***/ ((module) => {


    module.exports = [ ".sl89-track{position:relative;width:200px;height:25px;background-color:hsl(0,0%,18%);",".slider89.vertical .sl89-track{height:200px;width:25px;",".sl89-thumb{position:absolute;width:16px;height:100%;background-color:hsl(0,0%,28%);cursor:pointer;",".slider89.vertical .sl89-thumb{height:16px;width:100%;",".sl89-noselect{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;" ]
  

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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider89)
/* harmony export */ });
/* harmony import */ var _default_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./default-styles.css */ "./src/default-styles.css");
/* harmony import */ var _default_styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_default_styles_css__WEBPACK_IMPORTED_MODULE_0__);


function Slider89(target, config, replace) {
  if (!target) {
    error('no first argument has been supplied. It needs to be the DOM target node for the slider', 'constructor', true);
  } else if (!target.nodeType || target.nodeType != 1) {
    error('the first argument must be a valid DOM node the slider will be placed into ' + typeMsg(target), 'constructor', true);
  }

  if (config == undefined || config === false) {
    config = {};
  } else if (typeof config != 'object' || Array.isArray(config)) {
    error('the optional second argument needs to be an object for configuration ' + typeMsg(config), 'constructor', true);
  }

  const that = this;
  const eventTypes = [
    'start',
    'move',
    'end',
    'change:$property'
  ];

  let initial = false;
  let activeThumb;
  let activeTouchID;
  let mouseDownPos;
  let eventID = 0;
  let structureRgx; //Pointer to `rgx` in parseStructure
  let trackStyle; //The live computed style of vals.node.track
  const structureVars = {};
  const eventList = {}; //Storing event data (most notably the identifier) for event removability
  const vals = {}; //holding every property of the class

  //`$` is a fixed endpoint for all properties, only to be accessed by a bubbling getter/setter
  //Object.defineProperty is used for non-enumerability of `$` inside `vals`
  Object.defineProperty(vals, '$', {
    value: {}
  });

  //Style rule strings which will be inserted into a newly created stylesheet
  // const styles = require('./default-styles.css');

  const methods = {
    addEvent: {
      function: addEvent,
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
      function: removeEvent,
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
  };

  const properties = {
    range: {
      default: [0, 100],
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
      setter: function(val) {
        if (val[0] === val[1]) {
          propError('range', 'the given range of [' + val.join(', ') + '] defines the same value for both range start and end');
        }
        if (!initial) {
          computeRatioDistance({range: val});
        }
      }
    },
    value: {
      default: function() {
        return vals.range[0];
      },
      structure: [{
        type: 'number'
      }],
      setter: function(val) {
        if (
          vals.range[0] > vals.range[1] && (val > vals.range[0] || val < vals.range[1]) ||
          vals.range[1] > vals.range[0] && (val < vals.range[0] || val > vals.range[1])
        ) {
          const rangeStr = '[' + vals.range.join(', ') + ']';
          propError('value', 'the given value of ' + val + ' exceeds the currently set range of ' + rangeStr);
        }
        if (!initial) {
          computeRatioDistance({value: val});
          return true;
        }
      },
      getter: function(val) {
        return vals.precision !== false ? Number(val.toFixed(vals.precision)) : val;
      }
    },
    precision: {
      default: false,
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
      setter: function(val) {
        if (val !== false) {
          for (var i = 0; i < vals.range.length; i++) {
            if (Number(vals.range[i].toFixed(val)) !== vals.range[i]) {
              propError('range', 'the given range ' + ['start', 'end'][i] + ' of `' + vals.range[i] + '` exceeds the currently set precision of ' + val);
            }
          }
        }
        if (!initial) {
          computeRatioDistance({precision: val});
        }
      }
    },
    step: {
      default: false,
      structure: [
        {
          type: 'number',
          conditions: {
            nonnegative: true
          }
        },
        { type: 'false' }
      ],
      setter: function(val) {
        if (vals.precision !== false && val !== false && Number(val.toFixed(vals.precision)) !== val) {
          propError('step', 'the given value of ' + val + ' exceeds the currently set precision of ' + vals.precision);
        }
        if (!initial) {
          computeRatioDistance({step: val})
        }
      }
    },
    structure: {
      default: false,
      structure: [
        {
          type: 'string',
          conditions: {
            filled: true
          }
        },
        { type: 'false' }
      ],
      initial: true
    },
    node: {
      default: {},
      static: true
    },
    orientation: {
      default: 'horizontal',
      structure: [{
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
      default: false,
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
      initial: true,
      shape: '{nodeName: [...classes]}'
    },
    events: {
      default: {},
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
      initial: true,
      setter: function(val) {
        const errTypes = new Array();
        for (var eventType in val) {
          if (!checkEventType(eventType)) errTypes.push(eventType);
        }
        if (errTypes.length > 0) {
          const msg =
            'the given object contains items which are no valid event types:' + enlistArray(errTypes) +
            'Available event types are:' + enlistArray(eventTypes);
          propError('events', msg);
        }
      }
    }
  };

  initial = true;
  //Initializing properties and methods
  (function() {
    for (var _ in properties) {
      const item = _;
      const prop = properties[item];

      /*
        Calling Object.defineProperty on the class instance (`this`) is necessary to be able to create multiple instances
        as Class.prototype as target will inherit the defined property to all instances
        and a new call of defineProperty (when creating a new instance) would throw an error for defining the same property twice
      */
      Object.defineProperty(that, item, {
        set: function(val) {
          if (!prop.static) {
            if (!prop.initial || initial) {
              checkProp(item, val);
              let setterResult;
              if (prop.setter) {
                setterResult = (prop.setter)(val);
              }
              if (setterResult === undefined) {
                vals[item] = val;
              }
            } else error('property ‘' + item + '’ may only be set at init time but it was just set with the value ‘' + val + '’');
          } else error('property ‘' + item + '’ may only be read from but it was just set with the value ‘' + val + '’');
        },
        get: function() {
          const val = prop.getter ? prop.getter(vals[item]) : vals[item];
          return val;
        }
      });

      defineDeepProperty(vals, item, vals.$);

      if (item in config) {
        that[item] = config[item];
        delete config[item];
      } else {
        const def = prop.default;
        vals[item] = typeof def == 'function' ? def() : def;
      }
    }

    for (var _ in config) {
      const item = _;

      if (item[0] == '_') {
        defineDeepProperty(that, item, vals);
        vals[item] = config[item];
      } else {
        error('‘' + item + '’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_' + item + '’)');
      }
    }

    for (var _ in methods) {
      const item = _;
      const method = methods[item];
      Slider89.prototype[item] = function() {
        const args = Array.prototype.slice.call(arguments, 0, method.args.length);
        checkMethod(item, args);
        return method.function.apply(this, args);
      }
    }
  })();

  //Building the slider element
  (function() {
    if (vals.structure == false) {
      //In case no custom structure is defined, manually build the node to ensure best performance (parseStructure takes a while)
      vals.node.slider = document.createElement('div');
      vals.node.track = document.createElement('div');
      vals.node.thumb = document.createElement('div');

      vals.node.track.appendChild(vals.node.thumb);
      vals.node.slider.appendChild(vals.node.track);

      for (var element in vals.node)
        if (element != 'slider') vals.node[element].classList.add('sl89-' + element);
    } else {
      vals.node = parseStructure(vals.structure);
    }
    const node = vals.node;

    if (replace) {
      const targetAttr = target.attributes;
      for (var i = 0; i < targetAttr.length; i++) {
        node.slider.setAttribute(targetAttr[i].name, targetAttr[i].value);
      }
    }
    node.slider.classList.add('slider89');
    if (vals.orientation == 'vertical') node.slider.classList.add('vertical');

    if (vals.classList) {
      // Adding the specified classes and collecting all nonexistent nodes in `errNodes`
      const errNodes = new Array();
      for (var key in vals.classList) {
        const item = vals.classList[key];
        if (!Object.prototype.hasOwnProperty.call(node, key)) {
          errNodes.push(key);
        } else if (errNodes.length == 0) {
          for (var i = 0; i < item.length; i++) {
            node[key].classList.add(item[i]);
          }
        }
      }
      if (errNodes.length > 0) {
        const msg =
          "the given object contains items which aren't nodes of this slider:" + enlistArray(errNodes) +
          "Following nodes are part of this slider's node pool:" + enlistArray(Object.keys(node))
        propError('classList', msg);
      }
    }

    createStyleSheet();

    if (replace)
      target.parentNode.replaceChild(node.slider, target);
    else
      target.appendChild(node.slider);

    trackStyle = getComputedStyle(node.track);

    computeRatioDistance();

    node.thumb.addEventListener('touchstart', touchStart);
    node.thumb.addEventListener('mousedown', slideStart);
  })();

  initial = false;


  // ------ Class methods ------
  function addEvent(type, fn, name) {
    if (!checkEventType(type)) {
      error('the specified type ‘' + type + '’ is not a valid event type. Available types are:' + enlistArray(eventTypes), 'addEvent');
    }

    if (!Array.isArray(vals.events[type])) vals.events[type] = new Array();
    vals.events[type].push(fn);
    const key = name || eventID;
    const obj = {
      type: type,
      fn: fn
    };
    if (name) {
      if (!Array.isArray(eventList[key])) eventList[key] = new Array();
      eventList[key].push(obj);
    } else {
      eventList[key] = obj;
    }
    return name || eventID++;
  }
  function removeEvent(key) {
    const listEntry = eventList[key];
    if (!listEntry) return false;
    delete eventList[key];
    return Array.isArray(listEntry) ?
      listEntry.reduce(handleEvents, new Array()) :
      handleEvents(new Array(), listEntry);

    function handleEvents(acc, entry) {
      const typeEvents = vals.events[entry.type];
      const deleted = typeEvents.splice(typeEvents.indexOf(entry.fn), 1)[0];
      if (typeEvents.length === 0) delete vals.events[entry.type];
      acc.push(deleted);
      return acc;
    }
  }

  // ------ Helper functions ------
  function error(msg, target, abort) {
    //TODO: refer to docs
    msg = 'Slider89' + (target ? ' @ ' + target : '') + ': ' + msg;
    if (msg[msg.length - 1] != '\n' && msg[msg.length - 1] != '.') msg += '.\n';
    if (initial || abort) msg += 'Aborting the slider construction.';
    throw new Error(msg);
  }
  function typeMsg(variable, noIntro) {
    let msg = noIntro ? '' : 'but it is ';
    if (Array.isArray(variable))
      msg += 'an array';
    else if (polyIsNaN(variable))
      msg += 'NaN';
    else if (variable === null)
      msg += 'null';
    else if (typeof variable == 'boolean')
      msg += variable;
    else
      msg += 'of type ' + typeof variable;

    return msg;
  }
  function enlistArray(arr) {
    return '\n - "' + arr.join('"\n - "') + '"\n';
  }
  function checkEventType(type) {
    if (type.indexOf('change:') == 0) {
      //Edge case for 'change:$property'
      const customProp = type.slice('change:'.length);
      if (!Object.prototype.hasOwnProperty.call(vals, customProp)) {
        error("‘" + type + "’ refers to ‘" + customProp + "’, which isn't a recognized property. Check its spelling and be aware that custom properties need to be initialized", 'addEvent');
      }
    } else if (eventTypes.indexOf(type) == -1) return false;
    return true;
  }

  //MDN Polyfill @ Number.isNaN
  function polyIsNaN(val) {
    return Number.isNaN && Number.isNaN(val) || !Number.isNaN && typeof val === 'number' && val !== val;
  }

  function defineDeepProperty(target, item, endpoint) {
    Object.defineProperty(target, item, {
      set: function(val) {
        endpoint[item] = val;
        if (Object.prototype.hasOwnProperty.call(structureVars, item)) {
          updateVariable(item);
        }
        if (!initial) invokeEvent(['change:' + item]);
      },
      get: function() {
        return endpoint[item];
      },
      enumerable: true
    });

    function updateVariable(prop) {
      for (var i in structureVars[prop]) {
        const item = structureVars[prop][i];
        const str = item.str.replace(structureRgx.variable, function(match, variableDelimit, variable) {
          return that[variableDelimit || variable];
        });
        if (item.attr) {
          item.node.setAttribute(item.attr, str);
        } else {
          item.node.textContent = str;
        }
      }
    }
  }

  // ------ Thumb moving functions ------
  function getTrackPadding(direction) {
    return parseFloat(trackStyle['padding' + direction]);
  }
  function getDistance() {
    const style = vals.node.thumb.style.transform;
    const translateStr = vals.orientation == 'vertical' ? 'translateY(' : 'translateX(';
    const firstBracket = style.slice(style.indexOf(translateStr) + translateStr.length);
    return parseFloat(firstBracket.slice(0, firstBracket.indexOf(')')));
  }
  function getAbsoluteTrackSize() {
    if (vals.orientation == 'vertical') {
      return (vals.node.track.clientHeight - getTrackPadding('Top') - getTrackPadding('Bottom')) - vals.node.thumb.clientHeight;
    } else {
      return (vals.node.track.clientWidth - getTrackPadding('Left') - getTrackPadding('Right')) - vals.node.thumb.clientWidth;
    }
  }
  function computeDistanceValue(distance, absSize) {
    if (absSize == null) absSize = getAbsoluteTrackSize();
    return distance / absSize * (vals.range[1] - vals.range[0]) + vals.range[0];
  }
  function moveThumb(distance, useTransform) {
    if (useTransform) {
      vals.node.thumb.style.transform = 'translate' + (vals.orientation == 'vertical' ? 'Y' : 'X') + '(' + distance + 'px)';
    } else {
      if (vals.orientation == 'vertical') {
        var paddingStart = getTrackPadding('Top');
        var paddingEnd = getTrackPadding('Bottom');
        var thumbDim = vals.node.thumb.clientHeight;
        var posAnchor = 'top';
      } else {
        var paddingStart = getTrackPadding('Left');
        var paddingEnd = getTrackPadding('Right');
        var thumbDim = vals.node.thumb.clientWidth;
        var posAnchor = 'left';
      }

      let subtract = (thumbDim * distance) + 'px';
      if (paddingEnd) subtract += ' - ' + (paddingEnd * distance) + 'px';
      if (paddingStart) subtract += ' + ' + (paddingStart * (1 - distance)) + 'px';
      vals.node.thumb.style[posAnchor] = 'calc(' + (distance * 100) + '% - ' + subtract + ')';
    }
  }
  function computeRatioDistance(newVals) {
    let value, ratio;
    if (!newVals) {
      newVals = vals;
      value = vals.value;
    } else {
      const props = ['range', 'step'];
      for (var i in props) {
        if (newVals[props[i]] == null) newVals[props[i]] = vals[props[i]];
      }
      if (newVals.value != null) {
        value = newVals.value;
      } else {
        ratio = (vals.value - vals.range[0]) / (vals.range[1] - vals.range[0]);
        value = (newVals.range[1] - newVals.range[0]) * ratio + newVals.range[0];
      }
    }
    //Round value to a given step
    if (newVals.step !== false) {
      if (newVals.range[1] - newVals.range[0] < newVals.step) {
        value = newVals.range[0];
      } else {
        value = newVals.range[0] + Math.round((value - newVals.range[0]) / newVals.step) * newVals.step;
      }
    }
    const newRatio = (value - newVals.range[0]) / (newVals.range[1] - newVals.range[0]);
    if (value !== vals.value) vals.value = value;
    if (newRatio !== ratio) moveThumb(newRatio);
  }

  // ------ Event functions ------
  function invokeEvent(types) {
    for (var i = 0; i < types.length; i++) {
      const functions = vals.events[types[i]];
      if (functions) {
        for (var n = 0; n < functions.length; n++) {
          functions[n].call(that);
        }
      }
    }
  }
  // -> Event listeners
  function touchStart(e) {
    e.preventDefault();
    if (activeTouchID == null) {
      activeTouchID = e.changedTouches[0].identifier;
      slideStart.call(this, e.changedTouches[0], true);

      vals.node.thumb.addEventListener('touchmove', touchMove);
      vals.node.thumb.addEventListener('touchend', touchEnd);
      vals.node.thumb.addEventListener('touchcancel', touchEnd);
    }
  }
  function touchMove(e) {
    e.preventDefault();
    for (var i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === activeTouchID) {
        slideMove.call(this, e.changedTouches[i], true);
        break;
      }
    }
  }
  function touchEnd(e) {
    e.preventDefault();
    for (var i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === activeTouchID) {
        vals.node.thumb.removeEventListener('touchmove', touchMove);
        vals.node.thumb.removeEventListener('touchend', touchEnd);
        vals.node.thumb.removeEventListener('touchcancel', touchEnd);

        slideEnd.call(this, e.changedTouches[i], true);
        activeTouchID = null;
        break;
      }
    }
  }
  function slideStart(e, isTouch) {
    document.body.classList.add('sl89-noselect');
    vals.node.thumb.classList.add('active');
    invokeEvent(['start']);

    activeThumb = this;
    if (vals.orientation == 'vertical') {
      var startDir = 'Top';
      var posAnchor = 'top';
      var clientDim = e.clientY;
    } else {
      var startDir = 'Left';
      var posAnchor = 'left';
      var clientDim = e.clientX;
    }
    const thumbOffset = activeThumb['offset' + startDir] - getTrackPadding(startDir);
    mouseDownPos = clientDim - thumbOffset;
    moveThumb(thumbOffset, true);
    activeThumb.style.removeProperty(posAnchor);

    if (!isTouch) {
      window.addEventListener('mouseup', slideEnd);
      window.addEventListener('mousemove', slideMove);
    }
  }
  function slideMove(e) {
    const absSize = getAbsoluteTrackSize();
    let distance = (vals.orientation == 'vertical' ? e.clientY : e.clientX) - mouseDownPos;

    if (distance > absSize) distance = absSize;
    else if (distance < 0) distance = 0;

    if (vals.step) {
      const relStep = absSize / ((vals.range[1] - vals.range[0]) / vals.step);
      distance = Math.round(distance / relStep) * relStep;
      if (distance > absSize) return;
    }
    const value = computeDistanceValue(distance, absSize);

    if (vals.value !== value) {
      vals.value = value;
      moveThumb(distance, true);
      invokeEvent(['move']);
    }
  }
  function slideEnd(e, isTouch) {
    if (!isTouch) {
      window.removeEventListener('mouseup', slideEnd);
      window.removeEventListener('mousemove', slideMove);
    }

    const value = computeDistanceValue(getDistance());
    computeRatioDistance({value: value});
    activeThumb.style.removeProperty('transform');
    mouseDownPos = null;
    activeThumb = null;

    invokeEvent(['end']);
    vals.node.thumb.classList.remove('active');
    document.body.classList.remove('sl89-noselect');
  }

  // ------ Scope-specific functions ------
  // -> Element building
  function createStyleSheet() {
    const sheet = (function() {
      const firstHeadChild = document.head.firstElementChild;
      if (firstHeadChild) {
        return document.head.insertBefore(document.createElement('style'), firstHeadChild).sheet;
      } else {
        return document.head.appendChild(document.createElement('style')).sheet;
      }
    })();
    for (var i = 0; i < (_default_styles_css__WEBPACK_IMPORTED_MODULE_0___default().length); i++) {
      sheet.insertRule((_default_styles_css__WEBPACK_IMPORTED_MODULE_0___default())[i], 0);
    }
  }
  function parseStructure(structureStr) {
    const node = {
      slider: document.createElement('div')
    };

    const attribs = {};
    (function() {
      const defNodes = [
        'track',
        'thumb'
      ];
      defNodes.forEach(function(node) {
        attribs[node] = {
          class: 'sl89-' + node
        };
      });
    })();

    const variables = {};

    const reg = {
      attr: {
        name: '[\\w-]+'
      },
      all: '[\\d\\D]',
      tabSpace: '[ \\t]+',
      name: '[\\w-]+',
      singleAmplfr: ':'
    };
    reg.attr.value = '(?:(?!<)' + reg.all + ')*?';
    reg.capName = '(' + reg.name + ')';
    reg.glbMatch = '(?:' + reg.tabSpace + '(?:(?!<).)*?)?>';
    reg.content = '(?:\\s+"('+reg.all+'+?)")?';
    reg.tag = '(?:\\s+' + reg.capName + ')?';
    reg.attribs = '(?:\\s+' + reg.attr.name + '\\(' + reg.attr.value + '\\))*';
    reg.base = reg.capName + reg.tag + reg.content + '(' + reg.attribs + ')\\s*?';
    const rgx = {
      general: (function() {
        const parts = {
          inner: '<([:/]?)' + reg.capName + '(?:' + reg.tabSpace + reg.name + ')?(?:' + reg.tabSpace + '(""))?' + reg.glbMatch,
          noEnd: '<' + reg.singleAmplfr + '?' + reg.capName + '.*?',
          noBeginning: '(?:^|' + reg.tabSpace + ')' + reg.singleAmplfr + '?' + reg.capName + reg.glbMatch
        };
        return parts.inner + '|' + parts.noEnd + '|' + parts.noBeginning;
      })(),
      variable: '\\{\\$(\\w+)\\}|\\$(\\w+)',
      attributes: '(' + reg.attr.name + ')\\((' + reg.attr.value + ')\\)(?:\\s+|$)',
      singleTag: '<' + reg.singleAmplfr + reg.base + '>',
      multiTag: '<' + reg.base + '>((?:'+reg.all+'(?!<' + reg.capName + '(?:\\s+' + reg.name + ')?(?:\\s+"'+reg.all+'+?")?' + reg.attribs + '\\s*?>'+reg.all+'*?<\\/\\6\\s*>))*?)<\\/\\1\\s*>'
    };
    (function() {
      for (var expr in rgx) rgx[expr] = new RegExp(rgx[expr], 'g');
    })();

    structureRgx = rgx;
    let structure = structureStr;

    while (rgx.multiTag.test(structure)) {
      structure = structure.replace(rgx.multiTag, function(match, name, tag, inner, attributes, content) {
        const elem = assembleElement(name, tag, attributes, inner);
        content = parseSingleTags(content, elem);
        node[name] = elem;
        return content;
      });
    }

    structure = parseSingleTags(structure, node.slider);

    structure = structure.trim();
    if (/\S+/g.test(structure)) {
      const errorList = new Array();
      (function() {
        if (rgx.general.test(structure)) {
          structure.replace(rgx.general, function(match, amplifier, name, content, name2, name3) {
            let info = '- "' + (name || name2 || name3) + '" => ';
            if (amplifier == '/')
              info += 'Closing tag finding no beginning';
            else if (amplifier === '')
              info += 'Opening tag finding no end (should it be a single tag marked with ‘:’?)';
            else if (content != null)
              info += 'Redundant empty text content (‘""’)';
            else if (name2)
              info += 'Missing ending character (‘>’)';
            else if (name3)
              info += 'Missing beginning character (‘<’)';
            else
              info += 'Unidentified error. Please check the element for syntax errors';
            errorList.push(info);
          });
        } else {
          errorList.push('Leftover unparsable structure:\n- "' + structure + '"\n');
        }
      }());
      propError('structure', (errorList.length > 1 ? 'several elements have' : 'an element has') + ' been declared wrongly and could not be parsed.\n' + errorList.join('.\n'));
    }

    (function() {
      const matches = new Array();
      let match;
      while (match = rgx.general.exec(structureStr)) {
        matches.push(match);
      }
      appendElements(node.slider, matches);
    })();

    //Statically typed
    (function() {
      const track = node.track;
      const thumb = node.thumb;
      if (!track) node.track = assembleElement('track', 'div');
      if (!thumb) node.thumb = assembleElement('thumb', 'div');
      if (!track && !thumb) {
        node.track.appendChild(node.thumb);
        node.slider.appendChild(node.track);
      } else if (!track && thumb) {
        node.thumb.parentNode.appendChild(node.track);
        node.track.appendChild(node.thumb);
      } else if (track && !thumb) {
        node.track.appendChild(node.thumb);
      }
    })();

    return node;

    function appendElements(parent, childArr, i) {
      if (i == null) i = 0;
      for (; i < childArr.length; i++) {
        const elem = node[childArr[i][2]];
        if (childArr[i][1] === '') {
          i = appendElements(elem, childArr, i + 1);
        } else if (childArr[i][1] == '/') return i;
        parent.appendChild(elem);
      }
    }

    function parseSingleTags(str, parent) {
      return str.replace(rgx.singleTag, function(match, name, tag, inner, attributes) {
        const elem = assembleElement(name, tag, attributes, inner);
        node[name] = elem;
        return '';
      });
    }

    function assembleElement(name, tag, attributes, content) {
      if (node[name]) {
        propError('structure', 'Every element must have a unique name but there are mutiple elements called ‘' + name + '’');
      }
      let elem = document.createElement(tag || 'div');
      const hasAttribs = !!attribs[name];
      if (content) {
        elem.textContent = registerVariables(content, elem, false);
      }
      if (attributes) {
        attributes.replace(rgx.attributes, function(attrib, attribName, value) {
          //Tailored for space-separated values (check for duplicates in value vs. default structure style)
          if (hasAttribs && attribs[name][attribName] && value.split(' ').indexOf(attribs[name][attribName]) == -1) {
            value += ' ' + attribs[name][attribName];
          }
          elem.setAttribute(attribName, registerVariables(value, elem, attribName));
        });
      }
      if (hasAttribs) {
        for (var attr in attribs[name]) {
          if (!elem.getAttribute(attr)) elem.setAttribute(attr, attribs[name][attr]);
        }
      }
      return elem;
    }

    function registerVariables(str, node, attribName) {
      if (rgx.variable.test(str)) {
        str = str.replace(rgx.variable, function(match, variableDelimit, variable) {
          const varName = variableDelimit || variable;
          if (!Object.prototype.hasOwnProperty.call(vals, varName)) {
            propError('structure', "‘" + varName + "’ is not a recognized property. Please check its spelling or initialize it in the constructor");
          }

          if (structureVars[varName] == null) structureVars[varName] = new Array();
          const item = {
            str: str,
            node: node
          };
          if (attribName) item.attr = attribName;
          structureVars[varName].push(item);

          return that[variableDelimit || variable];
        });
      }
      return str;
    }
  }

  //-> Methods & properties
  function propError(prop, msg, noTarget) {
    if (!initial) {
      let prevVal = vals[prop];
      if (Array.isArray(prevVal)) prevVal = '[' + prevVal.join(', ') + ']';
      msg += '.\nContinuing with the previous value (' + prevVal + ').';
    }
    error(msg, noTarget ? false : prop);
  }
  function methodError(method, argIdx, msg, omitError) {
    const counts = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];
    const arg = methods[method].args[argIdx];

    let errMsg = 'the ' + (arg.optional ? 'optional ' : '') + counts[argIdx] + ' argument (' + arg.name + ') ';
    if (omitError) errMsg += 'has been omitted but it is required. It ';
    errMsg += 'must be ' + computeTypeMsg(arg.structure);
    if (!omitError) errMsg += ' but it' + msg;

    error(errMsg, method);
  }

  //Checking properties & methods for the correct type & format
  function checkMethod(method, argList) {
    const obj = methods[method];
    //If the next argument (argList.length - 1 + 1) is not optional, a required arg is missing
    for (var i in argList) {
      const arg = argList[i];
      const msg = checkTypes(arg, obj.args[i].structure, false);
      if (msg) methodError(method, i, msg);
    }
    if (obj.args[argList.length] && !obj.args[argList.length].optional) {
      methodError(method, argList.length, null, true);
    }
  }
  function checkProp(prop, val) {
    const item = properties[prop];
    const msg = checkTypes(val, item.structure, false);
    if (msg) {
      propError(prop, 'property ‘' + prop + '’ must be ' + computeTypeMsg(item.structure, item.shape) + ' but it' + msg, true);
    }
  }

  function checkTypes(val, structure, plural) {
    let msg;
    for (var i = 0; i < structure.length; i++) {
      const typeObj = structure[i];
      const type = typeObj.type;
      if (
        type == 'boolean' && typeof val == 'boolean' ||
        type == 'true' && val === true ||
        type == 'false' && val === false ||
        type == 'array' && Array.isArray(val) ||
        type == 'object' && Object.prototype.toString.call(val) == '[object Object]' ||
        type == 'number' && typeof val == 'number' && !polyIsNaN(val) ||
        type == 'function' && typeof val == 'function' ||
        type == 'string' && typeof val == 'string'
      ) {
        if (type == 'array') {
          for (var n = 0; n < val.length; n++) {
            if (msg = checkTypes(val[n], typeObj.structure, true)) break;
          }
        } else if (type == 'object') {
          for (var key in val) {
            if (msg = checkTypes(val[key], typeObj.structure, true)) break;
          }
        }
        if (msg) return msg;
        if (msg = checkConditions(typeObj.conditions, val)) break;
        else return false;
      }
    }
    return msg ? ' is ' + msg : (plural ? 's values are ' : ' is ') + typeMsg(val, true);

    function checkConditions(conditions, val) {
      if (conditions) {
        if (conditions.nonnegative && val < 0) {
          return 'a negative number';
        }
        if (conditions.integer && val % 1 !== 0) {
          return 'a floating point number';
        }
        if (conditions.filled && val.trim() === '') {
          return 'an empty string';
        }
        if (conditions.keywords && conditions.keywords.indexOf(val) == -1) {
          return 'a different string';
        }
        if (conditions.wordChar && !polyIsNaN(Number(val))) {
          return 'a pure number string';
        }
        if (conditions.length && val.length !== conditions.length) {
          return (type == 'array' ? 'an ' : 'a ') + type + ' of length ' + val.length;
        }
      }
    }
  }

  //Computing an automated error message regarding the property's types and conditions
  function computeTypeMsg(struct, shape, plural, deep) {
    let msg = '';
    for (var i = 0; i < struct.length; i++) {
      const type = struct[i].type;
      const cond = struct[i].conditions;
      if (msg) msg += ' or ';

      if (type == 'number') {
        const nonnegative = cond && cond.nonnegative;
        const isInt = cond && cond.integer;

        if (nonnegative) {
          if (!plural) msg += 'a ';
          msg += 'non-negative';
        } else if (isInt && !plural) {
          msg += 'an';
        } else msg += 'any';
        msg += ' ' + (isInt ? 'integer' : 'number');
        if (plural) msg += 's';
      }

      else if (type == 'array') {
        const len = cond && cond.length;
        const msgRes = computeTypeMsg(struct[i].structure, false, len !== 1, true);

        if (!plural) msg += 'a';
        if (deep) {
          msg += msgRes;
        } else if (!plural) {
          msg += 'n';
        }
        msg += ' array';
        if (plural) msg += 's';
        if (len) msg += ' of length ' + len;
        if (!deep) msg += ' with ' + msgRes + ' as values';
      }

      else if (type == 'object') {
        msg += 'an object with ' + computeTypeMsg(struct[i].structure, false, true, true) + ' as values';
      }

      else if (type == 'function') {
        if (!deep) msg += 'a ';
        msg += 'function reference';
        if (!deep && plural) msg += 's';
      }

      else if (type == 'string') {
        if (cond && cond.keywords) {
          if (cond.keywords.length > 1) {
            msg += 'one of the keywords';
          } else {
            msg += 'the keyword';
          }
          cond.keywords.forEach(function(val, n, arr) {
            if (n != 0 && n == arr.length - 1) msg += ' or';
            else if (n != 0) msg += ',';
            msg += ' "' + val + '"';
          });
        } else {
          if (!deep) msg += 'a ';
          if (cond && cond.filled) msg += 'non-empty ';
          if (cond && cond.wordChar) msg += 'non-number ';
          msg += 'string';
          if (!deep && plural) msg += 's';
        }
      }

      else if (type == 'boolean') {
        if (!deep) msg += 'a ';
        msg += 'boolean';
        if (!deep && plural) msg += 's';
      }
      else if (type == 'true' || type == 'false') {
        msg += type;
      }

      if (shape) {
        msg += ' (' + shape + ')';
        shape = false;
      }
    }

    return msg;
  }
}

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix1QkFBdUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxxQkFBcUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsZ0JBQWdCO0FBQzFDO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1NsaWRlcjg5L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9kZWZhdWx0LXN0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1NsaWRlcjg5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTbGlkZXI4OVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJTbGlkZXI4OVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIlxuICAgIG1vZHVsZS5leHBvcnRzID0gWyBcIi5zbDg5LXRyYWNre3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjIwMHB4O2hlaWdodDoyNXB4O2JhY2tncm91bmQtY29sb3I6aHNsKDAsMCUsMTglKTtcIixcIi5zbGlkZXI4OS52ZXJ0aWNhbCAuc2w4OS10cmFja3toZWlnaHQ6MjAwcHg7d2lkdGg6MjVweDtcIixcIi5zbDg5LXRodW1ie3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjE2cHg7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1jb2xvcjpoc2woMCwwJSwyOCUpO2N1cnNvcjpwb2ludGVyO1wiLFwiLnNsaWRlcjg5LnZlcnRpY2FsIC5zbDg5LXRodW1ie2hlaWdodDoxNnB4O3dpZHRoOjEwMCU7XCIsXCIuc2w4OS1ub3NlbGVjdHstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7cG9pbnRlci1ldmVudHM6bm9uZTtcIiBdXG4gICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9kZWZhdWx0LXN0eWxlcy5jc3MnO1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTbGlkZXI4OSh0YXJnZXQsIGNvbmZpZywgcmVwbGFjZSkge1xyXG4gIGlmICghdGFyZ2V0KSB7XHJcbiAgICBlcnJvcignbm8gZmlyc3QgYXJndW1lbnQgaGFzIGJlZW4gc3VwcGxpZWQuIEl0IG5lZWRzIHRvIGJlIHRoZSBET00gdGFyZ2V0IG5vZGUgZm9yIHRoZSBzbGlkZXInLCAnY29uc3RydWN0b3InLCB0cnVlKTtcclxuICB9IGVsc2UgaWYgKCF0YXJnZXQubm9kZVR5cGUgfHwgdGFyZ2V0Lm5vZGVUeXBlICE9IDEpIHtcclxuICAgIGVycm9yKCd0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHZhbGlkIERPTSBub2RlIHRoZSBzbGlkZXIgd2lsbCBiZSBwbGFjZWQgaW50byAnICsgdHlwZU1zZyh0YXJnZXQpLCAnY29uc3RydWN0b3InLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGlmIChjb25maWcgPT0gdW5kZWZpbmVkIHx8IGNvbmZpZyA9PT0gZmFsc2UpIHtcclxuICAgIGNvbmZpZyA9IHt9O1xyXG4gIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZyAhPSAnb2JqZWN0JyB8fCBBcnJheS5pc0FycmF5KGNvbmZpZykpIHtcclxuICAgIGVycm9yKCd0aGUgb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50IG5lZWRzIHRvIGJlIGFuIG9iamVjdCBmb3IgY29uZmlndXJhdGlvbiAnICsgdHlwZU1zZyhjb25maWcpLCAnY29uc3RydWN0b3InLCB0cnVlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gIGNvbnN0IGV2ZW50VHlwZXMgPSBbXHJcbiAgICAnc3RhcnQnLFxyXG4gICAgJ21vdmUnLFxyXG4gICAgJ2VuZCcsXHJcbiAgICAnY2hhbmdlOiRwcm9wZXJ0eSdcclxuICBdO1xyXG5cclxuICBsZXQgaW5pdGlhbCA9IGZhbHNlO1xyXG4gIGxldCBhY3RpdmVUaHVtYjtcclxuICBsZXQgYWN0aXZlVG91Y2hJRDtcclxuICBsZXQgbW91c2VEb3duUG9zO1xyXG4gIGxldCBldmVudElEID0gMDtcclxuICBsZXQgc3RydWN0dXJlUmd4OyAvL1BvaW50ZXIgdG8gYHJneGAgaW4gcGFyc2VTdHJ1Y3R1cmVcclxuICBsZXQgdHJhY2tTdHlsZTsgLy9UaGUgbGl2ZSBjb21wdXRlZCBzdHlsZSBvZiB2YWxzLm5vZGUudHJhY2tcclxuICBjb25zdCBzdHJ1Y3R1cmVWYXJzID0ge307XHJcbiAgY29uc3QgZXZlbnRMaXN0ID0ge307IC8vU3RvcmluZyBldmVudCBkYXRhIChtb3N0IG5vdGFibHkgdGhlIGlkZW50aWZpZXIpIGZvciBldmVudCByZW1vdmFiaWxpdHlcclxuICBjb25zdCB2YWxzID0ge307IC8vaG9sZGluZyBldmVyeSBwcm9wZXJ0eSBvZiB0aGUgY2xhc3NcclxuXHJcbiAgLy9gJGAgaXMgYSBmaXhlZCBlbmRwb2ludCBmb3IgYWxsIHByb3BlcnRpZXMsIG9ubHkgdG8gYmUgYWNjZXNzZWQgYnkgYSBidWJibGluZyBnZXR0ZXIvc2V0dGVyXHJcbiAgLy9PYmplY3QuZGVmaW5lUHJvcGVydHkgaXMgdXNlZCBmb3Igbm9uLWVudW1lcmFiaWxpdHkgb2YgYCRgIGluc2lkZSBgdmFsc2BcclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFscywgJyQnLCB7XHJcbiAgICB2YWx1ZToge31cclxuICB9KTtcclxuXHJcbiAgLy9TdHlsZSBydWxlIHN0cmluZ3Mgd2hpY2ggd2lsbCBiZSBpbnNlcnRlZCBpbnRvIGEgbmV3bHkgY3JlYXRlZCBzdHlsZXNoZWV0XHJcbiAgLy8gY29uc3Qgc3R5bGVzID0gcmVxdWlyZSgnLi9kZWZhdWx0LXN0eWxlcy5jc3MnKTtcclxuXHJcbiAgY29uc3QgbWV0aG9kcyA9IHtcclxuICAgIGFkZEV2ZW50OiB7XHJcbiAgICAgIGZ1bmN0aW9uOiBhZGRFdmVudCxcclxuICAgICAgYXJnczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdldmVudCB0eXBlJyxcclxuICAgICAgICAgIHN0cnVjdHVyZTogW3tcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICAgIH1dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnZXZlbnQgZnVuY3Rpb24nLFxyXG4gICAgICAgICAgc3RydWN0dXJlOiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nXHJcbiAgICAgICAgICB9XVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ2V2ZW50IG5hbWVzcGFjZScsXHJcbiAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcclxuICAgICAgICAgIHN0cnVjdHVyZTogW3tcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbnM6IHtcclxuICAgICAgICAgICAgICBmaWxsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgd29yZENoYXI6IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICByZW1vdmVFdmVudDoge1xyXG4gICAgICBmdW5jdGlvbjogcmVtb3ZlRXZlbnQsXHJcbiAgICAgIGFyZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnZXZlbnQgaWRlbnRpZmllci9uYW1lc3BhY2UnLFxyXG4gICAgICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcclxuICAgICAgICAgICAgICBjb25kaXRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBub25uZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGludGVnZXI6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgICBjb25kaXRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBmaWxsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB3b3JkQ2hhcjogdHJ1ZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHByb3BlcnRpZXMgPSB7XHJcbiAgICByYW5nZToge1xyXG4gICAgICBkZWZhdWx0OiBbMCwgMTAwXSxcclxuICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcclxuICAgICAgICAgIGNvbmRpdGlvbnM6IHtcclxuICAgICAgICAgICAgbGVuZ3RoOiAyXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAgICAgIHsgdHlwZTogJ251bWJlcicgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0eXBlOiAnYm9vbGVhbicgfVxyXG4gICAgICBdLFxyXG4gICAgICBzaGFwZTogJ1tzdGFydFZhbHVlLCBlbmRWYWx1ZV0nLFxyXG4gICAgICBzZXR0ZXI6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWxbMF0gPT09IHZhbFsxXSkge1xyXG4gICAgICAgICAgcHJvcEVycm9yKCdyYW5nZScsICd0aGUgZ2l2ZW4gcmFuZ2Ugb2YgWycgKyB2YWwuam9pbignLCAnKSArICddIGRlZmluZXMgdGhlIHNhbWUgdmFsdWUgZm9yIGJvdGggcmFuZ2Ugc3RhcnQgYW5kIGVuZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWluaXRpYWwpIHtcclxuICAgICAgICAgIGNvbXB1dGVSYXRpb0Rpc3RhbmNlKHtyYW5nZTogdmFsfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgdmFsdWU6IHtcclxuICAgICAgZGVmYXVsdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHMucmFuZ2VbMF07XHJcbiAgICAgIH0sXHJcbiAgICAgIHN0cnVjdHVyZTogW3tcclxuICAgICAgICB0eXBlOiAnbnVtYmVyJ1xyXG4gICAgICB9XSxcclxuICAgICAgc2V0dGVyOiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICB2YWxzLnJhbmdlWzBdID4gdmFscy5yYW5nZVsxXSAmJiAodmFsID4gdmFscy5yYW5nZVswXSB8fCB2YWwgPCB2YWxzLnJhbmdlWzFdKSB8fFxyXG4gICAgICAgICAgdmFscy5yYW5nZVsxXSA+IHZhbHMucmFuZ2VbMF0gJiYgKHZhbCA8IHZhbHMucmFuZ2VbMF0gfHwgdmFsID4gdmFscy5yYW5nZVsxXSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgIGNvbnN0IHJhbmdlU3RyID0gJ1snICsgdmFscy5yYW5nZS5qb2luKCcsICcpICsgJ10nO1xyXG4gICAgICAgICAgcHJvcEVycm9yKCd2YWx1ZScsICd0aGUgZ2l2ZW4gdmFsdWUgb2YgJyArIHZhbCArICcgZXhjZWVkcyB0aGUgY3VycmVudGx5IHNldCByYW5nZSBvZiAnICsgcmFuZ2VTdHIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWluaXRpYWwpIHtcclxuICAgICAgICAgIGNvbXB1dGVSYXRpb0Rpc3RhbmNlKHt2YWx1ZTogdmFsfSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldHRlcjogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHMucHJlY2lzaW9uICE9PSBmYWxzZSA/IE51bWJlcih2YWwudG9GaXhlZCh2YWxzLnByZWNpc2lvbikpIDogdmFsO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcHJlY2lzaW9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzdHJ1Y3R1cmU6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcclxuICAgICAgICAgIGNvbmRpdGlvbnM6IHtcclxuICAgICAgICAgICAgbm9ubmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgIGludGVnZXI6IHRydWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHNldHRlcjogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbCAhPT0gZmFsc2UpIHtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFscy5yYW5nZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoTnVtYmVyKHZhbHMucmFuZ2VbaV0udG9GaXhlZCh2YWwpKSAhPT0gdmFscy5yYW5nZVtpXSkge1xyXG4gICAgICAgICAgICAgIHByb3BFcnJvcigncmFuZ2UnLCAndGhlIGdpdmVuIHJhbmdlICcgKyBbJ3N0YXJ0JywgJ2VuZCddW2ldICsgJyBvZiBgJyArIHZhbHMucmFuZ2VbaV0gKyAnYCBleGNlZWRzIHRoZSBjdXJyZW50bHkgc2V0IHByZWNpc2lvbiBvZiAnICsgdmFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWluaXRpYWwpIHtcclxuICAgICAgICAgIGNvbXB1dGVSYXRpb0Rpc3RhbmNlKHtwcmVjaXNpb246IHZhbH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0ZXA6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxyXG4gICAgICAgICAgY29uZGl0aW9uczoge1xyXG4gICAgICAgICAgICBub25uZWdhdGl2ZTogdHJ1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0eXBlOiAnZmFsc2UnIH1cclxuICAgICAgXSxcclxuICAgICAgc2V0dGVyOiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICBpZiAodmFscy5wcmVjaXNpb24gIT09IGZhbHNlICYmIHZhbCAhPT0gZmFsc2UgJiYgTnVtYmVyKHZhbC50b0ZpeGVkKHZhbHMucHJlY2lzaW9uKSkgIT09IHZhbCkge1xyXG4gICAgICAgICAgcHJvcEVycm9yKCdzdGVwJywgJ3RoZSBnaXZlbiB2YWx1ZSBvZiAnICsgdmFsICsgJyBleGNlZWRzIHRoZSBjdXJyZW50bHkgc2V0IHByZWNpc2lvbiBvZiAnICsgdmFscy5wcmVjaXNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWluaXRpYWwpIHtcclxuICAgICAgICAgIGNvbXB1dGVSYXRpb0Rpc3RhbmNlKHtzdGVwOiB2YWx9KVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0cnVjdHVyZToge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICBjb25kaXRpb25zOiB7XHJcbiAgICAgICAgICAgIGZpbGxlZDogdHJ1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0eXBlOiAnZmFsc2UnIH1cclxuICAgICAgXSxcclxuICAgICAgaW5pdGlhbDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIG5vZGU6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHN0YXRpYzogdHJ1ZVxyXG4gICAgfSxcclxuICAgIG9yaWVudGF0aW9uOiB7XHJcbiAgICAgIGRlZmF1bHQ6ICdob3Jpem9udGFsJyxcclxuICAgICAgc3RydWN0dXJlOiBbe1xyXG4gICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgIGNvbmRpdGlvbnM6IHtcclxuICAgICAgICAgIGtleXdvcmRzOiBbXHJcbiAgICAgICAgICAgICdob3Jpem9udGFsJyxcclxuICAgICAgICAgICAgJ3ZlcnRpY2FsJ1xyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfV1cclxuICAgIH0sXHJcbiAgICBjbGFzc0xpc3Q6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxyXG4gICAgICAgICAgc3RydWN0dXJlOiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxyXG4gICAgICAgICAgICBzdHJ1Y3R1cmU6IFtcclxuICAgICAgICAgICAgICB7IHR5cGU6ICdzdHJpbmcnIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XHJcbiAgICAgIF0sXHJcbiAgICAgIGluaXRpYWw6IHRydWUsXHJcbiAgICAgIHNoYXBlOiAne25vZGVOYW1lOiBbLi4uY2xhc3Nlc119J1xyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ29iamVjdCcsXHJcbiAgICAgICAgICBzdHJ1Y3R1cmU6IFt7XHJcbiAgICAgICAgICAgIHR5cGU6ICdhcnJheScsXHJcbiAgICAgICAgICAgIHN0cnVjdHVyZTogW3tcclxuICAgICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICB9XVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0eXBlOiAnZmFsc2UnIH1cclxuICAgICAgXSxcclxuICAgICAgaW5pdGlhbDogdHJ1ZSxcclxuICAgICAgc2V0dGVyOiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICBjb25zdCBlcnJUeXBlcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGZvciAodmFyIGV2ZW50VHlwZSBpbiB2YWwpIHtcclxuICAgICAgICAgIGlmICghY2hlY2tFdmVudFR5cGUoZXZlbnRUeXBlKSkgZXJyVHlwZXMucHVzaChldmVudFR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZXJyVHlwZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3QgbXNnID1cclxuICAgICAgICAgICAgJ3RoZSBnaXZlbiBvYmplY3QgY29udGFpbnMgaXRlbXMgd2hpY2ggYXJlIG5vIHZhbGlkIGV2ZW50IHR5cGVzOicgKyBlbmxpc3RBcnJheShlcnJUeXBlcykgK1xyXG4gICAgICAgICAgICAnQXZhaWxhYmxlIGV2ZW50IHR5cGVzIGFyZTonICsgZW5saXN0QXJyYXkoZXZlbnRUeXBlcyk7XHJcbiAgICAgICAgICBwcm9wRXJyb3IoJ2V2ZW50cycsIG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgaW5pdGlhbCA9IHRydWU7XHJcbiAgLy9Jbml0aWFsaXppbmcgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xyXG4gIChmdW5jdGlvbigpIHtcclxuICAgIGZvciAodmFyIF8gaW4gcHJvcGVydGllcykge1xyXG4gICAgICBjb25zdCBpdGVtID0gXztcclxuICAgICAgY29uc3QgcHJvcCA9IHByb3BlcnRpZXNbaXRlbV07XHJcblxyXG4gICAgICAvKlxyXG4gICAgICAgIENhbGxpbmcgT2JqZWN0LmRlZmluZVByb3BlcnR5IG9uIHRoZSBjbGFzcyBpbnN0YW5jZSAoYHRoaXNgKSBpcyBuZWNlc3NhcnkgdG8gYmUgYWJsZSB0byBjcmVhdGUgbXVsdGlwbGUgaW5zdGFuY2VzXHJcbiAgICAgICAgYXMgQ2xhc3MucHJvdG90eXBlIGFzIHRhcmdldCB3aWxsIGluaGVyaXQgdGhlIGRlZmluZWQgcHJvcGVydHkgdG8gYWxsIGluc3RhbmNlc1xyXG4gICAgICAgIGFuZCBhIG5ldyBjYWxsIG9mIGRlZmluZVByb3BlcnR5ICh3aGVuIGNyZWF0aW5nIGEgbmV3IGluc3RhbmNlKSB3b3VsZCB0aHJvdyBhbiBlcnJvciBmb3IgZGVmaW5pbmcgdGhlIHNhbWUgcHJvcGVydHkgdHdpY2VcclxuICAgICAgKi9cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoYXQsIGl0ZW0sIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgICAgaWYgKCFwcm9wLnN0YXRpYykge1xyXG4gICAgICAgICAgICBpZiAoIXByb3AuaW5pdGlhbCB8fCBpbml0aWFsKSB7XHJcbiAgICAgICAgICAgICAgY2hlY2tQcm9wKGl0ZW0sIHZhbCk7XHJcbiAgICAgICAgICAgICAgbGV0IHNldHRlclJlc3VsdDtcclxuICAgICAgICAgICAgICBpZiAocHJvcC5zZXR0ZXIpIHtcclxuICAgICAgICAgICAgICAgIHNldHRlclJlc3VsdCA9IChwcm9wLnNldHRlcikodmFsKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHNldHRlclJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YWxzW2l0ZW1dID0gdmFsO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGVycm9yKCdwcm9wZXJ0eSDigJgnICsgaXRlbSArICfigJkgbWF5IG9ubHkgYmUgc2V0IGF0IGluaXQgdGltZSBidXQgaXQgd2FzIGp1c3Qgc2V0IHdpdGggdGhlIHZhbHVlIOKAmCcgKyB2YWwgKyAn4oCZJyk7XHJcbiAgICAgICAgICB9IGVsc2UgZXJyb3IoJ3Byb3BlcnR5IOKAmCcgKyBpdGVtICsgJ+KAmSBtYXkgb25seSBiZSByZWFkIGZyb20gYnV0IGl0IHdhcyBqdXN0IHNldCB3aXRoIHRoZSB2YWx1ZSDigJgnICsgdmFsICsgJ+KAmScpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGNvbnN0IHZhbCA9IHByb3AuZ2V0dGVyID8gcHJvcC5nZXR0ZXIodmFsc1tpdGVtXSkgOiB2YWxzW2l0ZW1dO1xyXG4gICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZGVmaW5lRGVlcFByb3BlcnR5KHZhbHMsIGl0ZW0sIHZhbHMuJCk7XHJcblxyXG4gICAgICBpZiAoaXRlbSBpbiBjb25maWcpIHtcclxuICAgICAgICB0aGF0W2l0ZW1dID0gY29uZmlnW2l0ZW1dO1xyXG4gICAgICAgIGRlbGV0ZSBjb25maWdbaXRlbV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGVmID0gcHJvcC5kZWZhdWx0O1xyXG4gICAgICAgIHZhbHNbaXRlbV0gPSB0eXBlb2YgZGVmID09ICdmdW5jdGlvbicgPyBkZWYoKSA6IGRlZjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIF8gaW4gY29uZmlnKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBfO1xyXG5cclxuICAgICAgaWYgKGl0ZW1bMF0gPT0gJ18nKSB7XHJcbiAgICAgICAgZGVmaW5lRGVlcFByb3BlcnR5KHRoYXQsIGl0ZW0sIHZhbHMpO1xyXG4gICAgICAgIHZhbHNbaXRlbV0gPSBjb25maWdbaXRlbV07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXJyb3IoJ+KAmCcgKyBpdGVtICsgJ+KAmSBpcyBub3QgYSB2YWxpZCBwcm9wZXJ0eSBuYW1lLiBDaGVjayBpdHMgc3BlbGxpbmcgb3IgcHJlZml4IGl0IHdpdGggYW4gdW5kZXJzY29yZSB0byB1c2UgaXQgYXMgY3VzdG9tIHByb3BlcnR5ICjigJhfJyArIGl0ZW0gKyAn4oCZKScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgXyBpbiBtZXRob2RzKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBfO1xyXG4gICAgICBjb25zdCBtZXRob2QgPSBtZXRob2RzW2l0ZW1dO1xyXG4gICAgICBTbGlkZXI4OS5wcm90b3R5cGVbaXRlbV0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBtZXRob2QuYXJncy5sZW5ndGgpO1xyXG4gICAgICAgIGNoZWNrTWV0aG9kKGl0ZW0sIGFyZ3MpO1xyXG4gICAgICAgIHJldHVybiBtZXRob2QuZnVuY3Rpb24uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KSgpO1xyXG5cclxuICAvL0J1aWxkaW5nIHRoZSBzbGlkZXIgZWxlbWVudFxyXG4gIChmdW5jdGlvbigpIHtcclxuICAgIGlmICh2YWxzLnN0cnVjdHVyZSA9PSBmYWxzZSkge1xyXG4gICAgICAvL0luIGNhc2Ugbm8gY3VzdG9tIHN0cnVjdHVyZSBpcyBkZWZpbmVkLCBtYW51YWxseSBidWlsZCB0aGUgbm9kZSB0byBlbnN1cmUgYmVzdCBwZXJmb3JtYW5jZSAocGFyc2VTdHJ1Y3R1cmUgdGFrZXMgYSB3aGlsZSlcclxuICAgICAgdmFscy5ub2RlLnNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB2YWxzLm5vZGUudHJhY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdmFscy5ub2RlLnRodW1iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICB2YWxzLm5vZGUudHJhY2suYXBwZW5kQ2hpbGQodmFscy5ub2RlLnRodW1iKTtcclxuICAgICAgdmFscy5ub2RlLnNsaWRlci5hcHBlbmRDaGlsZCh2YWxzLm5vZGUudHJhY2spO1xyXG5cclxuICAgICAgZm9yICh2YXIgZWxlbWVudCBpbiB2YWxzLm5vZGUpXHJcbiAgICAgICAgaWYgKGVsZW1lbnQgIT0gJ3NsaWRlcicpIHZhbHMubm9kZVtlbGVtZW50XS5jbGFzc0xpc3QuYWRkKCdzbDg5LScgKyBlbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHMubm9kZSA9IHBhcnNlU3RydWN0dXJlKHZhbHMuc3RydWN0dXJlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG5vZGUgPSB2YWxzLm5vZGU7XHJcblxyXG4gICAgaWYgKHJlcGxhY2UpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0QXR0ciA9IHRhcmdldC5hdHRyaWJ1dGVzO1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldEF0dHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBub2RlLnNsaWRlci5zZXRBdHRyaWJ1dGUodGFyZ2V0QXR0cltpXS5uYW1lLCB0YXJnZXRBdHRyW2ldLnZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgbm9kZS5zbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyODknKTtcclxuICAgIGlmICh2YWxzLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcpIG5vZGUuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3ZlcnRpY2FsJyk7XHJcblxyXG4gICAgaWYgKHZhbHMuY2xhc3NMaXN0KSB7XHJcbiAgICAgIC8vIEFkZGluZyB0aGUgc3BlY2lmaWVkIGNsYXNzZXMgYW5kIGNvbGxlY3RpbmcgYWxsIG5vbmV4aXN0ZW50IG5vZGVzIGluIGBlcnJOb2Rlc2BcclxuICAgICAgY29uc3QgZXJyTm9kZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHMuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHZhbHMuY2xhc3NMaXN0W2tleV07XHJcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobm9kZSwga2V5KSkge1xyXG4gICAgICAgICAgZXJyTm9kZXMucHVzaChrZXkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXJyTm9kZXMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBub2RlW2tleV0uY2xhc3NMaXN0LmFkZChpdGVtW2ldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVyck5vZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBtc2cgPVxyXG4gICAgICAgICAgXCJ0aGUgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5zIGl0ZW1zIHdoaWNoIGFyZW4ndCBub2RlcyBvZiB0aGlzIHNsaWRlcjpcIiArIGVubGlzdEFycmF5KGVyck5vZGVzKSArXHJcbiAgICAgICAgICBcIkZvbGxvd2luZyBub2RlcyBhcmUgcGFydCBvZiB0aGlzIHNsaWRlcidzIG5vZGUgcG9vbDpcIiArIGVubGlzdEFycmF5KE9iamVjdC5rZXlzKG5vZGUpKVxyXG4gICAgICAgIHByb3BFcnJvcignY2xhc3NMaXN0JywgbXNnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVN0eWxlU2hlZXQoKTtcclxuXHJcbiAgICBpZiAocmVwbGFjZSlcclxuICAgICAgdGFyZ2V0LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5vZGUuc2xpZGVyLCB0YXJnZXQpO1xyXG4gICAgZWxzZVxyXG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQobm9kZS5zbGlkZXIpO1xyXG5cclxuICAgIHRyYWNrU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUudHJhY2spO1xyXG5cclxuICAgIGNvbXB1dGVSYXRpb0Rpc3RhbmNlKCk7XHJcblxyXG4gICAgbm9kZS50aHVtYi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hTdGFydCk7XHJcbiAgICBub2RlLnRodW1iLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHNsaWRlU3RhcnQpO1xyXG4gIH0pKCk7XHJcblxyXG4gIGluaXRpYWwgPSBmYWxzZTtcclxuXHJcblxyXG4gIC8vIC0tLS0tLSBDbGFzcyBtZXRob2RzIC0tLS0tLVxyXG4gIGZ1bmN0aW9uIGFkZEV2ZW50KHR5cGUsIGZuLCBuYW1lKSB7XHJcbiAgICBpZiAoIWNoZWNrRXZlbnRUeXBlKHR5cGUpKSB7XHJcbiAgICAgIGVycm9yKCd0aGUgc3BlY2lmaWVkIHR5cGUg4oCYJyArIHR5cGUgKyAn4oCZIGlzIG5vdCBhIHZhbGlkIGV2ZW50IHR5cGUuIEF2YWlsYWJsZSB0eXBlcyBhcmU6JyArIGVubGlzdEFycmF5KGV2ZW50VHlwZXMpLCAnYWRkRXZlbnQnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFscy5ldmVudHNbdHlwZV0pKSB2YWxzLmV2ZW50c1t0eXBlXSA9IG5ldyBBcnJheSgpO1xyXG4gICAgdmFscy5ldmVudHNbdHlwZV0ucHVzaChmbik7XHJcbiAgICBjb25zdCBrZXkgPSBuYW1lIHx8IGV2ZW50SUQ7XHJcbiAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgIGZuOiBmblxyXG4gICAgfTtcclxuICAgIGlmIChuYW1lKSB7XHJcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShldmVudExpc3Rba2V5XSkpIGV2ZW50TGlzdFtrZXldID0gbmV3IEFycmF5KCk7XHJcbiAgICAgIGV2ZW50TGlzdFtrZXldLnB1c2gob2JqKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGV2ZW50TGlzdFtrZXldID0gb2JqO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5hbWUgfHwgZXZlbnRJRCsrO1xyXG4gIH1cclxuICBmdW5jdGlvbiByZW1vdmVFdmVudChrZXkpIHtcclxuICAgIGNvbnN0IGxpc3RFbnRyeSA9IGV2ZW50TGlzdFtrZXldO1xyXG4gICAgaWYgKCFsaXN0RW50cnkpIHJldHVybiBmYWxzZTtcclxuICAgIGRlbGV0ZSBldmVudExpc3Rba2V5XTtcclxuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGxpc3RFbnRyeSkgP1xyXG4gICAgICBsaXN0RW50cnkucmVkdWNlKGhhbmRsZUV2ZW50cywgbmV3IEFycmF5KCkpIDpcclxuICAgICAgaGFuZGxlRXZlbnRzKG5ldyBBcnJheSgpLCBsaXN0RW50cnkpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUV2ZW50cyhhY2MsIGVudHJ5KSB7XHJcbiAgICAgIGNvbnN0IHR5cGVFdmVudHMgPSB2YWxzLmV2ZW50c1tlbnRyeS50eXBlXTtcclxuICAgICAgY29uc3QgZGVsZXRlZCA9IHR5cGVFdmVudHMuc3BsaWNlKHR5cGVFdmVudHMuaW5kZXhPZihlbnRyeS5mbiksIDEpWzBdO1xyXG4gICAgICBpZiAodHlwZUV2ZW50cy5sZW5ndGggPT09IDApIGRlbGV0ZSB2YWxzLmV2ZW50c1tlbnRyeS50eXBlXTtcclxuICAgICAgYWNjLnB1c2goZGVsZXRlZCk7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0gSGVscGVyIGZ1bmN0aW9ucyAtLS0tLS1cclxuICBmdW5jdGlvbiBlcnJvcihtc2csIHRhcmdldCwgYWJvcnQpIHtcclxuICAgIC8vVE9ETzogcmVmZXIgdG8gZG9jc1xyXG4gICAgbXNnID0gJ1NsaWRlcjg5JyArICh0YXJnZXQgPyAnIEAgJyArIHRhcmdldCA6ICcnKSArICc6ICcgKyBtc2c7XHJcbiAgICBpZiAobXNnW21zZy5sZW5ndGggLSAxXSAhPSAnXFxuJyAmJiBtc2dbbXNnLmxlbmd0aCAtIDFdICE9ICcuJykgbXNnICs9ICcuXFxuJztcclxuICAgIGlmIChpbml0aWFsIHx8IGFib3J0KSBtc2cgKz0gJ0Fib3J0aW5nIHRoZSBzbGlkZXIgY29uc3RydWN0aW9uLic7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gdHlwZU1zZyh2YXJpYWJsZSwgbm9JbnRybykge1xyXG4gICAgbGV0IG1zZyA9IG5vSW50cm8gPyAnJyA6ICdidXQgaXQgaXMgJztcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhcmlhYmxlKSlcclxuICAgICAgbXNnICs9ICdhbiBhcnJheSc7XHJcbiAgICBlbHNlIGlmIChwb2x5SXNOYU4odmFyaWFibGUpKVxyXG4gICAgICBtc2cgKz0gJ05hTic7XHJcbiAgICBlbHNlIGlmICh2YXJpYWJsZSA9PT0gbnVsbClcclxuICAgICAgbXNnICs9ICdudWxsJztcclxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YXJpYWJsZSA9PSAnYm9vbGVhbicpXHJcbiAgICAgIG1zZyArPSB2YXJpYWJsZTtcclxuICAgIGVsc2VcclxuICAgICAgbXNnICs9ICdvZiB0eXBlICcgKyB0eXBlb2YgdmFyaWFibGU7XHJcblxyXG4gICAgcmV0dXJuIG1zZztcclxuICB9XHJcbiAgZnVuY3Rpb24gZW5saXN0QXJyYXkoYXJyKSB7XHJcbiAgICByZXR1cm4gJ1xcbiAtIFwiJyArIGFyci5qb2luKCdcIlxcbiAtIFwiJykgKyAnXCJcXG4nO1xyXG4gIH1cclxuICBmdW5jdGlvbiBjaGVja0V2ZW50VHlwZSh0eXBlKSB7XHJcbiAgICBpZiAodHlwZS5pbmRleE9mKCdjaGFuZ2U6JykgPT0gMCkge1xyXG4gICAgICAvL0VkZ2UgY2FzZSBmb3IgJ2NoYW5nZTokcHJvcGVydHknXHJcbiAgICAgIGNvbnN0IGN1c3RvbVByb3AgPSB0eXBlLnNsaWNlKCdjaGFuZ2U6Jy5sZW5ndGgpO1xyXG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWxzLCBjdXN0b21Qcm9wKSkge1xyXG4gICAgICAgIGVycm9yKFwi4oCYXCIgKyB0eXBlICsgXCLigJkgcmVmZXJzIHRvIOKAmFwiICsgY3VzdG9tUHJvcCArIFwi4oCZLCB3aGljaCBpc24ndCBhIHJlY29nbml6ZWQgcHJvcGVydHkuIENoZWNrIGl0cyBzcGVsbGluZyBhbmQgYmUgYXdhcmUgdGhhdCBjdXN0b20gcHJvcGVydGllcyBuZWVkIHRvIGJlIGluaXRpYWxpemVkXCIsICdhZGRFdmVudCcpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGV2ZW50VHlwZXMuaW5kZXhPZih0eXBlKSA9PSAtMSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvL01ETiBQb2x5ZmlsbCBAIE51bWJlci5pc05hTlxyXG4gIGZ1bmN0aW9uIHBvbHlJc05hTih2YWwpIHtcclxuICAgIHJldHVybiBOdW1iZXIuaXNOYU4gJiYgTnVtYmVyLmlzTmFOKHZhbCkgfHwgIU51bWJlci5pc05hTiAmJiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyAmJiB2YWwgIT09IHZhbDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRlZmluZURlZXBQcm9wZXJ0eSh0YXJnZXQsIGl0ZW0sIGVuZHBvaW50KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBpdGVtLCB7XHJcbiAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgZW5kcG9pbnRbaXRlbV0gPSB2YWw7XHJcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJ1Y3R1cmVWYXJzLCBpdGVtKSkge1xyXG4gICAgICAgICAgdXBkYXRlVmFyaWFibGUoaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW5pdGlhbCkgaW52b2tlRXZlbnQoWydjaGFuZ2U6JyArIGl0ZW1dKTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gZW5kcG9pbnRbaXRlbV07XHJcbiAgICAgIH0sXHJcbiAgICAgIGVudW1lcmFibGU6IHRydWVcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZhcmlhYmxlKHByb3ApIHtcclxuICAgICAgZm9yICh2YXIgaSBpbiBzdHJ1Y3R1cmVWYXJzW3Byb3BdKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHN0cnVjdHVyZVZhcnNbcHJvcF1baV07XHJcbiAgICAgICAgY29uc3Qgc3RyID0gaXRlbS5zdHIucmVwbGFjZShzdHJ1Y3R1cmVSZ3gudmFyaWFibGUsIGZ1bmN0aW9uKG1hdGNoLCB2YXJpYWJsZURlbGltaXQsIHZhcmlhYmxlKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhhdFt2YXJpYWJsZURlbGltaXQgfHwgdmFyaWFibGVdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpdGVtLmF0dHIpIHtcclxuICAgICAgICAgIGl0ZW0ubm9kZS5zZXRBdHRyaWJ1dGUoaXRlbS5hdHRyLCBzdHIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpdGVtLm5vZGUudGV4dENvbnRlbnQgPSBzdHI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0gVGh1bWIgbW92aW5nIGZ1bmN0aW9ucyAtLS0tLS1cclxuICBmdW5jdGlvbiBnZXRUcmFja1BhZGRpbmcoZGlyZWN0aW9uKSB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh0cmFja1N0eWxlWydwYWRkaW5nJyArIGRpcmVjdGlvbl0pO1xyXG4gIH1cclxuICBmdW5jdGlvbiBnZXREaXN0YW5jZSgpIHtcclxuICAgIGNvbnN0IHN0eWxlID0gdmFscy5ub2RlLnRodW1iLnN0eWxlLnRyYW5zZm9ybTtcclxuICAgIGNvbnN0IHRyYW5zbGF0ZVN0ciA9IHZhbHMub3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJyA/ICd0cmFuc2xhdGVZKCcgOiAndHJhbnNsYXRlWCgnO1xyXG4gICAgY29uc3QgZmlyc3RCcmFja2V0ID0gc3R5bGUuc2xpY2Uoc3R5bGUuaW5kZXhPZih0cmFuc2xhdGVTdHIpICsgdHJhbnNsYXRlU3RyLmxlbmd0aCk7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdChmaXJzdEJyYWNrZXQuc2xpY2UoMCwgZmlyc3RCcmFja2V0LmluZGV4T2YoJyknKSkpO1xyXG4gIH1cclxuICBmdW5jdGlvbiBnZXRBYnNvbHV0ZVRyYWNrU2l6ZSgpIHtcclxuICAgIGlmICh2YWxzLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgcmV0dXJuICh2YWxzLm5vZGUudHJhY2suY2xpZW50SGVpZ2h0IC0gZ2V0VHJhY2tQYWRkaW5nKCdUb3AnKSAtIGdldFRyYWNrUGFkZGluZygnQm90dG9tJykpIC0gdmFscy5ub2RlLnRodW1iLmNsaWVudEhlaWdodDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAodmFscy5ub2RlLnRyYWNrLmNsaWVudFdpZHRoIC0gZ2V0VHJhY2tQYWRkaW5nKCdMZWZ0JykgLSBnZXRUcmFja1BhZGRpbmcoJ1JpZ2h0JykpIC0gdmFscy5ub2RlLnRodW1iLmNsaWVudFdpZHRoO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBjb21wdXRlRGlzdGFuY2VWYWx1ZShkaXN0YW5jZSwgYWJzU2l6ZSkge1xyXG4gICAgaWYgKGFic1NpemUgPT0gbnVsbCkgYWJzU2l6ZSA9IGdldEFic29sdXRlVHJhY2tTaXplKCk7XHJcbiAgICByZXR1cm4gZGlzdGFuY2UgLyBhYnNTaXplICogKHZhbHMucmFuZ2VbMV0gLSB2YWxzLnJhbmdlWzBdKSArIHZhbHMucmFuZ2VbMF07XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIG1vdmVUaHVtYihkaXN0YW5jZSwgdXNlVHJhbnNmb3JtKSB7XHJcbiAgICBpZiAodXNlVHJhbnNmb3JtKSB7XHJcbiAgICAgIHZhbHMubm9kZS50aHVtYi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlJyArICh2YWxzLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcgPyAnWScgOiAnWCcpICsgJygnICsgZGlzdGFuY2UgKyAncHgpJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh2YWxzLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgICB2YXIgcGFkZGluZ1N0YXJ0ID0gZ2V0VHJhY2tQYWRkaW5nKCdUb3AnKTtcclxuICAgICAgICB2YXIgcGFkZGluZ0VuZCA9IGdldFRyYWNrUGFkZGluZygnQm90dG9tJyk7XHJcbiAgICAgICAgdmFyIHRodW1iRGltID0gdmFscy5ub2RlLnRodW1iLmNsaWVudEhlaWdodDtcclxuICAgICAgICB2YXIgcG9zQW5jaG9yID0gJ3RvcCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHBhZGRpbmdTdGFydCA9IGdldFRyYWNrUGFkZGluZygnTGVmdCcpO1xyXG4gICAgICAgIHZhciBwYWRkaW5nRW5kID0gZ2V0VHJhY2tQYWRkaW5nKCdSaWdodCcpO1xyXG4gICAgICAgIHZhciB0aHVtYkRpbSA9IHZhbHMubm9kZS50aHVtYi5jbGllbnRXaWR0aDtcclxuICAgICAgICB2YXIgcG9zQW5jaG9yID0gJ2xlZnQnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgc3VidHJhY3QgPSAodGh1bWJEaW0gKiBkaXN0YW5jZSkgKyAncHgnO1xyXG4gICAgICBpZiAocGFkZGluZ0VuZCkgc3VidHJhY3QgKz0gJyAtICcgKyAocGFkZGluZ0VuZCAqIGRpc3RhbmNlKSArICdweCc7XHJcbiAgICAgIGlmIChwYWRkaW5nU3RhcnQpIHN1YnRyYWN0ICs9ICcgKyAnICsgKHBhZGRpbmdTdGFydCAqICgxIC0gZGlzdGFuY2UpKSArICdweCc7XHJcbiAgICAgIHZhbHMubm9kZS50aHVtYi5zdHlsZVtwb3NBbmNob3JdID0gJ2NhbGMoJyArIChkaXN0YW5jZSAqIDEwMCkgKyAnJSAtICcgKyBzdWJ0cmFjdCArICcpJztcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gY29tcHV0ZVJhdGlvRGlzdGFuY2UobmV3VmFscykge1xyXG4gICAgbGV0IHZhbHVlLCByYXRpbztcclxuICAgIGlmICghbmV3VmFscykge1xyXG4gICAgICBuZXdWYWxzID0gdmFscztcclxuICAgICAgdmFsdWUgPSB2YWxzLnZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcHJvcHMgPSBbJ3JhbmdlJywgJ3N0ZXAnXTtcclxuICAgICAgZm9yICh2YXIgaSBpbiBwcm9wcykge1xyXG4gICAgICAgIGlmIChuZXdWYWxzW3Byb3BzW2ldXSA9PSBudWxsKSBuZXdWYWxzW3Byb3BzW2ldXSA9IHZhbHNbcHJvcHNbaV1dO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXdWYWxzLnZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICB2YWx1ZSA9IG5ld1ZhbHMudmFsdWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmF0aW8gPSAodmFscy52YWx1ZSAtIHZhbHMucmFuZ2VbMF0pIC8gKHZhbHMucmFuZ2VbMV0gLSB2YWxzLnJhbmdlWzBdKTtcclxuICAgICAgICB2YWx1ZSA9IChuZXdWYWxzLnJhbmdlWzFdIC0gbmV3VmFscy5yYW5nZVswXSkgKiByYXRpbyArIG5ld1ZhbHMucmFuZ2VbMF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vUm91bmQgdmFsdWUgdG8gYSBnaXZlbiBzdGVwXHJcbiAgICBpZiAobmV3VmFscy5zdGVwICE9PSBmYWxzZSkge1xyXG4gICAgICBpZiAobmV3VmFscy5yYW5nZVsxXSAtIG5ld1ZhbHMucmFuZ2VbMF0gPCBuZXdWYWxzLnN0ZXApIHtcclxuICAgICAgICB2YWx1ZSA9IG5ld1ZhbHMucmFuZ2VbMF07XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsdWUgPSBuZXdWYWxzLnJhbmdlWzBdICsgTWF0aC5yb3VuZCgodmFsdWUgLSBuZXdWYWxzLnJhbmdlWzBdKSAvIG5ld1ZhbHMuc3RlcCkgKiBuZXdWYWxzLnN0ZXA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IG5ld1JhdGlvID0gKHZhbHVlIC0gbmV3VmFscy5yYW5nZVswXSkgLyAobmV3VmFscy5yYW5nZVsxXSAtIG5ld1ZhbHMucmFuZ2VbMF0pO1xyXG4gICAgaWYgKHZhbHVlICE9PSB2YWxzLnZhbHVlKSB2YWxzLnZhbHVlID0gdmFsdWU7XHJcbiAgICBpZiAobmV3UmF0aW8gIT09IHJhdGlvKSBtb3ZlVGh1bWIobmV3UmF0aW8pO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tIEV2ZW50IGZ1bmN0aW9ucyAtLS0tLS1cclxuICBmdW5jdGlvbiBpbnZva2VFdmVudCh0eXBlcykge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBmdW5jdGlvbnMgPSB2YWxzLmV2ZW50c1t0eXBlc1tpXV07XHJcbiAgICAgIGlmIChmdW5jdGlvbnMpIHtcclxuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGZ1bmN0aW9ucy5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgZnVuY3Rpb25zW25dLmNhbGwodGhhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIC0+IEV2ZW50IGxpc3RlbmVyc1xyXG4gIGZ1bmN0aW9uIHRvdWNoU3RhcnQoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKGFjdGl2ZVRvdWNoSUQgPT0gbnVsbCkge1xyXG4gICAgICBhY3RpdmVUb3VjaElEID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5pZGVudGlmaWVyO1xyXG4gICAgICBzbGlkZVN0YXJ0LmNhbGwodGhpcywgZS5jaGFuZ2VkVG91Y2hlc1swXSwgdHJ1ZSk7XHJcblxyXG4gICAgICB2YWxzLm5vZGUudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hNb3ZlKTtcclxuICAgICAgdmFscy5ub2RlLnRodW1iLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hFbmQpO1xyXG4gICAgICB2YWxzLm5vZGUudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0b3VjaEVuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHRvdWNoTW92ZShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gYWN0aXZlVG91Y2hJRCkge1xyXG4gICAgICAgIHNsaWRlTW92ZS5jYWxsKHRoaXMsIGUuY2hhbmdlZFRvdWNoZXNbaV0sIHRydWUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHRvdWNoRW5kKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoZS5jaGFuZ2VkVG91Y2hlc1tpXS5pZGVudGlmaWVyID09PSBhY3RpdmVUb3VjaElEKSB7XHJcbiAgICAgICAgdmFscy5ub2RlLnRodW1iLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoTW92ZSk7XHJcbiAgICAgICAgdmFscy5ub2RlLnRodW1iLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hFbmQpO1xyXG4gICAgICAgIHZhbHMubm9kZS50aHVtYi5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRvdWNoRW5kKTtcclxuXHJcbiAgICAgICAgc2xpZGVFbmQuY2FsbCh0aGlzLCBlLmNoYW5nZWRUb3VjaGVzW2ldLCB0cnVlKTtcclxuICAgICAgICBhY3RpdmVUb3VjaElEID0gbnVsbDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBzbGlkZVN0YXJ0KGUsIGlzVG91Y2gpIHtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnc2w4OS1ub3NlbGVjdCcpO1xyXG4gICAgdmFscy5ub2RlLnRodW1iLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgaW52b2tlRXZlbnQoWydzdGFydCddKTtcclxuXHJcbiAgICBhY3RpdmVUaHVtYiA9IHRoaXM7XHJcbiAgICBpZiAodmFscy5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnKSB7XHJcbiAgICAgIHZhciBzdGFydERpciA9ICdUb3AnO1xyXG4gICAgICB2YXIgcG9zQW5jaG9yID0gJ3RvcCc7XHJcbiAgICAgIHZhciBjbGllbnREaW0gPSBlLmNsaWVudFk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgc3RhcnREaXIgPSAnTGVmdCc7XHJcbiAgICAgIHZhciBwb3NBbmNob3IgPSAnbGVmdCc7XHJcbiAgICAgIHZhciBjbGllbnREaW0gPSBlLmNsaWVudFg7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0aHVtYk9mZnNldCA9IGFjdGl2ZVRodW1iWydvZmZzZXQnICsgc3RhcnREaXJdIC0gZ2V0VHJhY2tQYWRkaW5nKHN0YXJ0RGlyKTtcclxuICAgIG1vdXNlRG93blBvcyA9IGNsaWVudERpbSAtIHRodW1iT2Zmc2V0O1xyXG4gICAgbW92ZVRodW1iKHRodW1iT2Zmc2V0LCB0cnVlKTtcclxuICAgIGFjdGl2ZVRodW1iLnN0eWxlLnJlbW92ZVByb3BlcnR5KHBvc0FuY2hvcik7XHJcblxyXG4gICAgaWYgKCFpc1RvdWNoKSB7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc2xpZGVFbmQpO1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc2xpZGVNb3ZlKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gc2xpZGVNb3ZlKGUpIHtcclxuICAgIGNvbnN0IGFic1NpemUgPSBnZXRBYnNvbHV0ZVRyYWNrU2l6ZSgpO1xyXG4gICAgbGV0IGRpc3RhbmNlID0gKHZhbHMub3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJyA/IGUuY2xpZW50WSA6IGUuY2xpZW50WCkgLSBtb3VzZURvd25Qb3M7XHJcblxyXG4gICAgaWYgKGRpc3RhbmNlID4gYWJzU2l6ZSkgZGlzdGFuY2UgPSBhYnNTaXplO1xyXG4gICAgZWxzZSBpZiAoZGlzdGFuY2UgPCAwKSBkaXN0YW5jZSA9IDA7XHJcblxyXG4gICAgaWYgKHZhbHMuc3RlcCkge1xyXG4gICAgICBjb25zdCByZWxTdGVwID0gYWJzU2l6ZSAvICgodmFscy5yYW5nZVsxXSAtIHZhbHMucmFuZ2VbMF0pIC8gdmFscy5zdGVwKTtcclxuICAgICAgZGlzdGFuY2UgPSBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gcmVsU3RlcCkgKiByZWxTdGVwO1xyXG4gICAgICBpZiAoZGlzdGFuY2UgPiBhYnNTaXplKSByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB2YWx1ZSA9IGNvbXB1dGVEaXN0YW5jZVZhbHVlKGRpc3RhbmNlLCBhYnNTaXplKTtcclxuXHJcbiAgICBpZiAodmFscy52YWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgdmFscy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICBtb3ZlVGh1bWIoZGlzdGFuY2UsIHRydWUpO1xyXG4gICAgICBpbnZva2VFdmVudChbJ21vdmUnXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNsaWRlRW5kKGUsIGlzVG91Y2gpIHtcclxuICAgIGlmICghaXNUb3VjaCkge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHNsaWRlRW5kKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHNsaWRlTW92ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdmFsdWUgPSBjb21wdXRlRGlzdGFuY2VWYWx1ZShnZXREaXN0YW5jZSgpKTtcclxuICAgIGNvbXB1dGVSYXRpb0Rpc3RhbmNlKHt2YWx1ZTogdmFsdWV9KTtcclxuICAgIGFjdGl2ZVRodW1iLnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2Zvcm0nKTtcclxuICAgIG1vdXNlRG93blBvcyA9IG51bGw7XHJcbiAgICBhY3RpdmVUaHVtYiA9IG51bGw7XHJcblxyXG4gICAgaW52b2tlRXZlbnQoWydlbmQnXSk7XHJcbiAgICB2YWxzLm5vZGUudGh1bWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3NsODktbm9zZWxlY3QnKTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLSBTY29wZS1zcGVjaWZpYyBmdW5jdGlvbnMgLS0tLS0tXHJcbiAgLy8gLT4gRWxlbWVudCBidWlsZGluZ1xyXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0eWxlU2hlZXQoKSB7XHJcbiAgICBjb25zdCBzaGVldCA9IChmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgZmlyc3RIZWFkQ2hpbGQgPSBkb2N1bWVudC5oZWFkLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICBpZiAoZmlyc3RIZWFkQ2hpbGQpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuaGVhZC5pbnNlcnRCZWZvcmUoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSwgZmlyc3RIZWFkQ2hpbGQpLnNoZWV0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJykpLnNoZWV0O1xyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgc2hlZXQuaW5zZXJ0UnVsZShzdHlsZXNbaV0sIDApO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBwYXJzZVN0cnVjdHVyZShzdHJ1Y3R1cmVTdHIpIHtcclxuICAgIGNvbnN0IG5vZGUgPSB7XHJcbiAgICAgIHNsaWRlcjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgYXR0cmlicyA9IHt9O1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCBkZWZOb2RlcyA9IFtcclxuICAgICAgICAndHJhY2snLFxyXG4gICAgICAgICd0aHVtYidcclxuICAgICAgXTtcclxuICAgICAgZGVmTm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgICAgYXR0cmlic1tub2RlXSA9IHtcclxuICAgICAgICAgIGNsYXNzOiAnc2w4OS0nICsgbm9kZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBjb25zdCB2YXJpYWJsZXMgPSB7fTtcclxuXHJcbiAgICBjb25zdCByZWcgPSB7XHJcbiAgICAgIGF0dHI6IHtcclxuICAgICAgICBuYW1lOiAnW1xcXFx3LV0rJ1xyXG4gICAgICB9LFxyXG4gICAgICBhbGw6ICdbXFxcXGRcXFxcRF0nLFxyXG4gICAgICB0YWJTcGFjZTogJ1sgXFxcXHRdKycsXHJcbiAgICAgIG5hbWU6ICdbXFxcXHctXSsnLFxyXG4gICAgICBzaW5nbGVBbXBsZnI6ICc6J1xyXG4gICAgfTtcclxuICAgIHJlZy5hdHRyLnZhbHVlID0gJyg/Oig/ITwpJyArIHJlZy5hbGwgKyAnKSo/JztcclxuICAgIHJlZy5jYXBOYW1lID0gJygnICsgcmVnLm5hbWUgKyAnKSc7XHJcbiAgICByZWcuZ2xiTWF0Y2ggPSAnKD86JyArIHJlZy50YWJTcGFjZSArICcoPzooPyE8KS4pKj8pPz4nO1xyXG4gICAgcmVnLmNvbnRlbnQgPSAnKD86XFxcXHMrXCIoJytyZWcuYWxsKycrPylcIik/JztcclxuICAgIHJlZy50YWcgPSAnKD86XFxcXHMrJyArIHJlZy5jYXBOYW1lICsgJyk/JztcclxuICAgIHJlZy5hdHRyaWJzID0gJyg/OlxcXFxzKycgKyByZWcuYXR0ci5uYW1lICsgJ1xcXFwoJyArIHJlZy5hdHRyLnZhbHVlICsgJ1xcXFwpKSonO1xyXG4gICAgcmVnLmJhc2UgPSByZWcuY2FwTmFtZSArIHJlZy50YWcgKyByZWcuY29udGVudCArICcoJyArIHJlZy5hdHRyaWJzICsgJylcXFxccyo/JztcclxuICAgIGNvbnN0IHJneCA9IHtcclxuICAgICAgZ2VuZXJhbDogKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHBhcnRzID0ge1xyXG4gICAgICAgICAgaW5uZXI6ICc8KFs6L10/KScgKyByZWcuY2FwTmFtZSArICcoPzonICsgcmVnLnRhYlNwYWNlICsgcmVnLm5hbWUgKyAnKT8oPzonICsgcmVnLnRhYlNwYWNlICsgJyhcIlwiKSk/JyArIHJlZy5nbGJNYXRjaCxcclxuICAgICAgICAgIG5vRW5kOiAnPCcgKyByZWcuc2luZ2xlQW1wbGZyICsgJz8nICsgcmVnLmNhcE5hbWUgKyAnLio/JyxcclxuICAgICAgICAgIG5vQmVnaW5uaW5nOiAnKD86XnwnICsgcmVnLnRhYlNwYWNlICsgJyknICsgcmVnLnNpbmdsZUFtcGxmciArICc/JyArIHJlZy5jYXBOYW1lICsgcmVnLmdsYk1hdGNoXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gcGFydHMuaW5uZXIgKyAnfCcgKyBwYXJ0cy5ub0VuZCArICd8JyArIHBhcnRzLm5vQmVnaW5uaW5nO1xyXG4gICAgICB9KSgpLFxyXG4gICAgICB2YXJpYWJsZTogJ1xcXFx7XFxcXCQoXFxcXHcrKVxcXFx9fFxcXFwkKFxcXFx3KyknLFxyXG4gICAgICBhdHRyaWJ1dGVzOiAnKCcgKyByZWcuYXR0ci5uYW1lICsgJylcXFxcKCgnICsgcmVnLmF0dHIudmFsdWUgKyAnKVxcXFwpKD86XFxcXHMrfCQpJyxcclxuICAgICAgc2luZ2xlVGFnOiAnPCcgKyByZWcuc2luZ2xlQW1wbGZyICsgcmVnLmJhc2UgKyAnPicsXHJcbiAgICAgIG11bHRpVGFnOiAnPCcgKyByZWcuYmFzZSArICc+KCg/OicrcmVnLmFsbCsnKD8hPCcgKyByZWcuY2FwTmFtZSArICcoPzpcXFxccysnICsgcmVnLm5hbWUgKyAnKT8oPzpcXFxccytcIicrcmVnLmFsbCsnKz9cIik/JyArIHJlZy5hdHRyaWJzICsgJ1xcXFxzKj8+JytyZWcuYWxsKycqPzxcXFxcL1xcXFw2XFxcXHMqPikpKj8pPFxcXFwvXFxcXDFcXFxccyo+J1xyXG4gICAgfTtcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgZm9yICh2YXIgZXhwciBpbiByZ3gpIHJneFtleHByXSA9IG5ldyBSZWdFeHAocmd4W2V4cHJdLCAnZycpO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBzdHJ1Y3R1cmVSZ3ggPSByZ3g7XHJcbiAgICBsZXQgc3RydWN0dXJlID0gc3RydWN0dXJlU3RyO1xyXG5cclxuICAgIHdoaWxlIChyZ3gubXVsdGlUYWcudGVzdChzdHJ1Y3R1cmUpKSB7XHJcbiAgICAgIHN0cnVjdHVyZSA9IHN0cnVjdHVyZS5yZXBsYWNlKHJneC5tdWx0aVRhZywgZnVuY3Rpb24obWF0Y2gsIG5hbWUsIHRhZywgaW5uZXIsIGF0dHJpYnV0ZXMsIGNvbnRlbnQpIHtcclxuICAgICAgICBjb25zdCBlbGVtID0gYXNzZW1ibGVFbGVtZW50KG5hbWUsIHRhZywgYXR0cmlidXRlcywgaW5uZXIpO1xyXG4gICAgICAgIGNvbnRlbnQgPSBwYXJzZVNpbmdsZVRhZ3MoY29udGVudCwgZWxlbSk7XHJcbiAgICAgICAgbm9kZVtuYW1lXSA9IGVsZW07XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0cnVjdHVyZSA9IHBhcnNlU2luZ2xlVGFncyhzdHJ1Y3R1cmUsIG5vZGUuc2xpZGVyKTtcclxuXHJcbiAgICBzdHJ1Y3R1cmUgPSBzdHJ1Y3R1cmUudHJpbSgpO1xyXG4gICAgaWYgKC9cXFMrL2cudGVzdChzdHJ1Y3R1cmUpKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yTGlzdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHJneC5nZW5lcmFsLnRlc3Qoc3RydWN0dXJlKSkge1xyXG4gICAgICAgICAgc3RydWN0dXJlLnJlcGxhY2Uocmd4LmdlbmVyYWwsIGZ1bmN0aW9uKG1hdGNoLCBhbXBsaWZpZXIsIG5hbWUsIGNvbnRlbnQsIG5hbWUyLCBuYW1lMykge1xyXG4gICAgICAgICAgICBsZXQgaW5mbyA9ICctIFwiJyArIChuYW1lIHx8IG5hbWUyIHx8IG5hbWUzKSArICdcIiA9PiAnO1xyXG4gICAgICAgICAgICBpZiAoYW1wbGlmaWVyID09ICcvJylcclxuICAgICAgICAgICAgICBpbmZvICs9ICdDbG9zaW5nIHRhZyBmaW5kaW5nIG5vIGJlZ2lubmluZyc7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGFtcGxpZmllciA9PT0gJycpXHJcbiAgICAgICAgICAgICAgaW5mbyArPSAnT3BlbmluZyB0YWcgZmluZGluZyBubyBlbmQgKHNob3VsZCBpdCBiZSBhIHNpbmdsZSB0YWcgbWFya2VkIHdpdGgg4oCYOuKAmT8pJztcclxuICAgICAgICAgICAgZWxzZSBpZiAoY29udGVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgIGluZm8gKz0gJ1JlZHVuZGFudCBlbXB0eSB0ZXh0IGNvbnRlbnQgKOKAmFwiXCLigJkpJztcclxuICAgICAgICAgICAgZWxzZSBpZiAobmFtZTIpXHJcbiAgICAgICAgICAgICAgaW5mbyArPSAnTWlzc2luZyBlbmRpbmcgY2hhcmFjdGVyICjigJg+4oCZKSc7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5hbWUzKVxyXG4gICAgICAgICAgICAgIGluZm8gKz0gJ01pc3NpbmcgYmVnaW5uaW5nIGNoYXJhY3RlciAo4oCYPOKAmSknO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgaW5mbyArPSAnVW5pZGVudGlmaWVkIGVycm9yLiBQbGVhc2UgY2hlY2sgdGhlIGVsZW1lbnQgZm9yIHN5bnRheCBlcnJvcnMnO1xyXG4gICAgICAgICAgICBlcnJvckxpc3QucHVzaChpbmZvKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBlcnJvckxpc3QucHVzaCgnTGVmdG92ZXIgdW5wYXJzYWJsZSBzdHJ1Y3R1cmU6XFxuLSBcIicgKyBzdHJ1Y3R1cmUgKyAnXCJcXG4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0oKSk7XHJcbiAgICAgIHByb3BFcnJvcignc3RydWN0dXJlJywgKGVycm9yTGlzdC5sZW5ndGggPiAxID8gJ3NldmVyYWwgZWxlbWVudHMgaGF2ZScgOiAnYW4gZWxlbWVudCBoYXMnKSArICcgYmVlbiBkZWNsYXJlZCB3cm9uZ2x5IGFuZCBjb3VsZCBub3QgYmUgcGFyc2VkLlxcbicgKyBlcnJvckxpc3Quam9pbignLlxcbicpKTtcclxuICAgIH1cclxuXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgbGV0IG1hdGNoO1xyXG4gICAgICB3aGlsZSAobWF0Y2ggPSByZ3guZ2VuZXJhbC5leGVjKHN0cnVjdHVyZVN0cikpIHtcclxuICAgICAgICBtYXRjaGVzLnB1c2gobWF0Y2gpO1xyXG4gICAgICB9XHJcbiAgICAgIGFwcGVuZEVsZW1lbnRzKG5vZGUuc2xpZGVyLCBtYXRjaGVzKTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy9TdGF0aWNhbGx5IHR5cGVkXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnN0IHRyYWNrID0gbm9kZS50cmFjaztcclxuICAgICAgY29uc3QgdGh1bWIgPSBub2RlLnRodW1iO1xyXG4gICAgICBpZiAoIXRyYWNrKSBub2RlLnRyYWNrID0gYXNzZW1ibGVFbGVtZW50KCd0cmFjaycsICdkaXYnKTtcclxuICAgICAgaWYgKCF0aHVtYikgbm9kZS50aHVtYiA9IGFzc2VtYmxlRWxlbWVudCgndGh1bWInLCAnZGl2Jyk7XHJcbiAgICAgIGlmICghdHJhY2sgJiYgIXRodW1iKSB7XHJcbiAgICAgICAgbm9kZS50cmFjay5hcHBlbmRDaGlsZChub2RlLnRodW1iKTtcclxuICAgICAgICBub2RlLnNsaWRlci5hcHBlbmRDaGlsZChub2RlLnRyYWNrKTtcclxuICAgICAgfSBlbHNlIGlmICghdHJhY2sgJiYgdGh1bWIpIHtcclxuICAgICAgICBub2RlLnRodW1iLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQobm9kZS50cmFjayk7XHJcbiAgICAgICAgbm9kZS50cmFjay5hcHBlbmRDaGlsZChub2RlLnRodW1iKTtcclxuICAgICAgfSBlbHNlIGlmICh0cmFjayAmJiAhdGh1bWIpIHtcclxuICAgICAgICBub2RlLnRyYWNrLmFwcGVuZENoaWxkKG5vZGUudGh1bWIpO1xyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHJldHVybiBub2RlO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGVuZEVsZW1lbnRzKHBhcmVudCwgY2hpbGRBcnIsIGkpIHtcclxuICAgICAgaWYgKGkgPT0gbnVsbCkgaSA9IDA7XHJcbiAgICAgIGZvciAoOyBpIDwgY2hpbGRBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBlbGVtID0gbm9kZVtjaGlsZEFycltpXVsyXV07XHJcbiAgICAgICAgaWYgKGNoaWxkQXJyW2ldWzFdID09PSAnJykge1xyXG4gICAgICAgICAgaSA9IGFwcGVuZEVsZW1lbnRzKGVsZW0sIGNoaWxkQXJyLCBpICsgMSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjaGlsZEFycltpXVsxXSA9PSAnLycpIHJldHVybiBpO1xyXG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlU2luZ2xlVGFncyhzdHIsIHBhcmVudCkge1xyXG4gICAgICByZXR1cm4gc3RyLnJlcGxhY2Uocmd4LnNpbmdsZVRhZywgZnVuY3Rpb24obWF0Y2gsIG5hbWUsIHRhZywgaW5uZXIsIGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBjb25zdCBlbGVtID0gYXNzZW1ibGVFbGVtZW50KG5hbWUsIHRhZywgYXR0cmlidXRlcywgaW5uZXIpO1xyXG4gICAgICAgIG5vZGVbbmFtZV0gPSBlbGVtO1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYXNzZW1ibGVFbGVtZW50KG5hbWUsIHRhZywgYXR0cmlidXRlcywgY29udGVudCkge1xyXG4gICAgICBpZiAobm9kZVtuYW1lXSkge1xyXG4gICAgICAgIHByb3BFcnJvcignc3RydWN0dXJlJywgJ0V2ZXJ5IGVsZW1lbnQgbXVzdCBoYXZlIGEgdW5pcXVlIG5hbWUgYnV0IHRoZXJlIGFyZSBtdXRpcGxlIGVsZW1lbnRzIGNhbGxlZCDigJgnICsgbmFtZSArICfigJknKTtcclxuICAgICAgfVxyXG4gICAgICBsZXQgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnIHx8ICdkaXYnKTtcclxuICAgICAgY29uc3QgaGFzQXR0cmlicyA9ICEhYXR0cmlic1tuYW1lXTtcclxuICAgICAgaWYgKGNvbnRlbnQpIHtcclxuICAgICAgICBlbGVtLnRleHRDb250ZW50ID0gcmVnaXN0ZXJWYXJpYWJsZXMoY29udGVudCwgZWxlbSwgZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgYXR0cmlidXRlcy5yZXBsYWNlKHJneC5hdHRyaWJ1dGVzLCBmdW5jdGlvbihhdHRyaWIsIGF0dHJpYk5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAvL1RhaWxvcmVkIGZvciBzcGFjZS1zZXBhcmF0ZWQgdmFsdWVzIChjaGVjayBmb3IgZHVwbGljYXRlcyBpbiB2YWx1ZSB2cy4gZGVmYXVsdCBzdHJ1Y3R1cmUgc3R5bGUpXHJcbiAgICAgICAgICBpZiAoaGFzQXR0cmlicyAmJiBhdHRyaWJzW25hbWVdW2F0dHJpYk5hbWVdICYmIHZhbHVlLnNwbGl0KCcgJykuaW5kZXhPZihhdHRyaWJzW25hbWVdW2F0dHJpYk5hbWVdKSA9PSAtMSkge1xyXG4gICAgICAgICAgICB2YWx1ZSArPSAnICcgKyBhdHRyaWJzW25hbWVdW2F0dHJpYk5hbWVdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoYXR0cmliTmFtZSwgcmVnaXN0ZXJWYXJpYWJsZXModmFsdWUsIGVsZW0sIGF0dHJpYk5hbWUpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaGFzQXR0cmlicykge1xyXG4gICAgICAgIGZvciAodmFyIGF0dHIgaW4gYXR0cmlic1tuYW1lXSkge1xyXG4gICAgICAgICAgaWYgKCFlbGVtLmdldEF0dHJpYnV0ZShhdHRyKSkgZWxlbS5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlic1tuYW1lXVthdHRyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyVmFyaWFibGVzKHN0ciwgbm9kZSwgYXR0cmliTmFtZSkge1xyXG4gICAgICBpZiAocmd4LnZhcmlhYmxlLnRlc3Qoc3RyKSkge1xyXG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHJneC52YXJpYWJsZSwgZnVuY3Rpb24obWF0Y2gsIHZhcmlhYmxlRGVsaW1pdCwgdmFyaWFibGUpIHtcclxuICAgICAgICAgIGNvbnN0IHZhck5hbWUgPSB2YXJpYWJsZURlbGltaXQgfHwgdmFyaWFibGU7XHJcbiAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWxzLCB2YXJOYW1lKSkge1xyXG4gICAgICAgICAgICBwcm9wRXJyb3IoJ3N0cnVjdHVyZScsIFwi4oCYXCIgKyB2YXJOYW1lICsgXCLigJkgaXMgbm90IGEgcmVjb2duaXplZCBwcm9wZXJ0eS4gUGxlYXNlIGNoZWNrIGl0cyBzcGVsbGluZyBvciBpbml0aWFsaXplIGl0IGluIHRoZSBjb25zdHJ1Y3RvclwiKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoc3RydWN0dXJlVmFyc1t2YXJOYW1lXSA9PSBudWxsKSBzdHJ1Y3R1cmVWYXJzW3Zhck5hbWVdID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICBjb25zdCBpdGVtID0ge1xyXG4gICAgICAgICAgICBzdHI6IHN0cixcclxuICAgICAgICAgICAgbm9kZTogbm9kZVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGlmIChhdHRyaWJOYW1lKSBpdGVtLmF0dHIgPSBhdHRyaWJOYW1lO1xyXG4gICAgICAgICAgc3RydWN0dXJlVmFyc1t2YXJOYW1lXS5wdXNoKGl0ZW0pO1xyXG5cclxuICAgICAgICAgIHJldHVybiB0aGF0W3ZhcmlhYmxlRGVsaW1pdCB8fCB2YXJpYWJsZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vLT4gTWV0aG9kcyAmIHByb3BlcnRpZXNcclxuICBmdW5jdGlvbiBwcm9wRXJyb3IocHJvcCwgbXNnLCBub1RhcmdldCkge1xyXG4gICAgaWYgKCFpbml0aWFsKSB7XHJcbiAgICAgIGxldCBwcmV2VmFsID0gdmFsc1twcm9wXTtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJldlZhbCkpIHByZXZWYWwgPSAnWycgKyBwcmV2VmFsLmpvaW4oJywgJykgKyAnXSc7XHJcbiAgICAgIG1zZyArPSAnLlxcbkNvbnRpbnVpbmcgd2l0aCB0aGUgcHJldmlvdXMgdmFsdWUgKCcgKyBwcmV2VmFsICsgJykuJztcclxuICAgIH1cclxuICAgIGVycm9yKG1zZywgbm9UYXJnZXQgPyBmYWxzZSA6IHByb3ApO1xyXG4gIH1cclxuICBmdW5jdGlvbiBtZXRob2RFcnJvcihtZXRob2QsIGFyZ0lkeCwgbXNnLCBvbWl0RXJyb3IpIHtcclxuICAgIGNvbnN0IGNvdW50cyA9IFsnZmlyc3QnLCAnc2Vjb25kJywgJ3RoaXJkJywgJ2ZvdXJ0aCcsICdmaWZ0aCcsICdzaXh0aCcsICdzZXZlbnRoJywgJ2VpZ2h0aCcsICduaW50aCddO1xyXG4gICAgY29uc3QgYXJnID0gbWV0aG9kc1ttZXRob2RdLmFyZ3NbYXJnSWR4XTtcclxuXHJcbiAgICBsZXQgZXJyTXNnID0gJ3RoZSAnICsgKGFyZy5vcHRpb25hbCA/ICdvcHRpb25hbCAnIDogJycpICsgY291bnRzW2FyZ0lkeF0gKyAnIGFyZ3VtZW50ICgnICsgYXJnLm5hbWUgKyAnKSAnO1xyXG4gICAgaWYgKG9taXRFcnJvcikgZXJyTXNnICs9ICdoYXMgYmVlbiBvbWl0dGVkIGJ1dCBpdCBpcyByZXF1aXJlZC4gSXQgJztcclxuICAgIGVyck1zZyArPSAnbXVzdCBiZSAnICsgY29tcHV0ZVR5cGVNc2coYXJnLnN0cnVjdHVyZSk7XHJcbiAgICBpZiAoIW9taXRFcnJvcikgZXJyTXNnICs9ICcgYnV0IGl0JyArIG1zZztcclxuXHJcbiAgICBlcnJvcihlcnJNc2csIG1ldGhvZCk7XHJcbiAgfVxyXG5cclxuICAvL0NoZWNraW5nIHByb3BlcnRpZXMgJiBtZXRob2RzIGZvciB0aGUgY29ycmVjdCB0eXBlICYgZm9ybWF0XHJcbiAgZnVuY3Rpb24gY2hlY2tNZXRob2QobWV0aG9kLCBhcmdMaXN0KSB7XHJcbiAgICBjb25zdCBvYmogPSBtZXRob2RzW21ldGhvZF07XHJcbiAgICAvL0lmIHRoZSBuZXh0IGFyZ3VtZW50IChhcmdMaXN0Lmxlbmd0aCAtIDEgKyAxKSBpcyBub3Qgb3B0aW9uYWwsIGEgcmVxdWlyZWQgYXJnIGlzIG1pc3NpbmdcclxuICAgIGZvciAodmFyIGkgaW4gYXJnTGlzdCkge1xyXG4gICAgICBjb25zdCBhcmcgPSBhcmdMaXN0W2ldO1xyXG4gICAgICBjb25zdCBtc2cgPSBjaGVja1R5cGVzKGFyZywgb2JqLmFyZ3NbaV0uc3RydWN0dXJlLCBmYWxzZSk7XHJcbiAgICAgIGlmIChtc2cpIG1ldGhvZEVycm9yKG1ldGhvZCwgaSwgbXNnKTtcclxuICAgIH1cclxuICAgIGlmIChvYmouYXJnc1thcmdMaXN0Lmxlbmd0aF0gJiYgIW9iai5hcmdzW2FyZ0xpc3QubGVuZ3RoXS5vcHRpb25hbCkge1xyXG4gICAgICBtZXRob2RFcnJvcihtZXRob2QsIGFyZ0xpc3QubGVuZ3RoLCBudWxsLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gY2hlY2tQcm9wKHByb3AsIHZhbCkge1xyXG4gICAgY29uc3QgaXRlbSA9IHByb3BlcnRpZXNbcHJvcF07XHJcbiAgICBjb25zdCBtc2cgPSBjaGVja1R5cGVzKHZhbCwgaXRlbS5zdHJ1Y3R1cmUsIGZhbHNlKTtcclxuICAgIGlmIChtc2cpIHtcclxuICAgICAgcHJvcEVycm9yKHByb3AsICdwcm9wZXJ0eSDigJgnICsgcHJvcCArICfigJkgbXVzdCBiZSAnICsgY29tcHV0ZVR5cGVNc2coaXRlbS5zdHJ1Y3R1cmUsIGl0ZW0uc2hhcGUpICsgJyBidXQgaXQnICsgbXNnLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNoZWNrVHlwZXModmFsLCBzdHJ1Y3R1cmUsIHBsdXJhbCkge1xyXG4gICAgbGV0IG1zZztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RydWN0dXJlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHR5cGVPYmogPSBzdHJ1Y3R1cmVbaV07XHJcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlT2JqLnR5cGU7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0eXBlID09ICdib29sZWFuJyAmJiB0eXBlb2YgdmFsID09ICdib29sZWFuJyB8fFxyXG4gICAgICAgIHR5cGUgPT0gJ3RydWUnICYmIHZhbCA9PT0gdHJ1ZSB8fFxyXG4gICAgICAgIHR5cGUgPT0gJ2ZhbHNlJyAmJiB2YWwgPT09IGZhbHNlIHx8XHJcbiAgICAgICAgdHlwZSA9PSAnYXJyYXknICYmIEFycmF5LmlzQXJyYXkodmFsKSB8fFxyXG4gICAgICAgIHR5cGUgPT0gJ29iamVjdCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkgPT0gJ1tvYmplY3QgT2JqZWN0XScgfHxcclxuICAgICAgICB0eXBlID09ICdudW1iZXInICYmIHR5cGVvZiB2YWwgPT0gJ251bWJlcicgJiYgIXBvbHlJc05hTih2YWwpIHx8XHJcbiAgICAgICAgdHlwZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJyB8fFxyXG4gICAgICAgIHR5cGUgPT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbCA9PSAnc3RyaW5nJ1xyXG4gICAgICApIHtcclxuICAgICAgICBpZiAodHlwZSA9PSAnYXJyYXknKSB7XHJcbiAgICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IHZhbC5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICBpZiAobXNnID0gY2hlY2tUeXBlcyh2YWxbbl0sIHR5cGVPYmouc3RydWN0dXJlLCB0cnVlKSkgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChtc2cgPSBjaGVja1R5cGVzKHZhbFtrZXldLCB0eXBlT2JqLnN0cnVjdHVyZSwgdHJ1ZSkpIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobXNnKSByZXR1cm4gbXNnO1xyXG4gICAgICAgIGlmIChtc2cgPSBjaGVja0NvbmRpdGlvbnModHlwZU9iai5jb25kaXRpb25zLCB2YWwpKSBicmVhaztcclxuICAgICAgICBlbHNlIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1zZyA/ICcgaXMgJyArIG1zZyA6IChwbHVyYWwgPyAncyB2YWx1ZXMgYXJlICcgOiAnIGlzICcpICsgdHlwZU1zZyh2YWwsIHRydWUpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrQ29uZGl0aW9ucyhjb25kaXRpb25zLCB2YWwpIHtcclxuICAgICAgaWYgKGNvbmRpdGlvbnMpIHtcclxuICAgICAgICBpZiAoY29uZGl0aW9ucy5ub25uZWdhdGl2ZSAmJiB2YWwgPCAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ2EgbmVnYXRpdmUgbnVtYmVyJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmRpdGlvbnMuaW50ZWdlciAmJiB2YWwgJSAxICE9PSAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ2EgZmxvYXRpbmcgcG9pbnQgbnVtYmVyJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmRpdGlvbnMuZmlsbGVkICYmIHZhbC50cmltKCkgPT09ICcnKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ2FuIGVtcHR5IHN0cmluZyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25kaXRpb25zLmtleXdvcmRzICYmIGNvbmRpdGlvbnMua2V5d29yZHMuaW5kZXhPZih2YWwpID09IC0xKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ2EgZGlmZmVyZW50IHN0cmluZyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25kaXRpb25zLndvcmRDaGFyICYmICFwb2x5SXNOYU4oTnVtYmVyKHZhbCkpKSB7XHJcbiAgICAgICAgICByZXR1cm4gJ2EgcHVyZSBudW1iZXIgc3RyaW5nJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmRpdGlvbnMubGVuZ3RoICYmIHZhbC5sZW5ndGggIT09IGNvbmRpdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICByZXR1cm4gKHR5cGUgPT0gJ2FycmF5JyA/ICdhbiAnIDogJ2EgJykgKyB0eXBlICsgJyBvZiBsZW5ndGggJyArIHZhbC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL0NvbXB1dGluZyBhbiBhdXRvbWF0ZWQgZXJyb3IgbWVzc2FnZSByZWdhcmRpbmcgdGhlIHByb3BlcnR5J3MgdHlwZXMgYW5kIGNvbmRpdGlvbnNcclxuICBmdW5jdGlvbiBjb21wdXRlVHlwZU1zZyhzdHJ1Y3QsIHNoYXBlLCBwbHVyYWwsIGRlZXApIHtcclxuICAgIGxldCBtc2cgPSAnJztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RydWN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHR5cGUgPSBzdHJ1Y3RbaV0udHlwZTtcclxuICAgICAgY29uc3QgY29uZCA9IHN0cnVjdFtpXS5jb25kaXRpb25zO1xyXG4gICAgICBpZiAobXNnKSBtc2cgKz0gJyBvciAnO1xyXG5cclxuICAgICAgaWYgKHR5cGUgPT0gJ251bWJlcicpIHtcclxuICAgICAgICBjb25zdCBub25uZWdhdGl2ZSA9IGNvbmQgJiYgY29uZC5ub25uZWdhdGl2ZTtcclxuICAgICAgICBjb25zdCBpc0ludCA9IGNvbmQgJiYgY29uZC5pbnRlZ2VyO1xyXG5cclxuICAgICAgICBpZiAobm9ubmVnYXRpdmUpIHtcclxuICAgICAgICAgIGlmICghcGx1cmFsKSBtc2cgKz0gJ2EgJztcclxuICAgICAgICAgIG1zZyArPSAnbm9uLW5lZ2F0aXZlJztcclxuICAgICAgICB9IGVsc2UgaWYgKGlzSW50ICYmICFwbHVyYWwpIHtcclxuICAgICAgICAgIG1zZyArPSAnYW4nO1xyXG4gICAgICAgIH0gZWxzZSBtc2cgKz0gJ2FueSc7XHJcbiAgICAgICAgbXNnICs9ICcgJyArIChpc0ludCA/ICdpbnRlZ2VyJyA6ICdudW1iZXInKTtcclxuICAgICAgICBpZiAocGx1cmFsKSBtc2cgKz0gJ3MnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlbHNlIGlmICh0eXBlID09ICdhcnJheScpIHtcclxuICAgICAgICBjb25zdCBsZW4gPSBjb25kICYmIGNvbmQubGVuZ3RoO1xyXG4gICAgICAgIGNvbnN0IG1zZ1JlcyA9IGNvbXB1dGVUeXBlTXNnKHN0cnVjdFtpXS5zdHJ1Y3R1cmUsIGZhbHNlLCBsZW4gIT09IDEsIHRydWUpO1xyXG5cclxuICAgICAgICBpZiAoIXBsdXJhbCkgbXNnICs9ICdhJztcclxuICAgICAgICBpZiAoZGVlcCkge1xyXG4gICAgICAgICAgbXNnICs9IG1zZ1JlcztcclxuICAgICAgICB9IGVsc2UgaWYgKCFwbHVyYWwpIHtcclxuICAgICAgICAgIG1zZyArPSAnbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1zZyArPSAnIGFycmF5JztcclxuICAgICAgICBpZiAocGx1cmFsKSBtc2cgKz0gJ3MnO1xyXG4gICAgICAgIGlmIChsZW4pIG1zZyArPSAnIG9mIGxlbmd0aCAnICsgbGVuO1xyXG4gICAgICAgIGlmICghZGVlcCkgbXNnICs9ICcgd2l0aCAnICsgbXNnUmVzICsgJyBhcyB2YWx1ZXMnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlbHNlIGlmICh0eXBlID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgbXNnICs9ICdhbiBvYmplY3Qgd2l0aCAnICsgY29tcHV0ZVR5cGVNc2coc3RydWN0W2ldLnN0cnVjdHVyZSwgZmFsc2UsIHRydWUsIHRydWUpICsgJyBhcyB2YWx1ZXMnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlbHNlIGlmICh0eXBlID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBpZiAoIWRlZXApIG1zZyArPSAnYSAnO1xyXG4gICAgICAgIG1zZyArPSAnZnVuY3Rpb24gcmVmZXJlbmNlJztcclxuICAgICAgICBpZiAoIWRlZXAgJiYgcGx1cmFsKSBtc2cgKz0gJ3MnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlbHNlIGlmICh0eXBlID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaWYgKGNvbmQgJiYgY29uZC5rZXl3b3Jkcykge1xyXG4gICAgICAgICAgaWYgKGNvbmQua2V5d29yZHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBtc2cgKz0gJ29uZSBvZiB0aGUga2V5d29yZHMnO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbXNnICs9ICd0aGUga2V5d29yZCc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25kLmtleXdvcmRzLmZvckVhY2goZnVuY3Rpb24odmFsLCBuLCBhcnIpIHtcclxuICAgICAgICAgICAgaWYgKG4gIT0gMCAmJiBuID09IGFyci5sZW5ndGggLSAxKSBtc2cgKz0gJyBvcic7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG4gIT0gMCkgbXNnICs9ICcsJztcclxuICAgICAgICAgICAgbXNnICs9ICcgXCInICsgdmFsICsgJ1wiJztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoIWRlZXApIG1zZyArPSAnYSAnO1xyXG4gICAgICAgICAgaWYgKGNvbmQgJiYgY29uZC5maWxsZWQpIG1zZyArPSAnbm9uLWVtcHR5ICc7XHJcbiAgICAgICAgICBpZiAoY29uZCAmJiBjb25kLndvcmRDaGFyKSBtc2cgKz0gJ25vbi1udW1iZXIgJztcclxuICAgICAgICAgIG1zZyArPSAnc3RyaW5nJztcclxuICAgICAgICAgIGlmICghZGVlcCAmJiBwbHVyYWwpIG1zZyArPSAncyc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBlbHNlIGlmICh0eXBlID09ICdib29sZWFuJykge1xyXG4gICAgICAgIGlmICghZGVlcCkgbXNnICs9ICdhICc7XHJcbiAgICAgICAgbXNnICs9ICdib29sZWFuJztcclxuICAgICAgICBpZiAoIWRlZXAgJiYgcGx1cmFsKSBtc2cgKz0gJ3MnO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ3RydWUnIHx8IHR5cGUgPT0gJ2ZhbHNlJykge1xyXG4gICAgICAgIG1zZyArPSB0eXBlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2hhcGUpIHtcclxuICAgICAgICBtc2cgKz0gJyAoJyArIHNoYXBlICsgJyknO1xyXG4gICAgICAgIHNoYXBlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbXNnO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=