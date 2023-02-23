'use strict';
import Slider89 from './Slider89.js';

export default class Slider89Error {
  static COUNTS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];

  static Error = class extends Error {
    constructor(msg, target, abort = false) {
      if (target) {
        msg = '@ ' + target + ': ' + msg;
      }
      if (msg[msg.length - 1] !== '\n' && msg[msg.length - 1] !== '.') {
        msg += '.';
      }
      if (abort) {
        msg += '\nAborting the slider construction.';
      }

      super(msg);
      this.name = 'Slider89' + this.constructor.name;
    }
  }

  // ---- Constructor error ----
  static InitializationError = class extends Slider89Error.Error {
    constructor(msg) {
      super(msg, 'constructor', true);
    }
  }

  // ---- Property errors ----
  static PropertyError = class extends Slider89Error.Error {
    constructor(slider, property, msg) {
      let prevVal = slider[property];
      if (prevVal !== undefined) {
        if (Array.isArray(prevVal)) {
          prevVal = '[' + prevVal.join(', ') + ']';
        }
        msg += '.\nContinuing with the previous value (' + prevVal + ').';
      }

      super(msg, property, prevVal === undefined);
    }
  }
  static PropertyTypeError = class extends Slider89Error.PropertyError {
    constructor(slider, propertyName, propertyInfo, typeMsg) {
      let msg =
        'Type mismatch.'
        + Slider89.getTypeErrorMessage(propertyInfo.descriptor, typeMsg);

      super(slider, propertyName, msg);
    }
  }

  // ---- Method errors ----
  static MethodArgTypeError = class extends Slider89Error.Error {
    constructor(methodName, index, typeMsg) {
      const argInfo = Slider89.getMethodArgInfo(methodName, index);
      const msg =
        'Type mismatch on the ' + Slider89Error.getMethodArgMessage(argInfo, index) + '.'
        + Slider89.getTypeErrorMessage(argInfo.descriptor, typeMsg);

      super(msg, methodName);
    }
  }
  static MethodArgOmitError = class extends Slider89Error.Error {
    constructor(methodName, index) {
      const argInfo = Slider89.getMethodArgInfo(methodName, index);
      const msg =
        'The ' + Slider89Error.getMethodArgMessage(argInfo, index)
        + ' has been omitted but it is required'
        + ' (It must be of type ' + Slider89.TypeCheck.buildDescriptorTypeMessage(argInfo.descriptor) + ').';

      super(msg, methodName);
    }
  }

  // ---- Structure errors ----
  static StructureError = class extends Slider89Error.Error {
    constructor(msg) {
      super(msg, 'structure', true);
    }
  }
  static StructureParseError = class extends Slider89Error.StructureError {
    constructor(beforeFailure, pointOfFailure) {
      const msg =
        "Something has been declared wrongly and couldn't be parsed. Point of failure "
        + "(before " + beforeFailure + "):\n\n"
        + pointOfFailure + '\n';
      super(msg);
    }
  }

  // ---- Helper functions ----
  static getTypeErrorMessage(descriptor, typeMsg) {
    return ' Expected ' + Slider89.TypeCheck.buildDescriptorTypeMessage(descriptor) + ','
         + ' got ' + typeMsg;
  }

  static getMethodArgMessage(argInfo, index) {
    let msg = '';
    if (argInfo.optional) {
      msg += 'optional ';
    }
    msg += Slider89.COUNTS[index] + ' argument (' + argInfo.name + ')';
    return msg;
  }

  static getMethodArgInfo(methodName, index) {
    return Slider89.methodData[methodName].args[index];
  }

  static arrayToListString(arr) {
    return '\n - "' + arr.join('"\n - "') + '"\n';
  }
}
