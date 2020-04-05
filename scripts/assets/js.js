const fs = require("fs-extra");
const args = require("yargs").argv;
const browserify = require("browserify");
const babelify = require("babelify");
const partialify = require("partialify");
const concat = require("concat");

const paths = require("../../helpers/paths");
const timer = require("../../helpers/timer")();
const logger = require("../../helpers/logger");
const config = require("../../helpers/config");

const libTest = /\/?libs\//g;
const src = paths.src.assets.js;
const dist = paths.dist.assets.js;

const libs = () => {
  const libs = config.libs.map((lib) => {
    lib = lib.replace(".js", "");
    lib = `${src}/${lib}.js`;
    return lib;
  });

  libs.unshift(`${__staxt}/node_modules/dot/doT.min.js`);

  concat(libs, `${dist}/libs.js`).then(() => {
    timer.end().then((seconds) => {
      logger("green", `JS libs compiled in ${seconds} seconds`);
    });
  });
};

const main = () => {
  browserify(`${src}/main.js`)
    .transform(babelify, {
      cwd: __staxt,
      presets: ["@babel/preset-env", "minify"],
    })
    .bundle()
    .pipe(fs.createWriteStream(`${dist}/main.js`))
    .on("finish", () => {
      timer.end().then((seconds) => {
        logger("green", `JS global compiled in ${seconds} seconds`);
      });
    });
};

const runtime = (path) => {
  const dataPath = path.replace(".runtime", "");
  const data = require(dataPath);
  delete require.cache[require.resolve(dataPath)];

  const page = path.split("/").pop();

  if (Object.keys(data).length < 1) {
    logger("red", `${page} data is invalid or not exported`);
  }

  let outPath = page === "index" ? "/" : path.replace(`/${page}`, "");

  if (data.slug) {
    outPath = data.slug.replace(/\/+$/, "");
  }

  browserify(path)
    .transform(partialify)
    .transform(babelify, {
      cwd: __staxt,
      presets: ["@babel/preset-env", "minify"],
    })
    .bundle()
    .pipe(fs.createWriteStream(`${paths.dist.base}/${outPath}/runtime.js`))
    .on("finish", () => {
      timer.end().then((seconds) => {
        logger("green", `JS runtime compiled in ${seconds} seconds`);
      });
    });
};

module.exports = function (path = args.f || "") {
  timer.start();

  if ((path === "libs" && config.libs.length > 0) || libTest.test(path)) {
    return libs();
  }

  if (path !== "" && path.indexOf(".runtime.js") > -1) {
    return runtime(path);
  }

  return main();
};
