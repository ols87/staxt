const fs = require('fs-extra');

const paths = require(`${__staxt}/config/paths`);
const timer = require(`${__staxt}/helpers/timer`);
const logger = require(`${__staxt}/helpers/logger`);

module.exports = (path, name, type, cleanFn) => {
  const src = paths.src[type];

  if (!path) {
    return logger('red', `Provide a ${type} path e.g. -${type.charAt(0)}=some/path`);
  }

  if (!fs.existsSync(`${src}/${path}`)) {
    return logger('red', `${name} ${type.slice(0, -1)} does not exist`);
  }

  timer.start();

  cleanFn();

  timer.end().then((seconds) => {
    logger('green', `${name} ${type.slice(0, -1)} removed in ${seconds} seconds`);
  });
};
