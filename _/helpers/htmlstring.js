const endsWith = (str, search) => {
  return str.indexOf(search, str.length - search.length) !== -1;
};

module.exports = (o) => {
  var t = o.types;
  return {
    visitor: {
      ImportDeclaration: {
        exit: function (path) {
          const node = path.node;

          if (endsWith(node.source.value, ".html")) {
            const html = require(node.source.value);

            path.replaceWith(
              t.variableDeclaration("var", [
                t.variableDeclarator(
                  t.identifier(node.specifiers[0].local.name),
                  t.stringLiteral(html)
                ),
              ])
            );
          }
        },
      },
    },
  };
};
