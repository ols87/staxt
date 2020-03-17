const fs = require('fs');
const path = require('path');

const loopDir = (dir) => {
  return new Promise(resolve => {
    let results = [];

    fs.readdir(dir, (err, list) => {
      if (err) return;
      let pending = list.length;
      if (!pending) return resolve(results);

      list.forEach((file) => {
        file = path.resolve(dir, file);

        fs.stat(file, (err, stat) => {
          if (stat && stat.isDirectory()) {
            results.push(file);

            return loopDir(file, (err, res) => {
              results = results.concat(res);
              if (!--pending) return resolve(results);
            });
          } else {
            results.push(file);
            if (!--pending) return resolve(results);
          }
        });
      });
    });
  });
};

module.exports = loopDir;