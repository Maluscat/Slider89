'use strict';
function Slider89(target, config = {}, replace) {
  const that = this;
  let initial = false;

  const properties = {
    range: {
      default: [0, 100],
      type: ['array', 'length 2'],
      shape: '[minValue, maxValue]'
    },
    value: {
      default: 0,
      type: ['number']
    },
    precision: {
      default: 0,
      type: ['number', 'int', '>= 0']
    },
    step: {
      default: false,
      type: ['number', 'non-negative', 'false']
    },
    caption: {
      default: false,
      type: ['string']
    },
    thumbCount: {
      default: 1,
      type: ['number', 'int', '>= 1', 'false']
    },
    structure: { //?
      default: false,
      type: []
    },
    classList: {
      default: false,
      type: []
    }
  }

  //The actual `vals` properties don't need to be initialized, this happens in the loop below
  const vals = {};

  Object.defineProperties(Slider89.prototype, {
    range: {
      set: function(val) {
        const errorMsg = 'property ‘range’ must be an array of length ' + defaults.range.length + ' ([minValue, maxValue]) but it is ';
        if (Array.isArray(val)) {
          if (val.length == defaults.range.length) vals.range = val;
          else propError('range', errorMsg + 'an array of length ' + val.length);
        } else propError('range', errorMsg + 'currently of type ' + typeof val);
      },
      get: function() {
        return vals.range;
      }
    },
    value: {
      set: function(val) {
        const errorMsg = 'property ‘value’ must be any number but it is ';
        if (typeof val == 'number') {
          if ((!!Number.isNaN && !Number.isNaN(val)) || !isNaN(val)) vals.value = val;
          else propError('value', errorMsg + 'NaN');
        } else propError('value', errorMsg + 'of type ' + typeof val);
      },
      get: function() {
        return vals.value;
      }
    },
    precision: {
      set: function(val) {
        const errorMsg = 'property ‘precision’ must be a non-negative integer but it is ';
        if (typeof val == 'number') {
          if ((!!Number.isNaN && !Number.isNaN(val)) || !isNaN(val)) {
            if (val >= 0) {
              if (val % 1 === 0) vals.precision = val;
              else propError('precision', errorMsg + 'a floating point number');
            } else propError('precision', errorMsg + 'a negative number');
          } else propError('precision', errorMsg + 'NaN');
        } else propError('precision', errorMsg + 'of type ' + typeof val);
      },
      get: function() {
        return vals.precision;
      }
    }
  });

  (function() {
    initial = true;
    for (var prop in defaults) {
      that[prop] = config[prop] !== undefined ? config[prop] : defaults[prop];
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
