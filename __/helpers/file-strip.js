const fs = require('fs-extra');

module.exports = function fileStrip({ filePath }) {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  fileContent = fileContent.replace(/\s/g, '');
  fileContent = fileContent.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '');

  return fileContent;
};
