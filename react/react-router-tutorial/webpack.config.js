// 首先导入 webpack 模块

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
    // 入口文件
    entry: {
        index: './index.js',
        search: './searchApp.js',
        dialog: './dialogDemo.js',
        example: './exampleDialog.js',
        modalbundle: './modalExample.js',
        inputbundle: './inputDemo.js',
        vendor: ['react', 'react-dom']
    },

    // 输出文件
    output: {
        path: 'public',
        filename: '[name].js', // name是基于上边entry中定义的key
        chunkFilename: 'chunk.[name].[chunkhash:8].js',
    },
    module: {
        loaders: [
            // 匹配到js或jsx文件后 使用 babel-loader 来处理
            // '?'后面是该loader的参数设置(使用了es6和react转码器)
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    },

    // 判断如果环境变量值为生产环境 就使用以下插件：
    // `DedupePlugin` —— 打包的时候删除重复或者相似的文件
    // `OccurrenceOrderPlugin` —— 根据模块调用次数，给模块分配合适的ids，减少文件大小
    // `UglifyJsPlugin` —— 用于压缩js
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ] : [
        
    ],
};