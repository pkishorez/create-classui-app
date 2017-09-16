var webpack = require("webpack");

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