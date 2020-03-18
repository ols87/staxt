const fs = require('fs-extra');
const glob = require("glob");

const handlebars = require(`${__staxt}/services/handlebars`);

module.exports = function () {
  const pages = glob.sync(`${this.paths.pages}/**/**.js`);

  pages.forEach((path, index) => {
    const data = require(path);
    let page = path.split("pages/").pop();
    const isIndex = page === 'index.js';
    page = isIndex ? page : page.substr(0, page.lastIndexOf('/'));
    page = page.replace('.js', '');

    const output = isIndex ? this.paths.dist : `${this.paths.dist}/${page}`;
    const template = `${this.paths.templates}/${data.template}.hbs`;

    fs.readFile(template, 'utf8', (err, contents) => {
      if (!contents) {
        const pageRel = this.paths.relative(path);
        const templateRel = this.paths.relative(template);
        this.logger('red', `Invalid Template: ${pageRel}`);
        this.logger('magenta', `${templateRel} does not exist`);
        process.exit();
      }

      const compile = handlebars.compile(contents);
      const html = compile(data);

      fs.outputFile(`${output}/index.html`, html);
    });
  });
}