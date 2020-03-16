const fs = require('fs-extra');

module.exports = function () {
  this.fileParser();

  let data = JSON.stringify({
    template: 'default'
  });

  data = data.replace(/"([^"]+)":/g, '$1:');

  const dataFile = `${this.filePath}.js`;
  const dataContent = `const data = ${data};\r\n\r\nmodule.exports = data;`;
  fs.outputFileSync(dataFile, dataContent);

  const scssFile = `${this.filePath}.scss`;
  const scssContent = `.${this.page}-page{}`;
  fs.outputFileSync(scssFile, scssContent);

  this.compile();
}