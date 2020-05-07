const fs = require('fs-extra');

module.exports = function getPaths({ fileData, fileExtension, distFile }) {
  const filePath = fileData.name;

  const srcPath = `${fileData.srcPath}.${fileExtension}`;
  const distPath = `${fileData.distPath}${distFile}`;

  if (!fs.existsSync(srcPath)) {
    return false;
  }

  if (!fs.readFileSync(srcPath, 'utf8')) {
    return false;
  }

  return { filePath, srcPath, distPath };
};
