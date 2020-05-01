const fs = require('fs-extra');

const pageService = require(`./page`);
const templateService = require(`./template`);

const dot = require(`../helpers/dot`);
const timer = require(`../helpers/timer`);
const logger = require('../helpers/logger');
const fileExists = require('../helpers/file-exists');

const compilePage = function compilePageHTML({ filePath }) {
  const pageData = pageService.prepareData({ filePath });

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
};

const compileTemplate = function compileAllTemplatePages({ templatePath }) {
  let templateName = templateService.sanitizePath({
    templatePath,
    extension: 'html',
  });

  const pageList = templateService.getPages(templateName);

  pageList.forEach((filePath) => {
    compilePage({ filePath });
  });
};

module.exports = compileService = {
  pages({ filePath }) {
    const argument = pageService.parsePath({ filePath });

    if (argument.hasPath && !argument.isFolder) {
      return compilePage({ filePath });
    }

    pageService.getFolder({ argument, filePath }).forEach((filePath) => {
      compilePage({ filePath });
    });
  },

  templates({ filePath }) {
    if (typeof filePath === 'string') return compileTemplate(filePath);

    templateService.getAll('html').forEach((templatePath) => {
      compileTemplate({ templatePath });
    });
  },

  includes({ filePath }) {
    if (typeof filePath !== 'string') return;

    templateService.getAll('html').forEach((templatePath) => {
      let templateContent = fs.readFileSync(templatePath, 'utf8');
      templateContent = templateContent.replace(/\s/g, '');

      if (templateContent.indexOf(`${filePath}')}}`) > -1) {
        compileTemplate({ templatePath });
      }
    });
  },
};
