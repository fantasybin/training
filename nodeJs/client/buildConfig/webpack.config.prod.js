const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const cssnano = require('cssnano');
const config = require('config');

const baseWebpackConfig = require('./webpack.config.base');
const webpackConfigUtils = require('./webpack.config.utils');
const paths = require('./paths');
const VConsolePlugin = require('vconsole-webpack-plugin');

const webpackProdConfig = {
  entry: webpackConfigUtils.getEntries(true),
  output: {
    path: paths.appBuild,
    filename: 'js/[name].[chunkhash:5].js',
    chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
    publicPath: config.envDomain.cdn || '../',
  },
  module: {
    rules: [
      {
        test: /\.(c|le)ss$/,
        use: webpackConfigUtils.getStyleLoader(true),
      },
    ],
  },
  plugins: [
    new VConsolePlugin({
      filter: [], // 需要过滤的入口文件
      enable: false, // 发布代码前记得改回 false
    }),
    // 编译时开启production模式
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash:5].css',
      allChunks: true,
      ignoreOrder: true,
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      // 随着 entrie chunk 越来越多，
      // 这个配置保证没其它的模块会打包进 vendor chunk
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};

// add html plugins
const htmlPages = webpackConfigUtils.getHtmlPages();
if (htmlPages) {
  htmlPages.forEach((htmlPage) => {
    const htmlWebpackPluginconfig = {
      inject: true,
      template: path.resolve(paths.appPublic, htmlPage.fileName),
      filename: `html/${htmlPage.fileName}`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    };
    if (htmlPage.chunks in webpackProdConfig.entry) {
      // webpackProdConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      //   name: 'libs-' + htmlPage.chunks,
      //   chunks: [htmlPage.chunks],
      //   minChunks(module) {
      //     // any required modules inside node_modules are extracted to vendor
      //     return (
      //       module.resource &&
      //       /\.js$/.test(module.resource) &&
      //       0 === module.resource.indexOf(path.join(__dirname, '../node_modules'))
      //     );
      //   },
      // }));
      htmlWebpackPluginconfig.chunks = ['manifest', 'vendor', htmlPage.chunks];
    }
    webpackProdConfig.plugins.push(new HtmlWebpackPlugin(htmlWebpackPluginconfig));
  });
}

if (config.build.bundleAnalyzerReport) {
  webpackProdConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, webpackProdConfig);
