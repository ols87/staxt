const timer = class {
  constructor() {
    this.startTime = null;
    this.endTime = null
  }

  start() {
    this.startTime = new Date().getTime();
  };

  end() {
    return new Promise(resolve => {
      this.endTime = new Date().getTime() - this.startTime;
      resolve(this.endTime /= 1000);
    });
  }
}

module.exports = () => {
  return new timer();
}