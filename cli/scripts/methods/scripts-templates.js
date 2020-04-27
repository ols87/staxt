const args = require('yargs').argv;

const templates = require(`${__staxt}/services/templates`);
const pages = require(`${__staxt}/services/pages`);
const scripts = require('../scripts');

const compile = require(`${__staxt}/cli/compile/compile`);

const file = require(`${__staxt}/helpers/file`);

function render(path) {
  const templateData = templates.filePaths(path, 'js');
  const filePaths = file(templateData, 'js', '.js');

  const pageList = templates.getPages(path);

  pageList.forEach((pagePath) => {
    let pageData = pages.prepareData(pagePath);
    compile.page(pageData.name);
  });

  return filePaths ? scripts(filePaths) : false;
}

module.exports = (path = args.t) => {
  if (typeof path === 'string') {
    return render(path);
  }

  templates.all('js').forEach((templatePath) => {
    let templateName = templates.sanitizePath(templatePath, 'js');
    return templates.isInclude(templatePath) ? false : render(templateName);
  });
};
