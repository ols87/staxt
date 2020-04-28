const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

module.exports = function stylesAssets(filePath = args.p) {
  assetService.page({
    filePath,
    fileExtension: 'scss',
    distFile: '/styles.css',
  });
};
