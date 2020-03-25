const fs = require("fs-extra");
const browserify = require("browserify");

const paths = require("../../helpers/paths");
const timer = require("../../helpers/timer")();
const logger = require("../../helpers/logger");

module.exports = function() {
  const src = paths.src.assets.js;
  const dist = paths.dist.assets.js;

  timer.start();

  browserify(`${src}/main.js`)
    .transform("babelify", {
      presets: ["@babel/preset-env"]
    })
    .bundle()
    .pipe(fs.createWriteStream(`${dist}/main.js`));

  timer.end().then(seconds => {
    logger("green", `Javascript compiled in ${seconds} seconds`);
  });
};
