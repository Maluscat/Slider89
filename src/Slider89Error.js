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
        'property ‘' + propertyName + '’ '
        + Slider89.getErrorTypeMessage(propertyInfo.structure, typeMsg);

      super(slider, propertyName, msg);
    }
  }

  // ---- Method errors ----
  static MethodArgError = class extends Slider89Error.Error {
    constructor(msg, argInfo, index) {
      let finalMsg = 'the ';
      if (argInfo.optional) {
        finalMsg += 'optional ';
      }
      finalMsg += Slider89.COUNTS[index] + ' argument (' + argInfo.name + ') ';
      finalMsg += msg;

      super(finalMsg);
    }
  }

  static MethodArgTypeError = class extends Slider89Error.MethodArgError {
    constructor(methodName, index, typeMsg) {
      const argInfo = Slider89.getMethodArgInfo(methodName, index);
      const msg = Slider89.getErrorTypeMessage(argInfo.structure, typeMsg);

      super(msg, argInfo, index);
    }
  }

  static MethodArgOmitError = class extends Slider89Error.MethodArgError {
    constructor(methodName, index) {
      const argInfo = Slider89.getMethodArgInfo(methodName, index);
      const msg =
        'has been omitted but it is required. It must be '
        + Slider89.TypeCheck.computeTypeMsg(argInfo.structure);

      super(msg, argInfo, index);
    }
  }

  // ---- Helper functions ----
  static getErrorTypeMessage(structure, typeMsg) {
    return 'must be ' + Slider89.TypeCheck.computeTypeMsg(structure)
      + ' but it' + typeMsg;
  }

  static getMethodArgInfo(methodName, index) {
    return Slider89.methodStructure[methodName].args[index];
  }

  static arrayToListString(arr) {
    return '\n - "' + arr.join('"\n - "') + '"\n';
  }
}
