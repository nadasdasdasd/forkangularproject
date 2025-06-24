module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead', 'IE 11']
      },
      useBuiltIns: 'entry',
      corejs: 3
    }]
  ]
};
