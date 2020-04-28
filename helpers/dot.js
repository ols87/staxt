const fs = require('fs-extra');

const paths = require(`./paths`);
const config = require(`./config`);

const dot = require('dot');

dot.templateSettings = config.dot.templateSettings;

dot.defs = config.dot.defs;

dot.defs.staxt = {
  include: (path) => {
    return fs.readFileSync(`${paths.src.includes}/${path}.html`, 'utf8');
  },
};

module.exports = dot;
