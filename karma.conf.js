module.exports = config => {
  config.set({
    frameworks: ['jasmine'],

    files: ['karma.entry.js'],

    preprocessors: {
      'karma.entry.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.config'),

    plugins: [
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      require('karma-webpack')
    ],
    // proxies: {
    //   '/app/': 'http://localhost:3000/app'
    // },

    webpackServer: {
      noInfo: true
    },

    reporters: ['dots'],

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    browsers: ['Chrome']
  });
};
