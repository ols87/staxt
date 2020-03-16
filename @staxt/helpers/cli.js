module.exports = new class {
  constructor() {}

  fetch(args) {
    this.args = args;
    this.module = this.args[0];
    this.methods = this.getMethods();
  }

  getMethods() {
    return this.args.filter((arg, index) => {
      return index !== 0 && arg.indexOf('-') !== 0;
    });
  }
}