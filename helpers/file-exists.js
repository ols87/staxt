const fs = require('fs-extra');

const logger = require('./logger');

const getExtention = function getfileExtension(filePath) {
  let fileName = filePath.split('/').pop();
  let fileExtension = fileName.split(/\.+/);

  fileExtension.shift();

  return fileExtension.join('.');
};

module.exports = function fileExists(filePath, srcPath) {
  let fileExtension = getExtention(srcPath);

  if (!fs.existsSync(srcPath)) {
    logger('red', `${filePath}.${fileExtension} does not exist`);
    return false;
  }

  if (!fs.readFileSync(srcPath, 'utf8')) {
    return false;
  }

  return true;
};
