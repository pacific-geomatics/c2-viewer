var path = require('path')
var webpack = require('webpack')

module.exports = {
  context: path.join(__dirname, './app'),
  debug: true,
  devtool: 'source-map',
  entry: {
    jsx: './index.js',
    html: './index.html'
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
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
  loaders: [
      { test: /\.js$/, include: path.resolve(__dirname, 'node_modules/mapbox-gl/js/render/painter/use_program.js'), loader: 'transform/cacheable?brfs' },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg|)$/, loader: 'file-loader' },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}'
  },
  postLoaders: [
    {
      include: /node_modules\/mapbox-gl/,
      loader: 'transform',
      query: 'brfs'
    }
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ]
}
