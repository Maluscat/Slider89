'use strict';
import type { Properties as Props } from './Slider89Base';
import type { EventType } from './Slider89Events';
import { PropertiesOutline as Outline } from './Slider89';
import Slider89Events from './Slider89Events';


export namespace DeepKey {
  export type Type<P extends keyof Props.Deep> = Props.Deep[P][number];

  export type Setter<P extends keyof Props.Deep> =
    (val: Type<P>, index: number) => void | boolean;

  export type Getter<P extends keyof Props.Deep> =
    (val: Type<P>, index: number) => typeof val;
}

export default class Slider89Properties extends Slider89Events {
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
    const isDeepDefinedArray: boolean = Slider89Properties.propertyData[item]?.isDeepDefinedArray;

    Object.defineProperty(target, item, {
      set: (val: typeof target[I]) => {
        if (!this.initial) {
          var prevVal: typeof val = (isDeepDefinedArray ? Array.from(this[item as keyof Props.Deep]) : this[item]);
        }
        endpoint[item] = val;
        if (isDeepDefinedArray) {
          this.#defineDeepArray(item as keyof Props.Deep, val, prevVal, outline as Outline[keyof Props.Deep]);
          this.invokeInternalDeepArrayChange(item as keyof Props.Deep, prevVal, val);
        } else {
          this.invokeInternalPropertyChange(item, prevVal);
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
          this.invokeInternalDeepArrayChange(item, prevValFull, null, key);
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
  invokeInternalPropertyChange<I extends keyof Props.WithCustom>(
    item: I, prevVal?: Props.WithCustom[I]
  ) {
    // Object types (arrays included) always invoke a variable update
    // due to inability to deeply compare them (efficiently)
    if (!this.initial && (typeof this[item] === 'object' || prevVal !== this[item])) {
      prevVal ??= this[item];
      this.domHandler.updatePotentialVariable(item);
      this.invokeEvent(('change:' + item) as EventType.Base, this[item], prevVal);
    }
  }
  invokeInternalDeepArrayChange<I extends keyof Props.Deep>(
    item: I,
    prevVal: Props.Deep[I],
    val: Props.Deep[I],
    deepDefinedIndex?: number
  ) {
    if (!this.initial) {
      this.domHandler.updatePotentialVariable(item);
      if (deepDefinedIndex != null) {
        this.invokeDeepArrayChangeEvent(item, prevVal, deepDefinedIndex);
      } else {
        for (let i = 0; i < val.length; i++) {
          this.invokeDeepArrayChangeEvent(item, prevVal, i);
        }
      }
    }
  }

  invokeDeepArrayChangeEvent<I extends keyof Props.Deep>(
    item: I,
    prevVal: Props.Deep[I],
    deepDefinedIndex: number
  ) {
    if (prevVal[deepDefinedIndex] !== this[item][deepDefinedIndex]) {
      this.invokeEvent(('change:' + item) as EventType.Base, this[item], prevVal, deepDefinedIndex);
    }
  }
}
