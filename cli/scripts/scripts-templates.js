const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

module.exports = (filePath = args.t) => {
  assetService.templates({
    filePath,
    fileExtension: 'js',
  });
};
