const args = require('yargs').argv;

const compile = require(`${__staxt}/cli/compile/methods/compile-pages`);
const pages = require(`${__staxt}/services/pages`);
const scripts = require('../scripts.service');

const file = require(`${__staxt}/helpers/file`);

const pageData = (path) => {
  return pages.data(path);
};

const pageFile = (path, data = pageData(path)) => {
  return file({
    data: data,
    ext: 'js',
    out: '/scripts.js',
  });
};

module.exports = (path = args.p) => {
  const args = pages.args(path);

  if (args.hasPath && !args.isFolder) {
    const data = pageData(path);
    const options = pageFile(path, data);

    if (!options) return;

    scripts(options);

    if (!data.hasScripts) {
      compile(data.name);
    }

    return;
  }

  pages.folder(args, path).forEach((pagePath) => {
    let options = pageFile(pagePath);
    if (!options) return;
    scripts(options);
  });
};
