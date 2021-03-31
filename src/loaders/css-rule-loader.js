module.exports = function(css) {
  const rules = css
    .split('}')
    .map(rule => {
      rule = '"' + rule + '"';
      return rule.replace(/(?! \.)\s/g, '');
    });
  rules.splice(rules.length - 1, 1);

  return `
    module.exports = [ ${rules.toString()} ]
  `;
}
