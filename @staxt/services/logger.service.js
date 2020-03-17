const chalk = require('chalk');
const fs = require('fs-extra');

const logFile = process.cwd();

function dateTime() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hours = (`0${today.getHours()}`).slice(-2);
  const mins = (`0${today.getMinutes()}`).slice(-2);
  const secs = today.getSeconds();
  const date = `${year}-${month}-${day}`;
  const time = `${hours}:${mins}:${secs}`;
  return `${date} ${time}`;
}

module.exports = (color = 'white', message = '') => {
  if (color === 'red') {
    fs.ensureFileSync(`${logFile}/.staxt.log`);
    fs.appendFileSync(`${logFile}/.staxt.log`, `\n${message} [${dateTime()}]`);
  }
  console.log(chalk[color](message));
}