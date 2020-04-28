const fs = require('fs-extra');

const logger = require('./logger');

const getExtention = function getFileExtension(filePath) {
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
    logger('yellow', `${filePath}.${fileExtension} is empty, skipping...`);
    return false;
  }

  return true;
};
