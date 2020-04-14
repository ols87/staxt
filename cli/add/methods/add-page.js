const fs = require('fs-extra');
const args = require('yargs').argv;

const config = require(`${__staxt}/helpers/config`);

const add = require('../add.service');

const template = config.defaultTemplate;
const extension = config.dot.templateSettings.varname;

const type = 'pages';

module.exports = (path = args.p) => {
  const write = (file) => {
    const data = `module.exports = {\r\ntemplate: '${template}'\r\n}`;

    if (file.indexOf('/index/index') > -1) {
      file = file.replace('/index', '');
    }

    fs.outputFileSync(`${file}.${extension}.js`, data);
    fs.ensureFileSync(`${file}.js`);
    fs.ensureFileSync(`${file}.scss`);
  };

  add({ path, type, write });
};
