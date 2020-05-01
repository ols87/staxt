const args = require('yargs').argv;

const templates = require(`${__staxt}/services/template`);
const pages = require(`${__staxt}/services/page`);
const styles = require('../style');

const compile = require(`${__staxt}/cli/compile/compile`);

const file = require(`${__staxt}/helpers/file`);

function render(path) {
  const templateData = templates.filePaths(path, 'css');
  const filePaths = file(templateData, 'scss', '.css');

  if (!filePaths) return;

  const pageList = templates.getPages(path);

  pageList.forEach((filePath) => {
    let pageData = pages.prepareData({ filePath });

    if (!pageData.templateStyles) {
      compile.page(pageData.name);
    }
  });

  return styles(filePaths);
}

module.exports = (path = args.t) => {
  if (typeof path === 'string') {
    return render(path);
  }

  templates.all('scss').forEach((templatePath) => {
    let templateName = templates.sanitizePath({ templatePath, fileExtension: 'scss' });
    return render(templateName);
  });
};
