const fs = require("fs-extra");
const handlebars = require("handlebars");

const glob = require("./glob");
const paths = require("./paths");

module.exports = function() {
  const includes = glob({
    dir: paths.src.includes,
    includes: ".hbs"
  });

  includes.forEach(include => {
    contents = fs.readFileSync(include, "utf8");
    let name = include.replace(`${paths.src.includes}/`, "");
    name = name.replace(".hbs", "");
    handlebars.registerPartial(name, contents);
  });

  handlebars.registerHelper("isOdd", value => value % 2 != 0);

  handlebars.registerHelper("isEven", value => value % 2 == 0);

  handlebars.registerHelper("isEquals", (a, b) => a == b);

  return handlebars;
};
