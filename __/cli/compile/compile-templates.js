const args = require('yargs').argv;

const compileService = require(`${__staxt}/services/compile`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function compileTemplates(filePath = args.t) {
  await config.hooks.compile.templates.before();

  await compileService.templates({ filePath });

  return await config.hooks.compile.templates.after();
};
