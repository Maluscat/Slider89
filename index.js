'use strict';
function Slider89(target, config, replace) {
  if (!target) error('no target node has been passed (first argument of the constructor)', true);

  if (config == undefined || config === false) {
    config = {};
  } else if (typeof config != 'object' || Array.isArray(config)) {
    const typeMsg = 'but it is ' + (Array.isArray(config) ? 'an array' : 'of type ' + typeof config);
    error('the configuration object (second argument of the constructor) should be an object ' + typeMsg, true);
  }

  const that = this;
  let initial = false;
  let activeThumb;
  let activeTouchID;
  let mouseDownPos;

  //Style rule strings which will be inserted into a new stylesheet
  const styles = [
    '.sl89-wrapper {' +
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
            {type: 'number'}
          ]
        },
        {
          type: 'boolean'
        }
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
        {
          type: 'false'
        }
      ]
    },
    caption: {
      default: false,
      structure: [
        {type: 'string'},
        {type: 'false'}
      ]
    },
    structure: { //name unclear //write only -> exception in the setter needed!
      default: false,
      structure: [
        {
          type: 'string',
          conditions: [
            'not empty'
          ]
        },
        {type: 'false'}
      ]
    },
    // //Can also be 0 as a way to disable the slider? -> rather a new property "disabled" adding a class "disabled"
    // thumbCount: {
    //   default: 1,
    //   structure: [{
    //     type: 'number',
    //     conditions: [
    //       'int',
    //       ['>=', 1],
    //     ]
    //   }]
    // },
    // classList: { //object
    //   default: false,
    //   type: []
    // }
  }

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

  //Build the slider element
  (function() {
    //No caption or result node yet
    if (vals.structure == false) {
      //In case no custom structure is defined, manually build the node to ensure best performance (parseStructure takes a while)
      var node = {};
      node.slider = document.createElement('div');
      node.wrapper = document.createElement('div');
      node.thumb = document.createElement('div');

      node.wrapper.appendChild(node.thumb);
      node.slider.appendChild(node.wrapper);

      node.slider.classList.add('slider89');
      for (var element in node)
        if (element != 'slider') node[element].classList.add('sl89-' + element);
    } else {
      var node = parseStructure(vals.structure);
    }
    createStyleSheet();

    if (replace) target.parentNode.replaceChild(node.slider, target);
    else target.appendChild(node.slider);

    const absWidth = node.thumb.parentNode.clientWidth - node.thumb.clientWidth;
    const range = vals.range[1] - vals.range[0];
    const distance = (vals.value - vals.range[0]) / range * absWidth;
    node.thumb.style.transform = 'translateX(' + distance + 'px)';

    node.thumb.addEventListener('touchstart', touchStart);
    node.thumb.addEventListener('touchmove', touchMove);
    node.thumb.addEventListener('touchend', touchEnd);
    node.thumb.addEventListener('touchcancel', touchEnd);

    node.thumb.addEventListener('mousedown', slideStart);

    that.node = node;
  })();


  // ------ Helper functions ------
  function error(msg, abort, noEnd) {
    //TODO: refer to docs
    msg = 'Slider89: ' + msg;
    if (!noEnd) msg += '.\n';
    if (abort) msg += 'Aborting the slider construction.';
    throw new Error(msg);
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
    //check for non-x movement (-> returning)?
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
  function parseStructure(structure) {
    const node = {
      slider: document.createElement('div')
    };
    node.slider.classList.add('slider89');

    const attribs = {};
    (function() {
      const defNodes = [
        'wrapper',
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
    reg.glbMatch = reg.capName + '(?:' + reg.tabSpace + '(?:(?!<).)*?)?>';
    reg.content = '(?:\\s+"(.+?)")*';
    reg.tag = '(?:\\s+' + reg.capName + ')*';
    reg.attribs = '(?:\\s+' + reg.attr.name + '\\(' + reg.attr.value + '\\))*';
    reg.base = reg.capName + reg.tag + reg.content + '(' + reg.attribs + ')\\s*?';
    const rgx = {
      general: '<([:/]?)' + reg.glbMatch + '|<' + reg.capName + '.*?|' + reg.tabSpace + reg.glbMatch,
      attributes: '\\s+(' + reg.attr.name + ')\\((' + reg.attr.value + ')\\)\\s*?',
      singleTag: '<' + reg.base + '>',
      multiTag: '<:' + reg.base + '>((?:'+reg.all+'(?!<:' + reg.capName + '(?:\\s+' + reg.name + ')*(?:\\s+".+?")*' + reg.attribs + '\\s*?>'+reg.all+'*?<\\/\\6\\s*>))*?)<\\/\\1\\s*>'
    };
    (function() {
      for (var expr in rgx) rgx[expr] = new RegExp(rgx[expr], 'g');
    })();

    let lastWrapper = new Array();
    let parentLock = false;
    while(rgx.multiTag.test(structure)) {
      structure = structure.replace(rgx.multiTag, function(match, name, tag, inner, attributes, content) {
        const elem = assembleElement(name, tag, attributes, null);
        content = parseSingleTags(content, elem);
        if (inner) elem.textContent = inner;
        if (parentLock) {
          lastWrapper.forEach(function(el) {
            elem.appendChild(el);
          });
          lastWrapper = new Array();
          parentLock = false;
        }
        lastWrapper.push(elem);
        node[name] = elem;
        return content;
      });
      parentLock = true;
    }

    structure = parseSingleTags(structure, node.slider);

    lastWrapper.forEach(function(el) {
      node.slider.appendChild(el);
    });

    if (/\S+/g.test(structure)) {
      structure = structure.trim();
      const names = new Array();
      let leftover = false;
      if (rgx.general.test(structure)) {
        structure.replace(rgx.general, function(match, amplifier, name, name2, name3) {
          let nameObj = {};
          nameObj.name = name || name2 || name3;
          if (amplifier == ':') nameObj.error = 'isWrapper';
          else if (amplifier == '/') nameObj.error = 'isClosing';
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
              case 'noEnd':
                info += 'Missing ending character (‘>’)';
                break;
              case 'noBeginning':
                info += 'Missing beginning character (‘<’)';
                break;
              default:
                info += 'Unidentified error. Please check the element for syntax errors';
            }
          });
          info += '.\n';
        } else info += 'Leftover structure:\n- "' + structure + '"\n';
        return info;
      })();
      error((names.length > 1 ? 'several ‘structure’ elements have' : 'a ‘structure’ element has') + ' been declared wrongly and could not be parsed. ' + errorList, true, true);
    }

    return node;

    function parseSingleTags(str, parent) {
      return str.replace(rgx.singleTag, function(match, name, tag, inner, attributes) {
        const elem = assembleElement(name, tag, attributes, inner);
        parent.appendChild(elem);
        node[name] = elem;
        return '';
      });
    }

    function assembleElement(name, tag, attributes, content) {
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
  function computeTypeMsg(struct, shape, plural) {
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
        msg += 'an array';
        const len = has(conditions, 'length', true);
        if (len) msg += ' of length ' + len[1];
        msg += ' with ' + computeTypeMsg(struct[i].structure, false, len && len[1] > 1 ? true : false) + ' as values';
      }

      else if (type == 'string') {
        msg += 'a string';
        if (has(conditions, 'not empty')) msg += ' which is not empty';
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
        type == 'number' && typeof val == 'number' ||
        type == 'string' && typeof val == 'string'
      ) {
        if (type == 'number') {
          if ((!!Number.isNaN && Number.isNaN(val)) || isNaN(val)) propError(prop, msg + ' is NaN');
        } else if (type == 'array') {
          for (var n = 0; n < val.length; n++) {
            checkTypes(val[n], prop, typeObj.structure, msg, true);
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
            if (val === '')
              propError(prop, msg + 'an empty string');
            break;
          }
        }
      }
    }
    return true;
  }
}
