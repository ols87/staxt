#!/usr/bin/env node

const fs = require('fs-extra');

const packagePath = `${process.cwd()}/package.json`;

let package = fs.readJsonSync(packagePath);

const scripts = [
  'init',
  'serve',
  'watch',
  'compile',
  'bundle',
  'add',
  'remove',
  'scss',
  'js',
  'images'
]

scripts.forEach(script => {
  package.scripts[script] = `staxt ${script}`;
});

fs.writeJsonSync(packagePath, package, {
  spaces: 2
});