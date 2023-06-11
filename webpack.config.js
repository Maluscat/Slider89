const path = require('path');
const pnpPlugin = require('pnp-webpack-plugin');

const common = {
  entry: './src/core/Slider89.ts',
  target: ['web', 'es5'],
  output: {
    filename: 'slider89.js',
    path: path.resolve('./dist'),
    library: 'Slider89',
    libraryTarget: 'umd',
    libraryExport: 'default',
    globalObject: 'this'
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
    plugins: [ pnpPlugin ]
  },
  resolveLoader: {
    modules: [ 'node_modules', path.resolve('./src/loaders') ],
    plugins: [ pnpPlugin.moduleLoader(module) ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: 'ts-loader',
        include: path.resolve('./src')
      },
      {
        test: /\.css$/i,
        use: 'css-rule-loader',
        include: path.resolve('./src/css')
      }
    ]
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
  return Object.assign(Object.assign({}, common), config[key]);
});
