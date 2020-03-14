#!/usr/bin/env node

const fs = require('fs-extra');

const paths = require('../config/paths');
const logger = require('../helpers/logger');
const compileData = require('../temp/compile-data');
const writeView = require('./write-view');


function compileTemplates() {
  compileData().then(() => {
    fs.readdir(paths.data, (err, files) => {
      logger("Reading data directory");
      if (err) return;

      logger("Building Singles");
      files.forEach(file => writeView(paths.json, file))
    });
  });
}

if (require.main === module) compileTemplates();

module.exports = compileTemplates;