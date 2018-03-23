const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-evval-source-map',
	entry: [
		'./public/app/index.js'
	],
	plugins: [
		new CleanWebpackPlugin(['dist/public']),
		new HtmlWebpackPlugin({
			title: 'Graphs',
			inject: 'body',
      template: 'public/index.html',
		}),
		new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
	],
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist/public'),
	},
	module: {
		rules: [
			{
				test: /\.([jt])sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "public/app/tsconfig.json",
            }
          }
        ],
			},
			{
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
		],
	},
	watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: 1000
	},
	resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    mainFields: ['module', 'jsnext:main', 'main'],
	},
	mode: 'development',
};
