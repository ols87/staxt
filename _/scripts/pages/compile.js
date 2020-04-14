const fs = require('fs-extra');
const args = require('yargs').argv;

const dot = require('../../helpers/dot');
const page = require('../../helpers/page');
const paths = require('../../helpers/paths');
const glob = require('../../helpers/glob');
const timer = require('../../helpers/timer')();
const logger = require('../../helpers/logger');

function compile(path = args.p) {
  const { name, data, dist } = page(path);

  const output = `${paths.dist.base}/${dist}/index.html`;

  if (!fs.existsSync(`${data.template}.html`)) {
    logger('red', `Cannot resolve template file path for ${name} page`);
    process.exit();
  }

  const contents = fs.readFileSync(`${data.template}.html`, 'utf8');

  if (!contents) {
    logger('red', `${name} is referencing an inavlid or empty template`);
    process.exit();
  }

  const compile = dot.template(contents, dot.templateSettings, dot.defs);
  const html = compile(data);
  fs.outputFileSync(output, html);
}

module.exports = function (path = args.p) {
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
    includes: ['.js'],
  });

  timer.start();

  pages.forEach((page) => {
    page = page.replace(`${paths.src.pages}/`, '');
    const path = page.replace('.js', '');
    compile(path);
  });

  timer.end().then((seconds) => {
    const msg = isFolder ? folderName : 'All';
    logger('green', `${msg} pages compiled in ${seconds} seconds`);
  });
};
