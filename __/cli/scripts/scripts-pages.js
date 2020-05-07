const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function scriptsPages(filePath = args.p) {
  await config.hooks.scripts.pages.before();

  await assetService.pages({
    filePath,
    fileExtension: 'js',
    distFile: '/scripts.js',
  });

  return await config.hooks.scripts.pages.after();
};
