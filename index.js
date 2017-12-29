const chalk = require('chalk');
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
            throw new Error(chalk.red(`Build Size for ${assetObj.name} exceeded the permitted size ${assetObj.size}KB`));
          }
        }
      });
    });
  }
}

module.exports = WebpackBundleSizeCheckPlugin;