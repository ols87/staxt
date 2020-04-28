const fs = require('fs-extra');

const pageService = require(`./page`);
const templateService = require(`./template`);

const dot = require(`../helpers/dot`);
const timer = require(`../helpers/timer`);
const logger = require('../helpers/logger');
const fileExists = require('../helpers/file-exists');

module.exports = compileService = {
  page(filePath) {
    const pageData = pageService.prepareData(filePath);

    if (!pageData) return false;

    timer.start();

    const distPath = `${pageData.distPath}/index.html`;
    const templatePath = `${pageData.templatePath}.html`;

    if (!fileExists(pageData.templateName, templatePath)) return false;

    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const compile = dot.template(templateContent, dot.templateSettings, dot.defs);

    fs.outputFileSync(distPath, compile(pageData));

    timer.end().then((seconds) => {
      logger('green', `${pageData.name} page compiled in ${seconds} seconds`);
    });
  },

  template(filePath) {
    const pageList = templateService.getPages(filePath);

    pageList.forEach((pagePath) => {
      this.page(pagePath);
    });
  },
};
