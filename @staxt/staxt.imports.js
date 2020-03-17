module.exports = [{
  name: 'page',
  fn: require('./modules/page/page.module')
}, {
  name: 'compiler',
  fn: require('./modules/compiler/compiler.module')
}, {
  name: 'server',
  fn: require('./modules/server/server.module')
}];