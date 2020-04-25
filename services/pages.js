const fs = require('fs-extra');

const paths = require('../helpers/paths');
const logger = require('../helpers/logger');
const glob = require('../helpers/glob');
const config = require('../helpers/config');
const exists = require('../helpers/exists');
const file = require(`../helpers/file`);

const extension = config.dot.templateSettings.varname;

const src = paths.src;
const dist = paths.dist.base;

const sanitize = (path) => {
  if (path.indexOf(`.${extension}.js`) > -1) {
    path = path.replace(`${paths.src.pages}/`, '');
    path = path.replace(`.${extension}.js`, '');
    path = [...new Set(path.split('/'))].join('/');
  }

  return path;
};

const data = (path) => {
  path = sanitize(path);

  if (!path) {
    logger('red', `Please provide a page path e.g. -p=some/path`);
    process.exit();
  }

  const name = path.split('/').pop();

  let filePath = `${src.pages}/${path}/${name}`;

  if (name === 'index') {
    filePath = filePath.replace('/index', '');
  }

  const dataPath = `${filePath}.${extension}.js`;

  if (!exists(name, dataPath)) {
    return false;
  }

  const data = require(dataPath);
  delete require.cache[require.resolve(dataPath)];

  data.name = name;

  let outPath = path.replace(`/${name}`, '');
  outPath = data.slug ? `${dist}/${data.slug}` : `${dist}/${path}`;

  if (name === 'index') {
    outPath = dist;
  }

  const scss = `${filePath}.scss`;
  if (fs.existsSync(scss)) {
    data.hasStyles = fs.readFileSync(scss, 'utf8') ? true : false;
  }

  const js = `${filePath}.js`;
  if (fs.existsSync(js)) {
    data.pageScripts = fs.readFileSync(js, 'utf8') ? true : false;
  }

  let template = `${src.templates}/${data.template}`;

  data.templateName = data.template.split('/').pop();

  if (fs.existsSync(template)) {
    if (fs.lstatSync(template).isDirectory()) {
      data.templatePath = `${template}/${data.templateName}`;
    }
  }

  data.filePath = filePath;
  data.outPath = outPath;

  return data;
};

const args = (path) => {
  const hasPath = typeof path === 'string';
  const isFolder = hasPath ? path.indexOf('/*') > 0 : false;

  return { hasPath, isFolder };
};

const folder = (args, path) => {
  let globFolder = paths.src.pages;
  let folderName;

  if (args.isFolder) {
    folderName = args.hasPath ? path.replace('/*', '') : '';
    globFolder = `${paths.src.pages}/${folderName}`;
  }

  return glob({
    dir: globFolder,
    includes: [`.${extension}.js`],
  });
};

module.exports = { sanitize, data, args, folder };
