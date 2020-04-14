const fs = require('fs-extra');

const _page = require('./page');
const dot = require('./dot');
const exists = require('./exists');

module.exports = (path) => {
  const page = _page(path);

  if (!page) return false;

  const output = `${page.outPath}/index.html`;
  const templatePath = `${page.templatePath}.html`;

  if (!exists(page.templateName, templatePath)) return false;

  const template = fs.readFileSync(templatePath, 'utf8');

  const compile = dot.template(template, dot.templateSettings, dot.defs);

  fs.outputFileSync(output, compile(page));

  return true;
};
