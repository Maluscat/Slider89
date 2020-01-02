'use strict';
function Slider89(target, config = {}, replace) {
  const that = this;
  let initial = false;
  let activeThumb;
  let mouseDownPos;

  if (!target) error('no target node has been passed (first argument of the constructor)', true);

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
      }]
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
        {
          type: 'string'
        },
        {
          type: 'false'
        }
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
    // structure: { //name unclear //write only -> exception in the setter needed!
    //   default: false,
    //   type: []
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

      //Calling Object.defineProperty on the `this` of the class function (here carried over by `that`) is nowhere documented
      //but it is necessary to be able to create multiple instances of the same class
      //as {Class}.prototype will inherit the defined property to all instances
      //and a new call of defineProperty (when creating a new instance) will throw an error for defining the same property twice
      Object.defineProperty(that, item, {
        set: function(val) {
          checkTypes(val, item, obj.structure, errorMsg);
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
    const node = {};
    node.slider = document.createElement('div');
    node.wrapper = document.createElement('div');
    node.thumb = document.createElement('div');

    node.wrapper.appendChild(node.thumb);
    node.slider.appendChild(node.wrapper);

    node.slider.classList.add('slider89');
    for (var element in node) {
      if (element != 'slider') {
        node[element].classList.add('sl89-' + element);
      }
    }

    createStyleSheet();
    node.thumb.style.transform = 'translateX(0)'; //TODO
    node.thumb.addEventListener('mousedown', slideStart);

    if (replace) target.parentNode.replaceChild(node.slider, target);
    else target.appendChild(node.slider);

    that.node = node;
  })();


  // ------ Helper functions ------
  function error(msg, abort) {
    msg = 'Slider89: ' + msg;
    if (abort) msg += '.\nAborting the slider construction.';
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
        type == 'number' && typeof val == 'number'
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
          }
        }
      }
    }
    return true;
  }
}
