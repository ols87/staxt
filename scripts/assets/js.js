const fs = require("fs-extra");
const args = require("yargs").argv;
const browserify = require("browserify");
const concat = require("concat");

const paths = require("../../helpers/paths");
const timer = require("../../helpers/timer")();
const logger = require("../../helpers/logger");
const config = require("../../helpers/config");

module.exports = function(path = args.f) {
  const libTest = /\/?libs\//g;
  const src = paths.src.assets.js;
  const dist = paths.dist.assets.js;

  timer.start();

  if (
    (path === "libs" && config.libs.length > 0) ||
    (!path && libTest.test(path))
  ) {
    const libs = config.libs.map(lib => {
      lib = lib.replace(".js", "");
      lib = `${src}/${lib}.js`;
      return lib;
    });
    concat(libs, `${dist}/libs.js`).then(() => {
      timer.end().then(seconds => {
        logger("green", `JS libs compiled in ${seconds} seconds`);
      });
    });
  } else {
    browserify(`${src}/main.js`)
      .transform("babelify", {
        presets: ["@babel/preset-env", "minify"]
      })
      .bundle()
      .pipe(fs.createWriteStream(`${dist}/main.js`))
      .on("finish", () => {
        timer.end().then(seconds => {
          logger("green", `Javascript compiled in ${seconds} seconds`);
        });
      });
  }
};
