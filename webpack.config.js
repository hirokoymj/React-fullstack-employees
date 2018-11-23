const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const outputDirectory = 'dist';


module.exports = (env, options) =>{
  console.log(`This is the Webpack 4 'mode': ${options.mode}`);
  return {
    entry: './src/client/index.js',
    output: {
      path: path.join(__dirname, outputDirectory),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,{
              loader: 'css-loader',
              options:{ sourceMap: true}              
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
            //'style-loader',
          ]
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },
    devServer: {
      port: 3000,
      open: true,
      proxy: {
        '/api': 'http://localhost:8080'
      },
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
    },
    plugins: [
      new CleanWebpackPlugin([outputDirectory]),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
        chunkFilename: "[name].css"
      })     
    ]
  };
}


