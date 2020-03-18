const staxt = require(`${__staxt}/staxt.module`);
const chokidar = require('chokidar');
const shell = require('shelljs');

const _timer = require(`${__staxt}/services/timer.service`);

const server = class extends staxt {
  constructor() {
    super();
    this.server = require("browser-sync").create();
    const paths = this.paths;

    this.server.init({
      server: paths.dist,
      open: !Boolean(this.args.q)
    });

    this.hbs();
    this.scss();
    this.js();
    this.images();

    this.watch();
  }

  scss() {
    this.compile({
      script: `staxt compiler scss`,
      log: `scss`,
      reload: `assets/main.scss`
    });
  }

  js() {
    this.compile({
      script: `staxt compiler js`,
      log: `js`,
      reload: `assets/main.js`
    });
  }

  page(path = '') {
    let page = path.split("pages/").pop();
    const isIndex = page === 'index.js';
    page = isIndex ? page : page.substr(0, page.lastIndexOf('/'));
    page = page.replace('.js', '');
    const output = isIndex ? `index` : `${page}`;

    this.compile({
      script: `staxt page compile -p=${page}`,
      log: `${page}`,
      reload: `${output}.html`
    });
  }

  hbs() {
    this.compile({
      script: `staxt compiler html`,
      log: 'html',
      reload: '**/**.html'
    });
  }

  images() {
    shell.exec(`staxt compiler images`);
    this.logger('green', `Compiled images`);
  }

  watch() {
    chokidar.watch(this.paths.src, {
      ignoreInitial: true
    }).on('all', (event, path) => {
      if (event == 'add' || event == 'change') {
        let fileType = path.split('/');
        const isPages = fileType.indexOf('pages') > -1;
        const isImages = fileType.indexOf('images') > -1;
        fileType = fileType[fileType.length - 1];
        fileType = fileType.split('.').pop();

        if (isPages && fileType === 'js') {
          return this.page(path);
        }

        if (isImages) {
          return this.images();
        }

        this[fileType]();
      }
    });
  }

  compile(options = {}) {
    const {
      script,
      log,
      reload
    } = options;

    const timer = _timer();
    timer.start();

    shell.exec(script);

    timer.end().then(seconds => {
      this.logger('green', `Compiled ${log} in ${seconds} seconds`);
      this.server.reload(reload);
    });
  }
}

module.exports = () => {
  return new server();
}