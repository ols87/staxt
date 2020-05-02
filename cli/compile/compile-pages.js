const args = require('yargs').argv;

const compileService = require(`${__staxt}/services/compile`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function compilePages(filePath = args.p) {
  await config.hooks.compile.pages.before();

  await compileService.pages({ filePath });

  return await config.hooks.compile.pages.after();
};
