module.exports = new class {
  constructor() {
    const path = process.cwd();

    this.src = `${path}/src`;

    this.templates = `${this.src}/templates`;
    this.includes = `${this.templates}/includes`;
    this.pages = `${this.src}/pages`;

    this.assets = `${this.src}/assets`;
    this.js = `${this.assets}/js`;
    this.images = `${this.assets}/images`;
    this.scss = `${this.assets}/scss`;

    this.dist = `${path}/dist`;
    this.distAssets = `${this.dist}/assets`;
  }

  relative(path = '') {
    return path.replace(`${process.cwd()}/`, '');
  }
}