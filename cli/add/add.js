const fs = require('fs-extra');

const logger = require(`${__staxt}/helpers/logger`);
const timer = require(`${__staxt}/helpers/timer`);
const paths = require(`${__staxt}/config/paths`);

module.exports = (path, type, outFn) => {
  const src = paths.src[type];

  if (!path) {
    return logger('red', `Provide a ${type} path e.g. -${type.charAt(0)}=some/path`);
  }

  const name = path.split('/').pop();

  if (name === 'index') {
    if (fs.existsSync(`${src}/index.xt.js`)) {
      return logger('red', `index page already exists`);
    }
  }

  if (fs.existsSync(`${src}/${path}`)) {
    return logger('red', `${name} ${type.slice(0, -1)} already exists`);
  }

  const srcPath = `${src}/${path}/${name}`;

  timer.start();

  outFn(srcPath);

  timer.end().then((seconds) => {
    logger('green', `${name} ${type.slice(0, -1)} created in ${seconds} seconds`);
  });
};
