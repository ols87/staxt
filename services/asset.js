const pageService = require(`./page`);
const styleService = require(`./style`);
const compileService = require('./compile');
const scriptService = require(`./script`);

const paths = require('../helpers/paths');
const getPaths = require('../helpers/get-paths');
const fileExists = require('../helpers/file-exists');

const pageAsset = function renderPageAsset(assetPaths, filePath) {
  const pageData = pageService.prepareData(filePath);

  const filePaths = getPaths({
    fileData: pageData,
    fileExtension: assetPaths.fileExtension,
    distPath: assetPaths.distFile,
  });

  if (!filePaths) return;

  const assetServices = {
    js: scriptService,
    scss: styleService,
  };

  compileService.page(pageData.name);

  assetServices[assetPaths.fileExtension](filePaths);
};

module.exports = assetService = {
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

  page(assetPaths) {
    const { filePath } = assetPaths;
    const cliArgs = pageService.parsePath(filePath);

    if (typeof filePath !== 'string') {
      pageService.getFolder(cliArgs, filePath).forEach((pagePath) => {
        pageAsset(assetPaths, pagePath);
      });

      return;
    }

    if (cliArgs.hasPath && !cliArgs.isFolder) {
      pageAsset(assetPaths, filePath);
    }
  },
};
