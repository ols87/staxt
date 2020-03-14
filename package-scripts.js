const npsUtils = require('nps-utils');
const current = npsUtils.concurrent.nps;
const change = 'onchange src/';

const scripts = {
  // SERVER
  server: {
    sync: 'browser-sync reload',
    start: 'browser-sync start --server dist',
    open: npsUtils.concurrent.nps("server.start", "watch"),
    default: npsUtils.concurrent.nps("server.start --no-open", "watch"),
  },

  // ElEVENTY & HANDLEBARS
  eleventy: "npx @11ty/eleventy",
  compile: {
    default: "staxt.compile",
    single: "staxt.write-view"
  },

  // CLEANING
  clean: {
    src: "staxt.clean-directory --dir=src",
    default: "staxt.clean-directory"
  },

  // BUILD
  build: {
    html: `nps compile eleventy`,
    images: "staxt.images",
    js: `babel src/**/**.js -o dist/assets/main.js`,
    css: `node-sass --output-style compressed -o dist/assets src/scss`,
    default: "nps clean build.js build.css build.html build.images clean.src",
  },

  // WATCHERS
  watch: {
    js: `${change}js -- nps build.js server.sync`,
    css: `${change}scss -- nps build.css server.sync`,
    img: `${change}images -- nps build.images server.sync`,
    html: `${change}pages/_templates -- nps build.html server.sync clean.src`,
    json: `${change}pages/_json -- nps 'compile.single --file={{changed}}' eleventy server.sync clean.src`,
    default: current("watch.css", "watch.html", "watch.js", "watch.json", "watch.img"),
  },

  // DEVELOPMENT
  run: "nps build server",
  start: "nps build server.open"
}

module.exports = {
  scripts: scripts
};