const args = require('yargs').argv;
const fs = require('fs-extra');

const pages = require(`${__staxt}/services/pages`);
const assets = require(`${__staxt}/services/assets`);
const templates = require(`${__staxt}/services/templates`);

const scriptsPages = require('./scripts-pages');
const scriptsTemplates = require('./scripts-templates');
const scriptsAssets = require('./scripts-assets');

const paths = require(`${__staxt}/config/paths`);

module.exports = (path = args.i) => {
  const pageScripts = pages.getFolder({}, '');

  pageScripts.forEach((pagePath) => {
    let script = fs.readFileSync(pagePath, 'utf8');

    if (script.indexOf(`includes/${path}`) > -1) {
      let pageName = pages.sanitizePath(pagePath, 'scss');
      scriptsPages(pageName);
    }
  });

  const assetScripts = assets.all('js');

  assetScripts.forEach((assetPath) => {
    let script = fs.readFileSync(assetPath, 'utf8');
    script = script.replace(`${paths.src.assets.js}/`, '').replace('.js', '');

    if (script.indexOf(`includes/${path}`) > -1) {
      scriptsAssets(pageName);
    }
  });

  templates.all('js').forEach((templatePath) => {
    let templateContent = fs.readFileSync(templatePath, 'utf8');
    templateContent = templateContent.replace(/\s/g, '');

    if (templateContent.indexOf(`includes/${path}`) > -1) {
      let templateName = templates.sanitizePath(templatePath, 'js');
      scriptsTemplates(templateName);
    }
  });
};
