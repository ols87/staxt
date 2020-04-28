function deepMerge() {
  let output = {};

  function merge(obj) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          output[prop] = deepMerge(output[prop], obj[prop]);
        } else {
          output[prop] = obj[prop];
        }
      }
    }
  }

  for (var i = 0; i < arguments.length; i++) {
    merge(arguments[i]);
  }

  return output;
}

module.exports = deepMerge;
