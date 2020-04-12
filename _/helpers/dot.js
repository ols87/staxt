const fs = require('fs-extra');
const paths = require('./paths');
const dot = require('dot');
const config = require('./config');

dot.templateSettings = config.dot.templateSettings;

dot.defs = config.dot.defs;

dot.defs.staxt = {
  include: (path) => {
    return fs.readFileSync(`${paths.src.templates}/${path}.html`, 'utf8');
  },
};

module.exports = dot;
