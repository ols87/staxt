const paths = require('../helpers/paths');
const config = require('../helpers/config');
const logger = require('../helpers/logger');
const getFiles = require('../helpers/get-files');

const extension = config.dot.templateSettings.varname;

const templatesSrc = paths.src.templates;
const includesSrc = paths.src.includes;
const pagesSrc = paths.src.pages;

module.exports = templateService = {
  sanitizePath({ filePath, FileExtension }) {
    if (filePath.indexOf(`.${FileExtension}`) > -1) {
      filePath = filePath.split('/').pop();
      filePath = filePath.replace(`.${FileExtension}`, '');
    }

    return filePath;
  },

  isInclude({ filePath }) {
    return filePath.indexOf(includesSrc) > -1;
  },

  filePaths({ filePath, outDirectory }) {
    if (!filePath) {
      logger('red', `Please provide a template path e.g. -t=path`);
      process.exit();
    }

    const fileName = filePath.split('/').pop();
    const srcPath = `${templatesSrc}/${filePath}/${fileName}`;

    const outName = filePath.replace(templatesSrc, '').replace(/\//g, '-');
    const distDirectory = outDirectory ? paths.dist.assets[out] : '';
    const distPath = `${distDirectory}/template-${outName}`;

    return {
      fileName,
      srcPath,
      distPath,
    };
  },

  getPages({ filePath }) {
    const templatePaths = this.filePaths(filePath);

    const pagesFolder = getFiles({
      directory: pagesSrc,
      includes: [`${extension}.js`],
    });

    const pageList = [];

    pagesFolder.forEach((pagePath) => {
      const pageData = require(pagePath);
      delete require.cache[require.resolve(pagePath)];

      if (pageData.template === templatePaths.fileName) {
        pageList.push(pagePath);
      }
    });

    return pageList;
  },

  getAll({ FileExtension }) {
    return getFiles({
      directory: templatesSrc,
      includes: [`.${FileExtension}`],
      excludes: [`/${includesSrc}`],
    });
  },
};
