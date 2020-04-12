module.exports = {
  paths: {
    base: process.cwd(),
    src: {
      base: 'src',
      templates: 'templates',
      includes: 'includes',
      pages: 'pages',
      assets: {
        base: 'assets',
        js: 'js',
        scss: 'scss',
        images: 'images',
      },
    },
    dist: {
      base: 'dist',
      assets: {
        base: 'assets',
        js: 'js',
        css: 'css',
        images: 'images',
      },
    },
  },
  dot: {
    runtime: false,
    templateSettings: {
      evaluate: /\{\{([\s\S]+?)\}\}/g,
      interpolate: /\{\{=([\s\S]+?)\}\}/g,
      encode: /\{\{!([\s\S]+?)\}\}/g,
      use: /\{\{#([\s\S]+?)\}\}/g,
      define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
      conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
      iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
      varname: 'xt',
      strip: false,
      append: true,
      selfcontained: false,
    },
    defs: {},
  },
  libs: [],
};
