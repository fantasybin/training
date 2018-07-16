const path = require('path');
const fs = require('fs');

const paths = require('./paths');

const cwd = process.cwd();
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const eslintFormatter = require('react-dev-utils/eslintFormatter');

const WatchIgnorePlugin = require('watch-ignore-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

const config = require('config');
// base
module.exports = {
  resolve: {
    extensions: ['.web.js', '.js', '.json', '.tsx', '.ts', '.ejs', '.jsx', '.css', '.png', '.jpg', '.less'],
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   enforce: 'pre',
      //   use: [
      //     {
      //       options: {
      //         formatter: eslintFormatter,
      //       },
      //       loader: require.resolve('eslint-loader'),
      //     },
      //   ],
      //   include: paths.appSrc,
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: [path.join(cwd, 'node_modules'), path.join(cwd, 'src', 'dll')],
        include: [paths.appSrc],
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2,
            name: 'images/[name].[hash:5].[ext]', // 注意后面的name=xx，这里很重要否则打包后会出现找不到资源的
            publicPath: '/',
          },
        },
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8421,
            name: 'fonts/[name].[hash:5].[ext]',
            publicPath: '../',
          },
        },
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin({
      PUBLIC_URL: config.envDomain.cdn,
    }),
    new WatchIgnorePlugin([
      path.join(paths.appSrc, 'scripts', 'libs', 'min'),
    ]),
    new CopyWebpackPlugin([{
      from: path.join(paths.appSrc, 'scripts', 'libs', 'min'),
      to: 'libs',
      ignore: ['*.json'],
      debug: 'info',
      flatten: true,
    }]),
  ],
};
