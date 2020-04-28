const getFiles = require('../helpers/get-files');
const fileExists = require('../helpers/file-exists');
const paths = require('../helpers/paths');

module.exports = assetsService = {
  getFiles(fileExtension) {
    return getFiles({
      directory: paths.src.assets[fileExtension],
      includes: [`.${fileExtension}`],
    });
  },

  filePaths({ filePath, outPath, fileExtension }) {
    const srcDirectory = paths.src.assets[fileExtension];
    const distDirectory = paths.dist.assets[fileExtension];

    if (typeof filePath !== 'string') {
      filePath = 'main';
      outPath = 'main';
    }

    const srcPath = `${srcDirectory}/${filePath}.${fileExtension}`;
    const distPath = `${distDirectory}/${outPath}.${fileExtension}`;

    const hasFile = fileExists(filePath, srcPath);

    return hasFile ? { filePath, srcPath, distPath } : false;
  },
};
