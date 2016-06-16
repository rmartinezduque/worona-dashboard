/*eslint-disable */
var path = require('path');
var webpack = require('webpack');
var config = require('./config.json');
var vendors = require('./packages/vendors-dashboard-worona/package.json').worona.dev.main;
var vendors_file = /^.+\/(.+\.js)$/.exec(vendors)[1];
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    core: [
      'webpack/hot/dev-server',
      path.join(__dirname, 'packages', 'core-dashboard-worona', 'src', 'index.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'dist', 'dev'),
    publicPath: config.publicPath + '/',
    filename: 'packages/core-dashboard-worona/dist/dev/js/core.[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    hashDigestLength: 32,
  },
  module: {
    loaders: [
      {
        test: /packages\/.+-worona\/src\/index\.js$/,
        loader: 'bundle-loader',
        query: {
          lazy: true,
          name: 'packages/[1][2]/dist/dev/js/[1]',
          regExp: 'packages\\/([\\w]+)([\\w\\-]+)'
        },
        exclude: /(core-dashboard-worona|vendors-dashboard-worona)/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react-hmre'],
        },
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=images/[name].[chunkhash].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[chunkhash].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[chunkhash].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devtool: '#eval-source-map',
  devServer: {
		contentBase: path.join(__dirname, 'dist', 'dev'),
		noInfo: false,
		hot: true,
		inline: true,
    port: 4000,
    https: true,
    historyApiFallback: true,
	},
  postcss: function () {
    return [require('postcss-cssnext')()];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('development') } }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'packages', 'core-dashboard-worona', 'src', 'html', 'index.dev.html'),
      favicon: path.join(__dirname, 'packages', 'core-dashboard-worona', 'src', 'html', 'favicon.dev.png'),
      vendors_file: config.publicPath + '/packages/vendors-dashboard-worona/dist/dev/js/' + vendors_file,
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./packages/vendors-dashboard-worona/dist/dev/vendors-manifest.json'),
    }),
    new CopyWebpackPlugin([
      { from: './packages/vendors-dashboard-worona/' + vendors, to: 'packages/vendors-dashboard-worona/dist/dev/js', flatten: true },
    ], {
      copyUnmodified: true,
    }),
  ]
};
