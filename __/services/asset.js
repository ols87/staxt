const fs = require('fs-extra');

const pageService = require(`./page`);
const styleService = require(`./style`);
const scriptService = require(`./script`);
const compileService = require('./compile');
const templateService = require('./template');

const paths = require('../helpers/paths');
const config = require('../helpers/config');
const getPaths = require('../helpers/get-paths');
const getFiles = require('../helpers/get-files');
const fileStrip = require('../helpers/file-strip');

const extension = config.dot.templateSettings.varname;

const assetServices = {
  js: scriptService,
  scss: styleService,
};

const pageAsset = async function renderPageAsset({ assetPaths, filePath }) {
  const pageData = pageService.prepareData({ filePath });

  if (!fs.existsSync(`${pageData.srcPath}.${assetPaths.fileExtension}`)) return;

  const filePaths = getPaths({
    fileData: pageData,
    fileExtension: assetPaths.fileExtension,
    distFile: assetPaths.distFile,
  });

  if (!filePaths) return;

  await compileService.pages({ filePath: pageData.filePath });

  return await assetServices[assetPaths.fileExtension](filePaths);
};

const templateIncludes = async function templateIncludesAsset({ filePath, fileExtension }) {
  let templateName = templateService.nameFromInclude({ filePath });
  let templateContent = templateService.getContent({ templateName, fileExtension });

  let includeName = templateService.sanitizePath({ filePath, fileExtension });
  let includeContent = templateService.nestedIncludeContent({ templateName, includeName });

  let defTest = new RegExp(`def\.${includeName}`, 'g');

  if (defTest.test(includeContent)) {
    await compileService.includes({ filePath: includeName });
  }

  if (templateContent.indexOf(`${config.paths.src.includes}/${includeName}`) > -1) {
    const templateData = templateService.filePaths({
      filePath: templateName,
      outDirectory: fileExtension,
    });

    const distFile = fileExtension === 'scss' ? '.css' : `.${fileExtension}`;

    const filePaths = getPaths({
      fileData: templateData,
      fileExtension,
      distFile,
    });

    return await assetServices[fileExtension](filePaths);
  }
};

const templateAsset = async function renderTemplateAsset({ filePath, fileExtension }) {
  if (filePath.indexOf(config.paths.src.includes) > -1) {
    return await templateIncludes({ filePath, fileExtension });
  }

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

  const pageList = templateService.getPages({ filePath });

  if (!filePaths) {
    let distPath = `${templateData.distPath}${distFile}`;

    if (fs.existsSync(distPath)) {
      fs.removeSync(distPath);

      for (let filePath of pageList) {
        let pageData = pageService.prepareData({ filePath });
        await compileService.pages({ filePath: pageData.filePath });
      }
    }

    return;
  }

  for (let filePath of pageList) {
    let pageData = pageService.prepareData({ filePath });
    await compileService.pages({ filePath: pageData.filePath });
  }

  return await assetServices[fileExtension](filePaths);
};

const includesAsset = async function renderIncludesAsset({ matchFile, directory, callback }) {
  const checkDirectory = getFiles({ directory });

  for (let filePath of checkDirectory) {
    let templateContent = fileStrip({ filePath });

    let includeName = matchFile.split(/\/|\\/).pop().split('.')[0];

    let defTest = new RegExp(`def\.${includeName}`, 'g');

    if (defTest.test(templateContent)) {
      await compileService.includes({ filePath: includeName });
    }

    if (templateContent.indexOf(`${config.paths.src.includes}/${includeName}`) > -1) {
      let returnCallback = callback;

      if (filePath.indexOf(`.${extension}.`) > -1) {
        returnCallback = compileService.pages;
      }

      filePath = filePath.replace(`${directory}/`, '');
      filePath = filePath.split('.')[0];
      filePath = filePath.split(/\/|\\/).pop();

      return await returnCallback({ filePath });
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
    const { main, templates, pages } = this;

    const srcFolders = [
      {
        directory: srcDirectory.assets[fileExtension],
        async callback() {
          return await main({
            fileExtension,
          });
        },
      },
      {
        directory: srcDirectory.templates,
        async callback({ filePath }) {
          return await templates({ filePath, fileExtension });
        },
      },
      {
        directory: srcDirectory.pages,
        async callback({ filePath }) {
          let distFile = fileExtension === 'js' ? '/scripts.js' : '/styles.css';

          return await pages({
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
