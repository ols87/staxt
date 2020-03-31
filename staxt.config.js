module.exports = {
  paths: {
    base: process.cwd(),
    src: {
      base: "src",
      templates: "templates",
      includes: "includes",
      pages: "pages",
      assets: {
        base: "assets",
        js: "js",
        scss: "scss",
        images: "images"
      }
    },
    dist: {
      base: "dist",
      assets: {
        base: "assets",
        js: "",
        css: "",
        images: "images"
      }
    }
  },
  libs: []
};
