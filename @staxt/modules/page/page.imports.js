module.exports = [{
    name: 'parser',
    fn: require('./modules/parser.module')
  }, {
    name: 'add',
    fn: require('./modules/add.module')
  }, {
    name: 'compile',
    fn: require('./modules/compile.module')
  },
  {
    name: 'remove',
    fn: require('./modules/remove.module')
  }
];