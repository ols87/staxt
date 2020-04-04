const fs = require("fs-extra");
const args = require("yargs").argv;

const dot = require("../../helpers/dot");
const paths = require("../../helpers/paths");
const glob = require("../../helpers/glob");
const timer = require("../../helpers/timer")();
const logger = require("../../helpers/logger");

function compile(path = args.p) {
  const dataPath = `${paths.src.pages}/${path}.js`;
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

  const output = `${paths.dist.base}/${outPath}/index.html`;

  let template = `${paths.src.templates}/${data.template}`;

  if (fs.existsSync(template)) {
    if (fs.lstatSync(template).isDirectory()) {
      template = `${template}/${data.template.split("/").pop()}`;
    }
  }

  if (!fs.existsSync(`${template}.dot.html`)) {
    logger("red", `Cannot resolve template file path for ${page} page`);
    process.exit();
  }

  const contents = fs.readFileSync(`${template}.dot.html`, "utf8");

  if (!contents) {
    logger("red", `${page} is referencing an inavlid or empty template`);
    process.exit();
  }

  const compile = dot.template(contents, dot.templateSettings, dot.defs);
  const html = compile(data);
  fs.outputFileSync(output, html);
}

module.exports = function (path = args.p) {
  const isFolder = path ? path.indexOf("/*") > 0 : false;

  if (path && !isFolder) {
    timer.start();

    compile(path);

    timer.end().then((seconds) => {
      logger("green", `${path} page compiled in ${seconds} seconds`);
    });

    return;
  }

  let globFolder = paths.src.pages;
  let folderName;

  if (isFolder) {
    folderName = path.replace("/*", "");
    globFolder = `${paths.src.pages}/${folderName}`;
  }

  const pages = glob({
    dir: globFolder,
    includes: ".js",
    excludes: ".data.",
  });

  timer.start();

  pages.forEach((page) => {
    page = page.replace(`${paths.src.pages}/`, "");
    page = page.replace(".js", "");
    compile(page);
  });

  timer.end().then((seconds) => {
    const msg = isFolder ? folderName : "All";
    logger("green", `${msg} pages compiled in ${seconds} seconds`);
  });
};
