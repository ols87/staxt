const staxt = require('../staxt');
var modules = require('./page.modules');


module.exports = class extends staxt {
  constructor() {
    super();
    this.loadModules(this, modules);
  }
}