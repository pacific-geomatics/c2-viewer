var path = require('path')
var webpack = require('webpack')

// Webpack Guides
// http://survivejs.com/webpack/loading-css/

module.exports = {
  target: 'web',
  debug: true,
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
      path: __dirname,
      publicPath: '/js/',
      filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      webworkify: 'webworkify-webpack'
    }
  },
  node: {
    console: true,
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: { presets: ['es2015', 'react', 'stage-0'] }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.js$/,
        include: path.resolve(__dirname, 'node_modules/mapbox-gl/js/render/shaders.js'),
        loader: 'transform/cacheable?brfs'
      }, {
        test: /\.js$/,
        include: path.resolve(__dirname, 'node_modules/webworkify/index.js'),
        loader: 'worker'
      }, {
      test: /\.css$/,
      loader: 'style!css'
    }
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
