const args = require('yargs').argv;

module.exports = (path = args.i) => {
  const hasPath = typeof path === 'string';
};
