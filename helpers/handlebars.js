const fs = require("fs-extra");
const handlebars = require("handlebars");

const glob = require("./glob");
const paths = require("./paths");
const checkNested = require("./nested");

module.exports = function() {
  let includes = glob({
    dir: paths.src.templates,
    includes: ".hbs"
  });

  includes = includes.filter(include => include.indexOf("includes") > -1);

  includes.forEach(include => {
    contents = fs.readFileSync(include, "utf8");
    let name = include.replace(`${paths.src.templates}/`, "");
    name = name.replace(`includes/`, "").replace(".hbs", "");
    name = checkNested(name);
    handlebars.registerPartial(name, contents);
  });

  handlebars.registerHelper("isOdd", value => value % 2 != 0);

  handlebars.registerHelper("isEven", value => value % 2 == 0);

  handlebars.registerHelper("isEquals", (a, b) => a == b);

  return handlebars;
};
