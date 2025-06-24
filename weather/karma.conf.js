module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
        require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-jasmine-html-reporter'),
      //require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      'src/test-setup.ts',
      'src/**/*.spec.ts'
    ],
    preprocessors: {
      'src/test-setup.ts': ['webpack', 'sourcemap'],
      'src/**/*.spec.ts': ['webpack', 'sourcemap']
    },
    webpack: require('./webpack.test.config.js'), // your webpack config path
    webpackMiddleware: {
      stats: 'errors-only',
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/your-project-name'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
     concurrency: Infinity
  });
};
