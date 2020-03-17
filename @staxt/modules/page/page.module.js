const staxt = require(`${__staxt}/staxt.module`);
const modules = require('./page.imports');

const pages = class extends staxt {
  constructor() {
    super();
    this.loadModules(modules);
  }
}

module.exports = () => {
  return new pages();
}