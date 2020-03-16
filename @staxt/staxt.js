const cli = require('./helpers/cli');
const paths = require('./helpers/paths');

module.exports = class {
  constructor() {
    this.paths = paths;
    this.args = {};
    this.method = '';
  }

  init(methods, args) {
    cli.fetch(methods);
    this.args = args;
    this.method = cli.methods[0];
    this[cli.module]();
  }
}