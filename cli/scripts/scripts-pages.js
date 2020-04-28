const args = require('yargs').argv;

const assetsService = require(`${__staxt}/services/assets`);

module.exports = function scriptsAssets(filePath = args.p) {
  assetsService.page({
    filePath,
    fileExtension: 'js',
    distFile: '/scripts.js',
  });
};
