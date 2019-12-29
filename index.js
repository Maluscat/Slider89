'use strict';
function Slider89(target, config = {}, replace) {
  const that = this;
  let initial = false;

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
        {type: 'boolean'}
      ],
      shape: '[minValue, maxValue]'
    },
    value: {
      default: 0,
      structure: [
        {type: 'number'}
      ]
    },
    precision: {
      default: 0,
      structure: [
        {
          type: 'number',
          conditions: [
            ['>=', 0],
            'int'
          ]
        }
      ]
    },
    // step: {
    //   default: false,
    //   type: ['number', '>= 0'] //or false
    // },
    // caption: {
    //   default: false,
    //   type: ['string']
    // },
    // thumbCount: {
    //   default: 1,
    //   type: ['number', 'int', '>= 1', 'false']
    // },
    // structure: { //?
    //   default: false,
    //   type: []
    // },
    // classList: {
    //   default: false,
    //   type: []
    // }
  }

  //The actual `vals` properties don't need to be initialized, this happens in the loop below
  const vals = {};

  (function() {
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
    //Computing an automated error messages of what the property has got to be
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
    }
  })();

  (function() {
    initial = true;
    for (var prop in properties) {
      that[prop] = config[prop] !== undefined ? config[prop] : properties[prop].default;
    }
    initial = false;
  })();

  function propError(prop, msg) {
    msg = 'Slider89: property ‘' + prop + '’ must be ' + msg + '.\n';
    if (initial) {
      msg += 'Aborting the slider construction.';
    } else {
      let prevVal = vals[prop];
      if (Array.isArray(prevVal)) prevVal = '[' + prevVal.join(', ') + ']';
      msg += 'Continuing with the previous value (' + prevVal + ').'
    }
    throw new Error(msg);
  }
}
