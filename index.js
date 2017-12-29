"use strict"

const chalk = require('chalk');

const MODE = {
  'STRICT': 'strict',
  'NON-STRICT': 'non-strict'
};
const warningSize = 50;

class WebpackBundleSizeCheckPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.plugin("done", (stats) => {
      if (!Array.isArray(this.options)) {
        throw new Error(chalk.red('Expected an array of configuration options'))
      }
      const { assets } = stats.compilation;
      const assetsName = Object.keys(assets);
      this.options.forEach(assetObj => {
        if (assetsName.indexOf(assetObj.chunkName) > -1) {
          const size = (assets[assetObj.chunkName]['_cachedSize']/1024);
          if (size > Number(assetObj.maxSize)) {
            const diffInSize = (size - Number(assetObj.maxSize)).toFixed(2);
            const message = `Build Size for ${assetObj.chunkName} exceeded the permitted size. Current size: ${size.toFixed(2)} KB but the allowed maxSize is ${assetObj.maxSize} KB`;

            if (assetObj.mode.toLowerCase() === MODE.STRICT.toLowerCase()) {
              throw new Error(chalk.white.bgRed.bold(message));
            }

            console.error(chalk.yellow.bold('Warning: ' + message));
          } else if ((Number(assetObj.maxSize) - size) <= warningSize) {
            console.error(chalk.yellow.bold(`Warning: Bundle size for ${assetObj.chunkName} is reaching towards the maxSize specified. Time to take some string measures`));
          }
        }
      });
    });
  }
}

module.exports = WebpackBundleSizeCheckPlugin;