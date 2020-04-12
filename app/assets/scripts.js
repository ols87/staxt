const fs = require('fs-extra');
const paths = require('../helpers/paths');
const scripts = require('../helpers/scripts');

const src = paths.src.assets.js;
const dist = paths.dist.assets.js;

module.exports = () => {
  if (!fs.existsSync(`${src}/main.js`)) {
    return logger('red', `Missing main.js file`);
  }

  scripts({
    name: 'main',
    file: `${src}/main.js`,
    outFile: `${dist}/main.js`,
  });
};
