const fs = require('fs-extra');
const args = require('yargs').argv;

const folderFilter = require('./folder-filter');

module.exports = function cliParser(cliArgument) {
  let cliFileList = [];
  let cliFilePath = `${__staxt}/cli/${cliArgument}`;

  if (fs.existsSync(cliFilePath)) {
    if (fs.lstatSync(cliFilePath).isDirectory()) {
      cliFileList = folderFilter({
        directory: cliFilePath,
        includes: [`${cliArgument}-`],
      });
    }
  }

  cliFileList = cliFileList.filter((filePath) => {
    let fileName = filePath.split('/').pop();
    fileName = fileName.replace(`${cliArgument}-`, '');

    const argumentShorthand = fileName.charAt(0);
    return args.hasOwnProperty(argumentShorthand);
  });

  return cliFileList[0] ? cliFileList[0] : cliFilePath;
};
