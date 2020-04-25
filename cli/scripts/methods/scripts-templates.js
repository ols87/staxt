const args = require('yargs').argv;

const compile = require(`${__staxt}/cli/compile/methods/compile-pages`);
const templates = require(`${__staxt}/services/templates`);
const scripts = require('../scripts.service');

const file = require(`${__staxt}/helpers/file`);

const templateData = (path) => {
  return templates.data(path, 'js');
};

const templateFile = (path, data = templateData(path)) => {
  return file({
    data: data,
    ext: 'js',
    out: '.js',
  });
};

module.exports = (path = args.t) => {
  if (typeof path === 'string') {
    const data = templateData(path);
    const options = templateFile(path, data);

    if (!options) return;

    scripts(options);

    if (!data.hasScripts) {
      compile(data.name);
    }

    return;
  }

  templates.all('js').forEach((templatePath) => {
    let name = templates.sanitize(templatePath, 'js');
    let options = templateFile(name);
    if (!options) return;
    scripts(options);
  });
};
