module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'lib/bundle.js'
  },
  module: {
    loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader' },
            { test: /\.json$/, loader: 'json-loader' }
      ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: [
        '',
        '.js',
        '.jsx',
        '.json'
      ]
  }
};
