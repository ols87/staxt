const args = require('yargs').argv;

const template = require(`${__staxt}/helpers/template`);
const file = require(`${__staxt}/helpers/file`);

const styles = require('../styles.service');

const compile = require(`${__staxt}/cli/compile/methods/compile-pages`);

module.exports = (path = args.t) => {
  const data = template(path);

  const options = file({
    data: data,
    ext: 'scss',
    out: '.css',
  });

  if (!options) return;

  styles(options);

  if (!data.hasStyles) {
    compile(data.name);
  }
};
