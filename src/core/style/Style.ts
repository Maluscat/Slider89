import { StyleModule } from 'style-mod';

// Copied over from the source
export type StyleSpec = {
  [propOrSelector: string]: string | number | StyleSpec | null
}

/**
 * Simple class used for registering reusable CSS rules that
 * can be applied to a slider.
 *
 * Designed to be used in conjunction with {@link StyleModule}.
 */
export class Style {
  spec: Record<string, StyleSpec>;

  constructor(spec: Record<string, StyleSpec>) {
    this.spec = spec;
  }

  getNewStyleModule(wrapperClass: string) {
    return new StyleModule(this.spec, {
      finish(selector) {
        return (selector.includes('.slider89') ? '' : `.${wrapperClass} `)
             + Style.#replaceWrapperClass(selector, wrapperClass);
      }
    });
  }

  static #replaceWrapperClass(input: string, replacementClass: string) {
    return input.replace(/(\.)slider89(\b)/, (a, b, boundary) => '.' + replacementClass + boundary);
  }
}
