const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

module.exports = function stylesAssets() {
  assetService.main({
    fileExtension: 'scss',
  });
};
