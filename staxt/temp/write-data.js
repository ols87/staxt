#!/usr/bin/env node

const fs = require('fs-extra');

const paths = require('../config/paths');
const logger = require('../helpers/logger');

function writeData(dir, file) {
  if (!dir || !file) process.exit("Need to provide directory and file");

  if (!fs.existsSync(paths.data)) fs.mkdirSync(paths.data);

  return new Promise((resolve) => {
    logger(`Write Data: ${`${dir}/${file}`}`);
    const filePath = `${dir}/${file}`;

    if (fs.lstatSync(filePath).isDirectory()) {
      logger("Is dir, going recursive");
      return this.all(filePath);
    }

    const newName = filePath.split('_json/')[1].replace(/\//g, '-');
    logger(`New file name ${newName}`);

    fs.readFile(filePath, 'utf8', (err, contents) => {
      logger("Writing data file");
      if (err) return;
      fs.writeFile(`${paths.data}/${newName}`, contents, () => {
        return resolve();
      });
    });
  });
}

if (require.main === module) writeData();

module.exports = writeData;