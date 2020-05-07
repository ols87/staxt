const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function stylesPages(filePath = args.p) {
  await config.hooks.styles.pages.before();

  await assetService.pages({
    filePath,
    fileExtension: 'scss',
    distFile: '/styles.css',
  });

  return await config.hooks.styles.pages.after();
};
