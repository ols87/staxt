const fs = require('fs-extra');

const pageService = require(`./page`);
const templateService = require(`./template`);

const dot = require(`../helpers/dot`);
const timer = require(`../helpers/timer`);
const logger = require('../helpers/logger');
const fileExists = require('../helpers/file-exists');

const compilePage = async function compilePageHTML({ filePath }) {
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

  return timer.end().then((seconds) => {
    logger('green', `${pageData.name} page compiled in ${seconds} seconds`);
  });
};

const compileTemplate = async function compileAllTemplatePages({ filePath }) {
  filePath = templateService.sanitizePath({
    filePath,
    fileExtension: 'html',
  });

  const pageList = templateService.getPages({ filePath });

  for (let filePath of pageList) {
    await compilePage({ filePath });
  }

  return true;
};

module.exports = compileService = {
  async pages({ filePath }) {
    const argument = pageService.parsePath({ filePath });

    if (argument.hasPath && !argument.isFolder) {
      return await compilePage({ filePath });
    }

    const pagesFolder = pageService.getFolder({ argument, folderPath: filePath });

    for (let filePath of pagesFolder) {
      await compilePage({ filePath });
    }

    return true;
  },

  async templates({ filePath }) {
    if (typeof filePath === 'string') return await compileTemplate({ filePath });

    const templatesFolder = templateService.getAll({ fileExtension: 'html' });

    for (let filePath of templatesFolder) {
      await compileTemplate({ filePath });
    }

    return true;
  },

  async includes({ filePath }) {
    if (typeof filePath !== 'string') return await this.templates({ filePath: null });

    const templatesFolder = templateService.getAll({ fileExtension: 'html' });

    for (let filePath of templatesFolder) {
      let templateContent = fs.readFileSync(templatePath, 'utf8');
      templateContent = templateContent.replace(/\s/g, '');

      if (templateContent.indexOf(`${filePath}')}}`) > -1) {
        await compileTemplate({ filePath });
      }
    }

    return true;
  },
};
