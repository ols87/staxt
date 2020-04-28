const fileExists = require('./file-exists');

module.exports = (fileData, extension, distFile) => {
  const fileName = fileData.name;
  const srcPath = `${fileData.srcPath}.${extension}`;
  const distPath = `${fileData.distPath}${distFile}`;
  const hasFile = fileExists(fileName, srcPath);

  return hasFile ? { fileName, srcPath, distPath } : false;
};
