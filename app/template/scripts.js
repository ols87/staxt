const fs = require('fs-extra');
const args = require('yargs').argv;

const paths = require('../helpers/paths');
const scripts = require('../helpers/scripts');
const logger = require('../helpers/logger');
const _template = require('../helpers/template');

module.exports = (path = args.t) => {
  const template = _template(path);

  const name = template.name;
  const file = `${template.filePath}.scripts.js`;
  const outFile = `${template.outPath}.js`;

  if (!fs.existsSync(file)) {
    return logger('red', `${template.name} template js does not exist`);
  }

  scripts({ name, file, outFile });
};
