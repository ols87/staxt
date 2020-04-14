const fs = require('fs-extra');
const paths = require('../helpers/paths');
const scripts = require('../helpers/scripts');

const src = paths.src.assets.js;
const dist = paths.dist.assets.js;

module.exports = () => {
  if (!fs.existsSync(`${src}/main.js`)) {
    return logger('red', `Missing main.js file`);
  }

  const name = 'main';
  const file = `${src}/main.js`;
  const outFile = `${dist}/main.js`;

  scripts({ name, file, outFile });
};
