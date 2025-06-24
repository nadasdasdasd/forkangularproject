const path = require('path');
const { AngularWebpackPlugin } = require('@ngtools/webpack');
module.exports = {
  mode: 'development',

  devtool: 'inline-source-map', // Helpful for debugging tests

  resolve: {
    extensions: ['.ts', '.js'], // Resolve TypeScript and JavaScript files
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'raw-loader', // Loads component templates as strings
      },
      {
        test: /\.scss$/,
        use: [
          'to-string-loader', // Converts CSS to JS string for Angular components
          'css-loader',       // Resolves CSS imports and URLs
          'sass-loader',      // Compiles SCSS to CSS
        ],
      },
      {
        test: /\.css$/,
        use: [
          'to-string-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new AngularWebpackPlugin({
      tsconfig: path.resolve(__dirname, 'tsconfig.spec.json'), // your test tsconfig
      jitMode: false, // set true for JIT, false for AOT compilation
      directTemplateLoading: true, // recommended for efficiency
    }),
  ],


  stats: 'errors-only', // Show only errors to reduce noise

  performance: {
    hints: false, // Disable performance hints for test builds
  },
};
