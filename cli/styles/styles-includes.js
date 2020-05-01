const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

module.exports = (filePath = args.i) => {
  assetService.includes({
    filePath,
    fileExtension: 'scss',
  });
};
