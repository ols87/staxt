const fs = require('fs-extra');

const _page = require(`${__staxt}/helpers/page`);
const _template = require(`${__staxt}/helpers/template`);
const paths = require(`${__staxt}/helpers/paths`);
const glob = require(`${__staxt}/helpers/glob`);
const dot = require(`${__staxt}/helpers/dot`);
const exists = require(`${__staxt}/helpers/exists`);
const config = require(`${__staxt}/helpers/config`);

const extension = config.dot.templateSettings.varname;

const pageName = (path) => {
  path = path.replace(`${paths.src.pages}/`, '');
  path = path.replace(`.${extension}.js`, '');
  return [...new Set(path.split('/'))].join('/');
};

const page = (path) => {
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

const template = (path) => {
  const data = _template(path);

  const pages = glob({
    dir: paths.src.pages,
    includes: [`.${extension}.js`],
  });

  const que = [];

  pages.forEach((pagePath) => {
    const page = require(pagePath);
    delete require.cache[require.resolve(pagePath)];

    if (page.template === data.name) {
      que.push(pagePath);
    }
  });

  que.forEach((quePath) => {
    let name = pageName(quePath);
    if (!page(name)) return;
  });

  return data.name;
};

module.exports = { page, template };
