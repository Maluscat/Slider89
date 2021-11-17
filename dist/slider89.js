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
  //TODO: don't explicitly track index 0. It works in all my tests but especially on APIs like these, browsers and operating systems vary strongly
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

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVyODkuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7QUNUQSxvQ0FBb0Msa0JBQWtCLFlBQVksWUFBWSwrQkFBK0Isa0NBQWtDLGFBQWEsV0FBVyxlQUFlLGtCQUFrQixXQUFXLFlBQVksK0JBQStCLGVBQWUsa0NBQWtDLFlBQVksV0FBVyxrQkFBa0IseUJBQXlCLHNCQUFzQixxQkFBcUIsaUJBQWlCLG9CQUFvQjtBQUNqYzs7Ozs7O1VDRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05hO0FBQ0U7QUFDZjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsa0JBQWtCO0FBQ2xCO0FBQ0Esd0JBQXdCO0FBQ3hCLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxpQkFBaUIsbUJBQU8sQ0FBQyxzREFBc0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLGNBQWM7QUFDZDtBQUNBLFNBQVM7QUFDVCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsV0FBVztBQUMzQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxXQUFXO0FBQzNDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHVCQUF1QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsZUFBZTtBQUMvQztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxVQUFVO0FBQzFDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxVQUFVO0FBQ1Y7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsVUFBVTtBQUNWO0FBQ0E7QUFDQSxlQUFlLHVCQUF1QjtBQUN0QyxLQUFLO0FBQ0w7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxZQUFZO0FBQ1osU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVCQUF1QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViwwQkFBMEIsaUJBQWlCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0Esd0JBQXdCLHNCQUFzQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDZCQUE2QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDZCQUE2QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixhQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHFCQUFxQjtBQUNsQztBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixnQkFBZ0I7QUFDMUM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL2RlZmF1bHQtc3R5bGVzLmNzcyIsIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vU2xpZGVyODkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL1NsaWRlcjg5Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNsaWRlcjg5XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlNsaWRlcjg5XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBbIFwiLnNsODktdHJhY2t7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MjAwcHg7aGVpZ2h0OjI1cHg7YmFja2dyb3VuZC1jb2xvcjpoc2woMCwwJSwxOCUpO1wiLFwiLnNsaWRlcjg5LnZlcnRpY2FsIC5zbDg5LXRyYWNre2hlaWdodDoyMDBweDt3aWR0aDoyNXB4O1wiLFwiLnNsODktdGh1bWJ7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MTZweDtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOmhzbCgwLDAlLDI4JSk7Y3Vyc29yOnBvaW50ZXI7XCIsXCIuc2xpZGVyODkudmVydGljYWwgLnNsODktdGh1bWJ7aGVpZ2h0OjE2cHg7d2lkdGg6MTAwJTtcIixcIi5zbDg5LW5vc2VsZWN0ey13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtwb2ludGVyLWV2ZW50czpub25lO1wiIF1cbiAgIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNsaWRlcjg5KHRhcmdldCwgY29uZmlnLCByZXBsYWNlKSB7XHJcbiAgaWYgKCF0YXJnZXQpIHtcclxuICAgIGVycm9yKCdubyBmaXJzdCBhcmd1bWVudCBoYXMgYmVlbiBzdXBwbGllZC4gSXQgbmVlZHMgdG8gYmUgdGhlIERPTSB0YXJnZXQgbm9kZSBmb3IgdGhlIHNsaWRlcicsICdjb25zdHJ1Y3RvcicsIHRydWUpO1xyXG4gIH0gZWxzZSBpZiAoIXRhcmdldC5ub2RlVHlwZSB8fCB0YXJnZXQubm9kZVR5cGUgIT0gMSkge1xyXG4gICAgZXJyb3IoJ3RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgdmFsaWQgRE9NIG5vZGUgdGhlIHNsaWRlciB3aWxsIGJlIHBsYWNlZCBpbnRvICcgKyB0eXBlTXNnKHRhcmdldCksICdjb25zdHJ1Y3RvcicsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGNvbmZpZyA9PSB1bmRlZmluZWQgfHwgY29uZmlnID09PSBmYWxzZSkge1xyXG4gICAgY29uZmlnID0ge307XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnICE9ICdvYmplY3QnIHx8IEFycmF5LmlzQXJyYXkoY29uZmlnKSkge1xyXG4gICAgZXJyb3IoJ3RoZSBvcHRpb25hbCBzZWNvbmQgYXJndW1lbnQgbmVlZHMgdG8gYmUgYW4gb2JqZWN0IGZvciBjb25maWd1cmF0aW9uICcgKyB0eXBlTXNnKGNvbmZpZyksICdjb25zdHJ1Y3RvcicsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgY29uc3QgZXZlbnRUeXBlcyA9IFtcclxuICAgICdzdGFydCcsXHJcbiAgICAnbW92ZScsXHJcbiAgICAnZW5kJyxcclxuICAgICdjaGFuZ2U6JHByb3BlcnR5J1xyXG4gIF07XHJcblxyXG4gIGxldCBpbml0aWFsID0gZmFsc2U7XHJcbiAgbGV0IGFjdGl2ZVRodW1iO1xyXG4gIGxldCBhY3RpdmVUb3VjaElEO1xyXG4gIGxldCBtb3VzZURvd25Qb3M7XHJcbiAgbGV0IGV2ZW50SUQgPSAwO1xyXG4gIGxldCBzdHJ1Y3R1cmVSZ3g7IC8vUG9pbnRlciB0byBgcmd4YCBpbiBwYXJzZVN0cnVjdHVyZVxyXG4gIGxldCB0cmFja1N0eWxlOyAvL1RoZSBsaXZlIGNvbXB1dGVkIHN0eWxlIG9mIHZhbHMubm9kZS50cmFja1xyXG4gIGNvbnN0IHN0cnVjdHVyZVZhcnMgPSB7fTtcclxuICBjb25zdCBldmVudExpc3QgPSB7fTsgLy9TdG9yaW5nIGV2ZW50IGRhdGEgKG1vc3Qgbm90YWJseSB0aGUgaWRlbnRpZmllcikgZm9yIGV2ZW50IHJlbW92YWJpbGl0eVxyXG4gIGNvbnN0IHZhbHMgPSB7fTsgLy9ob2xkaW5nIGV2ZXJ5IHByb3BlcnR5IG9mIHRoZSBjbGFzc1xyXG5cclxuICAvL2AkYCBpcyBhIGZpeGVkIGVuZHBvaW50IGZvciBhbGwgcHJvcGVydGllcywgb25seSB0byBiZSBhY2Nlc3NlZCBieSBhIGJ1YmJsaW5nIGdldHRlci9zZXR0ZXJcclxuICAvL09iamVjdC5kZWZpbmVQcm9wZXJ0eSBpcyB1c2VkIGZvciBub24tZW51bWVyYWJpbGl0eSBvZiBgJGAgaW5zaWRlIGB2YWxzYFxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWxzLCAnJCcsIHtcclxuICAgIHZhbHVlOiB7fVxyXG4gIH0pO1xyXG5cclxuICAvL1N0eWxlIHJ1bGUgc3RyaW5ncyB3aGljaCB3aWxsIGJlIGluc2VydGVkIGludG8gYSBuZXdseSBjcmVhdGVkIHN0eWxlc2hlZXRcclxuICBjb25zdCBzdHlsZXMgPSByZXF1aXJlKCcuL2RlZmF1bHQtc3R5bGVzLmNzcycpO1xyXG5cclxuICBjb25zdCBtZXRob2RzID0ge1xyXG4gICAgYWRkRXZlbnQ6IHtcclxuICAgICAgZnVuY3Rpb246IGFkZEV2ZW50LFxyXG4gICAgICBhcmdzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ2V2ZW50IHR5cGUnLFxyXG4gICAgICAgICAgc3RydWN0dXJlOiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdldmVudCBmdW5jdGlvbicsXHJcbiAgICAgICAgICBzdHJ1Y3R1cmU6IFt7XHJcbiAgICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcclxuICAgICAgICAgIH1dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnZXZlbnQgbmFtZXNwYWNlJyxcclxuICAgICAgICAgIG9wdGlvbmFsOiB0cnVlLFxyXG4gICAgICAgICAgc3RydWN0dXJlOiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgICAgY29uZGl0aW9uczoge1xyXG4gICAgICAgICAgICAgIGZpbGxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICB3b3JkQ2hhcjogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XVxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuICAgIHJlbW92ZUV2ZW50OiB7XHJcbiAgICAgIGZ1bmN0aW9uOiByZW1vdmVFdmVudCxcclxuICAgICAgYXJnczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdldmVudCBpZGVudGlmaWVyL25hbWVzcGFjZScsXHJcbiAgICAgICAgICBzdHJ1Y3R1cmU6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxyXG4gICAgICAgICAgICAgIGNvbmRpdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIG5vbm5lZ2F0aXZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaW50ZWdlcjogdHJ1ZVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgICAgIGNvbmRpdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIGZpbGxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHdvcmRDaGFyOiB0cnVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcHJvcGVydGllcyA9IHtcclxuICAgIHJhbmdlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFswLCAxMDBdLFxyXG4gICAgICBzdHJ1Y3R1cmU6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnYXJyYXknLFxyXG4gICAgICAgICAgY29uZGl0aW9uczoge1xyXG4gICAgICAgICAgICBsZW5ndGg6IDJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzdHJ1Y3R1cmU6IFtcclxuICAgICAgICAgICAgeyB0eXBlOiAnbnVtYmVyJyB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHR5cGU6ICdib29sZWFuJyB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHNoYXBlOiAnW3N0YXJ0VmFsdWUsIGVuZFZhbHVlXScsXHJcbiAgICAgIHNldHRlcjogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbFswXSA9PT0gdmFsWzFdKSB7XHJcbiAgICAgICAgICBwcm9wRXJyb3IoJ3JhbmdlJywgJ3RoZSBnaXZlbiByYW5nZSBvZiBbJyArIHZhbC5qb2luKCcsICcpICsgJ10gZGVmaW5lcyB0aGUgc2FtZSB2YWx1ZSBmb3IgYm90aCByYW5nZSBzdGFydCBhbmQgZW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW5pdGlhbCkge1xyXG4gICAgICAgICAgY29tcHV0ZVJhdGlvRGlzdGFuY2Uoe3JhbmdlOiB2YWx9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB2YWx1ZToge1xyXG4gICAgICBkZWZhdWx0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdmFscy5yYW5nZVswXTtcclxuICAgICAgfSxcclxuICAgICAgc3RydWN0dXJlOiBbe1xyXG4gICAgICAgIHR5cGU6ICdudW1iZXInXHJcbiAgICAgIH1dLFxyXG4gICAgICBzZXR0ZXI6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHZhbHMucmFuZ2VbMF0gPiB2YWxzLnJhbmdlWzFdICYmICh2YWwgPiB2YWxzLnJhbmdlWzBdIHx8IHZhbCA8IHZhbHMucmFuZ2VbMV0pIHx8XHJcbiAgICAgICAgICB2YWxzLnJhbmdlWzFdID4gdmFscy5yYW5nZVswXSAmJiAodmFsIDwgdmFscy5yYW5nZVswXSB8fCB2YWwgPiB2YWxzLnJhbmdlWzFdKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY29uc3QgcmFuZ2VTdHIgPSAnWycgKyB2YWxzLnJhbmdlLmpvaW4oJywgJykgKyAnXSc7XHJcbiAgICAgICAgICBwcm9wRXJyb3IoJ3ZhbHVlJywgJ3RoZSBnaXZlbiB2YWx1ZSBvZiAnICsgdmFsICsgJyBleGNlZWRzIHRoZSBjdXJyZW50bHkgc2V0IHJhbmdlIG9mICcgKyByYW5nZVN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW5pdGlhbCkge1xyXG4gICAgICAgICAgY29tcHV0ZVJhdGlvRGlzdGFuY2Uoe3ZhbHVlOiB2YWx9KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZ2V0dGVyOiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICByZXR1cm4gdmFscy5wcmVjaXNpb24gIT09IGZhbHNlID8gTnVtYmVyKHZhbC50b0ZpeGVkKHZhbHMucHJlY2lzaW9uKSkgOiB2YWw7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwcmVjaXNpb246IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxyXG4gICAgICAgICAgY29uZGl0aW9uczoge1xyXG4gICAgICAgICAgICBub25uZWdhdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgaW50ZWdlcjogdHJ1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0eXBlOiAnZmFsc2UnIH1cclxuICAgICAgXSxcclxuICAgICAgc2V0dGVyOiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICBpZiAodmFsICE9PSBmYWxzZSkge1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWxzLnJhbmdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChOdW1iZXIodmFscy5yYW5nZVtpXS50b0ZpeGVkKHZhbCkpICE9PSB2YWxzLnJhbmdlW2ldKSB7XHJcbiAgICAgICAgICAgICAgcHJvcEVycm9yKCdyYW5nZScsICd0aGUgZ2l2ZW4gcmFuZ2UgJyArIFsnc3RhcnQnLCAnZW5kJ11baV0gKyAnIG9mIGAnICsgdmFscy5yYW5nZVtpXSArICdgIGV4Y2VlZHMgdGhlIGN1cnJlbnRseSBzZXQgcHJlY2lzaW9uIG9mICcgKyB2YWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW5pdGlhbCkge1xyXG4gICAgICAgICAgY29tcHV0ZVJhdGlvRGlzdGFuY2Uoe3ByZWNpc2lvbjogdmFsfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RlcDoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ251bWJlcicsXHJcbiAgICAgICAgICBjb25kaXRpb25zOiB7XHJcbiAgICAgICAgICAgIG5vbm5lZ2F0aXZlOiB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHR5cGU6ICdmYWxzZScgfVxyXG4gICAgICBdLFxyXG4gICAgICBzZXR0ZXI6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWxzLnByZWNpc2lvbiAhPT0gZmFsc2UgJiYgdmFsICE9PSBmYWxzZSAmJiBOdW1iZXIodmFsLnRvRml4ZWQodmFscy5wcmVjaXNpb24pKSAhPT0gdmFsKSB7XHJcbiAgICAgICAgICBwcm9wRXJyb3IoJ3N0ZXAnLCAndGhlIGdpdmVuIHZhbHVlIG9mICcgKyB2YWwgKyAnIGV4Y2VlZHMgdGhlIGN1cnJlbnRseSBzZXQgcHJlY2lzaW9uIG9mICcgKyB2YWxzLnByZWNpc2lvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaW5pdGlhbCkge1xyXG4gICAgICAgICAgY29tcHV0ZVJhdGlvRGlzdGFuY2Uoe3N0ZXA6IHZhbH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3RydWN0dXJlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzdHJ1Y3R1cmU6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcclxuICAgICAgICAgIGNvbmRpdGlvbnM6IHtcclxuICAgICAgICAgICAgZmlsbGVkOiB0cnVlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHR5cGU6ICdmYWxzZScgfVxyXG4gICAgICBdLFxyXG4gICAgICBpbml0aWFsOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgbm9kZToge1xyXG4gICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgc3RhdGljOiB0cnVlXHJcbiAgICB9LFxyXG4gICAgb3JpZW50YXRpb246IHtcclxuICAgICAgZGVmYXVsdDogJ2hvcml6b250YWwnLFxyXG4gICAgICBzdHJ1Y3R1cmU6IFt7XHJcbiAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgY29uZGl0aW9uczoge1xyXG4gICAgICAgICAga2V5d29yZHM6IFtcclxuICAgICAgICAgICAgJ2hvcml6b250YWwnLFxyXG4gICAgICAgICAgICAndmVydGljYWwnXHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICB9XVxyXG4gICAgfSxcclxuICAgIGNsYXNzTGlzdDoge1xyXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ29iamVjdCcsXHJcbiAgICAgICAgICBzdHJ1Y3R1cmU6IFt7XHJcbiAgICAgICAgICAgIHR5cGU6ICdhcnJheScsXHJcbiAgICAgICAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgICAgICAgIHsgdHlwZTogJ3N0cmluZycgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0eXBlOiAnZmFsc2UnIH1cclxuICAgICAgXSxcclxuICAgICAgaW5pdGlhbDogdHJ1ZSxcclxuICAgICAgc2hhcGU6ICd7bm9kZU5hbWU6IFsuLi5jbGFzc2VzXX0nXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IHt9LFxyXG4gICAgICBzdHJ1Y3R1cmU6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcclxuICAgICAgICAgIHN0cnVjdHVyZTogW3tcclxuICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcclxuICAgICAgICAgICAgc3RydWN0dXJlOiBbe1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbidcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICAgIH1dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHR5cGU6ICdmYWxzZScgfVxyXG4gICAgICBdLFxyXG4gICAgICBpbml0aWFsOiB0cnVlLFxyXG4gICAgICBzZXR0ZXI6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgIGNvbnN0IGVyclR5cGVzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgZm9yICh2YXIgZXZlbnRUeXBlIGluIHZhbCkge1xyXG4gICAgICAgICAgaWYgKCFjaGVja0V2ZW50VHlwZShldmVudFR5cGUpKSBlcnJUeXBlcy5wdXNoKGV2ZW50VHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlcnJUeXBlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBjb25zdCBtc2cgPVxyXG4gICAgICAgICAgICAndGhlIGdpdmVuIG9iamVjdCBjb250YWlucyBpdGVtcyB3aGljaCBhcmUgbm8gdmFsaWQgZXZlbnQgdHlwZXM6JyArIGVubGlzdEFycmF5KGVyclR5cGVzKSArXHJcbiAgICAgICAgICAgICdBdmFpbGFibGUgZXZlbnQgdHlwZXMgYXJlOicgKyBlbmxpc3RBcnJheShldmVudFR5cGVzKTtcclxuICAgICAgICAgIHByb3BFcnJvcignZXZlbnRzJywgbXNnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBpbml0aWFsID0gdHJ1ZTtcclxuICAvL0luaXRpYWxpemluZyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXHJcbiAgKGZ1bmN0aW9uKCkge1xyXG4gICAgZm9yICh2YXIgXyBpbiBwcm9wZXJ0aWVzKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBfO1xyXG4gICAgICBjb25zdCBwcm9wID0gcHJvcGVydGllc1tpdGVtXTtcclxuXHJcbiAgICAgIC8qXHJcbiAgICAgICAgQ2FsbGluZyBPYmplY3QuZGVmaW5lUHJvcGVydHkgb24gdGhlIGNsYXNzIGluc3RhbmNlIChgdGhpc2ApIGlzIG5lY2Vzc2FyeSB0byBiZSBhYmxlIHRvIGNyZWF0ZSBtdWx0aXBsZSBpbnN0YW5jZXNcclxuICAgICAgICBhcyBDbGFzcy5wcm90b3R5cGUgYXMgdGFyZ2V0IHdpbGwgaW5oZXJpdCB0aGUgZGVmaW5lZCBwcm9wZXJ0eSB0byBhbGwgaW5zdGFuY2VzXHJcbiAgICAgICAgYW5kIGEgbmV3IGNhbGwgb2YgZGVmaW5lUHJvcGVydHkgKHdoZW4gY3JlYXRpbmcgYSBuZXcgaW5zdGFuY2UpIHdvdWxkIHRocm93IGFuIGVycm9yIGZvciBkZWZpbmluZyB0aGUgc2FtZSBwcm9wZXJ0eSB0d2ljZVxyXG4gICAgICAqL1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhhdCwgaXRlbSwge1xyXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgICBpZiAoIXByb3Auc3RhdGljKSB7XHJcbiAgICAgICAgICAgIGlmICghcHJvcC5pbml0aWFsIHx8IGluaXRpYWwpIHtcclxuICAgICAgICAgICAgICBjaGVja1Byb3AoaXRlbSwgdmFsKTtcclxuICAgICAgICAgICAgICBsZXQgc2V0dGVyUmVzdWx0O1xyXG4gICAgICAgICAgICAgIGlmIChwcm9wLnNldHRlcikge1xyXG4gICAgICAgICAgICAgICAgc2V0dGVyUmVzdWx0ID0gKHByb3Auc2V0dGVyKSh2YWwpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAoc2V0dGVyUmVzdWx0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhbHNbaXRlbV0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgZXJyb3IoJ3Byb3BlcnR5IOKAmCcgKyBpdGVtICsgJ+KAmSBtYXkgb25seSBiZSBzZXQgYXQgaW5pdCB0aW1lIGJ1dCBpdCB3YXMganVzdCBzZXQgd2l0aCB0aGUgdmFsdWUg4oCYJyArIHZhbCArICfigJknKTtcclxuICAgICAgICAgIH0gZWxzZSBlcnJvcigncHJvcGVydHkg4oCYJyArIGl0ZW0gKyAn4oCZIG1heSBvbmx5IGJlIHJlYWQgZnJvbSBidXQgaXQgd2FzIGp1c3Qgc2V0IHdpdGggdGhlIHZhbHVlIOKAmCcgKyB2YWwgKyAn4oCZJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgY29uc3QgdmFsID0gcHJvcC5nZXR0ZXIgPyBwcm9wLmdldHRlcih2YWxzW2l0ZW1dKSA6IHZhbHNbaXRlbV07XHJcbiAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkZWZpbmVEZWVwUHJvcGVydHkodmFscywgaXRlbSwgdmFscy4kKTtcclxuXHJcbiAgICAgIGlmIChpdGVtIGluIGNvbmZpZykge1xyXG4gICAgICAgIHRoYXRbaXRlbV0gPSBjb25maWdbaXRlbV07XHJcbiAgICAgICAgZGVsZXRlIGNvbmZpZ1tpdGVtXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBkZWYgPSBwcm9wLmRlZmF1bHQ7XHJcbiAgICAgICAgdmFsc1tpdGVtXSA9IHR5cGVvZiBkZWYgPT0gJ2Z1bmN0aW9uJyA/IGRlZigpIDogZGVmO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgXyBpbiBjb25maWcpIHtcclxuICAgICAgY29uc3QgaXRlbSA9IF87XHJcblxyXG4gICAgICBpZiAoaXRlbVswXSA9PSAnXycpIHtcclxuICAgICAgICBkZWZpbmVEZWVwUHJvcGVydHkodGhhdCwgaXRlbSwgdmFscyk7XHJcbiAgICAgICAgdmFsc1tpdGVtXSA9IGNvbmZpZ1tpdGVtXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlcnJvcign4oCYJyArIGl0ZW0gKyAn4oCZIGlzIG5vdCBhIHZhbGlkIHByb3BlcnR5IG5hbWUuIENoZWNrIGl0cyBzcGVsbGluZyBvciBwcmVmaXggaXQgd2l0aCBhbiB1bmRlcnNjb3JlIHRvIHVzZSBpdCBhcyBjdXN0b20gcHJvcGVydHkgKOKAmF8nICsgaXRlbSArICfigJkpJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBfIGluIG1ldGhvZHMpIHtcclxuICAgICAgY29uc3QgaXRlbSA9IF87XHJcbiAgICAgIGNvbnN0IG1ldGhvZCA9IG1ldGhvZHNbaXRlbV07XHJcbiAgICAgIFNsaWRlcjg5LnByb3RvdHlwZVtpdGVtXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIG1ldGhvZC5hcmdzLmxlbmd0aCk7XHJcbiAgICAgICAgY2hlY2tNZXRob2QoaXRlbSwgYXJncyk7XHJcbiAgICAgICAgcmV0dXJuIG1ldGhvZC5mdW5jdGlvbi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pKCk7XHJcblxyXG4gIC8vQnVpbGRpbmcgdGhlIHNsaWRlciBlbGVtZW50XHJcbiAgKGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHZhbHMuc3RydWN0dXJlID09IGZhbHNlKSB7XHJcbiAgICAgIC8vSW4gY2FzZSBubyBjdXN0b20gc3RydWN0dXJlIGlzIGRlZmluZWQsIG1hbnVhbGx5IGJ1aWxkIHRoZSBub2RlIHRvIGVuc3VyZSBiZXN0IHBlcmZvcm1hbmNlIChwYXJzZVN0cnVjdHVyZSB0YWtlcyBhIHdoaWxlKVxyXG4gICAgICB2YWxzLm5vZGUuc2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHZhbHMubm9kZS50cmFjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB2YWxzLm5vZGUudGh1bWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgIHZhbHMubm9kZS50cmFjay5hcHBlbmRDaGlsZCh2YWxzLm5vZGUudGh1bWIpO1xyXG4gICAgICB2YWxzLm5vZGUuc2xpZGVyLmFwcGVuZENoaWxkKHZhbHMubm9kZS50cmFjayk7XHJcblxyXG4gICAgICBmb3IgKHZhciBlbGVtZW50IGluIHZhbHMubm9kZSlcclxuICAgICAgICBpZiAoZWxlbWVudCAhPSAnc2xpZGVyJykgdmFscy5ub2RlW2VsZW1lbnRdLmNsYXNzTGlzdC5hZGQoJ3NsODktJyArIGVsZW1lbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFscy5ub2RlID0gcGFyc2VTdHJ1Y3R1cmUodmFscy5zdHJ1Y3R1cmUpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgbm9kZSA9IHZhbHMubm9kZTtcclxuXHJcbiAgICBpZiAocmVwbGFjZSkge1xyXG4gICAgICBjb25zdCB0YXJnZXRBdHRyID0gdGFyZ2V0LmF0dHJpYnV0ZXM7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0QXR0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIG5vZGUuc2xpZGVyLnNldEF0dHJpYnV0ZSh0YXJnZXRBdHRyW2ldLm5hbWUsIHRhcmdldEF0dHJbaV0udmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBub2RlLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXI4OScpO1xyXG4gICAgaWYgKHZhbHMub3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJykgbm9kZS5zbGlkZXIuY2xhc3NMaXN0LmFkZCgndmVydGljYWwnKTtcclxuXHJcbiAgICBpZiAodmFscy5jbGFzc0xpc3QpIHtcclxuICAgICAgLy8gQWRkaW5nIHRoZSBzcGVjaWZpZWQgY2xhc3NlcyBhbmQgY29sbGVjdGluZyBhbGwgbm9uZXhpc3RlbnQgbm9kZXMgaW4gYGVyck5vZGVzYFxyXG4gICAgICBjb25zdCBlcnJOb2RlcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICBmb3IgKHZhciBrZXkgaW4gdmFscy5jbGFzc0xpc3QpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gdmFscy5jbGFzc0xpc3Rba2V5XTtcclxuICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChub2RlLCBrZXkpKSB7XHJcbiAgICAgICAgICBlcnJOb2Rlcy5wdXNoKGtleSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChlcnJOb2Rlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG5vZGVba2V5XS5jbGFzc0xpc3QuYWRkKGl0ZW1baV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoZXJyTm9kZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IG1zZyA9XHJcbiAgICAgICAgICBcInRoZSBnaXZlbiBvYmplY3QgY29udGFpbnMgaXRlbXMgd2hpY2ggYXJlbid0IG5vZGVzIG9mIHRoaXMgc2xpZGVyOlwiICsgZW5saXN0QXJyYXkoZXJyTm9kZXMpICtcclxuICAgICAgICAgIFwiRm9sbG93aW5nIG5vZGVzIGFyZSBwYXJ0IG9mIHRoaXMgc2xpZGVyJ3Mgbm9kZSBwb29sOlwiICsgZW5saXN0QXJyYXkoT2JqZWN0LmtleXMobm9kZSkpXHJcbiAgICAgICAgcHJvcEVycm9yKCdjbGFzc0xpc3QnLCBtc2cpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlU3R5bGVTaGVldCgpO1xyXG5cclxuICAgIGlmIChyZXBsYWNlKVxyXG4gICAgICB0YXJnZXQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobm9kZS5zbGlkZXIsIHRhcmdldCk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChub2RlLnNsaWRlcik7XHJcblxyXG4gICAgdHJhY2tTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZS50cmFjayk7XHJcblxyXG4gICAgY29tcHV0ZVJhdGlvRGlzdGFuY2UoKTtcclxuXHJcbiAgICBub2RlLnRodW1iLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaFN0YXJ0KTtcclxuICAgIG5vZGUudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc2xpZGVTdGFydCk7XHJcbiAgfSkoKTtcclxuXHJcbiAgaW5pdGlhbCA9IGZhbHNlO1xyXG5cclxuXHJcbiAgLy8gLS0tLS0tIENsYXNzIG1ldGhvZHMgLS0tLS0tXHJcbiAgZnVuY3Rpb24gYWRkRXZlbnQodHlwZSwgZm4sIG5hbWUpIHtcclxuICAgIGlmICghY2hlY2tFdmVudFR5cGUodHlwZSkpIHtcclxuICAgICAgZXJyb3IoJ3RoZSBzcGVjaWZpZWQgdHlwZSDigJgnICsgdHlwZSArICfigJkgaXMgbm90IGEgdmFsaWQgZXZlbnQgdHlwZS4gQXZhaWxhYmxlIHR5cGVzIGFyZTonICsgZW5saXN0QXJyYXkoZXZlbnRUeXBlcyksICdhZGRFdmVudCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWxzLmV2ZW50c1t0eXBlXSkpIHZhbHMuZXZlbnRzW3R5cGVdID0gbmV3IEFycmF5KCk7XHJcbiAgICB2YWxzLmV2ZW50c1t0eXBlXS5wdXNoKGZuKTtcclxuICAgIGNvbnN0IGtleSA9IG5hbWUgfHwgZXZlbnRJRDtcclxuICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgZm46IGZuXHJcbiAgICB9O1xyXG4gICAgaWYgKG5hbWUpIHtcclxuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGV2ZW50TGlzdFtrZXldKSkgZXZlbnRMaXN0W2tleV0gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgZXZlbnRMaXN0W2tleV0ucHVzaChvYmopO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZXZlbnRMaXN0W2tleV0gPSBvYmo7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmFtZSB8fCBldmVudElEKys7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHJlbW92ZUV2ZW50KGtleSkge1xyXG4gICAgY29uc3QgbGlzdEVudHJ5ID0gZXZlbnRMaXN0W2tleV07XHJcbiAgICBpZiAoIWxpc3RFbnRyeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgZGVsZXRlIGV2ZW50TGlzdFtrZXldO1xyXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkobGlzdEVudHJ5KSA/XHJcbiAgICAgIGxpc3RFbnRyeS5yZWR1Y2UoaGFuZGxlRXZlbnRzLCBuZXcgQXJyYXkoKSkgOlxyXG4gICAgICBoYW5kbGVFdmVudHMobmV3IEFycmF5KCksIGxpc3RFbnRyeSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlRXZlbnRzKGFjYywgZW50cnkpIHtcclxuICAgICAgY29uc3QgdHlwZUV2ZW50cyA9IHZhbHMuZXZlbnRzW2VudHJ5LnR5cGVdO1xyXG4gICAgICBjb25zdCBkZWxldGVkID0gdHlwZUV2ZW50cy5zcGxpY2UodHlwZUV2ZW50cy5pbmRleE9mKGVudHJ5LmZuKSwgMSlbMF07XHJcbiAgICAgIGlmICh0eXBlRXZlbnRzLmxlbmd0aCA9PT0gMCkgZGVsZXRlIHZhbHMuZXZlbnRzW2VudHJ5LnR5cGVdO1xyXG4gICAgICBhY2MucHVzaChkZWxldGVkKTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLSBIZWxwZXIgZnVuY3Rpb25zIC0tLS0tLVxyXG4gIGZ1bmN0aW9uIGVycm9yKG1zZywgdGFyZ2V0LCBhYm9ydCkge1xyXG4gICAgLy9UT0RPOiByZWZlciB0byBkb2NzXHJcbiAgICBtc2cgPSAnU2xpZGVyODknICsgKHRhcmdldCA/ICcgQCAnICsgdGFyZ2V0IDogJycpICsgJzogJyArIG1zZztcclxuICAgIGlmIChtc2dbbXNnLmxlbmd0aCAtIDFdICE9ICdcXG4nICYmIG1zZ1ttc2cubGVuZ3RoIC0gMV0gIT0gJy4nKSBtc2cgKz0gJy5cXG4nO1xyXG4gICAgaWYgKGluaXRpYWwgfHwgYWJvcnQpIG1zZyArPSAnQWJvcnRpbmcgdGhlIHNsaWRlciBjb25zdHJ1Y3Rpb24uJztcclxuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xyXG4gIH1cclxuICBmdW5jdGlvbiB0eXBlTXNnKHZhcmlhYmxlLCBub0ludHJvKSB7XHJcbiAgICBsZXQgbXNnID0gbm9JbnRybyA/ICcnIDogJ2J1dCBpdCBpcyAnO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFyaWFibGUpKVxyXG4gICAgICBtc2cgKz0gJ2FuIGFycmF5JztcclxuICAgIGVsc2UgaWYgKHBvbHlJc05hTih2YXJpYWJsZSkpXHJcbiAgICAgIG1zZyArPSAnTmFOJztcclxuICAgIGVsc2UgaWYgKHZhcmlhYmxlID09PSBudWxsKVxyXG4gICAgICBtc2cgKz0gJ251bGwnO1xyXG4gICAgZWxzZSBpZiAodHlwZW9mIHZhcmlhYmxlID09ICdib29sZWFuJylcclxuICAgICAgbXNnICs9IHZhcmlhYmxlO1xyXG4gICAgZWxzZVxyXG4gICAgICBtc2cgKz0gJ29mIHR5cGUgJyArIHR5cGVvZiB2YXJpYWJsZTtcclxuXHJcbiAgICByZXR1cm4gbXNnO1xyXG4gIH1cclxuICBmdW5jdGlvbiBlbmxpc3RBcnJheShhcnIpIHtcclxuICAgIHJldHVybiAnXFxuIC0gXCInICsgYXJyLmpvaW4oJ1wiXFxuIC0gXCInKSArICdcIlxcbic7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGNoZWNrRXZlbnRUeXBlKHR5cGUpIHtcclxuICAgIGlmICh0eXBlLmluZGV4T2YoJ2NoYW5nZTonKSA9PSAwKSB7XHJcbiAgICAgIC8vRWRnZSBjYXNlIGZvciAnY2hhbmdlOiRwcm9wZXJ0eSdcclxuICAgICAgY29uc3QgY3VzdG9tUHJvcCA9IHR5cGUuc2xpY2UoJ2NoYW5nZTonLmxlbmd0aCk7XHJcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHMsIGN1c3RvbVByb3ApKSB7XHJcbiAgICAgICAgZXJyb3IoXCLigJhcIiArIHR5cGUgKyBcIuKAmSByZWZlcnMgdG8g4oCYXCIgKyBjdXN0b21Qcm9wICsgXCLigJksIHdoaWNoIGlzbid0IGEgcmVjb2duaXplZCBwcm9wZXJ0eS4gQ2hlY2sgaXRzIHNwZWxsaW5nIGFuZCBiZSBhd2FyZSB0aGF0IGN1c3RvbSBwcm9wZXJ0aWVzIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWRcIiwgJ2FkZEV2ZW50Jyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlcy5pbmRleE9mKHR5cGUpID09IC0xKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8vTUROIFBvbHlmaWxsIEAgTnVtYmVyLmlzTmFOXHJcbiAgZnVuY3Rpb24gcG9seUlzTmFOKHZhbCkge1xyXG4gICAgcmV0dXJuIE51bWJlci5pc05hTiAmJiBOdW1iZXIuaXNOYU4odmFsKSB8fCAhTnVtYmVyLmlzTmFOICYmIHR5cGVvZiB2YWwgPT09ICdudW1iZXInICYmIHZhbCAhPT0gdmFsO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVmaW5lRGVlcFByb3BlcnR5KHRhcmdldCwgaXRlbSwgZW5kcG9pbnQpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGl0ZW0sIHtcclxuICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICBlbmRwb2ludFtpdGVtXSA9IHZhbDtcclxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cnVjdHVyZVZhcnMsIGl0ZW0pKSB7XHJcbiAgICAgICAgICB1cGRhdGVWYXJpYWJsZShpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpbml0aWFsKSBpbnZva2VFdmVudChbJ2NoYW5nZTonICsgaXRlbV0pO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBlbmRwb2ludFtpdGVtXTtcclxuICAgICAgfSxcclxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlVmFyaWFibGUocHJvcCkge1xyXG4gICAgICBmb3IgKHZhciBpIGluIHN0cnVjdHVyZVZhcnNbcHJvcF0pIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gc3RydWN0dXJlVmFyc1twcm9wXVtpXTtcclxuICAgICAgICBjb25zdCBzdHIgPSBpdGVtLnN0ci5yZXBsYWNlKHN0cnVjdHVyZVJneC52YXJpYWJsZSwgZnVuY3Rpb24obWF0Y2gsIHZhcmlhYmxlRGVsaW1pdCwgdmFyaWFibGUpIHtcclxuICAgICAgICAgIHJldHVybiB0aGF0W3ZhcmlhYmxlRGVsaW1pdCB8fCB2YXJpYWJsZV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGl0ZW0uYXR0cikge1xyXG4gICAgICAgICAgaXRlbS5ub2RlLnNldEF0dHJpYnV0ZShpdGVtLmF0dHIsIHN0cik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGl0ZW0ubm9kZS50ZXh0Q29udGVudCA9IHN0cjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLSBUaHVtYiBtb3ZpbmcgZnVuY3Rpb25zIC0tLS0tLVxyXG4gIGZ1bmN0aW9uIGdldFRyYWNrUGFkZGluZyhkaXJlY3Rpb24pIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHRyYWNrU3R5bGVbJ3BhZGRpbmcnICsgZGlyZWN0aW9uXSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdldERpc3RhbmNlKCkge1xyXG4gICAgY29uc3Qgc3R5bGUgPSB2YWxzLm5vZGUudGh1bWIuc3R5bGUudHJhbnNmb3JtO1xyXG4gICAgY29uc3QgdHJhbnNsYXRlU3RyID0gdmFscy5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnID8gJ3RyYW5zbGF0ZVkoJyA6ICd0cmFuc2xhdGVYKCc7XHJcbiAgICBjb25zdCBmaXJzdEJyYWNrZXQgPSBzdHlsZS5zbGljZShzdHlsZS5pbmRleE9mKHRyYW5zbGF0ZVN0cikgKyB0cmFuc2xhdGVTdHIubGVuZ3RoKTtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KGZpcnN0QnJhY2tldC5zbGljZSgwLCBmaXJzdEJyYWNrZXQuaW5kZXhPZignKScpKSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGdldEFic29sdXRlVHJhY2tTaXplKCkge1xyXG4gICAgaWYgKHZhbHMub3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICByZXR1cm4gKHZhbHMubm9kZS50cmFjay5jbGllbnRIZWlnaHQgLSBnZXRUcmFja1BhZGRpbmcoJ1RvcCcpIC0gZ2V0VHJhY2tQYWRkaW5nKCdCb3R0b20nKSkgLSB2YWxzLm5vZGUudGh1bWIuY2xpZW50SGVpZ2h0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICh2YWxzLm5vZGUudHJhY2suY2xpZW50V2lkdGggLSBnZXRUcmFja1BhZGRpbmcoJ0xlZnQnKSAtIGdldFRyYWNrUGFkZGluZygnUmlnaHQnKSkgLSB2YWxzLm5vZGUudGh1bWIuY2xpZW50V2lkdGg7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGNvbXB1dGVEaXN0YW5jZVZhbHVlKGRpc3RhbmNlLCBhYnNTaXplKSB7XHJcbiAgICBpZiAoYWJzU2l6ZSA9PSBudWxsKSBhYnNTaXplID0gZ2V0QWJzb2x1dGVUcmFja1NpemUoKTtcclxuICAgIHJldHVybiBkaXN0YW5jZSAvIGFic1NpemUgKiAodmFscy5yYW5nZVsxXSAtIHZhbHMucmFuZ2VbMF0pICsgdmFscy5yYW5nZVswXTtcclxuICB9XHJcbiAgZnVuY3Rpb24gbW92ZVRodW1iKGRpc3RhbmNlLCB1c2VUcmFuc2Zvcm0pIHtcclxuICAgIGlmICh1c2VUcmFuc2Zvcm0pIHtcclxuICAgICAgdmFscy5ub2RlLnRodW1iLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUnICsgKHZhbHMub3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJyA/ICdZJyA6ICdYJykgKyAnKCcgKyBkaXN0YW5jZSArICdweCknO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHZhbHMub3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJykge1xyXG4gICAgICAgIHZhciBwYWRkaW5nU3RhcnQgPSBnZXRUcmFja1BhZGRpbmcoJ1RvcCcpO1xyXG4gICAgICAgIHZhciBwYWRkaW5nRW5kID0gZ2V0VHJhY2tQYWRkaW5nKCdCb3R0b20nKTtcclxuICAgICAgICB2YXIgdGh1bWJEaW0gPSB2YWxzLm5vZGUudGh1bWIuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIHZhciBwb3NBbmNob3IgPSAndG9wJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgcGFkZGluZ1N0YXJ0ID0gZ2V0VHJhY2tQYWRkaW5nKCdMZWZ0Jyk7XHJcbiAgICAgICAgdmFyIHBhZGRpbmdFbmQgPSBnZXRUcmFja1BhZGRpbmcoJ1JpZ2h0Jyk7XHJcbiAgICAgICAgdmFyIHRodW1iRGltID0gdmFscy5ub2RlLnRodW1iLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIHZhciBwb3NBbmNob3IgPSAnbGVmdCc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBzdWJ0cmFjdCA9ICh0aHVtYkRpbSAqIGRpc3RhbmNlKSArICdweCc7XHJcbiAgICAgIGlmIChwYWRkaW5nRW5kKSBzdWJ0cmFjdCArPSAnIC0gJyArIChwYWRkaW5nRW5kICogZGlzdGFuY2UpICsgJ3B4JztcclxuICAgICAgaWYgKHBhZGRpbmdTdGFydCkgc3VidHJhY3QgKz0gJyArICcgKyAocGFkZGluZ1N0YXJ0ICogKDEgLSBkaXN0YW5jZSkpICsgJ3B4JztcclxuICAgICAgdmFscy5ub2RlLnRodW1iLnN0eWxlW3Bvc0FuY2hvcl0gPSAnY2FsYygnICsgKGRpc3RhbmNlICogMTAwKSArICclIC0gJyArIHN1YnRyYWN0ICsgJyknO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBjb21wdXRlUmF0aW9EaXN0YW5jZShuZXdWYWxzKSB7XHJcbiAgICBsZXQgdmFsdWUsIHJhdGlvO1xyXG4gICAgaWYgKCFuZXdWYWxzKSB7XHJcbiAgICAgIG5ld1ZhbHMgPSB2YWxzO1xyXG4gICAgICB2YWx1ZSA9IHZhbHMudmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBwcm9wcyA9IFsncmFuZ2UnLCAnc3RlcCddO1xyXG4gICAgICBmb3IgKHZhciBpIGluIHByb3BzKSB7XHJcbiAgICAgICAgaWYgKG5ld1ZhbHNbcHJvcHNbaV1dID09IG51bGwpIG5ld1ZhbHNbcHJvcHNbaV1dID0gdmFsc1twcm9wc1tpXV07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5ld1ZhbHMudmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgIHZhbHVlID0gbmV3VmFscy52YWx1ZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByYXRpbyA9ICh2YWxzLnZhbHVlIC0gdmFscy5yYW5nZVswXSkgLyAodmFscy5yYW5nZVsxXSAtIHZhbHMucmFuZ2VbMF0pO1xyXG4gICAgICAgIHZhbHVlID0gKG5ld1ZhbHMucmFuZ2VbMV0gLSBuZXdWYWxzLnJhbmdlWzBdKSAqIHJhdGlvICsgbmV3VmFscy5yYW5nZVswXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9Sb3VuZCB2YWx1ZSB0byBhIGdpdmVuIHN0ZXBcclxuICAgIGlmIChuZXdWYWxzLnN0ZXAgIT09IGZhbHNlKSB7XHJcbiAgICAgIGlmIChuZXdWYWxzLnJhbmdlWzFdIC0gbmV3VmFscy5yYW5nZVswXSA8IG5ld1ZhbHMuc3RlcCkge1xyXG4gICAgICAgIHZhbHVlID0gbmV3VmFscy5yYW5nZVswXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YWx1ZSA9IG5ld1ZhbHMucmFuZ2VbMF0gKyBNYXRoLnJvdW5kKCh2YWx1ZSAtIG5ld1ZhbHMucmFuZ2VbMF0pIC8gbmV3VmFscy5zdGVwKSAqIG5ld1ZhbHMuc3RlcDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgbmV3UmF0aW8gPSAodmFsdWUgLSBuZXdWYWxzLnJhbmdlWzBdKSAvIChuZXdWYWxzLnJhbmdlWzFdIC0gbmV3VmFscy5yYW5nZVswXSk7XHJcbiAgICBpZiAodmFsdWUgIT09IHZhbHMudmFsdWUpIHZhbHMudmFsdWUgPSB2YWx1ZTtcclxuICAgIGlmIChuZXdSYXRpbyAhPT0gcmF0aW8pIG1vdmVUaHVtYihuZXdSYXRpbyk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0gRXZlbnQgZnVuY3Rpb25zIC0tLS0tLVxyXG4gIGZ1bmN0aW9uIGludm9rZUV2ZW50KHR5cGVzKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGZ1bmN0aW9ucyA9IHZhbHMuZXZlbnRzW3R5cGVzW2ldXTtcclxuICAgICAgaWYgKGZ1bmN0aW9ucykge1xyXG4gICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgZnVuY3Rpb25zLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICBmdW5jdGlvbnNbbl0uY2FsbCh0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgLy8gLT4gRXZlbnQgbGlzdGVuZXJzXHJcbiAgLy9UT0RPOiBkb24ndCBleHBsaWNpdGx5IHRyYWNrIGluZGV4IDAuIEl0IHdvcmtzIGluIGFsbCBteSB0ZXN0cyBidXQgZXNwZWNpYWxseSBvbiBBUElzIGxpa2UgdGhlc2UsIGJyb3dzZXJzIGFuZCBvcGVyYXRpbmcgc3lzdGVtcyB2YXJ5IHN0cm9uZ2x5XHJcbiAgZnVuY3Rpb24gdG91Y2hTdGFydChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAoYWN0aXZlVG91Y2hJRCA9PSBudWxsKSB7XHJcbiAgICAgIGFjdGl2ZVRvdWNoSUQgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XHJcbiAgICAgIHNsaWRlU3RhcnQuY2FsbCh0aGlzLCBlLmNoYW5nZWRUb3VjaGVzWzBdLCB0cnVlKTtcclxuXHJcbiAgICAgIHZhbHMubm9kZS50aHVtYi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaE1vdmUpO1xyXG4gICAgICB2YWxzLm5vZGUudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEVuZCk7XHJcbiAgICAgIHZhbHMubm9kZS50aHVtYi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRvdWNoRW5kKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gdG91Y2hNb3ZlKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoZS5jaGFuZ2VkVG91Y2hlc1tpXS5pZGVudGlmaWVyID09PSBhY3RpdmVUb3VjaElEKSB7XHJcbiAgICAgICAgc2xpZGVNb3ZlLmNhbGwodGhpcywgZS5jaGFuZ2VkVG91Y2hlc1tpXSwgdHJ1ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gdG91Y2hFbmQoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChlLmNoYW5nZWRUb3VjaGVzW2ldLmlkZW50aWZpZXIgPT09IGFjdGl2ZVRvdWNoSUQpIHtcclxuICAgICAgICB2YWxzLm5vZGUudGh1bWIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hNb3ZlKTtcclxuICAgICAgICB2YWxzLm5vZGUudGh1bWIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEVuZCk7XHJcbiAgICAgICAgdmFscy5ub2RlLnRodW1iLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdG91Y2hFbmQpO1xyXG5cclxuICAgICAgICBzbGlkZUVuZC5jYWxsKHRoaXMsIGUuY2hhbmdlZFRvdWNoZXNbaV0sIHRydWUpO1xyXG4gICAgICAgIGFjdGl2ZVRvdWNoSUQgPSBudWxsO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNsaWRlU3RhcnQoZSwgaXNUb3VjaCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzbDg5LW5vc2VsZWN0Jyk7XHJcbiAgICB2YWxzLm5vZGUudGh1bWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICBpbnZva2VFdmVudChbJ3N0YXJ0J10pO1xyXG5cclxuICAgIGFjdGl2ZVRodW1iID0gdGhpcztcclxuICAgIGlmICh2YWxzLm9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCcpIHtcclxuICAgICAgdmFyIHN0YXJ0RGlyID0gJ1RvcCc7XHJcbiAgICAgIHZhciBwb3NBbmNob3IgPSAndG9wJztcclxuICAgICAgdmFyIGNsaWVudERpbSA9IGUuY2xpZW50WTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBzdGFydERpciA9ICdMZWZ0JztcclxuICAgICAgdmFyIHBvc0FuY2hvciA9ICdsZWZ0JztcclxuICAgICAgdmFyIGNsaWVudERpbSA9IGUuY2xpZW50WDtcclxuICAgIH1cclxuICAgIGNvbnN0IHRodW1iT2Zmc2V0ID0gYWN0aXZlVGh1bWJbJ29mZnNldCcgKyBzdGFydERpcl0gLSBnZXRUcmFja1BhZGRpbmcoc3RhcnREaXIpO1xyXG4gICAgbW91c2VEb3duUG9zID0gY2xpZW50RGltIC0gdGh1bWJPZmZzZXQ7XHJcbiAgICBtb3ZlVGh1bWIodGh1bWJPZmZzZXQsIHRydWUpO1xyXG4gICAgYWN0aXZlVGh1bWIuc3R5bGUucmVtb3ZlUHJvcGVydHkocG9zQW5jaG9yKTtcclxuXHJcbiAgICBpZiAoIWlzVG91Y2gpIHtcclxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzbGlkZUVuZCk7XHJcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzbGlkZU1vdmUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBzbGlkZU1vdmUoZSkge1xyXG4gICAgY29uc3QgYWJzU2l6ZSA9IGdldEFic29sdXRlVHJhY2tTaXplKCk7XHJcbiAgICBsZXQgZGlzdGFuY2UgPSAodmFscy5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnID8gZS5jbGllbnRZIDogZS5jbGllbnRYKSAtIG1vdXNlRG93blBvcztcclxuXHJcbiAgICBpZiAoZGlzdGFuY2UgPiBhYnNTaXplKSBkaXN0YW5jZSA9IGFic1NpemU7XHJcbiAgICBlbHNlIGlmIChkaXN0YW5jZSA8IDApIGRpc3RhbmNlID0gMDtcclxuXHJcbiAgICBpZiAodmFscy5zdGVwKSB7XHJcbiAgICAgIGNvbnN0IHJlbFN0ZXAgPSBhYnNTaXplIC8gKCh2YWxzLnJhbmdlWzFdIC0gdmFscy5yYW5nZVswXSkgLyB2YWxzLnN0ZXApO1xyXG4gICAgICBkaXN0YW5jZSA9IE1hdGgucm91bmQoZGlzdGFuY2UgLyByZWxTdGVwKSAqIHJlbFN0ZXA7XHJcbiAgICAgIGlmIChkaXN0YW5jZSA+IGFic1NpemUpIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHZhbHVlID0gY29tcHV0ZURpc3RhbmNlVmFsdWUoZGlzdGFuY2UsIGFic1NpemUpO1xyXG5cclxuICAgIGlmICh2YWxzLnZhbHVlICE9PSB2YWx1ZSkge1xyXG4gICAgICB2YWxzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgIG1vdmVUaHVtYihkaXN0YW5jZSwgdHJ1ZSk7XHJcbiAgICAgIGludm9rZUV2ZW50KFsnbW92ZSddKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gc2xpZGVFbmQoZSwgaXNUb3VjaCkge1xyXG4gICAgaWYgKCFpc1RvdWNoKSB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc2xpZGVFbmQpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc2xpZGVNb3ZlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2YWx1ZSA9IGNvbXB1dGVEaXN0YW5jZVZhbHVlKGdldERpc3RhbmNlKCkpO1xyXG4gICAgY29tcHV0ZVJhdGlvRGlzdGFuY2Uoe3ZhbHVlOiB2YWx1ZX0pO1xyXG4gICAgYWN0aXZlVGh1bWIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zZm9ybScpO1xyXG4gICAgbW91c2VEb3duUG9zID0gbnVsbDtcclxuICAgIGFjdGl2ZVRodW1iID0gbnVsbDtcclxuXHJcbiAgICBpbnZva2VFdmVudChbJ2VuZCddKTtcclxuICAgIHZhbHMubm9kZS50aHVtYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2w4OS1ub3NlbGVjdCcpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tIFNjb3BlLXNwZWNpZmljIGZ1bmN0aW9ucyAtLS0tLS1cclxuICAvLyAtPiBFbGVtZW50IGJ1aWxkaW5nXHJcbiAgZnVuY3Rpb24gY3JlYXRlU3R5bGVTaGVldCgpIHtcclxuICAgIGNvbnN0IHNoZWV0ID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCBmaXJzdEhlYWRDaGlsZCA9IGRvY3VtZW50LmhlYWQuZmlyc3RFbGVtZW50Q2hpbGQ7XHJcbiAgICAgIGlmIChmaXJzdEhlYWRDaGlsZCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpLCBmaXJzdEhlYWRDaGlsZCkuc2hlZXQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSkuc2hlZXQ7XHJcbiAgICAgIH1cclxuICAgIH0pKCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBzaGVldC5pbnNlcnRSdWxlKHN0eWxlc1tpXSwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHBhcnNlU3RydWN0dXJlKHN0cnVjdHVyZVN0cikge1xyXG4gICAgY29uc3Qgbm9kZSA9IHtcclxuICAgICAgc2xpZGVyOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBhdHRyaWJzID0ge307XHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnN0IGRlZk5vZGVzID0gW1xyXG4gICAgICAgICd0cmFjaycsXHJcbiAgICAgICAgJ3RodW1iJ1xyXG4gICAgICBdO1xyXG4gICAgICBkZWZOb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgICAgICBhdHRyaWJzW25vZGVdID0ge1xyXG4gICAgICAgICAgY2xhc3M6ICdzbDg5LScgKyBub2RlXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGNvbnN0IHZhcmlhYmxlcyA9IHt9O1xyXG5cclxuICAgIGNvbnN0IHJlZyA9IHtcclxuICAgICAgYXR0cjoge1xyXG4gICAgICAgIG5hbWU6ICdbXFxcXHctXSsnXHJcbiAgICAgIH0sXHJcbiAgICAgIGFsbDogJ1tcXFxcZFxcXFxEXScsXHJcbiAgICAgIHRhYlNwYWNlOiAnWyBcXFxcdF0rJyxcclxuICAgICAgbmFtZTogJ1tcXFxcdy1dKycsXHJcbiAgICAgIHNpbmdsZUFtcGxmcjogJzonXHJcbiAgICB9O1xyXG4gICAgcmVnLmF0dHIudmFsdWUgPSAnKD86KD8hPCknICsgcmVnLmFsbCArICcpKj8nO1xyXG4gICAgcmVnLmNhcE5hbWUgPSAnKCcgKyByZWcubmFtZSArICcpJztcclxuICAgIHJlZy5nbGJNYXRjaCA9ICcoPzonICsgcmVnLnRhYlNwYWNlICsgJyg/Oig/ITwpLikqPyk/Pic7XHJcbiAgICByZWcuY29udGVudCA9ICcoPzpcXFxccytcIignK3JlZy5hbGwrJys/KVwiKT8nO1xyXG4gICAgcmVnLnRhZyA9ICcoPzpcXFxccysnICsgcmVnLmNhcE5hbWUgKyAnKT8nO1xyXG4gICAgcmVnLmF0dHJpYnMgPSAnKD86XFxcXHMrJyArIHJlZy5hdHRyLm5hbWUgKyAnXFxcXCgnICsgcmVnLmF0dHIudmFsdWUgKyAnXFxcXCkpKic7XHJcbiAgICByZWcuYmFzZSA9IHJlZy5jYXBOYW1lICsgcmVnLnRhZyArIHJlZy5jb250ZW50ICsgJygnICsgcmVnLmF0dHJpYnMgKyAnKVxcXFxzKj8nO1xyXG4gICAgY29uc3Qgcmd4ID0ge1xyXG4gICAgICBnZW5lcmFsOiAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgcGFydHMgPSB7XHJcbiAgICAgICAgICBpbm5lcjogJzwoWzovXT8pJyArIHJlZy5jYXBOYW1lICsgJyg/OicgKyByZWcudGFiU3BhY2UgKyByZWcubmFtZSArICcpPyg/OicgKyByZWcudGFiU3BhY2UgKyAnKFwiXCIpKT8nICsgcmVnLmdsYk1hdGNoLFxyXG4gICAgICAgICAgbm9FbmQ6ICc8JyArIHJlZy5zaW5nbGVBbXBsZnIgKyAnPycgKyByZWcuY2FwTmFtZSArICcuKj8nLFxyXG4gICAgICAgICAgbm9CZWdpbm5pbmc6ICcoPzpefCcgKyByZWcudGFiU3BhY2UgKyAnKScgKyByZWcuc2luZ2xlQW1wbGZyICsgJz8nICsgcmVnLmNhcE5hbWUgKyByZWcuZ2xiTWF0Y2hcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBwYXJ0cy5pbm5lciArICd8JyArIHBhcnRzLm5vRW5kICsgJ3wnICsgcGFydHMubm9CZWdpbm5pbmc7XHJcbiAgICAgIH0pKCksXHJcbiAgICAgIHZhcmlhYmxlOiAnXFxcXHtcXFxcJChcXFxcdyspXFxcXH18XFxcXCQoXFxcXHcrKScsXHJcbiAgICAgIGF0dHJpYnV0ZXM6ICcoJyArIHJlZy5hdHRyLm5hbWUgKyAnKVxcXFwoKCcgKyByZWcuYXR0ci52YWx1ZSArICcpXFxcXCkoPzpcXFxccyt8JCknLFxyXG4gICAgICBzaW5nbGVUYWc6ICc8JyArIHJlZy5zaW5nbGVBbXBsZnIgKyByZWcuYmFzZSArICc+JyxcclxuICAgICAgbXVsdGlUYWc6ICc8JyArIHJlZy5iYXNlICsgJz4oKD86JytyZWcuYWxsKycoPyE8JyArIHJlZy5jYXBOYW1lICsgJyg/OlxcXFxzKycgKyByZWcubmFtZSArICcpPyg/OlxcXFxzK1wiJytyZWcuYWxsKycrP1wiKT8nICsgcmVnLmF0dHJpYnMgKyAnXFxcXHMqPz4nK3JlZy5hbGwrJyo/PFxcXFwvXFxcXDZcXFxccyo+KSkqPyk8XFxcXC9cXFxcMVxcXFxzKj4nXHJcbiAgICB9O1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICBmb3IgKHZhciBleHByIGluIHJneCkgcmd4W2V4cHJdID0gbmV3IFJlZ0V4cChyZ3hbZXhwcl0sICdnJyk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHN0cnVjdHVyZVJneCA9IHJneDtcclxuICAgIGxldCBzdHJ1Y3R1cmUgPSBzdHJ1Y3R1cmVTdHI7XHJcblxyXG4gICAgd2hpbGUgKHJneC5tdWx0aVRhZy50ZXN0KHN0cnVjdHVyZSkpIHtcclxuICAgICAgc3RydWN0dXJlID0gc3RydWN0dXJlLnJlcGxhY2Uocmd4Lm11bHRpVGFnLCBmdW5jdGlvbihtYXRjaCwgbmFtZSwgdGFnLCBpbm5lciwgYXR0cmlidXRlcywgY29udGVudCkge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBhc3NlbWJsZUVsZW1lbnQobmFtZSwgdGFnLCBhdHRyaWJ1dGVzLCBpbm5lcik7XHJcbiAgICAgICAgY29udGVudCA9IHBhcnNlU2luZ2xlVGFncyhjb250ZW50LCBlbGVtKTtcclxuICAgICAgICBub2RlW25hbWVdID0gZWxlbTtcclxuICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RydWN0dXJlID0gcGFyc2VTaW5nbGVUYWdzKHN0cnVjdHVyZSwgbm9kZS5zbGlkZXIpO1xyXG5cclxuICAgIHN0cnVjdHVyZSA9IHN0cnVjdHVyZS50cmltKCk7XHJcbiAgICBpZiAoL1xcUysvZy50ZXN0KHN0cnVjdHVyZSkpIHtcclxuICAgICAgY29uc3QgZXJyb3JMaXN0ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAocmd4LmdlbmVyYWwudGVzdChzdHJ1Y3R1cmUpKSB7XHJcbiAgICAgICAgICBzdHJ1Y3R1cmUucmVwbGFjZShyZ3guZ2VuZXJhbCwgZnVuY3Rpb24obWF0Y2gsIGFtcGxpZmllciwgbmFtZSwgY29udGVudCwgbmFtZTIsIG5hbWUzKSB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvID0gJy0gXCInICsgKG5hbWUgfHwgbmFtZTIgfHwgbmFtZTMpICsgJ1wiID0+ICc7XHJcbiAgICAgICAgICAgIGlmIChhbXBsaWZpZXIgPT0gJy8nKVxyXG4gICAgICAgICAgICAgIGluZm8gKz0gJ0Nsb3NpbmcgdGFnIGZpbmRpbmcgbm8gYmVnaW5uaW5nJztcclxuICAgICAgICAgICAgZWxzZSBpZiAoYW1wbGlmaWVyID09PSAnJylcclxuICAgICAgICAgICAgICBpbmZvICs9ICdPcGVuaW5nIHRhZyBmaW5kaW5nIG5vIGVuZCAoc2hvdWxkIGl0IGJlIGEgc2luZ2xlIHRhZyBtYXJrZWQgd2l0aCDigJg64oCZPyknO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChjb250ZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgaW5mbyArPSAnUmVkdW5kYW50IGVtcHR5IHRleHQgY29udGVudCAo4oCYXCJcIuKAmSknO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChuYW1lMilcclxuICAgICAgICAgICAgICBpbmZvICs9ICdNaXNzaW5nIGVuZGluZyBjaGFyYWN0ZXIgKOKAmD7igJkpJztcclxuICAgICAgICAgICAgZWxzZSBpZiAobmFtZTMpXHJcbiAgICAgICAgICAgICAgaW5mbyArPSAnTWlzc2luZyBiZWdpbm5pbmcgY2hhcmFjdGVyICjigJg84oCZKSc7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICBpbmZvICs9ICdVbmlkZW50aWZpZWQgZXJyb3IuIFBsZWFzZSBjaGVjayB0aGUgZWxlbWVudCBmb3Igc3ludGF4IGVycm9ycyc7XHJcbiAgICAgICAgICAgIGVycm9yTGlzdC5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGVycm9yTGlzdC5wdXNoKCdMZWZ0b3ZlciB1bnBhcnNhYmxlIHN0cnVjdHVyZTpcXG4tIFwiJyArIHN0cnVjdHVyZSArICdcIlxcbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSgpKTtcclxuICAgICAgcHJvcEVycm9yKCdzdHJ1Y3R1cmUnLCAoZXJyb3JMaXN0Lmxlbmd0aCA+IDEgPyAnc2V2ZXJhbCBlbGVtZW50cyBoYXZlJyA6ICdhbiBlbGVtZW50IGhhcycpICsgJyBiZWVuIGRlY2xhcmVkIHdyb25nbHkgYW5kIGNvdWxkIG5vdCBiZSBwYXJzZWQuXFxuJyArIGVycm9yTGlzdC5qb2luKCcuXFxuJykpO1xyXG4gICAgfVxyXG5cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgbWF0Y2hlcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICBsZXQgbWF0Y2g7XHJcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJneC5nZW5lcmFsLmV4ZWMoc3RydWN0dXJlU3RyKSkge1xyXG4gICAgICAgIG1hdGNoZXMucHVzaChtYXRjaCk7XHJcbiAgICAgIH1cclxuICAgICAgYXBwZW5kRWxlbWVudHMobm9kZS5zbGlkZXIsIG1hdGNoZXMpO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvL1N0YXRpY2FsbHkgdHlwZWRcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgdHJhY2sgPSBub2RlLnRyYWNrO1xyXG4gICAgICBjb25zdCB0aHVtYiA9IG5vZGUudGh1bWI7XHJcbiAgICAgIGlmICghdHJhY2spIG5vZGUudHJhY2sgPSBhc3NlbWJsZUVsZW1lbnQoJ3RyYWNrJywgJ2RpdicpO1xyXG4gICAgICBpZiAoIXRodW1iKSBub2RlLnRodW1iID0gYXNzZW1ibGVFbGVtZW50KCd0aHVtYicsICdkaXYnKTtcclxuICAgICAgaWYgKCF0cmFjayAmJiAhdGh1bWIpIHtcclxuICAgICAgICBub2RlLnRyYWNrLmFwcGVuZENoaWxkKG5vZGUudGh1bWIpO1xyXG4gICAgICAgIG5vZGUuc2xpZGVyLmFwcGVuZENoaWxkKG5vZGUudHJhY2spO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0cmFjayAmJiB0aHVtYikge1xyXG4gICAgICAgIG5vZGUudGh1bWIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChub2RlLnRyYWNrKTtcclxuICAgICAgICBub2RlLnRyYWNrLmFwcGVuZENoaWxkKG5vZGUudGh1bWIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRyYWNrICYmICF0aHVtYikge1xyXG4gICAgICAgIG5vZGUudHJhY2suYXBwZW5kQ2hpbGQobm9kZS50aHVtYik7XHJcbiAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgcmV0dXJuIG5vZGU7XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwZW5kRWxlbWVudHMocGFyZW50LCBjaGlsZEFyciwgaSkge1xyXG4gICAgICBpZiAoaSA9PSBudWxsKSBpID0gMDtcclxuICAgICAgZm9yICg7IGkgPCBjaGlsZEFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBub2RlW2NoaWxkQXJyW2ldWzJdXTtcclxuICAgICAgICBpZiAoY2hpbGRBcnJbaV1bMV0gPT09ICcnKSB7XHJcbiAgICAgICAgICBpID0gYXBwZW5kRWxlbWVudHMoZWxlbSwgY2hpbGRBcnIsIGkgKyAxKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkQXJyW2ldWzFdID09ICcvJykgcmV0dXJuIGk7XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VTaW5nbGVUYWdzKHN0ciwgcGFyZW50KSB7XHJcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZShyZ3guc2luZ2xlVGFnLCBmdW5jdGlvbihtYXRjaCwgbmFtZSwgdGFnLCBpbm5lciwgYXR0cmlidXRlcykge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBhc3NlbWJsZUVsZW1lbnQobmFtZSwgdGFnLCBhdHRyaWJ1dGVzLCBpbm5lcik7XHJcbiAgICAgICAgbm9kZVtuYW1lXSA9IGVsZW07XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhc3NlbWJsZUVsZW1lbnQobmFtZSwgdGFnLCBhdHRyaWJ1dGVzLCBjb250ZW50KSB7XHJcbiAgICAgIGlmIChub2RlW25hbWVdKSB7XHJcbiAgICAgICAgcHJvcEVycm9yKCdzdHJ1Y3R1cmUnLCAnRXZlcnkgZWxlbWVudCBtdXN0IGhhdmUgYSB1bmlxdWUgbmFtZSBidXQgdGhlcmUgYXJlIG11dGlwbGUgZWxlbWVudHMgY2FsbGVkIOKAmCcgKyBuYW1lICsgJ+KAmScpO1xyXG4gICAgICB9XHJcbiAgICAgIGxldCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcgfHwgJ2RpdicpO1xyXG4gICAgICBjb25zdCBoYXNBdHRyaWJzID0gISFhdHRyaWJzW25hbWVdO1xyXG4gICAgICBpZiAoY29udGVudCkge1xyXG4gICAgICAgIGVsZW0udGV4dENvbnRlbnQgPSByZWdpc3RlclZhcmlhYmxlcyhjb250ZW50LCBlbGVtLCBmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBhdHRyaWJ1dGVzLnJlcGxhY2Uocmd4LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHJpYiwgYXR0cmliTmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgIC8vVGFpbG9yZWQgZm9yIHNwYWNlLXNlcGFyYXRlZCB2YWx1ZXMgKGNoZWNrIGZvciBkdXBsaWNhdGVzIGluIHZhbHVlIHZzLiBkZWZhdWx0IHN0cnVjdHVyZSBzdHlsZSlcclxuICAgICAgICAgIGlmIChoYXNBdHRyaWJzICYmIGF0dHJpYnNbbmFtZV1bYXR0cmliTmFtZV0gJiYgdmFsdWUuc3BsaXQoJyAnKS5pbmRleE9mKGF0dHJpYnNbbmFtZV1bYXR0cmliTmFtZV0pID09IC0xKSB7XHJcbiAgICAgICAgICAgIHZhbHVlICs9ICcgJyArIGF0dHJpYnNbbmFtZV1bYXR0cmliTmFtZV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShhdHRyaWJOYW1lLCByZWdpc3RlclZhcmlhYmxlcyh2YWx1ZSwgZWxlbSwgYXR0cmliTmFtZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChoYXNBdHRyaWJzKSB7XHJcbiAgICAgICAgZm9yICh2YXIgYXR0ciBpbiBhdHRyaWJzW25hbWVdKSB7XHJcbiAgICAgICAgICBpZiAoIWVsZW0uZ2V0QXR0cmlidXRlKGF0dHIpKSBlbGVtLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyaWJzW25hbWVdW2F0dHJdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJWYXJpYWJsZXMoc3RyLCBub2RlLCBhdHRyaWJOYW1lKSB7XHJcbiAgICAgIGlmIChyZ3gudmFyaWFibGUudGVzdChzdHIpKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLnJlcGxhY2Uocmd4LnZhcmlhYmxlLCBmdW5jdGlvbihtYXRjaCwgdmFyaWFibGVEZWxpbWl0LCB2YXJpYWJsZSkge1xyXG4gICAgICAgICAgY29uc3QgdmFyTmFtZSA9IHZhcmlhYmxlRGVsaW1pdCB8fCB2YXJpYWJsZTtcclxuICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHMsIHZhck5hbWUpKSB7XHJcbiAgICAgICAgICAgIHByb3BFcnJvcignc3RydWN0dXJlJywgXCLigJhcIiArIHZhck5hbWUgKyBcIuKAmSBpcyBub3QgYSByZWNvZ25pemVkIHByb3BlcnR5LiBQbGVhc2UgY2hlY2sgaXRzIHNwZWxsaW5nIG9yIGluaXRpYWxpemUgaXQgaW4gdGhlIGNvbnN0cnVjdG9yXCIpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChzdHJ1Y3R1cmVWYXJzW3Zhck5hbWVdID09IG51bGwpIHN0cnVjdHVyZVZhcnNbdmFyTmFtZV0gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgIGNvbnN0IGl0ZW0gPSB7XHJcbiAgICAgICAgICAgIHN0cjogc3RyLFxyXG4gICAgICAgICAgICBub2RlOiBub2RlXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgaWYgKGF0dHJpYk5hbWUpIGl0ZW0uYXR0ciA9IGF0dHJpYk5hbWU7XHJcbiAgICAgICAgICBzdHJ1Y3R1cmVWYXJzW3Zhck5hbWVdLnB1c2goaXRlbSk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHRoYXRbdmFyaWFibGVEZWxpbWl0IHx8IHZhcmlhYmxlXTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8tPiBNZXRob2RzICYgcHJvcGVydGllc1xyXG4gIGZ1bmN0aW9uIHByb3BFcnJvcihwcm9wLCBtc2csIG5vVGFyZ2V0KSB7XHJcbiAgICBpZiAoIWluaXRpYWwpIHtcclxuICAgICAgbGV0IHByZXZWYWwgPSB2YWxzW3Byb3BdO1xyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwcmV2VmFsKSkgcHJldlZhbCA9ICdbJyArIHByZXZWYWwuam9pbignLCAnKSArICddJztcclxuICAgICAgbXNnICs9ICcuXFxuQ29udGludWluZyB3aXRoIHRoZSBwcmV2aW91cyB2YWx1ZSAoJyArIHByZXZWYWwgKyAnKS4nO1xyXG4gICAgfVxyXG4gICAgZXJyb3IobXNnLCBub1RhcmdldCA/IGZhbHNlIDogcHJvcCk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIG1ldGhvZEVycm9yKG1ldGhvZCwgYXJnSWR4LCBtc2csIG9taXRFcnJvcikge1xyXG4gICAgY29uc3QgY291bnRzID0gWydmaXJzdCcsICdzZWNvbmQnLCAndGhpcmQnLCAnZm91cnRoJywgJ2ZpZnRoJywgJ3NpeHRoJywgJ3NldmVudGgnLCAnZWlnaHRoJywgJ25pbnRoJ107XHJcbiAgICBjb25zdCBhcmcgPSBtZXRob2RzW21ldGhvZF0uYXJnc1thcmdJZHhdO1xyXG5cclxuICAgIGxldCBlcnJNc2cgPSAndGhlICcgKyAoYXJnLm9wdGlvbmFsID8gJ29wdGlvbmFsICcgOiAnJykgKyBjb3VudHNbYXJnSWR4XSArICcgYXJndW1lbnQgKCcgKyBhcmcubmFtZSArICcpICc7XHJcbiAgICBpZiAob21pdEVycm9yKSBlcnJNc2cgKz0gJ2hhcyBiZWVuIG9taXR0ZWQgYnV0IGl0IGlzIHJlcXVpcmVkLiBJdCAnO1xyXG4gICAgZXJyTXNnICs9ICdtdXN0IGJlICcgKyBjb21wdXRlVHlwZU1zZyhhcmcuc3RydWN0dXJlKTtcclxuICAgIGlmICghb21pdEVycm9yKSBlcnJNc2cgKz0gJyBidXQgaXQnICsgbXNnO1xyXG5cclxuICAgIGVycm9yKGVyck1zZywgbWV0aG9kKTtcclxuICB9XHJcblxyXG4gIC8vQ2hlY2tpbmcgcHJvcGVydGllcyAmIG1ldGhvZHMgZm9yIHRoZSBjb3JyZWN0IHR5cGUgJiBmb3JtYXRcclxuICBmdW5jdGlvbiBjaGVja01ldGhvZChtZXRob2QsIGFyZ0xpc3QpIHtcclxuICAgIGNvbnN0IG9iaiA9IG1ldGhvZHNbbWV0aG9kXTtcclxuICAgIC8vSWYgdGhlIG5leHQgYXJndW1lbnQgKGFyZ0xpc3QubGVuZ3RoIC0gMSArIDEpIGlzIG5vdCBvcHRpb25hbCwgYSByZXF1aXJlZCBhcmcgaXMgbWlzc2luZ1xyXG4gICAgZm9yICh2YXIgaSBpbiBhcmdMaXN0KSB7XHJcbiAgICAgIGNvbnN0IGFyZyA9IGFyZ0xpc3RbaV07XHJcbiAgICAgIGNvbnN0IG1zZyA9IGNoZWNrVHlwZXMoYXJnLCBvYmouYXJnc1tpXS5zdHJ1Y3R1cmUsIGZhbHNlKTtcclxuICAgICAgaWYgKG1zZykgbWV0aG9kRXJyb3IobWV0aG9kLCBpLCBtc2cpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iai5hcmdzW2FyZ0xpc3QubGVuZ3RoXSAmJiAhb2JqLmFyZ3NbYXJnTGlzdC5sZW5ndGhdLm9wdGlvbmFsKSB7XHJcbiAgICAgIG1ldGhvZEVycm9yKG1ldGhvZCwgYXJnTGlzdC5sZW5ndGgsIG51bGwsIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBjaGVja1Byb3AocHJvcCwgdmFsKSB7XHJcbiAgICBjb25zdCBpdGVtID0gcHJvcGVydGllc1twcm9wXTtcclxuICAgIGNvbnN0IG1zZyA9IGNoZWNrVHlwZXModmFsLCBpdGVtLnN0cnVjdHVyZSwgZmFsc2UpO1xyXG4gICAgaWYgKG1zZykge1xyXG4gICAgICBwcm9wRXJyb3IocHJvcCwgJ3Byb3BlcnR5IOKAmCcgKyBwcm9wICsgJ+KAmSBtdXN0IGJlICcgKyBjb21wdXRlVHlwZU1zZyhpdGVtLnN0cnVjdHVyZSwgaXRlbS5zaGFwZSkgKyAnIGJ1dCBpdCcgKyBtc2csIHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2hlY2tUeXBlcyh2YWwsIHN0cnVjdHVyZSwgcGx1cmFsKSB7XHJcbiAgICBsZXQgbXNnO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJ1Y3R1cmUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgdHlwZU9iaiA9IHN0cnVjdHVyZVtpXTtcclxuICAgICAgY29uc3QgdHlwZSA9IHR5cGVPYmoudHlwZTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGUgPT0gJ2Jvb2xlYW4nICYmIHR5cGVvZiB2YWwgPT0gJ2Jvb2xlYW4nIHx8XHJcbiAgICAgICAgdHlwZSA9PSAndHJ1ZScgJiYgdmFsID09PSB0cnVlIHx8XHJcbiAgICAgICAgdHlwZSA9PSAnZmFsc2UnICYmIHZhbCA9PT0gZmFsc2UgfHxcclxuICAgICAgICB0eXBlID09ICdhcnJheScgJiYgQXJyYXkuaXNBcnJheSh2YWwpIHx8XHJcbiAgICAgICAgdHlwZSA9PSAnb2JqZWN0JyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PSAnW29iamVjdCBPYmplY3RdJyB8fFxyXG4gICAgICAgIHR5cGUgPT0gJ251bWJlcicgJiYgdHlwZW9mIHZhbCA9PSAnbnVtYmVyJyAmJiAhcG9seUlzTmFOKHZhbCkgfHxcclxuICAgICAgICB0eXBlID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nIHx8XHJcbiAgICAgICAgdHlwZSA9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsID09ICdzdHJpbmcnXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmICh0eXBlID09ICdhcnJheScpIHtcclxuICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdmFsLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgIGlmIChtc2cgPSBjaGVja1R5cGVzKHZhbFtuXSwgdHlwZU9iai5zdHJ1Y3R1cmUsIHRydWUpKSBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIGZvciAodmFyIGtleSBpbiB2YWwpIHtcclxuICAgICAgICAgICAgaWYgKG1zZyA9IGNoZWNrVHlwZXModmFsW2tleV0sIHR5cGVPYmouc3RydWN0dXJlLCB0cnVlKSkgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtc2cpIHJldHVybiBtc2c7XHJcbiAgICAgICAgaWYgKG1zZyA9IGNoZWNrQ29uZGl0aW9ucyh0eXBlT2JqLmNvbmRpdGlvbnMsIHZhbCkpIGJyZWFrO1xyXG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbXNnID8gJyBpcyAnICsgbXNnIDogKHBsdXJhbCA/ICdzIHZhbHVlcyBhcmUgJyA6ICcgaXMgJykgKyB0eXBlTXNnKHZhbCwgdHJ1ZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tDb25kaXRpb25zKGNvbmRpdGlvbnMsIHZhbCkge1xyXG4gICAgICBpZiAoY29uZGl0aW9ucykge1xyXG4gICAgICAgIGlmIChjb25kaXRpb25zLm5vbm5lZ2F0aXZlICYmIHZhbCA8IDApIHtcclxuICAgICAgICAgIHJldHVybiAnYSBuZWdhdGl2ZSBudW1iZXInO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZGl0aW9ucy5pbnRlZ2VyICYmIHZhbCAlIDEgIT09IDApIHtcclxuICAgICAgICAgIHJldHVybiAnYSBmbG9hdGluZyBwb2ludCBudW1iZXInO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZGl0aW9ucy5maWxsZWQgJiYgdmFsLnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgICAgIHJldHVybiAnYW4gZW1wdHkgc3RyaW5nJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmRpdGlvbnMua2V5d29yZHMgJiYgY29uZGl0aW9ucy5rZXl3b3Jkcy5pbmRleE9mKHZhbCkgPT0gLTEpIHtcclxuICAgICAgICAgIHJldHVybiAnYSBkaWZmZXJlbnQgc3RyaW5nJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbmRpdGlvbnMud29yZENoYXIgJiYgIXBvbHlJc05hTihOdW1iZXIodmFsKSkpIHtcclxuICAgICAgICAgIHJldHVybiAnYSBwdXJlIG51bWJlciBzdHJpbmcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZGl0aW9ucy5sZW5ndGggJiYgdmFsLmxlbmd0aCAhPT0gY29uZGl0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgIHJldHVybiAodHlwZSA9PSAnYXJyYXknID8gJ2FuICcgOiAnYSAnKSArIHR5cGUgKyAnIG9mIGxlbmd0aCAnICsgdmFsLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vQ29tcHV0aW5nIGFuIGF1dG9tYXRlZCBlcnJvciBtZXNzYWdlIHJlZ2FyZGluZyB0aGUgcHJvcGVydHkncyB0eXBlcyBhbmQgY29uZGl0aW9uc1xyXG4gIGZ1bmN0aW9uIGNvbXB1dGVUeXBlTXNnKHN0cnVjdCwgc2hhcGUsIHBsdXJhbCwgZGVlcCkge1xyXG4gICAgbGV0IG1zZyA9ICcnO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJ1Y3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgdHlwZSA9IHN0cnVjdFtpXS50eXBlO1xyXG4gICAgICBjb25zdCBjb25kID0gc3RydWN0W2ldLmNvbmRpdGlvbnM7XHJcbiAgICAgIGlmIChtc2cpIG1zZyArPSAnIG9yICc7XHJcblxyXG4gICAgICBpZiAodHlwZSA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGNvbnN0IG5vbm5lZ2F0aXZlID0gY29uZCAmJiBjb25kLm5vbm5lZ2F0aXZlO1xyXG4gICAgICAgIGNvbnN0IGlzSW50ID0gY29uZCAmJiBjb25kLmludGVnZXI7XHJcblxyXG4gICAgICAgIGlmIChub25uZWdhdGl2ZSkge1xyXG4gICAgICAgICAgaWYgKCFwbHVyYWwpIG1zZyArPSAnYSAnO1xyXG4gICAgICAgICAgbXNnICs9ICdub24tbmVnYXRpdmUnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNJbnQgJiYgIXBsdXJhbCkge1xyXG4gICAgICAgICAgbXNnICs9ICdhbic7XHJcbiAgICAgICAgfSBlbHNlIG1zZyArPSAnYW55JztcclxuICAgICAgICBtc2cgKz0gJyAnICsgKGlzSW50ID8gJ2ludGVnZXInIDogJ251bWJlcicpO1xyXG4gICAgICAgIGlmIChwbHVyYWwpIG1zZyArPSAncyc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ2FycmF5Jykge1xyXG4gICAgICAgIGNvbnN0IGxlbiA9IGNvbmQgJiYgY29uZC5sZW5ndGg7XHJcbiAgICAgICAgY29uc3QgbXNnUmVzID0gY29tcHV0ZVR5cGVNc2coc3RydWN0W2ldLnN0cnVjdHVyZSwgZmFsc2UsIGxlbiAhPT0gMSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGlmICghcGx1cmFsKSBtc2cgKz0gJ2EnO1xyXG4gICAgICAgIGlmIChkZWVwKSB7XHJcbiAgICAgICAgICBtc2cgKz0gbXNnUmVzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXBsdXJhbCkge1xyXG4gICAgICAgICAgbXNnICs9ICduJztcclxuICAgICAgICB9XHJcbiAgICAgICAgbXNnICs9ICcgYXJyYXknO1xyXG4gICAgICAgIGlmIChwbHVyYWwpIG1zZyArPSAncyc7XHJcbiAgICAgICAgaWYgKGxlbikgbXNnICs9ICcgb2YgbGVuZ3RoICcgKyBsZW47XHJcbiAgICAgICAgaWYgKCFkZWVwKSBtc2cgKz0gJyB3aXRoICcgKyBtc2dSZXMgKyAnIGFzIHZhbHVlcyc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcclxuICAgICAgICBtc2cgKz0gJ2FuIG9iamVjdCB3aXRoICcgKyBjb21wdXRlVHlwZU1zZyhzdHJ1Y3RbaV0uc3RydWN0dXJlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSkgKyAnIGFzIHZhbHVlcyc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGlmICghZGVlcCkgbXNnICs9ICdhICc7XHJcbiAgICAgICAgbXNnICs9ICdmdW5jdGlvbiByZWZlcmVuY2UnO1xyXG4gICAgICAgIGlmICghZGVlcCAmJiBwbHVyYWwpIG1zZyArPSAncyc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICBpZiAoY29uZCAmJiBjb25kLmtleXdvcmRzKSB7XHJcbiAgICAgICAgICBpZiAoY29uZC5rZXl3b3Jkcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIG1zZyArPSAnb25lIG9mIHRoZSBrZXl3b3Jkcyc7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtc2cgKz0gJ3RoZSBrZXl3b3JkJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbmQua2V5d29yZHMuZm9yRWFjaChmdW5jdGlvbih2YWwsIG4sIGFycikge1xyXG4gICAgICAgICAgICBpZiAobiAhPSAwICYmIG4gPT0gYXJyLmxlbmd0aCAtIDEpIG1zZyArPSAnIG9yJztcclxuICAgICAgICAgICAgZWxzZSBpZiAobiAhPSAwKSBtc2cgKz0gJywnO1xyXG4gICAgICAgICAgICBtc2cgKz0gJyBcIicgKyB2YWwgKyAnXCInO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGlmICghZGVlcCkgbXNnICs9ICdhICc7XHJcbiAgICAgICAgICBpZiAoY29uZCAmJiBjb25kLmZpbGxlZCkgbXNnICs9ICdub24tZW1wdHkgJztcclxuICAgICAgICAgIGlmIChjb25kICYmIGNvbmQud29yZENoYXIpIG1zZyArPSAnbm9uLW51bWJlciAnO1xyXG4gICAgICAgICAgbXNnICs9ICdzdHJpbmcnO1xyXG4gICAgICAgICAgaWYgKCFkZWVwICYmIHBsdXJhbCkgbXNnICs9ICdzJztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGVsc2UgaWYgKHR5cGUgPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgaWYgKCFkZWVwKSBtc2cgKz0gJ2EgJztcclxuICAgICAgICBtc2cgKz0gJ2Jvb2xlYW4nO1xyXG4gICAgICAgIGlmICghZGVlcCAmJiBwbHVyYWwpIG1zZyArPSAncyc7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAodHlwZSA9PSAndHJ1ZScgfHwgdHlwZSA9PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgbXNnICs9IHR5cGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzaGFwZSkge1xyXG4gICAgICAgIG1zZyArPSAnICgnICsgc2hhcGUgKyAnKSc7XHJcbiAgICAgICAgc2hhcGUgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtc2c7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==