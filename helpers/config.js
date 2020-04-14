const fs = require('fs-extra');

const staxtConfig = require('../files/staxt.config');
const projectConf = `${process.cwd()}/files/staxt.config.js`;

let config = staxtConfig;

if (fs.existsSync(projectConf)) {
  config = Object.assign({}, staxtConfig, require(projectConf));
}

module.exports = config;
