const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function scriptsTemplates(filePath = args.t) {
  await config.hooks.scripts.templates.before();

  await assetService.templates({
    filePath,
    fileExtension: 'js',
  });

  return await config.hooks.scripts.templates.after();
};
