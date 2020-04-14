const fs = require('fs');

const test = (file, testGlob) => {
  let match = false;

  testGlob.forEach((pattern) => {
    match = file.indexOf(pattern) > -1;
  });

  return match;
};

const glob = (options) => {
  let { dir, includes = [], excludes = [], returnGlob = [] } = options;

  const files = fs.readdirSync(dir);

  files.forEach(function (file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      returnGlob = glob({
        dir: `${dir}/${file}`,
        returnGlob,
        includes,
        excludes,
      });
    } else {
      const hasInc = includes !== '';
      const hasExc = excludes !== '';
      const isInc = hasInc && test(file, includes);
      const isExc = hasExc && test(file, excludes);
      if (!hasInc || (isInc && !isExc)) {
        returnGlob.push(`${dir}/${file}`);
      }
    }
  });

  return returnGlob;
};

module.exports = glob;
