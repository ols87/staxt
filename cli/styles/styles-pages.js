const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

module.exports = function stylesAssets(filePath = args.p) {
  assetService.pages({
    filePath,
    fileExtension: 'scss',
    distFile: '/styles.css',
  });
};
