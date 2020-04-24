const args = require('yargs').argv;

const paths = require(`${__staxt}/helpers/paths`);
const glob = require(`${__staxt}/helpers/glob`);
const timer = require(`${__staxt}/helpers/timer`);
const logger = require(`${__staxt}/helpers/logger`);
const config = require(`${__staxt}/helpers/config`);

const compile = require('../compile.service');

const extension = config.dot.templateSettings.varname;

module.exports = (path = args.p) => {
  const isFolder = path ? path.indexOf('/*') > 0 : false;

  if (path && !isFolder) {
    timer.start();

    if (!compile.page(path)) return;

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
    path = compile.pathName(path);
    if (!compile.page(path)) return;
  });

  timer.end().then((seconds) => {
    const msg = isFolder ? folderName : 'All';
    logger('green', `${msg} pages compiled in ${seconds} seconds`);
  });
};
