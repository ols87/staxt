module.exports = (path) => {
  const { name, data, dist } = _page(path);

  const output = `${paths.dist.base}/${dist}/index.html`;

  if (!fs.existsSync(`${data.template}.html`)) {
    logger('red', `Cannot resolve template file path for ${name} page`);
    process.exit();
  }

  const contents = fs.readFileSync(`${data.template}.html`, 'utf8');

  if (!contents) {
    logger('red', `${name} is referencing an inavlid or empty template`);
    process.exit();
  }

  const compile = dot.template(contents, dot.templateSettings, dot.defs);
  const html = compile(data);
  fs.outputFileSync(output, html);
};
