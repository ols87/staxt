const fs = require('fs-extra');

const paths = require(`../helpers/paths`);

module.exports = function bundle() {
  const methods = [
    ['compile', 'pages'],

    ['styles', 'pages'],
    ['styles', 'templates'],
    ['styles', 'assets'],

    ['scripts', 'pages'],
    ['scripts', 'templates'],
    ['scripts', 'assets'],
  ];

  fs.removeSync(paths.dist.base);
  fs.ensureDirSync(paths.dist.base);

  methods.forEach((method) => {
    require(`./${method[0]}/${method[0]}-${method[1]}`)();
  });
};
