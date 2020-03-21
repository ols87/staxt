const fs = require("fs")
const path = require("path")

const glob = function (options) {
  let {
    dir,
    includes = '',
    returnGlob = []
  } = options;

  const files = fs.readdirSync(dir)

  files.forEach(function (file) {
    if (fs.statSync(dir + "/" + file).isDirectory()) {
      returnGlob = glob({
        dir: `${dir}/${file}`,
        returnGlob,
        includes
      });
    } else {
      if (includes === '' || (includes !== '' && file.indexOf(includes) > -1)) {
        returnGlob.push(`${dir}/${file}`);
      }
    }
  })

  return returnGlob
}

module.exports = function (options = {}) {
  return glob(options);
}