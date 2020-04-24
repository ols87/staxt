const args = require('yargs').argv;

const page = require(`${__staxt}/helpers/page`);
const file = require(`${__staxt}/helpers/file`);

const styles = require('../styles.service');

const compile = require(`${__staxt}/cli/compile/methods/compile-pages`);

module.exports = (path = args.p) => {
  const data = page(path);

  const options = file({
    data: data,
    ext: 'scss',
    out: '/style.css',
  });

  if (!options) return;

  styles(options);

  if (!data.hasStyles) {
    compile(data.name);
  }
};
