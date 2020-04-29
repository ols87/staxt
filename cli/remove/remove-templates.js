const args = require('yargs').argv;

const removeService = require(`${__staxt}/services/remove`);

module.exports = (filePath = args.t) => {
  removeService({
    filePath,
    directory: 'templates',
  });
};
