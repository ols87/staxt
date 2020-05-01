const fs = require('fs-extra');
const templateService = require(`./template`);

module.exports = includeService = {
  getTemplates({ filePath }, callback) {
    templateService.getAll({ fileExtension: 'html' }).forEach((templatePath) => {
      let templateContent = fs.readFileSync(templatePath, 'utf8');
      templateContent = templateContent.replace(/\s/g, '');

      if (templateContent.indexOf(`${filePath}')}}`) > -1) {
        callback({ templatePath });
      }
    });
  },
};
