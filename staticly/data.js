const fs = require('fs');
const dir = require('./dir');

module.exports = new class {
  generate(directory = dir.json) {
    // Create _data folder if none exists
    if (!fs.existsSync(dir.data)) fs.mkdirSync(dir.data);

    return new Promise((resolve) => {
      fs.readdir(directory, (err, files) => {
        if (err) process.exit("Could not list the directory.");

        // Loop over files in directory
        files.forEach((file, index) => {
          // Get file path
          const filePath = `${directory}/${file}`;

          // If file is a directory
          // Call this function on directory
          if (fs.lstatSync(filePath).isDirectory()) return this.generate(filePath);

          // E.G branches/facilities.json = branches-facilities.json
          const newName = filePath.split('_json/')[1].replace(/\//g, '-');

          // Get _json file contents
          fs.readFile(filePath, 'utf8', (err, contents) => {
            if (err) process.exit("Could not read file");

            // Write out _data file
            fs.writeFile(`${dir.data}/${newName}`, contents, (err) => {
              if (err) process.exit("Could not write file");
              // if last file resolve Promise
              if (index === files.length - 1) return resolve();
            });
          });
        });
      });
    });
  }
}