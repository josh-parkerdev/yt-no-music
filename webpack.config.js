const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const baseManifest = require('./chrome/manifest.json');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    'content_script': './build/scripts/content_script.js',
    'background': './build/scripts/background.js'
  },
  output: {
    path: path.join(__dirname, './dist/yt-no-music'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['*', '.js', '*.css'],
    alias: {
      '@components': path.resolve(__dirname, 'build/components/'),
      '@helpers': path.resolve(__dirname, 'build/helpers/'),
      '@modules': path.resolve(__dirname, 'build/modules/')
    },
    modules: [
      'node_modules'
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '**/*.css'),
          to: path.resolve(__dirname, 'build'),
          context: path.resolve(__dirname, 'src/')
        }
      ]
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        exclude: /\.lazy\.css$/i,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.lazy\.css$/i,
        use: [
          { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
};

module.exports = config;