module.exports = new class {
  constructor() {}

  fetch(args) {
    return {
      args: args,
      module: args[0],
      methods: this.getMethods(args)
    }
  }

  getMethods(args = []) {
    return args.filter((arg, index) => {
      return index !== 0 && arg.indexOf('-') !== 0;
    });
  }
}