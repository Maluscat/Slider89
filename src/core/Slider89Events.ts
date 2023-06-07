'use strict';
import type { Properties } from 'Slider89Base';
import Slider89 from './Slider89';
import Slider89Base from './Slider89Base';

namespace EventType {
  type NamesBasic = typeof Slider89Events.eventTypes[number];
  type NamesSpecial = keyof typeof Slider89Events.eventTypesSpecial;

  export type HumanList = Array<NamesBasic | NamesSpecial>;
  export interface Special {
    [ Key: string ]: {
      prefix: string,
      fn: (slider: Slider89, suffix: string, eventType: string) => void;
    }
  }

  // ---- Types to keep track of ----
  export type Base = NamesBasic | `change:${keyof Properties.WithCustom}`;
}


namespace EventData {
  export type Fn = (this: Slider89, ...args: any[]) => any;
  export type List = Record<EventListenerIdentifier, Base[]>;

  export interface Base {
    type: EventType.Base,
    fn: Fn
  }
}

type EventListenerIdentifier = number | string;


export default class Slider89Events extends Slider89Base {
  // ---- Constant statics ----
  static eventTypes = [
    'start',
    'move',
    'end',
  ] as const;

  static eventTypesSpecial = ({
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
  }) as const satisfies EventType.Special;

  // Statically getting the name of all event types. This is just for humans.
  static availableEventTypes = (() => {
    // @ts-ignore
    return this.eventTypes.concat(Object.keys(this.eventTypesSpecial)) as EventType.HumanList;
  })();


  // ---- Properties ----
  // Storing event data for removability
  eventList: EventData.List = {};
  eventID = 0;


  // ---- Methods ----
  addEvent(type: EventType.Base, fn: EventData.Fn, name?: string): EventListenerIdentifier {
    if (!this.checkEventType(type)) {
      const msg =
        'The specified event type ‘' + type + '’ is not valid. Available types are:'
        + Slider89.arrayToListString(Slider89Events.availableEventTypes);
      throw new Slider89.Error(msg, 'addEvent');
    }

    if (!Array.isArray(this.vals.events[type])) this.vals.events[type] = new Array();
    this.vals.events[type].push(fn);
    const key = name || this.eventID;
    const data = {
      type: type,
      fn: fn
    };
    if (name) {
      if (!Array.isArray(this.eventList[key])) this.eventList[key] = new Array();
      this.eventList[key].push(data);
    } else {
      this.eventList[key] = data;
    }
    return name || this.eventID++;
  }
  removeEvent(key: EventListenerIdentifier): false | EventData.Fn[] {
    const eventInfo = this.eventList[key];
    if (!eventInfo) return false;
    delete this.eventList[key];
    return Array.isArray(eventInfo)
      ? eventInfo.reduce(this.handleRemoveEvent.bind(this), new Array())
      : this.handleRemoveEvent(new Array(), eventInfo);
  }


  // ---- Helper functions ----
  handleRemoveEvent(deleteCollection: EventData.Fn[], eventInfo: EventData.Base) {
    const typeEvents = this.vals.events[eventInfo.type];
    const deleted = typeEvents.splice(typeEvents.indexOf(eventInfo.fn), 1)[0];
    if (typeEvents.length === 0) delete this.vals.events[eventInfo.type];
    deleteCollection.push(deleted);
    return deleteCollection;
  }

  invokeEvent(types: string[], ...args: any[]) {
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

  checkEventType(type: EventType.Base) {
    for (const eventTypeData of Object.values(Slider89Events.eventTypesSpecial)) {
      if (type.startsWith(eventTypeData.prefix)) {
        const suffix = type.slice(eventTypeData.prefix.length);
        eventTypeData.fn(this as unknown as Slider89, suffix, type);
        return true;
      }
    }
    // @ts-ignore
    return Slider89Events.eventTypes.includes(type);
  }
}
