const fs = require('fs');

const testMatch = function testFileMatch(fileName, matchArguments) {
  let hasMatch = false;

  matchArguments.forEach((testString) => {
    hasMatch = fileName.indexOf(testString) > -1;
  });

  return hasMatch;
};

module.exports = function folderFilter(options) {
  let { directory, includes = [], excludes = [], returnFolder = [] } = options;

  const fileList = fs.readdirSync(directory);

  fileList.forEach((fileName) => {
    directory = `${directory}/${fileName}`;

    if (fs.statSync(directory).isDirectory()) {
      returnFolder = folderFilter({
        directory,
        includes,
        excludes,
        returnFolder,
      });
    } else {
      const hasIncludes = includes !== '';
      const hasExcludes = excludes !== '';
      const isIncludes = hasIncludes && testMatch(fileName, includes);
      const isExcludes = hasExcludes && testMatch(fileName, excludes);

      if (!hasIncludes || (isIncludes && !isExcludes)) {
        returnFolder.push(directory);
      }
    }
  });

  return returnFolder;
};
