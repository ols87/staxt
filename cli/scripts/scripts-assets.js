const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);
const scriptService = require(`${__staxt}/services/script`);

module.exports = function scriptsAssets(filePath = args.a, outPath = args.o || filePath) {
  const filePaths = assetService.filePaths({
    filePath,
    outPath,
    fileExtension: 'js',
  });

  if (!filePaths) return;

  scriptService(filePaths);
};
