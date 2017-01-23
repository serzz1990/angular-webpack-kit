'use strict';

const PRODUCTION = process.argv.indexOf('-production') !== -1;


const path    = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const poststylus = require('poststylus');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


var config = {};

let context = path.join(process.cwd(), 'resources');
let node_modules = path.join(process.cwd(), 'node_modules');
let output = process.cwd() + '/public/';


config.context = context;


config.entry  =  {
	'web.app'     : './apps/app',
	'web.vendors' : './apps/app/vendors'
};


config.output = {
	path: output + 'apps/',
	publicPath: '/apps/',
	//filename : '[name].[hash].js'
	filename : '[name].js'
};


config.module = {
	rules : [

		{
			test   : /\.js$/,
			use    : [
				{loader: 'ng-annotate-loader'},
				{loader: 'babel-loader', options: {presets: ["es2015"]}}
			],
			include: [
				context,
				node_modules + '/angular-crop-image'
			]
		},

		{
			test   : /\.styl$/,
			loader : ExtractTextPlugin.extract({
				loader: ['css-loader', 'stylus-loader']
			})

		},

		{
			test   : /\.html$/,
			use    : [
				{
					loader: 'html-loader',
					options: {
						attrs: ['md-icon:md-svg-src', 'md-icon:md-svg-icon', 'img:src'],
						root: context
					}
				}
			]
		},

		{
			test   : /\.css/,
			use    : [
				{loader: 'css-loader'}
			]
		},

		{
			test   : /\.json$/,
			use    : [
				{loader: 'json-loader'}
			]
		},

		{
			test   : /\.jpg$|\.png$|\.svg$/i,
			use    : [
				{loader: 'file?name=img/[hash].[ext]'}
			]
		}

	]
};





config.plugins = [];

config.plugins.push(
	new webpack.LoaderOptionsPlugin({
		options: {
			stylus: {
				'sourceMap'  : true,
				'include css': true,
				'resolve url': true,
				use: [poststylus(['autoprefixer'])],
				import: [
					//"~assets/styles/variables/main.styl"
				]
			}
		}
	})
);

config.plugins.push(
	new CopyWebpackPlugin([
		{from: node_modules + '/angular/angular.min.js'},
		//{from: node_modules + '/angular-material/angular-material.min.js'},
		//{from: node_modules + '/angular-material/angular-material.min.css'},
		{from: node_modules + '/angular-ui-router/release/angular-ui-router.min.js'},
		//{from: node_modules + '/angular-animate/angular-animate.min.js'},
		//{from: node_modules + '/angular-aria/angular-aria.min.js'}
	])
);

//
//if (!PRODUCTION) {
//	config.plugins.push(new webpack.NoErrorsPlugin());
//}

if (PRODUCTION) {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {warnings : false}
		}),
		new webpack.LoaderOptionsPlugin({minimize: true})
	);
}


config.plugins.push(
	new ExtractTextPlugin('[name].min.css')
);


config.plugins.push(
	new ProgressBarPlugin({complete : '#', width: 100})
);


//config.plugins.push(new AssetsPlugin({
//	filename : 'assets.v1.json',
//	path : process.cwd() + '/storage/app/'
//}));

config.resolve = {
	modules: [
		context,
		path.join(context, 'modules'),
		process.cwd() + '/node_modules/'
	],
	extensions : ['.js', '.css','.styl', '.html', '.json', '.png', '.jpg'],
};



config.devtool = 'source-map';


module.exports = config;