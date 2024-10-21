'use strict';
import type { Properties as Props } from './Base';
import type { EventType } from './Events';
import { PropertiesOutline as Outline } from './Slider89';
import { Events } from './Events';


export namespace Operation {
  type Type<I extends keyof Props.Base> = Props.Base[I];

  export type Setter<I extends keyof Props.Base> =
    (val: Type<I>) => void | boolean;
  export type PostSetter<I extends keyof Props.Base> =
    (val: Type<I>, prevVal: Type<I>) => void | boolean;

  export type Getter<I extends keyof Props.Base> =
    (val: Type<I>) => Type<I>;

  export type KeySetter<I extends keyof Props.Base> = I extends keyof Props.Deep
    ? (val: Type<I>[number], key: number, prevValTop?: Type<I>) => void | boolean
    : never;
  export type KeyGetter<I extends keyof Props.Base> = I extends keyof Props.Deep
    ? (val: Type<I>[number], key: number) => Type<I>[number]
    : never;
}


export class Definition extends Events {
  /**
   * When set to true, the internal key definition
   * (`this.vals[item][key]` -> `this.vals.$intermediateVals[item][key]`)
   * bypasses any additional actions done beside setting the endpoint.
   *
   * This is utilized when calling the key setters in the
   * [definition setup]({@link #defineDeepArray)} to mitigate potential
   * recursion and side effects of them influencing each other.
   */
  #isDefining = false;

  // ---- Object definition ----
  defineInternalProperty<I extends keyof Props.Base>(
    target: Props.WithCustom,
    endpoint: Props.Base,
    item: I,
    outline: Outline[I]);
  defineInternalProperty<I extends keyof Props.WithCustom>(
    target: Props.WithCustom,
    endpoint: Props.WithCustom,
    item: I);
  defineInternalProperty<I extends keyof Props.Base | keyof Props.WithCustom>(
    target: Props.WithCustom,
    endpoint: I extends keyof Props.WithCustom ? Props.WithCustom : Props.Base,
    item: I,
    outline?: Outline[I extends keyof Outline ? I : never]
  ) {
    // @ts-ignore Shut up
    const isDeepDefinedArray: boolean = Definition.propertyData[item]?.isDeepDefinedArray;

    Object.defineProperty(target, item, {
      set: (val: typeof target[I]) => {
        if (!this.initial) {
          // @ts-ignore ???
          var prevVal: typeof val = (isDeepDefinedArray ? Array.from(this[item as keyof Props.Deep]) : this[item]);
        }
        endpoint[item] = val;
        if (isDeepDefinedArray) {
          this.#defineDeepArray(item as keyof Props.Deep, val, prevVal, outline as Outline[keyof Props.Deep]);
          this.invokeInternalDeepPropertyChange(item as keyof Props.Deep, prevVal);
        } else {
          this.invokeInternalPropertyChange(item as keyof Omit<Props.WithCustom, keyof Props.Deep>, prevVal);
        }
        // @ts-ignore
        outline?.postSetter?.(val, prevVal);
      },
      get: () => {
        // @ts-ignore Shut up
        return (isDeepDefinedArray ? this.vals.$intermediateVals : endpoint)[item];
      },
      enumerable: true
    });
  }

  // ---- Defining the keys of deeply defined arrays ----
  #defineDeepArray<I extends keyof Props.Deep>(
    item: I,
    val: Props.Deep[I],
    prevValTop: Props.Deep[I],
    outline: Outline[I]
  ) {
    const descriptorVals = this.#descriptorIntermediateVals.bind(this, item, outline.internalKeySetter);
    const descriptorThis = this.#descriptorIntermediateThis.bind(this, item, outline.keySetter, outline.keyGetter);

    this.#defineDeepArrayIntermediate(this.vals.$intermediateVals, item, val, descriptorVals);
    this.#defineDeepArrayIntermediate(this.vals.$intermediateThis, item, val, descriptorThis);

    // Invoke all key setters manually. Also see `this.#isDefining`
    this.#isDefining = true;
    for (let i = 0; i < val.length; i++) {
      // @ts-ignore ???
      outline.keySetter?.(val[i], i, prevValTop);
      // @ts-ignore ???
      outline.internalKeySetter?.(val[i], i, prevValTop);
    }
    this.#isDefining = false;
  }

  #descriptorIntermediateThis<I extends keyof Props.Deep>(
    item: I, keySetter: Outline[I]['keySetter'], keyGetter: Outline[I]['keyGetter'], key: number
  ) {
    const endpoint = this.vals;
    return {
      set: (val: Props.Deep[I][typeof key]) => {
        if (!keySetter || !keySetter(val, key)) {
          endpoint[item][key] = val;
        }
      },
      get() {
        return keyGetter ? keyGetter(endpoint[item][key], key) : endpoint[item][key];
      }
    } as PropertyDescriptor;
  }
  #descriptorIntermediateVals<I extends keyof Props.Deep>(
    item: I, internalKeySetter: Outline[I]['internalKeySetter'], key: number
  ) {
    const endpoint = this.vals.$;
    return {
      set: (val: Props.Deep[I][typeof key]) => {
        if (this.#isDefining) {
          endpoint[item][key] = val;
        } else {
          if (!this.initial) {
            var prevValFull = Array.from(this[item]) as Props.Deep[I];
          }
          if (!internalKeySetter || !internalKeySetter(val, key)) {
            endpoint[item][key] = val;
          }
          this.invokeInternalDeepPropertyChange(item, prevValFull, key);
        }
      },
      get() {
        return endpoint[item][key];
      }
    } as PropertyDescriptor;
  }

  #defineDeepArrayIntermediate<I extends keyof Props.Deep>(
    definitionPoint: Props.Deep,
    parentItem: I,
    parentValue: Props.Deep[I],
    descriptorFactory: (key: number) => PropertyDescriptor
  ) {
    // @ts-ignore (Only Setup)
    definitionPoint[parentItem] = [];
    for (let i = 0; i < parentValue.length; i++) {
      const value = parentValue[i];

      const descriptor = descriptorFactory(i);
      Object.defineProperty(definitionPoint[parentItem], i, Object.assign(descriptor, {
        enumerable: true
      }));
    }
  }


  // ---- Property change tracking ----
  // `this` items are compared to accomodate for getters (e.g. `value` (precision))
  invokeInternalPropertyChange<I extends keyof Omit<Props.WithCustom, keyof Props.Deep>>(
    item: I, prevVal?: Props.WithCustom[I]
  ) {
    // Object types (arrays included) always invoke a variable update
    // due to inability to deeply compare them (efficiently)
    if (!this.initial && (typeof this[item] === 'object' || prevVal !== this[item])) {
      prevVal ??= this[item];
      this.domHandler.updatePotentialVariable(item);
      // @ts-ignore ???
      this.invokeEvent(`change:${item}`, { value: this[item], prevVal });
    }
  }
  invokeInternalDeepPropertyChange<I extends keyof Props.Deep>(
    item: I,
    prevVal: Props.Deep[I],
    deepKey?: number | string
  ) {
    const value = this[item];
    if (!this.initial && (deepKey == null || prevVal[deepKey] !== value[deepKey])) {
      const changedKeys = (deepKey != null) ? [deepKey] : Array.isArray(value)
        ? value.map((_, i) => i)
        : Object.keys(value);

      this.domHandler.updatePotentialVariable(item);
      // @ts-ignore ???
      this.invokeEvent(`change:${item}`, {
        value,
        prevVal,
        keys: changedKeys
      });
    }
  }
}
