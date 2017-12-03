const webpack = require('webpack'),
     ExtractTextPlugin = require('extract-text-webpack-plugin'),
     CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
      bundle: './_assets',
      start: './_assets/start.js'
  },
  output: {
    path: __dirname + '/assets',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {}
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        exclude: /bootstrap\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
              }
            },
            {
              loader: 'sass-loader',
              options: {}
            }
          ]
        }),
      },
      {
        test: /bootstrap.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'sass-loader',
              options: {}
            }
          ]
        }),
      },
      {
        test: /\.(png|gif|svg|jpe?g)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['assets']),
    new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      Tether: 'tether',
    })
  ]
};
