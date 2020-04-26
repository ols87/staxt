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

pages.sanitizePath = (path) => {
  if (path.indexOf(`.${extension}.js`) > -1) {
    path = path.replace(`${paths.src.pages}/`, '');
    path = path.replace(`.${extension}.js`, '');
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

  if (!exists(pageName, dataPath)) {
    return false;
  }

  const pageData = require(dataPath);
  delete require.cache[require.resolve(dataPath)];

  pageData.name = pageName;

  let distPath = path.replace(`/${pageName}`, '');
  distPath = pageData.slug ? `${dist}/${pageData.slug}` : `${dist}/${path}`;

  if (pageName === 'index') {
    distPath = dist;
  }

  const scss = `${srcPath}.scss`;
  if (fs.existsSync(scss)) {
    pageData.hasStyles = fs.readFileSync(scss, 'utf8') ? true : false;
  }

  const js = `${srcPath}.js`;
  if (fs.existsSync(js)) {
    pageData.pageScripts = fs.readFileSync(js, 'utf8') ? true : false;
  }

  let template = `${src.templates}/${pageData.template}`;

  pageData.templateName = pageData.template.split('/').pop();

  if (fs.existsSync(template)) {
    if (fs.lstatSync(template).isDirectory()) {
      pageData.templatePath = `${template}/${pageData.templateName}`;
    }
  }

  pageData.srcPath = srcPath;
  pageData.distPath = distPath;

  return pageData;
};

pages.getFolder = (arg, path) => {
  let globFolder = paths.src.pages;
  let folderName;

  if (arg.isFolder) {
    folderName = arg.hasPath ? path.replace('/*', '') : '';
    globFolder = `${paths.src.pages}/${folderName}`;
  }

  return glob({
    dir: globFolder,
    includes: [`.${extension}.js`],
  });
};

module.exports = pages;
