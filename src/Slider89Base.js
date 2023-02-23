'use strict';
import Slider89Error from './Slider89Error.js';
import LibraryTypeCheck from './LibraryTypeCheck.js';

export default class Slider89Base extends Slider89Error {
  static TypeCheck = LibraryTypeCheck;

  static methodData = {
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
  }
  static propertyData = {
    range: {
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
      ],
    },
    values: {
      descriptor: [{
        type: 'array',
        // TODO condition: at least of size 1
        descriptor: [{
          type: 'number'
        }]
      }],
    },
    value: {
      descriptor: [{
        type: 'number'
      }],
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
      ],
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
      ],
    },
    structure: {
      descriptor: [
        {
          type: 'string',
          conditions: {
            filled: true
          }
        },
        { type: 'false' }
      ],
    },
    node: {
      default: {},
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
      }],
    },
    classList: {
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
      ],
    },
    events: {
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
      ],
    }
  };

  methods;
  properties;

  TypeCheck;

  vals = {}; // holding every class property
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
