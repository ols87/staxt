const fs = require('fs-extra');
const args = require('yargs').argv;

const pages = require(`${__staxt}/services/pages`);
const paths = require(`${__staxt}/config/paths`);

const remove = require('../remove');

const src = paths.src.pages;

module.exports = (path = args.p) => {
  const pageData = pages.prepareData(path) || {};
  const pageName = pageData.name;

  remove(path, pageName, 'pages', () => {
    fs.removeSync(pageData.distPath);
    fs.removeSync(`${src}/${path}`);
  });
};
