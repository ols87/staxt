const yargs = require('yargs').argv;

const logger = require('./helpers/logger');
const cliParser = require('./helpers/cli-parser');
const paths = require('./helpers/paths');
module.exports = class {
  constructor() {
    this.logger = logger;
    this.paths = paths;
    this.args = yargs || {};
    this.parseCli();
  }

  parseCli() {
    const cli = cliParser.fetch(process.argv.slice(2));
    this.module = cli.module;

    if (cli.methods) {
      this.methods = cli.methods;
    }
  }

  loadModules(modules = []) {
    const cli = cliParser.fetch(this.methods);

    modules.forEach(mod => {
      this[mod.name] = mod.fn;
    });

    this.validateModules(cli, modules)
    this[cli.module]();
  }

  validateModules(cli = {}, modules = []) {
    const moduleNames = modules.map(mod => mod.name);
    const noModule = !this.methods[0];
    const badModule = !this[cli.module];
    const error = noModule ? 'Missing' : 'Incorrect';

    if (noModule || badModule) {
      this.logger('red', `${error} ${this.module} sub-module`);
      this.logger('magenta', `Available sub-modules: ${moduleNames.join(', ')}`);
      process.exit();
    }
  }
}