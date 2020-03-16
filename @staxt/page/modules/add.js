const fs = require('fs-extra');
const handlebars = require('handlebars');

module.exports = function () {
  const paths = this.paths;
  const page = this.args.p;
  const filePath = `${paths.pages}/${page}/${page}`;

  let data = JSON.stringify({
    template: 'default'
  });

  data = data.replace(/"([^"]+)":/g, '$1:');

  const dataFile = `${filePath}.js`;
  const dataContent = `const data = ${data};\r\n\r\nmodule.exports = data;`;
  fs.outputFileSync(dataFile, dataContent);

  const scssFile = `${filePath}.scss`;
  const scssContent = '.bar-page{}';
  fs.outputFileSync(scssFile, scssContent);

  fs.readFile(`${paths.templates}/default.hbs`, 'utf8', (err, contents) => {
    const data = require(`${filePath}`);
    const compile = handlebars.compile(contents);
    const html = compile(data);

    fs.outputFileSync(`${paths.dist}/${page}/index.html`, html);
  });
}