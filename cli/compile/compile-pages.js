const args = require('yargs').argv;

const pagesService = require(`${__staxt}/services/pages`);

module.exports = (filePath = args.p) => {
  const cliArgs = pagesService.parsePath(filePath);

  if (cliArgs.hasPath && !cliArgs.isFolder) {
    return pagesService.compile(filePath);
  }

  pagesService.getFolder(cliArgs, filePath).forEach((pagePath) => {
    pagesService.compile(pagePath);
  });
};
