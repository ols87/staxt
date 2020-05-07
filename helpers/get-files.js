const fs = require('fs');

const testMatch = function testFileMatch(fileName, matchArguments) {
  let hasMatch = false;

  matchArguments.forEach((testString) => {
    hasMatch = fileName.indexOf(testString) > -1;
  });

  return hasMatch;
};

module.exports = function getFiles({ directory, includes = [], excludes = [], returnFolder = [] }) {
  const fileList = fs.readdirSync(directory);

  fileList.forEach((fileName) => {
    let filePath = `${directory}/${fileName}`;

    if (fs.statSync(filePath).isDirectory()) {
      returnFolder = getFiles({
        includes,
        excludes,
        returnFolder,
        directory: filePath,
      });
    } else {
      const hasIncludes = includes.length > 0;
      const hasExcludes = excludes.length > 0;

      const isIncluded = hasIncludes && testMatch(filePath, includes);
      const isExcluded = hasExcludes && testMatch(filePath, excludes);

      if ((!hasIncludes && !isExcluded) || (isIncluded && !isExcluded)) {
        returnFolder.push(filePath);
      }
    }
  });

  return returnFolder;
};
