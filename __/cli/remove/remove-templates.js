const args = require('yargs').argv;

const removeService = require(`${__staxt}/services/remove`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function removeTemplates(filePath = args.t) {
  await config.hooks.remove.templates.before();

  await removeService({
    filePath,
    directory: 'templates',
  });

  return await config.hooks.remove.templates.before();
};
