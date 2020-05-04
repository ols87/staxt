const fs = require('fs-extra');
const args = require('yargs').argv;

const compileService = require(`${__staxt}/services/compile`);

const logger = require(`../helpers/logger`);
const timer = require(`../helpers/timer`);
const paths = require(`../helpers/paths`);
const config = require(`../helpers/config`);

const defaultTemplate = config.defaultTemplate;
const extension = config.dot.templateSettings.varname;

const assetFiles = function addAssetFiles({srcPath, directory}){
    if(config.defaultFiles[directory].js) {
      fs.ensureFileSync(`${srcPath}.js`);
    }

    if(config.defaultFiles[directory].scss) {
      fs.ensureFileSync(`${srcPath}.scss`);
    }
}

const fileFunctions = {
  async pages({ srcPath }) {
    const template = typeof args.t === 'string' ? args.t : defaultTemplate;
    const data = `module.exports = {\r\ntemplate: '${template}'\r\n}`;

    if (srcPath.indexOf('/index/index') > -1) {
      srcPath = srcPath.replace('/index', '');
    }

    fs.outputFileSync(`${srcPath}.${extension}.js`, data);
   
    assetFiles({ srcPath, directory: 'pages' });

    return true;
  },

  async templates({ srcPath }) {
    fs.copySync(`${__staxt}/files/template.html`, `${srcPath}.html`);

    fs.ensureFileSync(`${srcPath}.html`);

    assetFiles({ srcPath, directory: 'templates' });

    return true;
  },

  async includes({ srcPath }) {
    fs.ensureFileSync(`${srcPath}.html`);

    assetFiles({ srcPath, directory: 'includes' });

    return true;
  },
};

module.exports = async function addService({ filePath, directory }) {
  const srcDirectory = paths.src[directory];

  if (!filePath || typeof filePath !== 'string') {
    return logger('red', `Provide a ${directory} path e.g. -${directory.charAt(0)}=path`);
  }

  const fileName = filePath.split('/').pop();

  if (fileName === 'index') {
    if (fs.existsSync(`${srcDirectory}/index.${extension}.js`)) {
      return logger('red', `index page already exists`);
    }
  }

  if (fs.existsSync(`${srcDirectory}/${filePath}`)) {
    return logger('red', `${filePath} ${directory.slice(0, -1)} already exists`);
  }

  const srcPath = `${srcDirectory}/${filePath}/${fileName}`;

  timer.start();

  await fileFunctions[directory]({ srcPath });

  timer.end().then((seconds) => {
    logger('green', `${filePath} ${directory.slice(0, -1)} created in ${seconds} seconds`);
  });

  if (directory === 'pages') {
    return await compileService.pages({ filePath });
  }

  return true;
};
