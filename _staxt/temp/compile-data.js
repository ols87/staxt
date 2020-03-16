#!/usr/bin/env node

const fs = require('fs-extra');

const paths = require('../config/paths');
const logger = require('../helpers/logger');
const writeData = require('./write-data');

const fileList = [];
let fileCount = 0;

function compileData(dir = paths.json, callback) {
  logger('Compile Data');

  fs.readdir(dir, (err, files) => {
    if (err) return;

    logger('Looping directory');
    files.forEach((file) => {
      if (file.indexOf('.json') > -1) {
        logger(`is file, add to cue: ${file}`);
        fileList.push(file);
      }

      const filePath = `${dir}/${file}`;

      if (fs.lstatSync(filePath).isDirectory()) {
        logger("Is dir, going recursive");
        compileData(filePath, callback);
      }

      writeData(filePath, () => {
        logger('Last file, resolving Promise');
        fileCount++;
        if (fileCount === fileList.length) callback();
      });
    });
  });
}

if (require.main === module) compileData();

module.exports = compileData;