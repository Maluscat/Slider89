'use strict';
import type { Properties as Props } from './Base';
import { Base } from './Base';
import { Slider89 } from './Slider89';

type SpecialList = {
  [ Key: string ]: {
    prefix: string,
    fn: (slider: Slider89, suffix: string, eventType: string) => void;
  }
}
type EventData<T extends keyof EventMap> = {
  type: T,
  fn: EventMap[T]
}

export namespace EventType {
  export type SpecialAbbr = keyof typeof Events.eventTypesSpecial;
  export type Basic = typeof Events.eventTypes[number];
  export type Special = `change:${keyof Props.WithCustom}`;

  export type Base = Basic | Special;
}

export type EventMap = {
  update: (value: number, prevValue: number, thumbIndex: number, evt?: UIEvent) => void
  start: (thumbIndex: number, evt: TouchEvent | MouseEvent) => void
  move: (thumbIndex: number, evt: TouchEvent | MouseEvent) => void
  end: (thumbIndex: number, evt: TouchEvent | MouseEvent) => void
} & {
  [ T in keyof Props.WithCustom as `change:${T}` ]: T extends Props.Deep
    ? (value: Props.WithCustom[T], prevVal: Props.WithCustom[T]) => void
    : (value: Props.WithCustom[T], prevVal: Props.WithCustom[T], deepIndex?: number) => void
}

export type EventListenerID = number | string;


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
  }) as const satisfies SpecialList;

  /** Human-readable and concise list of all available event types. */
  static availableEventTypes = (() => {
    // @ts-ignore
    return this.eventTypes.concat(Object.keys(this.eventTypesSpecial)) as Array<EventType.Basic | EventType.SpecialAbbr>;
  })();


  #eventList: Record<EventListenerID, EventData<keyof EventMap>[]> = {};
  #eventID = 0;


  addEvent<T extends keyof EventMap>(type: T, fn: EventMap[T], customID?: string): EventListenerID {
    Base.selfCheckMethod('addEvent', arguments);

    if (!this.checkEventType(type)) {
      const msg =
        'The specified event type ‘' + type + '’ is not valid. Available types are:'
        + Slider89.arrayToListString(Events.availableEventTypes);
      throw new Slider89.Error(msg, 'addEvent');
    }

    const id = customID || this.#eventID++;
    this.#registerEvent(type, fn, id);
    return id;
  }
  removeEvent(key: EventListenerID): false | EventMap[keyof EventMap][] {
    Base.selfCheckMethod('removeEvent', arguments);

    if (!(key in this.#eventList)) {
      return false;
    }
    const eventData = this.#eventList[key];
    delete this.#eventList[key];

    return eventData.reduce(this.#handleRemoveEvent.bind(this), []);
  }

  invokeEvent<T extends keyof EventMap>(type: T, ...args: Parameters<EventMap[T]>) {
    // @ts-ignore TODO
    args.unshift(this);
    if (type in this.vals.events) {
      for (const callback of this.vals.events[type]) {
        // @ts-ignore Spread/rest typing
        callback(...args);
      }
    }
  }


  // ---- Helper functions ----
  #registerEvent<T extends keyof EventMap>(type: T, fn: EventMap[T], id: EventListenerID) {
    if (!Array.isArray(this.vals.events[type])) {
      this.vals.events[type] = [];
    }
    this.vals.events[type].push(fn);

    const eventData = { type, fn };
    if (!Array.isArray(this.#eventList[id])) {
      this.#eventList[id] = [];
    }
    this.#eventList[id].push(eventData);
  }

  #handleRemoveEvent<Fn extends keyof EventMap>(removedCallbacks: EventMap[Fn][], data: EventData<Fn>) {
    const eventFns = this.vals.events[data.type];
    const deletedFn = eventFns.splice(eventFns.indexOf(data.fn), 1)[0];

    if (eventFns.length === 0) {
      delete this.vals.events[data.type];
    }
    removedCallbacks.push(deletedFn);

    return removedCallbacks;
  }

  checkEventType<T extends keyof EventMap>(type: T) {
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
