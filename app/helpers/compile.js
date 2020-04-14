const fs = require('fs-extra');

const _page = require('./page');
const dot = require('./dot');
const logger = require('./logger');

module.exports = (path) => {
  const page = _page(path);

  const output = `${page.outPath}/index.html`;

  if (!fs.existsSync(`${page.templatePath}.html`)) {
    logger('red', `Cannot resolve template file path for ${name} page`);
    process.exit();
  }

  const template = fs.readFileSync(`${page.templatePath}.html`, 'utf8');

  if (!template) {
    logger('red', `${page.name} is referencing an inavlid or empty template`);
    process.exit();
  }

  const scss = `${page.filePath}.scss`;
  if (fs.existsSync(scss)) {
    page.hasStyles = fs.readFileSync(scss, 'utf8') ? true : false;
  }

  const js = `${page.filePath}.js`;
  if (fs.existsSync(js)) {
    page.pageScripts = fs.readFileSync(js, 'utf8') ? true : false;
  }

  const compile = dot.template(template, dot.templateSettings, dot.defs);

  fs.outputFileSync(output, compile(page));
};
