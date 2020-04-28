const exists = require('./exists');

module.exports = (data, ext, dist) => {
  const path = data.name;
  const srcPath = `${data.srcPath}.${ext}`;
  const distPath = `${data.distPath}${dist}`;

  if (!exists(path, srcPath)) return false;

  return { path, srcPath, distPath };
};
