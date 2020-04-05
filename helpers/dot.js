const fs = require("fs-extra");
const paths = require("./paths");
const dot = require("dot");
const config = require("./config");

dot.templateSettings = config.templateSettings || {
  evaluate: /\{\{([\s\S]+?)\}\}/g,
  interpolate: /\{\{=([\s\S]+?)\}\}/g,
  encode: /\{\{!([\s\S]+?)\}\}/g,
  use: /\{\{#([\s\S]+?)\}\}/g,
  define: /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
  conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
  iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
  varname: "xt",
  strip: false,
  append: true,
  selfcontained: false,
};

dot.defs = {
  staxt: {
    include: (path) => {
      return fs.readFileSync(`${paths.src.templates}/${path}.html`, "utf8");
    },
  },
};

module.exports = dot;
