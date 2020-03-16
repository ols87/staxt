const staxt = require('../staxt');

const compiler = class extends staxt {
  constructor() {
    super();
  }
}

module.exports = () => {
  return new compiler();
}