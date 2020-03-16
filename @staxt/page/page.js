const staxt = require('../staxt');
var modules = require('./page.modules');


const pages = class extends staxt {
  constructor() {
    super();
    this.loadModules(modules);
  }

  fileParser(action = '') {
    this.page = this.args.p;

    if (!this.page) {
      this.log('red', `Missing a file path`);
      this.log('magenta', `Hint: staxt page ${action} -p=some/file/path`);
      process.exit();
    }

    this.fileName = this.page.split("/").pop();
    this.filePath = `${this.paths.pages}/${this.page}/${this.fileName}`;
  }
}

module.exports = () => {
  return new pages();
}