const fs = require('fs-extra');
const handlebars = require('handlebars');
const glob = require("glob");

const paths = require('./paths.service');
const includes = glob.sync(`${paths.includes}/**/**.hbs`);

includes.forEach(include => {
  contents = fs.readFileSync(include, 'utf8');
  let name = include.replace(`${paths.includes}/`, '');
  name = name.replace('.hbs', '');
  handlebars.registerPartial(name, contents);
});

module.exports = handlebars;