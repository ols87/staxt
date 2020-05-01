const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

module.exports = function scriptsAssets(filePath = args.p) {
  assetService.pages({
    filePath,
    fileExtension: 'js',
    distFile: '/scripts.js',
  });
};
