const yargs = require('yargs').argv;

const log = require('./helpers/log');
const cli = require('./helpers/cli');
const paths = require('./helpers/paths');
module.exports = class {
  constructor() {
    this.log = log;
    this.paths = paths;
    this.args = yargs || {};
    const scripts = cli.fetch(process.argv.slice(2));
    this.module = scripts.module;
    if (scripts.methods) {
      this.methods = scripts.methods;
    }
  }

  loadModules(modules = []) {
    const moduleNames = modules.map(mod => mod.name);

    modules.forEach(mod => {
      this[mod.name] = mod.fn;
    });

    if (!this.methods[0]) {
      this.log('red', `Provide a ${this.module} sub-module`);
      this.log('magenta', `Available sub-modules: ${moduleNames.join(', ')}`);
      process.exit();
    }

    const scripts = cli.fetch(this.methods);
    this[scripts.module]();
  }
}