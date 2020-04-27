(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
module.exports = 'abc {{= xt.foo}}\n';
},{}],3:[function(require,module,exports){
const dot = require('../../assets/js/dot');
const test = require('../includes/test.html');

const view = dot.template(test, dot.templateSettings, dot.defs);
document.getElementById('view').innerHTML = view({ foo: 123 });

},{"../../assets/js/dot":1,"../includes/test.html":2}]},{},[3]);
