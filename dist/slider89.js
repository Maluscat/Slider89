var Slider89 =
/******/ (function(modules) { // webpackBootstrap
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
    'end'
  ];

  let initial = false;
  let activeThumb;
  let activeTouchID;
  let mouseDownPos;
  let eventID = 0;
  const eventList = {};
  const vals = {}; //holding every property of the class

  //Style rule strings which will be inserted into a newly created stylesheet
  const styles = [
    '.sl89-track {' +
      'width: 200px;' + //216?
      'height: 25px;' +
      'background-color: hsl(0, 0%, 18%);' +
    '}',
    '.sl89-thumb {' +
      'width: 16px;' +
      'height: 100%;' +
      'background-color: hsl(0, 0%, 28%);' +
      'cursor: pointer;' +
    '}',
    '.sl89-noselect {' +
      '-webkit-user-select: none;' +
      '-moz-user-select: none;' +
      '-ms-user-select: none;' +
      'user-select: none;' +
      'pointer-events: none' +
    '}'
  ];

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
            conditions: [
              'not empty',
              'not number'
            ]
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
              conditions: [
                ['>=', 0],
                'int'
              ]
            },
            {
              type: 'string',
              conditions: [
                'not empty',
                'not number'
              ]
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
          conditions: [
            ['length', 2]
          ],
          structure: [
            { type: 'number' }
          ]
        },
        { type: 'boolean' }
      ],
      shape: '[startValue, endValue]',
      preSetter: function(val) {
        if (val[0] === val[1]) {
          propError('range', 'the given range of [' + val.join(', ') + '] defines the same value for both range start and end');
        }
      },
      postSetter: function() {
        computeValue();
      }
    },
    value: {
      default: function() {
        return vals.range[0];
      },
      structure: [{
        type: 'number'
      }],
      preSetter: function(val) {
        if (
          vals.range[0] > vals.range[1] && (val > vals.range[0] || val < vals.range[1]) ||
          vals.range[1] > vals.range[0] && (val < vals.range[0] || val > vals.range[1])
        ) {
          const rangeStr = '[' + vals.range.join(', ') + ']';
          propError('value', 'the given value of ' + val + ' exceeds the currently set range of ' + rangeStr);
        }
      },
      postSetter: translateThumb
    },
    precision: {
      default: 0,
      structure: [{
        type: 'number',
        conditions: [
          ['>=', 0],
          'int'
        ]
      }],
      postSetter: function() {
        computeValue();
      }
    },
    step: {
      default: false,
      structure: [
        {
          type: 'number',
          conditions: [
            ['>=', 0]
          ]
        },
        { type: 'false' }
      ],
      preSetter: function(val) {
        if (val !== false && Number(val.toFixed(vals.precision)) !== val) {
          propError('step', 'the given value of ' + val + ' exceeds the currently set precision of ' + vals.precision);
        }
      },
      postSetter: function() {
        computeValue();
      }
    },
    structure: {
      default: false,
      structure: [
        {
          type: 'string',
          conditions: [
            'not empty'
          ]
        },
        { type: 'false' }
      ],
      initial: true
    },
    node: {
      default: {},
      noSet: true
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
      preSetter: function(val) {
        const errTypes = checkArrayObject(val, eventTypes, function(fn, i, arr, objKey) {
          eventList[eventID++] = {type: objKey, fn: fn};
        });
        if (errTypes.length > 0) {
          const msg =
            'the given object contains items which are no valid event types:' + enlistItems(errTypes) +
            'Available event types are:' + enlistItems(eventTypes);
          propError('events', msg);
        }
      }
    }
  };

  //Initializing properties and methods
  (function() {
    initial = true;

    for (var prop in properties) {
      const item = prop;
      const obj = properties[item];

      //Calling Object.defineProperty on the `this` of the class function is nowhere documented
      //but it is necessary to be able to create multiple instances of the same class
      //as {Class}.prototype will inherit the defined property to all instances
      //and a new call of defineProperty (when creating a new instance) will throw an error for defining the same property twice
      Object.defineProperty(that, item, {
        set: function(val) {
          if (!obj.noSet) {
            if (!obj.initial || initial) {
              checkProp(item, val);
              if (obj.preSetter) (obj.preSetter)(val);
              vals[item] = val;
              if (!initial && obj.postSetter) (obj.postSetter)(val);
            } else error('property ‘' + item + '’ may only be set at init time but it was just set with the value ‘' + val + '’');
          } else error('property ‘' + item + '’ may only be read from but it was just set with the value ‘' + val + '’');
        },
        get: function() {
          return vals[item];
        }
      });

      if (config[item] !== undefined) {
        that[item] = config[item];
      } else {
        const def = obj.default;
        (obj.noSet ? vals : that)[item] = typeof def == 'function' ? def() : def;
      }
    }

    for (var method in methods) {
      const item = method;
      const obj = methods[item];
      Slider89.prototype[item] = function() {
        const args = Array.prototype.slice.call(arguments, 0, obj.args.length);
        checkMethod(item, args);
        return obj.function.apply(this, args);
      }
    }

    initial = false;
  })();

  //Building the slider element
  (function() {
    //No result node yet
    if (vals.structure == false) {
      //In case no custom structure is defined, manually build the node to ensure best performance (parseStructure takes a while)
      vals.node.slider = document.createElement('div');
      vals.node.track = document.createElement('div');
      vals.node.thumb = document.createElement('div');

      vals.node.track.appendChild(vals.node.thumb);
      vals.node.slider.appendChild(vals.node.track);

      vals.node.slider.classList.add('slider89');
      for (var element in vals.node)
        if (element != 'slider') vals.node[element].classList.add('sl89-' + element);
    } else {
      vals.node = parseStructure(vals.structure);
    }

    const node = vals.node;

    if (vals.classList) {
      const errNodes = checkArrayObject(vals.classList, node, function(str, i, arr, key) {
        node[key].classList.add(str);
      });
      if (errNodes.length > 0) {
        const msg =
          "the given object contains items which aren't nodes of this slider:" + enlistItems(errNodes) +
          "Following nodes are part of this slider's node pool:" + enlistItems(Object.keys(node))
        error(msg, 'classList', true);
      }
    }

    createStyleSheet();

    if (replace) target.parentNode.replaceChild(node.slider, target);
    else target.appendChild(node.slider);

    translateThumb(vals.value);

    node.thumb.addEventListener('touchstart', touchStart);
    node.thumb.addEventListener('touchmove', touchMove);
    node.thumb.addEventListener('touchend', touchEnd);
    node.thumb.addEventListener('touchcancel', touchEnd);

    node.thumb.addEventListener('mousedown', slideStart);
  })();

  //Misc initialization
  (function() {
    computeValue();
  })();


  // ------ Class methods ------
  function addEvent(type, fn, name) {
    (function() {
      for (var i = 0; i < eventTypes.length; i++) {
        if (type == eventTypes[i]) return;
      }
      error('the specified type ‘' + type + '’ is not a valid event type. Available types are:' + enlistItems(eventTypes), 'addEvent');
    })();
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
    } else eventList[key] = obj;
    return name || eventID++;
  }
  function removeEvent(key) {
    const listEntry = eventList[key];
    if (!listEntry) return false;
    delete eventList[key];
    return Array.isArray(listEntry) ? listEntry.reduce(handleEvents, new Array()) : handleEvents(new Array(), listEntry);

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
    let type = noIntro ? '' : 'but it is ';
    if (Array.isArray(variable)) type += 'an array';
    else if (polyIsNaN(variable)) type += 'NaN';
    else if (variable === null) type += 'null';
    else if (typeof variable == 'boolean') type += variable;
    else type += 'of type ' + typeof variable;

    return type;
  }
  function enlistItems(arr) {
    return '\n - "' + arr.join('"\n - "') + '"\n';
  }
  function checkArrayObject(val, reference, fn) {
    const errItems = new Array();
    for (var key in val) {
      const item = val[key];
      //If an item with index > 0 is errored, the loop will still have executed before it was reached
      //For now, this function is only used to throw on error, but it's something to keep in mind
      if ((Array.isArray(reference) ? !has(reference, key) : !reference[key])) errItems.push(key);
      else if (errItems.length == 0)
        for (var i = 0; i < item.length; i++)
          fn(item[i], i, item, key, val);
    }
    return errItems;
  }

  //MDN Polyfill @ Number.isNaN
  function polyIsNaN(val) {
    return Number.isNaN && Number.isNaN(val) || !Number.isNaN && typeof val === 'number' && val !== val;
  }
  //Extended {Array, String}.prototype.includes() polyfill
  function has(array, val, loop) {
    if (!Array.isArray(array)) return false;
    if (loop) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].indexOf(val) != -1) {
          return array[i];
        }
      }
    } else return array.indexOf(val) != -1;
  }

  function getTranslate(node) {
    const style = node.style.transform;
    if (!style) return false;
    const firstBracket = style.slice(style.indexOf('translateX(') + 'translateX('.length);
    return parseFloat(firstBracket.slice(0, firstBracket.indexOf(')')));
  }
  function translateThumb(value) {
    const absWidth = vals.node.track.clientWidth - vals.node.thumb.clientWidth;
    const distance = (value - vals.range[0]) / (vals.range[1] - vals.range[0]) * absWidth;
    vals.node.thumb.style.transform = 'translateX(' + distance + 'px)';
  }
  function computeValue(thumb, distance, events) {
    if (!thumb) thumb = vals.node.thumb;
    if (!distance) distance = getTranslate(thumb);

    const absWidth = vals.node.track.clientWidth - thumb.clientWidth;

    if (distance > absWidth) distance = absWidth;
    if (distance < 0) distance = 0;
    if (vals.step) {
      const relStep = absWidth / ((vals.range[1] - vals.range[0]) / vals.step);
      distance = Math.round(distance / relStep) * relStep;
      if (distance > absWidth) return;
    }
    thumb.style.transform = 'translateX(' + distance + 'px)';

    let val = distance / absWidth * (vals.range[1] - vals.range[0]) + vals.range[0];
    val = Number(val.toFixed(vals.precision));
    if (vals.value !== val) {
      vals.value = val;

      if (events) invokeEvent(events); //TODO--------------------------------------
    }
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
    if (activeTouchID == null) {
      e.preventDefault();
      activeTouchID = e.touches[0].identifier;
      slideStart.call(this, e.touches[0]);
    }
  }
  function touchMove(e) {
    if (e.touches[0].identifier == activeTouchID) {
      e.preventDefault();
      slideMove.call(this, e.touches[0]);
    }
  }
  function touchEnd(e) {
    if (activeTouchID != null) {
      e.preventDefault();
      if (e.touches.length == 0 || e.touches.length > 0 && e.touches[0].identifier !== activeTouchID) {
        slideEnd.call(this, e.touches[0]);
        activeTouchID = null;
      }
    }
  }
  function slideStart(e) {
    document.body.classList.add('sl89-noselect');
    vals.node.thumb.classList.add('active');
    activeThumb = this;
    mouseDownPos = e.clientX - getTranslate(this);
    invokeEvent(['start']);
    window.addEventListener('mouseup', slideEnd);
    window.addEventListener('mousemove', slideMove);
  }
  function slideMove(e) {
    const distance = e.clientX - mouseDownPos;
    computeValue(activeThumb, distance, ['move']);
  }
  function slideEnd() {
    window.removeEventListener('mouseup', slideEnd);
    window.removeEventListener('mousemove', slideMove);
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
    node.slider.classList.add('slider89');

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

    const reg = {
      attr: {
        name: '[\\w-]+',
        value: '[^()]*?'
      },
      all: '[\\d\\D]',
      tabSpace: '[ \\t]+',
      name: '[\\w-]+'
    };
    reg.capName = '(' + reg.name + ')';
    reg.glbMatch = '(?:' + reg.tabSpace + '(?:(?!<).)*?)?>';
    reg.general = {
      inner: '<([:/]?)' + reg.capName + '(?:' + reg.tabSpace + reg.name + ')?(?:' + reg.tabSpace + '(""))?' + reg.glbMatch,
      noEnd: '<' + reg.capName + '.*?',
      noBeginning: '(?:^|' + reg.tabSpace + ')' + reg.capName + reg.glbMatch,
    };
    reg.content = '(?:\\s+"('+reg.all+'+?)")*';
    reg.tag = '(?:\\s+' + reg.capName + ')*';
    reg.attribs = '(?:\\s+' + reg.attr.name + '\\(' + reg.attr.value + '\\))*';
    reg.base = reg.capName + reg.tag + reg.content + '(' + reg.attribs + ')\\s*?';
    const rgx = {
      general: reg.general.inner + '|' + reg.general.noEnd + '|' + reg.general.noBeginning,
      attributes: '\\s+(' + reg.attr.name + ')\\((' + reg.attr.value + ')\\)\\s*?',
      singleTag: '<' + reg.base + '>',
      multiTag: '<:' + reg.base + '>((?:'+reg.all+'(?!<:' + reg.capName + '(?:\\s+' + reg.name + ')*(?:\\s+"'+reg.all+'+?")*' + reg.attribs + '\\s*?>'+reg.all+'*?<\\/\\6\\s*>))*?)<\\/\\1\\s*>'
    };
    (function() {
      for (var expr in rgx) rgx[expr] = new RegExp(rgx[expr], 'g');
    })();

    let structure = structureStr;

    while (rgx.multiTag.test(structure)) {
      structure = structure.replace(rgx.multiTag, function(match, name, tag, inner, attributes, content) {
        const elem = assembleElement(name, tag, attributes);
        content = parseSingleTags(content, elem);
        if (inner) elem.textContent = inner;
        node[name] = elem;
        return content;
      });
    }

    structure = parseSingleTags(structure, node.slider);

    if (/\S+/g.test(structure)) {
      structure = structure.trim();
      const names = new Array();
      let leftover = false;
      if (rgx.general.test(structure)) {
        structure.replace(rgx.general, function(match, amplifier, name, content, name2, name3) {
          let nameObj = {};
          nameObj.name = name || name2 || name3;
          if (amplifier == ':') nameObj.error = 'isWrapper';
          else if (amplifier == '/') nameObj.error = 'isClosing';
          else if (content != null) nameObj.error = 'emptyContent';
          else if (name2) nameObj.error = 'noEnd';
          else if (name3) nameObj.error = 'noBeginning';
          names.push(nameObj);
        });
      } else leftover = true;

      const errorList = (function() {
        let info = '';
        if (!leftover) {
          info = 'Found errors:\n';
          names.forEach(function(name) {
            info += '- "' + name.name + '" => ';
            switch (name.error) {
              case 'isClosing':
                info += 'Closing tag finding no beginning (is the beginning marked with a ‘:’?)';
                break;
              case 'isWrapper':
                info += 'Opening tag finding no end';
                break;
              case 'emptyContent':
                info += 'Redundant empty text content (‘""’)';
                break;
              case 'noEnd':
                info += 'Missing ending character (‘>’)';
                break;
              case 'noBeginning':
                info += 'Missing beginning character (‘<’)';
                break;
              default:
                info += 'Unidentified error. Please check the element for syntax errors';
            }
            info += '.\n';
          });
        } else info += 'Leftover structure:\n- "' + structure + '"\n';
        return info;
      })();
      error((names.length > 1 ? 'several elements have' : 'an element has') + ' been declared wrongly and could not be parsed. ' + errorList, true, 'structure', true);
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
        if (childArr[i][1] == ':') {
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
        error('Every element must have a unique name but there are mutiple elements called ‘' + name + '’', true, 'structure');
      }
      let elem = document.createElement(tag || 'div');
      const hasAttribs = !!attribs[name];
      if (content) elem.textContent = content;
      if (attributes) {
        attributes.replace(rgx.attributes, function(attrib, attribName, value) {
          //Tailored for space-separated values (check for duplicates in value vs. default structue style)
          if (hasAttribs && attribs[name][attribName] && value.split(' ').indexOf(attribs[name][attribName]) == -1) {
            value += ' ' + attribs[name][attribName];
          }
          elem.setAttribute(attribName, value || '');
        });
      }
      if (hasAttribs) {
        for (var attr in attribs[name]) {
          if (!elem.getAttribute(attr)) elem.setAttribute(attr, attribs[name][attr]);
        }
      }
      return elem;
    }
  }

  //-> Methods & properties
  function propTypeError(prop, msg) {
    msg = 'property ‘' + prop + '’ must be ' + computeTypeMsg(properties[prop].structure, properties[prop].shape) + ' but it' + msg;
    propError(prop, msg, true);
  }
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
    const msg = checkTypes(val, properties[prop].structure, false);
    if (msg) propTypeError(prop, msg);
  }

  function checkTypes(val, structure, plural) {
    let msg = false;
    for (var i = 0; i < structure.length; i++) {
      const typeObj = structure[i];
      const type = typeObj.type;
      if (
        type == 'boolean' && typeof val == 'boolean' ||
        type == 'true' && val === true ||
        type == 'false' && val === false ||
        type == 'array' && Array.isArray(val) ||
        type == 'object' && typeof val == 'object' && !Array.isArray(val) && val !== null ||
        type == 'number' && typeof val == 'number' && !polyIsNaN(val) ||
        type == 'function' && typeof val == 'function' ||
        type == 'string' && typeof val == 'string'
      ) {
        if (type == 'array') {
          for (var n = 0; n < val.length; n++) {
            checkTypes(val[n], typeObj.structure, true);
          }
        } else if (type == 'object') {
          for (var key in val) {
            checkTypes(val[key], typeObj.structure, true);
          }
        }
        msg = checkConditions(typeObj, val);
        if (msg === false) return false;
        else break;
      }
    }
    return msg ? ' is ' + msg : (plural ? 's values are ' : ' is ') + typeMsg(val, true);

    function checkConditions(typeObj, val) {
      if (typeObj.conditions) {
        const type = typeObj.type;
        for (var i = 0; i < typeObj.conditions.length; i++) {
          const cond = typeObj.conditions[i];
          if (Array.isArray(cond)) {
            switch (cond[0]) {
              case 'length':
              if (val.length !== cond[1]) {
                return (type == 'array' ? 'an ' : 'a ') + type + ' of length ' + val.length;
              }
              break;
              case '>=':
              if (val < cond[1]) {
                return (cond[1] == 0 ? 'a negative number' : 'a number below ' + cond[1]);
              }
              break;
            }
          } else {
            switch (cond) {
              case 'int':
              if (val % 1 !== 0) {
                return 'a floating point number';
              }
              break;
              case 'not empty':
              if (val.trim() === '') {
                return 'an empty string';
              }
              break;
              case 'not number':
              if (!polyIsNaN(Number(val))) {
                return 'a pure number string';
              }
              break;
            }
          }
        }
      }
      return false;
    }
  }

  //Computing an automated error message regarding the property's types and conditions
  function computeTypeMsg(struct, shape, plural, deep) {
    let msg = '';
    for (var i = 0; i < struct.length; i++) {
      const type = struct[i].type;
      const conditions = struct[i].conditions;
      if (msg) msg += ' or ';

      if (type == 'number') {
        const limit = has(conditions, '>=', true);
        const hasInt = has(conditions, 'int');
        if (limit && limit[1] === 0) {
          if (!plural) msg += 'a ';
          msg += 'non-negative';
        } else if (hasInt && !plural) {
          msg += 'an';
        } else msg += 'any';
        if (hasInt) {
          msg += ' integer';
        } else {
          msg += ' number';
        }
        if (plural) msg += 's';
        if (limit && limit[1] !== 0) msg += ' which ' + (plural ? 'are' : 'is') + ' greater than or equal to ' + limit[1];
      }

      else if (type == 'array') {
        const len = has(conditions, 'length', true);

        const msgRes = computeTypeMsg(struct[i].structure, false, len && len[1] == 1 ? false : true, true);
        if (!plural) msg += 'a';
        if (deep) {
          msg += msgRes;
        } else if (!plural) {
          msg += 'n';
        }
        msg += ' array' + (plural ? 's' : '');
        if (len) msg += ' of length ' + len[1];
        if (!deep) msg += ' with ' + msgRes + ' as values';
      }

      else if (type == 'object') {
        msg += 'an object';
        msg += ' with ' + computeTypeMsg(struct[i].structure, false, true, true) + ' as values';
      }

      else if (type == 'function') {
        if (!deep) msg += 'a ';
        msg += 'function reference';
        if (!deep && plural) msg += 's';
      }

      else if (type == 'string') {
        if (!deep) msg += 'a ';
        if (has(conditions, 'not empty')) msg += 'non-empty ';
        if (has(conditions, 'not number')) msg += 'non-number ';
        msg += 'string';
        if (!deep && plural) msg += 's';
      }

      if (shape) {
        msg += ' (' + shape + ')';
        shape = false;
      }

      if (type == 'boolean') {
        msg += 'a boolean';
      } else if (type == 'true') {
        msg += 'true';
      } else if (type == 'false') {
        msg += 'false';
      }
    }

    return msg;
  }
}


/***/ })

/******/ })["default"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TbGlkZXI4OS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9TbGlkZXI4OS8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQWE7QUFDRTtBQUNmO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQixvQkFBb0I7QUFDcEIsb0JBQW9CO0FBQ3BCLHlDQUF5QztBQUN6QyxNQUFNO0FBQ04sa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixvQkFBb0I7QUFDcEIseUNBQXlDO0FBQ3pDLHVCQUF1QjtBQUN2QixNQUFNO0FBQ04scUJBQXFCO0FBQ3JCLGlDQUFpQztBQUNqQyw4QkFBOEI7QUFDOUIsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QjtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsU0FBUztBQUNUO0FBQ0E7QUFDQSxlQUFlLHVCQUF1QjtBQUN0QyxLQUFLO0FBQ0w7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFDVCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEMsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGNBQWM7QUFDNUI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQSxZQUFZLHFCQUFxQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGdCQUFnQjtBQUN6QztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwrQkFBK0I7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2xpZGVyODkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2xpZGVyODkodGFyZ2V0LCBjb25maWcsIHJlcGxhY2UpIHtcclxuICBpZiAoIXRhcmdldCkge1xyXG4gICAgZXJyb3IoJ25vIGZpcnN0IGFyZ3VtZW50IGhhcyBiZWVuIHN1cHBsaWVkLiBJdCBuZWVkcyB0byBiZSB0aGUgRE9NIHRhcmdldCBub2RlIGZvciB0aGUgc2xpZGVyJywgJ2NvbnN0cnVjdG9yJywgdHJ1ZSk7XHJcbiAgfSBlbHNlIGlmICghdGFyZ2V0Lm5vZGVUeXBlIHx8IHRhcmdldC5ub2RlVHlwZSAhPSAxKSB7XHJcbiAgICBlcnJvcigndGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSB2YWxpZCBET00gbm9kZSB0aGUgc2xpZGVyIHdpbGwgYmUgcGxhY2VkIGludG8gJyArIHR5cGVNc2codGFyZ2V0KSwgJ2NvbnN0cnVjdG9yJywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoY29uZmlnID09IHVuZGVmaW5lZCB8fCBjb25maWcgPT09IGZhbHNlKSB7XHJcbiAgICBjb25maWcgPSB7fTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcgIT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShjb25maWcpKSB7XHJcbiAgICBlcnJvcigndGhlIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCBuZWVkcyB0byBiZSBhbiBvYmplY3QgZm9yIGNvbmZpZ3VyYXRpb24gJyArIHR5cGVNc2coY29uZmlnKSwgJ2NvbnN0cnVjdG9yJywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0aGF0ID0gdGhpcztcclxuICBjb25zdCBldmVudFR5cGVzID0gW1xyXG4gICAgJ3N0YXJ0JyxcclxuICAgICdtb3ZlJyxcclxuICAgICdlbmQnXHJcbiAgXTtcclxuXHJcbiAgbGV0IGluaXRpYWwgPSBmYWxzZTtcclxuICBsZXQgYWN0aXZlVGh1bWI7XHJcbiAgbGV0IGFjdGl2ZVRvdWNoSUQ7XHJcbiAgbGV0IG1vdXNlRG93blBvcztcclxuICBsZXQgZXZlbnRJRCA9IDA7XHJcbiAgY29uc3QgZXZlbnRMaXN0ID0ge307XHJcbiAgY29uc3QgdmFscyA9IHt9OyAvL2hvbGRpbmcgZXZlcnkgcHJvcGVydHkgb2YgdGhlIGNsYXNzXHJcblxyXG4gIC8vU3R5bGUgcnVsZSBzdHJpbmdzIHdoaWNoIHdpbGwgYmUgaW5zZXJ0ZWQgaW50byBhIG5ld2x5IGNyZWF0ZWQgc3R5bGVzaGVldFxyXG4gIGNvbnN0IHN0eWxlcyA9IFtcclxuICAgICcuc2w4OS10cmFjayB7JyArXHJcbiAgICAgICd3aWR0aDogMjAwcHg7JyArIC8vMjE2P1xyXG4gICAgICAnaGVpZ2h0OiAyNXB4OycgK1xyXG4gICAgICAnYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDAlLCAxOCUpOycgK1xyXG4gICAgJ30nLFxyXG4gICAgJy5zbDg5LXRodW1iIHsnICtcclxuICAgICAgJ3dpZHRoOiAxNnB4OycgK1xyXG4gICAgICAnaGVpZ2h0OiAxMDAlOycgK1xyXG4gICAgICAnYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDAlLCAyOCUpOycgK1xyXG4gICAgICAnY3Vyc29yOiBwb2ludGVyOycgK1xyXG4gICAgJ30nLFxyXG4gICAgJy5zbDg5LW5vc2VsZWN0IHsnICtcclxuICAgICAgJy13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7JyArXHJcbiAgICAgICctbW96LXVzZXItc2VsZWN0OiBub25lOycgK1xyXG4gICAgICAnLW1zLXVzZXItc2VsZWN0OiBub25lOycgK1xyXG4gICAgICAndXNlci1zZWxlY3Q6IG5vbmU7JyArXHJcbiAgICAgICdwb2ludGVyLWV2ZW50czogbm9uZScgK1xyXG4gICAgJ30nXHJcbiAgXTtcclxuXHJcbiAgY29uc3QgbWV0aG9kcyA9IHtcclxuICAgIGFkZEV2ZW50OiB7XHJcbiAgICAgIGZ1bmN0aW9uOiBhZGRFdmVudCxcclxuICAgICAgYXJnczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6ICdldmVudCB0eXBlJyxcclxuICAgICAgICAgIHN0cnVjdHVyZTogW3tcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZydcclxuICAgICAgICAgIH1dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnZXZlbnQgZnVuY3Rpb24nLFxyXG4gICAgICAgICAgc3RydWN0dXJlOiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nXHJcbiAgICAgICAgICB9XVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogJ2V2ZW50IG5hbWVzcGFjZScsXHJcbiAgICAgICAgICBvcHRpb25hbDogdHJ1ZSxcclxuICAgICAgICAgIHN0cnVjdHVyZTogW3tcclxuICAgICAgICAgICAgdHlwZTogJ3N0cmluZycsXHJcbiAgICAgICAgICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgICAgICAgICAnbm90IGVtcHR5JyxcclxuICAgICAgICAgICAgICAnbm90IG51bWJlcidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9XHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICByZW1vdmVFdmVudDoge1xyXG4gICAgICBmdW5jdGlvbjogcmVtb3ZlRXZlbnQsXHJcbiAgICAgIGFyZ3M6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiAnZXZlbnQgaWRlbnRpZmllci9uYW1lc3BhY2UnLFxyXG4gICAgICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcclxuICAgICAgICAgICAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICBbJz49JywgMF0sXHJcbiAgICAgICAgICAgICAgICAnaW50J1xyXG4gICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICdub3QgZW1wdHknLFxyXG4gICAgICAgICAgICAgICAgJ25vdCBudW1iZXInXHJcbiAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcHJvcGVydGllcyA9IHtcclxuICAgIHJhbmdlOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFswLCAxMDBdLFxyXG4gICAgICBzdHJ1Y3R1cmU6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnYXJyYXknLFxyXG4gICAgICAgICAgY29uZGl0aW9uczogW1xyXG4gICAgICAgICAgICBbJ2xlbmd0aCcsIDJdXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAgICAgIHsgdHlwZTogJ251bWJlcicgfVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0eXBlOiAnYm9vbGVhbicgfVxyXG4gICAgICBdLFxyXG4gICAgICBzaGFwZTogJ1tzdGFydFZhbHVlLCBlbmRWYWx1ZV0nLFxyXG4gICAgICBwcmVTZXR0ZXI6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWxbMF0gPT09IHZhbFsxXSkge1xyXG4gICAgICAgICAgcHJvcEVycm9yKCdyYW5nZScsICd0aGUgZ2l2ZW4gcmFuZ2Ugb2YgWycgKyB2YWwuam9pbignLCAnKSArICddIGRlZmluZXMgdGhlIHNhbWUgdmFsdWUgZm9yIGJvdGggcmFuZ2Ugc3RhcnQgYW5kIGVuZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgcG9zdFNldHRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29tcHV0ZVZhbHVlKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICB2YWx1ZToge1xyXG4gICAgICBkZWZhdWx0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdmFscy5yYW5nZVswXTtcclxuICAgICAgfSxcclxuICAgICAgc3RydWN0dXJlOiBbe1xyXG4gICAgICAgIHR5cGU6ICdudW1iZXInXHJcbiAgICAgIH1dLFxyXG4gICAgICBwcmVTZXR0ZXI6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIHZhbHMucmFuZ2VbMF0gPiB2YWxzLnJhbmdlWzFdICYmICh2YWwgPiB2YWxzLnJhbmdlWzBdIHx8IHZhbCA8IHZhbHMucmFuZ2VbMV0pIHx8XHJcbiAgICAgICAgICB2YWxzLnJhbmdlWzFdID4gdmFscy5yYW5nZVswXSAmJiAodmFsIDwgdmFscy5yYW5nZVswXSB8fCB2YWwgPiB2YWxzLnJhbmdlWzFdKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgY29uc3QgcmFuZ2VTdHIgPSAnWycgKyB2YWxzLnJhbmdlLmpvaW4oJywgJykgKyAnXSc7XHJcbiAgICAgICAgICBwcm9wRXJyb3IoJ3ZhbHVlJywgJ3RoZSBnaXZlbiB2YWx1ZSBvZiAnICsgdmFsICsgJyBleGNlZWRzIHRoZSBjdXJyZW50bHkgc2V0IHJhbmdlIG9mICcgKyByYW5nZVN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBwb3N0U2V0dGVyOiB0cmFuc2xhdGVUaHVtYlxyXG4gICAgfSxcclxuICAgIHByZWNpc2lvbjoge1xyXG4gICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICBzdHJ1Y3R1cmU6IFt7XHJcbiAgICAgICAgdHlwZTogJ251bWJlcicsXHJcbiAgICAgICAgY29uZGl0aW9uczogW1xyXG4gICAgICAgICAgWyc+PScsIDBdLFxyXG4gICAgICAgICAgJ2ludCdcclxuICAgICAgICBdXHJcbiAgICAgIH1dLFxyXG4gICAgICBwb3N0U2V0dGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb21wdXRlVmFsdWUoKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0ZXA6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxyXG4gICAgICAgICAgY29uZGl0aW9uczogW1xyXG4gICAgICAgICAgICBbJz49JywgMF1cclxuICAgICAgICAgIF1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHByZVNldHRlcjogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbCAhPT0gZmFsc2UgJiYgTnVtYmVyKHZhbC50b0ZpeGVkKHZhbHMucHJlY2lzaW9uKSkgIT09IHZhbCkge1xyXG4gICAgICAgICAgcHJvcEVycm9yKCdzdGVwJywgJ3RoZSBnaXZlbiB2YWx1ZSBvZiAnICsgdmFsICsgJyBleGNlZWRzIHRoZSBjdXJyZW50bHkgc2V0IHByZWNpc2lvbiBvZiAnICsgdmFscy5wcmVjaXNpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgcG9zdFNldHRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29tcHV0ZVZhbHVlKCk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzdHJ1Y3R1cmU6IHtcclxuICAgICAgZGVmYXVsdDogZmFsc2UsXHJcbiAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxyXG4gICAgICAgICAgY29uZGl0aW9uczogW1xyXG4gICAgICAgICAgICAnbm90IGVtcHR5J1xyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0eXBlOiAnZmFsc2UnIH1cclxuICAgICAgXSxcclxuICAgICAgaW5pdGlhbDogdHJ1ZVxyXG4gICAgfSxcclxuICAgIG5vZGU6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIG5vU2V0OiB0cnVlXHJcbiAgICB9LFxyXG4gICAgY2xhc3NMaXN0OiB7XHJcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgICBzdHJ1Y3R1cmU6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcclxuICAgICAgICAgIHN0cnVjdHVyZTogW3tcclxuICAgICAgICAgICAgdHlwZTogJ2FycmF5JyxcclxuICAgICAgICAgICAgc3RydWN0dXJlOiBbXHJcbiAgICAgICAgICAgICAgeyB0eXBlOiAnc3RyaW5nJyB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH1dXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHR5cGU6ICdmYWxzZScgfVxyXG4gICAgICBdLFxyXG4gICAgICBpbml0aWFsOiB0cnVlLFxyXG4gICAgICBzaGFwZTogJ3tub2RlTmFtZTogWy4uLmNsYXNzZXNdfSdcclxuICAgIH0sXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgZGVmYXVsdDoge30sXHJcbiAgICAgIHN0cnVjdHVyZTogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxyXG4gICAgICAgICAgc3RydWN0dXJlOiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxyXG4gICAgICAgICAgICBzdHJ1Y3R1cmU6IFt7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdHlwZTogJ2ZhbHNlJyB9XHJcbiAgICAgIF0sXHJcbiAgICAgIGluaXRpYWw6IHRydWUsXHJcbiAgICAgIHByZVNldHRlcjogZnVuY3Rpb24odmFsKSB7XHJcbiAgICAgICAgY29uc3QgZXJyVHlwZXMgPSBjaGVja0FycmF5T2JqZWN0KHZhbCwgZXZlbnRUeXBlcywgZnVuY3Rpb24oZm4sIGksIGFyciwgb2JqS2V5KSB7XHJcbiAgICAgICAgICBldmVudExpc3RbZXZlbnRJRCsrXSA9IHt0eXBlOiBvYmpLZXksIGZuOiBmbn07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGVyclR5cGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IG1zZyA9XHJcbiAgICAgICAgICAgICd0aGUgZ2l2ZW4gb2JqZWN0IGNvbnRhaW5zIGl0ZW1zIHdoaWNoIGFyZSBubyB2YWxpZCBldmVudCB0eXBlczonICsgZW5saXN0SXRlbXMoZXJyVHlwZXMpICtcclxuICAgICAgICAgICAgJ0F2YWlsYWJsZSBldmVudCB0eXBlcyBhcmU6JyArIGVubGlzdEl0ZW1zKGV2ZW50VHlwZXMpO1xyXG4gICAgICAgICAgcHJvcEVycm9yKCdldmVudHMnLCBtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vSW5pdGlhbGl6aW5nIHByb3BlcnRpZXMgYW5kIG1ldGhvZHNcclxuICAoZnVuY3Rpb24oKSB7XHJcbiAgICBpbml0aWFsID0gdHJ1ZTtcclxuXHJcbiAgICBmb3IgKHZhciBwcm9wIGluIHByb3BlcnRpZXMpIHtcclxuICAgICAgY29uc3QgaXRlbSA9IHByb3A7XHJcbiAgICAgIGNvbnN0IG9iaiA9IHByb3BlcnRpZXNbaXRlbV07XHJcblxyXG4gICAgICAvL0NhbGxpbmcgT2JqZWN0LmRlZmluZVByb3BlcnR5IG9uIHRoZSBgdGhpc2Agb2YgdGhlIGNsYXNzIGZ1bmN0aW9uIGlzIG5vd2hlcmUgZG9jdW1lbnRlZFxyXG4gICAgICAvL2J1dCBpdCBpcyBuZWNlc3NhcnkgdG8gYmUgYWJsZSB0byBjcmVhdGUgbXVsdGlwbGUgaW5zdGFuY2VzIG9mIHRoZSBzYW1lIGNsYXNzXHJcbiAgICAgIC8vYXMge0NsYXNzfS5wcm90b3R5cGUgd2lsbCBpbmhlcml0IHRoZSBkZWZpbmVkIHByb3BlcnR5IHRvIGFsbCBpbnN0YW5jZXNcclxuICAgICAgLy9hbmQgYSBuZXcgY2FsbCBvZiBkZWZpbmVQcm9wZXJ0eSAod2hlbiBjcmVhdGluZyBhIG5ldyBpbnN0YW5jZSkgd2lsbCB0aHJvdyBhbiBlcnJvciBmb3IgZGVmaW5pbmcgdGhlIHNhbWUgcHJvcGVydHkgdHdpY2VcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoYXQsIGl0ZW0sIHtcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICAgICAgaWYgKCFvYmoubm9TZXQpIHtcclxuICAgICAgICAgICAgaWYgKCFvYmouaW5pdGlhbCB8fCBpbml0aWFsKSB7XHJcbiAgICAgICAgICAgICAgY2hlY2tQcm9wKGl0ZW0sIHZhbCk7XHJcbiAgICAgICAgICAgICAgaWYgKG9iai5wcmVTZXR0ZXIpIChvYmoucHJlU2V0dGVyKSh2YWwpO1xyXG4gICAgICAgICAgICAgIHZhbHNbaXRlbV0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgaWYgKCFpbml0aWFsICYmIG9iai5wb3N0U2V0dGVyKSAob2JqLnBvc3RTZXR0ZXIpKHZhbCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBlcnJvcigncHJvcGVydHkg4oCYJyArIGl0ZW0gKyAn4oCZIG1heSBvbmx5IGJlIHNldCBhdCBpbml0IHRpbWUgYnV0IGl0IHdhcyBqdXN0IHNldCB3aXRoIHRoZSB2YWx1ZSDigJgnICsgdmFsICsgJ+KAmScpO1xyXG4gICAgICAgICAgfSBlbHNlIGVycm9yKCdwcm9wZXJ0eSDigJgnICsgaXRlbSArICfigJkgbWF5IG9ubHkgYmUgcmVhZCBmcm9tIGJ1dCBpdCB3YXMganVzdCBzZXQgd2l0aCB0aGUgdmFsdWUg4oCYJyArIHZhbCArICfigJknKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdmFsc1tpdGVtXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKGNvbmZpZ1tpdGVtXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhhdFtpdGVtXSA9IGNvbmZpZ1tpdGVtXTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBkZWYgPSBvYmouZGVmYXVsdDtcclxuICAgICAgICAob2JqLm5vU2V0ID8gdmFscyA6IHRoYXQpW2l0ZW1dID0gdHlwZW9mIGRlZiA9PSAnZnVuY3Rpb24nID8gZGVmKCkgOiBkZWY7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBtZXRob2QgaW4gbWV0aG9kcykge1xyXG4gICAgICBjb25zdCBpdGVtID0gbWV0aG9kO1xyXG4gICAgICBjb25zdCBvYmogPSBtZXRob2RzW2l0ZW1dO1xyXG4gICAgICBTbGlkZXI4OS5wcm90b3R5cGVbaXRlbV0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCBvYmouYXJncy5sZW5ndGgpO1xyXG4gICAgICAgIGNoZWNrTWV0aG9kKGl0ZW0sIGFyZ3MpO1xyXG4gICAgICAgIHJldHVybiBvYmouZnVuY3Rpb24uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0aWFsID0gZmFsc2U7XHJcbiAgfSkoKTtcclxuXHJcbiAgLy9CdWlsZGluZyB0aGUgc2xpZGVyIGVsZW1lbnRcclxuICAoZnVuY3Rpb24oKSB7XHJcbiAgICAvL05vIHJlc3VsdCBub2RlIHlldFxyXG4gICAgaWYgKHZhbHMuc3RydWN0dXJlID09IGZhbHNlKSB7XHJcbiAgICAgIC8vSW4gY2FzZSBubyBjdXN0b20gc3RydWN0dXJlIGlzIGRlZmluZWQsIG1hbnVhbGx5IGJ1aWxkIHRoZSBub2RlIHRvIGVuc3VyZSBiZXN0IHBlcmZvcm1hbmNlIChwYXJzZVN0cnVjdHVyZSB0YWtlcyBhIHdoaWxlKVxyXG4gICAgICB2YWxzLm5vZGUuc2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgIHZhbHMubm9kZS50cmFjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICB2YWxzLm5vZGUudGh1bWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgIHZhbHMubm9kZS50cmFjay5hcHBlbmRDaGlsZCh2YWxzLm5vZGUudGh1bWIpO1xyXG4gICAgICB2YWxzLm5vZGUuc2xpZGVyLmFwcGVuZENoaWxkKHZhbHMubm9kZS50cmFjayk7XHJcblxyXG4gICAgICB2YWxzLm5vZGUuc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlcjg5Jyk7XHJcbiAgICAgIGZvciAodmFyIGVsZW1lbnQgaW4gdmFscy5ub2RlKVxyXG4gICAgICAgIGlmIChlbGVtZW50ICE9ICdzbGlkZXInKSB2YWxzLm5vZGVbZWxlbWVudF0uY2xhc3NMaXN0LmFkZCgnc2w4OS0nICsgZWxlbWVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWxzLm5vZGUgPSBwYXJzZVN0cnVjdHVyZSh2YWxzLnN0cnVjdHVyZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgbm9kZSA9IHZhbHMubm9kZTtcclxuXHJcbiAgICBpZiAodmFscy5jbGFzc0xpc3QpIHtcclxuICAgICAgY29uc3QgZXJyTm9kZXMgPSBjaGVja0FycmF5T2JqZWN0KHZhbHMuY2xhc3NMaXN0LCBub2RlLCBmdW5jdGlvbihzdHIsIGksIGFyciwga2V5KSB7XHJcbiAgICAgICAgbm9kZVtrZXldLmNsYXNzTGlzdC5hZGQoc3RyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChlcnJOb2Rlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgbXNnID1cclxuICAgICAgICAgIFwidGhlIGdpdmVuIG9iamVjdCBjb250YWlucyBpdGVtcyB3aGljaCBhcmVuJ3Qgbm9kZXMgb2YgdGhpcyBzbGlkZXI6XCIgKyBlbmxpc3RJdGVtcyhlcnJOb2RlcykgK1xyXG4gICAgICAgICAgXCJGb2xsb3dpbmcgbm9kZXMgYXJlIHBhcnQgb2YgdGhpcyBzbGlkZXIncyBub2RlIHBvb2w6XCIgKyBlbmxpc3RJdGVtcyhPYmplY3Qua2V5cyhub2RlKSlcclxuICAgICAgICBlcnJvcihtc2csICdjbGFzc0xpc3QnLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVN0eWxlU2hlZXQoKTtcclxuXHJcbiAgICBpZiAocmVwbGFjZSkgdGFyZ2V0LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5vZGUuc2xpZGVyLCB0YXJnZXQpO1xyXG4gICAgZWxzZSB0YXJnZXQuYXBwZW5kQ2hpbGQobm9kZS5zbGlkZXIpO1xyXG5cclxuICAgIHRyYW5zbGF0ZVRodW1iKHZhbHMudmFsdWUpO1xyXG5cclxuICAgIG5vZGUudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoU3RhcnQpO1xyXG4gICAgbm9kZS50aHVtYi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaE1vdmUpO1xyXG4gICAgbm9kZS50aHVtYi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoRW5kKTtcclxuICAgIG5vZGUudGh1bWIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0b3VjaEVuZCk7XHJcblxyXG4gICAgbm9kZS50aHVtYi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzbGlkZVN0YXJ0KTtcclxuICB9KSgpO1xyXG5cclxuICAvL01pc2MgaW5pdGlhbGl6YXRpb25cclxuICAoZnVuY3Rpb24oKSB7XHJcbiAgICBjb21wdXRlVmFsdWUoKTtcclxuICB9KSgpO1xyXG5cclxuXHJcbiAgLy8gLS0tLS0tIENsYXNzIG1ldGhvZHMgLS0tLS0tXHJcbiAgZnVuY3Rpb24gYWRkRXZlbnQodHlwZSwgZm4sIG5hbWUpIHtcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudFR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gZXZlbnRUeXBlc1tpXSkgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGVycm9yKCd0aGUgc3BlY2lmaWVkIHR5cGUg4oCYJyArIHR5cGUgKyAn4oCZIGlzIG5vdCBhIHZhbGlkIGV2ZW50IHR5cGUuIEF2YWlsYWJsZSB0eXBlcyBhcmU6JyArIGVubGlzdEl0ZW1zKGV2ZW50VHlwZXMpLCAnYWRkRXZlbnQnKTtcclxuICAgIH0pKCk7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFscy5ldmVudHNbdHlwZV0pKSB2YWxzLmV2ZW50c1t0eXBlXSA9IG5ldyBBcnJheSgpO1xyXG4gICAgdmFscy5ldmVudHNbdHlwZV0ucHVzaChmbik7XHJcbiAgICBjb25zdCBrZXkgPSBuYW1lIHx8IGV2ZW50SUQ7XHJcbiAgICBjb25zdCBvYmogPSB7XHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgIGZuOiBmblxyXG4gICAgfTtcclxuICAgIGlmIChuYW1lKSB7XHJcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShldmVudExpc3Rba2V5XSkpIGV2ZW50TGlzdFtrZXldID0gbmV3IEFycmF5KCk7XHJcbiAgICAgIGV2ZW50TGlzdFtrZXldLnB1c2gob2JqKTtcclxuICAgIH0gZWxzZSBldmVudExpc3Rba2V5XSA9IG9iajtcclxuICAgIHJldHVybiBuYW1lIHx8IGV2ZW50SUQrKztcclxuICB9XHJcbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnQoa2V5KSB7XHJcbiAgICBjb25zdCBsaXN0RW50cnkgPSBldmVudExpc3Rba2V5XTtcclxuICAgIGlmICghbGlzdEVudHJ5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBkZWxldGUgZXZlbnRMaXN0W2tleV07XHJcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShsaXN0RW50cnkpID8gbGlzdEVudHJ5LnJlZHVjZShoYW5kbGVFdmVudHMsIG5ldyBBcnJheSgpKSA6IGhhbmRsZUV2ZW50cyhuZXcgQXJyYXkoKSwgbGlzdEVudHJ5KTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVFdmVudHMoYWNjLCBlbnRyeSkge1xyXG4gICAgICBjb25zdCB0eXBlRXZlbnRzID0gdmFscy5ldmVudHNbZW50cnkudHlwZV07XHJcbiAgICAgIGNvbnN0IGRlbGV0ZWQgPSB0eXBlRXZlbnRzLnNwbGljZSh0eXBlRXZlbnRzLmluZGV4T2YoZW50cnkuZm4pLCAxKVswXTtcclxuICAgICAgaWYgKHR5cGVFdmVudHMubGVuZ3RoID09PSAwKSBkZWxldGUgdmFscy5ldmVudHNbZW50cnkudHlwZV07XHJcbiAgICAgIGFjYy5wdXNoKGRlbGV0ZWQpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tIEhlbHBlciBmdW5jdGlvbnMgLS0tLS0tXHJcbiAgZnVuY3Rpb24gZXJyb3IobXNnLCB0YXJnZXQsIGFib3J0KSB7XHJcbiAgICAvL1RPRE86IHJlZmVyIHRvIGRvY3NcclxuICAgIG1zZyA9ICdTbGlkZXI4OScgKyAodGFyZ2V0ID8gJyBAICcgKyB0YXJnZXQgOiAnJykgKyAnOiAnICsgbXNnO1xyXG4gICAgaWYgKG1zZ1ttc2cubGVuZ3RoIC0gMV0gIT0gJ1xcbicgJiYgbXNnW21zZy5sZW5ndGggLSAxXSAhPSAnLicpIG1zZyArPSAnLlxcbic7XHJcbiAgICBpZiAoaW5pdGlhbCB8fCBhYm9ydCkgbXNnICs9ICdBYm9ydGluZyB0aGUgc2xpZGVyIGNvbnN0cnVjdGlvbi4nO1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHR5cGVNc2codmFyaWFibGUsIG5vSW50cm8pIHtcclxuICAgIGxldCB0eXBlID0gbm9JbnRybyA/ICcnIDogJ2J1dCBpdCBpcyAnO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFyaWFibGUpKSB0eXBlICs9ICdhbiBhcnJheSc7XHJcbiAgICBlbHNlIGlmIChwb2x5SXNOYU4odmFyaWFibGUpKSB0eXBlICs9ICdOYU4nO1xyXG4gICAgZWxzZSBpZiAodmFyaWFibGUgPT09IG51bGwpIHR5cGUgKz0gJ251bGwnO1xyXG4gICAgZWxzZSBpZiAodHlwZW9mIHZhcmlhYmxlID09ICdib29sZWFuJykgdHlwZSArPSB2YXJpYWJsZTtcclxuICAgIGVsc2UgdHlwZSArPSAnb2YgdHlwZSAnICsgdHlwZW9mIHZhcmlhYmxlO1xyXG5cclxuICAgIHJldHVybiB0eXBlO1xyXG4gIH1cclxuICBmdW5jdGlvbiBlbmxpc3RJdGVtcyhhcnIpIHtcclxuICAgIHJldHVybiAnXFxuIC0gXCInICsgYXJyLmpvaW4oJ1wiXFxuIC0gXCInKSArICdcIlxcbic7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGNoZWNrQXJyYXlPYmplY3QodmFsLCByZWZlcmVuY2UsIGZuKSB7XHJcbiAgICBjb25zdCBlcnJJdGVtcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgZm9yICh2YXIga2V5IGluIHZhbCkge1xyXG4gICAgICBjb25zdCBpdGVtID0gdmFsW2tleV07XHJcbiAgICAgIC8vSWYgYW4gaXRlbSB3aXRoIGluZGV4ID4gMCBpcyBlcnJvcmVkLCB0aGUgbG9vcCB3aWxsIHN0aWxsIGhhdmUgZXhlY3V0ZWQgYmVmb3JlIGl0IHdhcyByZWFjaGVkXHJcbiAgICAgIC8vRm9yIG5vdywgdGhpcyBmdW5jdGlvbiBpcyBvbmx5IHVzZWQgdG8gdGhyb3cgb24gZXJyb3IsIGJ1dCBpdCdzIHNvbWV0aGluZyB0byBrZWVwIGluIG1pbmRcclxuICAgICAgaWYgKChBcnJheS5pc0FycmF5KHJlZmVyZW5jZSkgPyAhaGFzKHJlZmVyZW5jZSwga2V5KSA6ICFyZWZlcmVuY2Vba2V5XSkpIGVyckl0ZW1zLnB1c2goa2V5KTtcclxuICAgICAgZWxzZSBpZiAoZXJySXRlbXMubGVuZ3RoID09IDApXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgZm4oaXRlbVtpXSwgaSwgaXRlbSwga2V5LCB2YWwpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVyckl0ZW1zO1xyXG4gIH1cclxuXHJcbiAgLy9NRE4gUG9seWZpbGwgQCBOdW1iZXIuaXNOYU5cclxuICBmdW5jdGlvbiBwb2x5SXNOYU4odmFsKSB7XHJcbiAgICByZXR1cm4gTnVtYmVyLmlzTmFOICYmIE51bWJlci5pc05hTih2YWwpIHx8ICFOdW1iZXIuaXNOYU4gJiYgdHlwZW9mIHZhbCA9PT0gJ251bWJlcicgJiYgdmFsICE9PSB2YWw7XHJcbiAgfVxyXG4gIC8vRXh0ZW5kZWQge0FycmF5LCBTdHJpbmd9LnByb3RvdHlwZS5pbmNsdWRlcygpIHBvbHlmaWxsXHJcbiAgZnVuY3Rpb24gaGFzKGFycmF5LCB2YWwsIGxvb3ApIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChsb29wKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoYXJyYXlbaV0uaW5kZXhPZih2YWwpICE9IC0xKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXJyYXlbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgcmV0dXJuIGFycmF5LmluZGV4T2YodmFsKSAhPSAtMTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFRyYW5zbGF0ZShub2RlKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IG5vZGUuc3R5bGUudHJhbnNmb3JtO1xyXG4gICAgaWYgKCFzdHlsZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgZmlyc3RCcmFja2V0ID0gc3R5bGUuc2xpY2Uoc3R5bGUuaW5kZXhPZigndHJhbnNsYXRlWCgnKSArICd0cmFuc2xhdGVYKCcubGVuZ3RoKTtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KGZpcnN0QnJhY2tldC5zbGljZSgwLCBmaXJzdEJyYWNrZXQuaW5kZXhPZignKScpKSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZVRodW1iKHZhbHVlKSB7XHJcbiAgICBjb25zdCBhYnNXaWR0aCA9IHZhbHMubm9kZS50cmFjay5jbGllbnRXaWR0aCAtIHZhbHMubm9kZS50aHVtYi5jbGllbnRXaWR0aDtcclxuICAgIGNvbnN0IGRpc3RhbmNlID0gKHZhbHVlIC0gdmFscy5yYW5nZVswXSkgLyAodmFscy5yYW5nZVsxXSAtIHZhbHMucmFuZ2VbMF0pICogYWJzV2lkdGg7XHJcbiAgICB2YWxzLm5vZGUudGh1bWIuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVgoJyArIGRpc3RhbmNlICsgJ3B4KSc7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIGNvbXB1dGVWYWx1ZSh0aHVtYiwgZGlzdGFuY2UsIGV2ZW50cykge1xyXG4gICAgaWYgKCF0aHVtYikgdGh1bWIgPSB2YWxzLm5vZGUudGh1bWI7XHJcbiAgICBpZiAoIWRpc3RhbmNlKSBkaXN0YW5jZSA9IGdldFRyYW5zbGF0ZSh0aHVtYik7XHJcblxyXG4gICAgY29uc3QgYWJzV2lkdGggPSB2YWxzLm5vZGUudHJhY2suY2xpZW50V2lkdGggLSB0aHVtYi5jbGllbnRXaWR0aDtcclxuXHJcbiAgICBpZiAoZGlzdGFuY2UgPiBhYnNXaWR0aCkgZGlzdGFuY2UgPSBhYnNXaWR0aDtcclxuICAgIGlmIChkaXN0YW5jZSA8IDApIGRpc3RhbmNlID0gMDtcclxuICAgIGlmICh2YWxzLnN0ZXApIHtcclxuICAgICAgY29uc3QgcmVsU3RlcCA9IGFic1dpZHRoIC8gKCh2YWxzLnJhbmdlWzFdIC0gdmFscy5yYW5nZVswXSkgLyB2YWxzLnN0ZXApO1xyXG4gICAgICBkaXN0YW5jZSA9IE1hdGgucm91bmQoZGlzdGFuY2UgLyByZWxTdGVwKSAqIHJlbFN0ZXA7XHJcbiAgICAgIGlmIChkaXN0YW5jZSA+IGFic1dpZHRoKSByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aHVtYi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWCgnICsgZGlzdGFuY2UgKyAncHgpJztcclxuXHJcbiAgICBsZXQgdmFsID0gZGlzdGFuY2UgLyBhYnNXaWR0aCAqICh2YWxzLnJhbmdlWzFdIC0gdmFscy5yYW5nZVswXSkgKyB2YWxzLnJhbmdlWzBdO1xyXG4gICAgdmFsID0gTnVtYmVyKHZhbC50b0ZpeGVkKHZhbHMucHJlY2lzaW9uKSk7XHJcbiAgICBpZiAodmFscy52YWx1ZSAhPT0gdmFsKSB7XHJcbiAgICAgIHZhbHMudmFsdWUgPSB2YWw7XHJcblxyXG4gICAgICBpZiAoZXZlbnRzKSBpbnZva2VFdmVudChldmVudHMpOyAvL1RPRE8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tIEV2ZW50IGZ1bmN0aW9ucyAtLS0tLS1cclxuICBmdW5jdGlvbiBpbnZva2VFdmVudCh0eXBlcykge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBmdW5jdGlvbnMgPSB2YWxzLmV2ZW50c1t0eXBlc1tpXV07XHJcbiAgICAgIGlmIChmdW5jdGlvbnMpIHtcclxuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGZ1bmN0aW9ucy5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgZnVuY3Rpb25zW25dLmNhbGwodGhhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIC0+IEV2ZW50IGxpc3RlbmVyc1xyXG4gIC8vVE9ETzogZG9uJ3QgZXhwbGljaXRseSB0cmFjayBpbmRleCAwLiBJdCB3b3JrcyBpbiBhbGwgbXkgdGVzdHMgYnV0IGVzcGVjaWFsbHkgb24gQVBJcyBsaWtlIHRoZXNlLCBicm93c2VycyBhbmQgb3BlcmF0aW5nIHN5c3RlbXMgdmFyeSBzdHJvbmdseVxyXG4gIGZ1bmN0aW9uIHRvdWNoU3RhcnQoZSkge1xyXG4gICAgaWYgKGFjdGl2ZVRvdWNoSUQgPT0gbnVsbCkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGFjdGl2ZVRvdWNoSUQgPSBlLnRvdWNoZXNbMF0uaWRlbnRpZmllcjtcclxuICAgICAgc2xpZGVTdGFydC5jYWxsKHRoaXMsIGUudG91Y2hlc1swXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHRvdWNoTW92ZShlKSB7XHJcbiAgICBpZiAoZS50b3VjaGVzWzBdLmlkZW50aWZpZXIgPT0gYWN0aXZlVG91Y2hJRCkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHNsaWRlTW92ZS5jYWxsKHRoaXMsIGUudG91Y2hlc1swXSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHRvdWNoRW5kKGUpIHtcclxuICAgIGlmIChhY3RpdmVUb3VjaElEICE9IG51bGwpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PSAwIHx8IGUudG91Y2hlcy5sZW5ndGggPiAwICYmIGUudG91Y2hlc1swXS5pZGVudGlmaWVyICE9PSBhY3RpdmVUb3VjaElEKSB7XHJcbiAgICAgICAgc2xpZGVFbmQuY2FsbCh0aGlzLCBlLnRvdWNoZXNbMF0pO1xyXG4gICAgICAgIGFjdGl2ZVRvdWNoSUQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNsaWRlU3RhcnQoZSkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzbDg5LW5vc2VsZWN0Jyk7XHJcbiAgICB2YWxzLm5vZGUudGh1bWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICBhY3RpdmVUaHVtYiA9IHRoaXM7XHJcbiAgICBtb3VzZURvd25Qb3MgPSBlLmNsaWVudFggLSBnZXRUcmFuc2xhdGUodGhpcyk7XHJcbiAgICBpbnZva2VFdmVudChbJ3N0YXJ0J10pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzbGlkZUVuZCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc2xpZGVNb3ZlKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gc2xpZGVNb3ZlKGUpIHtcclxuICAgIGNvbnN0IGRpc3RhbmNlID0gZS5jbGllbnRYIC0gbW91c2VEb3duUG9zO1xyXG4gICAgY29tcHV0ZVZhbHVlKGFjdGl2ZVRodW1iLCBkaXN0YW5jZSwgWydtb3ZlJ10pO1xyXG4gIH1cclxuICBmdW5jdGlvbiBzbGlkZUVuZCgpIHtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgc2xpZGVFbmQpO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHNsaWRlTW92ZSk7XHJcbiAgICBtb3VzZURvd25Qb3MgPSBudWxsO1xyXG4gICAgYWN0aXZlVGh1bWIgPSBudWxsO1xyXG4gICAgaW52b2tlRXZlbnQoWydlbmQnXSk7XHJcbiAgICB2YWxzLm5vZGUudGh1bWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3NsODktbm9zZWxlY3QnKTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLSBTY29wZS1zcGVjaWZpYyBmdW5jdGlvbnMgLS0tLS0tXHJcbiAgLy8gLT4gRWxlbWVudCBidWlsZGluZ1xyXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0eWxlU2hlZXQoKSB7XHJcbiAgICBjb25zdCBzaGVldCA9IChmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgZmlyc3RIZWFkQ2hpbGQgPSBkb2N1bWVudC5oZWFkLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICBpZiAoZmlyc3RIZWFkQ2hpbGQpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQuaGVhZC5pbnNlcnRCZWZvcmUoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSwgZmlyc3RIZWFkQ2hpbGQpLnNoZWV0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJykpLnNoZWV0O1xyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgc2hlZXQuaW5zZXJ0UnVsZShzdHlsZXNbaV0sIDApO1xyXG4gICAgfVxyXG4gIH1cclxuICBmdW5jdGlvbiBwYXJzZVN0cnVjdHVyZShzdHJ1Y3R1cmVTdHIpIHtcclxuICAgIGNvbnN0IG5vZGUgPSB7XHJcbiAgICAgIHNsaWRlcjogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIH07XHJcbiAgICBub2RlLnNsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXI4OScpO1xyXG5cclxuICAgIGNvbnN0IGF0dHJpYnMgPSB7fTtcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgZGVmTm9kZXMgPSBbXHJcbiAgICAgICAgJ3RyYWNrJyxcclxuICAgICAgICAndGh1bWInXHJcbiAgICAgIF07XHJcbiAgICAgIGRlZk5vZGVzLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xyXG4gICAgICAgIGF0dHJpYnNbbm9kZV0gPSB7XHJcbiAgICAgICAgICBjbGFzczogJ3NsODktJyArIG5vZGVcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgY29uc3QgcmVnID0ge1xyXG4gICAgICBhdHRyOiB7XHJcbiAgICAgICAgbmFtZTogJ1tcXFxcdy1dKycsXHJcbiAgICAgICAgdmFsdWU6ICdbXigpXSo/J1xyXG4gICAgICB9LFxyXG4gICAgICBhbGw6ICdbXFxcXGRcXFxcRF0nLFxyXG4gICAgICB0YWJTcGFjZTogJ1sgXFxcXHRdKycsXHJcbiAgICAgIG5hbWU6ICdbXFxcXHctXSsnXHJcbiAgICB9O1xyXG4gICAgcmVnLmNhcE5hbWUgPSAnKCcgKyByZWcubmFtZSArICcpJztcclxuICAgIHJlZy5nbGJNYXRjaCA9ICcoPzonICsgcmVnLnRhYlNwYWNlICsgJyg/Oig/ITwpLikqPyk/Pic7XHJcbiAgICByZWcuZ2VuZXJhbCA9IHtcclxuICAgICAgaW5uZXI6ICc8KFs6L10/KScgKyByZWcuY2FwTmFtZSArICcoPzonICsgcmVnLnRhYlNwYWNlICsgcmVnLm5hbWUgKyAnKT8oPzonICsgcmVnLnRhYlNwYWNlICsgJyhcIlwiKSk/JyArIHJlZy5nbGJNYXRjaCxcclxuICAgICAgbm9FbmQ6ICc8JyArIHJlZy5jYXBOYW1lICsgJy4qPycsXHJcbiAgICAgIG5vQmVnaW5uaW5nOiAnKD86XnwnICsgcmVnLnRhYlNwYWNlICsgJyknICsgcmVnLmNhcE5hbWUgKyByZWcuZ2xiTWF0Y2gsXHJcbiAgICB9O1xyXG4gICAgcmVnLmNvbnRlbnQgPSAnKD86XFxcXHMrXCIoJytyZWcuYWxsKycrPylcIikqJztcclxuICAgIHJlZy50YWcgPSAnKD86XFxcXHMrJyArIHJlZy5jYXBOYW1lICsgJykqJztcclxuICAgIHJlZy5hdHRyaWJzID0gJyg/OlxcXFxzKycgKyByZWcuYXR0ci5uYW1lICsgJ1xcXFwoJyArIHJlZy5hdHRyLnZhbHVlICsgJ1xcXFwpKSonO1xyXG4gICAgcmVnLmJhc2UgPSByZWcuY2FwTmFtZSArIHJlZy50YWcgKyByZWcuY29udGVudCArICcoJyArIHJlZy5hdHRyaWJzICsgJylcXFxccyo/JztcclxuICAgIGNvbnN0IHJneCA9IHtcclxuICAgICAgZ2VuZXJhbDogcmVnLmdlbmVyYWwuaW5uZXIgKyAnfCcgKyByZWcuZ2VuZXJhbC5ub0VuZCArICd8JyArIHJlZy5nZW5lcmFsLm5vQmVnaW5uaW5nLFxyXG4gICAgICBhdHRyaWJ1dGVzOiAnXFxcXHMrKCcgKyByZWcuYXR0ci5uYW1lICsgJylcXFxcKCgnICsgcmVnLmF0dHIudmFsdWUgKyAnKVxcXFwpXFxcXHMqPycsXHJcbiAgICAgIHNpbmdsZVRhZzogJzwnICsgcmVnLmJhc2UgKyAnPicsXHJcbiAgICAgIG11bHRpVGFnOiAnPDonICsgcmVnLmJhc2UgKyAnPigoPzonK3JlZy5hbGwrJyg/ITw6JyArIHJlZy5jYXBOYW1lICsgJyg/OlxcXFxzKycgKyByZWcubmFtZSArICcpKig/OlxcXFxzK1wiJytyZWcuYWxsKycrP1wiKSonICsgcmVnLmF0dHJpYnMgKyAnXFxcXHMqPz4nK3JlZy5hbGwrJyo/PFxcXFwvXFxcXDZcXFxccyo+KSkqPyk8XFxcXC9cXFxcMVxcXFxzKj4nXHJcbiAgICB9O1xyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICBmb3IgKHZhciBleHByIGluIHJneCkgcmd4W2V4cHJdID0gbmV3IFJlZ0V4cChyZ3hbZXhwcl0sICdnJyk7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGxldCBzdHJ1Y3R1cmUgPSBzdHJ1Y3R1cmVTdHI7XHJcblxyXG4gICAgd2hpbGUgKHJneC5tdWx0aVRhZy50ZXN0KHN0cnVjdHVyZSkpIHtcclxuICAgICAgc3RydWN0dXJlID0gc3RydWN0dXJlLnJlcGxhY2Uocmd4Lm11bHRpVGFnLCBmdW5jdGlvbihtYXRjaCwgbmFtZSwgdGFnLCBpbm5lciwgYXR0cmlidXRlcywgY29udGVudCkge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBhc3NlbWJsZUVsZW1lbnQobmFtZSwgdGFnLCBhdHRyaWJ1dGVzKTtcclxuICAgICAgICBjb250ZW50ID0gcGFyc2VTaW5nbGVUYWdzKGNvbnRlbnQsIGVsZW0pO1xyXG4gICAgICAgIGlmIChpbm5lcikgZWxlbS50ZXh0Q29udGVudCA9IGlubmVyO1xyXG4gICAgICAgIG5vZGVbbmFtZV0gPSBlbGVtO1xyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdHJ1Y3R1cmUgPSBwYXJzZVNpbmdsZVRhZ3Moc3RydWN0dXJlLCBub2RlLnNsaWRlcik7XHJcblxyXG4gICAgaWYgKC9cXFMrL2cudGVzdChzdHJ1Y3R1cmUpKSB7XHJcbiAgICAgIHN0cnVjdHVyZSA9IHN0cnVjdHVyZS50cmltKCk7XHJcbiAgICAgIGNvbnN0IG5hbWVzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgIGxldCBsZWZ0b3ZlciA9IGZhbHNlO1xyXG4gICAgICBpZiAocmd4LmdlbmVyYWwudGVzdChzdHJ1Y3R1cmUpKSB7XHJcbiAgICAgICAgc3RydWN0dXJlLnJlcGxhY2Uocmd4LmdlbmVyYWwsIGZ1bmN0aW9uKG1hdGNoLCBhbXBsaWZpZXIsIG5hbWUsIGNvbnRlbnQsIG5hbWUyLCBuYW1lMykge1xyXG4gICAgICAgICAgbGV0IG5hbWVPYmogPSB7fTtcclxuICAgICAgICAgIG5hbWVPYmoubmFtZSA9IG5hbWUgfHwgbmFtZTIgfHwgbmFtZTM7XHJcbiAgICAgICAgICBpZiAoYW1wbGlmaWVyID09ICc6JykgbmFtZU9iai5lcnJvciA9ICdpc1dyYXBwZXInO1xyXG4gICAgICAgICAgZWxzZSBpZiAoYW1wbGlmaWVyID09ICcvJykgbmFtZU9iai5lcnJvciA9ICdpc0Nsb3NpbmcnO1xyXG4gICAgICAgICAgZWxzZSBpZiAoY29udGVudCAhPSBudWxsKSBuYW1lT2JqLmVycm9yID0gJ2VtcHR5Q29udGVudCc7XHJcbiAgICAgICAgICBlbHNlIGlmIChuYW1lMikgbmFtZU9iai5lcnJvciA9ICdub0VuZCc7XHJcbiAgICAgICAgICBlbHNlIGlmIChuYW1lMykgbmFtZU9iai5lcnJvciA9ICdub0JlZ2lubmluZyc7XHJcbiAgICAgICAgICBuYW1lcy5wdXNoKG5hbWVPYmopO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2UgbGVmdG92ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgY29uc3QgZXJyb3JMaXN0ID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBpbmZvID0gJyc7XHJcbiAgICAgICAgaWYgKCFsZWZ0b3Zlcikge1xyXG4gICAgICAgICAgaW5mbyA9ICdGb3VuZCBlcnJvcnM6XFxuJztcclxuICAgICAgICAgIG5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICBpbmZvICs9ICctIFwiJyArIG5hbWUubmFtZSArICdcIiA9PiAnO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG5hbWUuZXJyb3IpIHtcclxuICAgICAgICAgICAgICBjYXNlICdpc0Nsb3NpbmcnOlxyXG4gICAgICAgICAgICAgICAgaW5mbyArPSAnQ2xvc2luZyB0YWcgZmluZGluZyBubyBiZWdpbm5pbmcgKGlzIHRoZSBiZWdpbm5pbmcgbWFya2VkIHdpdGggYSDigJg64oCZPyknO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnaXNXcmFwcGVyJzpcclxuICAgICAgICAgICAgICAgIGluZm8gKz0gJ09wZW5pbmcgdGFnIGZpbmRpbmcgbm8gZW5kJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2VtcHR5Q29udGVudCc6XHJcbiAgICAgICAgICAgICAgICBpbmZvICs9ICdSZWR1bmRhbnQgZW1wdHkgdGV4dCBjb250ZW50ICjigJhcIlwi4oCZKSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdub0VuZCc6XHJcbiAgICAgICAgICAgICAgICBpbmZvICs9ICdNaXNzaW5nIGVuZGluZyBjaGFyYWN0ZXIgKOKAmD7igJkpJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ25vQmVnaW5uaW5nJzpcclxuICAgICAgICAgICAgICAgIGluZm8gKz0gJ01pc3NpbmcgYmVnaW5uaW5nIGNoYXJhY3RlciAo4oCYPOKAmSknO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGluZm8gKz0gJ1VuaWRlbnRpZmllZCBlcnJvci4gUGxlYXNlIGNoZWNrIHRoZSBlbGVtZW50IGZvciBzeW50YXggZXJyb3JzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmZvICs9ICcuXFxuJztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpbmZvICs9ICdMZWZ0b3ZlciBzdHJ1Y3R1cmU6XFxuLSBcIicgKyBzdHJ1Y3R1cmUgKyAnXCJcXG4nO1xyXG4gICAgICAgIHJldHVybiBpbmZvO1xyXG4gICAgICB9KSgpO1xyXG4gICAgICBlcnJvcigobmFtZXMubGVuZ3RoID4gMSA/ICdzZXZlcmFsIGVsZW1lbnRzIGhhdmUnIDogJ2FuIGVsZW1lbnQgaGFzJykgKyAnIGJlZW4gZGVjbGFyZWQgd3JvbmdseSBhbmQgY291bGQgbm90IGJlIHBhcnNlZC4gJyArIGVycm9yTGlzdCwgdHJ1ZSwgJ3N0cnVjdHVyZScsIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgbWF0Y2hlcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICBsZXQgbWF0Y2g7XHJcbiAgICAgIHdoaWxlIChtYXRjaCA9IHJneC5nZW5lcmFsLmV4ZWMoc3RydWN0dXJlU3RyKSkge1xyXG4gICAgICAgIG1hdGNoZXMucHVzaChtYXRjaCk7XHJcbiAgICAgIH1cclxuICAgICAgYXBwZW5kRWxlbWVudHMobm9kZS5zbGlkZXIsIG1hdGNoZXMpO1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvL1N0YXRpY2FsbHkgdHlwZWRcclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgdHJhY2sgPSBub2RlLnRyYWNrO1xyXG4gICAgICBjb25zdCB0aHVtYiA9IG5vZGUudGh1bWI7XHJcbiAgICAgIGlmICghdHJhY2spIG5vZGUudHJhY2sgPSBhc3NlbWJsZUVsZW1lbnQoJ3RyYWNrJywgJ2RpdicpO1xyXG4gICAgICBpZiAoIXRodW1iKSBub2RlLnRodW1iID0gYXNzZW1ibGVFbGVtZW50KCd0aHVtYicsICdkaXYnKTtcclxuICAgICAgaWYgKCF0cmFjayAmJiAhdGh1bWIpIHtcclxuICAgICAgICBub2RlLnRyYWNrLmFwcGVuZENoaWxkKG5vZGUudGh1bWIpO1xyXG4gICAgICAgIG5vZGUuc2xpZGVyLmFwcGVuZENoaWxkKG5vZGUudHJhY2spO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0cmFjayAmJiB0aHVtYikge1xyXG4gICAgICAgIG5vZGUudGh1bWIucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChub2RlLnRyYWNrKTtcclxuICAgICAgICBub2RlLnRyYWNrLmFwcGVuZENoaWxkKG5vZGUudGh1bWIpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRyYWNrICYmICF0aHVtYikge1xyXG4gICAgICAgIG5vZGUudHJhY2suYXBwZW5kQ2hpbGQobm9kZS50aHVtYik7XHJcbiAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgcmV0dXJuIG5vZGU7XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwZW5kRWxlbWVudHMocGFyZW50LCBjaGlsZEFyciwgaSkge1xyXG4gICAgICBpZiAoaSA9PSBudWxsKSBpID0gMDtcclxuICAgICAgZm9yICg7IGkgPCBjaGlsZEFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBub2RlW2NoaWxkQXJyW2ldWzJdXTtcclxuICAgICAgICBpZiAoY2hpbGRBcnJbaV1bMV0gPT0gJzonKSB7XHJcbiAgICAgICAgICBpID0gYXBwZW5kRWxlbWVudHMoZWxlbSwgY2hpbGRBcnIsIGkgKyAxKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNoaWxkQXJyW2ldWzFdID09ICcvJykgcmV0dXJuIGk7XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VTaW5nbGVUYWdzKHN0ciwgcGFyZW50KSB7XHJcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZShyZ3guc2luZ2xlVGFnLCBmdW5jdGlvbihtYXRjaCwgbmFtZSwgdGFnLCBpbm5lciwgYXR0cmlidXRlcykge1xyXG4gICAgICAgIGNvbnN0IGVsZW0gPSBhc3NlbWJsZUVsZW1lbnQobmFtZSwgdGFnLCBhdHRyaWJ1dGVzLCBpbm5lcik7XHJcbiAgICAgICAgbm9kZVtuYW1lXSA9IGVsZW07XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhc3NlbWJsZUVsZW1lbnQobmFtZSwgdGFnLCBhdHRyaWJ1dGVzLCBjb250ZW50KSB7XHJcbiAgICAgIGlmIChub2RlW25hbWVdKSB7XHJcbiAgICAgICAgZXJyb3IoJ0V2ZXJ5IGVsZW1lbnQgbXVzdCBoYXZlIGEgdW5pcXVlIG5hbWUgYnV0IHRoZXJlIGFyZSBtdXRpcGxlIGVsZW1lbnRzIGNhbGxlZCDigJgnICsgbmFtZSArICfigJknLCB0cnVlLCAnc3RydWN0dXJlJyk7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyB8fCAnZGl2Jyk7XHJcbiAgICAgIGNvbnN0IGhhc0F0dHJpYnMgPSAhIWF0dHJpYnNbbmFtZV07XHJcbiAgICAgIGlmIChjb250ZW50KSBlbGVtLnRleHRDb250ZW50ID0gY29udGVudDtcclxuICAgICAgaWYgKGF0dHJpYnV0ZXMpIHtcclxuICAgICAgICBhdHRyaWJ1dGVzLnJlcGxhY2Uocmd4LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHJpYiwgYXR0cmliTmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgIC8vVGFpbG9yZWQgZm9yIHNwYWNlLXNlcGFyYXRlZCB2YWx1ZXMgKGNoZWNrIGZvciBkdXBsaWNhdGVzIGluIHZhbHVlIHZzLiBkZWZhdWx0IHN0cnVjdHVlIHN0eWxlKVxyXG4gICAgICAgICAgaWYgKGhhc0F0dHJpYnMgJiYgYXR0cmlic1tuYW1lXVthdHRyaWJOYW1lXSAmJiB2YWx1ZS5zcGxpdCgnICcpLmluZGV4T2YoYXR0cmlic1tuYW1lXVthdHRyaWJOYW1lXSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgdmFsdWUgKz0gJyAnICsgYXR0cmlic1tuYW1lXVthdHRyaWJOYW1lXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGF0dHJpYk5hbWUsIHZhbHVlIHx8ICcnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaGFzQXR0cmlicykge1xyXG4gICAgICAgIGZvciAodmFyIGF0dHIgaW4gYXR0cmlic1tuYW1lXSkge1xyXG4gICAgICAgICAgaWYgKCFlbGVtLmdldEF0dHJpYnV0ZShhdHRyKSkgZWxlbS5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cmlic1tuYW1lXVthdHRyXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8tPiBNZXRob2RzICYgcHJvcGVydGllc1xyXG4gIGZ1bmN0aW9uIHByb3BUeXBlRXJyb3IocHJvcCwgbXNnKSB7XHJcbiAgICBtc2cgPSAncHJvcGVydHkg4oCYJyArIHByb3AgKyAn4oCZIG11c3QgYmUgJyArIGNvbXB1dGVUeXBlTXNnKHByb3BlcnRpZXNbcHJvcF0uc3RydWN0dXJlLCBwcm9wZXJ0aWVzW3Byb3BdLnNoYXBlKSArICcgYnV0IGl0JyArIG1zZztcclxuICAgIHByb3BFcnJvcihwcm9wLCBtc2csIHRydWUpO1xyXG4gIH1cclxuICBmdW5jdGlvbiBwcm9wRXJyb3IocHJvcCwgbXNnLCBub1RhcmdldCkge1xyXG4gICAgaWYgKCFpbml0aWFsKSB7XHJcbiAgICAgIGxldCBwcmV2VmFsID0gdmFsc1twcm9wXTtcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJldlZhbCkpIHByZXZWYWwgPSAnWycgKyBwcmV2VmFsLmpvaW4oJywgJykgKyAnXSc7XHJcbiAgICAgIG1zZyArPSAnLlxcbkNvbnRpbnVpbmcgd2l0aCB0aGUgcHJldmlvdXMgdmFsdWUgKCcgKyBwcmV2VmFsICsgJykuJztcclxuICAgIH1cclxuICAgIGVycm9yKG1zZywgbm9UYXJnZXQgPyBmYWxzZSA6IHByb3ApO1xyXG4gIH1cclxuICBmdW5jdGlvbiBtZXRob2RFcnJvcihtZXRob2QsIGFyZ0lkeCwgbXNnLCBvbWl0RXJyb3IpIHtcclxuICAgIGNvbnN0IGNvdW50cyA9IFsnZmlyc3QnLCAnc2Vjb25kJywgJ3RoaXJkJywgJ2ZvdXJ0aCcsICdmaWZ0aCcsICdzaXh0aCcsICdzZXZlbnRoJywgJ2VpZ2h0aCcsICduaW50aCddO1xyXG4gICAgY29uc3QgYXJnID0gbWV0aG9kc1ttZXRob2RdLmFyZ3NbYXJnSWR4XTtcclxuXHJcbiAgICBsZXQgZXJyTXNnID0gJ3RoZSAnICsgKGFyZy5vcHRpb25hbCA/ICdvcHRpb25hbCAnIDogJycpICsgY291bnRzW2FyZ0lkeF0gKyAnIGFyZ3VtZW50ICgnICsgYXJnLm5hbWUgKyAnKSAnO1xyXG4gICAgaWYgKG9taXRFcnJvcikgZXJyTXNnICs9ICdoYXMgYmVlbiBvbWl0dGVkIGJ1dCBpdCBpcyByZXF1aXJlZC4gSXQgJztcclxuICAgIGVyck1zZyArPSAnbXVzdCBiZSAnICsgY29tcHV0ZVR5cGVNc2coYXJnLnN0cnVjdHVyZSk7XHJcbiAgICBpZiAoIW9taXRFcnJvcikgZXJyTXNnICs9ICcgYnV0IGl0JyArIG1zZztcclxuXHJcbiAgICBlcnJvcihlcnJNc2csIG1ldGhvZCk7XHJcbiAgfVxyXG5cclxuICAvL0NoZWNraW5nIHByb3BlcnRpZXMgJiBtZXRob2RzIGZvciB0aGUgY29ycmVjdCB0eXBlICYgZm9ybWF0XHJcbiAgZnVuY3Rpb24gY2hlY2tNZXRob2QobWV0aG9kLCBhcmdMaXN0KSB7XHJcbiAgICBjb25zdCBvYmogPSBtZXRob2RzW21ldGhvZF07XHJcbiAgICAvL0lmIHRoZSBuZXh0IGFyZ3VtZW50IChhcmdMaXN0Lmxlbmd0aCAtIDEgKyAxKSBpcyBub3Qgb3B0aW9uYWwsIGEgcmVxdWlyZWQgYXJnIGlzIG1pc3NpbmdcclxuICAgIGZvciAodmFyIGkgaW4gYXJnTGlzdCkge1xyXG4gICAgICBjb25zdCBhcmcgPSBhcmdMaXN0W2ldO1xyXG4gICAgICBjb25zdCBtc2cgPSBjaGVja1R5cGVzKGFyZywgb2JqLmFyZ3NbaV0uc3RydWN0dXJlLCBmYWxzZSk7XHJcbiAgICAgIGlmIChtc2cpIG1ldGhvZEVycm9yKG1ldGhvZCwgaSwgbXNnKTtcclxuICAgIH1cclxuICAgIGlmIChvYmouYXJnc1thcmdMaXN0Lmxlbmd0aF0gJiYgIW9iai5hcmdzW2FyZ0xpc3QubGVuZ3RoXS5vcHRpb25hbCkge1xyXG4gICAgICBtZXRob2RFcnJvcihtZXRob2QsIGFyZ0xpc3QubGVuZ3RoLCBudWxsLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gY2hlY2tQcm9wKHByb3AsIHZhbCkge1xyXG4gICAgY29uc3QgbXNnID0gY2hlY2tUeXBlcyh2YWwsIHByb3BlcnRpZXNbcHJvcF0uc3RydWN0dXJlLCBmYWxzZSk7XHJcbiAgICBpZiAobXNnKSBwcm9wVHlwZUVycm9yKHByb3AsIG1zZyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjaGVja1R5cGVzKHZhbCwgc3RydWN0dXJlLCBwbHVyYWwpIHtcclxuICAgIGxldCBtc2cgPSBmYWxzZTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RydWN0dXJlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHR5cGVPYmogPSBzdHJ1Y3R1cmVbaV07XHJcbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlT2JqLnR5cGU7XHJcbiAgICAgIGlmIChcclxuICAgICAgICB0eXBlID09ICdib29sZWFuJyAmJiB0eXBlb2YgdmFsID09ICdib29sZWFuJyB8fFxyXG4gICAgICAgIHR5cGUgPT0gJ3RydWUnICYmIHZhbCA9PT0gdHJ1ZSB8fFxyXG4gICAgICAgIHR5cGUgPT0gJ2ZhbHNlJyAmJiB2YWwgPT09IGZhbHNlIHx8XHJcbiAgICAgICAgdHlwZSA9PSAnYXJyYXknICYmIEFycmF5LmlzQXJyYXkodmFsKSB8fFxyXG4gICAgICAgIHR5cGUgPT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWwpICYmIHZhbCAhPT0gbnVsbCB8fFxyXG4gICAgICAgIHR5cGUgPT0gJ251bWJlcicgJiYgdHlwZW9mIHZhbCA9PSAnbnVtYmVyJyAmJiAhcG9seUlzTmFOKHZhbCkgfHxcclxuICAgICAgICB0eXBlID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nIHx8XHJcbiAgICAgICAgdHlwZSA9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsID09ICdzdHJpbmcnXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmICh0eXBlID09ICdhcnJheScpIHtcclxuICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgdmFsLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHlwZXModmFsW25dLCB0eXBlT2JqLnN0cnVjdHVyZSwgdHJ1ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmFsKSB7XHJcbiAgICAgICAgICAgIGNoZWNrVHlwZXModmFsW2tleV0sIHR5cGVPYmouc3RydWN0dXJlLCB0cnVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbXNnID0gY2hlY2tDb25kaXRpb25zKHR5cGVPYmosIHZhbCk7XHJcbiAgICAgICAgaWYgKG1zZyA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBlbHNlIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbXNnID8gJyBpcyAnICsgbXNnIDogKHBsdXJhbCA/ICdzIHZhbHVlcyBhcmUgJyA6ICcgaXMgJykgKyB0eXBlTXNnKHZhbCwgdHJ1ZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tDb25kaXRpb25zKHR5cGVPYmosIHZhbCkge1xyXG4gICAgICBpZiAodHlwZU9iai5jb25kaXRpb25zKSB7XHJcbiAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVPYmoudHlwZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVPYmouY29uZGl0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc3QgY29uZCA9IHR5cGVPYmouY29uZGl0aW9uc1tpXTtcclxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmQpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY29uZFswXSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2xlbmd0aCc6XHJcbiAgICAgICAgICAgICAgaWYgKHZhbC5sZW5ndGggIT09IGNvbmRbMV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAodHlwZSA9PSAnYXJyYXknID8gJ2FuICcgOiAnYSAnKSArIHR5cGUgKyAnIG9mIGxlbmd0aCAnICsgdmFsLmxlbmd0aDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnPj0nOlxyXG4gICAgICAgICAgICAgIGlmICh2YWwgPCBjb25kWzFdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGNvbmRbMV0gPT0gMCA/ICdhIG5lZ2F0aXZlIG51bWJlcicgOiAnYSBudW1iZXIgYmVsb3cgJyArIGNvbmRbMV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dpdGNoIChjb25kKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSAnaW50JzpcclxuICAgICAgICAgICAgICBpZiAodmFsICUgMSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdhIGZsb2F0aW5nIHBvaW50IG51bWJlcic7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ25vdCBlbXB0eSc6XHJcbiAgICAgICAgICAgICAgaWYgKHZhbC50cmltKCkgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2FuIGVtcHR5IHN0cmluZyc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ25vdCBudW1iZXInOlxyXG4gICAgICAgICAgICAgIGlmICghcG9seUlzTmFOKE51bWJlcih2YWwpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdhIHB1cmUgbnVtYmVyIHN0cmluZyc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vQ29tcHV0aW5nIGFuIGF1dG9tYXRlZCBlcnJvciBtZXNzYWdlIHJlZ2FyZGluZyB0aGUgcHJvcGVydHkncyB0eXBlcyBhbmQgY29uZGl0aW9uc1xyXG4gIGZ1bmN0aW9uIGNvbXB1dGVUeXBlTXNnKHN0cnVjdCwgc2hhcGUsIHBsdXJhbCwgZGVlcCkge1xyXG4gICAgbGV0IG1zZyA9ICcnO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJ1Y3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgdHlwZSA9IHN0cnVjdFtpXS50eXBlO1xyXG4gICAgICBjb25zdCBjb25kaXRpb25zID0gc3RydWN0W2ldLmNvbmRpdGlvbnM7XHJcbiAgICAgIGlmIChtc2cpIG1zZyArPSAnIG9yICc7XHJcblxyXG4gICAgICBpZiAodHlwZSA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGNvbnN0IGxpbWl0ID0gaGFzKGNvbmRpdGlvbnMsICc+PScsIHRydWUpO1xyXG4gICAgICAgIGNvbnN0IGhhc0ludCA9IGhhcyhjb25kaXRpb25zLCAnaW50Jyk7XHJcbiAgICAgICAgaWYgKGxpbWl0ICYmIGxpbWl0WzFdID09PSAwKSB7XHJcbiAgICAgICAgICBpZiAoIXBsdXJhbCkgbXNnICs9ICdhICc7XHJcbiAgICAgICAgICBtc2cgKz0gJ25vbi1uZWdhdGl2ZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmIChoYXNJbnQgJiYgIXBsdXJhbCkge1xyXG4gICAgICAgICAgbXNnICs9ICdhbic7XHJcbiAgICAgICAgfSBlbHNlIG1zZyArPSAnYW55JztcclxuICAgICAgICBpZiAoaGFzSW50KSB7XHJcbiAgICAgICAgICBtc2cgKz0gJyBpbnRlZ2VyJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbXNnICs9ICcgbnVtYmVyJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBsdXJhbCkgbXNnICs9ICdzJztcclxuICAgICAgICBpZiAobGltaXQgJiYgbGltaXRbMV0gIT09IDApIG1zZyArPSAnIHdoaWNoICcgKyAocGx1cmFsID8gJ2FyZScgOiAnaXMnKSArICcgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICcgKyBsaW1pdFsxXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZWxzZSBpZiAodHlwZSA9PSAnYXJyYXknKSB7XHJcbiAgICAgICAgY29uc3QgbGVuID0gaGFzKGNvbmRpdGlvbnMsICdsZW5ndGgnLCB0cnVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgbXNnUmVzID0gY29tcHV0ZVR5cGVNc2coc3RydWN0W2ldLnN0cnVjdHVyZSwgZmFsc2UsIGxlbiAmJiBsZW5bMV0gPT0gMSA/IGZhbHNlIDogdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKCFwbHVyYWwpIG1zZyArPSAnYSc7XHJcbiAgICAgICAgaWYgKGRlZXApIHtcclxuICAgICAgICAgIG1zZyArPSBtc2dSZXM7XHJcbiAgICAgICAgfSBlbHNlIGlmICghcGx1cmFsKSB7XHJcbiAgICAgICAgICBtc2cgKz0gJ24nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtc2cgKz0gJyBhcnJheScgKyAocGx1cmFsID8gJ3MnIDogJycpO1xyXG4gICAgICAgIGlmIChsZW4pIG1zZyArPSAnIG9mIGxlbmd0aCAnICsgbGVuWzFdO1xyXG4gICAgICAgIGlmICghZGVlcCkgbXNnICs9ICcgd2l0aCAnICsgbXNnUmVzICsgJyBhcyB2YWx1ZXMnO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBlbHNlIGlmICh0eXBlID09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgbXNnICs9ICdhbiBvYmplY3QnO1xyXG4gICAgICAgIG1zZyArPSAnIHdpdGggJyArIGNvbXB1dGVUeXBlTXNnKHN0cnVjdFtpXS5zdHJ1Y3R1cmUsIGZhbHNlLCB0cnVlLCB0cnVlKSArICcgYXMgdmFsdWVzJztcclxuICAgICAgfVxyXG5cclxuICAgICAgZWxzZSBpZiAodHlwZSA9PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgaWYgKCFkZWVwKSBtc2cgKz0gJ2EgJztcclxuICAgICAgICBtc2cgKz0gJ2Z1bmN0aW9uIHJlZmVyZW5jZSc7XHJcbiAgICAgICAgaWYgKCFkZWVwICYmIHBsdXJhbCkgbXNnICs9ICdzJztcclxuICAgICAgfVxyXG5cclxuICAgICAgZWxzZSBpZiAodHlwZSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlmICghZGVlcCkgbXNnICs9ICdhICc7XHJcbiAgICAgICAgaWYgKGhhcyhjb25kaXRpb25zLCAnbm90IGVtcHR5JykpIG1zZyArPSAnbm9uLWVtcHR5ICc7XHJcbiAgICAgICAgaWYgKGhhcyhjb25kaXRpb25zLCAnbm90IG51bWJlcicpKSBtc2cgKz0gJ25vbi1udW1iZXIgJztcclxuICAgICAgICBtc2cgKz0gJ3N0cmluZyc7XHJcbiAgICAgICAgaWYgKCFkZWVwICYmIHBsdXJhbCkgbXNnICs9ICdzJztcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHNoYXBlKSB7XHJcbiAgICAgICAgbXNnICs9ICcgKCcgKyBzaGFwZSArICcpJztcclxuICAgICAgICBzaGFwZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHlwZSA9PSAnYm9vbGVhbicpIHtcclxuICAgICAgICBtc2cgKz0gJ2EgYm9vbGVhbic7XHJcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAndHJ1ZScpIHtcclxuICAgICAgICBtc2cgKz0gJ3RydWUnO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ2ZhbHNlJykge1xyXG4gICAgICAgIG1zZyArPSAnZmFsc2UnO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1zZztcclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==