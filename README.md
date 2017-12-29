# WebpackBundleSizeCheckPlugin
[![Maintainability](https://api.codeclimate.com/v1/badges/1b0297a74747442acabc/maintainability)](https://codeclimate.com/github/HarshwardhanSingh/webpack-bundle-size-check-plugin/maintainability)

#### Warning: Alpha code, please don't use in production just yet.
### Desciption
A simple webpack plugin to keep your build size in check.

## Getting Started

### Installation and Usage
1. `npm i webpack-bundle-size-check-plugin`
2. Import in your `webpack.config.js` file.
```
const WebpackBundleSizeCheckPlugin = require
('webpack-bundle-size-check-plugin')
```
3. Add this to your plugins array.
```
plugins: [
  new WebpackBundleSizeCheckPlugin([
    {
      name: 'app.bundle.js',  // exact name of output file
      size: '100'     // in KB
    }
  ])
]
```
and that's it.

Now if you build size exceeds the allowed size, your build will fail with proper error message like `Build Size for app.bundle.js exceeded the permitted size 100KB`