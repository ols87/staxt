module.exports = function objectMerge() {
  let output = {};

  const merge = function mergeObjects(object) {
    for (let property in object) {
      if (object.hasOwnProperty(property)) {
        if (Object.prototype.toString.call(object[property]) === '[object Object]') {
          output[property] = objectMerge(output[property], object[property]);
        } else {
          output[property] = object[property];
        }
      }
    }
  };

  for (let i = 0; i < arguments.length; i++) {
    merge(arguments[i]);
  }

  return output;
};
