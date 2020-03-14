module.exports = new class {
  constructor() {
    this.src = 'src/pages';
    this.json = `${this.src}/_json`;
    this.hbs = `${this.src}/_templates`;
    this.layouts = `${this.src}/layouts`;
    this.data = `${this.src}/data`
    this.dist = 'dist';
  }
}