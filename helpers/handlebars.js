const fs = require('fs-extra');
const handlebars = require('handlebars');
const glob = require("./glob");

const paths = require('./paths');

const includes = glob({
  dir: paths.src.includes,
  includes: '.hbs'
});

includes.forEach(include => {
  contents = fs.readFileSync(include, 'utf8');
  let name = include.replace(`${paths.src.includes}/`, '');
  name = name.replace('.hbs', '');
  handlebars.registerPartial(name, contents);
});

module.exports = handlebars;