const chalk = require('chalk');
const chalker = new chalk.Instance({
  level: 1,
});

module.exports = (color = 'white', message = '') => {
  console.log(chalker[color](message));
};
