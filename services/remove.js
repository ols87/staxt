const fs = require('fs-extra');

const pageService = require(`${__staxt}/services/page`);

const paths = require(`../helpers/paths`);
const timer = require(`../helpers/timer`);
const logger = require(`../helpers/logger`);

const fileFunctions = {
  pages({ filePath, srcPath }) {
    const pageData = pageService.prepareData({ filePath });
    distPath = pageData.distPath;

    fs.removeSync(srcPath);
    fs.removeSync(distPath);
  },

  templates({ filePath, srcPath }) {
    let templateName = filePath.replace(paths.src.templates, '').replace(/\//g, '-');

    const assetsDist = paths.dist.assets;

    fs.removeSync(srcPath);
    fs.removeSync(`${assetsDist.js}/template-${templateName}.js`);
    fs.removeSync(`${assetsDist.css}/template-${templateName}.css`);
  },

  includes({ srcPath }) {
    fs.removeSync(srcPath);
  },
};

module.exports = function removeService({ filePath, directory }) {
  const fileName = filePath.split('/').pop();

  const srcDirectory = paths.src[directory];

  if (!filePath) {
    return logger('red', `Provide a ${directory} path e.g. -${directory.charAt(0)}=some/path`);
  }

  const srcPath = `${srcDirectory}/${filePath}`;

  if (!fs.existsSync(srcPath)) {
    return logger('red', `${fileName} ${directory.slice(0, -1)} does not exist`);
  }

  timer.start();

  fileFunctions[directory]({ filePath, srcPath });

  timer.end().then((seconds) => {
    logger('green', `${fileName} ${directory.slice(0, -1)} removed in ${seconds} seconds`);
  });
};
