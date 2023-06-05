'use strict';
import Slider89Error from './Slider89Error';

// ---- Utility types ----
// From https://stackoverflow.com/a/60839718
export type DeepReadonlyObject<T> = T extends object ? {
  readonly [P in keyof T]: DeepReadonlyObject<T[P]>;
} : T;


// ---- Slider89 types ----
type DeepPropertyNames = 'range' | 'values';

export type PropertyNode = Partial<Record<string, HTMLElement>> & {
  slider: HTMLDivElement;
  track: HTMLDivElement;
  thumb: HTMLDivElement[];
};

export interface Properties {
  range: [ number, number ];
  values: number[];
  value: number;
  precision: number | false;
  step: number | false;
  structure: string | false;
  node: PropertyNode;
  orientation: 'vertical' | 'horizontal';
  classList: Record<string, string[]> | false;
  events: Record<string, Function[]> | false;
}
export interface PropertiesVals extends Properties {
  readonly $: Properties;
  readonly $intermediateThis: PropertiesDeep;
  readonly $intermediateVals: PropertiesDeep;
}
type PropertiesDeep = {
  [ prop in DeepPropertyNames ]: Properties[prop]
}

namespace PropertyDescriptor {
  interface TypesWithConditions {
    boolean: never;
    true: never;
    false: never;
    object: never;
    function: never;
    array: 'length';
    number: 'nonnegative' | 'positive' | 'integer';
    string: 'filled' | 'wordChar' | 'keywords';
  }
  interface Conditions {
    nonnegative: boolean;
    positive: boolean;
    integer: boolean;
    length: number;
    keywords: string[];
    filled: boolean;
    wordChar: boolean
  }

  export type self = {
    type: keyof TypesWithConditions;
    conditions?: Partial<{
      [ Cond in TypesWithConditions[self['type']] ]: Conditions[Cond];
    }>;
    shape?: string;
  } | {
    type: 'array';
    descriptor: Array<self>;
  } | {
    type: 'object';
    descriptor: Array<self>;
    keyName?: string;
  }
}

type PropertyData = DeepReadonlyObject<{
  [ Prop in keyof Properties ]: {
    constructorOnly?: boolean;
    isDeepDefinedArray?: boolean;
    descriptor: Array<PropertyDescriptor.self>;
  } | {
    readOnly: true;
  }
}>

export default class Slider89Base extends Slider89Error {
  // TypeScript does not allow custom properties in classes
  // because they are busy ignoring all open issues with good suggestions
  // Thus, NOTE: Expand this (copy-paste) whenever the properties change.
  range: Properties['range']
  values: Properties['values']
  value: Properties['value']
  precision: Properties['precision']
  step: Properties['step']
  structure: Properties['structure']
  node: Properties['node']
  orientation: Properties['orientation']
  classList: Properties['classList']
  events: Properties['events']

  static methodData = <const> ({
    addEvent: {
      args: [
        {
          name: 'event type',
          descriptor: [{
            type: 'string'
          }]
        },
        {
          name: 'event function',
          descriptor: [{
            type: 'function'
          }]
        },
        {
          name: 'event namespace',
          optional: true,
          descriptor: [{
            type: 'string',
            conditions: {
              filled: true,
              wordChar: true
            }
          }]
        }
      ]
    },
    removeEvent: {
      args: [
        {
          name: 'event identifier/namespace',
          descriptor: [
            {
              type: 'number',
              conditions: {
                nonnegative: true,
                integer: true
              }
            },
            {
              type: 'string',
              conditions: {
                filled: true,
                wordChar: true
              }
            }
          ]
        }
      ]
    }
  });
  static propertyData: PropertyData = <const> ({
    range: {
      isDeepDefinedArray: true,
      descriptor: [
        {
          type: 'array',
          shape: '[startValue, endValue]',
          conditions: {
            length: 2
          },
          descriptor: [
            { type: 'number' }
          ]
        },
        { type: 'boolean' }
      ]
    },
    values: {
      isDeepDefinedArray: true,
      descriptor: [{
        type: 'array',
        descriptor: [{
          type: 'number'
        }]
      }]
    },
    value: {
      descriptor: [{
        type: 'number'
      }]
    },
    precision: {
      descriptor: [
        {
          type: 'number',
          conditions: {
            nonnegative: true,
            integer: true
          }
        },
        { type: 'false' }
      ]
    },
    step: {
      descriptor: [
        {
          type: 'number',
          conditions: {
            positive: true
          }
        },
        { type: 'false' }
      ]
    },
    structure: {
      constructorOnly: true,
      descriptor: [
        {
          type: 'string',
          conditions: {
            filled: true
          }
        },
        { type: 'false' }
      ]
    },
    node: {
      readOnly: true
    },
    orientation: {
      descriptor: [{
        type: 'string',
        conditions: {
          keywords: [
            'horizontal',
            'vertical'
          ]
        }
      }]
    },
    classList: {
      constructorOnly: true,
      descriptor: [
        {
          type: 'object',
          shape: '{nodeName: [...classes]}',
          keyName: 'nodeName',
          descriptor: [{
            type: 'array',
            descriptor: [
              { type: 'string' }
            ]
          }]
        },
        { type: 'false' }
      ]
    },
    events: {
      constructorOnly: true,
      descriptor: [
        {
          type: 'object',
          shape: '{eventName: [...functions]}',
          keyName: 'eventName',
          descriptor: [{
            type: 'array',
            descriptor: [{
              type: 'function'
            }]
          }]
        },
        { type: 'false' }
      ]
    }
  });

  methods;
  properties;

  // @ts-ignore
  vals: PropertiesVals = {}; // holding every class property
  initial = false;

  constructor() {
    super();

    /* Special properties which are only to be accessed by a getter/setter, never directly:
     *   $: Fixed endpoint for the values of all properties
     *   $intermediateThis: Intermediate property (between this and vals) for the keys of an array/object
     *   $intermediateVals: Intermediate property (between vals and vals.$) for the keys of an array/object
     *
     * This results in the following getter/setter paths:
     *   Normal (primitive & shallow) properties:
     *     <this.property>   --- Type check & Custom getter/setter --->
     *     <vals.property>   --- Internal property update --->
     *     <vals.$.property>
     *   Deeply defined Arrays:
     *     <this.property>                        --- Type check & Custom getter/setter --->
     *     <vals.$intermediateThis.property = []> --- Custom getter/setter on the keys/indexes --->
     *     <vals.property>                        --- Internal property update --->
     *     <vals.$intermediateVals.property = []> --- Internal property[key/index] update --->
     *     <vals.$.property>
     *
     * Object.defineProperties is used for non-enumerability & non-writability of these special properties.
     */
    Object.defineProperties(this.vals, {
      '$': {
        value: {}
      },
      '$intermediateThis': {
        value: {}
      },
      '$intermediateVals': {
        value: {}
      },
    });
  }
}
