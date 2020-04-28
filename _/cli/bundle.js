const fs = require('fs-extra');
const paths = require(`${__staxt}/config/paths`);

module.exports = () => {
  const methods = [
    ['styles', 'templates'],
    ['styles', 'assets'],

    ['scripts', 'templates'],
    ['scripts', 'assets'],
  ];

  fs.removeSync(paths.dist.base);
  fs.ensureDirSync(paths.dist.base);

  methods.forEach((method) => {
    require(`./${method[0]}/methods/${method[0]}-${method[1]}`)();
  });
};
