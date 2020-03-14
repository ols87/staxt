#!/usr/bin/env node

const fs = require('fs-extra');
const paths = require('../config/paths');

const dir = paths.layouts;

function layouts() {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(`${dir}/default.hbs`, '{{{content}}}');
}

module.exports = layouts();