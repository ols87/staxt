#!/usr/bin/env node

const fs = require('fs-extra');
const argv = require('yargs').argv;
const insertLine = require('insert-line');

const paths = require('../config/paths');
const logger = require('../helpers/logger');

const layoutEntry = require('../temp/layout-entry');
const writeData = require('../temp/write-data');

function write(file) {
  if (argv.file) file = argv.file.split('_json/')[1].replace(/\//g, '-');

  fs.readFile(`${paths.data}/${file}`, 'utf8', (err, contents) => {
    logger("Reading view file");
    if (!contents) return;

    let name = `${file}`.split('.json')[0];
    logger(`View name: ${name}`);

    const data = JSON.parse(contents);
    logger(`View data: ${contents}`);

    const hbs = `${paths.pages}/${name}.hbs`;
    logger(`View path: ${hbs}`);

    fs.writeFile(hbs, '', (err) => {
      logger(`Writing file: ${name}`);

      if (err) process.exit("Could not write to file.");
      insertLine(hbs).appendSync("---");
      insertLine(hbs).appendSync(`data: ${name}`);
      insertLine(hbs).appendSync(`permalink: ${data.slug}`);
      insertLine(hbs).appendSync('---');
      insertLine(hbs).appendSync(`{{> ${data.template || 'index'} data=${name}}}`)
    });
  });
}

function writeView(dir = paths.json, file = argv.file) {
  layoutEntry();

  if (!file) process.exit("Need To provide file path");

  file = file.substring(file.lastIndexOf('/') + 1);

  if (argv.file) {
    writeData(`${dir}/${file}`, () => {
      write(file);
    });
  } else {
    write(file);
  }
}

if (require.main === module) writeView();

module.exports = writeView;