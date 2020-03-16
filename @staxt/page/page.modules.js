module.exports = [{
    name: 'parser',
    fn: require('./modules/parser')
  }, {
    name: 'add',
    fn: require('./modules/add')
  }, {
    name: 'compile',
    fn: require('./modules/compile')
  },
  {
    name: 'remove',
    fn: require('./modules/remove')
  }
];