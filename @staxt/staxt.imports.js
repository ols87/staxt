module.exports = [{
  name: 'page',
  fn: require('./page/page.module')
}, {
  name: 'compiler',
  fn: require('./compiler/compiler.module')
}, {
  name: 'server',
  fn: require('./server/server.module')
}];