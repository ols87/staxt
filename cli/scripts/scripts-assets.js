const args = require('yargs').argv;

const assetsService = require(`${__staxt}/services/assets`);
const scriptsService = require(`${__staxt}/services/scripts`);

module.exports = function scriptsAssets(filePath = args.a, outPath = args.o || filePath) {
  const filePaths = assetsService.filePaths({
    filePath,
    outPath,
    fileExtension: 'js',
  });

  if (!filePaths) return;

  scriptsService(filePaths);
};
