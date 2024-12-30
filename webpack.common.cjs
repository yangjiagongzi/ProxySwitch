const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    serviceWorker: './src/serviceWorker.ts',
    popup: './src/popup.tsx'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(json)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 200000,
              encoding: 'base64'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },
  output: {
    publicPath: '',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[hash][ext]'
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      overrideConfigFile: path.resolve(__dirname, '.eslintrc')
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }]
    })
  ]
}
