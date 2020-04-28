const fs = require('fs-extra');

const paths = require('../config/paths');
const logger = require('../helpers/logger');
const glob = require('../helpers/glob');
const config = require('../config/config');
const exists = require('../helpers/exists');

const extension = config.dot.templateSettings.varname;

const src = paths.src;
const dist = paths.dist.base;

const pages = {};

pages.arg = (arg) => {
  const hasPath = typeof arg === 'string';
  const isFolder = hasPath ? arg.indexOf('/*') > 0 : false;

  return { hasPath, isFolder };
};

pages.sanitizePath = (path, ext = `${extension}.js`) => {
  if (path.indexOf(`.${ext}`) > -1) {
    path = path.replace(`${paths.src.pages}/`, '');
    path = path.replace(`.${ext}`, '');
    path = [...new Set(path.split('/'))].join('/');
  }

  return path;
};

pages.prepareData = (path) => {
  path = pages.sanitizePath(path);

  if (!path) {
    logger('red', `Please provide a page path e.g. -p=some/path`);
    process.exit();
  }

  const pageName = path.split('/').pop();

  let srcPath = `${src.pages}/${path}/${pageName}`;

  if (pageName === 'index') {
    srcPath = srcPath.replace('/index', '');
  }

  const dataPath = `${srcPath}.${extension}.js`;

  // if (!exists(pageName, dataPath)) {
  //   return false;
  // }

  let pageData = require(dataPath);
  delete require.cache[require.resolve(dataPath)];

  pageData.name = pageName;

  let distPath = path.replace(`/${pageName}`, '');
  distPath = pageData.slug ? `${dist}/${pageData.slug}` : `${dist}/${path}`;

  if (pageName === 'index') {
    distPath = dist;
  }

  pageData = pageAssets(pageData, srcPath);
  pageData = templateData(pageData, path);

  pageData.srcPath = srcPath;
  pageData.distPath = distPath;

  return pageData;
};

pages.getFolder = (arg, path, ext = `${extension}.js`) => {
  let globFolder = paths.src.pages;
  let folderName;

  if (arg.isFolder) {
    folderName = arg.hasPath ? path.replace('/*', '') : '';
    globFolder = `${paths.src.pages}/${folderName}`;
  }

  return glob({
    dir: globFolder,
    includes: [`.${ext}`],
  });
};

function pageAssets(pageData, srcPath) {
  const pageSCSS = `${srcPath}.scss`;
  pageData.hasStyles = hasAsset(pageSCSS);

  const pageJS = `${srcPath}.js`;
  pageData.hasScripts = hasAsset(pageJS);

  return pageData;
}

function templateData(pageData) {
  let template = `${src.templates}/${pageData.template}`;

  const templateOut = pageData.template.replace(/\//g, '-');
  const templateDist = `template-${templateOut}`;

  pageData.templateName = pageData.template.split('/').pop();

  if (fs.existsSync(template)) {
    if (fs.lstatSync(template).isDirectory()) {
      pageData.templatePath = `${template}/${pageData.templateName}`;
    }
  }

  const cssDist = paths.dist.assets.scss.replace(`${process.cwd()}/dist`, '');
  const templateSCSS = `${pageData.templatePath}.scss`;
  pageData.templateStyles = hasAsset(templateSCSS) ? `${cssDist}/${templateDist}.css` : null;

  const jsDist = paths.dist.assets.js.replace(`${process.cwd()}/dist`, '');
  const templateJS = `${pageData.templatePath}.js`;
  pageData.templateScripts = hasAsset(templateJS) ? `${jsDist}/${templateDist}.js` : null;

  return pageData;
}

function hasAsset(path) {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf8') ? true : false;
  }

  return false;
}

module.exports = pages;
