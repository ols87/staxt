const args = require('yargs').argv;

const removeService = require(`${__staxt}/services/remove`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function removePages(filePath = args.p) {
  await config.hooks.remove.pages.before();

  await removeService({
    filePath,
    directory: 'pages',
  });

  return await config.hooks.remove.pages.before();
};
