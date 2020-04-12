const fs = require('fs-extra');
const args = require('yargs').argv;

const paths = require('../helpers/paths');
const logger = require('../helpers/logger');
const timer = require('../helpers/timer');

module.exports = (path = args.t) => {
  const src = paths.src.templates;

  if (!path) {
    return logger('red', 'Please provide a template path e.g. -t=some/path');
  }

  const name = path.split('/').pop();

  if (fs.existsSync(`${src}/${path}`)) {
    return logger('red', `${name} template already exists`);
  }

  timer.start();

  const outFile = `${src}/${path}/${name}`;
  const html = `${__staxt}/files/default.html`;
  const template = `${outFile}.html`;

  fs.copySync(html, template);
  fs.ensureFileSync(`${outFile}.js`);
  fs.ensureFileSync(`${outFile}.scss`);

  timer.end().then((seconds) => {
    logger('green', `${name} template added in ${seconds} seconds`);
  });
};
