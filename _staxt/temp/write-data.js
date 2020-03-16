#!/usr/bin/env node

const fs = require('fs-extra');
const argv = require('yargs').argv;

const paths = require('../config/paths');
const logger = require('../helpers/logger');

function writeData(filePath, callback) {
  if (!filePath) process.exit("Need to provide directory and file");
  if (!fs.existsSync(paths.data)) fs.mkdirSync(paths.data);

  if (argv.file) filePath = argv.file;

  fs.readFile(filePath, 'utf8', (err, contents) => {
    const newName = filePath.split('_json/')[1].replace(/\//g, '-');
    logger(`New file name ${newName}`);

    logger("Writing data file");
    if (err) return;
    fs.writeFile(`${paths.data}/${newName}`, contents, () => {
      callback();
    });
  });
}

if (require.main === module) writeData();

module.exports = writeData;