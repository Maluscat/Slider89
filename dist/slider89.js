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
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/default-styles.css":
/*!********************************!*\
  !*** ./src/default-styles.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {


    module.exports = [ ".sl89-track{position:relative;width:200px;height:25px;background-color:hsl(0,0%,18%);",".slider89.vertical .sl89-track{height:200px;width:25px;",".sl89-thumb{position:absolute;width:16px;height:100%;background-color:hsl(0,0%,28%);cursor:pointer;",".slider89.vertical .sl89-thumb{height:16px;width:100%;",".sl89-noselect{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;" ]
  

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Slider89; });

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
  const styles = __webpack_require__(/*! ./default-styles.css */ "./src/default-styles.css");

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
    for (var i = 0; i < styles.length; i++) {
      sheet.insertRule(styles[i], 0);
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


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvLi9zcmMvZGVmYXVsdC1zdHlsZXMuY3NzIiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDakZBLG9DQUFvQyxrQkFBa0IsWUFBWSxZQUFZLCtCQUErQixrQ0FBa0MsYUFBYSxXQUFXLGVBQWUsa0JBQWtCLFdBQVcsWUFBWSwrQkFBK0IsZUFBZSxrQ0FBa0MsWUFBWSxXQUFXLGtCQUFrQix5QkFBeUIsc0JBQXNC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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6InNsaWRlcjg5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU2xpZGVyODlcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU2xpZGVyODlcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlxuICAgIG1vZHVsZS5leHBvcnRzID0gWyBcIi5zbDg5LXRyYWNre3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjIwMHB4O2hlaWdodDoyNXB4O2JhY2tncm91bmQtY29sb3I6aHNsKDAsMCUsMTglKTtcIixcIi5zbGlkZXI4OS52ZXJ0aWNhbCAuc2w4OS10cmFja3toZWlnaHQ6MjAwcHg7d2lkdGg6MjVweDtcIixcIi5zbDg5LXRodW1ie3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjE2cHg7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1jb2xvcjpoc2woMCwwJSwyOCUpO2N1cnNvcjpwb2ludGVyO1wiLFwiLnNsaWRlcjg5LnZlcnRpY2FsIC5zbDg5LXRodW1ie2hlaWdodDoxNnB4O3dpZHRoOjEwMCU7XCIsXCIuc2w4OS1ub3NlbGVjdHstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7cG9pbnRlci1ldmVudHM6bm9uZTtcIiBdXG4gICIsIid1c2Ugc3RyaWN0JztcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2xpZGVyODkodGFyZ2V0LCBjb25maWcsIHJlcGxhY2UpIHtcclxuICBpZiAoIXRhcmdldCkge1xyXG4gICAgZXJyb3IoJ25vIGZpcnN0IGFyZ3VtZW50IGhhcyBiZWVuIHN1cHBsaWVkLiBJdCBuZWVkcyB0byBiZSB0aGUgRE9NIHRhcmdldCBub2RlIGZvciB0aGUgc2xpZGVyJywgJ2NvbnN0cnVjdG9yJywgdHJ1ZSk7XHJcbiAgfSBlbHNlIGlmICghdGFyZ2V0Lm5vZGVUeXBlIHx8IHRhcmdldC5ub2RlVHlwZSAhPSAxKSB7XHJcbiAgICBlcnJvcigndGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSB2YWxpZCBET00gbm9kZSB0aGUgc2xpZGVyIHdpbGwgYmUgcGxhY2VkIGludG8gJyArIHR5cGVNc2codGFyZ2V0KSwgJ2NvbnN0cnVjdG9yJywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoY29uZmlnID09IHVuZGVmaW5lZCB8fCBjb25maWcgPT09IGZhbHNlKSB7XHJcbiAgICBjb25maWcgPSB7fTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcgIT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShjb25maWcpKSB7XHJcbiAgICBlcnJvcigndGhlIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCBuZWVkcyB0byBiZSBhbiBvYmplY3QgZm9yIGNvbmZpZ3VyYXRpb24gJyArIHR5cGVNc2coY29uZmlnKSwgJ2NvbnN0cnVjdG9yJywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0aGF0ID0gdGhpcztcclxuICBjb25zdCBldmVudFR5cGVzID0gW1xyXG4gICAgJ3N0YXJ0JyxcclxuICAgICdtb3ZlJyxcclxuICAgICdlbmQnLFxyXG4gICAgJ2NoYW5nZTokcHJvcGVydHknXHJcbiAgXTtcclxuXHJcbiAgbGV0IGluaXRpYWwgPSBmYWxzZTtcclxuICBsZXQgYWN0aXZlVGh1bWI7XHJcbiAgbGV0IGFjdGl2ZVRvdWNoSUQ7XHJcbiAgbGV0IG1vdXNlRG93blBvcztcclxuICBsZXQgZXZlbnRJRCA9IDA7XHJcbiAgbGV0IHN0cnVjdHVyZVJneDsgLy9Qb2ludGVyIHRvIGByZ3hgIGluIHBhcnNlU3RydWN0dXJlXHJcbiAgbGV0IHRyYWNrU3R5bGU7IC8vVGhlIGxpdmUgY29tcHV0ZWQgc3R5bGUgb2YgdmFscy5ub2RlLnRyYWNrXHJcbiAgY29uc3Qgc3RydWN0dXJlVmFycyA9IHt9O1xyXG4gIGNvbnN0IGV2ZW50TGlzdCA9IHt9OyAvL1N0b3JpbmcgZXZlbnQgZGF0YSAobW9zdCBub3RhYmx5IHRoZSBpZGVudGlmaWVyKSBmb3IgZXZlbnQgcmVtb3ZhYmlsaXR5XHJcbiAgY29uc3QgdmFscyA9IHt9OyAvL2hvbGRpbmcgZXZlcnkgcHJvcGVydHkgb2YgdGhlIGNsYXNzXHJcblxyXG4gIC8vYCRgIGlzIGEgZml4ZWQgZW5kcG9pbnQgZm9yIGFsbCBwcm9wZXJ0aWVzLCBvbmx5IHRvIGJlIGFjY2Vzc2VkIGJ5IGEgYnViYmxpbmcgZ2V0dGVyL3NldHRlclxyXG4gIC8vT2JqZWN0LmRlZmluZVByb3BlcnR5IGlzIHVzZWQgZm9yIG5vbi1lbnVtZXJhYmlsaXR5IG9mIGAkYCBpbnNpZGUgYHZhbHNgXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbHMsICckJywge1xyXG4gICAgdmFsdWU6IHt9XHJcbiAgfSk7XHJcblxyXG4gIC8vU3R5bGUgcnVsZSBzdHJpbmdzIHdoaWNoIHdpbGwgYmUgaW5zZXJ0ZWQgaW50byBhIG5ld2x5IGNyZWF0ZWQgc3R5bGVzaGVldFxyXG4gIGNvbnN0IHN0eWxlcyA9IHJlcXVpcmUoJy4vZGVmYXVsdC1zdHlsZXMuY3NzJyk7XHJcblxyXG4gIGNvbnN0IG1ldGhvZHMgPSB7XHJcbiAgICBhZGRFdmVudDoge1xyXG4gICAgICBmdW5jdGlvbjogYWRkRXZlbnQsXHJcbiAgICAgIGFyZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnZXZlbnQgdHlwZScsXHJcbiAgICAgICAgICBzdHJ1Y3R1cmU6IFt7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXHJcbiAgICAgICAgICB9XVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ2V2ZW50IGZ1bmN0aW9uJyxcclxuICAgICAgICAgIHN0cnVjdHVyZTogW3tcclxuICAgICAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdldmVudCBuYW1lc3BhY2UnLFxyXG4gICAgICAgICAgb3B0aW9uYWw6IHRydWUsXHJcbiAgICAgICAgICBzdHJ1Y3R1cmU6IFt7XHJcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgICBjb25kaXRpb25zOiB7XHJcbiAgICAgICAgICAgICAgZmlsbGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHdvcmRDaGFyOiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1dXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG4gICAgcmVtb3ZlRXZlbnQ6IHtcclxuICAgICAgZnVuY3Rpb246IHJlbW92ZUV2ZW50LFxyXG4gICAgICBhcmdzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ2V2ZW50IGlkZW50aWZpZXIvbmFtZXNwYWNlJyxcclxuICAgICAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXHJcbiAgICAgICAgICAgICAgY29uZGl0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgbm9ubmVnYXRpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBpbnRlZ2VyOiB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgICAgY29uZGl0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgZmlsbGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgd29yZENoYXI6IHRydWVcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBwcm9wZXJ0aWVzID0ge1xyXG4gICAgcmFuZ2U6IHtcclxuICAgICAgZGVmYXVsdDogWzAsIDEwMF0sXHJcbiAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdhcnJheScsXHJcbiAgICAgICAgICBjb25kaXRpb25zOiB7XHJcbiAgICAgICAgICAgIGxlbmd0aDogMlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgICAgICB7IHR5cGU6ICdudW1iZXInIH1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdHlwZTogJ2Jvb2xlYW4nIH1cclxuICAgICAgXSxcclxuICAgICAgc2hhcGU6ICdbc3RhcnRWYWx1ZSwgZW5kVmFsdWVdJyxcclxuICAgICAgc2V0dGVyOiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICBpZiAodmFsWzBdID09PSB2YWxbMV0pIHtcclxuICAgICAgICAgIHByb3BFcnJvcigncmFuZ2UnLCAndGhlIGdpdmVuIHJhbmdlIG9mIFsnICsgdmFsLmpvaW4oJywgJykgKyAnXSBkZWZpbmVzIHRoZSBzYW1lIHZhbHVlIGZvciBib3RoIHJhbmdlIHN0YXJ0IGFuZCBlbmQnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbml0aWFsKSB7XHJcbiAgICAgICAgICBjb21wdXRlUmF0aW9EaXN0YW5jZSh7cmFuZ2U6IHZhbH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHZhbHVlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB2YWxzLnJhbmdlWzBdO1xyXG4gICAgICB9LFxyXG4gICAgICBzdHJ1Y3R1cmU6IFt7XHJcbiAgICAgICAgdHlwZTogJ251bWJlcidcclxuICAgICAgfV0sXHJcbiAgICAgIHNldHRlcjogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgaWYgKFxyXG4gICAgICAgICAgdmFscy5yYW5nZVswXSA+IHZhbHMucmFuZ2VbMV0gJiYgKHZhbCA+IHZhbHMucmFuZ2VbMF0gfHwgdmFsIDwgdmFscy5yYW5nZVsxXSkgfHxcclxuICAgICAgICAgIHZhbHMucmFuZ2VbMV0gPiB2YWxzLnJhbmdlWzBdICYmICh2YWwgPCB2YWxzLnJhbmdlWzBdIHx8IHZhbCA+IHZhbHMucmFuZ2VbMV0pXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICBjb25zdCByYW5nZVN0ciA9ICdbJyArIHZhbHMucmFuZ2Uuam9pbignLCAnKSArICddJztcclxuICAgICAgICAgIHByb3BFcnJvcigndmFsdWUnLCAndGhlIGdpdmVuIHZhbHVlIG9mICcgKyB2YWwgKyAnIGV4Y2VlZHMgdGhlIGN1cnJlbnRseSBzZXQgcmFuZ2Ugb2YgJyArIHJhbmdlU3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbml0aWFsKSB7XHJcbiAgICAgICAgICBjb21wdXRlUmF0aW9EaXN0YW5jZSh7dmFsdWU6IHZhbH0pO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBnZXR0ZXI6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgIHJldHVybiB2YWxzLnByZWNpc2lvbiAhPT0gZmFsc2UgPyBOdW1iZXIodmFsLnRvRml4ZWQodmFscy5wcmVjaXNpb24pKSA6IHZhbDtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHByZWNpc2lvbjoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXHJcbiAgICAgICAgICBjb25kaXRpb25zOiB7XHJcbiAgICAgICAgICAgIG5vbm5lZ2F0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnRlZ2VyOiB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHR5cGU6ICdmYWxzZScgfVxyXG4gICAgICBdLFxyXG4gICAgICBzZXR0ZXI6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWwgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHMucmFuZ2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKE51bWJlcih2YWxzLnJhbmdlW2ldLnRvRml4ZWQodmFsKSkgIT09IHZhbHMucmFuZ2VbaV0pIHtcclxuICAgICAgICAgICAgICBwcm9wRXJyb3IoJ3JhbmdlJywgJ3RoZSBnaXZlbiByYW5nZSAnICsgWydzdGFydCcsICdlbmQnXVtpXSArICcgb2YgYCcgKyB2YWxzLnJhbmdlW2ldICsgJ2AgZXhjZWVkcyB0aGUgY3VycmVudGx5IHNldCBwcmVjaXNpb24gb2YgJyArIHZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbml0aWFsKSB7XHJcbiAgICAgICAgICBjb21wdXRlUmF0aW9EaXN0YW5jZSh7cHJlY2lzaW9uOiB2YWx9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzdGVwOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzdHJ1Y3R1cmU6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcclxuICAgICAgICAgIGNvbmRpdGlvbnM6IHtcclxuICAgICAgICAgICAgbm9ubmVnYXRpdmU6IHRydWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHNldHRlcjogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbHMucHJlY2lzaW9uICE9PSBmYWxzZSAmJiB2YWwgIT09IGZhbHNlICYmIE51bWJlcih2YWwudG9GaXhlZCh2YWxzLnByZWNpc2lvbikpICE9PSB2YWwpIHtcclxuICAgICAgICAgIHByb3BFcnJvcignc3RlcCcsICd0aGUgZ2l2ZW4gdmFsdWUgb2YgJyArIHZhbCArICcgZXhjZWVkcyB0aGUgY3VycmVudGx5IHNldCBwcmVjaXNpb24gb2YgJyArIHZhbHMucHJlY2lzaW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbml0aWFsKSB7XHJcbiAgICAgICAgICBjb21wdXRlUmF0aW9EaXN0YW5jZSh7c3RlcDogdmFsfSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzdHJ1Y3R1cmU6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgY29uZGl0aW9uczoge1xyXG4gICAgICAgICAgICBmaWxsZWQ6IHRydWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XHJcbiAgICAgIF0sXHJcbiAgICAgIGluaXRpYWw6IHRydWVcclxuICAgIH0sXHJcbiAgICBub2RlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICBzdGF0aWM6IHRydWVcclxuICAgIH0sXHJcbiAgICBvcmllbnRhdGlvbjoge1xyXG4gICAgICBkZWZhdWx0OiAnaG9yaXpvbnRhbCcsXHJcbiAgICAgIHN0cnVjdHVyZTogW3tcclxuICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICBjb25kaXRpb25zOiB7XHJcbiAgICAgICAgICBrZXl3b3JkczogW1xyXG4gICAgICAgICAgICAnaG9yaXpvbnRhbCcsXHJcbiAgICAgICAgICAgICd2ZXJ0aWNhbCdcclxuICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICAgIH1dXHJcbiAgICB9LFxyXG4gICAgY2xhc3NMaXN0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzdHJ1Y3R1cmU6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcclxuICAgICAgICAgIHN0cnVjdHVyZTogW3tcclxuICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcclxuICAgICAgICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAgICAgICAgeyB0eXBlOiAnc3RyaW5nJyB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHR5cGU6ICdmYWxzZScgfVxyXG4gICAgICBdLFxyXG4gICAgICBpbml0aWFsOiB0cnVlLFxyXG4gICAgICBzaGFwZTogJ3tub2RlTmFtZTogWy4uLmNsYXNzZXNdfSdcclxuICAgIH0sXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxyXG4gICAgICAgICAgc3RydWN0dXJlOiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxyXG4gICAgICAgICAgICBzdHJ1Y3R1cmU6IFt7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XHJcbiAgICAgIF0sXHJcbiAgICAgIGluaXRpYWw6IHRydWUsXHJcbiAgICAgIHNldHRlcjogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgY29uc3QgZXJyVHlwZXMgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IgKHZhciBldmVudFR5cGUgaW4gdmFsKSB7XHJcbiAgICAgICAgICBpZiAoIWNoZWNrRXZlbnRUeXBlKGV2ZW50VHlwZSkpIGVyclR5cGVzLnB1c2goZXZlbnRUeXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVyclR5cGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IG1zZyA9XHJcbiAgICAgICAgICAgICd0aGUgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5zIGl0ZW1zIHdoaWNoIGFyZSBubyB2YWxpZCBldmVudCB0eXBlczonICsgZW5saXN0QXJyYXkoZXJyVHlwZXMpICtcclxuICAgICAgICAgICAgJ0F2YWlsYWJsZSBldmVudCB0eXBlcyBhcmU6JyArIGVubGlzdEFycmF5KGV2ZW50VHlwZXMpO1xyXG4gICAgICAgICAgcHJvcEVycm9yKCdldmVudHMnLCBtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGluaXRpYWwgPSB0cnVlO1xyXG4gIC8vSW5pdGlhbGl6aW5nIHByb3BlcnRpZXMgYW5kIG1ldGhvZHNcclxuICAoZnVuY3Rpb24oKSB7XHJcbiAgICBmb3IgKHZhciBfIGluIHByb3BlcnRpZXMpIHtcclxuICAgICAgY29uc3QgaXRlbSA9IF87XHJcbiAgICAgIGNvbnN0IHByb3AgPSBwcm9wZXJ0aWVzW2l0ZW1dO1xyXG5cclxuICAgICAgLypcclxuICAgICAgICBDYWxsaW5nIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBvbiB0aGUgY2xhc3MgaW5zdGFuY2UgKGB0aGlzYCkgaXMgbmVjZXNzYXJ5IHRvIGJlIGFibGUgdG8gY3JlYXRlIG11bHRpcGxlIGluc3RhbmNlc1xyXG4gICAgICAgIGFzIENsYXNzLnByb3RvdHlwZSBhcyB0YXJnZXQgd2lsbCBpbmhlcml0IHRoZSBkZWZpbmVkIHByb3BlcnR5IHRvIGFsbCBpbnN0YW5jZXNcclxuICAgICAgICBhbmQgYSBuZXcgY2FsbCBvZiBkZWZpbmVQcm9wZXJ0eSAod2hlbiBjcmVhdGluZyBhIG5ldyBpbnN0YW5jZSkgd291bGQgdGhyb3cgYW4gZXJyb3IgZm9yIGRlZmluaW5nIHRoZSBzYW1lIHByb3BlcnR5IHR3aWNlXHJcbiAgICAgICovXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGF0LCBpdGVtLCB7XHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICAgIGlmICghcHJvcC5zdGF0aWMpIHtcclxuICAgICAgICAgICAgaWYgKCFwcm9wLmluaXRpYWwgfHwgaW5pdGlhbCkge1xyXG4gICAgICAgICAgICAgIGNoZWNrUHJvcChpdGVtLCB2YWwpO1xyXG4gICAgICAgICAgICAgIGxldCBzZXR0ZXJSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgaWYgKHByb3Auc2V0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICBzZXR0ZXJSZXN1bHQgPSAocHJvcC5zZXR0ZXIpKHZhbCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChzZXR0ZXJSZXN1bHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFsc1tpdGVtXSA9IHZhbDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBlcnJvcigncHJvcGVydHkg4oCYJyArIGl0ZW0gKyAn4oCZIG1heSBvbmx5IGJlIHNldCBhdCBpbml0IHRpbWUgYnV0IGl0IHdhcyBqdXN0IHNldCB3aXRoIHRoZSB2YWx1ZSDigJgnICsgdmFsICsgJ+KAmScpO1xyXG4gICAgICAgICAgfSBlbHNlIGVycm9yKCdwcm9wZXJ0eSDigJgnICsgaXRlbSArICfigJkgbWF5IG9ubHkgYmUgcmVhZCBmcm9tIGJ1dCBpdCB3YXMganVzdCBzZXQgd2l0aCB0aGUgdmFsdWUg4oCYJyArIHZhbCArICfigJknKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBjb25zdCB2YWwgPSBwcm9wLmdldHRlciA/IHByb3AuZ2V0dGVyKHZhbHNbaXRlbV0pIDogdmFsc1tpdGVtXTtcclxuICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGRlZmluZURlZXBQcm9wZXJ0eSh2YWxzLCBpdGVtLCB2YWxzLiQpO1xyXG5cclxuICAgICAgaWYgKGl0ZW0gaW4gY29uZmlnKSB7XHJcbiAgICAgICAgdGhhdFtpdGVtXSA9IGNvbmZpZ1tpdGVtXTtcclxuICAgICAgICBkZWxldGUgY29uZmlnW2l0ZW1dO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGRlZiA9IHByb3AuZGVmYXVsdDtcclxuICAgICAgICB2YWxzW2l0ZW1dID0gdHlwZW9mIGRlZiA9PSAnZnVuY3Rpb24nID8gZGVmKCkgOiBkZWY7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBfIGluIGNvbmZpZykge1xyXG4gICAgICBjb25zdCBpdGVtID0gXztcclxuXHJcbiAgICAgIGlmIChpdGVtWzBdID09ICdfJykge1xyXG4gICAgICAgIGRlZmluZURlZXBQcm9wZXJ0eSh0aGF0LCBpdGVtLCB2YWxzKTtcclxuICAgICAgICB2YWxzW2l0ZW1dID0gY29uZmlnW2l0ZW1dO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVycm9yKCfigJgnICsgaXRlbSArICfigJkgaXMgbm90IGEgdmFsaWQgcHJvcGVydHkgbmFtZS4gQ2hlY2sgaXRzIHNwZWxsaW5nIG9yIHByZWZpeCBpdCB3aXRoIGFuIHVuZGVyc2NvcmUgdG8gdXNlIGl0IGFzIGN1c3RvbSBwcm9wZXJ0eSAo4oCYXycgKyBpdGVtICsgJ+KAmSknKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIF8gaW4gbWV0aG9kcykge1xyXG4gICAgICBjb25zdCBpdGVtID0gXztcclxuICAgICAgY29uc3QgbWV0aG9kID0gbWV0aG9kc1tpdGVtXTtcclxuICAgICAgU2xpZGVyODkucHJvdG90eXBlW2l0ZW1dID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgbWV0aG9kLmFyZ3MubGVuZ3RoKTtcclxuICAgICAgICBjaGVja01ldGhvZChpdGVtLCBhcmdzKTtcclxuICAgICAgICByZXR1cm4gbWV0aG9kLmZ1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSkoKTtcclxuXHJcbiAgLy9CdWlsZGluZyB0aGUgc2xpZGVyIGVsZW1lbnRcclxuICAoZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAodmFscy5zdHJ1Y3R1cmUgPT0gZmFsc2UpIHtcclxuICAgICAgLy9JbiBjYXNlIG5vIGN1c3RvbSBzdHJ1Y3R1cmUgaXMgZGVmaW5lZCwgbWFudWFsbHkgYnVpbGQgdGhlIG5vZGUgdG8gZW5zdXJlIGJlc3QgcGVyZm9ybWFuY2UgKHBhcnNlU3RydWN0dXJlIHRha2VzIGEgd2hpbGUpXHJcbiAgICAgIHZhbHMubm9kZS5zbGlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgdmFscy5ub2RlLnRyYWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHZhbHMubm9kZS50aHVtYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICAgICAgdmFscy5ub2RlLnRyYWNrLmFwcGVuZENoaWxkKHZhbHMubm9kZS50aHVtYik7XHJcbiAgICAgIHZhbHMubm9kZS5zbGlkZXIuYXBwZW5kQ2hpbGQodmFscy5ub2RlLnRyYWNrKTtcclxuXHJcbiAgICAgIGZvciAodmFyIGVsZW1lbnQgaW4gdmFscy5ub2RlKVxyXG4gICAgICAgIGlmIChlbGVtZW50ICE9ICdzbGlkZXInKSB2YWxzLm5vZGVbZWxlbWVudF0uY2xhc3NMaXN0LmFkZCgnc2w4OS0nICsgZWxlbWVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWxzLm5vZGUgPSBwYXJzZVN0cnVjdHVyZSh2YWxzLnN0cnVjdHVyZSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBub2RlID0gdmFscy5ub2RlO1xyXG5cclxuICAgIGlmIChyZXBsYWNlKSB7XHJcbiAgICAgIGNvbnN0IHRhcmdldEF0dHIgPSB0YXJnZXQuYXR0cmlidXRlcztcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRBdHRyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbm9kZS5zbGlkZXIuc2V0QXR0cmlidXRlKHRhcmdldEF0dHJbaV0ubmFtZSwgdGFyZ2V0QXR0cltpXS52YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIG5vZGUuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcjg5Jyk7XHJcbiAgICBpZiAodmFscy5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnKSBub2RlLnNsaWRlci5jbGFzc0xpc3QuYWRkKCd2ZXJ0aWNhbCcpO1xyXG5cclxuICAgIGlmICh2YWxzLmNsYXNzTGlzdCkge1xyXG4gICAgICAvLyBBZGRpbmcgdGhlIHNwZWNpZmllZCBjbGFzc2VzIGFuZCBjb2xsZWN0aW5nIGFsbCBub25leGlzdGVudCBub2RlcyBpbiBgZXJyTm9kZXNgXHJcbiAgICAgIGNvbnN0IGVyck5vZGVzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgIGZvciAodmFyIGtleSBpbiB2YWxzLmNsYXNzTGlzdCkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB2YWxzLmNsYXNzTGlzdFtrZXldO1xyXG4gICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5vZGUsIGtleSkpIHtcclxuICAgICAgICAgIGVyck5vZGVzLnB1c2goa2V5KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGVyck5vZGVzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbm9kZVtrZXldLmNsYXNzTGlzdC5hZGQoaXRlbVtpXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChlcnJOb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgbXNnID1cclxuICAgICAgICAgIFwidGhlIGdpdmVuIG9iamVjdCBjb250YWlucyBpdGVtcyB3aGljaCBhcmVuJ3Qgbm9kZXMgb2YgdGhpcyBzbGlkZXI6XCIgKyBlbmxpc3RBcnJheShlcnJOb2RlcykgK1xyXG4gICAgICAgICAgXCJGb2xsb3dpbmcgbm9kZXMgYXJlIHBhcnQgb2YgdGhpcyBzbGlkZXIncyBub2RlIHBvb2w6XCIgKyBlbmxpc3RBcnJheShPYmplY3Qua2V5cyhub2RlKSlcclxuICAgICAgICBwcm9wRXJyb3IoJ2NsYXNzTGlzdCcsIG1zZyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVTdHlsZVNoZWV0KCk7XHJcblxyXG4gICAgaWYgKHJlcGxhY2UpXHJcbiAgICAgIHRhcmdldC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChub2RlLnNsaWRlciwgdGFyZ2V0KTtcclxuICAgIGVsc2VcclxuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKG5vZGUuc2xpZGVyKTtcclxuXHJcbiAgICB0cmFja1N0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlLnRyYWNrKTtcclxuXHJcbiAgICBjb21wdXRlUmF0aW9EaXN0YW5jZSgpO1xyXG5cclxuICAgIG5vZGUudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoU3RhcnQpO1xyXG4gICAgbm9kZS50aHVtYi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzbGlkZVN0YXJ0KTtcclxuICB9KSgpO1xyXG5cclxuICBpbml0aWFsID0gZmFsc2U7XHJcblxyXG5cclxuICAvLyAtLS0tLS0gQ2xhc3MgbWV0aG9kcyAtLS0tLS1cclxuICBmdW5jdGlvbiBhZGRFdmVudCh0eXBlLCBmbiwgbmFtZSkge1xyXG4gICAgaWYgKCFjaGVja0V2ZW50VHlwZSh0eXBlKSkge1xyXG4gICAgICBlcnJvcigndGhlIHNwZWNpZmllZCB0eXBlIOKAmCcgKyB0eXBlICsgJ+KAmSBpcyBub3QgYSB2YWxpZCBldmVudCB0eXBlLiBBdmFpbGFibGUgdHlwZXMgYXJlOicgKyBlbmxpc3RBcnJheShldmVudFR5cGVzKSwgJ2FkZEV2ZW50Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHMuZXZlbnRzW3R5cGVdKSkgdmFscy5ldmVudHNbdHlwZV0gPSBuZXcgQXJyYXkoKTtcclxuICAgIHZhbHMuZXZlbnRzW3R5cGVdLnB1c2goZm4pO1xyXG4gICAgY29uc3Qga2V5ID0gbmFtZSB8fCBldmVudElEO1xyXG4gICAgY29uc3Qgb2JqID0ge1xyXG4gICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICBmbjogZm5cclxuICAgIH07XHJcbiAgICBpZiAobmFtZSkge1xyXG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnRMaXN0W2tleV0pKSBldmVudExpc3Rba2V5XSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICBldmVudExpc3Rba2V5XS5wdXNoKG9iaik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBldmVudExpc3Rba2V5XSA9IG9iajtcclxuICAgIH1cclxuICAgIHJldHVybiBuYW1lIHx8IGV2ZW50SUQrKztcclxuICB9XHJcbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnQoa2V5KSB7XHJcbiAgICBjb25zdCBsaXN0RW50cnkgPSBldmVudExpc3Rba2V5XTtcclxuICAgIGlmICghbGlzdEVudHJ5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBkZWxldGUgZXZlbnRMaXN0W2tleV07XHJcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShsaXN0RW50cnkpID9cclxuICAgICAgbGlzdEVudHJ5LnJlZHVjZShoYW5kbGVFdmVudHMsIG5ldyBBcnJheSgpKSA6XHJcbiAgICAgIGhhbmRsZUV2ZW50cyhuZXcgQXJyYXkoKSwgbGlzdEVudHJ5KTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVFdmVudHMoYWNjLCBlbnRyeSkge1xyXG4gICAgICBjb25zdCB0eXBlRXZlbnRzID0gdmFscy5ldmVudHNbZW50cnkudHlwZV07XHJcbiAgICAgIGNvbnN0IGRlbGV0ZWQgPSB0eXBlRXZlbnRzLnNwbGljZSh0eXBlRXZlbnRzLmluZGV4T2YoZW50cnkuZm4pLCAxKVswXTtcclxuICAgICAgaWYgKHR5cGVFdmVudHMubGVuZ3RoID09PSAwKSBkZWxldGUgdmFscy5ldmVudHNbZW50cnkudHlwZV07XHJcbiAgICAgIGFjYy5wdXNoKGRlbGV0ZWQpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLS0tXHJcbiAgZnVuY3Rpb24gZXJyb3IobXNnLCB0YXJnZXQsIGFib3J0KSB7XHJcbiAgICAvL1RPRE86IHJlZmVyIHRvIGRvY3NcclxuICAgIG1zZyA9ICdTbGlkZXI4OScgKyAodGFyZ2V0ID8gJyBAICcgKyB0YXJnZXQgOiAnJykgKyAnOiAnICsgbXNnO1xyXG4gICAgaWYgKG1zZ1ttc2cubGVuZ3RoIC0gMV0gIT0gJ1xcbicgJiYgbXNnW21zZy5sZW5ndGggLSAxXSAhPSAnLicpIG1zZyArPSAnLlxcbic7XHJcbiAgICBpZiAoaW5pdGlhbCB8fCBhYm9ydCkgbXNnICs9ICdBYm9ydGluZyB0aGUgc2xpZGVyIGNvbnN0cnVjdGlvbi4nO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHR5cGVNc2codmFyaWFibGUsIG5vSW50cm8pIHtcclxuICAgIGxldCBtc2cgPSBub0ludHJvID8gJycgOiAnYnV0IGl0IGlzICc7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YXJpYWJsZSkpXHJcbiAgICAgIG1zZyArPSAnYW4gYXJyYXknO1xyXG4gICAgZWxzZSBpZiAocG9seUlzTmFOKHZhcmlhYmxlKSlcclxuICAgICAgbXNnICs9ICdOYU4nO1xyXG4gICAgZWxzZSBpZiAodmFyaWFibGUgPT09IG51bGwpXHJcbiAgICAgIG1zZyArPSAnbnVsbCc7XHJcbiAgICBlbHNlIGlmICh0eXBlb2YgdmFyaWFibGUgPT0gJ2Jvb2xlYW4nKVxyXG4gICAgICBtc2cgKz0gdmFyaWFibGU7XHJcbiAgICBlbHNlXHJcbiAgICAgIG1zZyArPSAnb2YgdHlwZSAnICsgdHlwZW9mIHZhcmlhYmxlO1xyXG5cclxuICAgIHJldHVybiBtc2c7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGVubGlzdEFycmF5KGFycikge1xyXG4gICAgcmV0dXJuICdcXG4gLSBcIicgKyBhcnIuam9pbignXCJcXG4gLSBcIicpICsgJ1wiXFxuJztcclxuICB9XHJcbiAgZnVuY3Rpb24gY2hlY2tFdmVudFR5cGUodHlwZSkge1xyXG4gICAgaWYgKHR5cGUuaW5kZXhPZignY2hhbmdlOicpID09IDApIHtcclxuICAgICAgLy9FZGdlIGNhc2UgZm9yICdjaGFuZ2U6JHByb3BlcnR5J1xyXG4gICAgICBjb25zdCBjdXN0b21Qcm9wID0gdHlwZS5zbGljZSgnY2hhbmdlOicubGVuZ3RoKTtcclxuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFscywgY3VzdG9tUHJvcCkpIHtcclxuICAgICAgICBlcnJvcihcIuKAmFwiICsgdHlwZSArIFwi4oCZIHJlZmVycyB0byDigJhcIiArIGN1c3RvbVByb3AgKyBcIuKAmSwgd2hpY2ggaXNuJ3QgYSByZWNvZ25pemVkIHByb3BlcnR5LiBDaGVjayBpdHMgc3BlbGxpbmcgYW5kIGJlIGF3YXJlIHRoYXQgY3VzdG9tIHByb3BlcnRpZXMgbmVlZCB0byBiZSBpbml0aWFsaXplZFwiLCAnYWRkRXZlbnQnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChldmVudFR5cGVzLmluZGV4T2YodHlwZSkgPT0gLTEpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLy9NRE4gUG9seWZpbGwgQCBOdW1iZXIuaXNOYU5cclxuICBmdW5jdGlvbiBwb2x5SXNOYU4odmFsKSB7XHJcbiAgICByZXR1cm4gTnVtYmVyLmlzTmFOICYmIE51bWJlci5pc05hTih2YWwpIHx8ICFOdW1iZXIuaXNOYU4gJiYgdHlwZW9mIHZhbCA9PT0gJ251bWJlcicgJiYgdmFsICE9PSB2YWw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkZWZpbmVEZWVwUHJvcGVydHkodGFyZ2V0LCBpdGVtLCBlbmRwb2ludCkge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgaXRlbSwge1xyXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgIGVuZHBvaW50W2l0ZW1dID0gdmFsO1xyXG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RydWN0dXJlVmFycywgaXRlbSkpIHtcclxuICAgICAgICAgIHVwZGF0ZVZhcmlhYmxlKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWluaXRpYWwpIGludm9rZUV2ZW50KFsnY2hhbmdlOicgKyBpdGVtXSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGVuZHBvaW50W2l0ZW1dO1xyXG4gICAgICB9LFxyXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVWYXJpYWJsZShwcm9wKSB7XHJcbiAgICAgIGZvciAodmFyIGkgaW4gc3RydWN0dXJlVmFyc1twcm9wXSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBzdHJ1Y3R1cmVWYXJzW3Byb3BdW2ldO1xyXG4gICAgICAgIGNvbnN0IHN0ciA9IGl0ZW0uc3RyLnJlcGxhY2Uoc3RydWN0dXJlUmd4LnZhcmlhYmxlLCBmdW5jdGlvbihtYXRjaCwgdmFyaWFibGVEZWxpbWl0LCB2YXJpYWJsZSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoYXRbdmFyaWFibGVEZWxpbWl0IHx8IHZhcmlhYmxlXTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXRlbS5hdHRyKSB7XHJcbiAgICAgICAgICBpdGVtLm5vZGUuc2V0QXR0cmlidXRlKGl0ZW0uYXR0ciwgc3RyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaXRlbS5ub2RlLnRleHRDb250ZW50ID0gc3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tIFRodW1iIG1vdmluZyBmdW5jdGlvbnMgLS0tLS0tXHJcbiAgZnVuY3Rpb24gZ2V0VHJhY2tQYWRkaW5nKGRpcmVjdGlvbikge1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodHJhY2tTdHlsZVsncGFkZGluZycgKyBkaXJlY3Rpb25dKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gZ2V0RGlzdGFuY2UoKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IHZhbHMubm9kZS50aHVtYi5zdHlsZS50cmFuc2Zvcm07XHJcbiAgICBjb25zdCB0cmFuc2xhdGVTdHIgPSB2YWxzLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcgPyAndHJhbnNsYXRlWSgnIDogJ3RyYW5zbGF0ZVgoJztcclxuICAgIGNvbnN0IGZpcnN0QnJhY2tldCA9IHN0eWxlLnNsaWNlKHN0eWxlLmluZGV4T2YodHJhbnNsYXRlU3RyKSArIHRyYW5zbGF0ZVN0ci5sZW5ndGgpO1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoZmlyc3RCcmFja2V0LnNsaWNlKDAsIGZpcnN0QnJhY2tldC5pbmRleE9mKCcpJykpKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gZ2V0QWJzb2x1dGVUcmFja1NpemUoKSB7XHJcbiAgICBpZiAodmFscy5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnKSB7XHJcbiAgICAgIHJldHVybiAodmFscy5ub2RlLnRyYWNrLmNsaWVudEhlaWdodCAtIGdldFRyYWNrUGFkZGluZygnVG9wJykgLSBnZXRUcmFja1BhZGRpbmcoJ0JvdHRvbScpKSAtIHZhbHMubm9kZS50aHVtYi5jbGllbnRIZWlnaHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gKHZhbHMubm9kZS50cmFjay5jbGllbnRXaWR0aCAtIGdldFRyYWNrUGFkZGluZygnTGVmdCcpIC0gZ2V0VHJhY2tQYWRkaW5nKCdSaWdodCcpKSAtIHZhbHMubm9kZS50aHVtYi5jbGllbnRXaWR0aDtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gY29tcHV0ZURpc3RhbmNlVmFsdWUoZGlzdGFuY2UsIGFic1NpemUpIHtcclxuICAgIGlmIChhYnNTaXplID09IG51bGwpIGFic1NpemUgPSBnZXRBYnNvbHV0ZVRyYWNrU2l6ZSgpO1xyXG4gICAgcmV0dXJuIGRpc3RhbmNlIC8gYWJzU2l6ZSAqICh2YWxzLnJhbmdlWzFdIC0gdmFscy5yYW5nZVswXSkgKyB2YWxzLnJhbmdlWzBdO1xyXG4gIH1cclxuICBmdW5jdGlvbiBtb3ZlVGh1bWIoZGlzdGFuY2UsIHVzZVRyYW5zZm9ybSkge1xyXG4gICAgaWYgKHVzZVRyYW5zZm9ybSkge1xyXG4gICAgICB2YWxzLm5vZGUudGh1bWIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZScgKyAodmFscy5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnID8gJ1knIDogJ1gnKSArICcoJyArIGRpc3RhbmNlICsgJ3B4KSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodmFscy5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnKSB7XHJcbiAgICAgICAgdmFyIHBhZGRpbmdTdGFydCA9IGdldFRyYWNrUGFkZGluZygnVG9wJyk7XHJcbiAgICAgICAgdmFyIHBhZGRpbmdFbmQgPSBnZXRUcmFja1BhZGRpbmcoJ0JvdHRvbScpO1xyXG4gICAgICAgIHZhciB0aHVtYkRpbSA9IHZhbHMubm9kZS50aHVtYi5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHBvc0FuY2hvciA9ICd0b3AnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBwYWRkaW5nU3RhcnQgPSBnZXRUcmFja1BhZGRpbmcoJ0xlZnQnKTtcclxuICAgICAgICB2YXIgcGFkZGluZ0VuZCA9IGdldFRyYWNrUGFkZGluZygnUmlnaHQnKTtcclxuICAgICAgICB2YXIgdGh1bWJEaW0gPSB2YWxzLm5vZGUudGh1bWIuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgdmFyIHBvc0FuY2hvciA9ICdsZWZ0JztcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IHN1YnRyYWN0ID0gKHRodW1iRGltICogZGlzdGFuY2UpICsgJ3B4JztcclxuICAgICAgaWYgKHBhZGRpbmdFbmQpIHN1YnRyYWN0ICs9ICcgLSAnICsgKHBhZGRpbmdFbmQgKiBkaXN0YW5jZSkgKyAncHgnO1xyXG4gICAgICBpZiAocGFkZGluZ1N0YXJ0KSBzdWJ0cmFjdCArPSAnICsgJyArIChwYWRkaW5nU3RhcnQgKiAoMSAtIGRpc3RhbmNlKSkgKyAncHgnO1xyXG4gICAgICB2YWxzLm5vZGUudGh1bWIuc3R5bGVbcG9zQW5jaG9yXSA9ICdjYWxjKCcgKyAoZGlzdGFuY2UgKiAxMDApICsgJyUgLSAnICsgc3VidHJhY3QgKyAnKSc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGNvbXB1dGVSYXRpb0Rpc3RhbmNlKG5ld1ZhbHMpIHtcclxuICAgIGxldCB2YWx1ZSwgcmF0aW87XHJcbiAgICBpZiAoIW5ld1ZhbHMpIHtcclxuICAgICAgbmV3VmFscyA9IHZhbHM7XHJcbiAgICAgIHZhbHVlID0gdmFscy52YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHByb3BzID0gWydyYW5nZScsICdzdGVwJ107XHJcbiAgICAgIGZvciAodmFyIGkgaW4gcHJvcHMpIHtcclxuICAgICAgICBpZiAobmV3VmFsc1twcm9wc1tpXV0gPT0gbnVsbCkgbmV3VmFsc1twcm9wc1tpXV0gPSB2YWxzW3Byb3BzW2ldXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobmV3VmFscy52YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgdmFsdWUgPSBuZXdWYWxzLnZhbHVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJhdGlvID0gKHZhbHMudmFsdWUgLSB2YWxzLnJhbmdlWzBdKSAvICh2YWxzLnJhbmdlWzFdIC0gdmFscy5yYW5nZVswXSk7XHJcbiAgICAgICAgdmFsdWUgPSAobmV3VmFscy5yYW5nZVsxXSAtIG5ld1ZhbHMucmFuZ2VbMF0pICogcmF0aW8gKyBuZXdWYWxzLnJhbmdlWzBdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAvL1JvdW5kIHZhbHVlIHRvIGEgZ2l2ZW4gc3RlcFxyXG4gICAgaWYgKG5ld1ZhbHMuc3RlcCAhPT0gZmFsc2UpIHtcclxuICAgICAgaWYgKG5ld1ZhbHMucmFuZ2VbMV0gLSBuZXdWYWxzLnJhbmdlWzBdIDwgbmV3VmFscy5zdGVwKSB7XHJcbiAgICAgICAgdmFsdWUgPSBuZXdWYWxzLnJhbmdlWzBdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbHVlID0gbmV3VmFscy5yYW5nZVswXSArIE1hdGgucm91bmQoKHZhbHVlIC0gbmV3VmFscy5yYW5nZVswXSkgLyBuZXdWYWxzLnN0ZXApICogbmV3VmFscy5zdGVwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdCBuZXdSYXRpbyA9ICh2YWx1ZSAtIG5ld1ZhbHMucmFuZ2VbMF0pIC8gKG5ld1ZhbHMucmFuZ2VbMV0gLSBuZXdWYWxzLnJhbmdlWzBdKTtcclxuICAgIGlmICh2YWx1ZSAhPT0gdmFscy52YWx1ZSkgdmFscy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgaWYgKG5ld1JhdGlvICE9PSByYXRpbykgbW92ZVRodW1iKG5ld1JhdGlvKTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLSBFdmVudCBmdW5jdGlvbnMgLS0tLS0tXHJcbiAgZnVuY3Rpb24gaW52b2tlRXZlbnQodHlwZXMpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgZnVuY3Rpb25zID0gdmFscy5ldmVudHNbdHlwZXNbaV1dO1xyXG4gICAgICBpZiAoZnVuY3Rpb25zKSB7XHJcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBmdW5jdGlvbnMubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgIGZ1bmN0aW9uc1tuXS5jYWxsKHRoYXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICAvLyAtPiBFdmVudCBsaXN0ZW5lcnNcclxuICBmdW5jdGlvbiB0b3VjaFN0YXJ0KGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmIChhY3RpdmVUb3VjaElEID09IG51bGwpIHtcclxuICAgICAgYWN0aXZlVG91Y2hJRCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcclxuICAgICAgc2xpZGVTdGFydC5jYWxsKHRoaXMsIGUuY2hhbmdlZFRvdWNoZXNbMF0sIHRydWUpO1xyXG5cclxuICAgICAgdmFscy5ub2RlLnRodW1iLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoTW92ZSk7XHJcbiAgICAgIHZhbHMubm9kZS50aHVtYi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoRW5kKTtcclxuICAgICAgdmFscy5ub2RlLnRodW1iLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdG91Y2hFbmQpO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiB0b3VjaE1vdmUoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChlLmNoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXIgPT09IGFjdGl2ZVRvdWNoSUQpIHtcclxuICAgICAgICBzbGlkZU1vdmUuY2FsbCh0aGlzLCBlLmNoYW5nZWRUb3VjaGVzW2ldLCB0cnVlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiB0b3VjaEVuZChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gYWN0aXZlVG91Y2hJRCkge1xyXG4gICAgICAgIHZhbHMubm9kZS50aHVtYi5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaE1vdmUpO1xyXG4gICAgICAgIHZhbHMubm9kZS50aHVtYi5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoRW5kKTtcclxuICAgICAgICB2YWxzLm5vZGUudGh1bWIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0b3VjaEVuZCk7XHJcblxyXG4gICAgICAgIHNsaWRlRW5kLmNhbGwodGhpcywgZS5jaGFuZ2VkVG91Y2hlc1tpXSwgdHJ1ZSk7XHJcbiAgICAgICAgYWN0aXZlVG91Y2hJRCA9IG51bGw7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gc2xpZGVTdGFydChlLCBpc1RvdWNoKSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3NsODktbm9zZWxlY3QnKTtcclxuICAgIHZhbHMubm9kZS50aHVtYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIGludm9rZUV2ZW50KFsnc3RhcnQnXSk7XHJcblxyXG4gICAgYWN0aXZlVGh1bWIgPSB0aGlzO1xyXG4gICAgaWYgKHZhbHMub3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICB2YXIgc3RhcnREaXIgPSAnVG9wJztcclxuICAgICAgdmFyIHBvc0FuY2hvciA9ICd0b3AnO1xyXG4gICAgICB2YXIgY2xpZW50RGltID0gZS5jbGllbnRZO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIHN0YXJ0RGlyID0gJ0xlZnQnO1xyXG4gICAgICB2YXIgcG9zQW5jaG9yID0gJ2xlZnQnO1xyXG4gICAgICB2YXIgY2xpZW50RGltID0gZS5jbGllbnRYO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGh1bWJPZmZzZXQgPSBhY3RpdmVUaHVtYlsnb2Zmc2V0JyArIHN0YXJ0RGlyXSAtIGdldFRyYWNrUGFkZGluZyhzdGFydERpcik7XHJcbiAgICBtb3VzZURvd25Qb3MgPSBjbGllbnREaW0gLSB0aHVtYk9mZnNldDtcclxuICAgIG1vdmVUaHVtYih0aHVtYk9mZnNldCwgdHJ1ZSk7XHJcbiAgICBhY3RpdmVUaHVtYi5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwb3NBbmNob3IpO1xyXG5cclxuICAgIGlmICghaXNUb3VjaCkge1xyXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHNsaWRlRW5kKTtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHNsaWRlTW92ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNsaWRlTW92ZShlKSB7XHJcbiAgICBjb25zdCBhYnNTaXplID0gZ2V0QWJzb2x1dGVUcmFja1NpemUoKTtcclxuICAgIGxldCBkaXN0YW5jZSA9ICh2YWxzLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcgPyBlLmNsaWVudFkgOiBlLmNsaWVudFgpIC0gbW91c2VEb3duUG9zO1xyXG5cclxuICAgIGlmIChkaXN0YW5jZSA+IGFic1NpemUpIGRpc3RhbmNlID0gYWJzU2l6ZTtcclxuICAgIGVsc2UgaWYgKGRpc3RhbmNlIDwgMCkgZGlzdGFuY2UgPSAwO1xyXG5cclxuICAgIGlmICh2YWxzLnN0ZXApIHtcclxuICAgICAgY29uc3QgcmVsU3RlcCA9IGFic1NpemUgLyAoKHZhbHMucmFuZ2VbMV0gLSB2YWxzLnJhbmdlWzBdKSAvIHZhbHMuc3RlcCk7XHJcbiAgICAgIGRpc3RhbmNlID0gTWF0aC5yb3VuZChkaXN0YW5jZSAvIHJlbFN0ZXApICogcmVsU3RlcDtcclxuICAgICAgaWYgKGRpc3RhbmNlID4gYWJzU2l6ZSkgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmFsdWUgPSBjb21wdXRlRGlzdGFuY2VWYWx1ZShkaXN0YW5jZSwgYWJzU2l6ZSk7XHJcblxyXG4gICAgaWYgKHZhbHMudmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgIHZhbHMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgbW92ZVRodW1iKGRpc3RhbmNlLCB0cnVlKTtcclxuICAgICAgaW52b2tlRXZlbnQoWydtb3ZlJ10pO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBzbGlkZUVuZChlLCBpc1RvdWNoKSB7XHJcbiAgICBpZiAoIWlzVG91Y2gpIHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzbGlkZUVuZCk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzbGlkZU1vdmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHZhbHVlID0gY29tcHV0ZURpc3RhbmNlVmFsdWUoZ2V0RGlzdGFuY2UoKSk7XHJcbiAgICBjb21wdXRlUmF0aW9EaXN0YW5jZSh7dmFsdWU6IHZhbHVlfSk7XHJcbiAgICBhY3RpdmVUaHVtYi5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNmb3JtJyk7XHJcbiAgICBtb3VzZURvd25Qb3MgPSBudWxsO1xyXG4gICAgYWN0aXZlVGh1bWIgPSBudWxsO1xyXG5cclxuICAgIGludm9rZUV2ZW50KFsnZW5kJ10pO1xyXG4gICAgdmFscy5ub2RlLnRodW1iLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdzbDg5LW5vc2VsZWN0Jyk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0gU2NvcGUtc3BlY2lmaWMgZnVuY3Rpb25zIC0tLS0tLVxyXG4gIC8vIC0+IEVsZW1lbnQgYnVpbGRpbmdcclxuICBmdW5jdGlvbiBjcmVhdGVTdHlsZVNoZWV0KCkge1xyXG4gICAgY29uc3Qgc2hlZXQgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnN0IGZpcnN0SGVhZENoaWxkID0gZG9jdW1lbnQuaGVhZC5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgaWYgKGZpcnN0SGVhZENoaWxkKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmhlYWQuaW5zZXJ0QmVmb3JlKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksIGZpcnN0SGVhZENoaWxkKS5zaGVldDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpKS5zaGVldDtcclxuICAgICAgfVxyXG4gICAgfSkoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHNoZWV0Lmluc2VydFJ1bGUoc3R5bGVzW2ldLCAwKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gcGFyc2VTdHJ1Y3R1cmUoc3RydWN0dXJlU3RyKSB7XHJcbiAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICBzbGlkZXI6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGF0dHJpYnMgPSB7fTtcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgZGVmTm9kZXMgPSBbXHJcbiAgICAgICAgJ3RyYWNrJyxcclxuICAgICAgICAndGh1bWInXHJcbiAgICAgIF07XHJcbiAgICAgIGRlZk5vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xyXG4gICAgICAgIGF0dHJpYnNbbm9kZV0gPSB7XHJcbiAgICAgICAgICBjbGFzczogJ3NsODktJyArIG5vZGVcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgY29uc3QgdmFyaWFibGVzID0ge307XHJcblxyXG4gICAgY29uc3QgcmVnID0ge1xyXG4gICAgICBhdHRyOiB7XHJcbiAgICAgICAgbmFtZTogJ1tcXFxcdy1dKydcclxuICAgICAgfSxcclxuICAgICAgYWxsOiAnW1xcXFxkXFxcXERdJyxcclxuICAgICAgdGFiU3BhY2U6ICdbIFxcXFx0XSsnLFxyXG4gICAgICBuYW1lOiAnW1xcXFx3LV0rJyxcclxuICAgICAgc2luZ2xlQW1wbGZyOiAnOidcclxuICAgIH07XHJcbiAgICByZWcuYXR0ci52YWx1ZSA9ICcoPzooPyE8KScgKyByZWcuYWxsICsgJykqPyc7XHJcbiAgICByZWcuY2FwTmFtZSA9ICcoJyArIHJlZy5uYW1lICsgJyknO1xyXG4gICAgcmVnLmdsYk1hdGNoID0gJyg/OicgKyByZWcudGFiU3BhY2UgKyAnKD86KD8hPCkuKSo/KT8+JztcclxuICAgIHJlZy5jb250ZW50ID0gJyg/OlxcXFxzK1wiKCcrcmVnLmFsbCsnKz8pXCIpPyc7XHJcbiAgICByZWcudGFnID0gJyg/OlxcXFxzKycgKyByZWcuY2FwTmFtZSArICcpPyc7XHJcbiAgICByZWcuYXR0cmlicyA9ICcoPzpcXFxccysnICsgcmVnLmF0dHIubmFtZSArICdcXFxcKCcgKyByZWcuYXR0ci52YWx1ZSArICdcXFxcKSkqJztcclxuICAgIHJlZy5iYXNlID0gcmVnLmNhcE5hbWUgKyByZWcudGFnICsgcmVnLmNvbnRlbnQgKyAnKCcgKyByZWcuYXR0cmlicyArICcpXFxcXHMqPyc7XHJcbiAgICBjb25zdCByZ3ggPSB7XHJcbiAgICAgIGdlbmVyYWw6IChmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBwYXJ0cyA9IHtcclxuICAgICAgICAgIGlubmVyOiAnPChbOi9dPyknICsgcmVnLmNhcE5hbWUgKyAnKD86JyArIHJlZy50YWJTcGFjZSArIHJlZy5uYW1lICsgJyk/KD86JyArIHJlZy50YWJTcGFjZSArICcoXCJcIikpPycgKyByZWcuZ2xiTWF0Y2gsXHJcbiAgICAgICAgICBub0VuZDogJzwnICsgcmVnLnNpbmdsZUFtcGxmciArICc/JyArIHJlZy5jYXBOYW1lICsgJy4qPycsXHJcbiAgICAgICAgICBub0JlZ2lubmluZzogJyg/Ol58JyArIHJlZy50YWJTcGFjZSArICcpJyArIHJlZy5zaW5nbGVBbXBsZnIgKyAnPycgKyByZWcuY2FwTmFtZSArIHJlZy5nbGJNYXRjaFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHBhcnRzLmlubmVyICsgJ3wnICsgcGFydHMubm9FbmQgKyAnfCcgKyBwYXJ0cy5ub0JlZ2lubmluZztcclxuICAgICAgfSkoKSxcclxuICAgICAgdmFyaWFibGU6ICdcXFxce1xcXFwkKFxcXFx3KylcXFxcfXxcXFxcJChcXFxcdyspJyxcclxuICAgICAgYXR0cmlidXRlczogJygnICsgcmVnLmF0dHIubmFtZSArICcpXFxcXCgoJyArIHJlZy5hdHRyLnZhbHVlICsgJylcXFxcKSg/OlxcXFxzK3wkKScsXHJcbiAgICAgIHNpbmdsZVRhZzogJzwnICsgcmVnLnNpbmdsZUFtcGxmciArIHJlZy5iYXNlICsgJz4nLFxyXG4gICAgICBtdWx0aVRhZzogJzwnICsgcmVnLmJhc2UgKyAnPigoPzonK3JlZy5hbGwrJyg/ITwnICsgcmVnLmNhcE5hbWUgKyAnKD86XFxcXHMrJyArIHJlZy5uYW1lICsgJyk/KD86XFxcXHMrXCInK3JlZy5hbGwrJys/XCIpPycgKyByZWcuYXR0cmlicyArICdcXFxccyo/PicrcmVnLmFsbCsnKj88XFxcXC9cXFxcNlxcXFxzKj4pKSo/KTxcXFxcL1xcXFwxXFxcXHMqPidcclxuICAgIH07XHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGZvciAodmFyIGV4cHIgaW4gcmd4KSByZ3hbZXhwcl0gPSBuZXcgUmVnRXhwKHJneFtleHByXSwgJ2cnKTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgc3RydWN0dXJlUmd4ID0gcmd4O1xyXG4gICAgbGV0IHN0cnVjdHVyZSA9IHN0cnVjdHVyZVN0cjtcclxuXHJcbiAgICB3aGlsZSAocmd4Lm11bHRpVGFnLnRlc3Qoc3RydWN0dXJlKSkge1xyXG4gICAgICBzdHJ1Y3R1cmUgPSBzdHJ1Y3R1cmUucmVwbGFjZShyZ3gubXVsdGlUYWcsIGZ1bmN0aW9uKG1hdGNoLCBuYW1lLCB0YWcsIGlubmVyLCBhdHRyaWJ1dGVzLCBjb250ZW50KSB7XHJcbiAgICAgICAgY29uc3QgZWxlbSA9IGFzc2VtYmxlRWxlbWVudChuYW1lLCB0YWcsIGF0dHJpYnV0ZXMsIGlubmVyKTtcclxuICAgICAgICBjb250ZW50ID0gcGFyc2VTaW5nbGVUYWdzKGNvbnRlbnQsIGVsZW0pO1xyXG4gICAgICAgIG5vZGVbbmFtZV0gPSBlbGVtO1xyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdHJ1Y3R1cmUgPSBwYXJzZVNpbmdsZVRhZ3Moc3RydWN0dXJlLCBub2RlLnNsaWRlcik7XHJcblxyXG4gICAgc3RydWN0dXJlID0gc3RydWN0dXJlLnRyaW0oKTtcclxuICAgIGlmICgvXFxTKy9nLnRlc3Qoc3RydWN0dXJlKSkge1xyXG4gICAgICBjb25zdCBlcnJvckxpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChyZ3guZ2VuZXJhbC50ZXN0KHN0cnVjdHVyZSkpIHtcclxuICAgICAgICAgIHN0cnVjdHVyZS5yZXBsYWNlKHJneC5nZW5lcmFsLCBmdW5jdGlvbihtYXRjaCwgYW1wbGlmaWVyLCBuYW1lLCBjb250ZW50LCBuYW1lMiwgbmFtZTMpIHtcclxuICAgICAgICAgICAgbGV0IGluZm8gPSAnLSBcIicgKyAobmFtZSB8fCBuYW1lMiB8fCBuYW1lMykgKyAnXCIgPT4gJztcclxuICAgICAgICAgICAgaWYgKGFtcGxpZmllciA9PSAnLycpXHJcbiAgICAgICAgICAgICAgaW5mbyArPSAnQ2xvc2luZyB0YWcgZmluZGluZyBubyBiZWdpbm5pbmcnO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChhbXBsaWZpZXIgPT09ICcnKVxyXG4gICAgICAgICAgICAgIGluZm8gKz0gJ09wZW5pbmcgdGFnIGZpbmRpbmcgbm8gZW5kIChzaG91bGQgaXQgYmUgYSBzaW5nbGUgdGFnIG1hcmtlZCB3aXRoIOKAmDrigJk/KSc7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbnRlbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICBpbmZvICs9ICdSZWR1bmRhbnQgZW1wdHkgdGV4dCBjb250ZW50ICjigJhcIlwi4oCZKSc7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5hbWUyKVxyXG4gICAgICAgICAgICAgIGluZm8gKz0gJ01pc3NpbmcgZW5kaW5nIGNoYXJhY3RlciAo4oCYPuKAmSknO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChuYW1lMylcclxuICAgICAgICAgICAgICBpbmZvICs9ICdNaXNzaW5nIGJlZ2lubmluZyBjaGFyYWN0ZXIgKOKAmDzigJkpJztcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIGluZm8gKz0gJ1VuaWRlbnRpZmllZCBlcnJvci4gUGxlYXNlIGNoZWNrIHRoZSBlbGVtZW50IGZvciBzeW50YXggZXJyb3JzJztcclxuICAgICAgICAgICAgZXJyb3JMaXN0LnB1c2goaW5mbyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZXJyb3JMaXN0LnB1c2goJ0xlZnRvdmVyIHVucGFyc2FibGUgc3RydWN0dXJlOlxcbi0gXCInICsgc3RydWN0dXJlICsgJ1wiXFxuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KCkpO1xyXG4gICAgICBwcm9wRXJyb3IoJ3N0cnVjdHVyZScsIChlcnJvckxpc3QubGVuZ3RoID4gMSA/ICdzZXZlcmFsIGVsZW1lbnRzIGhhdmUnIDogJ2FuIGVsZW1lbnQgaGFzJykgKyAnIGJlZW4gZGVjbGFyZWQgd3JvbmdseSBhbmQgY291bGQgbm90IGJlIHBhcnNlZC5cXG4nICsgZXJyb3JMaXN0LmpvaW4oJy5cXG4nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCBtYXRjaGVzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgIGxldCBtYXRjaDtcclxuICAgICAgd2hpbGUgKG1hdGNoID0gcmd4LmdlbmVyYWwuZXhlYyhzdHJ1Y3R1cmVTdHIpKSB7XHJcbiAgICAgICAgbWF0Y2hlcy5wdXNoKG1hdGNoKTtcclxuICAgICAgfVxyXG4gICAgICBhcHBlbmRFbGVtZW50cyhub2RlLnNsaWRlciwgbWF0Y2hlcyk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIC8vU3RhdGljYWxseSB0eXBlZFxyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCB0cmFjayA9IG5vZGUudHJhY2s7XHJcbiAgICAgIGNvbnN0IHRodW1iID0gbm9kZS50aHVtYjtcclxuICAgICAgaWYgKCF0cmFjaykgbm9kZS50cmFjayA9IGFzc2VtYmxlRWxlbWVudCgndHJhY2snLCAnZGl2Jyk7XHJcbiAgICAgIGlmICghdGh1bWIpIG5vZGUudGh1bWIgPSBhc3NlbWJsZUVsZW1lbnQoJ3RodW1iJywgJ2RpdicpO1xyXG4gICAgICBpZiAoIXRyYWNrICYmICF0aHVtYikge1xyXG4gICAgICAgIG5vZGUudHJhY2suYXBwZW5kQ2hpbGQobm9kZS50aHVtYik7XHJcbiAgICAgICAgbm9kZS5zbGlkZXIuYXBwZW5kQ2hpbGQobm9kZS50cmFjayk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRyYWNrICYmIHRodW1iKSB7XHJcbiAgICAgICAgbm9kZS50aHVtYi5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5vZGUudHJhY2spO1xyXG4gICAgICAgIG5vZGUudHJhY2suYXBwZW5kQ2hpbGQobm9kZS50aHVtYik7XHJcbiAgICAgIH0gZWxzZSBpZiAodHJhY2sgJiYgIXRodW1iKSB7XHJcbiAgICAgICAgbm9kZS50cmFjay5hcHBlbmRDaGlsZChub2RlLnRodW1iKTtcclxuICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICByZXR1cm4gbm9kZTtcclxuXHJcbiAgICBmdW5jdGlvbiBhcHBlbmRFbGVtZW50cyhwYXJlbnQsIGNoaWxkQXJyLCBpKSB7XHJcbiAgICAgIGlmIChpID09IG51bGwpIGkgPSAwO1xyXG4gICAgICBmb3IgKDsgaSA8IGNoaWxkQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbSA9IG5vZGVbY2hpbGRBcnJbaV1bMl1dO1xyXG4gICAgICAgIGlmIChjaGlsZEFycltpXVsxXSA9PT0gJycpIHtcclxuICAgICAgICAgIGkgPSBhcHBlbmRFbGVtZW50cyhlbGVtLCBjaGlsZEFyciwgaSArIDEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGRBcnJbaV1bMV0gPT0gJy8nKSByZXR1cm4gaTtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZVNpbmdsZVRhZ3Moc3RyLCBwYXJlbnQpIHtcclxuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJneC5zaW5nbGVUYWcsIGZ1bmN0aW9uKG1hdGNoLCBuYW1lLCB0YWcsIGlubmVyLCBhdHRyaWJ1dGVzKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbSA9IGFzc2VtYmxlRWxlbWVudChuYW1lLCB0YWcsIGF0dHJpYnV0ZXMsIGlubmVyKTtcclxuICAgICAgICBub2RlW25hbWVdID0gZWxlbTtcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFzc2VtYmxlRWxlbWVudChuYW1lLCB0YWcsIGF0dHJpYnV0ZXMsIGNvbnRlbnQpIHtcclxuICAgICAgaWYgKG5vZGVbbmFtZV0pIHtcclxuICAgICAgICBwcm9wRXJyb3IoJ3N0cnVjdHVyZScsICdFdmVyeSBlbGVtZW50IG11c3QgaGF2ZSBhIHVuaXF1ZSBuYW1lIGJ1dCB0aGVyZSBhcmUgbXV0aXBsZSBlbGVtZW50cyBjYWxsZWQg4oCYJyArIG5hbWUgKyAn4oCZJyk7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyB8fCAnZGl2Jyk7XHJcbiAgICAgIGNvbnN0IGhhc0F0dHJpYnMgPSAhIWF0dHJpYnNbbmFtZV07XHJcbiAgICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgICAgZWxlbS50ZXh0Q29udGVudCA9IHJlZ2lzdGVyVmFyaWFibGVzKGNvbnRlbnQsIGVsZW0sIGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYXR0cmlidXRlcykge1xyXG4gICAgICAgIGF0dHJpYnV0ZXMucmVwbGFjZShyZ3guYXR0cmlidXRlcywgZnVuY3Rpb24oYXR0cmliLCBhdHRyaWJOYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgLy9UYWlsb3JlZCBmb3Igc3BhY2Utc2VwYXJhdGVkIHZhbHVlcyAoY2hlY2sgZm9yIGR1cGxpY2F0ZXMgaW4gdmFsdWUgdnMuIGRlZmF1bHQgc3RydWN0dXJlIHN0eWxlKVxyXG4gICAgICAgICAgaWYgKGhhc0F0dHJpYnMgJiYgYXR0cmlic1tuYW1lXVthdHRyaWJOYW1lXSAmJiB2YWx1ZS5zcGxpdCgnICcpLmluZGV4T2YoYXR0cmlic1tuYW1lXVthdHRyaWJOYW1lXSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgdmFsdWUgKz0gJyAnICsgYXR0cmlic1tuYW1lXVthdHRyaWJOYW1lXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGF0dHJpYk5hbWUsIHJlZ2lzdGVyVmFyaWFibGVzKHZhbHVlLCBlbGVtLCBhdHRyaWJOYW1lKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGhhc0F0dHJpYnMpIHtcclxuICAgICAgICBmb3IgKHZhciBhdHRyIGluIGF0dHJpYnNbbmFtZV0pIHtcclxuICAgICAgICAgIGlmICghZWxlbS5nZXRBdHRyaWJ1dGUoYXR0cikpIGVsZW0uc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJpYnNbbmFtZV1bYXR0cl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZWxlbTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWdpc3RlclZhcmlhYmxlcyhzdHIsIG5vZGUsIGF0dHJpYk5hbWUpIHtcclxuICAgICAgaWYgKHJneC52YXJpYWJsZS50ZXN0KHN0cikpIHtcclxuICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShyZ3gudmFyaWFibGUsIGZ1bmN0aW9uKG1hdGNoLCB2YXJpYWJsZURlbGltaXQsIHZhcmlhYmxlKSB7XHJcbiAgICAgICAgICBjb25zdCB2YXJOYW1lID0gdmFyaWFibGVEZWxpbWl0IHx8IHZhcmlhYmxlO1xyXG4gICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFscywgdmFyTmFtZSkpIHtcclxuICAgICAgICAgICAgcHJvcEVycm9yKCdzdHJ1Y3R1cmUnLCBcIuKAmFwiICsgdmFyTmFtZSArIFwi4oCZIGlzIG5vdCBhIHJlY29nbml6ZWQgcHJvcGVydHkuIFBsZWFzZSBjaGVjayBpdHMgc3BlbGxpbmcgb3IgaW5pdGlhbGl6ZSBpdCBpbiB0aGUgY29uc3RydWN0b3JcIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHN0cnVjdHVyZVZhcnNbdmFyTmFtZV0gPT0gbnVsbCkgc3RydWN0dXJlVmFyc1t2YXJOYW1lXSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgY29uc3QgaXRlbSA9IHtcclxuICAgICAgICAgICAgc3RyOiBzdHIsXHJcbiAgICAgICAgICAgIG5vZGU6IG5vZGVcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBpZiAoYXR0cmliTmFtZSkgaXRlbS5hdHRyID0gYXR0cmliTmFtZTtcclxuICAgICAgICAgIHN0cnVjdHVyZVZhcnNbdmFyTmFtZV0ucHVzaChpdGVtKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gdGhhdFt2YXJpYWJsZURlbGltaXQgfHwgdmFyaWFibGVdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLy0+IE1ldGhvZHMgJiBwcm9wZXJ0aWVzXHJcbiAgZnVuY3Rpb24gcHJvcEVycm9yKHByb3AsIG1zZywgbm9UYXJnZXQpIHtcclxuICAgIGlmICghaW5pdGlhbCkge1xyXG4gICAgICBsZXQgcHJldlZhbCA9IHZhbHNbcHJvcF07XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHByZXZWYWwpKSBwcmV2VmFsID0gJ1snICsgcHJldlZhbC5qb2luKCcsICcpICsgJ10nO1xyXG4gICAgICBtc2cgKz0gJy5cXG5Db250aW51aW5nIHdpdGggdGhlIHByZXZpb3VzIHZhbHVlICgnICsgcHJldlZhbCArICcpLic7XHJcbiAgICB9XHJcbiAgICBlcnJvcihtc2csIG5vVGFyZ2V0ID8gZmFsc2UgOiBwcm9wKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gbWV0aG9kRXJyb3IobWV0aG9kLCBhcmdJZHgsIG1zZywgb21pdEVycm9yKSB7XHJcbiAgICBjb25zdCBjb3VudHMgPSBbJ2ZpcnN0JywgJ3NlY29uZCcsICd0aGlyZCcsICdmb3VydGgnLCAnZmlmdGgnLCAnc2l4dGgnLCAnc2V2ZW50aCcsICdlaWdodGgnLCAnbmludGgnXTtcclxuICAgIGNvbnN0IGFyZyA9IG1ldGhvZHNbbWV0aG9kXS5hcmdzW2FyZ0lkeF07XHJcblxyXG4gICAgbGV0IGVyck1zZyA9ICd0aGUgJyArIChhcmcub3B0aW9uYWwgPyAnb3B0aW9uYWwgJyA6ICcnKSArIGNvdW50c1thcmdJZHhdICsgJyBhcmd1bWVudCAoJyArIGFyZy5uYW1lICsgJykgJztcclxuICAgIGlmIChvbWl0RXJyb3IpIGVyck1zZyArPSAnaGFzIGJlZW4gb21pdHRlZCBidXQgaXQgaXMgcmVxdWlyZWQuIEl0ICc7XHJcbiAgICBlcnJNc2cgKz0gJ211c3QgYmUgJyArIGNvbXB1dGVUeXBlTXNnKGFyZy5zdHJ1Y3R1cmUpO1xyXG4gICAgaWYgKCFvbWl0RXJyb3IpIGVyck1zZyArPSAnIGJ1dCBpdCcgKyBtc2c7XHJcblxyXG4gICAgZXJyb3IoZXJyTXNnLCBtZXRob2QpO1xyXG4gIH1cclxuXHJcbiAgLy9DaGVja2luZyBwcm9wZXJ0aWVzICYgbWV0aG9kcyBmb3IgdGhlIGNvcnJlY3QgdHlwZSAmIGZvcm1hdFxyXG4gIGZ1bmN0aW9uIGNoZWNrTWV0aG9kKG1ldGhvZCwgYXJnTGlzdCkge1xyXG4gICAgY29uc3Qgb2JqID0gbWV0aG9kc1ttZXRob2RdO1xyXG4gICAgLy9JZiB0aGUgbmV4dCBhcmd1bWVudCAoYXJnTGlzdC5sZW5ndGggLSAxICsgMSkgaXMgbm90IG9wdGlvbmFsLCBhIHJlcXVpcmVkIGFyZyBpcyBtaXNzaW5nXHJcbiAgICBmb3IgKHZhciBpIGluIGFyZ0xpc3QpIHtcclxuICAgICAgY29uc3QgYXJnID0gYXJnTGlzdFtpXTtcclxuICAgICAgY29uc3QgbXNnID0gY2hlY2tUeXBlcyhhcmcsIG9iai5hcmdzW2ldLnN0cnVjdHVyZSwgZmFsc2UpO1xyXG4gICAgICBpZiAobXNnKSBtZXRob2RFcnJvcihtZXRob2QsIGksIG1zZyk7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqLmFyZ3NbYXJnTGlzdC5sZW5ndGhdICYmICFvYmouYXJnc1thcmdMaXN0Lmxlbmd0aF0ub3B0aW9uYWwpIHtcclxuICAgICAgbWV0aG9kRXJyb3IobWV0aG9kLCBhcmdMaXN0Lmxlbmd0aCwgbnVsbCwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGNoZWNrUHJvcChwcm9wLCB2YWwpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBwcm9wZXJ0aWVzW3Byb3BdO1xyXG4gICAgY29uc3QgbXNnID0gY2hlY2tUeXBlcyh2YWwsIGl0ZW0uc3RydWN0dXJlLCBmYWxzZSk7XHJcbiAgICBpZiAobXNnKSB7XHJcbiAgICAgIHByb3BFcnJvcihwcm9wLCAncHJvcGVydHkg4oCYJyArIHByb3AgKyAn4oCZIG11c3QgYmUgJyArIGNvbXB1dGVUeXBlTXNnKGl0ZW0uc3RydWN0dXJlLCBpdGVtLnNoYXBlKSArICcgYnV0IGl0JyArIG1zZywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjaGVja1R5cGVzKHZhbCwgc3RydWN0dXJlLCBwbHVyYWwpIHtcclxuICAgIGxldCBtc2c7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cnVjdHVyZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB0eXBlT2JqID0gc3RydWN0dXJlW2ldO1xyXG4gICAgICBjb25zdCB0eXBlID0gdHlwZU9iai50eXBlO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdHlwZSA9PSAnYm9vbGVhbicgJiYgdHlwZW9mIHZhbCA9PSAnYm9vbGVhbicgfHxcclxuICAgICAgICB0eXBlID09ICd0cnVlJyAmJiB2YWwgPT09IHRydWUgfHxcclxuICAgICAgICB0eXBlID09ICdmYWxzZScgJiYgdmFsID09PSBmYWxzZSB8fFxyXG4gICAgICAgIHR5cGUgPT0gJ2FycmF5JyAmJiBBcnJheS5pc0FycmF5KHZhbCkgfHxcclxuICAgICAgICB0eXBlID09ICdvYmplY3QnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpID09ICdbb2JqZWN0IE9iamVjdF0nIHx8XHJcbiAgICAgICAgdHlwZSA9PSAnbnVtYmVyJyAmJiB0eXBlb2YgdmFsID09ICdudW1iZXInICYmICFwb2x5SXNOYU4odmFsKSB8fFxyXG4gICAgICAgIHR5cGUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdmFsID09ICdmdW5jdGlvbicgfHxcclxuICAgICAgICB0eXBlID09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWwgPT0gJ3N0cmluZydcclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gJ2FycmF5Jykge1xyXG4gICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCB2YWwubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9IGNoZWNrVHlwZXModmFsW25dLCB0eXBlT2JqLnN0cnVjdHVyZSwgdHJ1ZSkpIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIHZhbCkge1xyXG4gICAgICAgICAgICBpZiAobXNnID0gY2hlY2tUeXBlcyh2YWxba2V5XSwgdHlwZU9iai5zdHJ1Y3R1cmUsIHRydWUpKSBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1zZykgcmV0dXJuIG1zZztcclxuICAgICAgICBpZiAobXNnID0gY2hlY2tDb25kaXRpb25zKHR5cGVPYmouY29uZGl0aW9ucywgdmFsKSkgYnJlYWs7XHJcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBtc2cgPyAnIGlzICcgKyBtc2cgOiAocGx1cmFsID8gJ3MgdmFsdWVzIGFyZSAnIDogJyBpcyAnKSArIHR5cGVNc2codmFsLCB0cnVlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0NvbmRpdGlvbnMoY29uZGl0aW9ucywgdmFsKSB7XHJcbiAgICAgIGlmIChjb25kaXRpb25zKSB7XHJcbiAgICAgICAgaWYgKGNvbmRpdGlvbnMubm9ubmVnYXRpdmUgJiYgdmFsIDwgMCkge1xyXG4gICAgICAgICAgcmV0dXJuICdhIG5lZ2F0aXZlIG51bWJlcic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25kaXRpb25zLmludGVnZXIgJiYgdmFsICUgMSAhPT0gMCkge1xyXG4gICAgICAgICAgcmV0dXJuICdhIGZsb2F0aW5nIHBvaW50IG51bWJlcic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25kaXRpb25zLmZpbGxlZCAmJiB2YWwudHJpbSgpID09PSAnJykge1xyXG4gICAgICAgICAgcmV0dXJuICdhbiBlbXB0eSBzdHJpbmcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZGl0aW9ucy5rZXl3b3JkcyAmJiBjb25kaXRpb25zLmtleXdvcmRzLmluZGV4T2YodmFsKSA9PSAtMSkge1xyXG4gICAgICAgICAgcmV0dXJuICdhIGRpZmZlcmVudCBzdHJpbmcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZGl0aW9ucy53b3JkQ2hhciAmJiAhcG9seUlzTmFOKE51bWJlcih2YWwpKSkge1xyXG4gICAgICAgICAgcmV0dXJuICdhIHB1cmUgbnVtYmVyIHN0cmluZyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb25kaXRpb25zLmxlbmd0aCAmJiB2YWwubGVuZ3RoICE9PSBjb25kaXRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgcmV0dXJuICh0eXBlID09ICdhcnJheScgPyAnYW4gJyA6ICdhICcpICsgdHlwZSArICcgb2YgbGVuZ3RoICcgKyB2YWwubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9Db21wdXRpbmcgYW4gYXV0b21hdGVkIGVycm9yIG1lc3NhZ2UgcmVnYXJkaW5nIHRoZSBwcm9wZXJ0eSdzIHR5cGVzIGFuZCBjb25kaXRpb25zXHJcbiAgZnVuY3Rpb24gY29tcHV0ZVR5cGVNc2coc3RydWN0LCBzaGFwZSwgcGx1cmFsLCBkZWVwKSB7XHJcbiAgICBsZXQgbXNnID0gJyc7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cnVjdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB0eXBlID0gc3RydWN0W2ldLnR5cGU7XHJcbiAgICAgIGNvbnN0IGNvbmQgPSBzdHJ1Y3RbaV0uY29uZGl0aW9ucztcclxuICAgICAgaWYgKG1zZykgbXNnICs9ICcgb3IgJztcclxuXHJcbiAgICAgIGlmICh0eXBlID09ICdudW1iZXInKSB7XHJcbiAgICAgICAgY29uc3Qgbm9ubmVnYXRpdmUgPSBjb25kICYmIGNvbmQubm9ubmVnYXRpdmU7XHJcbiAgICAgICAgY29uc3QgaXNJbnQgPSBjb25kICYmIGNvbmQuaW50ZWdlcjtcclxuXHJcbiAgICAgICAgaWYgKG5vbm5lZ2F0aXZlKSB7XHJcbiAgICAgICAgICBpZiAoIXBsdXJhbCkgbXNnICs9ICdhICc7XHJcbiAgICAgICAgICBtc2cgKz0gJ25vbi1uZWdhdGl2ZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0ludCAmJiAhcGx1cmFsKSB7XHJcbiAgICAgICAgICBtc2cgKz0gJ2FuJztcclxuICAgICAgICB9IGVsc2UgbXNnICs9ICdhbnknO1xyXG4gICAgICAgIG1zZyArPSAnICcgKyAoaXNJbnQgPyAnaW50ZWdlcicgOiAnbnVtYmVyJyk7XHJcbiAgICAgICAgaWYgKHBsdXJhbCkgbXNnICs9ICdzJztcclxuICAgICAgfVxyXG5cclxuICAgICAgZWxzZSBpZiAodHlwZSA9PSAnYXJyYXknKSB7XHJcbiAgICAgICAgY29uc3QgbGVuID0gY29uZCAmJiBjb25kLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBtc2dSZXMgPSBjb21wdXRlVHlwZU1zZyhzdHJ1Y3RbaV0uc3RydWN0dXJlLCBmYWxzZSwgbGVuICE9PSAxLCB0cnVlKTtcclxuXHJcbiAgICAgICAgaWYgKCFwbHVyYWwpIG1zZyArPSAnYSc7XHJcbiAgICAgICAgaWYgKGRlZXApIHtcclxuICAgICAgICAgIG1zZyArPSBtc2dSZXM7XHJcbiAgICAgICAgfSBlbHNlIGlmICghcGx1cmFsKSB7XHJcbiAgICAgICAgICBtc2cgKz0gJ24nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtc2cgKz0gJyBhcnJheSc7XHJcbiAgICAgICAgaWYgKHBsdXJhbCkgbXNnICs9ICdzJztcclxuICAgICAgICBpZiAobGVuKSBtc2cgKz0gJyBvZiBsZW5ndGggJyArIGxlbjtcclxuICAgICAgICBpZiAoIWRlZXApIG1zZyArPSAnIHdpdGggJyArIG1zZ1JlcyArICcgYXMgdmFsdWVzJztcclxuICAgICAgfVxyXG5cclxuICAgICAgZWxzZSBpZiAodHlwZSA9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIG1zZyArPSAnYW4gb2JqZWN0IHdpdGggJyArIGNvbXB1dGVUeXBlTXNnKHN0cnVjdFtpXS5zdHJ1Y3R1cmUsIGZhbHNlLCB0cnVlLCB0cnVlKSArICcgYXMgdmFsdWVzJztcclxuICAgICAgfVxyXG5cclxuICAgICAgZWxzZSBpZiAodHlwZSA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgaWYgKCFkZWVwKSBtc2cgKz0gJ2EgJztcclxuICAgICAgICBtc2cgKz0gJ2Z1bmN0aW9uIHJlZmVyZW5jZSc7XHJcbiAgICAgICAgaWYgKCFkZWVwICYmIHBsdXJhbCkgbXNnICs9ICdzJztcclxuICAgICAgfVxyXG5cclxuICAgICAgZWxzZSBpZiAodHlwZSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlmIChjb25kICYmIGNvbmQua2V5d29yZHMpIHtcclxuICAgICAgICAgIGlmIChjb25kLmtleXdvcmRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgbXNnICs9ICdvbmUgb2YgdGhlIGtleXdvcmRzJztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1zZyArPSAndGhlIGtleXdvcmQnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uZC5rZXl3b3Jkcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgbiwgYXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChuICE9IDAgJiYgbiA9PSBhcnIubGVuZ3RoIC0gMSkgbXNnICs9ICcgb3InO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChuICE9IDApIG1zZyArPSAnLCc7XHJcbiAgICAgICAgICAgIG1zZyArPSAnIFwiJyArIHZhbCArICdcIic7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaWYgKCFkZWVwKSBtc2cgKz0gJ2EgJztcclxuICAgICAgICAgIGlmIChjb25kICYmIGNvbmQuZmlsbGVkKSBtc2cgKz0gJ25vbi1lbXB0eSAnO1xyXG4gICAgICAgICAgaWYgKGNvbmQgJiYgY29uZC53b3JkQ2hhcikgbXNnICs9ICdub24tbnVtYmVyICc7XHJcbiAgICAgICAgICBtc2cgKz0gJ3N0cmluZyc7XHJcbiAgICAgICAgICBpZiAoIWRlZXAgJiYgcGx1cmFsKSBtc2cgKz0gJ3MnO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgZWxzZSBpZiAodHlwZSA9PSAnYm9vbGVhbicpIHtcclxuICAgICAgICBpZiAoIWRlZXApIG1zZyArPSAnYSAnO1xyXG4gICAgICAgIG1zZyArPSAnYm9vbGVhbic7XHJcbiAgICAgICAgaWYgKCFkZWVwICYmIHBsdXJhbCkgbXNnICs9ICdzJztcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICh0eXBlID09ICd0cnVlJyB8fCB0eXBlID09ICdmYWxzZScpIHtcclxuICAgICAgICBtc2cgKz0gdHlwZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNoYXBlKSB7XHJcbiAgICAgICAgbXNnICs9ICcgKCcgKyBzaGFwZSArICcpJztcclxuICAgICAgICBzaGFwZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1zZztcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==