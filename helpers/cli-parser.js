const fs = require('fs-extra');
const args = require('yargs').argv;

const getFiles = require('./get-files');

module.exports = function cliParser(cliArgument) {
  let cliFiles = [];
  let cliFilePath = `${__staxt}/cli/${cliArgument}`;

  if (fs.existsSync(cliFilePath)) {
    if (fs.lstatSync(cliFilePath).isDirectory()) {
      cliFiles = getFiles({
        directory: cliFilePath,
        includes: [`${cliArgument}-`],
      });
    }
  }

  cliFiles = cliFiles.filter((filePath) => {
    let fileName = filePath.split('/').pop();
    fileName = fileName.replace(`${cliArgument}-`, '');

    const argumentShorthand = fileName.charAt(0);
    return args.hasOwnProperty(argumentShorthand);
  });

  const cliMethod = cliFiles[0] ? cliFiles[0] : cliFilePath;

  return require(cliMethod);
};
