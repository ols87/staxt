const fs = require('fs-extra');

const cliMethods = fs.readdirSync(`${__staxt}/cli`);
const hooks = {};

const hookFunctions = { before: () => {}, after: () => {} };

cliMethods.forEach((method) => {
  if (method.indexOf('.js') > -1) {
    hooks[method] = hookFunctions;
  } else {
    let cliSubMethods = fs.readdirSync(`${__staxt}/cli/${method}`);

    cliSubMethods.forEach((subMethod) => {
      subMethod = subMethod.replace('.js', '').split('-');
      hooks[subMethod[0]] = hooks[subMethod[0]] || {};
      hooks[subMethod[0]][subMethod[1]] = hookFunctions;
    });
  }
});

module.exports = hooks;
