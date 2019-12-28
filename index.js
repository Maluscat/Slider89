'use strict';
function Slider89(target, config = {}, replace) {
  const that = this;
  let initial = false;

  //Extended Array.prototype.includes() polyfill
  Array.prototype.has = function(val, loop) {
    if (loop) {
      for (var i = 0; i < this.length; i++) {
        if (this[i].indexOf(val) != -1) {
          return this[i];
        }
      }
    } else return this.indexOf(val) != -1;
  }

  const properties = {
    range: {
      default: [0, 100],
      type: [
        ['array', ['number']],
        ['length', 2]
      ],
      shape: '[minValue, maxValue]'
    },
    value: {
      default: 0,
      type: ['number']
    },
    precision: {
      default: 0,
      type: ['number', ['>=', 0], 'int']
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
    //Conditions which are executed when a value is set
    const conditions = {
      'array': function(val, prop, msg) {
        if (Array.isArray(val)) return true;
        else propError(prop, msg + 'of type ' + typeof val);
      },
      'length': function(val, prop, msg, length) {
        if (val.length == length) return true;
        else propError(prop, msg + 'an array of length ' + val.length);
      },
      'number': function(val, prop, msg, length) {
        if (typeof val == 'number') {
          if ((!!Number.isNaN && !Number.isNaN(val)) || !isNaN(val)) {
            return true;
          } else propError(prop, msg + 'NaN');
        } else propError(prop, msg + 'of type ' + typeof val);
      },
      'int': function(val, prop, msg) {
        if (val % 1 === 0) return true;
        else propError(prop, msg + 'a floating point number');
      },
      '>=': function(val, prop, msg, limit) {
        if (val >= limit) return true;
        else propError(prop, msg + (limit = 0 ? 'a negative number' : 'a number below ' + limit));
      }
    };

    for (var prop in properties) {
      const item = prop;
      const obj = properties[item];

      //Computing an automated error messages of what the property has got to be
      let errorMsg = 'property ‘' + item + '’ must be ';
      if (obj.type.has('number')) {
        const limit = obj.type.has('>=', true);
        const hasInt = obj.type.has('int');
        const hasNum = obj.type.has('number');
        if (limit && limit[1] === 0) {
          errorMsg += 'a non-negative';
        } else if (hasInt) {
          errorMsg += 'an';
        } else errorMsg += 'any';
        if (hasInt) {
          errorMsg += ' integer';
        } else if (hasNum) {
          errorMsg += ' number';
        }
        if (limit && limit[1] !== 0) errorMsg += ' which is greater than or equal to ' + limit[1];
      } else if (obj.type.has('array')) {
        errorMsg += 'an array';
        const len = obj.type.has('length', true);
        if (len != null) errorMsg += ' of length ' + len[1];
      }
      if (obj.shape) errorMsg += ' (' + obj.shape + ')';
      if (obj.type.has('false')) errorMsg += ' or false';
      errorMsg += ' but it is ';

      Object.defineProperty(Slider89.prototype, item, {
        set: function(val) {
          for (var i = 0; i < obj.type.length; i++) {
            if (Array.isArray(obj.type[i])) conditions[obj.type[i][0]](val, item, errorMsg, obj.type[i][1]);
            else conditions[obj.type[i]](val, item, errorMsg);
          }
          vals[item] = val;
        },
        get: function() {
          return vals[item];
        }
      });
    }
  })();

  // Object.defineProperties(Slider89.prototype, {
  //   range: {
  //     set: function(val) {
  //       const errorMsg = 'property ‘range’ must be an array of length ' + defaults.range.length + ' ([minValue, maxValue]) but it is ';
  //       if (Array.isArray(val)) {
  //         if (val.length == defaults.range.length) vals.range = val;
  //         else propError('range', errorMsg + 'an array of length ' + val.length);
  //       } else propError('range', errorMsg + 'currently of type ' + typeof val);
  //     },
  //     get: function() {
  //       return vals.range;
  //     }
  //   },
  //   value: {
  //     set: function(val) {
  //       const errorMsg = 'property ‘value’ must be any number but it is ';
  //       if (typeof val == 'number') {
  //         if ((!!Number.isNaN && !Number.isNaN(val)) || !isNaN(val)) vals.value = val;
  //         else propError('value', errorMsg + 'NaN');
  //       } else propError('value', errorMsg + 'of type ' + typeof val);
  //     },
  //     get: function() {
  //       return vals.value;
  //     }
  //   },
  //   precision: {
  //     set: function(val) {
  //       const errorMsg = 'property ‘precision’ must be a non-negative integer but it is ';
  //       if (typeof val == 'number') {
  //         if ((!!Number.isNaN && !Number.isNaN(val)) || !isNaN(val)) {
  //           if (val >= 0) {
  //             if (val % 1 === 0) vals.precision = val;
  //             else propError('precision', errorMsg + 'a floating point number');
  //           } else propError('precision', errorMsg + 'a negative number');
  //         } else propError('precision', errorMsg + 'NaN');
  //       } else propError('precision', errorMsg + 'of type ' + typeof val);
  //     },
  //     get: function() {
  //       return vals.precision;
  //     }
  //   }
  // });

  (function() {
    initial = true;
    for (var prop in properties) {
      that[prop] = config[prop] !== undefined ? config[prop] : properties[prop].default;
    }
    initial = false;
  })();

  function propError(prop, msg) {
    msg = 'Slider89: ' + msg + '.\n';
    if (initial) {
      msg += 'Aborting the slider construction.';
    } else {
      let prevVal = vals[prop];
      if (Array.isArray(prevVal)) prevVal = '[' + prevVal.join(', ') + ']';
      msg += 'Continuing with the previous value (' + vals[prop] + ').'
    }
    throw new Error(msg);
  }
}
