const fs = require('fs-extra');

module.exports = function () {
  this.fileParser('add');

  let data = JSON.stringify({
    template: 'default'
  });

  data = data.replace(/"([^"]+)":/g, '$1:');

  const dataFile = `${this.filePath}.js`;
  const dataContent = `const data = ${data};\r\n\r\nmodule.exports = data;`;
  fs.outputFile(dataFile, dataContent);

  const scssFile = `${this.filePath}.scss`;
  const scssContent = `.${this.page}-page{}`;
  fs.outputFile(scssFile, scssContent);

  this.compile();
}