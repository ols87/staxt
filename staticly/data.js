const fs = require('fs-extra');
const dir = require('./dir');
const fileList = [];
let fileCount = 0;

module.exports = new class {
  all(directory = dir.json) {
    // Create _data folder if none exists
    if (!fs.existsSync(dir.data)) fs.mkdirSync(dir.data);

    return new Promise((resolve) => {
      fs.readdir(directory, (err, files) => {
        if (err) process.exit("Could not list the directory.");

        // Loop over files in directory
        files.forEach((file) => {
          if (file.indexOf('.json') > -1) fileList.push(file);

          this.single(directory, file, (err) => {
            if (err) process.exit("Could not write file");
            // if last file resolve Promise
            fileCount++;
            if (fileCount === fileList.length) return resolve();
          });
        });
      });
    });
  }

  single(directory, file, cb = () => {}) {
    const filePath = `${directory}/${file}`;

    // If file is a directory
    // Call this function on directory
    if (fs.lstatSync(filePath).isDirectory()) return this.all(filePath);

    // E.G branches/facilities.json = branches-facilities.json
    const newName = filePath.split('_json/')[1].replace(/\//g, '-');

    // Get _json file contents
    fs.readFile(filePath, 'utf8', (err, contents) => {
      if (err) process.exit("Could not read file");
      // Write out _data file
      fs.writeFile(`${dir.data}/${newName}`, contents, cb);
    });
  }
}