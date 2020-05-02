const args = require('yargs').argv;

const addService = require(`${__staxt}/services/add`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function addPages(filePath = args.p) {
  await config.hooks.add.pages.before();

  await addService({
    filePath,
    directory: 'pages',
  });

  return await config.hooks.add.pages.after();
};
