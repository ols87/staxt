const args = require('yargs').argv;

const addService = require(`${__staxt}/services/add`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async (filePath = args.p) => {
  config.hooks.add.pages.before();

  await addService({
    filePath,
    directory: 'pages',
  });

  config.hooks.add.pages.after();
};
