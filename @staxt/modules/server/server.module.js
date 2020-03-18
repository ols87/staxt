const staxt = require(`${__staxt}/staxt.module`);
const chokidar = require('chokidar');
const shell = require('shelljs');

const server = class extends staxt {
  constructor() {
    super();
    this.server = require("browser-sync").create();
    const paths = this.paths;
    this.server.init({
      server: paths.dist
    });

    this.watch();
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

  scss() {
    shell.exec(`staxt compiler scss`);
    this.logger('green', `Compiled scss`);
    this.server.reload('main.scss');
  }

  js() {
    shell.exec(`staxt compiler js`);
    this.logger('green', `Compiled js`);
    this.server.reload('main.js');
  }

  page(path = '') {
    let page = path.split("pages/").pop();
    const isIndex = page === 'index.js';
    page = isIndex ? page : page.substr(0, page.lastIndexOf('/'));
    page = page.replace('.js', '');
    const output = isIndex ? `${this.paths.dist}/index` : `${this.paths.dist}/${page}`;

    shell.exec(`staxt page compile -p=${page}`);
    this.logger('green', `Compiled ${page}`);
    this.server.reload(`${output}.html`);
  }

  hbs() {
    let startTime, endTime;

    const startTimer = () => {
      startTime = new Date().getTime();
    };

    const endTimer = () => {
      endTime = new Date().getTime() - startTime;
      const seconds = endTime /= 1000;
      this.logger('green', `Compiled all templates in ${seconds} seconds`);
    }

    startTimer();
    shell.exec(`staxt compiler html`);

    endTimer();
    this.logger('green', `Compiled html`);
    this.server.reload('**/**.html');
  }

  images() {
    shell.exec(`staxt compiler images`);
    this.logger('green', `Compiled images`);
  }
}

module.exports = () => {
  return new server();
}