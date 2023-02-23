'use strict';
export default class LibraryTypeCheck {
  static getType(value) {
    if (Array.isArray(value))
      return 'Array';
    else if (Number.isNaN(value))
      return 'NaN';
    else if (value === null)
      return 'null';
    else
      return typeof value;
  }

  static checkTypes(val, descriptor) {
    let msg;
    for (let i = 0; i < descriptor.length; i++) {
      const typeData = descriptor[i];
      const type = typeData.type;
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
        if (type === 'array') {
          for (let j = 0; j < val.length; j++) {
            if (msg = LibraryTypeCheck.checkTypes(val[j], typeData.descriptor)) break;
          }
        } else if (type === 'object') {
          for (let key in val) {
            if (msg = LibraryTypeCheck.checkTypes(val[key], typeData.descriptor)) break;
          }
        }

        if (msg) {
          return LibraryTypeCheck.toTitleCase(type) + '<' + msg + '>';
        }
        if (msg = LibraryTypeCheck.buildConditionTypeMessage(typeData.conditions, val)) break;
        else return false;
      }
    }
    return msg || LibraryTypeCheck.getType(val);
  }

  static buildConditionTypeMessage(conditions, val) {
    if (!conditions) return;

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
      return 'a number string';
    }
    if (conditions.length && val.length !== conditions.length) {
      return 'an array of length ' + val.length;
    }
  }

  // Compute an automated error message regarding the property's types and conditions
  static buildDescriptorTypeMessage(descriptor) {
    let msg = '';
    for (let i = 0; i < descriptor.length; i++) {
      const typeData = descriptor[i];
      const type = typeData.type;
      const cond = typeData.conditions;

      if (msg) msg += ' OR ';

      if (type === 'number') {
        const nonnegative = cond && cond.nonnegative;
        const positive = cond && cond.positive;
        const isInt = cond && cond.integer;

        if (nonnegative) {
          msg += 'non-negative ';
        } else if (positive) {
          msg += 'positive '
        }
        msg += (isInt ? 'integer' : 'number');
      }

      else if (type === 'array') {
        const innerType = LibraryTypeCheck.buildDescriptorTypeMessage(typeData.descriptor);
        msg += 'Array<' + innerType + '>';
        if (cond && cond.length) {
          msg += ' of length ' + cond.length;
        }
      }

      else if (type === 'object') {
        const innerType = LibraryTypeCheck.buildDescriptorTypeMessage(typeData.descriptor);
        msg += 'Object<' + typeData.keyName + ', ' + innerType + '>';
      }

      else if (type === 'string') {
        if (cond && cond.keywords) {
          if (cond.keywords.length > 1) {
            msg += 'one of the keywords';
          } else {
            msg += 'the keyword';
          }
          cond.keywords.forEach(function(val, n, arr) {
            if (n !== 0 && n === arr.length - 1) {
              msg += ' or';
            } else if (n !== 0) {
              msg += ',';
            }
            msg += ' "' + val + '"';
          });
        } else {
          if (cond && cond.filled) msg += 'non-empty ';
          if (cond && cond.wordChar) msg += 'non-number ';
          msg += 'string';
        }
      }

      else {
        msg += type;
      }

      if (typeData.shape) {
        msg += ' (' + typeData.shape + ')';
      }
    }

    return msg;
  }

  // ---- Helper functions ----
  static toTitleCase(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
}
