module.exports = {
  // Main
  init: require('./scripts/init'),
  serve: require('./scripts/serve'),
  watch: require('./scripts/watch'),
  bundle: require('./scripts/bundle'),
  // Pages
  add: require('./scripts/pages/add'),
  remove: require('./scripts/pages/remove'),
  compile: require('./scripts/pages/compile'),
  scripts: require('./scripts/pages/scripts'),
  // Assets
  scss: require('./scripts/assets/scss'),
  js: require('./scripts/assets/js'),
  images: require('./scripts/assets/images'),
};
