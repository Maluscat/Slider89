'use strict';
import type { Properties } from './Base';
import { RuntimeTypeCheck } from './type-check/RuntimeTypeCheck';
import { Slider89 } from './Slider89';

export class SliderError {
  static COUNTS = <const> ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];

  static Error = class extends Error {
    constructor(msg: string, target?: string, abort = false) {
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
  static InitializationError = class extends SliderError.Error {
    constructor(msg: string) {
      super(msg, 'constructor', true);
    }
  }

  // ---- Property errors ----
  static PropertyError = class extends SliderError.Error {
    constructor(slider: Slider89, property: string, msg: string) {
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
  static PropertyTypeError = class extends SliderError.PropertyError {
    constructor(
      slider: Slider89,
      propertyName: keyof Properties.Writable,
      typeMsg: string
    ) {
      super(slider, propertyName, 'Type mismatch. ' + typeMsg);
    }
  }

  // ---- Method errors ----
  static MethodArgTypeError = class extends SliderError.Error {
    constructor(methodName: string, index: number, typeMsg: string) {
      const argInfo = Slider89.getMethodArgInfo(methodName, index);
      const msg =
        `Type mismatch on the ${SliderError.getMethodArgMessage(argInfo, index)}. ${typeMsg}`;

      super(msg, methodName);
    }
  }
  static MethodArgOmitError = class extends SliderError.Error {
    constructor(methodName: string, index: number) {
      const argInfo = Slider89.getMethodArgInfo(methodName, index);
      const msg =
        'The ' + SliderError.getMethodArgMessage(argInfo, index)
        + ' has been omitted but it is required'
        + ' (It must be of type ' + RuntimeTypeCheck.buildDescriptorTypeMessage(argInfo.descriptor) + ').';

      super(msg, methodName);
    }
  }

  // ---- Structure errors ----
  static StructureError = class extends SliderError.Error {
    constructor(msg: string) {
      super(msg, 'structure', true);
    }
  }
  static StructureParseError = class extends SliderError.StructureError {
    constructor(beforeFailure: string, pointOfFailure: string) {
      const msg =
        "Something has been declared wrongly and couldn't be parsed. Point of failure "
        + "(before " + beforeFailure + "):\n\n"
        + pointOfFailure + '\n';
      super(msg);
    }
  }

  // ---- Helper functions ----
  static getMethodArgMessage(argInfo, index: number) {
    let msg = '';
    if (argInfo.optional) {
      msg += 'optional ';
    }
    msg += Slider89.COUNTS[index] + ' argument (' + argInfo.name + ')';
    return msg;
  }

  static getMethodArgInfo(methodName: string, index: number) {
    return Slider89.methodData[methodName].args[index];
  }

  static arrayToListString(arr: Array<any>) {
    return '\n - "' + arr.join('"\n - "') + '"\n';
  }
}
