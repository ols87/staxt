const fs = require("fs");
const path = require("path");

const glob = function(options) {
  let { dir, includes = "", excludes = "", returnGlob = [] } = options;

  const files = fs.readdirSync(dir);

  files.forEach(function(file) {
    if (fs.statSync(dir + "/" + file).isDirectory()) {
      returnGlob = glob({
        dir: `${dir}/${file}`,
        returnGlob,
        includes,
        excludes
      });
    } else {
      const hasInc = includes !== "";
      const hasExc = excludes !== "";
      const isInc = hasInc && file.indexOf(includes) > -1;
      const isExc = hasExc && file.indexOf(excludes) > -1;

      if (!hasInc || (isInc && !isExc)) {
        returnGlob.push(`${dir}/${file}`);
      }
    }
  });

  return returnGlob;
};

module.exports = function(options = {}) {
  return glob(options);
};
