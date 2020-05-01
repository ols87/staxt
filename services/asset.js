const pageService = require(`./page`);
const styleService = require(`./style`);
const scriptService = require(`./script`);
const compileService = require('./compile');
const templateService = require('./template');

const paths = require('../helpers/paths');
const getPaths = require('../helpers/get-paths');
const fileExists = require('../helpers/file-exists');

const assetServices = {
  js: scriptService,
  scss: styleService,
};

const pageAsset = function renderPageAsset({ assetPaths, filePath }) {
  const pageData = pageService.prepareData({ filePath });

  const filePaths = getPaths({
    fileData: pageData,
    fileExtension: assetPaths.fileExtension,
    distFile: assetPaths.distFile,
  });

  if (!filePaths) return;

  compileService.pages({ filePath: pageData.filePath });

  assetServices[assetPaths.fileExtension](filePaths);
};

const templateAsset = function renderTemplateAsset({ filePath, fileExtension }) {
  filePath = templateService.sanitizePath({ filePath, fileExtension });

  const templateData = templateService.filePaths({
    filePath,
    outDirectory: fileExtension,
  });

  const distFile = fileExtension === 'scss' ? '.css' : `.${fileExtension}`;

  const filePaths = getPaths({
    fileData: templateData,
    fileExtension,
    distFile,
  });

  if (!filePaths) return;

  const pageList = templateService.getPages({ filePath });

  pageList.forEach((filePath) => {
    let pageData = pageService.prepareData({ filePath });
    compileService.pages({ filePath: pageData.filePath });
  });

  assetServices[fileExtension](filePaths);
};

module.exports = assetService = {
  main({ filePath, outPath, fileExtension }) {
    const srcDirectory = paths.src.assets[fileExtension];
    const distDirectory = paths.dist.assets[fileExtension];

    if (typeof filePath !== 'string') {
      filePath = 'main';
      outPath = 'main';
    }

    const srcPath = `${srcDirectory}/${filePath}.${fileExtension}`;
    const distPath = `${distDirectory}/${outPath}.${fileExtension}`;

    if (!fileExists(filePath, srcPath)) return;

    assetsServices[fileExtension]({ filePath, srcPath, distPath });
  },

  pages(assetPaths) {
    const { filePath } = assetPaths;
    const argument = pageService.parsePath({ filePath });

    if (typeof filePath !== 'string') {
      return pageService.getFolder({ argument, filePath }).forEach((filePath) => {
        pageAsset({ assetPaths, filePath });
      });
    }

    if (argument.hasPath && !argument.isFolder) {
      pageAsset({ assetPaths, filePath });
    }
  },

  templates({ filePath, fileExtension }) {
    if (typeof filePath === 'string') {
      return templateAsset({ filePath, fileExtension });
    }

    templateService.getAll({ fileExtension }).forEach((filePath) => {
      return templateAsset({ filePath, fileExtension });
    });
  },
};
