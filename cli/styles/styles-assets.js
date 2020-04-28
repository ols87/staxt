const args = require('yargs').argv;

const assetsService = require(`${__staxt}/services/assets`);
const stylesService = require(`${__staxt}/services/styles`);

module.exports = function stylesAssets(filePath = args.a, outPath = args.o || filePath) {
  const filePaths = assetsService.filePaths({
    filePath,
    outPath,
    fileExtension: 'scss',
  });

  if (!filePaths) return;

  stylesService(filePaths);
};
