const args = require('yargs').argv;

const pages = require(`${__staxt}/services/pages`);
const compile = require('../compile.service');

module.exports = (path = args.p) => {
  const args = pages.args(path);

  if (args.hasPath && !args.isFolder) {
    return compile.page(path);
  }

  pages.folder(args, path).forEach((pagePath) => {
    let page = pages.sanitize(pagePath);
    if (!compile.page(page)) return;
  });
};
