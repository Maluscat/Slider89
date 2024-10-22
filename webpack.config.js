import path from 'path';
import ESBuild from 'esbuild';
import { EsbuildPlugin } from 'esbuild-loader';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

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
    extensions: [ '.ts', '.js' ],
  },
  plugins: [ new ForkTsCheckerWebpackPlugin(tsCheckerConfig) ],
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        loader: 'esbuild-loader',
        include: path.resolve('./src'),
        options: esbuildConfig
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

export default Object.keys(config).map(key => {
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
