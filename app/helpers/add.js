const fs = require('fs-extra');

const logger = require('../helpers/logger');
const timer = require('../helpers/timer');
const paths = require('../helpers/paths');

module.exports = (args) => {
  const { path, type, outPut } = args;
  const src = paths.src[`${type}s`];

  if (!path) {
    return logger(
      'red',
      `Please provide a ${type} path e.g. -${type.charAt(0)}=some/path`
    );
  }

  const name = path.split('/').pop();

  if (fs.existsSync(`${src}/${path}`)) {
    return logger('red', `${name} ${type} already exists`);
  }

  const file = `${src}/${path}/${name}`;

  timer.start();

  outPut(file);

  timer.end().then((seconds) => {
    logger('green', `${name} ${type} created in ${seconds} seconds`);
  });
};
