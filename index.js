'use strict';
function Slider89(target, config, replace) {
  if (!target) {
    error('no target node has been passed (first argument of the constructor)', true, 'constructor');
  } else if (target && (!target.nodeType || target.nodeType != 1)) {
    error('the first argument of the constructor (slider target node) must be a DOM node ' + typeMsg(target), true, 'constructor');
  }

  if (config == undefined || config === false) {
    config = {};
  } else if (typeof config != 'object' || Array.isArray(config)) {
    error('the configuration object (second argument of the constructor) should be an object ' + typeMsg(config), true, 'constructor');
  }

  const that = this;
  let initial = false;
  let activeThumb;
  let activeTouchID;
  let mouseDownPos;

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
      shape: '[minValue, maxValue]'
    },
    value: {
      default: 0,
      structure: [{
        type: 'number'
      }],
      setter: function(val, vals) {
        if (val < vals.range[0] || val > vals.range[1]) {
          const rangeStr = '[' + vals.range.join(', ') + ']';
          propError('value', 'in the given range of ' + rangeStr + ' but it exceeds it (' + val + ')');
        }
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
    structure: { //write only -> exception in the setter needed!
      default: false,
      structure: [
        {
          type: 'string',
          conditions: [
            'not empty'
          ]
        },
        { type: 'false' }
      ]
    },
    classList: {
      default: false,
      structure: [
        {
          type: 'object',
          structure: [
            {
              type: 'array',
              structure: [
                { type: 'string' }
              ]
            }
          ]
        },
        { type: 'false' }
      ],
      shape: '{nodeName: [...classes]}'
    }
  }

  //`vals` is holding every property of the class
  const vals = {};

  //Initializing basic class functionality
  (function() {
    initial = true;
    for (var prop in properties) {
      const item = prop;
      const obj = properties[item];

      let errorMsg = computeTypeMsg(obj.structure, obj.shape);
      errorMsg += ' but it';

      //Calling Object.defineProperty on the `this` of the class function is nowhere documented
      //but it is necessary to be able to create multiple instances of the same class
      //as {Class}.prototype will inherit the defined property to all instances
      //and a new call of defineProperty (when creating a new instance) will throw an error for defining the same property twice
      Object.defineProperty(that, item, {
        set: function(val) {
          checkTypes(val, item, obj.structure, errorMsg);
          if (obj.setter) (obj.setter)(val, vals);
          vals[item] = val;
        },
        get: function() {
          return vals[item];
        }
      });

      that[prop] = config[prop] !== undefined ? config[prop] : properties[prop].default;
    }
    initial = false;
  })();

  //Building the slider element
  (function() {
    //No result node yet
    let node;
    if (vals.structure == false) {
      //In case no custom structure is defined, manually build the node to ensure best performance (parseStructure takes a while)
      node = {};
      node.slider = document.createElement('div');
      node.track = document.createElement('div');
      node.thumb = document.createElement('div');

      node.track.appendChild(node.thumb);
      node.slider.appendChild(node.track);

      node.slider.classList.add('slider89');
      for (var element in node)
        if (element != 'slider') node[element].classList.add('sl89-' + element);
    } else {
      node = parseStructure(vals.structure);
    }

    if (vals.classList) {
      let errorNodes = new Array();
      for (var key in vals.classList) {
        const classes = vals.classList[key];
        if (node[key] && errorNodes.length == 0) {
          classes.forEach(function(str) {
            node[key].classList.add(str);
          });
        } else errorNodes.push(key);
      }
      if (errorNodes.length > 0) {
        const msg =
          "property `classList` contains items which aren't nodes of this slider:\n- \"" +
          errorNodes.join('.\n- "') +
          "\"\nFollowing nodes are part of this slider's node pool:\n- \"" +
          Object.keys(node).join('"\n- "');
        error(msg + '"\n', true, false, true);
      }
    }

    createStyleSheet();

    if (replace) target.parentNode.replaceChild(node.slider, target);
    else target.appendChild(node.slider);

    const distance = (function() {
      const absWidth = node.thumb.parentNode.clientWidth - node.thumb.clientWidth;
      const range = vals.range[1] - vals.range[0];
      return (vals.value - vals.range[0]) / range * absWidth;
    })();
    node.thumb.style.transform = 'translateX(' + distance + 'px)';

    node.thumb.addEventListener('touchstart', touchStart);
    node.thumb.addEventListener('touchmove', touchMove);
    node.thumb.addEventListener('touchend', touchEnd);
    node.thumb.addEventListener('touchcancel', touchEnd);

    node.thumb.addEventListener('mousedown', slideStart);

    that.node = node;
  })();


  // ------ Helper functions ------
  function error(msg, abort, target, noEnd) {
    //TODO: refer to docs
    const intro = 'Slider89' + (target ? ' @ ' + target : '') + ': ';
    msg = intro + msg;
    if (!noEnd) msg += '.\n';
    if (abort) msg += 'Aborting the slider construction.';
    throw new Error(msg);
  }
  function typeMsg(variable) {
    return 'but it is ' + (Array.isArray(variable) ? 'an array' : 'of type ' + typeof variable);
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
    const absWidth = activeThumb.parentNode.clientWidth - activeThumb.clientWidth;
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

    function appendElements(parent, childArr, i = 0) {
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


  // -> Initialization
  function propError(prop, msg) {
    msg = 'property ‘' + prop + '’ must be ' + msg;
    if (!initial) {
      let prevVal = vals[prop];
      if (Array.isArray(prevVal)) prevVal = '[' + prevVal.join(', ') + ']';
      msg += '.\nContinuing with the previous value (' + prevVal + ').';
    }
    error(msg, initial);
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

      else if (type == 'string') {
        if (!deep) msg += 'a ';
        if (has(conditions, 'not empty')) msg += 'non-empty ';
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

  //Checking a property for the correct type & format
  function checkTypes(val, prop, structure, msg, plural) {
    for (var i = 0; i < structure.length; i++) {
      const typeObj = structure[i];
      const type = typeObj.type;
      if (
        (type == 'boolean' || type == 'false' || type == 'true') && typeof val == 'boolean' ||
        type == 'array' && Array.isArray(val) ||
        type == 'object' && typeof val == 'object' && !Array.isArray(val) ||
        type == 'number' && typeof val == 'number' ||
        type == 'string' && typeof val == 'string'
      ) {
        if (type == 'number') {
          if ((!!Number.isNaN && Number.isNaN(val)) || isNaN(val)) propError(prop, msg + ' is NaN');
        } else if (type == 'array') {
          for (var n = 0; n < val.length; n++) {
            checkTypes(val[n], prop, typeObj.structure, msg, true);
          }
        } else if (type == 'object') {
          for (var key in val) {
            checkTypes(val[key], prop, typeObj.structure, msg, true);
          }
        }
        if (checkConditions(typeObj, prop, val, msg)) return true;
      }
    }
    propError(prop, msg + (plural ? 's values are ' : ' is ') +  'of type ' + typeof val);
  }
  function checkConditions(typeObj, prop, val, msg) {
    if (typeObj.conditions) {
      msg += ' is ';
      const type = typeObj.type;
      for (var i = 0; i < typeObj.conditions.length; i++) {
        const cond = typeObj.conditions[i];
        if (Array.isArray(cond)) {
          switch (cond[0]) {
            case 'length':
            if (val.length !== cond[1])
              propError(prop, msg + (type == 'array' ? 'an ' : 'a ') + type + ' of length ' + val.length);
            break;
            case '>=':
            if (val < cond[1])
              propError(prop, msg + (cond[1] == 0 ? 'a negative number' : 'a number below ' + cond[1]));
            break;
          }
        } else {
          switch (cond) {
            case 'int':
            if (val % 1 !== 0)
              propError(prop, msg + 'a floating point number');
            break;
            case 'not empty':
            if (val.trim() === '')
              propError(prop, msg + 'an empty string');
            break;
          }
        }
      }
    }
    return true;
  }
}
