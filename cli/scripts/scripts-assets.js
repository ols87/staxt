const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);
const scriptService = require(`${__staxt}/services/script`);

module.exports = function scriptsAssets(filePath = args.a, outPath = args.o || filePath) {
  assetService.main({
    filePath,
    outPath,
    fileExtension: 'js'
  });
};
