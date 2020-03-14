#!/usr/bin/env node

const fs = require('fs-extra');
const argv = require('yargs').argv;

const paths = require('../config/paths');
const logger = require('../helpers/logger');

function removePage(filePath = argv.path) {
  logger("Remove Page");

  if (!filePath) process.exit("Need To provide file path");

  filePath = filePath.replace('.json', '');
  const path = `${paths.dist}/${filePath}`;
  logger(`File path: ${path}`);

  if (!fs.existsSync(path)) return;

  if (fs.lstatSync(path).isDirectory()) {
    logger(`Removing directory: ${path}`);
    return fs.rmdir(path, {
      recursive: true
    }, (err) => {
      if (err) return;
    });
  }

  logger(`Unlinking File: ${path}`);
  fs.unlink(path, (err) => {
    if (err) return;
  });
}

module.exports = removePage;