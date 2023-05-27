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
      throw new Slider89.Error(
        'The specified event type ‘' + type + '’ is not valid. Available types are:' + Slider89.arrayToListString(Slider89Events.eventTypes),
        'addEvent');
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
    const eventInfo = this.eventList[key];
    if (!eventInfo) return false;
    delete this.eventList[key];
    return Array.isArray(eventInfo)
      ? eventInfo.reduce(this.handleRemoveEvent.bind(this), new Array())
      : this.handleRemoveEvent(new Array(), eventInfo);
  }


  // ---- Helper functions ----
  handleRemoveEvent(deleteCollection, eventInfo) {
    const typeEvents = this.vals.events[eventInfo.type];
    const deleted = typeEvents.splice(typeEvents.indexOf(eventInfo.fn), 1)[0];
    if (typeEvents.length === 0) delete this.vals.events[eventInfo.type];
    deleteCollection.push(deleted);
    return deleteCollection;
  }

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
        const msg =
          "‘" + type + "’ refers to ‘" + customProp + "’, which isn't a recognized property. "
          + "Check its spelling and be aware that custom properties need to be initialized";
        throw new Slider89.Error(msg, 'addEvent');
      }
    } else if (Slider89Events.eventTypes.indexOf(type) === -1) return false;
    return true;
  }
}