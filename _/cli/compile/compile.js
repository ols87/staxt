const fs = require('fs-extra');

const pages = require(`${__staxt}/services/pages`);
const templates = require(`${__staxt}/services/templates`);

const dot = require(`${__staxt}/helpers/dot`);
const exists = require(`${__staxt}/helpers/exists`);
const timer = require(`${__staxt}/helpers/timer`);
const logger = require(`${__staxt}/helpers/logger`);

const compile = {};

compile.page = (path) => {
  const pageData = pages.prepareData(path);

  if (!pageData) return false;

  timer.start();

  const distPath = `${pageData.distPath}/index.html`;
  const templatePath = `${pageData.templatePath}.html`;

  if (!exists(pageData.templateName, templatePath)) return false;

  const templateContent = fs.readFileSync(templatePath, 'utf8');
  const compile = dot.template(templateContent, dot.templateSettings, dot.defs);

  fs.outputFileSync(distPath, compile(pageData));

  timer.end().then((seconds) => {
    logger('green', `${pageData.name} page compiled in ${seconds} seconds`);
  });
};

compile.template = (path) => {
  const pageList = templates.getPages(path);

  pageList.forEach((pagePath) => {
    let pageName = pages.sanitizePath(pagePath);
    compile.page(pageName);
  });
};

module.exports = compile;
