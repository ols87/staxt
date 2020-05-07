const assetService = require(`${__staxt}/services/asset`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function scriptsAssets() {
  await config.hooks.scripts.assets.before();

  await assetService.main({
    fileExtension: 'js',
  });

  return await config.hooks.scripts.assets.after();
};
