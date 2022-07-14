'use strict';
export default (function() {
  // Style rule strings which will be inserted into a newly created stylesheet
  const styles = require('./default-styles.css');
  const eventTypes = [
    'start',
    'move',
    'end',
    'change:$property'
  ];
  const structureRgx = {};
  (function() {
    const reg = {
      attr: {
        name: '[\\w-]+'
      },
      all: '[\\d\\D]',
      capName: '([\\w-]+)',
    };
    reg.attr.value = '(?:(?!<)' + reg.all + ')*?';
    reg.tagType = '(?:\\s+' + reg.capName + ')?';
    reg.content = '(?:\\s+"(' + reg.all + '+?)")?';
    reg.attribs = '(?:\\s+' + reg.attr.name + '=\\[' + reg.attr.value + '\\])*';
    reg.varContent = '\\$((?:\\w+(?:\\.(?=\\w))?)+)';
    const rgx = {
      variable: '\\{' + reg.varContent + '\\}|' + reg.varContent,
      attributes: '(' + reg.attr.name + ')=\\[(' + reg.attr.value + ')\\](?:\\s+|$)',
      tag: '<([/:])?' + reg.capName + reg.tagType + reg.content + '(' + reg.attribs + ')\\s*?>\\s*'
    };

    // ES5 can't `new RegExp` from another RegExp
    for (let expr in rgx) {
      structureRgx[expr] = new RegExp(rgx[expr], 'g');
    }
    structureRgx.variableNoFlag = new RegExp(rgx.variable);
  }());

  function Slider89(target, config, replace) {
    if (!target) {
      error('no first argument has been supplied. It needs to be the DOM target node for the slider', 'constructor', true);
    } else if (!target.nodeType || target.nodeType !== 1) {
      error('the first argument must be a valid DOM node the slider will be placed into ' + typeMsg(target), 'constructor', true);
    }

    if (config == null || config === false) {
      config = {};
    } else if (typeof config !== 'object' || Array.isArray(config)) {
      error('the optional second argument needs to be an object for configuration ' + typeMsg(config), 'constructor', true);
    }

    const that = this;

    let initial = false;
    let activeThumb;
    let activeTouchID;
    let mouseDownPos;
    let eventID = 0;
    let trackStyle; // The live computed style of vals.node.track
    let thumbBase; // Clonable thumb node
    let thumbParent;
    const configHasValues = 'values' in config;
    const structureVars = {};
    const eventList = {}; // Storing event data (most notably the identifier) for event removability
    const vals = {}; // holding every class property

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
     */
    // Object.defineProperties is used for non-enumerability & non-writability of these special properties
    Object.defineProperties(vals, {
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

    const methods = {
      addEvent: {
        function: addEvent,
        args: [
          {
            name: 'event type',
            structure: [{
              type: 'string'
            }]
          },
          {
            name: 'event function',
            structure: [{
              type: 'function'
            }]
          },
          {
            name: 'event namespace',
            optional: true,
            structure: [{
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
        function: removeEvent,
        args: [
          {
            name: 'event identifier/namespace',
            structure: [
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
    };

    const properties = {
      range: {
        default: [0, 100],
        structure: [
          {
            type: 'array',
            conditions: {
              length: 2
            },
            structure: [
              { type: 'number' }
            ]
          },
          { type: 'boolean' }
        ],
        shape: '[startValue, endValue]',
        setter: function(val) {
          if (val[0] === val[1]) {
            propError('range', 'the given range of [' + val.join(', ') + '] defines the same value for both range start and end');
          }
          if (!initial) {
            computeAllRatioDistances({range: val});
          }
        }
      },
      values: {
        isDeepDefinedArray: true,
        default: function() {
          return [vals.range[0]];
        },
        structure: [{
          type: 'array',
          // TODO condition: at least of size 1
          structure: [{
            type: 'number'
          }]
        }],
        setter: function(val) {
          if (!initial) {
            // Add/remove thumbs if the given array is bigger/smaller than the current values
            if (val.length > vals.values.length) {
              for (let i = vals.values.length; i < val.length; i++) {
                vals.node.thumb.push(createNewThumb());
                computeOneRatioDistance(i);
              }
            } else if (val.length < vals.values.length) {
              for (let i = val.length; i < vals.values.length; i++) {
                thumbParent.removeChild(vals.node.thumb.pop());
              }
            }
          }
        },
        keySetter: function(val, key) {
          val = adaptValueToRange(val);
          if (!initial) {
            computeOneRatioDistance(key, {value: val});
          } else {
            vals.values[key] = val;
          }
          return true;
        },
        keyGetter: function(val, key) {
          return vals.precision !== false ? Number(val.toFixed(vals.precision)) : val;
        }
      },
      value: {
        structure: [{
          type: 'number'
        }],
        setter: function(val) {
          if (initial && configHasValues) {
            propError('value', 'only one of ‘value’ and ‘values’ may be set in the constructor');
          }
        },
        getter: function(val) {
          return that.values[0];
        }
      },
      precision: {
        default: false,
        structure: [
          {
            type: 'number',
            conditions: {
              nonnegative: true,
              integer: true
            }
          },
          { type: 'false' }
        ],
        setter: function(val) {
          if (!initial) {
            computeAllRatioDistances({precision: val});
          }
        }
      },
      step: {
        default: false,
        structure: [
          {
            type: 'number',
            conditions: {
              positive: true
            }
          },
          { type: 'false' }
        ],
        setter: function(val) {
          if (vals.precision !== false && val !== false && Number(val.toFixed(vals.precision)) !== val) {
            propError('step', 'the given value of ' + val + ' exceeds the currently set precision of ' + vals.precision);
          }
          if (!initial) {
            computeAllRatioDistances({step: val})
          }
        }
      },
      structure: {
        default: false,
        structure: [
          {
            type: 'string',
            conditions: {
              filled: true
            }
          },
          { type: 'false' }
        ],
        initial: true
      },
      node: {
        default: {},
        static: true
      },
      orientation: {
        default: 'horizontal',
        structure: [{
          type: 'string',
          conditions: {
            keywords: [
              'horizontal',
              'vertical'
            ]
          }
        }],
        setter: function(val) {
          if (!initial) {
            if (val === 'vertical') {
              vals.node.thumb.style.removeProperty('left');
              vals.node.slider.classList.add('vertical');
            } else {
              vals.node.thumb.style.removeProperty('top');
              vals.node.slider.classList.remove('vertical');
            }
            vals.orientation = val;
            computeAllRatioDistances();
            return true;
          }
        }
      },
      classList: {
        default: false,
        structure: [
          {
            type: 'object',
            structure: [{
              type: 'array',
              structure: [
                { type: 'string' }
              ]
            }]
          },
          { type: 'false' }
        ],
        initial: true,
        shape: '{nodeName: [...classes]}'
      },
      events: {
        default: {},
        structure: [
          {
            type: 'object',
            structure: [{
              type: 'array',
              structure: [{
                type: 'function'
              }]
            }]
          },
          { type: 'false' }
        ],
        initial: true,
        setter: function(val) {
          const errTypes = new Array();
          for (let eventType in val) {
            if (!checkEventType(eventType)) errTypes.push(eventType);
          }
          if (errTypes.length > 0) {
            const msg =
              'the given object contains items which are no valid event types:' + enlistArray(errTypes) +
              'Available event types are:' + enlistArray(eventTypes);
            propError('events', msg);
          }
        }
      }
    };

    initial = true;
    // Initialize properties and methods
    (function() {
      for (let _ in properties) {
        // IE-support: item needs to be a scoped variable because defineProperty is async
        const item = _;
        const prop = properties[item];

        Object.defineProperty(that, item, {
          set: function(val) {
            if (prop.static) {
              error('property ‘' + item + '’ may only be read from but it was just set with the value ‘' + val + '’');
            }
            if (prop.initial && !initial) {
              error('property ‘' + item + '’ may only be set at init time but it was just set with the value ‘' + val + '’');
            }
            checkProp(item, val);
            if (!prop.setter || !prop.setter(val)) {
              vals[item] = val;
            }
          },
          get: function() {
            const getterEndpoint = (prop.isDeepDefinedArray ? vals.$intermediateThis : vals);
            return (prop.getter ? prop.getter(getterEndpoint[item]) : getterEndpoint[item]);
          },
          enumerable: true
        });

        defineDeepProperty(vals, item, vals.$, prop.isDeepDefinedArray);

        if (item in config) {
          that[item] = config[item];
          delete config[item];
        } else if ('default' in prop) {
          const def = prop.default;
          ((prop.getter || prop.keyGetter) ? that : vals)[item] = (typeof def === 'function' ? def() : def);
        }
      }

      for (let _ in config) {
        const item = _;

        if (item[0] === '_') {
          defineDeepProperty(that, item, vals);
          vals[item] = config[item];
        } else {
          error('‘' + item + '’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_' + item + '’)');
        }
      }

      for (let _ in methods) {
        const item = _;
        const method = methods[item];
        that[item] = function() {
          const args = Array.prototype.slice.call(arguments, 0, method.args.length);
          checkMethod(item, args);
          return method.function.apply(this, args);
        }
      }
    })();

    // Build the slider element
    (function() {
      if (vals.structure === false) {
        // In case no custom structure is defined, manually build the node to ensure best performance (parseStructure takes a while)
        vals.node.slider = document.createElement('div');
        vals.node.track = document.createElement('div');

        thumbBase = document.createElement('div');
        thumbParent = vals.node.track;

        vals.node.thumb = new Array(vals.values.length);
        for (let i = 0; i < vals.values.length; i++) {
          vals.node.thumb[i] = createNewThumb();
        }
        vals.node.slider.appendChild(vals.node.track);

        for (let element in vals.node) {
          // Thumb classes are applied in `createNewThumb`
          if (element !== 'slider' && element !== 'thumb') {
            vals.node[element].classList.add('sl89-' + element);
          }
        }
      } else {
        vals.node = parseStructure(vals.structure);
      }

      if (replace) {
        const targetAttr = target.attributes;
        for (let i = 0; i < targetAttr.length; i++) {
          vals.node.slider.setAttribute(targetAttr[i].name, targetAttr[i].value);
        }
      }
      vals.node.slider.classList.add('slider89');
      if (vals.orientation === 'vertical') vals.node.slider.classList.add('vertical');

      if (vals.classList) {
        // Add the specified classes and collecting all nonexistent nodes in `errNodes`
        const errNodes = new Array();
        for (let nodeName in vals.classList) {
          const classArr = vals.classList[nodeName];
          if (!Object.prototype.hasOwnProperty.call(vals.node, nodeName)) {
            errNodes.push(nodeName);
          } else if (errNodes.length === 0) {
            for (let i = 0; i < classArr.length; i++) {
              if (nodeName === 'thumb') {
                for (let j = 0; j < vals.node[nodeName].length; j++) {
                  vals.node[nodeName][j].classList.add(classArr[i]);
                }
              } else {
                vals.node[nodeName].classList.add(classArr[i]);
              }
            }
          }
        }
        if (errNodes.length > 0) {
          const msg =
            "the given object contains items which aren't nodes of this slider:" + enlistArray(errNodes) +
            "Following nodes are part of this slider's node pool:" + enlistArray(Object.keys(vals.node))
          propError('classList', msg);
        }
      }

      createStyleSheet();

      if (replace)
        target.parentNode.replaceChild(vals.node.slider, target);
      else
        target.appendChild(vals.node.slider);

      trackStyle = getComputedStyle(vals.node.track);

      computeAllRatioDistances();

      // Expanding structure variables initially
      // This happens so late to ensure that $node can be accessed properly
      if (vals.structure !== false) {
        for (let variable in structureVars) {
          updatePotentialVariable(variable);
        }
      }

      window.addEventListener('keydown', keyDown);
    })();

    initial = false;


    // ------ Class methods ------
    function addEvent(type, fn, name) {
      if (!checkEventType(type)) {
        error('the specified type ‘' + type + '’ is not a valid event type. Available types are:' + enlistArray(eventTypes), 'addEvent');
      }

      if (!Array.isArray(vals.events[type])) vals.events[type] = new Array();
      vals.events[type].push(fn);
      const key = name || eventID;
      const obj = {
        type: type,
        fn: fn
      };
      if (name) {
        if (!Array.isArray(eventList[key])) eventList[key] = new Array();
        eventList[key].push(obj);
      } else {
        eventList[key] = obj;
      }
      return name || eventID++;
    }
    function removeEvent(key) {
      const listEntry = eventList[key];
      if (!listEntry) return false;
      delete eventList[key];
      return Array.isArray(listEntry) ?
        listEntry.reduce(handleEvents, new Array()) :
        handleEvents(new Array(), listEntry);

      function handleEvents(acc, entry) {
        const typeEvents = vals.events[entry.type];
        const deleted = typeEvents.splice(typeEvents.indexOf(entry.fn), 1)[0];
        if (typeEvents.length === 0) delete vals.events[entry.type];
        acc.push(deleted);
        return acc;
      }
    }


    // ------ Helper functions ------
    function error(msg, target, abort) {
      msg = 'Slider89' + (target ? ' @ ' + target : '') + ': ' + msg;
      if (msg[msg.length - 1] !== '\n' && msg[msg.length - 1] !== '.') msg += '.\n';
      if (initial || abort) msg += 'Aborting the slider construction.';
      throw new Error(msg);
    }

    function checkEventType(type) {
      if (type.indexOf('change:') === 0) {
        // Edge case for 'change:$property'
        const customProp = type.slice('change:'.length);
        if (!Object.prototype.hasOwnProperty.call(vals, customProp)) {
          error("‘" + type + "’ refers to ‘" + customProp + "’, which isn't a recognized property. Check its spelling and be aware that custom properties need to be initialized", 'addEvent');
        }
      } else if (eventTypes.indexOf(type) === -1) return false;
      return true;
    }
    function adaptValueToRange(value) {
      if (vals.range[0] < vals.range[1]) {
        if (value < vals.range[0]) {
          return vals.range[0];
        } else if (value > vals.range[1]) {
          return vals.range[1];
        }
      } else {
        if (value > vals.range[0]) {
          return vals.range[0];
        } else if (value < vals.range[1]) {
          return vals.range[1];
        }
      }
      return value;
    }

    function createNewThumb() {
      const newThumb = thumbBase.cloneNode(true);
      newThumb.classList.add('sl89-thumb');
      if (newThumb.tabindex == null) {
        newThumb.tabIndex = 0;
      }
      newThumb.addEventListener('touchstart', touchStart);
      newThumb.addEventListener('mousedown', slideStart);
      thumbParent.appendChild(newThumb);
      return newThumb;
    }

    // ------ Object definition ------
    function defineDeepProperty(target, item, endpoint, isDeepDefinedArray) {
      Object.defineProperty(target, item, {
        set: function(val) {
          if (!initial) {
            var prevVal = (isDeepDefinedArray ? polyArrayFrom(that[item]) : that[item]);
          }
          endpoint[item] = val;
          if (isDeepDefinedArray) {
            // The endpoints (see doc comment at the start of file) are defined from bottom to top
            // This ensures compatibility with getters/setters
            defineDeepArrayIntermediateVals(item, val);
            defineDeepArrayIntermediateThis(item, val, properties[item].keySetter, properties[item].keyGetter);
            handleInternalDeepArrayChange(item, prevVal, val);
          } else {
            handleInternalPropertyChange(item, prevVal);
          }
        },
        get: function() {
          return (isDeepDefinedArray ? vals.$intermediateVals : endpoint)[item];
        },
        enumerable: true
      });
    }

    // ------ Object definitions for the keys/indexes of deeply defined arrays ------
    function defineDeepArrayIntermediateThis(parentItem, parentValue, keySetter, keyGetter) {
      const endpoint = vals;

      vals.$intermediateThis[parentItem] = [];
      for (let i = 0; i < parentValue.length; i++) {
        const value = parentValue[i];

        Object.defineProperty(vals.$intermediateThis[parentItem], i, {
          set: function(val) {
            if (!keySetter || !keySetter(val, i)) {
              endpoint[parentItem][i] = parentValue;
            }
          },
          get: function() {
            return (keyGetter ? keyGetter(endpoint[parentItem][i], i) : endpoint[parentItem][i]);
          },
          enumerable: true
        });
        // This assignment is necessary to invoke a potential keySetter (e.g. from `values`)
        vals.$intermediateThis[parentItem][i] = parentValue[i];
      }
    }
    function defineDeepArrayIntermediateVals(parentItem, parentValue) {
      const endpoint = vals.$;

      vals.$intermediateVals[parentItem] = [];
      for (let i = 0; i < parentValue.length; i++) {
        const value = parentValue[i];

        Object.defineProperty(vals.$intermediateVals[parentItem], i, {
          set: function(val) {
            if (!initial) {
              var prevVal = polyArrayFrom(that[parentItem]);
            }
            endpoint[parentItem][i] = val;
            handleInternalDeepArrayChange(parentItem, prevVal, null, i);
          },
          get: function() {
            return endpoint[parentItem][i];
          },
          enumerable: true
        });
      }
    }

    // ------ Property change tracking ------
    // `that` items are compared to accomodate for getters (e.g. `value` (precision))
    function handleInternalPropertyChange(item, prevVal) {
      // Object types (arrays included) always invoke a variable update
      // due to inability to deeply compare them (efficiently)
      if (!initial && (typeof that[item] === 'object' || prevVal !== that[item])) {
        updatePotentialVariable(item);
        invokeEvent(['change:' + item], prevVal);
      }
    }
    function handleInternalDeepArrayChange(item, prevVal, val, deepDefinedIndex) {
      if (!initial) {
        updatePotentialVariable(item);
        if (deepDefinedIndex != null) {
          invokeDeepArrayChangeEvent(item, prevVal, deepDefinedIndex);
        } else {
          for (let i = 0; i < val.length; i++) {
            invokeDeepArrayChangeEvent(item, prevVal, i);
          }
        }
      }

      function invokeDeepArrayChangeEvent(item, prevVal, deepDefinedIndex) {
        if (prevVal[deepDefinedIndex] !== that[item][deepDefinedIndex]) {
          invokeEvent(['change:' + item], prevVal, deepDefinedIndex);
        }
      }
    }

    function updatePotentialVariable(propName) {
      if (Object.prototype.hasOwnProperty.call(structureVars, propName)) {
        for (let i in structureVars[propName]) {
          const item = structureVars[propName][i];
          const str = item.str.replace(structureRgx.variable, function(match, variableDelimit, variable) {
            return getValueFromVariable(variableDelimit || variable);
          });
          if (item.attr) {
            item.elem.setAttribute(item.attr, str);
          } else {
            item.elem.textContent = str;
          }
        }
      }

      function getValueFromVariable(varName) {
        const recursiveVar = varName.split('.');
        let value = that[recursiveVar[0]];
        if (recursiveVar.length > 1) {
          for (let i = 1; i < recursiveVar.length; i++) {
            try {
              value = value[recursiveVar[i]];
            } catch (e) {
              error("Variable ‘" + varName + "’ cannot access property ‘" + recursiveVar[i] + "’ on " + value, 'structure');
            }
          }
        }
        return value;
      }
    }


    // ------ Thumb moving functions ------
    function getTrackPadding(direction) {
      return parseFloat(trackStyle['padding' + direction]);
    }
    function getDistance(thumb) {
      if (vals.orientation === 'vertical') {
        return thumb.getBoundingClientRect().top - vals.node.track.getBoundingClientRect().top -
          getTrackPadding('Top');
      } else {
        return thumb.getBoundingClientRect().left - vals.node.track.getBoundingClientRect().left -
          getTrackPadding('Left');
      }
    }
    function getAbsoluteTrackSize(thumb) {
      if (vals.orientation === 'vertical') {
        return vals.node.track.getBoundingClientRect().height - getTrackPadding('Top') - getTrackPadding('Bottom') -
          thumb.getBoundingClientRect().height;
      } else {
        return vals.node.track.getBoundingClientRect().width - getTrackPadding('Left') - getTrackPadding('Right') -
          thumb.getBoundingClientRect().width;
      }
    }
    function computeDistanceValue(thumb, distance, absSize) {
      if (absSize == null) absSize = getAbsoluteTrackSize(thumb);
      return distance / absSize * (vals.range[1] - vals.range[0]) + vals.range[0];
    }
    function moveThumb(thumb, distance, useTransform) {
      if (useTransform) {
        thumb.style.transform = 'translate' + (vals.orientation === 'vertical' ? 'Y' : 'X') + '(' + distance + 'px)';
      } else {
        if (vals.orientation === 'vertical') {
          var paddingStart = getTrackPadding('Top');
          var paddingEnd = getTrackPadding('Bottom');
          var thumbDim = thumb.clientHeight;
          var posAnchor = 'top';
        } else {
          var paddingStart = getTrackPadding('Left');
          var paddingEnd = getTrackPadding('Right');
          var thumbDim = thumb.clientWidth;
          var posAnchor = 'left';
        }

        let subtract = (thumbDim * distance) + 'px';
        if (paddingEnd) subtract += ' - ' + (paddingEnd * distance) + 'px';
        if (paddingStart) subtract += ' + ' + (paddingStart * (1 - distance)) + 'px';
        thumb.style[posAnchor] = 'calc(' + (distance * 100) + '% - ' + subtract + ')';
      }
    }

    function computeAllRatioDistances(newVals, returnProperties) {
      for (let i = 0; i < vals.values.length; i++) {
        computeOneRatioDistance(i, newVals, returnProperties);
      }
    }
    function computeOneRatioDistance(thumbIndex, newVals, returnProperties) {
      let value, ratio;
      if (!newVals) {
        newVals = vals;
        value = vals.values[thumbIndex];
      } else {
        const props = ['range', 'step'];
        for (let i in props) {
          if (newVals[props[i]] == null) newVals[props[i]] = vals[props[i]];
        }
        if (newVals.value != null) {
          value = newVals.value;
        } else {
          ratio = (vals.values[thumbIndex] - vals.range[0]) / (vals.range[1] - vals.range[0]);
          value = (newVals.range[1] - newVals.range[0]) * ratio + newVals.range[0];
        }
      }
      // Round value to a given step
      if (newVals.step !== false) {
        if (Math.abs(newVals.range[1] - newVals.range[0]) < newVals.step) {
          value = newVals.range[0];
        } else {
          value = newVals.range[0] + Math.round((value - newVals.range[0]) / newVals.step) * newVals.step;
        }
      }
      const newRatio = (value - newVals.range[0]) / (newVals.range[1] - newVals.range[0]);
      if (returnProperties) {
        return {
          value: value,
          ratio: newRatio
        };
      } else {
        if (value !== vals.values[thumbIndex]) vals.values[thumbIndex] = value;
        if (newRatio !== ratio) moveThumb(vals.node.thumb[thumbIndex], newRatio);
      }
    }


    // ------ Event functions ------
    function invokeEvent(types) {
      const args = Array.from(arguments);
      args[0] = that;
      for (let i = 0; i < types.length; i++) {
        const functions = vals.events[types[i]];
        if (functions) {
          for (let n = 0; n < functions.length; n++) {
            functions[n].apply(that, args);
          }
        }
      }
    }

    function keyDown(e) {
      if (document.activeElement === vals.node.thumb) {
        let modifier = Math.round((vals.range[1] - vals.range[0]) / 100);
        if (e.shiftKey && e.ctrlKey) {
          modifier *= 0.1;
        } else if (e.shiftKey) {
          modifier *= 10;
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          that.value -= modifier;
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          that.value += modifier;
        }
      }
    }

    // -> Touch event callbacks
    function touchStart(e) {
      e.preventDefault();
      if (activeTouchID == null) {
        activeTouchID = e.changedTouches[0].identifier;
        slideStart.call(this, e.changedTouches[0], e);

        vals.node.thumb.addEventListener('touchmove', touchMove);
        vals.node.thumb.addEventListener('touchend', touchEnd);
        vals.node.thumb.addEventListener('touchcancel', touchEnd);
      }
    }
    function touchMove(e) {
      e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === activeTouchID) {
          slideMove.call(this, e.changedTouches[i], e);
          break;
        }
      }
    }
    function touchEnd(e) {
      e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === activeTouchID) {
          vals.node.thumb.removeEventListener('touchmove', touchMove);
          vals.node.thumb.removeEventListener('touchend', touchEnd);
          vals.node.thumb.removeEventListener('touchcancel', touchEnd);

          slideEnd.call(this, e.changedTouches[i], e);
          activeTouchID = null;
          break;
        }
      }
    }

    // -> Mouse event callbacks
    function slideStart(e, touchEvent) {
      activeThumb = this;

      document.body.classList.add('sl89-noselect');
      activeThumb.classList.add('active');
      invokeEvent(['start'], touchEvent || e);

      if (vals.orientation === 'vertical') {
        var posAnchor = 'top';
        var clientDim = e.clientY;
      } else {
        var posAnchor = 'left';
        var clientDim = e.clientX;
      }
      const distance = getDistance(activeThumb);
      mouseDownPos = clientDim - distance;
      moveThumb(activeThumb, distance, true);
      activeThumb.style.removeProperty(posAnchor);

      if (!touchEvent) {
        window.addEventListener('mouseup', slideEnd);
        window.addEventListener('mousemove', slideMove);
      }
    }
    function slideMove(e, touchEvent) {
      const thumbIndex = vals.node.thumb.indexOf(activeThumb);
      const absSize = getAbsoluteTrackSize(activeThumb);
      let distance = (vals.orientation === 'vertical' ? e.clientY : e.clientX) - mouseDownPos;

      if (distance > absSize) distance = absSize;
      else if (distance < 0) distance = 0;

      let value = computeDistanceValue(activeThumb, distance, absSize);
      if (vals.step !== false) {
        const computedProperties = computeOneRatioDistance(thumbIndex, {value: value}, true);
        value = computedProperties.value;
        distance = computedProperties.ratio * absSize;
      }

      if (vals.values[thumbIndex] !== value) {
        vals.values[thumbIndex] = value;
        moveThumb(activeThumb, distance, true);
        invokeEvent(['move'], touchEvent || e);
      }
    }
    function slideEnd(e, touchEvent) {
      if (!touchEvent) {
        window.removeEventListener('mouseup', slideEnd);
        window.removeEventListener('mousemove', slideMove);
      }

      const value = computeDistanceValue(activeThumb, getDistance(activeThumb));
      computeOneRatioDistance(vals.node.thumb.indexOf(activeThumb), {value: value});
      activeThumb.style.removeProperty('transform');

      invokeEvent(['end'], touchEvent || e);
      activeThumb.classList.remove('active');
      document.body.classList.remove('sl89-noselect');

      mouseDownPos = null;
      activeThumb = null;
    }


    // ------ Slider init functions ------
    // -> Element building
    function createStyleSheet() {
      const sheet = (function() {
        const firstHeadChild = document.head.firstElementChild;
        if (firstHeadChild) {
          return document.head.insertBefore(document.createElement('style'), firstHeadChild).sheet;
        } else {
          return document.head.appendChild(document.createElement('style')).sheet;
        }
      })();
      for (let i = 0; i < styles.length; i++) {
        sheet.insertRule(styles[i], 0);
      }
    }

    function parseStructure(structureStr) {
      const node = {
        slider: document.createElement('div')
      };

      const variables = {};

      structureStr = structureStr.trim();

      // Reset the global RegExp-internal `lastIndex` flag
      // This would otherwise clash with multiple slider instances, because the regexes are global
      for (const regexpName in structureRgx) {
        if (structureRgx[regexpName].global) {
          structureRgx[regexpName].lastIndex = 0;
        }
      }

      const stack = new Array();
      let currentIndex = 0;
      let match;
      // match: [matchedStr, type, name, tag, innerContent, attributes]
      while (match = structureRgx.tag.exec(structureStr)) {
        if (match.index !== currentIndex) {
          parseError(
            'tag ‘<' + (match[1] || '') + match[2] + '>’',
            structureStr.slice(currentIndex, match.index).trim()
          );
        }
        currentIndex = structureRgx.tag.lastIndex;

        if (match[1] !== '/') {
          const elem = assembleElement(match[2], match[3], match[4], match[5]);
          node[match[2]] = elem;
          node[stack[stack.length - 1] || 'slider'].appendChild(elem);
          if (match[1] == null) {
            stack.push(match[2]);
          }
        } else {
          const lastItem = stack.pop();
          if (lastItem !== match[2]) {
            if (stack.indexOf(match[2]) !== -1) {
              closingTagError(lastItem);
            } else {
              propError('structure', "the closing tag ‘</" + match[2] + ">’ couldn't find a matching opening tag");
            }
          }
        }
      }

      if (currentIndex !== structureStr.length) {
        parseError('end of string', structureStr.slice(currentIndex));
      }
      if (stack.length > 1) {
        propError('structure', "couldn't find a matching closing tag for following elements:" + enlistArray(stack));
      } else if (stack.length === 1) {
        closingTagError(stack[0]);
      }

      // Post-processing
      (function() {
        // NOTE: thumb and track can be defined independently
        // I.e. track gets the class `sl89-track`, but thumbParent can be a different node
        if (!node.thumb) {
          thumbBase = assembleElement('thumb', 'div');
        } else {
          thumbBase = node.thumb;
          if (node.track) {
            thumbParent = node.thumb.parentNode;
          }
        }
        if (!node.track) {
          node.track = assembleElement('track', 'div');
          if (node.thumb) {
            node.thumb.parentNode.appendChild(node.track);
          } else {
            node.slider.appendChild(node.track);
          }
        }
        // Remove original thumb node
        if (node.thumb) {
          node.thumb.parentNode.removeChild(node.thumb);
        }
        if (!thumbParent) {
          thumbParent = node.track;
        }

        node.track.classList.add('sl89-track');

        node.thumb = new Array(vals.values.length);
        for (let i = 0; i < vals.values.length; i++) {
          node.thumb[i] = createNewThumb();
        }
      })();

      return node;

      function parseError(endPoint, failedStructure) {
        propError('structure',
          "something has been declared wrongly and couldn't be parsed. Point of failure before " +
          endPoint + ":\n  " + failedStructure + '\n');
      }
      function closingTagError(tagName) {
        propError('structure',
          "couldn't find a matching closing tag for the element ‘<" + tagName + ">’ (Should it be a self-closing tag marked with ‘:’?)");
      }

      function assembleElement(name, tag, content, attributes) {
        if (name in node) {
          propError('structure', 'Every element must have a unique name but there are mutiple elements called ‘' + name + '’');
        }
        const elem = document.createElement(tag || 'div');
        // Content with variables gets added after parseStructure, due to unavailability of some properties
        if (!registerVariables(content, elem, false)) {
          elem.textContent = content;
        }
        if (attributes) {
          let match;
          while (match = structureRgx.attributes.exec(attributes)) {
            const attribName = match[1];
            let value = match[2];
            if (!registerVariables(value, elem, attribName)) {
              elem.setAttribute(attribName, value);
            }
          }
        }
        return elem;
      }

      function registerVariables(str, elem, attribName) {
        // Need to use a RegExp without /g/ because the internal `lastIndex` counter would clash with the `exec` below
        if (structureRgx.variableNoFlag.test(str)) {
          // Memorize & skip already handled variables for the current string
          const cache = {};
          let match;
          while (match = structureRgx.variable.exec(str)) {
            const varName = match[1] || match[2];
            const propName = varName.indexOf('.') !== -1 ? varName.slice(0, varName.indexOf('.')) : varName;
            if (!cache.hasOwnProperty(propName)) {
              if (!Object.prototype.hasOwnProperty.call(vals, propName)) {
                propError('structure', "‘" + propName + "’ is not a recognized property and cannot be used as variable. Please check its spelling or initialize it in the constructor");
              }

              if (structureVars[propName] == null) structureVars[propName] = new Array();
              const item = {
                str: str,
                elem: elem
              };
              if (attribName) item.attr = attribName;
              structureVars[propName].push(item);

              cache[propName] = item;
            }
          }
          return true;
        }
        return false;
      }
    }

    // -> Methods & properties
    function propError(prop, msg, noTarget) {
      if (!initial) {
        let prevVal = vals[prop];
        if (Array.isArray(prevVal)) prevVal = '[' + prevVal.join(', ') + ']';
        msg += '.\nContinuing with the previous value (' + prevVal + ').';
      }
      error(msg, noTarget ? false : prop);
    }
    function methodError(method, argIdx, msg, omitError) {
      const counts = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth'];
      const arg = methods[method].args[argIdx];

      let errMsg = 'the ' + (arg.optional ? 'optional ' : '') + counts[argIdx] + ' argument (' + arg.name + ') ';
      if (omitError) errMsg += 'has been omitted but it is required. It ';
      errMsg += 'must be ' + computeTypeMsg(arg.structure);
      if (!omitError) errMsg += ' but it' + msg;

      error(errMsg, method);
    }

    // Check properties & methods for the correct type & format
    function checkMethod(method, argList) {
      const obj = methods[method];
      // If the next argument (argList.length - 1 + 1) is not optional, a required arg is missing
      for (let i in argList) {
        const arg = argList[i];
        const msg = checkTypes(arg, obj.args[i].structure, false);
        if (msg) methodError(method, i, msg);
      }
      if (obj.args[argList.length] && !obj.args[argList.length].optional) {
        methodError(method, argList.length, null, true);
      }
    }
    function checkProp(prop, val) {
      const item = properties[prop];
      const msg = checkTypes(val, item.structure, false);
      if (msg) {
        propError(prop, 'property ‘' + prop + '’ must be ' + computeTypeMsg(item.structure, item.shape) + ' but it' + msg, true);
      }
    }
  }

  // ------ Static functions ------
  // -> Helper functions
  // MDN Polyfill @ Number.isNaN
  function polyIsNaN(val) {
    return Number.isNaN && Number.isNaN(val) || !Number.isNaN && typeof val === 'number' && val !== val;
  }
  // NOTE: This is an incomplete but very simple polyfill
  // It works for Arrays (duh) but doesn't handle weird edge cases as Array.from
  function polyArrayFrom(val) {
    return Array.from && Array.from(val) || Array.prototype.slice.call(val);
  }

  function enlistArray(arr) {
    return '\n - "' + arr.join('"\n - "') + '"\n';
  }

  function typeMsg(variable, noIntro) {
    let msg = noIntro ? '' : 'but it is ';
    if (Array.isArray(variable))
      msg += 'an array';
    else if (polyIsNaN(variable))
      msg += 'NaN';
    else if (variable === null)
      msg += 'null';
    else if (typeof variable === 'boolean')
      msg += variable;
    else
      msg += 'of type ' + typeof variable;

    return msg;
  }

  // -> Type checking functions
  function checkTypes(val, structure, plural) {
    let msg;
    for (let i = 0; i < structure.length; i++) {
      const typeObj = structure[i];
      const type = typeObj.type;
      if (
        type === 'boolean' && typeof val === 'boolean' ||
        type === 'true' && val === true ||
        type === 'false' && val === false ||
        type === 'array' && Array.isArray(val) ||
        type === 'object' && Object.prototype.toString.call(val) === '[object Object]' ||
        type === 'number' && typeof val === 'number' && !polyIsNaN(val) ||
        type === 'function' && typeof val === 'function' ||
        type === 'string' && typeof val === 'string'
      ) {
        if (type == 'array') {
          for (let n = 0; n < val.length; n++) {
            if (msg = checkTypes(val[n], typeObj.structure, true)) break;
          }
        } else if (type === 'object') {
          for (let key in val) {
            if (msg = checkTypes(val[key], typeObj.structure, true)) break;
          }
        }
        if (msg) return msg;
        if (msg = checkConditions(typeObj.conditions, val)) break;
        else return false;
      }
    }
    return msg ? ' is ' + msg : (plural ? 's values are ' : ' is ') + typeMsg(val, true);

    function checkConditions(conditions, val) {
      if (conditions) {
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
        if (conditions.wordChar && !polyIsNaN(Number(val))) {
          return 'a pure number string';
        }
        if (conditions.length && val.length !== conditions.length) {
          return (type === 'array' ? 'an ' : 'a ') + type + ' of length ' + val.length;
        }
      }
    }
  }

  // Compute an automated error message regarding the property's types and conditions
  function computeTypeMsg(struct, shape, plural, deep) {
    let msg = '';
    for (let i = 0; i < struct.length; i++) {
      const type = struct[i].type;
      const cond = struct[i].conditions;
      if (msg) msg += ' or ';

      if (type === 'number') {
        const positive = cond && cond.positive;
        const nonnegative = cond && cond.nonnegative;
        const isInt = cond && cond.integer;

        if (nonnegative || positive) {
          if (!plural) msg += 'a ';
          if (nonnegative) {
            msg += 'non-negative';
          } else {
            msg += 'positive'
          }
        } else if (isInt && !plural) {
          msg += 'an';
        } else msg += 'any';
        msg += ' ' + (isInt ? 'integer' : 'number');
        if (plural) msg += 's';
      }

      else if (type === 'array') {
        const len = cond && cond.length;
        const msgRes = computeTypeMsg(struct[i].structure, false, len !== 1, true);

        if (!plural) msg += 'a';
        if (deep) {
          msg += msgRes;
        } else if (!plural) {
          msg += 'n';
        }
        msg += ' array';
        if (plural) msg += 's';
        if (len) msg += ' of length ' + len;
        if (!deep) msg += ' with ' + msgRes + ' as values';
      }

      else if (type === 'object') {
        msg += 'an object with ' + computeTypeMsg(struct[i].structure, false, true, true) + ' as values';
      }

      else if (type === 'function') {
        if (!deep) msg += 'a ';
        msg += 'function reference';
        if (!deep && plural) msg += 's';
      }

      else if (type === 'string') {
        if (cond && cond.keywords) {
          if (cond.keywords.length > 1) {
            msg += 'one of the keywords';
          } else {
            msg += 'the keyword';
          }
          cond.keywords.forEach(function(val, n, arr) {
            if (n !== 0 && n === arr.length - 1) msg += ' or';
            else if (n !== 0) msg += ',';
            msg += ' "' + val + '"';
          });
        } else {
          if (!deep) msg += 'a ';
          if (cond && cond.filled) msg += 'non-empty ';
          if (cond && cond.wordChar) msg += 'non-number ';
          msg += 'string';
          if (!deep && plural) msg += 's';
        }
      }

      else if (type === 'boolean') {
        if (!deep) msg += 'a ';
        msg += 'boolean';
        if (!deep && plural) msg += 's';
      }
      else if (type === 'true' || type === 'false') {
        msg += type;
      }

      if (shape) {
        msg += ' (' + shape + ')';
        shape = false;
      }
    }

    return msg;
  }

  return Slider89;
})();
