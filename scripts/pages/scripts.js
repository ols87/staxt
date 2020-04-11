const browserify = require('browserify');
const babelify = require('babelify');
const partialify = require('partialify');
const args = require('yargs').argv;

const paths = require('../../helpers/paths');
const _page = require('../../helpers/page');
const timer = require('../../helpers/timer')();
const logger = require('../../helpers/logger');

module.exports = (path = args.p) => {
  if (!path) {
    return logger('red', `No path given. use -p=some/path`);
  }

  const page = _page(path);

  browserify(page)
    .transform(partialify)
    .transform(babelify, {
      cwd: __staxt,
      presets: ['@babel/preset-env', 'minify'],
    })
    .bundle()
    .pipe(fs.createWriteStream(`${paths.dist.base}/${page.dist}/scripts.js`))
    .on('finish', () => {
      timer.end().then((seconds) => {
        logger('green', `${page.name} scripts compiled in ${seconds} seconds`);
      });
    });
};
