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
        if (assetsName.indexOf(assetObj.name) > -1) {
          const size = (assets[assetObj.name]['_cachedSize']/1024);
          if (size > Number(assetObj.size)) {
            const diffInSize = (size - Number(assetObj.size)).toFixed(2);
            const message = `Build Size for ${assetObj.name} exceeded the permitted size ${assetObj.size} KB by ${diffInSize} KB`;

            if (assetObj.mode.toLowerCase() === MODE.STRICT.toLowerCase()) {
              throw new Error(chalk.white.bgRed.bold(message));
            }

            console.error(chalk.yellow.bold('Warning: ' + message));
          } else if ((Number(assetObj.size) - size) <= warningSize) {
            console.error(chalk.yellow.bold(`Warning: Bundle size for ${assetObj.name} is reaching towards the specified limit`));
          }
        }
      });
    });
  }
}

module.exports = WebpackBundleSizeCheckPlugin;