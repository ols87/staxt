const fs = require('fs-extra');

const pageService = require(`${__staxt}/services/page`);

const paths = require(`../helpers/paths`);
const timer = require(`../helpers/timer`);
const logger = require(`../helpers/logger`);

const fileFunctions = {
  async pages({ filePath, srcPath }) {
    const pageData = pageService.prepareData({ filePath });
    distPath = pageData.distPath;

    fs.removeSync(srcPath);
    fs.removeSync(distPath);

    return true;
  },

  async templates({ filePath, srcPath }) {
    let templateName = filePath.replace(paths.src.templates, '').replace(/\//g, '-');

    const assetsDist = paths.dist.assets;

    fs.removeSync(srcPath);
    fs.removeSync(`${assetsDist.js}/template-${templateName}.js`);
    fs.removeSync(`${assetsDist.css}/template-${templateName}.css`);

    return true;
  },

  async includes({ srcPath }) {
    fs.removeSync(srcPath);

    return true;
  },
};

module.exports = async function removeService({ filePath, directory }) {
  const srcDirectory = paths.src[directory];

  if (!filePath) {
    return logger('red', `Provide a ${directory} path e.g. -${directory.charAt(0)}=some/path`);
  }

  const srcPath = `${srcDirectory}/${filePath}`;

  if (!fs.existsSync(srcPath)) {
    return logger('red', `${filePath} ${directory.slice(0, -1)} does not exist`);
  }

  timer.start();

  await fileFunctions[directory]({ filePath, srcPath });

  timer.end().then((seconds) => {
    logger('green', `${filePath} ${directory.slice(0, -1)} removed in ${seconds} seconds`);
  });

  return true;
};
