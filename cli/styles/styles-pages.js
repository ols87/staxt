const args = require('yargs').argv;

const assetsService = require(`${__staxt}/services/assets`);

module.exports = function stylesAssets(filePath = args.p) {
  assetsService.page({
    filePath,
    fileExtension: 'scss',
    distFile: '/styles.css',
  });
};
