const fs = require('fs-extra');

const pageService = require(`./page`);
const includeService = require(`./include`);
const templateService = require(`./template`);

const dot = require(`../helpers/dot`);
const timer = require(`../helpers/timer`);
const logger = require('../helpers/logger');
const fileExists = require('../helpers/file-exists');

const compilePage = function compilePageHTML({ filePath }) {
  const pageData = pageService.prepareData({ filePath });

  if (!pageData.srcPath) {
    return logger('red', `${pageData.name} does not exist`);
  }

  timer.start();

  const distPath = `${pageData.distPath}/index.html`;
  const templatePath = `${pageData.templatePath}.html`;

  if (!fileExists(pageData.templateName, templatePath)) return false;

  const templateContent = fs.readFileSync(templatePath, 'utf8');
  const compile = dot.template(templateContent, dot.templateSettings, dot.defs);

  if (fs.existsSync(distPath)) {
    const distContent = fs.readFileSync(distPath, 'utf8');

    if (distContent === compile(pageData)) {
      return timer.end();
    }
  }

  fs.outputFileSync(distPath, compile(pageData));

  timer.end().then((seconds) => {
    logger('green', `${pageData.name} page compiled in ${seconds} seconds`);
  });
};

const compileTemplate = function compileAllTemplatePages({ filePath }) {
  filePath = templateService.sanitizePath({
    filePath,
    fileExtension: 'html',
  });

  const pageList = templateService.getPages({ filePath });

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

    pageService.getFolder({ argument, folderPath: filePath }).forEach((filePath) => {
      compilePage({ filePath });
    });
  },

  templates({ filePath }) {
    if (typeof filePath === 'string') return compileTemplate({ filePath });

    templateService.getAll({ fileExtension: 'html' }).forEach((filePath) => {
      compileTemplate({ filePath });
    });
  },

  includes({ filePath }) {
    if (typeof filePath !== 'string') return this.templates({ filePath: null });

    includeService.getTemplates({ filePath }, ({ templatePath }) => {
      compileTemplate({ filePath: templatePath });
    });
  },
};
