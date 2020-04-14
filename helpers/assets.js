const paths = require(`./paths`);
const logger = require(`./logger`);
const exists = require(`./exists`);

module.exports = (args) => {
  let { name, out, ext } = args;

  const type = ext === 'scss' ? 'css' : ext;

  const src = paths.src.assets[ext];
  const dist = paths.dist.assets[type];

  if (typeof name !== 'string') {
    name = 'main';
  }

  if (name !== 'main' && typeof out !== 'string') {
    logger('red', `No output, use -o=some/path`);
    return process.exit();
  }

  const file = `${src}/${name}.${ext}`;
  const outFile = `${dist}${out}.${ext}`;

  if (!exists(name, file)) return false;

  return { name, file, outFile };
};
