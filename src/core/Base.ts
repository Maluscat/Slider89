'use strict';
import type { Descriptor, Condition } from '@maluscat/runtime-type-check';
import { RuntimeTypeCheck, Cond, TypeCheckError } from '@maluscat/runtime-type-check';
import { StyleModule } from 'style-mod';
import type { EventMap } from './Events';
import { DOMVariables } from './dom-handler/DOMVariables';
import { Style } from './style/Style';
import { SliderError } from './SliderError';
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
export type ExtendList = ExtendList[] | PluginCallback | Properties.Config | Style;

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
    data: object;
  }

  export type Base = Mergable & Deep & Readonly & {
    value: number;
    precision: number | false;
    step: number | number[] | false;
    structure: string | false;
    orientation: 'vertical' | 'horizontal';
    extend: ExtendList[];
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
      isDeepDefined?: boolean;
      type: Descriptor;
    }

type PropertyData = {
  [ Prop in keyof Properties.Base ]: PropertyInfo<Prop>
}

// ---- Method types ----
type MethodArgs = {
  [ Key: string ]: Array<{
    name: string;
    optional?: boolean;
    spread?: boolean;
    type: Descriptor;
  }>
}

export type TypedMethods = keyof typeof Base.methodArgs;


export const ExtraCond = {
  /** Assert a string that does not solely consist of/cast to a number. */
  nonNumberString: {
    conditions: [ Cond.string ],
    assert: val => Number.isNaN(Number(val)),
    shouldBe: { after: 'that does not cast to a number' },
    is: 'a string that only consists of a number'
  } satisfies Condition,

  /** Assert a number that is not negative (0 or more). */
  nonnegative: {
    conditions: [ Cond.number ],
    assert: val => val >= 0,
    shouldBe: { before: 'non-negative' },
    is: 'a negative number'
  } satisfies Condition,

  /**
   * Generate a condition that asserts a value to be
   * an instance of the given item.
   */
  instanceof: item => ({
    assert: val => val instanceof item,
    shouldBe: { type: item.name ?? item },
    is: 'a different type or instance'
  } satisfies Condition),
} as const;

export class Base extends SliderError implements Properties.WithCustom {
  static StyleModule = StyleModule;
  static Style = Style;
  static DOMHandler = DOMVariables;
  static RuntimeTypeCheck = RuntimeTypeCheck;
  static ExtraCond = ExtraCond;

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
  extend: Properties.Base['extend']
  data: Properties.Base['data']

  static BASE_STYLE = new StyleModule({
    '.sl89-track': {
      position: 'relative',
      width: '200px',
      height: '25px',
      backgroundColor: 'hsl(0, 0%, 18%)',
      boxSizing: 'content-box',
      '.slider89.sl89-vertical &': {
        height: '200px',
        width: '25px',
      }
    },
    '.sl89-thumb': {
      position: 'absolute',
      width: '16px',
      height: '100%',
      backgroundColor: 'hsl(0, 0%, 28%)',
      boxSizing: 'border-box',
      cursor: 'pointer',
      zIndex: 1,
      '.slider89.sl89-vertical &': {
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
  static methodArgs = ({
    addEvent: [
      {
        name: 'event type',
        type: [ Cond.string ]
      }, {
        name: 'event function',
        type: [ Cond.function ]
      }, {
        name: 'event namespace',
        optional: true,
        type: [
          [ Cond.string, Cond.nonempty, ExtraCond.nonNumberString ]
        ]
      }
    ],
    removeEvent: [
      {
        name: 'event identifier/namespace',
        type: [
          [ Cond.integer, ExtraCond.nonnegative ],
          [ Cond.string, Cond.nonempty, ExtraCond.nonNumberString ]
        ]
      }
    ],
    addThumb: [
      {
        name: 'value',
        type: [ Cond.number ]
      }, {
        name: 'targetIndex',
        type: [ Cond.number ],
        optional: true
      }
    ],
    addMultipleThumbs: [{
      name: '...values',
      type: [ Cond.number ],
      spread: true,
    }],
    removeThumb: [{
      name: 'index or element',
      type: [ Cond.number, ExtraCond.instanceof(Element) ],
      optional: true,
    }],
  }) as const satisfies MethodArgs;
  static propertyData = ({
    range: {
      isDeepDefined: true,
      type: [
        [ Cond.array(Cond.number), Cond.length(2) ]
      ]
    },
    values: {
      isDeepDefined: true,
      type: [ Cond.array(Cond.number) ]
    },
    value: {
      type: [ Cond.number ]
    },
    precision: {
      type: [
        [ Cond.integer, ExtraCond.nonnegative ],
        [ Cond.false ]
      ]
    },
    step: {
      type: [
        [ Cond.number, Cond.positive ],
        [ Cond.array(Cond.number), Cond.nonempty ],
        [ Cond.false ]
      ]
    },
    structure: {
      constructorOnly: true,
      type: [
        Cond.string,
        Cond.false
      ]
    },
    node: {
      readOnly: true
    },
    nodes: {
      readOnly: true
    },
    orientation: {
      type: [ Cond.keywords('horizontal', 'vertical') ]
    },
    classList: {
      constructorOnly: true,
      type: [
        Cond.object('NodeName', Cond.array(Cond.string)),
        Cond.false
      ]
    },
    events: {
      constructorOnly: true,
      type: [
        Cond.object('EventType', Cond.array(Cond.function)),
        Cond.false
      ]
    },
    extend: {
      constructorOnly: true,
      type: [
        Cond.array(Cond.function, ExtraCond.instanceof(Style), Cond.object, Cond.array)
      ]
    },
    data: {
      constructorOnly: true,
      type: [
        Cond.object,
        Cond.false
      ]
    }
  }) as const satisfies PropertyData;

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
    const argData = this.methodArgs[methodName];
    // @ts-ignore Shut up
    const hasSpread = argData[argData.length - 1].spread;
    const args = Array.prototype.slice.call(fullArgs, 0, hasSpread ? fullArgs.length : argData.length);

    var n = 0;
    for (var i = 0; i < args.length; i++) {
      try {
        RuntimeTypeCheck.assertAndThrow(args[i], ...argData[n].type);
      } catch (e) {
        if (e instanceof TypeCheckError) {
          throw new Slider89.MethodArgTypeError(methodName, n, e.message);
        } else throw e;
      }
      // @ts-ignore Shut up
      if (!argData[n].spread) n++;
    }

    // If the next argument (length - 1 + 1), which is missing, is not optional
    // @ts-ignore Shut up
    if (argData[args.length] && !argData[args.length].optional) {
      throw new Slider89.MethodArgOmitError(methodName, args.length);
    }
  }
}
