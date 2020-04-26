const args = require('yargs').argv;

const compile = require(`${__staxt}/cli/compile/methods/compile-pages`);
const pages = require(`${__staxt}/services/pages`);
const styles = require('../styles');

const file = require(`${__staxt}/helpers/file`);

function render(path) {
  const pageData = pages.prepareData(path);
  const filePaths = file(pageData, 'scss', '/style.css');

  if (!filePaths) return;

  if (pageData.hasStyles) compile(pageData.name);

  return styles(filePaths);
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
