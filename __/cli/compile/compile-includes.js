const args = require('yargs').argv;

const compileService = require(`${__staxt}/services/compile`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function compileIncludes(filePath = args.i) {
  await config.hooks.compile.includes.before();

  await compileService.includes({ filePath });

  return await config.hooks.compile.includes.after();
};
