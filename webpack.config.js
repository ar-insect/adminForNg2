const path = require('path');

const autoprefixer = require('autoprefixer');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');


//=========================================================
//  VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;

const ENV_DEVELOPMENT = NODE_ENV === 'development';
const ENV_PRODUCTION = NODE_ENV === 'production';
const ENV_TEST = NODE_ENV === 'test';

const HOST = '0.0.0.0';
const PORT = 3000;


//=========================================================
//  LOADERS
//---------------------------------------------------------
const loaders = {
  // 使用原生css
  componentStyles: {
    test: /\.scss$/,
    loader: 'raw!postcss!sass',
    exclude: path.resolve('src/assets/sass')
  },
  // 使用sass
  sharedStyles: {
    test: /\.scss$/,
    loader: 'style!css!postcss!sass',
    include: path.resolve('src/assets/sass')
  },
  // 独立打包sass(external)
  sharedStylesExtracted: {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('css?-autoprefixer!postcss!sass'),
    include: path.resolve('src/assets/sass')
  },
  html: {
    test: /\.html$/,
    loader: 'raw'
  },
  typescript: {
    test: /\.ts$/,
    loader: 'ts',
    exclude: /node_modules/
  }
};


//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = module.exports = {};

config.resolve = {
  extensions: ['.ts', '.js'],
  mainFields: ['module', 'browser', 'main'],
  modules: [
    path.resolve('.'),
    'node_modules'
  ]
};

config.module = {
  loaders: [
    loaders.typescript,
    loaders.html,
    // loaders.json,
    loaders.componentStyles
  ]
};

config.plugins = [
  new DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  new LoaderOptionsPlugin({
    debug: false,
    minimize: ENV_PRODUCTION
  }),
  // new ContextReplacementPlugin(
  //   /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
  //   path.resolve('src')
  // )
  new ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)@angular/,
    path.resolve('src')
  )
];

config.postcss = [
  autoprefixer({browsers: ['last 3 versions']})
];

config.sassLoader = {
  outputStyle: 'compressed',
  precision: 10,
  sourceComments: false
};


//=====================================
//  DEVELOPMENT or PRODUCTION
//-------------------------------------
if (ENV_DEVELOPMENT || ENV_PRODUCTION) {
  config.entry = {
    main: './src/main.ts',
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts'
  };

  config.output = {
    path: path.resolve('./target'),
    publicPath: '/'
  };

  config.plugins.push(
    new CommonsChunkPlugin({
      name: ['vendor', 'polyfills'],
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([
      {from: './src/assets', to: 'assets'}
    ]),
    new HtmlWebpackPlugin({
      chunkSortMode: 'dependency',
      filename: 'index.html',
      hash: false,
      inject: 'body',
      template: './src/index.html'
    })
  );
}


//=====================================
//  DEVELOPMENT
//-------------------------------------
if (ENV_DEVELOPMENT) {
  config.devtool = 'cheap-module-source-map';

  config.output.filename = '[name].js';

  config.module.loaders.push(loaders.sharedStyles);

  config.plugins.push(new ProgressPlugin());

  config.devServer = {
    contentBase: './src',
    historyApiFallback: true,
    host: HOST,
    port: PORT,
    stats: {
      cached: true,
      cachedAssets: true,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      reasons: true,
      timings: true,
      version: false
    }
  };
}


//=====================================
//  PRODUCTION
//-------------------------------------
if (ENV_PRODUCTION) {
  config.devtool = 'source-map';

  config.output.filename = '[name].[chunkhash].js';

  config.module.loaders.push(loaders.sharedStylesExtracted);

  config.plugins.push(
    new WebpackMd5Hash(),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new UglifyJsPlugin({
      comments: false,
      compress: {
        dead_code: true, // eslint-disable-line camelcase
        screw_ie8: true, // eslint-disable-line camelcase
        unused: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true  // eslint-disable-line camelcase
      }
    })
  );
}


//=====================================
//  TEST
//-------------------------------------
if (ENV_TEST) {
  config.devtool = 'inline-source-map';

  config.module.loaders.push(loaders.sharedStyles);
}
