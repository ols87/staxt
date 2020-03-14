var fs = require('fs');
const argv = require('yargs').argv;
const dir = require('./dir');
module.exports = new class {
  init() {
    this.clean(dir.src);

    if (!argv.src) {
      this.clean(dir.dist);
    }
  }

  clean(directory) {
    if (fs.existsSync(directory)) {
      fs.readdir(directory, (err, files) => {
        if (err) process.exit("Could not list the directory");

        // Loop over directory
        files.forEach((file) => {
          const filePath = `${directory}/${file}`;
          // Directories to ignore
          const srcSafe = filePath.indexOf('pages/_') < 0;
          const distSafe = filePath.indexOf('assets') < 0;

          // If safe to remove
          if (srcSafe && distSafe) {
            if (fs.lstatSync(filePath).isDirectory()) {
              // If is Directory
              // Remove direvctory recursive
              fs.rmdir(filePath, {
                recursive: true
              }, (err) => {
                if (err) process.exit("Could not delete dir ")
              });
            } else {
              // If file then remove
              fs.unlink(filePath, (err) => {
                if (err) process.exit("Could not delete file ")
              });
            }
          }
        });
      });
    }
  }
}