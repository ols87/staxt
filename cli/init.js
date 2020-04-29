const fs = require('fs-extra');

const paths = require(`${__staxt}/helpers/paths`);
const timer = require(`${__staxt}/helpers/timer`);
const config = require(`${__staxt}/helpers/config`);
const logger = require(`${__staxt}/helpers/logger`);

const addPage = require('./add/add-pages');

const defaultTemplate = `${paths.src.templates}/${config.defaultTemplate}/${config.defaultTemplate}`;

const dirs = [
  paths.src.assets.base,
  paths.src.assets.images,
  paths.src.assets.js,
  paths.src.assets.scss,
  paths.src.includes,
  paths.dist.base,
];

const files = [`${paths.src.assets.scss}/main.scss`, `${paths.src.assets.js}/main.js`, `${defaultTemplate}.scss`, `${defaultTemplate}.js`];

module.exports = () => {
  timer.start();

  dirs.forEach((dir) => fs.ensureDirSync(dir));

  files.forEach((file) => fs.ensureFileSync(file));

  if (!fs.existsSync(`${paths.base}/staxt.config.js`)) {
    fs.copySync(`${__staxt}/staxt.config.js`, `${paths.base}/staxt.config.js`);
  }

  fs.copySync(`${__staxt}/files/template.html`, `${defaultTemplate}.html`);

  addPage('index');

  timer.end().then((seconds) => {
    logger('green', `Project init in ${seconds} seconds`);
  });
};
