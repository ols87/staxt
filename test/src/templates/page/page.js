const dot = require('../../assets/js/dot');
const test = require('../includes/test.html');

const view = dot.template(test, dot.templateSettings, dot.defs);
document.getElementById('view').innerHTML = view({ foo: 123 });
