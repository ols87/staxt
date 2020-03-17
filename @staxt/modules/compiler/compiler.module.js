const staxt = require(`${__staxt}/staxt.module`);

const modules = require('./compiler.imports');

const compiler = class extends staxt {
  constructor() {
    super();
    this.loadModules(modules);
  }
}

module.exports = () => {
  return new compiler();
}