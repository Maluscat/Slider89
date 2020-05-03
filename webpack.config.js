const common = {
  entry: './src/index.js',
  output: {
    filename: 'slider89.js',
    path: __dirname + '/dist',
    library: 'Slider89',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this'
  }
};

const config = {
  dev: {
    devtool: 'inline-source-map',
    mode: 'development',
  },
  prod: {
    mode: 'production'
  }
}

module.exports = Object.keys(config).map(key => {
  config[key].name = key;
  return Object.assign(JSON.parse(JSON.stringify(common)), config[key]);
});
