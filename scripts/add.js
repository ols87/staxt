const fs = require('fs-extra');
const args = require('yargs').argv;

const paths = require('../helpers/paths');
const compile = require('./compile');

module.exports = function () {
  const path = args.p;
  const template = args.t;
  const page = path.split("/").pop();
  const filePath = `${path}/${page}`;
  const outPath = `${paths.src.pages}/${filePath}`;

  let data = JSON.stringify({
    template: template
  }).replace(/"([^"]+)":/g, '$1:');

  const dataFile = `${outPath}.js`;
  const dataContent = `const data = ${data};\r\n\r\nmodule.exports = data;`;
  fs.outputFileSync(dataFile, dataContent);

  const scssFile = `${outPath}.scss`;
  fs.ensureFileSync(scssFile);

  compile(filePath);
}