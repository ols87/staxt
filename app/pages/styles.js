const args = require('yargs').argv;

const _page = require('../helpers/page');
const styles = require('../helpers/styles');
const exists = require('../helpers/exists');

const compile = require('./compile');

module.exports = (path = args.p) => {
  const page = _page(path);

  const name = page.name;
  const file = `${page.filePath}.scss`;
  const outFile = `${page.outPath}/style.css`;

  if (!exists(name, file)) return;

  styles({ name, file, outFile });

  if (!page.hasStyles) {
    compile(name);
  }
};
