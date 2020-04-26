const args = require('yargs').argv;

const compile = require(`${__staxt}/cli/compile/methods/compile-pages`);
const pages = require(`${__staxt}/services/pages`);
const scripts = require('../scripts');

const file = require(`${__staxt}/helpers/file`);

function render(path) {
  const pageData = pages.prepareData(path);
  const filePaths = file(pageData, 'js', '/scripts.js');

  if (!filePaths) return;

  if (pageData.hasScripts) compile(pageData.name);

  return scripts(filePaths);
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
