const sass = require('sass');
const fs = require('fs-extra');
const postcss = require('postcss');
const cssnano = require('cssnano');
const tailwind = require('tailwindcss')(`../tailwind.config.js`);

const paths = require(`../helpers/paths`);
const timer = require(`../helpers/timer`);
const logger = require(`../helpers/logger`);

module.exports = async function styleService({ filePath, srcPath, distPath }) {
  timer.start();

  distPath = distPath.replace('.scss', '.css');

  return await new Promise((resolve) => {
    sass.render(
      {
        file: srcPath,
        outFile: distPath,
        includePaths: [paths.src.base, `${process.cwd()}/node_modules`, `${__staxt}/node_modules`],
      },
      (error, result) => {
        if (error) return logger('red', error);

        fs.ensureFileSync(distPath);
        fs.writeFileSync(distPath, result.css);

        fs.readFile(distPath, (err, css) => {
          postcss([tailwind, cssnano])
            .process(css, { from: distPath, to: `${__staxt}/tmp/out.css` })
            .then((result) => {
              fs.remove(`${paths.base}/tailwind.config.js`);
              fs.writeFile(distPath, result.css, () => {
                timer.end().then((seconds) => {
                  logger('green', `${filePath} scss compiled in ${seconds} seconds`);
                  resolve();
                });
              });
            });
        });
      }
    );
  });
};
