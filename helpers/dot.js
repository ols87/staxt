const fs = require('fs-extra');
const dot = require('dot');

const paths = require(`./paths`);
const config = require(`./config`);
const logger = require(`./logger`);

dot.templateSettings = config.dot.templateSettings;

dot.defs = config.dot.defs;

const processInclude = function processIncludeData({ fileName }) {
  let relativePath = `${dot.templatePath}/${config.paths.src.includes}/${fileName}`;
  let includePath = `${paths.src.includes}/${fileName}`;

  let filePath;

  if (fs.existsSync(includePath)) {
    filePath = `${includePath}.html`;
    if (fs.lstatSync(includePath).isDirectory()) {
      filePath = `${includePath}/${fileName}`;
    }
  }

  if (fs.existsSync(relativePath)) {
    filePath = `${relativePath}.html`;
    if (fs.lstatSync(relativePath).isDirectory()) {
      filePath = `${relativePath}/${fileName}`;
    }
  }

  data = require(`${filePath}.js`);
  delete require.cache[require.resolve(`${filePath}.js`)];
  filePath = `${filePath}.html`;

  return { filePath, data };
};

dot.defs.include = (fileName) => {
  const include = processInclude({ fileName });

  if (fs.existsSync(include.filePath)) {
    dot.defs[fileName] = include.data || {};
    return fs.readFileSync(include.filePath, 'utf8');
  } else {
    logger('red', `${fileName} not found`);
    return `${fileName} not found`;
  }
};
module.exports = dot;
