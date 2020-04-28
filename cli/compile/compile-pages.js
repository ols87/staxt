const args = require('yargs').argv;

const pageService = require(`${__staxt}/services/page`);
const compileService = require(`${__staxt}/services/compile`);

module.exports = (filePath = args.p) => {
  const cliArgs = pageService.parsePath(filePath);

  if (cliArgs.hasPath && !cliArgs.isFolder) {
    return compileService.page(filePath);
  }

  pageService.getFolder(cliArgs, filePath).forEach((pagePath) => {
    compileService.page(pagePath);
  });
};
