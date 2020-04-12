const fs = require('fs-extra');
const concat = require('concat');

const paths = require('../helpers/paths');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');
const config = require('../helpers/config');

module.exports = () => {
  const src = paths.src.assets.js;
  const dist = paths.dist.assets.js;

  timer.start();

  const libs = config.libs.map((lib) => {
    lib = lib.replace('.js', '');
    lib = `${src}/${lib}.js`;
    return lib;
  });

  if (config.dot.runtime) {
    libs.push(`${__staxt}/node_modules/dot/doT.min.js`);
  }

  if (libs.length > 0) {
    concat(libs, `${dist}/libs.js`).then(() => {
      if (config.dot.runtime) {
        fs.appendFileSync(
          `${dist}/libs.js`,
          `doT.templateSettings.varname = '${config.dot.templateSettings.varname}';`
        );
      }

      timer.end().then((seconds) => {
        logger('green', `JS libs compiled in ${seconds} seconds`);
      });
    });
  }
};
