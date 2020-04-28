const paths = require('../config/paths');
const logger = require('../helpers/logger');
const glob = require('../helpers/glob');
const config = require(`../config/config`);

const extension = config.dot.templateSettings.varname;

const src = paths.src.templates;

const templates = {};

templates.sanitizePath = (path, type) => {
  if (path.indexOf(`.${type}`) > -1) {
    path = path.split('/').pop();
    path = path.replace(`.${type}`, '');
  }

  return path;
};

templates.isInclude = (path) => {
  return path.indexOf(paths.src.includes) > -1;
};

templates.filePaths = (path, out) => {
  if (!path) {
    logger('red', `Please provide a template path e.g. -t=some/path`);
    process.exit();
  }

  const name = path.split('/').pop();
  const srcPath = `${src}/${path}/${name}`;

  const outName = path.replace(src, '').replace(/\//g, '-');
  const dist = out ? paths.dist.assets[out] : '';
  const distPath = `${dist}/template-${outName}`;

  return {
    name,
    srcPath,
    distPath,
  };
};

templates.getPages = (path) => {
  const template = templates.filePaths(path);

  const pagesFolder = glob({
    dir: paths.src.pages,
    includes: [`.${extension}.js`],
  });

  const list = [];

  pagesFolder.forEach((pagePath) => {
    const page = require(pagePath);
    delete require.cache[require.resolve(pagePath)];

    if (page.template === template.name) {
      list.push(pagePath);
    }
  });

  return list;
};

templates.all = (ext) => {
  return glob({
    dir: src,
    includes: [`.${ext}`],
    excludes: [`/${paths.src.includes}`],
  });
};

module.exports = templates;
