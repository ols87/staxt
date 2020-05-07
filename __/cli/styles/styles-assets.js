const assetService = require(`${__staxt}/services/asset`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function stylesAssets() {
  await config.hooks.styles.assets.before();

  await assetService.main({
    fileExtension: 'scss',
  });

  return await config.hooks.styles.assets.after();
};
