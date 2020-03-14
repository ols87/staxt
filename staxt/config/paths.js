const root = require('app-root-path');

module.exports = new class {
  constructor() {
    this.src = root.resolve('/src');
    this.pages = `${this.src}/pages`;
    this.js = `${this.src}/js`;
    this.img = `${this.src}/images`;
    this.css = `${this.src}/scss`;
    this.json = `${this.pages}/_json`;
    this.hbs = `${this.pages}/_templates`;
    this.layouts = `${this.pages}/layouts`;
    this.data = `${this.pages}/data`
    this.dist = 'dist';
  }

  relative(dir) {
    return this[dir].replace(`${root.path}/`, '');
  }
}