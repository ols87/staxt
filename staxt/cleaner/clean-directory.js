#!/usr/bin/env node

const fs = require('fs-extra');
const argv = require('yargs').argv;

const logger = require('../helpers/logger');

argv.dir = argv.dir || 'dist';

function cleanDirectory(dir = argv.dir) {
  logger("Clean Directory");
  dir = (dir === 'src') ? `${dir}/pages` : dir;

  if (!fs.existsSync(dir)) return;

  fs.readdir(dir, (err, files) => {
    if (err) return

    logger("Loop over directory");
    files.forEach((file) => {
      const filePath = `${dir}/${file}`;
      const srcSafe = filePath.indexOf('pages/_') < 0;
      const distSafe = filePath.indexOf('assets') < 0;

      if (srcSafe && distSafe) {
        if (fs.lstatSync(filePath).isDirectory()) {
          logger(`Remove directory: ${filePath}`);
          fs.rmdir(filePath, {
            recursive: true
          }, (err) => {
            if (err) return;
          });
        } else {
          logger(`Remove file: ${filePath}`);
          fs.unlink(filePath, (err) => {
            if (err) return;
          });
        }
      }
    });
  });
}

if (require.main === module) cleanDirectory();

module.exports = cleanDirectory;