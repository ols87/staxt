const fs = require('fs-extra');

const logger = require(`../helpers/logger`);
const timer = require(`../helpers/timer`);
const paths = require(`../helpers/paths`);
const config = require(`../helpers/config`);

const extension = config.dot.templateSettings.varname;

module.exports = function addService(filePath, fileType, outFunction) {
  const srcDirectory = paths.src[type];

  if (!filePath) {
    return logger('red', `Provide a ${fileType} path e.g. -${fileType.charAt(0)}=some/path`);
  }

  const fileName = filePath.split('/').pop();

  if (fileName === 'index') {
    if (fs.existsSync(`${srcDirectory}/index.${extension}.js`)) {
      return logger('red', `index page already exists`);
    }
  }

  if (fs.existsSync(`${srcDirectory}/${filePath}`)) {
    return logger('red', `${fileName} ${fileType.slice(0, -1)} already exists`);
  }

  const srcPath = `${srcDirectory}/${filePath}/${fileName}`;

  timer.start();

  outFunction(srcPath);

  timer.end().then((seconds) => {
    logger('green', `${fileName} ${fileType.slice(0, -1)} created in ${seconds} seconds`);
  });
};
