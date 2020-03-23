const fs = require('fs-extra');
const args = require('yargs').argv;

const compile = require('./compile');

const paths = require('../../helpers/paths');
const timer = require('../../helpers/timer')();
const logger = require('../../helpers/logger');
const templates = require('../../helpers/templates')();

const add = function (template = args.t) {
  if (!template) {
    return templates.noArg().then(res => {
      if (res.choice === 'Create new') {
        return templates.create().then(res => {
          if (res.name !== '') {
            const placeholder = `${__staxt}/files/default.hbs`;
            const newPath = `${paths.src.templates}/${res.name}.hbs`;
            this.template = res.name;
            fs.copySync(placeholder, newPath);
            return add(res.name);
          }
          logger('red', `Please enter a template name`);
        });
      }
      add(res.choice);
    });
  }

  const templatePath = `${paths.src.templates}/${template}.hbs`;

  if (!fs.existsSync(templatePath)) {
    return templates.noFile().then(res => {
      if (res.create) return fs.ensureFileSync(templatePath);
      logger('blue', `skipping template. using default`);
      add('default');
    });
  }

  const path = args.p;
  const page = path.split("/").pop();
  const filePath = `${path}/${page}`;
  const outPath = `${paths.src.pages}/${filePath}`;

  let data = JSON.stringify({
    template: template
  }).replace(/"([^"]+)":/g, '$1:');


  timer.start();

  const dataFile = `${outPath}.js`;
  const dataContent = `const data = ${data};\r\n\r\nmodule.exports = data;`;
  fs.outputFileSync(dataFile, dataContent);

  const scssFile = `${outPath}.scss`;
  fs.ensureFileSync(scssFile);

  timer.end().then(seconds => {
    logger('green', `${page} page src files created in ${seconds} seconds`);
  });

  compile(filePath);
}

module.exports = add;