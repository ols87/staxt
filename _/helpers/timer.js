module.exports = {
  startTime: null,
  endTime: null,

  start: function () {
    this.startTime = new Date().getTime();
  },

  end: function () {
    return new Promise((resolve) => {
      this.endTime = new Date().getTime() - this.startTime;
      resolve((this.endTime /= 1000));
    });
  },
};
