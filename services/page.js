const fs = require('fs-extra');
const path = require('path');

const paths = require('../helpers/paths');
const config = require('../helpers/config');
const logger = require('../helpers/logger');
const getFiles = require('../helpers/get-files');

const extension = config.dot.templateSettings.varname;
const defaultTemplate = config.defaultTemplate;

const srcDirectory = paths.src;
const distDirectory = paths.dist.base;

const cssDist = paths.dist.assets.scss.replace(`${process.cwd()}/dist`, '');
const jsDist = paths.dist.assets.js.replace(`${process.cwd()}/dist`, '');

const hasAsset = function hasAssetAndContent(filePath) {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8') ? true : false;
  }

  return false;
};

const setPageAssets = function setPageAssetsData({ pageData, srcPath }) {
  let pageScripts, pageStyles;

  if (hasAsset(`${srcPath}.scss`)) {
    pageStyles = `<link rel="stylesheet" type="text/css" href="styles.css" />`;
  }

  if (hasAsset(`${srcPath}.js`)) {
    pageScripts = `<script src="scripts.js"></script>`;
  }

  pageData.pageStyles = pageStyles ? pageStyles : '';
  pageData.pageScripts = pageScripts ? pageScripts : '';

  return pageData;
};

const setTemplateData = function SetPageTemplateData({ pageData }) {
  let templatePath = `${srcDirectory.templates}/${pageData.template}`;

  const templateOut = pageData.template.replace(/\/|\\/g, '-');
  const templateDist = `template-${templateOut}`;

  pageData.templateName = pageData.template.split('/').pop();

  if (fs.existsSync(templatePath)) {
    if (fs.lstatSync(templatePath).isDirectory()) {
      pageData.templatePath = `${templatePath}/${pageData.templateName}`;
    }
  } else {
    pageData.templatePath = `${srcDirectory.templates}/${defaultTemplate}/${defaultTemplate}`;
  }

  if (fs.existsSync(templatePath)) {
    if (fs.lstatSync(templatePath).isDirectory()) {
      pageData.templatePath = `${templatePath}/${pageData.templateName}`;
    }
  } else {
    pageData.templatePath = `${srcDirectory.templates}/${defaultTemplate}/${defaultTemplate}`;
  }

  let templateScripts, templateStyles;

  if (hasAsset(`${pageData.templatePath}.scss`)) {
    templateStyles = `<link rel="stylesheet" type="text/css" href="${cssDist}/${templateDist}.css" />`;
  }

  if (hasAsset(`${pageData.templatePath}.js`)) {
    templateScripts = `<script src="${jsDist}/${templateDist}.js"></script>`;
  }

  pageData.templateStyles = templateStyles ? templateStyles : '';
  pageData.templateScripts = templateScripts ? templateScripts : '';

  return pageData;
};

const requireData = function requirePageData({ pageData }) {
  if (!pageData.hasOwnProperty('requireData')) {
    return pageData;
  }

  for (let property in pageData.requireData) {
    pageData[property] = require(`${paths.src.base}/${pageData.requireData[property]}`);
    delete require.cache[require.resolve(`${paths.src.base}/${pageData.requireData[property]}`)];
  }

  return pageData;
};

module.exports = pageService = {
  parsePath({ filePath }) {
    const hasPath = typeof filePath === 'string';
    const isFolder = hasPath ? filePath.indexOf('/*') > 0 : false;

    return { hasPath, isFolder };
  },

  sanitizePath({ filePath, fileExtension }) {
    filePath = path.normalize(filePath);
    fileExtension = fileExtension || `${extension}.js`;

    if (filePath.indexOf(`.${fileExtension}`) > -1) {
      filePath = filePath.replace(`${path.normalize(srcDirectory.pages)}${path.sep}`, '');
      filePath = filePath.replace(`.${fileExtension}`, '');
      filePath = [...new Set(filePath.split(/\/|\\/))].join(path.sep);
    }

    return filePath;
  },

  getFolder({ argument, folderPath }) {
    let fileExtension = `${extension}.js`;
    let returnFolder = srcDirectory.pages;

    if (argument.isFolder) {
      const folderName = argument.hasPath ? folderPath.replace('/*', '') : '';
      returnFolder = `${srcDirectory.pages}/${folderName}`;
    }

    return getFiles({
      directory: returnFolder,
      includes: [`.${fileExtension}`],
    });
  },

  prepareData({ filePath }) {
    filePath = this.sanitizePath({ filePath });

    if (!filePath) {
      logger('red', `Please provide a page path e.g. -p=page/path`);
      process.exit();
    }

    const pageName = filePath.split(/\/|\\/).pop();

    let srcPath = `${srcDirectory.pages}/${filePath}/${pageName}`;

    if (pageName === 'index') {
      srcPath = srcPath.replace('/index', '');
    }

    const dataPath = `${srcPath}.${extension}.js`;

    if (!fs.existsSync(dataPath)) {
      return { name: pageName };
    }

    let pageData = require(dataPath);
    delete require.cache[require.resolve(dataPath)];

    pageData.name = pageName;
    pageData.filePath = filePath;

    let distPath = filePath.replace(`/${pageName}`, '');
    distPath = pageData.slug ? `${distDirectory}/${pageData.slug}` : `${distDirectory}/${filePath}`;

    if (pageName === 'index') {
      distPath = distDirectory;
    }

    pageData = setPageAssets({ pageData, srcPath });
    pageData = setTemplateData({ pageData });
    pageData = requireData({ pageData });

    pageData.srcPath = srcPath;
    pageData.distPath = distPath;

    return pageData;
  },
};
