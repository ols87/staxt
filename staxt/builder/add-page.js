#!/usr/bin/env node

const fs = require('fs-extra');
const argv = require('yargs').argv;

const paths = require('../config/paths');
const logger = require('../helpers/logger');

const placeholder = `${__dirname}/../templates/page-data.json`;

function addPage(filePath = argv.path) {
  logger("Add Page");

  if (!filePath) process.exit("Need To provide file path");

  logger("Get template, split file path & get length");
  const template = argv.template || '';
  const tree = filePath.split('/');
  const treeLength = tree.length;

  fs.readFile(placeholder, 'utf8', (err, contents) => {
    logger("Get JSON placeholder content");

    if (err || !contents) return;

    logger("Replace template and slug");
    contents = contents.replace('"template": ""', `"template": "${template}"`);
    contents = contents.replace('"slug": "/"', `"slug": "/${filePath}/"`);

    logger("Loop over the file path folders");
    tree.forEach((folder, index) => {
      const notLast = (index + 1 !== treeLength);
      logger(`Last index? ${!notLast}`);

      const notFolder = !fs.existsSync(`${paths.json}/${folder}`);
      logger(`Not folder? ${!notLast}`);

      if (notLast && notFolder) {
        logger(`Making folder: ${folder}`);
        fs.mkdirSync(`${folder}`);
      } else {
        logger(`Writing json file: ${filePath}`);
        fs.writeFileSync(`${paths.json}/${filePath}.json`, contents);
      }
    });
  });
}

module.exports = addPage;