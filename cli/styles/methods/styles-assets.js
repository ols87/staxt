const args = require('yargs').argv;

const assets = require(`${__staxt}/helpers/assets`);

const styles = require('../styles.service');

module.exports = (file = args.a, out = args.o) => {
  const options = assets({
    name: file,
    out: out,
    ext: 'scss',
  });

  if (!options) return;

  styles(options);
};
