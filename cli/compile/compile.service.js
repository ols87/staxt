const fs = require('fs-extra');

const pages = require(`${__staxt}/services/pages`);
const templates = require(`${__staxt}/services/templates`);

const paths = require(`${__staxt}/helpers/paths`);
const glob = require(`${__staxt}/helpers/glob`);
const dot = require(`${__staxt}/helpers/dot`);
const exists = require(`${__staxt}/helpers/exists`);
const config = require(`${__staxt}/helpers/config`);
const timer = require(`${__staxt}/helpers/timer`);
const logger = require(`${__staxt}/helpers/logger`);

const extension = config.dot.templateSettings.varname;

const page = (path) => {
  const page = pages.data(path);

  if (!page) return false;

  timer.start();

  const output = `${page.outPath}/index.html`;
  const templatePath = `${page.templatePath}.html`;

  if (!exists(page.templateName, templatePath)) return false;

  const template = fs.readFileSync(templatePath, 'utf8');
  const compile = dot.template(template, dot.templateSettings, dot.defs);

  fs.outputFileSync(output, compile(page));

  timer.end().then((seconds) => {
    logger('green', `${page.name} page compiled in ${seconds} seconds`);
  });
};

const template = (path) => {
  const data = templates.data(path);

  const pagesFolder = glob({
    dir: paths.src.pages,
    includes: [`.${extension}.js`],
  });

  const que = [];

  pagesFolder.forEach((pagePath) => {
    const page = require(pagePath);
    delete require.cache[require.resolve(pagePath)];

    if (page.template === data.name) {
      que.push(pagePath);
    }
  });

  que.forEach((quePath) => {
    let name = pages.sanitize(quePath);
    if (!page(name)) return;
  });
};

module.exports = { page, template };
