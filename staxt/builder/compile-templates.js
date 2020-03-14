#!/usr/bin/env node

const fs = require('fs-extra');

const paths = require('../config/paths');
const logger = require('../helpers/logger');

function compileTemplates() {
  fs.readdir(paths.data, (err, files) => {
    logger("Reading data directory");
    if (!err) return;

    logger("Building Singles");
    files.forEach(file => this.single(paths.data, file))
  });
}

module.exports = compileTemplates;