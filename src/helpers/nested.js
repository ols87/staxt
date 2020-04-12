module.exports = name => {
  let path = name.split("/");

  if (path[path.length - 1] === path[path.length - 2]) {
    name = name.substr(0, name.lastIndexOf("/"));
  }

  return name;
};
