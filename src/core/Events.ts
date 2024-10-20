'use strict';
import type { Properties } from './Base';
import { Base } from './Base';
import { Slider89 } from './Slider89';

export namespace EventType {
  type NamesBasic = typeof Events.eventTypes[number];
  type NamesSpecial = keyof typeof Events.eventTypesSpecial;

  export type HumanList = Array<NamesBasic | NamesSpecial>;
  export interface Special {
    [ Key: string ]: {
      prefix: string,
      fn: (slider: Slider89, suffix: string, eventType: string) => void;
    }
  }

  export type Base = NamesBasic | `change:${keyof Properties.WithCustom}`;
}


export namespace EventData {
  export type Fn = (...args: any[]) => any;
  export type List = Record<EventListenerIdentifier, Base[] | Base>;

  export interface Base {
    type: EventType.Base,
    fn: Fn
  }
}

type EventListenerIdentifier = number | string;


export class Events extends Base {
  static eventTypes = [
    'update',
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

  /** List of all available event types. */
  static availableEventTypes = (() => {
    // @ts-ignore
    return this.eventTypes.concat(Object.keys(this.eventTypesSpecial)) as EventType.HumanList;
  })();


  #eventList: EventData.List = {};
  #eventID = 0;


  addEvent(type: EventType.Base, fn: EventData.Fn, customID?: string): EventListenerIdentifier {
    Base.selfCheckMethod('addEvent', arguments);

    if (!this.checkEventType(type)) {
      const msg =
        'The specified event type ‘' + type + '’ is not valid. Available types are:'
        + Slider89.arrayToListString(Events.availableEventTypes);
      throw new Slider89.Error(msg, 'addEvent');
    }

    return this.#registerEvent(type, fn, customID);
  }
  removeEvent(key: EventListenerIdentifier): false | EventData.Fn[] {
    Base.selfCheckMethod('removeEvent', arguments);

    if (!(key in this.#eventList)) {
      return false;
    }
    const eventData = this.#eventList[key];
    delete this.#eventList[key];

    return Array.isArray(eventData)
      ? eventData.reduce(this.#handleRemoveEvent.bind(this), [])
      : this.#handleRemoveEvent([], eventData);
  }

  invokeEvent(type: EventType.Base, ...args: any[]) {
    args.unshift(this);
    if (type in this.vals.events) {
      for (const eventFunc of this.vals.events[type]) {
        eventFunc(...args);
      }
    }
  }


  // ---- Helper functions ----
  #registerEvent(type: EventType.Base, fn: EventData.Fn, customID: string) {
    if (!Array.isArray(this.vals.events[type])) {
      this.vals.events[type] = [];
    }
    this.vals.events[type].push(fn);

    const eventData = { type, fn };
    if (customID) {
      if (!Array.isArray(this.#eventList[customID])) {
        this.#eventList[customID] = [];
      }
      this.#eventList[customID].push(eventData);
    } else {
      this.#eventList[this.#eventID] = eventData;
    }

    return customID || this.#eventID++;
  }

  #handleRemoveEvent(removedCallbacks: EventData.Fn[], data: EventData.Base) {
    const eventFns = this.vals.events[data.type];
    const deletedFn = eventFns.splice(eventFns.indexOf(data.fn), 1)[0];

    if (eventFns.length === 0) {
      delete this.vals.events[data.type];
    }
    removedCallbacks.push(deletedFn);

    return removedCallbacks;
  }

  checkEventType(type: EventType.Base) {
    for (const eventTypeData of Object.values(Events.eventTypesSpecial)) {
      if (type.startsWith(eventTypeData.prefix)) {
        const suffix = type.slice(eventTypeData.prefix.length);
        eventTypeData.fn(this as unknown as Slider89, suffix, type);
        return true;
      }
    }
    // @ts-ignore
    return Events.eventTypes.includes(type);
  }
}
