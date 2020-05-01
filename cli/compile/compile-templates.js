const args = require('yargs').argv;

const compileService = require(`${__staxt}/services/compile`);

module.exports = (filePath = args.t) => {
  compileService.templates({ filePath });
};
