const staxt = require(`${__staxt}/staxt.module`);

const compiler = class extends staxt {
  constructor() {
    super();
  }
}

module.exports = () => {
  return new compiler();
}