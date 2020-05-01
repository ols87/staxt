const paths = require('../helpers/paths');
const config = require('../helpers/config');
const logger = require('../helpers/logger');
const getFiles = require('../helpers/get-files');

const extension = config.dot.templateSettings.varname;

const templatesSrc = paths.src.templates;
const includesSrc = paths.src.includes;
const pagesSrc = paths.src.pages;

module.exports = templateService = {
  sanitizePath({ filePath, fileExtension }) {
    if (filePath.indexOf(`.${fileExtension}`) > -1) {
      filePath = filePath.replace(templatesSrc, '');
      filePath = filePath.split('/').pop();
      filePath = filePath.replace(`.${fileExtension}`, '');
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

    const name = filePath.split('/').pop();
    const srcPath = `${templatesSrc}/${filePath}/${name}`;

    const outName = filePath.replace(templatesSrc, '').replace(/\//g, '-');
    const distDirectory = outDirectory ? paths.dist.assets[outDirectory] : '';
    const distPath = `${distDirectory}/template-${outName}`;

    return {
      name,
      srcPath,
      distPath,
    };
  },

  getPages({ filePath }) {
    const templatePaths = this.filePaths({ filePath });

    const pagesFolder = getFiles({
      directory: pagesSrc,
      includes: [`${extension}.js`],
    });

    const pageList = [];

    pagesFolder.forEach((pagePath) => {
      const pageData = require(pagePath);
      delete require.cache[require.resolve(pagePath)];

      if (pageData.template === templatePaths.name) {
        pageList.push(pagePath);
      }
    });

    return pageList;
  },

  getAll({ fileExtension }) {
    return getFiles({
      directory: templatesSrc,
      includes: [`.${fileExtension}`],
      excludes: [includesSrc],
    });
  },
};
