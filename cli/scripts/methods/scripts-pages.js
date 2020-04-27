const args = require('yargs').argv;

const pages = require(`${__staxt}/services/pages`);
const scripts = require('../scripts');

const compile = require(`${__staxt}/cli/compile/compile`);

const file = require(`${__staxt}/helpers/file`);

function render(path) {
  const pageData = pages.prepareData(path);
  const filePaths = file(pageData, 'js', '/scripts.js');

  compile.page(pageData.name);

  return filePaths ? scripts(filePaths) : false;
}

module.exports = (path = args.p) => {
  const arg = pages.arg(path);

  if (arg.hasPath && !arg.isFolder) {
    return render(path);
  }

  pages.getFolder(arg, path).forEach((pagePath) => {
    render(pagePath);
  });
};
