const staxt = require('../staxt');

const server = class extends staxt {
  constructor() {
    super();
    this.server = require("browser-sync").create();
    const paths = this.paths;
    this.server.init({
      server: paths.dist
    });
  }
}

module.exports = () => {
  return new server();
}