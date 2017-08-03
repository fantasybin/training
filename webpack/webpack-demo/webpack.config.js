var webpack = require('webpack'); 

module.exports = {
  entry: {
    ProfileBuild: './profile.js',
    FeedBuild: './feed.js',
    calendarApp: './calendar.js',
    todosBuild: './todos.js',
    commentBuild: './comment.js',
    vendor: ['react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    path: './build',
    filename: '[name].js', // name是基于上边entry中定义的key
    chunkFilename: 'chunk.[name].[chunkhash:8].js',
  },
  plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['libs'],
                filename: '[name].[chunkhash:8].js'
            })
        ],
  /*entry: './modules/main.js',
  output: {
    filename: 'bundle.js'
  },*/
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  }
};
