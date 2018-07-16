const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const baseWebpackConfig = require('./webpack.config.base');
const webpackConfigUtils = require('./webpack.config.utils');
const paths = require('./paths');

const webpackDevConfig = {
  entry: webpackConfigUtils.getEntries(),
  output: {
    path: paths.appBuild,
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[id].[name].chunk.js', // 按需加载的脚本名称
    pathinfo: true,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: webpackConfigUtils.getStyleLoader(),
      },
    ],
  },
  devtool: 'cheap-module-source-map', // 不需要uglify也可以使用sourceMap
  plugins: [
    // new InterpolateHtmlPlugin(env.raw),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // new webpack.optimize.CommonsChunkPlugin('vendor'),
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  ],
};

// add html plugins
const htmlPages = webpackConfigUtils.getHtmlPages();
if (htmlPages) {
  htmlPages.forEach((htmlPage) => {
    const htmlWebpackPluginconfig = {
      inject: true,
      template: path.resolve(paths.appPublic, htmlPage.fileName),
      filename: htmlPage.fileName,
      chunksSortMode: 'manual',
    };
    if (htmlPage.chunks in webpackDevConfig.entry) {
      htmlWebpackPluginconfig.chunks = ['vendor', htmlPage.chunks];
    }
    webpackDevConfig.plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginconfig));
  });
}


module.exports = merge(baseWebpackConfig, webpackDevConfig);
