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
      const hasIncludes = includes !== '';
      const hasExcludes = excludes !== '';

      const isIncluded = hasIncludes && testMatch(fileName, includes);
      const isExcluded = hasExcludes && testMatch(fileName, excludes);

      if (!hasIncludes || (isIncluded && !isExcluded)) {
        returnFolder.push(filePath);
      }
    }
  });

  return returnFolder;
};
