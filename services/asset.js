const fs = require('fs');

const pageService = require(`./page`);
const styleService = require(`./style`);
const scriptService = require(`./script`);
const compileService = require('./compile');
const templateService = require('./template');

const config = require('../helpers/config');
const paths = require('../helpers/paths');
const getPaths = require('../helpers/get-paths');
const getFiles = require('../helpers/get-files');
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

const includesAsset = function renderIncludesAsset({ matchFile, directory, callback }) {
  const checkDirectory = getFiles({ directory });

  checkDirectory.forEach((filePath) => {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    fileContent = fileContent.replace(/\s/g, '');
    fileContent = fileContent.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '');

    if (fileContent.indexOf(`${config.paths.src.includes}/${matchFile}`) > -1) {
      filePath = filePath.replace(`${directory}/`, '');
      filePath = filePath.split('.')[0];
      filePath = filePath.split('/').pop();
      callback({ filePath });
    }
  });
};

module.exports = assetService = {
  main({ fileExtension }) {
    const srcDirectory = paths.src.assets[fileExtension];
    const distDirectory = paths.dist.assets[fileExtension];

    const srcPath = `${srcDirectory}/main.${fileExtension}`;
    const distPath = `${distDirectory}/main.${fileExtension}`;

    assetServices[fileExtension]({ filePath: 'main', srcPath, distPath });
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

  includes({ filePath, fileExtension }) {
    const srcDirectory = paths.src;

    const srcFolders = [
      {
        directory: srcDirectory.assets[fileExtension],
        callback: () =>
          this.main({
            fileExtension,
          }),
      },
      {
        directory: srcDirectory.templates,
        callback: ({ filePath }) => this.templates({ filePath, fileExtension }),
      },
      {
        directory: srcDirectory.pages,
        callback: ({ filePath }) => {
          let distFile = fileExtension === 'js' ? '/scripts.js' : '/styles.css';

          this.pages({
            filePath,
            fileExtension,
            distFile,
          });
        },
      },
    ];

    srcFolders.forEach((folder) => {
      folder.matchFile = filePath;
      includesAsset(folder);
    });
  },
};
