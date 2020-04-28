const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

module.exports = function stylesAssets(filePath = args.a, outPath = args.o || filePath) {
  assetService.main({
    filePath,
    outPath,
    fileExtension: 'scss',
  });
};
