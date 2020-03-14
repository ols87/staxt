#!/usr/bin/env node

const fs = require('fs-extra');
const argv = require('yargs').argv;
const insertLine = require('insert-line');

const paths = require('../config/paths');
const logger = require('../helpers/logger');

function writeView(dir = paths.json, file = argv.file) {
  logger("Write View");

  if (!file) process.exit("Need To provide file path");

  file = file.split(`${paths.json}/`)[1];

  fs.readFile(`${dir}/${file}`, 'utf8', (err, contents) => {
    logger("Reading view file");

    if (!contents) return;

    let name = `${file}`.split('.json')[0];
    if (argv.file) name = name.replace(/\//g, '-');
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

module.exports = writeView;