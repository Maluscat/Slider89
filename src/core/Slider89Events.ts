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
  addEvent(type: EventType.Base, fn: EventData.Fn, customID?: string): EventListenerIdentifier {
    if (!this.checkEventType(type)) {
      const msg =
        'The specified event type ‘' + type + '’ is not valid. Available types are:'
        + Slider89.arrayToListString(Slider89Events.availableEventTypes);
      throw new Slider89.Error(msg, 'addEvent');
    }

    if (!Array.isArray(this.vals.events[type])) {
      this.vals.events[type] = [];
    }
    this.vals.events[type].push(fn);
    const identifier = customID || this.eventID;
    const eventData = {
      type: type,
      fn: fn
    };

    if (customID) {
      if (!Array.isArray(this.eventList[identifier])) {
        this.eventList[identifier] = new Array();
      }
      this.eventList[identifier].push(eventData);
    } else {
      this.eventList[identifier] = eventData;
    }

    return customID || this.eventID++;
  }
  removeEvent(key: EventListenerIdentifier): false | EventData.Fn[] {
    if (!(key in this.eventList)) {
      return false;
    }
    const eventData = this.eventList[key];
    delete this.eventList[key];

    return Array.isArray(eventData)
      ? eventData.reduce(this.handleRemoveEvent.bind(this), [])
      : this.handleRemoveEvent([], eventData);
  }


  // ---- Helper functions ----
  handleRemoveEvent(deleteCollection: EventData.Fn[], eventInfo: EventData.Base) {
    const type = eventInfo.type;
    const eventFns = this.vals.events[type];
    const deletedFn = eventFns.splice(eventFns.indexOf(eventInfo.fn), 1)[0];

    if (eventFns.length === 0) {
      delete this.vals.events[type];
    }
    deleteCollection.push(deletedFn);

    return deleteCollection;
  }

  invokeEvent(types: EventType.Base[], ...args: any[]) {
    args[0] = this;
    for (const type of types) {
      if (type in this.vals.events) {
        for (const eventFunc of this.vals.events[type]) {
          eventFunc.apply(this, args);
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
