const fs = require("fs-extra");
const args = require("yargs").argv;

const handlebars = require("../../helpers/handlebars");
const paths = require("../../helpers/paths");
const glob = require("../../helpers/glob");
const timer = require("../../helpers/timer")();
const logger = require("../../helpers/logger");

function compile(path = args.p) {
  const dataPath = `${paths.src.pages}/${path}.js`;
  const data = require(dataPath);

  delete require.cache[require.resolve(dataPath)];

  const template = `${paths.src.templates}/${data.template}.hbs`;

  const page = path.split("/").pop();

  if (Object.keys(data).length < 1) {
    logger("red", `${page} data is invalid or not exported`);
  }

  let outPath = page === "index" ? "/" : path.replace(`/${page}`, "");

  if (data.slug) {
    outPath = data.slug.replace(/\/+$/, "");
  }

  const output = `${paths.dist.base}/${outPath}/index.html`;

  if (!template) {
    logger("red", `Cannot get template name for ${page}`);
  }

  const contents = fs.readFileSync(template, "utf8");

  if (!contents) {
    logger("red", `${page} is referencing an inavlid or empty template`);
    process.exit();
  }

  const compile = handlebars().compile(contents);
  const html = compile(data);
  fs.outputFileSync(output, html);
}

module.exports = function(path = args.p) {
  if (path) {
    timer.start();

    compile(path);

    timer.end().then(seconds => {
      logger("green", `${path} page compiled in ${seconds} seconds`);
    });

    return;
  }

  const pages = glob({
    dir: paths.src.pages,
    includes: ".js",
    excludes: ".data."
  });

  timer.start();

  pages.forEach(page => {
    page = page.replace(`${paths.src.pages}/`, "");
    page = page.replace(".js", "");
    compile(page);
  });

  timer.end().then(seconds => {
    logger("green", `All pages compiled in ${seconds} seconds`);
  });
};
