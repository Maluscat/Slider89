'use strict';
import { StyleModule } from 'style-mod';
import type { DeepReadonlyObject, Descriptor } from './type-check/RuntimeTypeCheck';
import type { EventMap } from './Events';
import type { DOMVariables } from './dom-handler/DOMVariables';
import { SliderError } from './SliderError';
import { RuntimeTypeCheck, TypeCheckError } from './type-check/RuntimeTypeCheck';
import { Slider89 } from './Slider89';

// ---- Misc types ----
export namespace PropertyNode {
  export interface KnownSingle {
    slider: HTMLElement | HTMLDivElement;
    track: HTMLDivElement;
    thumb: HTMLDivElement;
  };
  export type KnownMult = {
    [ Name in keyof KnownSingle ]: KnownSingle[Name][]
  };

  export type Single = KnownSingle & Record<string, HTMLElement>;
  export type Mult = KnownMult & Record<string, HTMLElement[]>;
}

export type EventList = {
  [ T in keyof EventMap ]: EventMap[T][]
}
export type PluginCallback = (slider: Slider89) => void;

// ---- Property types ----
export namespace Properties {
  export type CustomPropertyName = `_${string}`;

  export interface Deep {
    range: [ number, number ];
    values: number[];
  }
  export interface Readonly {
    node: PropertyNode.Single;
    nodes: PropertyNode.Mult;
  }
  /**
   * Represents all properties that will be merged in a special way when
   * using {@link Slider89.extend}. Because of this, all of these properties
   * may assume `false` in the config ({@link Config}), and ONLY there,
   * which disables the merging for any values below.
   *
   * @privateRemarks
   * Should a property overlaps with other categories in the future
   * (such as {@link Deep}), this should be converted into a property
   * name list with a generic that adds `false`.
   */
  export interface Mergable {
    classList: Record<string, string[]>;
    events: Partial<EventList>;
    plugins: PluginCallback[];
    extend: Properties.Config[];
    data: object;
  }

  export type Base = Mergable & Deep & Readonly & {
    value: number;
    precision: number | false;
    step: number | number[] | false;
    structure: string | false;
    orientation: 'vertical' | 'horizontal';
  }
  export interface Vals extends WithCustom {
    readonly $: Base;
    readonly $intermediateThis: Deep;
    readonly $intermediateVals: Deep;
  }

  export type Custom = Record<CustomPropertyName, any>;
  export type WithCustom = Base & Custom;
  export type WithFalseyMergable = {
    [ Prop in keyof Base ]: Prop extends keyof Mergable ? (Base[Prop] | false) : Base[Prop];
  }

  /**
   * Non-partial interface of all properties allowed in the configuration.
   * Unlike in the final slider object, properties of {@link Mergable}
   * may also assume `false` here.
   * @see {@link Config}
   */
  export type ConfigFull = WithFalseyMergable | WithCustom;
  export type Config = Partial<ConfigFull>;
  export type Writable = Omit<Base, keyof Readonly>;
}


export type PropertyInfo<Prop> = Prop extends keyof Properties.Readonly
  ? { readOnly: true; }
  : {
      constructorOnly?: boolean;
      isDeepDefinedArray?: boolean;
      descriptor: Descriptor.self;
    }

type PropertyData = DeepReadonlyObject<{
  [ Prop in keyof Properties.Base ]: PropertyInfo<Prop>
}>

// ---- Method types ----
type MethodData = DeepReadonlyObject<{
  [ Key: string ]: {
    args: Array<{
      name: string;
      optional?: boolean;
      descriptor: Descriptor.self
    }>
  }
}>

export type TypedMethods = keyof typeof Base.methodData;


export class Base extends SliderError implements Properties.WithCustom {
  // TypeScript does not allow custom properties in classes
  // because they are busy ignoring all open issues with good suggestions
  // Thus, NOTE: Update this (copy-paste) whenever the properties expand.
  [ key: string ]: any;

  range: Properties.Base['range']
  values: Properties.Base['values']
  value: Properties.Base['value']
  precision: Properties.Base['precision']
  step: Properties.Base['step']
  structure: Properties.Base['structure']
  node: Properties.Base['node']
  nodes: Properties.Base['nodes']
  orientation: Properties.Base['orientation']
  classList: Properties.Base['classList']
  events: Properties.Base['events']
  plugins: Properties.Base['plugins']
  extend: Properties.Base['extend']
  data: Properties.Base['data']

  static BASE_STYLE = new StyleModule({
    '.sl89-track': {
      position: 'relative',
      width: '200px',
      height: '25px',
      backgroundColor: 'hsl(0, 0%, 18%)',
      '.slider89.vertical &': {
        height: '200px',
        width: '25px',
      }
    },
    '.sl89-thumb': {
      position: 'absolute',
      width: '16px',
      height: '100%',
      backgroundColor: 'hsl(0, 0%, 28%)',
      cursor: 'pointer',
      '.slider89.vertical &': {
        height: '16px',
        width: '100%',
      }
    },
    '.sl89-noselect': {
      '-webkit-user-select': 'none',
      userSelect: 'none',
      pointerEvents: 'none',
    }
  });

  /**
   * @privateRemarks
   * When adding a method here, remember that it must call
   * the {@link Base.selfCheckMethod} itself!
   */
  static methodData = ({
    addEvent: {
      args: [
        {
          name: 'event type',
          descriptor: [{
            type: 'string'
          }]
        }, {
          name: 'event function',
          descriptor: [{
            type: 'function'
          }]
        }, {
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
      args: [{
        name: 'event identifier/namespace',
        descriptor: [
          {
            type: 'number',
            conditions: {
              nonnegative: true,
              integer: true
            }
          }, {
            type: 'string',
            conditions: {
              filled: true,
              wordChar: true
            }
          }
        ]
      }]
    }
  }) as const satisfies MethodData;
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
          descriptor: [{
            type: 'number'
          }]
        }
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
        }, {
          type: 'array',
          conditions: {
            nonempty: true
          },
          descriptor: [{
            type: 'number'
          }]
        },
        { type: 'false' }
      ]
    },
    structure: {
      constructorOnly: true,
      descriptor: [
        { type: 'string' },
        { type: 'false' }
      ]
    },
    node: {
      readOnly: true
    },
    nodes: {
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
    },
    plugins: {
      constructorOnly: true,
      descriptor: [
        {
          type: 'array',
          descriptor: [{
            type: 'function'
          }]
        },
        { type: 'false' }
      ]
    },
    extend: {
      constructorOnly: true,
      descriptor: [
        {
          type: 'array',
          descriptor: [{
            type: 'object'
          }]
        },
        { type: 'false' }
      ]
    },
    data: {
      constructorOnly: true,
      descriptor: [
        { type: 'object' },
        { type: 'false' }
      ]
    }
  });

  properties;

  domHandler: DOMVariables;

  // @ts-ignore Only setup
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


  /**
   * Check whether the supplied arguments match with the type of the
   * supplied method name.
   *
   * In this context, "type checking" means the custom runtime type check
   * provided by {@link RuntimeTypeCheck}.
   *
   * This method needs to be called manually with its own `arguments` object.
   * Thus, it is loosely assumed that every type checkable method calls it.
   */
  static selfCheckMethod(methodName: TypedMethods, fullArgs: IArguments) {
    const methodInfo = this.methodData[methodName];
    const args = Array.prototype.slice.call(fullArgs, 0, methodInfo.args.length);

    args.forEach((arg, i) => {
      const argDescriptor = methodInfo.args[i].descriptor;
      try {
        RuntimeTypeCheck.checkType(arg, argDescriptor)
      } catch (e) {
        if (e instanceof TypeCheckError) {
          throw new this.MethodArgTypeError(methodName, i, e.message);
        } else {
          throw e;
        }
      }
    });
    // If the next argument (length - 1 + 1), which is missing, is not optional
    if (methodInfo.args[args.length] && !('optional' in methodInfo.args[args.length])) {
      throw new this.MethodArgOmitError(methodName, args.length);
    }
  }
}
