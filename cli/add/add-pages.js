const fs = require('fs-extra');
const args = require('yargs').argv;

const addService = require(`${__staxt}/services/add`);

const config = require(`${__staxt}/helpers/config`);

const template = config.defaultTemplate;
const extension = config.dot.templateSettings.varname;

const directory = 'pages';

const outFunction = function outPutPageFiles({ fileName, srcPath }) {
  const data = `module.exports = {\r\ntemplate: '${template}'\r\n}`;

  if (srcPath.indexOf('/index/index') > -1) {
    srcPath = srcPath.replace('/index', '');
  }

  fs.outputFileSync(`${srcPath}.${extension}.js`, data);
  fs.ensureFileSync(`${srcPath}.js`);
  fs.ensureFileSync(`${srcPath}.scss`);

  compileService.page(fileName);
};

module.exports = (filePath = args.p) => {
  addService({
    filePath,
    directory,
    outFunction,
  });
};
