#!/usr/bin/env node

const fs = require('fs-extra');

const logger = require('../helpers/logger');
const paths = require('../config/paths');

function images() {
  logger("Images");

  fs.copy(paths.img, 'dist/assets/images', err => {
    if (err) return console.error(err)
  });
}

if (require.main === module) images();

module.exports = images;