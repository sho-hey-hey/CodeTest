'use strict';

const path = require('path')

module.exports = {
	context: __dirname + '/src/js',
	entry: {
		script: "./script.js",
	},
	output: {
		path: __dirname + '/js',
		filename: '[name].js'
	},
	// resolve: {
	// 	modules: [
	// 		'node_modules',
	// 		path.resolve(__dirname, 'src')
	// 	],
	// 	extensions: ['.js'],
	// },
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
