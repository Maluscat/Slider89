import type { Properties as Props } from './Base';
import type { PropertiesOutline } from './Slider89';
import { RuntimeTypeCheck, TypeCheckError } from './type-check/RuntimeTypeCheck';
import { DOMBuilder } from './dom-handler/DOMBuilder';
import { Slider89 } from './Slider89';
import { DOM } from './DOM';

export class Setup extends DOM {
  // ---- DOM init ----
  buildSlider(target: HTMLElement, replace: boolean) {
    const wrapper = (replace ? target : document.createElement('div'));
    this.vals.nodes = this.domHandler.createSliderNode(
      this.vals.values.length, this.vals.structure, wrapper);

    this.#defineNodeGetters();
    this.#addNodesAttributes();
    this.vals.nodes.thumb.forEach((thumb, i) => {
      this.setThumbAttributes(thumb, this.vals.values[i]);
    })

    if (!replace) {
      target.appendChild(this.vals.node.slider);
    }

    Slider89.StyleModule.mount(document, Slider89.BASE_STYLE);
    this.trackStyle = getComputedStyle(this.vals.node.track);
  }


  // ---- extend (mixins) & plugins ----
  testAndExtendConfig(config: Readonly<Props.Config>, target: Props.Config = config) {
    this.testConfig(config);
    if (config.extend) {
      for (let i = config.extend.length - 1; i >= 0; i--) {
        const mixin = config.extend[i];

        for (const [ item, value ] of Object.entries(mixin)) {
          if (this.properties[item]?.extendAssigner) {
            if (value !== false && config[item] !== false) {
              this.properties[item].extendAssigner(target, value, i);
            }
          } else if (!(item in target)) {
            target[item] = value;
          }
        }
        this.testAndExtendConfig(mixin, target);
      }
    }
  }

  callPlugins(plugins: Props.Base['plugins']) {
    for (const callback of plugins) {
      callback(this as unknown as Slider89);
    }
  }

  // ---- DOM initialization ----
  #defineNodeGetters() {
    for (const nodeName in this.vals.nodes) {
      Object.defineProperty(this.vals.node, nodeName, {
        get: () => {
          return this.vals.nodes[nodeName][0];
        },
        enumerable: true
      });
    }
  }

  #addNodesAttributes() {
    this.vals.nodes.track[0].classList.add('sl89-track');
    this.vals.nodes.slider[0].classList.add('slider89');
    if (this.vals.orientation === 'vertical') {
      this.vals.nodes.slider[0].classList.add('vertical');
    }
    if (this.vals.classList) {
      this.addClassesToNodes(this.vals.classList);
    }
  }
  /**
   * Iterate over a {@link Properties.Base.classList} and add
   * all of its class names to the current {@link nodes}.
   */
  addClassesToNodes(classList: Exclude<Props.Base['classList'], false>) {
    for (const [ nodeName, classes ] of Object.entries(classList)) {
      if (Object.prototype.hasOwnProperty.call(this.vals.nodes, nodeName)) {
        const elements = this.vals.nodes[nodeName];
        for (const className of classes) {
          for (const element of elements) {
            element.classList.add(className);
          }
        }
      }
    }
  }

  // ---- Property initialization ----
  initializeProperties(config: Props.Config, properties: PropertiesOutline) {
    for (const [ item, prop ] of Object.entries(properties)) {
      this.initializeProperty(item as keyof PropertiesOutline, prop);

      // Skipping `false` for deeply mergable props (will be replaced with default value)
      if (item in config && (!prop.extendAssigner || config[item] !== false)) {
        this[item] = config[item];
      } else if ('default' in prop) {
        const def = prop.default;
        ((prop.getter || prop.keyGetter) ? this : this.vals)[item] = (typeof def === 'function' ? def() : def);
      }
      delete config[item];
    }

    for (const item in config) {
      this.defineInternalProperty(this, this.vals, item as keyof Props.Custom);
      this.vals[item] = config[item];
    }
  }

  initializeProperty<I extends keyof PropertiesOutline>(item: I, outline: PropertiesOutline[I]) {
    this.defineInternalBuiltinProperty(item, outline);
    this.defineInternalProperty(this.vals, this.vals.$, item, outline);
  }

  // ---- Definition helpers ----
  defineInternalBuiltinProperty<I extends keyof PropertiesOutline>(item: I, outline: PropertiesOutline[I]) {
    const propData = Slider89.propertyData[item];
    Object.defineProperty(this, item, {
      set: (val: Props.Base[I]) => {
        if ((propData as any).constructorOnly && !this.initial) {
          throw new Slider89.Error('Property ‘' + item + '’ may only be defined in the constructor (It was just set with the value ‘' + val + '’)');
        }

        this.checkProp(item, val);

        if (!outline.setter || !outline.setter(val)) {
          // @ts-ignore ???
          this.vals[item] = val;
        }
      },
      get: () => {
        const getterEndpoint = (propData as any).isDeepDefinedArray
          ? this.vals.$intermediateThis
          : this.vals;
        // @ts-ignore `getterEndpoint` is safe here
        return (outline.getter ? outline.getter(getterEndpoint[item]) : getterEndpoint[item]);
      },
      enumerable: true
    });
  }

  // ---- Tests & type checking ----
  testInitialTarget(target: HTMLElement) {
    if (!target) {
      throw new Slider89.InitializationError('No first argument has been supplied. It needs to be the DOM target node for the slider');
    } else if (!target.nodeType || target.nodeType !== 1) {
      throw new Slider89.InitializationError('The first argument must be a valid DOM node (got ' + RuntimeTypeCheck.getType(target) + ')');
    }
  }
  testInitialConfig(config: Props.Config) {
    if (typeof config !== 'object' || Array.isArray(config)) {
      throw new Slider89.InitializationError('The optional second argument needs to be a configuration object (got ' + RuntimeTypeCheck.getType(config) + ')');
    } else if ('value' in config && 'values' in config) {
      throw new Slider89.InitializationError('Only one of ‘value’ and ‘values’ may be defined at once');
    }
  }

  testConfig(config: Props.Config) {
    for (const [ item, value ] of Object.entries(config)) {
      if (item in this.properties) {
        this.checkProp(item as keyof PropertiesOutline, value);
      } else if (item[0] !== '_') {
        throw new Slider89.InitializationError(
          '‘' + item + '’ is not a valid property name. Check its spelling or prefix it with an underscore to use it as custom property (‘_' + item + '’)');
      }
    }
  }

  checkProp(prop: keyof Props.Base, val: any) {
    const propData = Slider89.propertyData[prop];

    if ('readOnly' in propData) {
      throw new Slider89.Error('Property ‘' + prop + '’ is read-only (It was just set with the value ‘' + val + '’)');
    }

    try {
      RuntimeTypeCheck.checkType(val, propData.descriptor);
    } catch (e) {
      if (e instanceof TypeCheckError) {
        throw new Slider89.PropertyTypeError(this as unknown as Slider89, prop as keyof Props.Writable, e.message);
      } else throw e;
    }
  }
}
