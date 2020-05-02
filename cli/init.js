const fs = require('fs-extra');
const args = require('yargs').argv;

const serve = require('./serve');
const addPage = require('./add/add-pages');

const paths = require(`../helpers/paths`);
const timer = require(`../helpers/timer`);
const config = require(`../helpers/config`);
const logger = require(`../helpers/logger`);

const dirs = [
  paths.src.assets.base,
  paths.src.assets.images,
  paths.src.assets.js,
  paths.src.assets.scss,
  paths.src.includes,
  paths.dist.base,
];

const defaultTemplate = `${paths.src.templates}/${config.defaultTemplate}/${config.defaultTemplate}`;
const templateFiles = [`${defaultTemplate}.scss`, `${defaultTemplate}.js`];

module.exports = function init() {
  timer.start();

  dirs.forEach((dir) => fs.ensureDirSync(dir));

  templateFiles.forEach((file) => fs.ensureFileSync(file));

  if (!fs.existsSync(`${paths.base}/staxt.config.js`)) {
    fs.copySync(`${__staxt}/files/staxt.config.js`, `${paths.base}/staxt.config.js`);
  }

  fs.copySync(`${__staxt}/files/main.scss`, `${paths.src.assets.scss}/main.scss`);
  fs.copySync(`${__staxt}/files/main.js`, `${paths.src.assets.js}/main.js`);

  fs.copySync(`${__staxt}/files/template.html`, `${defaultTemplate}.html`);

  addPage('index');

  timer.end().then((seconds) => {
    logger('green', `Project init in ${seconds} seconds`);

    if (args.s) {
      serve();
    }
  });
};
