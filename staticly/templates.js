const fs = require('fs-extra');
const insertLine = require('insert-line');
const argv = require('yargs').argv;
const dir = require('./dir');
const data = require('./data');
const cleaner = require('./cleaner');

module.exports = new class {
  constructor() {
    this.file = argv.f ? `${argv.f.split(`${dir.json}/`)[1]}` : `index.json`;
    this.changeEvent = argv.e;
  }

  init() {
    if (this.changeEvent === 'unlink') {
      return cleaner.removePage(this.file);
    } else {
      // Generate single if args or generate all
      this.layouts();

      if (argv.f) {
        data.single(dir.json, this.file, this.single());
      } else {
        data.all().then(() => this.all());
      }
    }
  }

  layouts() {
    if (!fs.existsSync(dir.layouts)) fs.mkdirSync(dir.layouts);
    fs.writeFileSync(`${dir.layouts}/default.hbs`, '{{{content}}}');
  }

  all(directory = dir.data) {
    // Read data directory
    fs.readdir(directory, (err, files) => {
      if (err) process.exit("Could not list the directory.");

      // Loop files and generate single
      files.forEach((file) => {
        this.single(directory, file);
      });
    });
  }

  single(directory = dir.json, filePath = this.file) {
    // Get file contents
    fs.readFile(`${directory}/${filePath}`, 'utf8', (err, contents) => {
      if (err) process.exit("Could not read file");

      // Set new file name
      let fileName = `${filePath}`.split('.json')[0];
      if (argv.f) fileName = fileName.replace(/\//g, '-');

      if (contents) {
        const data = JSON.parse(contents);
        const hbs = `${dir.pages}/${fileName}.hbs`;

        // Write out Handlebars File
        fs.writeFile(hbs, '', (err) => {
          if (err) process.exit("Could not write to file.");
          insertLine(hbs).appendSync("---");
          insertLine(hbs).appendSync(`data: ${fileName}`);
          insertLine(hbs).appendSync(`permalink: ${data.slug}`);
          insertLine(hbs).appendSync('---');
          insertLine(hbs).appendSync(`{{> ${data.template || 'index'} data=${fileName}}}`)
        });
      }
    });
  }

  page() {
    if (!argv.p) process.exit("Need To provide file path");

    const path = argv.p;
    const template = argv.t || '';
    const tree = path.split('/');

    fs.readFile(`./staticly/index.json`, 'utf8', (err, contents) => {
      if (err || !contents) process.exit("Could not read file");

      contents = contents.replace('"template": ""', `"template": "${template}"`);
      contents = contents.replace('"slug": "/"', `"slug": "/${path}/"`);

      tree.forEach((file, index) => {
        if (index + 1 !== tree.length && !fs.existsSync(`${dir.json}/${file}`)) {
          fs.mkdirSync(`${dir.json}/${file}`);
        } else {
          fs.writeFileSync(`${dir.json}/${path}.json`, contents);
        }
      });
    });
  }
}