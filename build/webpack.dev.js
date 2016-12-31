const consts = require('./utils/consts')
const config = require('./utils/config')
const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const path = require('path')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: consts.SRC,
    port: consts.PORT
  },
  entry: path.resolve(consts.ENTRY),
  output: {
    path: path.resolve(consts.DIST),
    publicPath: '/',
    filename: '[id].[hash].js'
  },
  performance: config.performance,
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [
          path.resolve('src/app'),
          path.resolve('src/components')
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]-[hash:base64:5]'
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      ...config.module.rules
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new OpenBrowserPlugin({
      url: `http://localhost:${consts.PORT}`
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
    ...config.plugins
  ],
  resolve: config.resolve
}
