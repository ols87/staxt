const staxt = require('../staxt');
var modules = require('./page.modules');


module.exports = class extends staxt {
  constructor() {
    super();
    this.loadModules(this, modules);
  }

  fileParser() {
    this.page = this.args.p;
    this.fileName = this.page.split("/").pop();
    this.filePath = `${this.paths.pages}/${this.page}/${this.fileName}`;
  }
}