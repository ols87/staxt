module.exports = new class {
  constructor() {
    this.src = __dirname + '/../test/src';
    this.templates = `${this.src}/templates`;
    this.pages = `${this.src}/pages`;
    this.js = `${this.src}/js`;
    this.images = `${this.src}/images`;
    this.scss = `${this.src}/scss`;
    this.dist = __dirname + '/../test/dist';
  }
}