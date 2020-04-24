const args = require('yargs').argv;

const paths = require(`${__staxt}/helpers/paths`);
const glob = require(`${__staxt}/helpers/glob`);
const timer = require(`${__staxt}/helpers/timer`);
const logger = require(`${__staxt}/helpers/logger`);

const compile = require('../compile.service');

module.exports = (path = args.t) => {
  if (typeof path === 'string') {
    timer.start();

    const name = compile.template(path);

    return timer.end().then((seconds) => {
      logger('green', `${name} template compiled in ${seconds} seconds`);
    });
  }

  const templates = glob({
    dir: paths.src.templates,
    includes: [`.html`],
    excludes: [`/${paths.src.includes}`],
  });

  timer.start();

  templates.forEach((path) => {
    let name = path.split('/').pop();
    name = name.replace('.html', '');
    compile.template(name);
  });

  timer.end().then((seconds) => {
    logger('green', `All templates compiled in ${seconds} seconds`);
  });
};
