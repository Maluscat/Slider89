'use strict';
export default class LibraryTypeCheck {
  typeMsg(variable, noIntro) {
    let msg = noIntro ? '' : 'but it is ';
    if (Array.isArray(variable))
      msg += 'an array';
    else if (Number.isNaN(variable))
      msg += 'NaN';
    else if (variable === null)
      msg += 'null';
    else if (typeof variable === 'boolean')
      msg += variable;
    else
      msg += 'of type ' + typeof variable;

    return msg;
  }

  checkTypes(val, structure, plural) {
    let msg;
    for (let i = 0; i < structure.length; i++) {
      const typeObj = structure[i];
      const type = typeObj.type;
      if (
        type === 'boolean' && typeof val === 'boolean' ||
        type === 'true' && val === true ||
        type === 'false' && val === false ||
        type === 'array' && Array.isArray(val) ||
        type === 'object' && Object.prototype.toString.call(val) === '[object Object]' ||
        type === 'number' && typeof val === 'number' && !Number.isNaN(val) ||
        type === 'function' && typeof val === 'function' ||
        type === 'string' && typeof val === 'string'
      ) {
        if (type == 'array') {
          for (let n = 0; n < val.length; n++) {
            if (msg = this.checkTypes(val[n], typeObj.structure, true)) break;
          }
        } else if (type === 'object') {
          for (let key in val) {
            if (msg = this.checkTypes(val[key], typeObj.structure, true)) break;
          }
        }
        if (msg) return msg;
        if (msg = checkConditions(typeObj.conditions, val)) break;
        else return false;
      }
    }
    return msg ? ' is ' + msg : (plural ? 's values are ' : ' is ') + this.typeMsg(val, true);

    function checkConditions(conditions, val) {
      if (conditions) {
        if (conditions.nonnegative && val < 0) {
          return 'a negative number';
        }
        if (conditions.positive && val <= 0) {
          return 'a negative number or 0';
        }
        if (conditions.integer && val % 1 !== 0) {
          return 'a floating point number';
        }
        if (conditions.filled && val.trim() === '') {
          return 'an empty string';
        }
        if (conditions.keywords && conditions.keywords.indexOf(val) === -1) {
          return 'a different string';
        }
        if (conditions.wordChar && !Number.isNaN(Number(val))) {
          return 'a pure number string';
        }
        if (conditions.length && val.length !== conditions.length) {
          return (type === 'array' ? 'an ' : 'a ') + type + ' of length ' + val.length;
        }
      }
    }
  }

  // Compute an automated error message regarding the property's types and conditions
  computeTypeMsg(struct, shape, plural, deep) {
    let msg = '';
    for (let i = 0; i < struct.length; i++) {
      const type = struct[i].type;
      const cond = struct[i].conditions;
      if (msg) msg += ' or ';

      if (type === 'number') {
        const positive = cond && cond.positive;
        const nonnegative = cond && cond.nonnegative;
        const isInt = cond && cond.integer;

        if (nonnegative || positive) {
          if (!plural) msg += 'a ';
          if (nonnegative) {
            msg += 'non-negative';
          } else {
            msg += 'positive'
          }
        } else if (isInt && !plural) {
          msg += 'an';
        } else msg += 'any';
        msg += ' ' + (isInt ? 'integer' : 'number');
        if (plural) msg += 's';
      }

      else if (type === 'array') {
        const len = cond && cond.length;
        const msgRes = this.computeTypeMsg(struct[i].structure, false, len !== 1, true);

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

      else if (type === 'object') {
        msg += 'an object with ' + this.computeTypeMsg(struct[i].structure, false, true, true) + ' as values';
      }

      else if (type === 'function') {
        if (!deep) msg += 'a ';
        msg += 'function reference';
        if (!deep && plural) msg += 's';
      }

      else if (type === 'string') {
        if (cond && cond.keywords) {
          if (cond.keywords.length > 1) {
            msg += 'one of the keywords';
          } else {
            msg += 'the keyword';
          }
          cond.keywords.forEach(function(val, n, arr) {
            if (n !== 0 && n === arr.length - 1) msg += ' or';
            else if (n !== 0) msg += ',';
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

      else if (type === 'boolean') {
        if (!deep) msg += 'a ';
        msg += 'boolean';
        if (!deep && plural) msg += 's';
      }
      else if (type === 'true' || type === 'false') {
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
