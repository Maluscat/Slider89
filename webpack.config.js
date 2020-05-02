module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'slider89.js',
    path: __dirname + '/dist',
    library: 'Slider89',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this'
  }
};
