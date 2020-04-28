const fs = require('fs-extra');
const args = require('yargs').argv;

const config = require(`${__staxt}/config/config`);
const add = require('../add');

const template = config.defaultTemplate;
const extension = config.dot.templateSettings.varname;

module.exports = (path = args.p) => {
  add(path, 'pages', (srcPath) => {
    const data = `module.exports = {\r\ntemplate: '${template}'\r\n}`;

    if (srcPath.indexOf('/index/index') > -1) {
      srcPath = srcPath.replace('/index', '');
    }

    fs.outputFileSync(`${srcPath}.${extension}.js`, data);
    fs.ensureFileSync(`${srcPath}.js`);
    fs.ensureFileSync(`${srcPath}.scss`);
  });
};
