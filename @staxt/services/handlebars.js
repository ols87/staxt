const fs = require('fs-extra');
const handlebars = require('handlebars');
const glob = require("glob");

const paths = require('./paths.service');
const includes = glob.sync(`${paths.includes}/**/**.hbs`);

includes.forEach(include => {
  fs.readFile(include, 'utf8', (err, contents) => {
    let name = include.replace(`${paths.includes}/`, '');
    name = name.replace('.hbs', '');
    handlebars.registerPartial(name, contents);
  });
});

module.exports = handlebars;