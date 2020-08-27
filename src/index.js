'use strict';
export default function Slider89(target, config, replace) {
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
  const styles = require('./default-styles.css');

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
      default: false,
      structure: [
        {
          type: 'number',
          conditions: [
            ['>=', 0],
            'int'
          ]
        },
        { type: 'false' }
      ],
      preSetter: function(val) {
        if (val !== false) {
          for (var i = 0; i < vals.range.length; i++) {
            if (Number(vals.range[i].toFixed(val)) !== vals.range[i]) {
              propError('range', 'the given range ' + ['start', 'end'][i] + ' of `' + vals.range[i] + '` exceeds the currently set precision of ' + val);
            }
          }
        }
      },
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
      static: true
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
              if (prop.preSetter) (prop.preSetter)(val);
              vals[item] = val;
              if (!initial && prop.postSetter) (prop.postSetter)(val);
            } else error('property ‘' + item + '’ may only be set at init time but it was just set with the value ‘' + val + '’');
          } else error('property ‘' + item + '’ may only be read from but it was just set with the value ‘' + val + '’');
        },
        get: function() {
          return vals[item];
        }
      });

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
        that[item] = config[item];
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
        propError('classList', msg);
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

  initial = false;


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
    if (vals.precision !== false) val = Number(val.toFixed(vals.precision));
    if (vals.value !== val) {
      vals.value = val;

      if (events) invokeEvent(events); //TODO --------------------------------------
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
    reg.attr.value = reg.all + '*?';
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

    (function() {
      if (Object.keys(variables).length != 0) {
        for (var _ in variables) {
          const prop = _;

          let target, endpoint;
          if (Object.prototype.hasOwnProperty.call(properties, prop)) {
            //Redefining internal properties used as structure variables as getter/setter and moving their endpoint to `vals.$`
            if (!vals.$) {
              //Object.defineProperty needed for non-enumerability
              Object.defineProperty(vals, '$', {
                value: {}
              });
            }
            target = vals;
            endpoint = vals.$;
          } else {
            //Registering a getter/setter on `this` for structure variables not defined by the class
            target = that;
            endpoint = vals;
          }
          Object.defineProperty(endpoint, prop, {
            value: target[prop],
            writable: true
          });
          Object.defineProperty(target, prop, {
            get: function() {
              return endpoint[prop];
            },
            set: function(val) {
              endpoint[prop] = val;
              updateVariable(prop);
            },
            enumerable: true
          });

          updateVariable(prop);
        }

        function updateVariable(prop) {
          for (var i in variables[prop]) {
            const item = variables[prop][i];
            const str = item.str.replace(rgx.variable, function(match, variableDelimit, variable) {
              return vals[variableDelimit || variable];
            });
            if (item.attr) {
              item.node.setAttribute(item.attr, str);
            } else {
              item.node.textContent = str;
            }
          }
        }
      }
    }());

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
      if (content && !registerVariables(content, elem, false)) {
        elem.textContent = content;
      }
      if (attributes) {
        attributes.replace(rgx.attributes, function(attrib, attribName, value) {
          //Tailored for space-separated values (check for duplicates in value vs. default structure style)
          if (hasAttribs && attribs[name][attribName] && value.split(' ').indexOf(attribs[name][attribName]) == -1) {
            value += ' ' + attribs[name][attribName];
          }
          if (!registerVariables(value, elem, attribName)) {
            elem.setAttribute(attribName, value || '');
          }
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
        str.replace(rgx.variable, function(match, variableDelimit, variable) {
          const varName = variableDelimit || variable;
          if (variables[varName] == null) variables[varName] = new Array();
          const item = {
            str: str,
            node: node
          };
          if (attribName) item.attr = attribName;
          variables[varName].push(item);
        });
        //To prevent an unnecessary attrib/content set during element building (variables are set separately afterwards)
        return true;
      }
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
            msg = checkTypes(val[n], typeObj.structure, true);
          }
        } else if (type == 'object') {
          for (var key in val) {
            msg = checkTypes(val[key], typeObj.structure, true);
          }
        }
        if (msg) return msg;
        if (msg = checkConditions(typeObj, val)) break;
        else return false;
      } else break;
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
