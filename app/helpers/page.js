const fs = require('fs-extra');

const paths = require('./paths');
const logger = require('./logger');

const src = paths.src;
const dist = paths.dist.base;

module.exports = (path) => {
  const name = path.split('/').pop();

  const filePath = `${src.pages}/${path}/${name}`;
  const dataPath = `${filePath}.js`;

  const data = require(dataPath);
  delete require.cache[require.resolve(dataPath)];

  if (!fs.existsSync(`${filePath}.js`)) {
    return logger('red', `${page.name} page js does not exist`);
  }

  let outPath = name === 'index' ? '/' : path.replace(`/${name}`, '');
  outPath = data.slug ? `${dist}/${data.slug}` : `${dist}/${path}`;

  let template = `${src.templates}/${data.template}`;

  if (fs.existsSync(template)) {
    if (fs.lstatSync(template).isDirectory()) {
      data.template = `${template}/${data.template.split('/').pop()}`;
    }
  }

  return {
    name,
    data,
    filePath,
    outPath,
  };
};
