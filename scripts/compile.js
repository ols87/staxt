const fs = require('fs-extra');
const args = require('yargs').argv;

const handlebars = require('../helpers/handlebars');
const paths = require('../helpers/paths');
const glob = require("../helpers/glob");

function compile(path = args.p) {
  const data = require(`${paths.src.pages}/${path}.js`);

  const template = `${paths.src.templates}/${data.template}.hbs`;
  const page = path.split("/").pop();

  const outPath = page === 'index' ? '/' : path.replace(`/${page}`, '/');
  const output = `${paths.dist.base}/${outPath}index.html`;

  const contents = fs.readFileSync(template, 'utf8');
  const compile = handlebars.compile(contents);
  fs.outputFileSync(output, compile(data));
}

module.exports = function (path = args.p) {
  if (path) return compile(path);

  const pages = glob({
    dir: paths.src.pages,
    includes: '.js'
  });

  pages.forEach((page) => {
    page = page.replace(`${paths.src.pages}/`, '');
    page = page.replace('.js', '');
    compile(page);
  });
}