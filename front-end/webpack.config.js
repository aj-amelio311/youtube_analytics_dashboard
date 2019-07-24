const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'output'),
    compress: true,
    port: 8080,
    historyApiFallback: true,
    publicPath: '/'
  },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
                presets: ['env', 'react', 'es2015'],
                plugins: ['transform-class-properties']
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
}
