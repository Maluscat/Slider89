'use strict';
// ---- Utility types ----
// From https://stackoverflow.com/a/60839718
export type DeepReadonlyObject<T> = T extends object ? {
  readonly [P in keyof T]: DeepReadonlyObject<T[P]>;
} : T;


// ---- Type: Descriptor ----
export namespace Descriptor {
  interface TypeConditions {
    boolean: never;
    true: never;
    false: never;
    object: never;
    function: never;
    array: 'length' | 'nonempty';
    number: 'nonnegative' | 'positive' | 'integer';
    string: 'filled' | 'wordChar' | 'keywords';
  }
  interface ConditionsFull {
    nonnegative: boolean;
    positive: boolean;
    integer: boolean;
    nonempty: boolean;
    length: number;
    keywords: string[];
    filled: boolean;
    wordChar: boolean
  }
  export type Conditions = Partial<ConditionsFull>;

  export type self = DeepReadonlyObject<Array<Type>>;


  // --- Type (namespace doesn't work) ---
  type Type = ObjectType | ArrayType | DefaultType;

  type ArrayType = TypeCreate<'array'> & {
    descriptor: self;
  }
  type ObjectType = TypeCreate<'object'> & {
    descriptor: self;
    keyName?: string;
  }
  type DefaultType = TypeCreate<keyof Omit<TypeConditions, 'array' | 'object'>>;

  type TypeCreate<Type extends keyof TypeConditions> = {
    type: Type;
    shape?: string;
    conditions?: Partial<{
      [ Cond in TypeConditions[Type] ]: Conditions[Cond]
    }>;
  }
}


export default class LibraryTypeCheck {
  static getType(value) {
    if (Array.isArray(value))
      return 'Array';
    else if (Number.isNaN(value))
      return 'NaN';
    else if (value === null)
      return 'null';
    else
      return typeof value;
  }

  static checkTypes(val: any, descriptor: Descriptor.self): string | false {
    let msg: string | false;

    for (const data of descriptor) {
      const type = data.type;
      if (
        type === 'boolean' && typeof val === 'boolean' ||
        type === 'true' && val === true ||
        type === 'false' && val === false ||
        type === 'array' && Array.isArray(val) ||
        type === 'object' && Object.prototype.toString.call(val) === '[object Object]' ||
        type === 'number' && typeof val === 'number' && !Number.isNaN(val) ||
        type === 'function' && typeof val === 'function' ||
        type === 'string' && typeof val === 'string'
      ) {
        if (type === 'array') {
          for (const value of val) {
            if (msg = LibraryTypeCheck.checkTypes(value, data.descriptor)) break;
          }
        } else if (type === 'object') {
          for (const value of Object.values(val)) {
            if (msg = LibraryTypeCheck.checkTypes(value, data.descriptor)) break;
          }
        }

        if (msg) {
          return LibraryTypeCheck.toTitleCase(type) + '<' + msg + '>';
        }
        if (msg = LibraryTypeCheck.buildConditionTypeMessage(data.conditions, val)) break;
        else return false;
      }
    }

    return msg || LibraryTypeCheck.getType(val);
  }

  static buildConditionTypeMessage(conditions: DeepReadonlyObject<Descriptor.Conditions>, val: any) {
    if (!conditions) return;

    if (conditions.nonnegative && val < 0) {
      return 'a negative number';
    }
    if (conditions.positive && val <= 0) {
      return 'a negative number or 0';
    }
    if (conditions.integer && val % 1 !== 0) {
      return 'a floating point number';
    }
    if (conditions.filled && val.trim() === '') {
      return 'an empty string';
    }
    if (conditions.keywords && conditions.keywords.indexOf(val) === -1) {
      return 'a different string';
    }
    if (conditions.wordChar && !Number.isNaN(Number(val))) {
      return 'a number string';
    }
    if (conditions.length && val.length !== conditions.length) {
      return 'an array of length ' + val.length;
    }
    if (conditions.nonempty && val.length === 0) {
      return 'an empty array';
    }
  }

  // Compute an automated error message regarding the property's types and conditions
  static buildDescriptorTypeMessage(descriptor: Descriptor.self) {
    let msg = '';
    for (const data of descriptor) {
      const type = data.type;

      if (msg) msg += ' OR ';

      if (type === 'number') {
        const nonnegative = data.conditions?.nonnegative;
        const positive = data.conditions?.positive;
        const isInt = data.conditions?.integer;

        if (nonnegative) {
          msg += 'non-negative ';
        } else if (positive) {
          msg += 'positive '
        }
        msg += (isInt ? 'integer' : 'number');
      }

      else if (type === 'array') {
        const innerType = LibraryTypeCheck.buildDescriptorTypeMessage(data.descriptor);
        if (data.conditions?.nonempty) {
          msg += 'non-empty ';
        }
        msg += 'Array<' + innerType + '>';
        if (data.conditions?.length) {
          msg += ' of length ' + data.conditions.length;
        }
      }

      else if (type === 'object') {
        const innerType = LibraryTypeCheck.buildDescriptorTypeMessage(data.descriptor);
        msg += 'Object<' + data.keyName + ', ' + innerType + '>';
      }

      else if (type === 'string') {
        if (data.conditions?.keywords) {
          if (data.conditions.keywords.length > 1) {
            msg += 'one of the keywords';
          } else {
            msg += 'the keyword';
          }
          data.conditions.keywords.forEach(function(val, n, arr) {
            if (n !== 0 && n === arr.length - 1) {
              msg += ' or';
            } else if (n !== 0) {
              msg += ',';
            }
            msg += ' "' + val + '"';
          });
        } else {
          if (data.conditions?.filled) msg += 'non-empty ';
          if (data.conditions?.wordChar) msg += 'non-number ';
          msg += 'string';
        }
      }

      else {
        msg += type;
      }

      if (data.shape) {
        msg += ' (' + data.shape + ')';
      }
    }

    return msg;
  }

  // ---- Helper functions ----
  static toTitleCase(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
}
