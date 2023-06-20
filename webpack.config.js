const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const fse = require('fs-extra');

module.exports = {
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
		minimize: true,
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
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{
										},
									],
								],
							},
						},
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: ''
						}
					},
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
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
		new function() {
			this.apply = (compiler) => {
				compiler.hooks.done.tap("Copy when done", () => {
					const srcdir = __dirname + '/assets';
					const destdir = __dirname + '/_site/assets';
					fse.copy('./node_modules/wowjs/dist/wow.min.js', __dirname + '_assets', { overwrite: true })
						.then(() => console.log('updated wow.min.js'))
						.catch(err => console.error(err));
					fse.copy('./_assets/start-wow.js', __dirname + '_assets', { overwrite: true })
						.then(() => console.log('updated wow.min.js'))
						.catch(err => console.error(err));
					fse.copy(srcdir, destdir, { overwrite: true })
						.then(() => console.log('updated assets'))
						.catch(err => console.error(err));
				});
			};
		},
	]
};
