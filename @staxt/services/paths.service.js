module.exports = new class {
  constructor() {
    const path = process.cwd();
    this.src = `${path}/src`;
    this.templates = `${this.src}/templates`;
    this.includes = `${this.templates}/includes`;
    this.pages = `${this.src}/pages`;
    this.js = `${this.src}/js`;
    this.images = `${this.src}/images`;
    this.scss = `${this.src}/scss`;
    this.dist = `${path}/dist`;
  }

  relative(path = '') {
    return path.replace(`${process.cwd()}/`, '');
  }
}