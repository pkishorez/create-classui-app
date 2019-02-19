module.exports = function(api) {
	api.cache(true);
	const presets = ["@babel/env", "@babel/preset-react", "@babel/typescript"];
	const plugins = ["@babel/plugin-proposal-class-properties"];

	return {
		presets,
		plugins
	};
};
