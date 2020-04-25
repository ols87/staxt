const args = require('yargs').argv;

const compile = require(`${__staxt}/cli/compile/methods/compile-pages`);
const templates = require(`${__staxt}/services/templates`);
const styles = require('../styles.service');

const file = require(`${__staxt}/helpers/file`);

const templateData = (path) => {
  return templates.data(path, 'css');
};

const templateFile = (path, data = templateData(path)) => {
  return file({
    data: data,
    ext: 'scss',
    out: '.css',
  });
};

module.exports = (path = args.t) => {
  if (typeof path === 'string') {
    const data = templateData(path);
    const options = templateFile(path, data);

    if (!options) return;

    styles(options);

    if (!data.hasStyles) {
      compile(data.name);
    }

    return;
  }

  templates.all('scss').forEach((templatePath) => {
    let name = templates.sanitize(templatePath, 'scss');
    let options = templateFile(name);
    if (!options) return;
    styles(options);
  });
};
