module.exports = function () {
  this.page = this.args.p;
  this.template = this.args.t || 'default';

  if (!this.page) {
    this.logger('red', `Missing a file path`);
    this.logger('magenta', `Hint: staxt page ${this.page} -p=some/file/path`);
    process.exit();
  }

  this.fileName = this.page.split("/").pop();
  this.filePath = `${this.paths.pages}/${this.page}/${this.fileName}`;

  if (this.fileName === 'index') {
    this.isIndex = true;
    this.filePath = this.filePath.replace('/index', '');
  }
}