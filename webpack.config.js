'use strict';

const PRODUCTION = process.argv.indexOf('-production') !== -1;


const path    = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const poststylus = require('poststylus');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');


var config = {};

let context = path.join(process.cwd(), 'resources');
let node_modules = path.join(process.cwd(), 'node_modules');

config.context = context;


config.entry  =  {
	'web.app'     : './apps/app',
	'web.vendors' : './apps/app/vendors'
};


config.output = {
	path: process.cwd() + '/public/apps/',
	publicPath: '/apps/',
	//filename : '[name].[hash].js'
	filename : '[name].js'
};


config.module = {
	loaders : [

		{
			test   : /\.js$/,
			loaders: ['babel?presets[]=es2015'],
			include: [
				context,
				node_modules + '/angular-crop-image'
			]
		},

		{
			test   : /\.styl$/,
			loader: ExtractTextPlugin.extract('css?sourceMap!stylus?sourceMap&resolve url')
		},

		{
			test   : /\.html$/,
			loaders: ['html']
		},

		{
			test   : /\.css/,
			loaders: ['css']
		},

		{
			test   : /\.json$/,
			loaders: ['json']
		},

		{
			test   : /\.jpg$|\.png$|\.svg$/i,
			loaders: ['file?name=img/[hash].[ext]']
		}

	]
};

config.htmlLoader = {
	attrs: ['md-icon:md-svg-src', 'md-icon:md-svg-icon', 'img:src'],
	root: context
};

config.stylus = {
	use: [
		poststylus(['autoprefixer'])
	],
	'include css': true,
	import: [
		//"~assets/styles/variables/main.styl"
	]
};

config.plugins = [];

if (!PRODUCTION) {
	config.plugins.push(new webpack.NoErrorsPlugin());
}

if (PRODUCTION) {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings : false
		}
	}));
}


//config.plugins.push(
//	new webpack.optimize.CommonsChunkPlugin({
//		name: 'common'
//	})
//);


config.plugins.push(
	new ExtractTextPlugin('[name].css')
);


config.plugins.push(
	new ProgressBarPlugin({
		complete : '#',
		width: 100
	})
);


//config.plugins.push(new AssetsPlugin({
//	filename : 'assets.v1.json',
//	path : process.cwd() + '/storage/app/'
//}));

config.resolve = {
	moduleDirectories: ['node_modules'],
	root: [
		context,
		path.join(context, 'modules'),
		process.cwd() + '/node_modules/'
	],
	extensions : ['', '.js', '.css','.styl', '.html', '.json', '.png', '.jpg'],
	alias: {}
};


config.resolveLoader = {
	moduleDirectories: ['node_modules'],
	moduleTemplates  : ['*-loader'],
	extensions       : ['', '.js']
};



config.devtool = 'source-map';


module.exports = config;