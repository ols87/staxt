const args = require('yargs').argv;

const addService = require(`${__staxt}/services/add`);

const config = require(`${__staxt}/helpers/config`);

module.exports = function addTemplates(filePath = args.t) {
  await config.hooks.add.templates.before();

  await addService({
    filePath,
    directory: 'templates',
  });

  return await config.hooks.add.templates.after();
};
