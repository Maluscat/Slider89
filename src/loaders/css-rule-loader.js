module.exports = function(css) {
  css = css.replace(/(?! [.#])\s/g, '');
  return `
    module.exports = '${css}'
  `;
}
