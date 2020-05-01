const args = require('yargs').argv;

const templates = require(`${__staxt}/services/template`);
const pages = require(`${__staxt}/services/page`);
const scripts = require('../scripts');

const compile = require(`${__staxt}/cli/compile/compile`);

const file = require(`${__staxt}/helpers/file`);

function render(path) {
  const templateData = templates.filePaths(path, 'js');
  const filePaths = file(templateData, 'js', '.js');

  if (!filePaths) return;

  const pageList = templates.getPages(path);

  pageList.forEach((filePath) => {
    let pageData = pages.prepareData({ filePath });

    if (!pageData.templateScripts) {
      compile.page(pageData.name);
    }
  });

  return scripts(filePaths);
}

module.exports = (path = args.t) => {
  if (typeof path === 'string') {
    return render(path);
  }

  templates.all('js').forEach((templatePath) => {
    let templateName = templates.sanitizePath({ templatePath, fileExtension: 'js' });
    return render(templateName);
  });
};
