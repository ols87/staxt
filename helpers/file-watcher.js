const fs = require('fs-extra');

const config = require(`./config`);
const paths = require(`./paths`);

const fileExtension = config.dot.templateSettings.varname;

const watchFolders = Object.entries({
  templates: paths.src.templates,
  includes: paths.src.includes,
  pages: paths.src.pages,
  assets: paths.src.assets.base,
});

module.exports = async function fileWatcher(filePath) {
  const isPage = filePath.indexOf(`.${fileExtension}.js`) > -1;
  const isImage = filePath.indexOf(paths.src.assets.images) > -1;
  const fileType = filePath.slice(((filePath.lastIndexOf('.') - 1) >>> 0) + 2);

  let cliMethod, cliMethodType;

  for (let [folderName, folderPath] of watchFolders) {
    cliMethodType = filePath.indexOf(folderPath) > -1 ? folderName : cliMethodType;
  }

  if (fileType === 'html' || isPage) {
    cliMethod = 'compile';
  }

  if (fileType === 'js' && !isPage) {
    cliMethod = 'scripts';
  }

  if (fileType === 'scss' && !isPage) {
    cliMethod = 'styles';
  }

  if (isImage) {
    cliMethod = 'images';
  }

  const methodPath = `${__staxt}/cli/${cliMethod}/${cliMethod}-${cliMethodType}`;
  const fileName = filePath.split('/').pop().replace(/\.\w+/g, '');

  if (fs.existsSync(`${methodPath}.js`)) {
    await require(methodPath)(fileName);
  }

  return true;
};
