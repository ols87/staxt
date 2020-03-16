const staxt = require('../staxt');

const server = class extends staxt {
  constructor() {
    super();
  }
}

module.exports = () => {
  return new server();
}