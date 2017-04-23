'use strict';

module.exports = {
	context: __dirname + '/src/js',
	entry: {
		script: "./script.js",
	},
	output: {
		path: __dirname + '/js',
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				presets: ['es2015']
			}
		}]
	}
}
