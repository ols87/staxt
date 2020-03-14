#!/usr/bin/env node

const fs = require('fs-extra');

const paths = require('../config/paths');
const logger = require('../helpers/logger');

const dir = paths.layouts;

function layoutEntry() {
  logger('Layout Enrty Point')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(`${dir}/default.hbs`, '{{{content}}}');
}

if (require.main === module) layoutEntry();

module.exports = layoutEntry;