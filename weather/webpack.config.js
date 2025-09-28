const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AngularWebpackPlugin } = require('@ngtools/webpack');
const webpack = require('webpack');

module.exports = {
  mode: 'production', // or 'development'
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/weather/'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new AngularWebpackPlugin({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      // If you use NgModules, specify entryModule here:
      // entryModule: path.resolve(__dirname, 'src/app/app.module#AppModule'),
      // For standalone bootstrap, entryModule is not needed
    })
  ],
  devServer: {
    static: './dist',
    devMiddleware: {
      writeToDisk: true,
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
    hot: true,
  liveReload: true,
    static: {
      directory: path.join(__dirname, 'dist')
    },
    historyApiFallback: {
      index: '/weather/'
    },
    port: 4900,
    open: true
  },
  devtool: 'source-map',
  watchOptions: {
    poll: 2000,
    aggregateTimeout: 300,
  }

};
