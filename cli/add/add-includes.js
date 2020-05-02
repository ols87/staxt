const args = require('yargs').argv;

const addService = require(`${__staxt}/services/add`);

const config = require(`${__staxt}/helpers/config`);

module.exports = async function addIncludes(filePath = args.i) {
  await config.hooks.add.includes.before();

  await addService({
    filePath,
    directory: 'includes',
  });

  return await config.hooks.add.includes.after();
};
