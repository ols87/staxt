const args = require('yargs').argv;

const pages = require(`${__staxt}/services/pages`);
const compile = require('../compile');

module.exports = (path = args.p) => {
  const arg = pages.arg(path);

  if (arg.hasPath && !arg.isFolder) {
    return compile.page(path);
  }

  pages.getFolder(arg, path).forEach((pagePath) => {
    let pageName = pages.sanitizePath(pagePath);
    if (!compile.page(pageName)) return;
  });
};
