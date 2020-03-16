const chalk = require('chalk');

module.exports = (color = 'white', message = '') => {
  console.log(chalk[color](message));
}