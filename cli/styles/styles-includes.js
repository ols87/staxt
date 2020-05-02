const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function stylesIncludes(filePath = args.i) {
  await config.hooks.styles.includes.before();

  await assetService.includes({
    filePath,
    fileExtension: 'scss',
  });

  return await config.hooks.styles.includes.after();
};
