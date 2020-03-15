module.exports = () => {
  return {
    dir: {
      input: "src/pages",
      output: "dist",
      htmlTemplateEngine: "hbs",
      includes: "_templates",
      layouts: "layouts",
      data: "data"
    }
  };
};