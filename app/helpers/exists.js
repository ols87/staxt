const fs = require('fs-extra');
const logger = require('./logger');

module.exports = (name, file) => {
  let ext = file.split('/').pop();
  ext = ext.split(/\.+/);
  ext.shift();
  ext = ext.join('.');

  if (!fs.existsSync(file)) {
    logger('red', `${name}.${ext} does not exist`);
    return process.exit();
  }

  if (!fs.readFileSync(file, 'utf8')) {
    logger('yellow', `${name}.${ext} is empty, skipping...`);
    return false;
  }

  return true;
};
