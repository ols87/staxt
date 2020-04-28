const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);
const styleService = require(`${__staxt}/services/styles`);

module.exports = function stylesAssets(filePath = args.a, outPath = args.o || filePath) {
  const filePaths = assetService.filePaths({
    filePath,
    outPath,
    fileExtension: 'scss',
  });

  if (!filePaths) return;

  styleService(filePaths);
};
