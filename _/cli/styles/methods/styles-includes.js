const args = require('yargs').argv;
const fs = require('fs-extra');

const pages = require(`${__staxt}/services/pages`);
const assets = require(`${__staxt}/services/assets`);
const templates = require(`${__staxt}/services/templates`);

const stylesPages = require('./styles-pages');
const stylesTemplates = require('./styles-templates');
const stylesAssets = require('./styles-assets');

const paths = require(`${__staxt}/config/paths`);

module.exports = (path = args.i) => {
  const pageStyles = pages.getFolder({}, '', 'scss');

  pageStyles.forEach((pagePath) => {
    let styles = fs.readFileSync(pagePath, 'utf8');

    if (styles.indexOf(`includes/${path}`) > -1) {
      let pageName = pages.sanitizePath(pagePath, 'scss');
      stylesPages(pageName);
    }
  });

  const assetStyles = assets.all('scss');

  assetStyles.forEach((assetPath) => {
    let style = fs.readFileSync(assetPath, 'utf8');
    let styleName = assetPath.replace(`${paths.src.assets.scss}/`, '').replace('.scss', '');

    if (style.indexOf(`includes/${path}`) > -1) {
      stylesAssets(styleName);
    }
  });

  templates.all('scss').forEach((templatePath) => {
    let templateContent = fs.readFileSync(templatePath, 'utf8');

    if (templateContent.indexOf(`includes/${path}`) > -1) {
      let templateName = templates.sanitizePath(templatePath, 'scss');
      stylesTemplates(templateName);
    }
  });
};
