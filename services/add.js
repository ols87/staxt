const fs = require('fs-extra');

const compileService = require(`${__staxt}/services/compile`);

const logger = require(`../helpers/logger`);
const timer = require(`../helpers/timer`);
const paths = require(`../helpers/paths`);
const config = require(`../helpers/config`);

const template = config.defaultTemplate;
const extension = config.dot.templateSettings.varname;

const fileFunctions = {
  async pages({ srcPath }) {
    const data = `module.exports = {\r\ntemplate: '${template}'\r\n}`;

    if (srcPath.indexOf('/index/index') > -1) {
      srcPath = srcPath.replace('/index', '');
    }

    fs.outputFileSync(`${srcPath}.${extension}.js`, data);
    fs.ensureFileSync(`${srcPath}.js`);
    fs.ensureFileSync(`${srcPath}.scss`);

    return true;
  },

  async templates({ srcPath }) {
    fs.ensureFileSync(`${srcPath}.html`);
    fs.ensureFileSync(`${srcPath}.js`);
    fs.ensureFileSync(`${srcPath}.scss`);

    return true;
  },

  async includes({ srcPath }) {
    return await this.templates({ srcPath });
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
    return logger('red', `${fileName} ${directory.slice(0, -1)} already exists`);
  }

  const srcPath = `${srcDirectory}/${filePath}/${fileName}`;

  timer.start();

  await fileFunctions[directory]({ srcPath });

  timer.end().then((seconds) => {
    logger('green', `${fileName} ${directory.slice(0, -1)} created in ${seconds} seconds`);
  });

  if (directory === 'pages') {
    return await compileService.pages({ filePath });
  }

  return true;
};
