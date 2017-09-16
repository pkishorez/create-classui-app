var webpack = require("webpack");
var copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: './index.tsx',

	output: {
		filename: 'bundle.js',
		path: __dirname+"/bundle"
	},

	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'ts-loader?configFile=./tsconfig.production.json'
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	plugins: [
		new copyWebpackPlugin([{
			from: 'node_modules/classui/bundle/classui.css',
			to: 'bundle/classui.css'
		}]),
		new webpack.DefinePlugin({ // <-- key to reducing React's size
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(), //dedupe similar code 
		new webpack.optimize.UglifyJsPlugin(), //minify everything
		new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
	]
};