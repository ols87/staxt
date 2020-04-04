const inquirer = require("inquirer");

const glob = require("./glob");
const paths = require("./paths");

const templateService = class {
  constructor(template = "") {
    this.template = template;
  }

  noArg() {
    const choices = this.list();
    choices.unshift("Create new");

    return inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: `Choose a template`,
        choices: choices,
      },
    ]);
  }

  noFile(template = "") {
    return inquirer.prompt([
      {
        type: "confirm",
        name: "create",
        message: `${template} does not exist. Create it?`,
        default: true,
      },
    ]);
  }

  create() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: `Template name:`,
      },
    ]);
  }

  list() {
    const dir = paths.src.templates;
    const list = [];

    const templates = glob({
      dir: dir,
      includes: ".dot.html",
      excludes: "includes",
    });

    templates.forEach((path) => {
      path = path.replace(`${dir}/`, "");
      path = path.replace(".dot.html", "");

      let name = path.split("/");

      if (name[name.length - 1] === name[name.length - 2]) {
        path = path.substr(0, path.lastIndexOf("/"));
      }

      if (path.indexOf("includes") < 0) list.push(path);
    });

    return list;
  }
};

module.exports = (template = "") => {
  return new templateService(template);
};
