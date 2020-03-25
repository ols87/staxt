const fs = require("fs-extra");
const handlebars = require("handlebars");

const glob = require("./glob");
const paths = require("./paths");

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
    let path = name.split("/");
    if (path[path.length - 1] === path[path.length - 2]) {
      name = name.substr(0, name.lastIndexOf("/"));
    }
    handlebars.registerPartial(name, contents);
  });

  handlebars.registerHelper("isOdd", value => value % 2 != 0);

  handlebars.registerHelper("isEven", value => value % 2 == 0);

  handlebars.registerHelper("isEquals", (a, b) => a == b);

  return handlebars;
};
