const args = require('yargs').argv;

const page = require(`${__staxt}/helpers/page`);
const file = require(`${__staxt}/helpers/file`);

const scripts = require('../scripts.service');

const compile = require(`${__staxt}/cli/compile/methods/compile-page`);

module.exports = (path = args.p) => {
  const data = page(path);

  const options = file({
    data: data,
    ext: 'js',
    out: '/scripts.js',
  });

  if (!options) return;

  scripts(options);

  if (!data.hasScripts) {
    compile(data.name);
  }
};
