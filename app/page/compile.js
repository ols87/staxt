const fs = require('fs-extra');
const args = require('yargs').argv;

const dot = require('../../helpers/dot');

module.exports = (path = args.p) => {
  const isFolder = path ? path.indexOf('/*') > 0 : false;
};
