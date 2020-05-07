const fs = require('fs-extra');

const assetService = require('../services/asset');
const compileService = require('../services/compile');

const paths = require(`../helpers/paths`);
const config = require(`../helpers/config`);
const getFiles = require(`../helpers/get-files`);

module.exports = async function bundle() {
  fs.removeSync(paths.dist.base);
  fs.ensureDirSync(paths.dist.base);

  await config.hooks.bundle.before();

  const templates = getFiles({
    directory: paths.src.templates,
    excludes: ['includes'],
  });

  for (let filePath of templates) {
    if (filePath.indexOf('.scss') > -1) {
      await assetService.templates({ filePath, fileExtension: 'scss' });
    }

    if (filePath.indexOf('.js') > -1) {
      await assetService.templates({ filePath, fileExtension: 'js' });
    }

    if (filePath.indexOf('.html') > -1) {
      await compileService.templates({ filePath });
    }
  }

  await assetService.main({ fileExtension: 'scss' });

  await assetService.main({ fileExtension: 'js' });

  return await config.hooks.bundle.after();
};
