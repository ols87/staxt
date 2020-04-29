const args = require('yargs').argv;

const removeService = require(`${__staxt}/services/remove`);

module.exports = (filePath = args.i) => {
  removeService({
    filePath,
    directory: 'includes',
  });
};
