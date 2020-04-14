const fs = require('fs-extra');
const args = require('yargs').argv;

const page = require(`${__staxt}/helpers/page`);
const paths = require(`${__staxt}/helpers/paths`);

const remove = require('../remove.service');

const src = paths.src.pages;
const type = 'pages';

module.exports = (path = args.p) => {
  const data = page(path) || {};

  remove({
    path,
    name: data.name,
    type: type,
    clean: () => {
      fs.removeSync(data.outPath);
      fs.removeSync(`${src}/${path}`);
    },
  });
};
