const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

module.exports = function scriptsAssets() {
  assetService.main({
    fileExtension: 'js',
  });
};
