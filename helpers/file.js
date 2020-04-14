const exists = require('./exists');

module.exports = (args) => {
  const { data, ext, out } = args;

  const name = data.name;
  const file = `${data.filePath}.${ext}`;
  const outFile = `${data.outPath}${out}`;

  if (!exists(name, file)) return false;

  return { name, file, outFile };
};
