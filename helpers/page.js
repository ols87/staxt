const fs = require('fs-extra');

const paths = require('./paths');
const logger = require('./logger');

module.exports = (path) => {
  const dataPath = `${paths.src.pages}/${path}.js`;
  const data = require(dataPath);
  delete require.cache[require.resolve(dataPath)];

  const page = path.split('/').pop();

  if (Object.keys(data).length < 1) {
    logger('red', `${page} data is invalid or not exported`);
  }

  let outPath = page === 'index' ? '/' : path.replace(`/${page}`, '');

  if (data.slug) {
    outPath = data.slug.replace(/\/+$/, '');
  }

  let template = `${paths.src.templates}/${data.template}`;

  if (fs.existsSync(template)) {
    if (fs.lstatSync(template).isDirectory()) {
      data.template = `${template}/${data.template.split('/').pop()}`;
    }
  }

  return {
    name: page,
    data: data,
    dist: outPath,
  };
};
