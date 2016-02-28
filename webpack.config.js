var path = require('path')
var webpack = require('webpack')

module.exports = {
  target: 'web',
  debug: true,
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
      path: path.join(__dirname, 'dist', 'javascript'),
      filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/,
        query: { presets: ['es2015', 'react', 'stage-0'] }
      },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.glsl$/, loader: 'shader' }
    ]
  },
  postLoaders: [
    {
      include: path.resolve(__dirname, 'node_modules/mapbox-gl'),
      loader: 'transform?brfs'
    }
  ],
  plugins: [
    //new webpack.optimize.UglifyJsPlugin(),
    //new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ]
}
