const fs = require('fs');
const insertLine = require('insert-line');
const argv = require('yargs').argv;
const dir = require('./dir');
const data = require('./data');

module.exports = new class {
  constructor() {
    this.file = argv.f ? `${argv.f.split(`${dir.json}/`)[1]}` : `index.json`;
  }

  init() {
    // Compile data then generate single if args or generate all
    data.generate().then(() => {
      this.layouts();
      argv.f ? this.single() : this.all();
    });
  }

  layouts() {
    if (!fs.existsSync(dir.layouts)) fs.mkdirSync(dir.layouts);
    fs.writeFileSync(`${dir.layouts}/default.hbs`, '{{{content}}}');
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
        const hbs = `${dir.src}/${fileName}.hbs`;

        console.log(fileName);

        // Write out Handlebars File
        fs.writeFile(hbs, '', (err) => {
          if (err) process.exit("Could not write to file.");
          insertLine(hbs).appendSync("---");
          insertLine(hbs).appendSync(`data: ${fileName}`);
          insertLine(hbs).appendSync(`permalink: ${data.slug}`);
          insertLine(hbs).appendSync('---');
          insertLine(hbs).appendSync(`{{> ${data.template} data=${fileName}}}`)
        });
      }
    });
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
}