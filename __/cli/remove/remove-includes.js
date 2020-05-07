const args = require('yargs').argv;

const removeService = require(`${__staxt}/services/remove`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function removeIncludes(filePath = args.i) {
  await config.hooks.remove.includes.before();

  await removeService({
    filePath,
    directory: 'includes',
  });

  return await config.hooks.remove.includes.before();
};
