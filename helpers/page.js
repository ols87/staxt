const fs = require('fs-extra');

const paths = require('./paths');
const logger = require('./logger');
const config = require('./config');
const exists = require('./exists');

const extension = config.dot.templateSettings.varname;

const src = paths.src;
const dist = paths.dist.base;

module.exports = (path) => {
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
