const stylesService = require(`./styles`);
const scriptsService = require(`./scripts`);
const pagesService = require(`./pages`);

const paths = require('../helpers/paths');
const getFiles = require('../helpers/get-files');
const fileExists = require('../helpers/file-exists');
const getPaths = require('../helpers/get-paths');

const pageAsset = function renderPageAsset(assetPaths, filePath) {
  const pageData = pagesService.prepareData(filePath);

  const filePaths = getPaths({
    fileData: pageData,
    fileExtension: assetPaths.fileExtension,
    distPath: assetPaths.distFile,
  });

  if (!filePaths) return;

  const assetServices = {
    js: scriptsService,
    scss: stylesService,
  };

  assetServices[assetPaths.fileExtension](filePaths);
};

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

  page(assetPaths) {
    const { filePath } = assetPaths;
    const cliArgs = pagesService.parsePath(filePath);

    if (typeof filePath !== 'string') {
      pagesService.getFolder(cliArgs, filePath).forEach((pagePath) => {
        pageAsset(assetPaths, pagePath);
      });

      return;
    }

    if (cliArgs.hasPath && !cliArgs.isFolder) {
      pageAsset(assetPaths, filePath);
    }
  },
};
