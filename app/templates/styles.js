const args = require('yargs').argv;

const _template = require('../helpers/template');
const styles = require('../helpers/styles');
const exists = require('../helpers/exists');

module.exports = (path = args.t) => {
  const template = _template(path);

  const name = template.name;
  const file = `${template.filePath}.scss`;
  const outFile = `${template.outPath}.css`;

  if (!exists(name, file)) return;

  styles({ name, file, outFile });
};
