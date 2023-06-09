'use strict';
import type { DeepReadonlyObject, Descriptor } from 'LibraryTypeCheck';
import Slider89Error from './Slider89Error';

// ---- Misc types ----
type CustomPropertyName = `_${string}`;

export interface PropertyNodeBaseElements {
  slider: HTMLDivElement;
  track: HTMLDivElement;
  thumb: HTMLDivElement[];
}
export type PropertyNode = PropertyNodeBaseElements & {
  [ Key: string ]: Element | Element[];
};

// ---- Property types ----
export namespace Properties {
  export interface Base {
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
  export interface Vals extends Base {
    readonly $: Base;
    readonly $intermediateThis: Deep;
    readonly $intermediateVals: Deep;
  }

  export type Custom = Record<CustomPropertyName, any>;
  export type WithCustom = Base & Custom;
  export type Config = Omit<WithCustom, ReadonlyPropertyNames>;

  export type Writable = Omit<Base, ReadonlyPropertyNames>;

  export type Deep = {
    [ Prop in DeepPropertyNames ]: Base[Prop]
  }
}


export type PropertyInfo<Prop> = Prop extends ReadonlyPropertyNames
  ? { readOnly: true; }
  : {
      constructorOnly?: boolean;
      isDeepDefinedArray?: boolean;
      descriptor: Descriptor.self;
    }

type PropertyData = DeepReadonlyObject<{
  [ Prop in keyof Properties.Base ]: PropertyInfo<Prop>
}>


// ---- Types to keep track of ----
// This information cannot be extracted from the readonly `propertyData` below.
// This, NOTE: Keep track of this when modifying properties.
type DeepPropertyNames = 'range' | 'values';
type ReadonlyPropertyNames = 'node';


export default class Slider89Base extends Slider89Error {
  // TypeScript does not allow custom properties in classes
  // because they are busy ignoring all open issues with good suggestions
  // Thus, NOTE: Expand this (copy-paste) whenever the properties change.
  range: Properties.Base['range']
  values: Properties.Base['values']
  value: Properties.Base['value']
  precision: Properties.Base['precision']
  step: Properties.Base['step']
  structure: Properties.Base['structure']
  node: Properties.Base['node']
  orientation: Properties.Base['orientation']
  classList: Properties.Base['classList']
  events: Properties.Base['events']

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
  vals: Properties.Vals = {}; // holding every class property
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
