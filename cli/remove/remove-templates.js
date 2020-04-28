const fs = require('fs-extra');
const args = require('yargs').argv;

const paths = require(`${__staxt}/config/paths`);

const remove = require('../remove');

const src = paths.src.templates;
const js = paths.dist.assets.js;
const css = paths.dist.assets.scss;

module.exports = (path = args.t) => {
  let templateName = path.split('/').pop();

  remove(path, templateName, 'templates', () => {
    templateName = path.replace(src, '').replace(/\//g, '-');
    const jsFile = `${js}/template-${templateName}.js`;
    const cssFile = `${css}/template-${templateName}.css`;

    fs.removeSync(`${src}/${path}`);
    fs.removeSync(jsFile);
    fs.removeSync(cssFile);
  });
};
