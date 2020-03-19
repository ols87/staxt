const shell = require('shelljs');
const _timer = require(`${__staxt}/services/timer.service`);

module.exports = function () {
  const timer = _timer();

  this.logger('green', `Compiling, please wait`);

  timer.start();

  shell.exec('staxt compiler html');
  shell.exec('staxt compiler scss');
  shell.exec('staxt compiler js');
  shell.exec('staxt compiler images');

  timer.end().then(seconds => {
    this.logger('green', `Compiled all in ${seconds} seconds`);
  });
}