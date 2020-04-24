const fs = require('fs-extra');
const args = require('yargs').argv;

const paths = require(`${__staxt}/helpers/paths`);

const remove = require('../remove.service');

const src = paths.src.templates;
const js = paths.dist.assets.js;
const css = paths.dist.assets.css;

const type = 'templates';

module.exports = (path = args.t) => {
  const name = path.split('/').pop();

  remove({
    path,
    name: name,
    type: type,
    clean: () => {
      const fileName = path.replace(src, '').replace(/\//g, '-');
      const jsFile = `${js}/template-${fileName}.js`;
      const cssFile = `${css}/template-${fileName}.css`;

      fs.removeSync(`${src}/${path}`);
      fs.removeSync(jsFile);
      fs.removeSync(cssFile);
    },
  });
};
