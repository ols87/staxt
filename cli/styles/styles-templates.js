const args = require('yargs').argv;

const assetService = require(`${__staxt}/services/asset`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function stylesTemplates(filePath = args.t) {
  await config.hooks.styles.templates.before();

  await assetService.templates({
    filePath,
    fileExtension: 'scss',
  });

  return await config.hooks.styles.templates.after();
};
