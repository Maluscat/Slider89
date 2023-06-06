'use strict';
import Slider89 from './Slider89';
import Slider89Base from './Slider89Base';

export default class Slider89Events extends Slider89Base {
  static #eventTypes = [
    'start',
    'move',
    'end',
  ];
  static #eventTypesSpecial = {
    'change:$property': {
      prefix: 'change:',
      fn: (slider, customProp, eventType) => {
        if (!Object.prototype.hasOwnProperty.call(slider.vals, customProp)) {
          const msg =
            "‘" + eventType + "’ refers to ‘" + customProp + "’, which isn't a recognized property. "
            + "Check its spelling and be aware that custom properties need to be initialized";
          throw new Slider89.Error(msg, 'addEvent');
        }
      }
    }
  }

  // Statically getting the name of all event types. This is just for humans.
  static availableEventTypes = (() => {
    return this.#eventTypes.concat(Object.keys(this.#eventTypesSpecial));
  })();


  eventList = {}; // Storing event data (most notably the identifier) for event removability
  eventID = 0;


  // ---- Class methods ----
  addEvent(type, fn, name) {
    if (!this.checkEventType(type)) {
      const msg =
        'The specified event type ‘' + type + '’ is not valid. Available types are:'
        + Slider89.arrayToListString(Slider89Events.availableEventTypes);
      throw new Slider89.Error(msg, 'addEvent');
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
    for (const eventTypeData of Object.values(Slider89Events.#eventTypesSpecial)) {
      if (type.startsWith(eventTypeData.prefix)) {
        const suffix = type.slice(eventTypeData.prefix.length);
        eventTypeData.fn(this, suffix, type);
        return true;
      }
    }
    return Slider89Events.#eventTypes.includes(type);
  }
}
