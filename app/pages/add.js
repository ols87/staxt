const fs = require('fs-extra');
const args = require('yargs').argv;

const config = require('../helpers/config');
const add = require('../helpers/add');

const extension = config.dot.templateSettings.varname;

module.exports = (path = args.p) => {
  add({
    path: path,
    type: 'pages',
    outPut: (file) => {
      const data = `module.exports = {\r\ntemplate: '${config.defaultTemplate}'\r\n}`;

      if (file.indexOf('/index/index') > -1) {
        file = file.replace('/index', '');
      }

      fs.outputFileSync(`${file}.${extension}.js`, data);
      fs.ensureFileSync(`${file}.js`);
      fs.ensureFileSync(`${file}.scss`);
    },
  });
};
