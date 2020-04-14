const args = require('yargs').argv;

const _page = require('../helpers/page');
const scripts = require('../helpers/scripts');
const exists = require('../helpers/exists');

const compile = require('./compile');

module.exports = (path = args.p) => {
  const page = _page(path);

  const name = page.name;
  const file = `${page.filePath}.js`;
  const outFile = `${page.outPath}/scripts.js`;

  if (!exists(name, file)) return;

  scripts({ name, file, outFile });

  if (!page.hasScripts) {
    compile(name);
  }
};
