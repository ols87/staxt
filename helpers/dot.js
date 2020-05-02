const fs = require('fs-extra');
const dot = require('dot');

const paths = require(`./paths`);
const config = require(`./config`);
const logger = require(`./logger`);

dot.templateSettings = config.dot.templateSettings;

dot.defs = config.dot.defs;

dot.defs = {
  include: (fileName) => {
    let folderPath = `${paths.src.includes}/${fileName}`;
    let filePath = `${folderPath}.html`;

    if (fs.existsSync(folderPath)) {
      if (fs.lstatSync(folderPath).isDirectory()) {
        filePath = `${folderPath}/${fileName}.html`;
        return fs.readFileSync(filePath, 'utf8');
      }
    }

    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    } else {
      logger('red', `${fileName} not found`);
      return '{{fileName not found}}';
    }
  },
};

module.exports = dot;
