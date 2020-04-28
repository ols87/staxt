const fileExists = require('./file-exists');

module.exports = function getPaths({ fileData, fileExtension, distFile }) {
  const filePath = fileData.name;

  const srcPath = `${fileData.srcPath}.${fileExtension}`;
  const distPath = `${fileData.distPath}${distFile}`;

  const hasFile = fileExists(filePath, srcPath);

  return hasFile ? { filePath, srcPath, distPath } : false;
};
