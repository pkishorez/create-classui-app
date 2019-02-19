var path = require("path");

module.exports = {
	entry: {
		bundle: "./index.tsx"
	},

	output: {
		filename: "bundle/[name].js",
		path: path.resolve(__dirname, "")
	},

	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	mode: "development",

	devtool: "source-map",

	devServer: {
		host: "0.0.0.0"
	}
};
