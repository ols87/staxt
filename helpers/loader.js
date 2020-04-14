const fs = require('fs-extra');
const args = require('yargs').argv;
const glob = require('./glob');

module.exports = (type) => {
  let methods = [];
  let path = `${__staxt}/cli/${type}`;

  if (fs.existsSync(path)) {
    if (fs.lstatSync(path).isDirectory()) {
      methods = glob({
        dir: `${path}/methods`,
        includes: [`${type}-`],
      });
    }
  }

  methods = methods.filter((file) => {
    file = file.split('/').pop();
    file = file.replace(`${type}-`, '');
    arg = file.charAt(0);
    return args.hasOwnProperty(arg);
  });

  return methods[0];
};
