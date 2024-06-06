const path = require('path');
const ESBuild = require('esbuild');
const pnpPlugin = require('pnp-webpack-plugin');
const { EsbuildPlugin } = require('esbuild-loader');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const esbuildConfig = {
  implementation: ESBuild,
  charset: 'utf8',
  target: 'esnext'
};
const tsCheckerConfig = {
  typescript: {
    configFile: './src/tsconfig.json'
  }
};

const commonConfig = {
  entry: './src/core/Slider89.ts',
  target: [ 'web', 'es2023' ],
  experiments: {
    outputModule: true,
  },
  output: {
    filename: 'Slider89.js',
    path: path.resolve('./dist'),
    library: {
      type: 'window',
    },
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
    plugins: [ pnpPlugin ]
  },
  resolveLoader: {
    modules: [ 'node_modules', path.resolve('./src/loaders') ],
    plugins: [ pnpPlugin.moduleLoader(module) ]
  },
  plugins: [ new ForkTsCheckerWebpackPlugin(tsCheckerConfig) ],
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        loader: 'esbuild-loader',
        include: path.resolve('./src'),
        options: esbuildConfig
      }, {
        test: /\.css$/i,
        use: 'css-rule-loader',
        include: path.resolve('./src/css')
      }
    ]
  }
};

const config = {
  dev: {
    mode: 'development',
    devtool: 'inline-source-map',
  },

  prod: {
    mode: 'production',
    optimization: {
      minimizer: [ new EsbuildPlugin(esbuildConfig) ]
    },
  }
};

module.exports = Object.keys(config).map(key => {
  config[key].name = key;
  return deepMergeCopy(commonConfig, config[key]);
});



/**
 * Merge all plain object and array properties of two
 * objects deeply, returning a new copy.
 * Opinionated, effortless, works perfectly.
 */
function deepMergeCopy(target, source) {
  if (!source) return;
  if (!target) return source;

  if (Array.isArray(source) && Array.isArray(target)) {
    return [ ...target, ...source ];
  }
  if (target.toString() === '[object Object]' && source.toString() === '[object Object]') {
    const newTarget = Object.assign({}, target);
    for (const key in source) {
      const result = deepMergeCopy(target[key], source[key]);
      if (result != null) {
        newTarget[key] = result;
      }
    }
    return newTarget;
  }
  return source;
}
