#!/usr/bin/env node

const fs = require('fs-extra');

const paths = require('../config/paths');
const logger = require('../helpers/logger');
const writeData = require('./write-data');

const fileList = [];
let fileCount = 0;

function compileData() {
  logger('Create _data folder if none exists');
  if (!fs.existsSync(paths.data)) fs.mkdirSync(paths.data);

  return new Promise((resolve) => {
    logger('Compile Data');

    fs.readdir(paths.json, (err, files) => {
      if (err) return;

      logger('Looping directory');
      files.forEach((file) => {
        if (file.indexOf('.json') > -1) {
          logger(`is file, add to cue: ${file}`);
          fileList.push(file);
        }

        writeData(paths.json, file).then(() => {
          logger('Last file, resolving Promise');
          fileCount++;
          if (fileCount === fileList.length) return resolve();
        });
      });
    });
  });
}

if (require.main === module) compileData();

module.exports = compileData;