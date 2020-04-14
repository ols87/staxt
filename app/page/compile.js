const args = require('yargs').argv;
const compile = require('../helpers/compile');

const paths = require('../helpers/paths');
const glob = require('../helpers/glob');
const timer = require('../helpers/timer');
const logger = require('../helpers/logger');
const config = require('../helpers/config');

const extension = config.dot.templateSettings.varname;

module.exports = (path = args.p) => {
  const isFolder = path ? path.indexOf('/*') > 0 : false;

  if (path && !isFolder) {
    timer.start();

    compile(path);

    timer.end().then((seconds) => {
      logger('green', `${path} page compiled in ${seconds} seconds`);
    });

    return;
  }

  let globFolder = paths.src.pages;
  let folderName;

  if (isFolder) {
    folderName = path.replace('/*', '');
    globFolder = `${paths.src.pages}/${folderName}`;
  }

  const pages = glob({
    dir: globFolder,
    includes: [`.${extension}.js`],
  });

  timer.start();

  pages.forEach((path) => {
    path = path.replace(`${paths.src.pages}/`, '');
    path = path.replace(`.${extension}.js`, '');
    path = [...new Set(path.split('/'))].join('/');
    compile(path);
  });

  timer.end().then((seconds) => {
    const msg = isFolder ? folderName : 'All';
    logger('green', `${msg} pages compiled in ${seconds} seconds`);
  });
};
