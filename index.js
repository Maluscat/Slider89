'use strict';
function Slider89(target, config, replace) {
  if (!target) {
    error('no first argument has been supplied. It needs to be the DOM target node for the slider', true, 'constructor');
  } else if (!target.nodeType || target.nodeType != 1) {
    error('the first argument must be a valid DOM node the slider will be placed into ' + typeMsg(target), true, 'constructor');
  }

  if (config == undefined || config === false) {
    config = {};
  } else if (typeof config != 'object' || Array.isArray(config)) {
    error('the optional second argument needs to be an object for configuration ' + typeMsg(config), true, 'constructor');
  }

  const that = this;
  const eventTypes = [
    'start',
    'change',
    'end'
  ];

  let initial = false;
  let activeThumb;
  let activeTouchID;
  let mouseDownPos;
  let eventID = 0;
  const eventList = {};

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
      'transition: background-color .15s ease-in-out;' +
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
      ],
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
      shape: '[minValue, maxValue]',
      setter: function(val) {
        if (!initial) {
          //The same compution as mouseMove(), but no common function for performance reasons
          const absWidth = vals.node.track.clientWidth - vals.node.thumb.clientWidth;
          const distance = getTranslate(vals.node.thumb);
          const newVal = distance / absWidth * (val[1] - val[0]) + val[0];
          vals.value = Number(newVal.toFixed(vals.precision));
        }
      }
    },
    value: {
      default: 0,
      structure: [{
        type: 'number'
      }],
      setter: function(val) {
        if (val < vals.range[0] || val > vals.range[1]) {
          const rangeStr = '[' + vals.range.join(', ') + ']';
          propError('value', 'in the given range of ' + rangeStr + ' but it exceeds it (' + val + ')');
        } else if (!initial) translateThumb(val);
      }
    },
    precision: {
      default: 0,
      structure: [{
        type: 'number',
        conditions: [
          ['>=', 0],
          'int'
        ]
      }]
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
      ]
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
      set: false
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
        const errTypes = checkArrayObject(val, eventTypes, function(fn) {
          eventList[eventID++] = [fn];
        });
        if (errTypes.length > 0) {
          const msg =
            'property ‘events’ contains items which are no valid event types:' + enlistItems(errTypes) +
            'Available event types are:' + enlistItems(eventTypes);
          error(msg, true, false, true);
        }
      }
    }
  };

  //`vals` is holding every property of the class
  const vals = {};

  //Initializing basic class functionality
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
          if (obj.set !== false) {
            if (!obj.initial || initial) {
              checkProp(item, val);
              if (obj.setter) (obj.setter)(val);
              vals[item] = val;
            } else error('property ‘' + item + '’ may only be set at init time but it was just set with the value ‘' + val + '’');
          } else error('property ‘' + item + '’ may only be read from but it was just set with the value ‘' + val + '’');
        },
        get: function() {
          return vals[item];
        }
      });

      if (config[prop] !== undefined) that[prop] = config[prop];
      else {
        let assignObj = obj.set === false ? vals : that;
        assignObj[prop] = properties[prop].default;
      }
    }

    for (var method in methods) {
      const item = method;
      const obj = methods[item];
      that[item] = function() {
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
      const errNodes = checkArrayObject(vals.classList, node, function(str) {
        node[key].classList.add(str);
      });
      if (errNodes.length > 0) {
        const msg =
          "property `classList` contains items which aren't nodes of this slider:" + enlistItems(errNodes) +
          "Following nodes are part of this slider's node pool:" + enlistItems(Object.keys(node))
        error(msg, true, false, true);
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


  // ------ Class methods ------
  function addEvent(type, fn, name) {
    (function() {
      for (var i = 0; i < eventTypes.length; i++) {
        if (type == eventTypes[i]) return;
      }
      error('the specified type ‘' + type + '’ is not a valid event type. Available types are:' + enlistItems(eventTypes), null, 'addEvent', true);
    })();
    if (!Array.isArray(vals.events[type])) vals.events[type] = new Array();
    const key = name || eventID;
    if (eventList[key]) {
      eventList[key].push(fn);
    } else {
      eventList[key] = [fn];
    }
    vals.events[type].push(fn);
    return name || eventID++;
  }

  // ------ Helper functions ------
  function error(msg, abort, target, noEnd) {
    //TODO: refer to docs
    const intro = 'Slider89' + (target ? ' @ ' + target : '') + ': ';
    msg = intro + msg;
    if (!noEnd) msg += '.\n';
    if (abort) msg += 'Aborting the slider construction.';
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
      if ((Array.isArray(reference) ? !has(reference, key) : !reference[key])) errItems.push(key);
      else if (errItems.length == 0) item.forEach(fn);
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

  // ------ Event functions ------
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
    that.node.thumb.classList.add('active');
    activeThumb = this;
    mouseDownPos = e.clientX - getTranslate(this);
    window.addEventListener('mouseup', slideEnd);
    window.addEventListener('mousemove', slideMove);
  }
  function slideMove(e) {
    //TODO?: check for non-x movement (-> returning)?
    const absWidth = vals.node.track.clientWidth - activeThumb.clientWidth;
    const range = vals.range[1] - vals.range[0];

    let distance = e.clientX - mouseDownPos;
    if (distance > absWidth) distance = absWidth;
    if (distance < 0) distance = 0;
    that.node.thumb.style.transform = 'translateX(' + distance + 'px)';

    const val = distance / absWidth * range + vals.range[0];
    vals.value = Number(val.toFixed(vals.precision));
  }
  function slideEnd() {
    window.removeEventListener('mouseup', slideEnd);
    window.removeEventListener('mousemove', slideMove);
    mouseDownPos = null;
    activeThumb = null;
    that.node.thumb.classList.remove('active');
    document.body.classList.remove('sl89-noselect');
  }

  // ------ Scope-specific functions ------
  // -> Element building
  function createStyleSheet() {
    const sheet = document.head.appendChild(document.createElement('style')).sheet;
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

  //Computing an automated error message regarding the property's types and conditions
  function computeTypeMsg(struct, shape, plural, deep) {
    let msg = '';
    for (var i = 0; i < struct.length; i++) {
      const type = struct[i].type;
      const conditions = struct[i].conditions;

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

      if (msg !== '' && (type == 'boolean' || type == 'true' || type == 'false')) msg += ' or ';
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

  //-> Methods & properties
  function propError(prop, msg) {
    msg = 'property ‘' + prop + '’ must be ' + computeTypeMsg(properties[prop].structure, properties[prop].shape) + ' but it' + msg;
    if (!initial) {
      let prevVal = vals[prop];
      if (Array.isArray(prevVal)) prevVal = '[' + prevVal.join(', ') + ']';
      msg += '.\nContinuing with the previous value (' + prevVal + ').';
    }
    error(msg, initial, false, !initial);
  }
  function methodError(method, argIdx, msg, omitError) {
    const counts = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];
    const arg = methods[method].args[argIdx];

    let errMsg = 'the ' + (arg.optional ? 'optional ' : '') + counts[argIdx] + ' argument (' + arg.name + ') ';
    if (omitError) errMsg += 'has been omitted but it is required. It ';
    errMsg += 'must be ' + computeTypeMsg(arg.structure);
    if (!omitError) errMsg += ' but it' + msg;

    error(errMsg, false, method);
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
    if (msg) propError(prop, msg);
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
  }
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
