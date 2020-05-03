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

const assetServices = {
  js: scriptService,
  scss: styleService,
};

const pageAsset = async function renderPageAsset({ assetPaths, filePath }) {
  const pageData = pageService.prepareData({ filePath });

  const filePaths = getPaths({
    fileData: pageData,
    fileExtension: assetPaths.fileExtension,
    distFile: assetPaths.distFile,
  });

  if (!filePaths) return;

  await compileService.pages({ filePath: pageData.filePath });

  return await assetServices[assetPaths.fileExtension](filePaths);
};

const templateAsset = async function renderTemplateAsset({ filePath, fileExtension }) {
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

  for (let filePath of pageList) {
    let pageData = pageService.prepareData({ filePath });
    await compileService.pages({ filePath: pageData.filePath });
  }

  return await assetServices[fileExtension](filePaths);
};

const includesAsset = async function renderIncludesAsset({ matchFile, directory, callback }) {
  const checkDirectory = getFiles({ directory });

  for (let filePath of checkDirectory) {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    fileContent = fileContent.replace(/\s/g, '');
    fileContent = fileContent.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)/g, '');

    if (fileContent.indexOf(`${config.paths.src.includes}/${matchFile}`) > -1) {
      filePath = filePath.replace(`${directory}/`, '');
      filePath = filePath.split('.')[0];
      filePath = filePath.split('/').pop();
      return await callback({ filePath });
    }
  }

  return true;
};

module.exports = assetService = {
  async main({ fileExtension }) {
    const srcDirectory = paths.src.assets[fileExtension];
    const distDirectory = paths.dist.assets[fileExtension];

    const srcPath = `${srcDirectory}/main.${fileExtension}`;
    const distPath = `${distDirectory}/main.${fileExtension}`;

    return await assetServices[fileExtension]({ filePath: 'main', srcPath, distPath });
  },

  async pages(assetPaths) {
    const { filePath } = assetPaths;
    const argument = pageService.parsePath({ filePath });

    if (typeof filePath !== 'string') {
      const pageList = pageService.getFolder({ argument, filePath });

      for (let filePath of pageList) {
        await pageAsset({ assetPaths, filePath });
      }
    }

    if (argument.hasPath && !argument.isFolder) {
      await pageAsset({ assetPaths, filePath });
    }
  },

  async templates({ filePath, fileExtension }) {
    if (typeof filePath === 'string') {
      return await templateAsset({ filePath, fileExtension });
    }

    const templateList = templateService.getAll({ fileExtension });

    for (let filePath of templateList) {
      await templateAsset({ filePath, fileExtension });
    }

    return true;
  },

  async includes({ filePath, fileExtension }) {
    const srcDirectory = paths.src;

    const srcFolders = [
      {
        directory: srcDirectory.assets[fileExtension],
        async callback() {
          return await this.main({
            fileExtension,
          });
        },
      },
      {
        directory: srcDirectory.templates,
        async callback({ filePath }) {
          return await this.templates({ filePath, fileExtension });
        },
      },
      {
        directory: srcDirectory.pages,
        async callback({ filePath }) {
          let distFile = fileExtension === 'js' ? '/scripts.js' : '/styles.css';

          return await this.pages({
            filePath,
            fileExtension,
            distFile,
          });
        },
      },
    ];

    for (let folder of srcFolders) {
      folder.matchFile = filePath;
      await includesAsset(folder);
    }
  },
};
