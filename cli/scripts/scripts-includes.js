const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function scriptsIncludes(filePath = args.i) {
  await config.hooks.scripts.includes.before();

  await assetService.includes({
    filePath,
    fileExtension: 'js',
  });

  return await config.hooks.scripts.includes.after();
};
