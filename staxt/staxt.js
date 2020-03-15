#!/usr/bin/env node

const fs = require('fs-extra');
const paths = require('./config/paths');
const cleanDirectory = require('./cleaner/clean-directory');

const assets = [
  `${paths.js}/main.js`,
  `${paths.css}/main.scss`,
];

const hbs = `${paths.hbs}/index.hbs`;
const json = `${paths.json}/index.json`;

for (const path in paths) {
  if (!fs.existsSync(paths[path])) fs.mkdirSync(paths[path])
}

assets.forEach((file) => {
  if (!fs.existsSync(file)) fs.writeFileSync(file, '');
});

fs.copy(`${__dirname}/templates/page-template.hbs`, hbs, err => {
  if (err) return console.error(err);
});

fs.copy(`${__dirname}/templates/page-data.json`, json, err => {
  if (err) return console.error(err);
});

fs.copy(`${__dirname}/files`, process.cwd(), err => {
  if (err) return console.error(err);
});

cleanDirectory('src');