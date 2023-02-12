'use strict';
import Slider89 from './Slider89.js';
import Slider89Base from './Slider89Base.js';

export default class Slider89Events extends Slider89Base {
  static eventTypes = [
    'start',
    'move',
    'end',
    'change:$property'
  ];


  eventList = {}; // Storing event data (most notably the identifier) for event removability
  eventID = 0;


  // ---- Class methods ----
  addEvent(type, fn, name) {
    if (!this.checkEventType(type)) {
      throw new Slider89.Error('the specified type ‘' + type + '’ is not a valid event type. Available types are:' + Slider89.arrayToListString(Slider89Events.eventTypes), 'addEvent');
    }

    if (!Array.isArray(this.vals.events[type])) this.vals.events[type] = new Array();
    this.vals.events[type].push(fn);
    const key = name || this.eventID;
    const obj = {
      type: type,
      fn: fn
    };
    if (name) {
      if (!Array.isArray(this.eventList[key])) this.eventList[key] = new Array();
      this.eventList[key].push(obj);
    } else {
      this.eventList[key] = obj;
    }
    return name || this.eventID++;
  }
  removeEvent(key) {
    const listEntry = this.eventList[key];
    if (!listEntry) return false;
    delete this.eventList[key];
    return Array.isArray(listEntry) ?
      listEntry.reduce(handleEvents, new Array()) :
      handleEvents(new Array(), listEntry);

    function handleEvents(acc, entry) {
      const typeEvents = this.vals.events[entry.type];
      const deleted = typeEvents.splice(typeEvents.indexOf(entry.fn), 1)[0];
      if (typeEvents.length === 0) delete this.vals.events[entry.type];
      acc.push(deleted);
      return acc;
    }
  }


  // ---- Helper functions ----
  invokeEvent(types) {
    const args = Array.from(arguments);
    args[0] = this;
    for (let i = 0; i < types.length; i++) {
      const functions = this.vals.events[types[i]];
      if (functions) {
        for (let n = 0; n < functions.length; n++) {
          functions[n].apply(this, args);
        }
      }
    }
  }

  checkEventType(type) {
    if (type.indexOf('change:') === 0) {
      // Edge case for 'change:$property'
      const customProp = type.slice('change:'.length);
      if (!Object.prototype.hasOwnProperty.call(this.vals, customProp)) {
        throw new Slider89.Error(
          "‘" + type + "’ refers to ‘" + customProp + "’, which isn't a recognized property. "
          + "Check its spelling and be aware that custom properties need to be initialized",
          'addEvent');
      }
    } else if (Slider89Events.eventTypes.indexOf(type) === -1) return false;
    return true;
  }
}
