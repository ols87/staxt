const fs = require('fs-extra');

const paths = require('../helpers/paths');
const config = require('../helpersconfig');
const logger = require('../helpers/logger');
const filterFolder = require('../helpers/filterFolder');

const extension = config.dot.templateSettings.varname;

const srcDirectory = paths.src;
const distDirectory = paths.dist.base;

const cssDist = paths.dist.assets.css.replace(`${process.cwd()}/dist`, '');
const jsDist = paths.dist.assets.js.replace(`${process.cwd()}/dist`, '');

const hasAsset = function hasAssetAndContent(filePath) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8') ? true : false;
  }

  return false;
};

const setPageAssets = function setPageAssetsData(pageData, srcPath) {
  const pageSCSS = `${srcPath}.scss`;
  pageData.hasStyles = hasAsset(pageSCSS);

  const pageJS = `${srcPath}.js`;
  pageData.hasScripts = hasAsset(pageJS);

  return pageData;
};

const setTemplateData = function SetPageTemplateData(pageData) {
  let templatePath = `${srcDirectory.templates}/${pageData.template}`;

  const templateOut = pageData.template.replace(/\//g, '-');
  const templateDist = `template-${templateOut}`;

  pageData.templateName = pageData.template.split('/').pop();

  if (fs.existsSync(templatePath)) {
    if (fs.lstatSync(templatePath).isDirectory()) {
      pageData.templatePath = `${templatePath}/${pageData.templateName}`;
    }
  }

  const templateSCSS = `${pageData.templatePath}.scss`;
  pageData.templateStyles = hasAsset(templateSCSS) ? `${cssDist}/${templateDist}.css` : null;

  const templateJS = `${pageData.templatePath}.js`;
  pageData.templateScripts = hasAsset(templateJS) ? `${jsDist}/${templateDist}.js` : null;

  return pageData;
};

module.exports = pagesModule = {
  parsePath(argument) {
    const hasPath = typeof argument === 'string';
    const isFolder = hasPath ? argument.indexOf('/*') > 0 : false;

    return { hasPath, isFolder };
  },

  sanitizePath(filePath, fileExtension = `${extension}.js`) {
    if (filePath.indexOf(`.${fileExtension}`) > -1) {
      filePath = filePath.replace(`${srcDirectory.pages}/`, '');
      filePath = filePath.replace(`.${fileExtension}`, '');
      filePath = [...new Set(filePath.split('/'))].join('/');
    }

    return filePath;
  },

  prepareData(fileName) {
    fileName = pages.sanitizePath(path);

    if (!fileName) {
      logger('red', `Please provide a page path e.g. -p=some/path`);
      process.exit();
    }

    const pageName = fileName.split('/').pop();

    let srcPath = `${src.pages}/${fileName}/${pageName}`;

    if (pageName === 'index') {
      srcPath = srcPath.replace('/index', '');
    }

    const dataPath = `${srcPath}.${extension}.js`;

    let pageData = require(dataPath);
    delete require.cache[require.resolve(dataPath)];

    pageData.name = pageName;

    let distPath = fileName.replace(`/${pageName}`, '');
    distPath = pageData.slug ? `${distDirectory}/${pageData.slug}` : `${distDirectory}/${fileName}`;

    if (pageName === 'index') {
      distPath = distDirectory;
    }

    pageData = setPageAssets(pageData, srcPath);
    pageData = setTemplateData(pageData, fileName);

    pageData.srcPath = srcPath;
    pageData.distPath = distPath;

    return pageData;
  },

  getFolder(argument, folderPath, fileExtension = `${extension}.js`) {
    let returnFolder = srcDirectory.pages;

    if (argument.isFolder) {
      const folderName = argument.hasPath ? folderPath.replace('/*', '') : '';
      returnFolder = `${srcDirectory.pages}/${folderName}`;
    }

    return filterFolder({
      directory: returnFolder,
      includes: [`.${fileExtension}`],
    });
  },
};