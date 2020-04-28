const fs = require('fs-extra');

const paths = require(`${__staxt}/config/paths`);
const timer = require(`${__staxt}/helpers/timer`);
const logger = require(`${__staxt}/helpers/logger`);

module.exports = function removeModule(filePath, fileName, fileType, cleanFunction) {
  const srcDirectory = paths.src[fileType];

  if (!filePath) {
    return logger('red', `Provide a ${type} path e.g. -${type.charAt(0)}=some/path`);
  }

  if (!fs.existsSync(`${srcDirectory}/${filePath}`)) {
    return logger('red', `${fileName} ${type.slice(0, -1)} does not exist`);
  }

  timer.start();

  cleanFunction();

  timer.end().then((seconds) => {
    logger('green', `${fileName} ${type.slice(0, -1)} removed in ${seconds} seconds`);
  });
};
