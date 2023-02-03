'use strict';
export default class Slider89Error {
  propError(prop, msg, noTarget) {
    if (!this.initial) {
      let prevVal = this.vals[prop];
      if (Array.isArray(prevVal)) prevVal = '[' + prevVal.join(', ') + ']';
      msg += '.\nContinuing with the previous value (' + prevVal + ').';
    }
    this.error(msg, noTarget ? false : prop);
  }
  methodError(method, argIdx, msg, omitError) {
    const counts = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];
    const arg = this.methods[method].args[argIdx];

    let errMsg = 'the ' + (arg.optional ? 'optional ' : '') + counts[argIdx] + ' argument (' + arg.name + ') ';
    if (omitError) errMsg += 'has been omitted but it is required. It ';
    errMsg += 'must be ' + this.typeCheck.computeTypeMsg(arg.structure);
    if (!omitError) errMsg += ' but it' + msg;

    this.error(errMsg, method);
  }

  error(msg, target, abort) {
    msg = 'Slider89' + (target ? ' @ ' + target : '') + ': ' + msg;
    if (msg[msg.length - 1] !== '\n' && msg[msg.length - 1] !== '.') msg += '.\n';
    if (this.initial || abort) msg += 'Aborting the slider construction.';
    throw new Error(msg);
  }
}
