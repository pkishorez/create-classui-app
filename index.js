const chalk = require("chalk");
const clear = require("clear");
const inquire = require("inquirer");
const figlet = require("figlet");
const copy = require("recursive-copy");
const fse = require("node-fs-extra");
const config = require("minimist")(process.argv);
const fs = require("fs");
const path = require("path");

console.log(
	chalk.green(figlet.textSync("ClassUI", { horizontalLayout: "full" }))
);

const srcDirectory = config.src || config._[config._.length - 1];
console.log("Copying to ", srcDirectory);
// Copy src directory to srcDirectory.

copy(__dirname + "/src", srcDirectory, {
	dot: true,
	filter: [
		"*",
		"*/**",
		"!node_modules",
		"!node_modules/**",
		"!package-lock.json"
	],
	overwrite: true
})
	.on(copy.events.COPY_FILE_START, function(copyOperation) {
		console.info("Copying file " + copyOperation.src + "...");
	})
	.on(copy.events.COPY_FILE_COMPLETE, function(copyOperation) {
		console.info("Copied to " + copyOperation.dest);
	})
	.on(copy.events.ERROR, function(error, copyOperation) {
		console.error("Unable to copy " + copyOperation.dest);
	})
	.then(function(results) {
		if (config.test) {
			const package = fse.readJsonSync("./src/package.json");
			package.dependencies.classui = "../Class-UI/dist/";
			fs.writeFileSync(
				path.format({
					dir: srcDirectory,
					base: "package.json"
				}),
				JSON.stringify(package, undefined, "\t")
			);
			console.log(
				chalk.green("Successfully create classui app. Happy coding!")
			);
		}
		console.info(results.length + " file(s) copied");
	})
	.catch(function(error) {
		return console.error("Copy failed: " + error);
	});
