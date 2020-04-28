const fs = require('fs-extra');

const logger = require('./logger');

const getExtention = function getFileExtension(filePath) {
  let fileName = filePath.split('/').pop();
  let fileExtension = fileName.split(/\.+/);

  fileExtension.shift();

  return fileExtension.join('.');
};

module.exports = function fileExists(fileName, filePath) {
  let fileExtension = getExtention(filePath);

  if (!fs.existsSync(filePath)) {
    logger('red', `${fileName}.${fileExtension} does not exist`);
    return false;
  }

  if (!fs.readFileSync(filePath, 'utf8')) {
    logger('yellow', `${fileName}.${fileExtension} is empty, skipping...`);
    return false;
  }

  return true;
};
