const fs = require('fs-extra');
const glob = require("glob");
// const _templateService = require(`${__staxt}/services/template.service`);
const shell = require('shelljs');

module.exports = function () {
  const pages = glob.sync(`${this.paths.pages}/**/**.js`);

  pages.forEach((path) => {
    const data = require(path);

    let page = path.split("pages/").pop();
    page = page.replace(/\/\w+/, '');
    page = page.replace('.js', '');

    const template = `${this.paths.templates}/${data.template}.hbs`;

    fs.readFile(template, 'utf8', (err, contents) => {
      if (!contents) {
        const pageRel = this.paths.relative(path);
        const templateRel = this.paths.relative(template);
        this.logger('red', `Invalid Template: ${pageRel}`);
        this.logger('magenta', `${templateRel} does not exist`);
        process.exit();
      }
      shell.exec(`staxt page compile -p=${page}`)
    });
  });
}