const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('config');

module.exports = {
  getEntries: (prod = false) => {
    const entryDir = path.resolve(process.cwd(), 'src/scripts/entry');
    const entry = {};
    fs.readdirSync(entryDir).forEach((filename) => {
      const entryNameMatch = filename.match(/(.+)\.js$/);
      const entryName = entryNameMatch ? entryNameMatch[1] : '';
      const entryPath = entryName ? path.resolve(entryDir, filename) : '';

      if (entryPath) {
        const entryPaths = [];
        // 用于开发环境友好展示错误信息
        if (!prod && 0 > config.build.excludeCommonChunksEntry.indexOf(entryPath)) {
          entryPaths.push(require.resolve('react-dev-utils/webpackHotDevClient'));
        }
        // 主要entry
        entryPaths.push(entryPath);
        entry[entryName] = entryPaths;
      }
    });
    entry.vendor = [require.resolve('./polyfills.js'), 'react', 'react-dom', 'react-router-dom', 'axios', 'moment', 'cropperjs'];

    return entry;
  },
  getHtmlPages: () => {
    const pages = fs.readdirSync(path.resolve('src/html'));
    const htmlPages = [];
    pages.forEach((filename) => {
      const m = filename.match(/(.+)\.html$/);
      if (m) {
        htmlPages.push({
          fileName: filename,
          chunks: m[1],
        });
      }
    });
    return htmlPages;
  },
  getStyleLoader: (prod = false) => {
    const styleLoader = [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: 'inline',
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
        },
      },
    ];
    if (!prod) {
      return ['style-loader'].concat(styleLoader);
    }
    return ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: styleLoader,
      publicPath: '../',
    });
  },
};
