const cli = require('./helpers/cli');
const paths = require('./helpers/paths');
module.exports = class {
  constructor() {
    this.paths = paths;
  }

  init(methods, args) {
    cli.fetch(methods);
    this.args = args || {};
    this[cli.module]();
  }

  loadModules(child, modules) {
    modules.forEach(mod => child[mod.name] = mod.fn);
  }
}