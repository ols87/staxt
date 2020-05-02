const fs = require('fs-extra');
const args = require('yargs').argv;

const serve = require('./serve');
const addPage = require('./add/add-pages');

const paths = require(`../helpers/paths`);
const timer = require(`../helpers/timer`);
const config = require(`../helpers/config`);
const logger = require(`../helpers/logger`);
const config = require(`../helpers/config`);

const extension = config.dot.templateSettings.varname;

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

module.exports = async function init() {
  config.hooks.init.before();

  timer.start();

  dirs.forEach((dir) => fs.ensureDirSync(dir));

  templateFiles.forEach((file) => fs.ensureFileSync(file));

  if (!fs.existsSync(`${paths.base}/staxt.config.js`)) {
    fs.copySync(`${__staxt}/files/staxt.config.js`, `${paths.base}/staxt.config.js`);
  }

  fs.copySync(`${__staxt}/files/main.scss`, `${paths.src.assets.scss}/main.scss`);
  fs.copySync(`${__staxt}/files/main.js`, `${paths.src.assets.js}/main.js`);

  fs.copySync(`${__staxt}/files/template.html`, `${defaultTemplate}.html`);

  const templateContent = fs.readFileSync(`${defaultTemplate}.html`, 'utf8').replace(/xt\./g, `${extension}.`);
  fs.outputFileSync(`${defaultTemplate}.html`, templateContent, 'utf8');

  await addPage('index');

  return timer.end().then((seconds) => {
    logger('green', `Project init in ${seconds} seconds`);

    if (args.s) {
      await serve();
    }
    
    return await config.hooks.init.after();
  });
};
