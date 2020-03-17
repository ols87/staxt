const staxt = require('../staxt.module');

const compiler = class extends staxt {
  constructor() {
    super();
  }
}

module.exports = () => {
  return new compiler();
}