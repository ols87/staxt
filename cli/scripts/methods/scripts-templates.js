const args = require('yargs').argv;

const template = require(`${__staxt}/helpers/template`);
const file = require(`${__staxt}/helpers/file`);

const scripts = require('../scripts.service');

const compile = require(`${__staxt}/cli/compile/methods/compile-pages`);

module.exports = (path = args.t) => {
  const data = template(path, 'js');

  const options = file({
    data: data,
    ext: 'js',
    out: '.js',
  });

  if (!options) return;

  scripts(options);

  if (!data.hasScripts) {
    compile(data.name);
  }
};
