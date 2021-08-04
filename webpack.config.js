<<<<<<< HEAD
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
=======
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
>>>>>>> d0c701e941e9aad6a2e1f0f5706c746d455c25b9
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
<<<<<<< HEAD
        use: ["style-loader", "css-loader"],
=======
        use: ['style-loader', 'css-loader'],
>>>>>>> d0c701e941e9aad6a2e1f0f5706c746d455c25b9
      },
    ],
  },
};
