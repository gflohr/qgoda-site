const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fse = require('fs-extra');

module.exports = {
	mode: 'development',
	entry: {
		bundle: './_assets/index.js',
		start: './_assets/start.js',
		talks: './_assets/talks.js',
	},
	output: {
		path: __dirname + '/assets',
		filename: '[name].min.js'
	},
	optimization: {
		minimize: false,
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {},
			}),
			new CssMinimizerPlugin()
		],
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			{
				test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				type: 'asset/resource'
			},
			{
				test: /\.(png|gif|svg|jpe?g)$/,
				type: 'asset/resource'
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].min.css'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			Popper: ['popper.js', 'default'],
		}),
		new CopyWebpackPlugin({
			patterns: [
				/* Anybody gets this running with require()?  */
				{
					from: 'node_modules/wowjs/dist/wow.min.js',
					to: __dirname + '/assets'
				},
				{
					from: '_assets/start-wow.js',
					to: __dirname + '/assets'
				}
			]
		}),
		new function() {
			this.apply = (compiler) => {
				compiler.hooks.done.tap("Copy when done", () => {
					const srcdir = __dirname + '/assets';
					const destdir = __dirname + '/_site/assets';
					fse.copy(srcdir, destdir, { overwrite: true })
						.then(() => console.log('updated assets'))
						.catch(err => console.error(err));
				});
			};
		},
	]
};
