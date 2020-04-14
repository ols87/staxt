const args = require('yargs').argv;

const _template = require('../helpers/template');
const scripts = require('../helpers/scripts');
const exists = require('../helpers/exists');

module.exports = (path = args.t) => {
  const template = _template(path);

  const name = template.name;
  const file = `${template.filePath}.js`;
  const outFile = `${template.outPath}.js`;

  if (!exists(name, file)) return;

  scripts({ name, file, outFile });
};
