const paths = require('../helpers/paths');
const config = require('../helpersconfig');
const logger = require('../helpers/logger');
const filterFolder = require('../helpers/filterFolder');

const extension = config.dot.templateSettings.varname;

const templatesSrc = paths.src.templates;
const includesSrc = paths.src.includes;
const pagesSrc = paths.src.includes;

module.exports = templatesModule = {
  sanitizePath(filePath, FileExtension) {
    if (filePath.indexOf(`.${FileExtension}`) > -1) {
      filePath = filePath.split('/').pop();
      filePath = filePath.replace(`.${FileExtension}`, '');
    }

    return filePath;
  },

  isInclude(filePath) {
    return filePath.indexOf(includesSrc) > -1;
  },

  filePaths(filePath, outDirectory) {
    if (!filePath) {
      logger('red', `Please provide a template path e.g. -t=some/path`);
      process.exit();
    }

    const fileName = filePath.split('/').pop();
    const srcPath = `${templatesSrc}/${filePath}/${fileName}`;

    const outName = filePath.replace(src, '').replace(/\//g, '-');
    const distDirectory = outDirectory ? paths.dist.assets[out] : '';
    const distPath = `${distDirectory}/template-${outName}`;

    return {
      fileName,
      srcPath,
      distPath,
    };
  },

  getPages(filePath) {
    const template = templates.filePaths(filePath);

    const pagesFolder = filterFolder({
      directory: pagesSrc,
      includes: [`${extension}.js`],
    });

    const pageList = [];

    pagesFolder.forEach((pagePath) => {
      const pageData = require(pagePath);
      delete require.cache[require.resolve(pagePath)];

      if (pageData.template === template.name) {
        pageList.push(pagePath);
      }
    });

    return pageList;
  },

  getAll(FileExtension) {
    return glob({
      directory: templateSrc,
      includes: [`.${FileExtension}`],
      excludes: [`/${includesSrc}`],
    });
  },
};
