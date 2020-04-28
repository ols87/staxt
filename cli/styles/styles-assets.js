const args = require('yargs').argv;

const paths = require(`${__staxt}/config/paths`);
const exists = require(`${__staxt}/helpers/exists`);

const styles = require('../styles');

const src = paths.src.assets.scss;
const dist = paths.dist.assets.css;

module.exports = (path = args.a, out = args.o || path) => {
  if (typeof path !== 'string') {
    path = 'main';
    out = 'main';
  }

  const srcPath = `${src}/${path}.scss`;
  const distPath = `${dist}/${out}.css`;

  if (!exists(path, srcPath)) return;

  styles({ path, srcPath, distPath });
};
