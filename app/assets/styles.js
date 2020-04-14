const fs = require('fs-extra');
const sass = require('sass');
const args = require('yargs').argv;

const paths = require('../helpers/paths');
const styles = require('../helpers/styles');

const src = paths.src.assets.scss;
const dist = paths.dist.assets.css;

module.exports = function (path = args.a, outPath = args.o) {
  const file = path || `${src}/main.scss`;
  const outFile = outPath || `${dist}/main.css`;

  styles({ file, outFile });
};
