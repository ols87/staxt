const args = require('yargs').argv;

const addService = require(`${__staxt}/services/add`);

module.exports = (filePath = args.i) => {
  addService({
    filePath,
    directory: 'includes',
  });
};
