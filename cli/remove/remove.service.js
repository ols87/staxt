const fs = require('fs-extra');

const paths = require(`${__staxt}/helpers/paths`);
const timer = require(`${__staxt}/helpers/timer`);
const logger = require(`${__staxt}/helpers/logger`);

module.exports = (args) => {
  const { path, name, type, clean } = args;
  const src = paths.src[type];

  if (!path) {
    return logger(
      'red',
      `Provide a ${type} path e.g. -${type.charAt(0)}=some/path`
    );
  }

  if (!fs.existsSync(`${src}/${path}`)) {
    return logger('red', `${name} ${type.slice(0, -1)} does not exist`);
  }

  timer.start();

  clean();

  timer.end().then((seconds) => {
    logger(
      'green',
      `${name} ${type.slice(0, -1)} removed in ${seconds} seconds`
    );
  });
};
