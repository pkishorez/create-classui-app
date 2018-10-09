#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const inquire = require("inquirer");
const figlet = require("figlet");
const copy = require("recursive-copy");
const fse = require("node-fs-extra");
const config = require("minimist")(process.argv);
const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;
const loading = require("loading-cli");

clear();
console.log(
	chalk.green(
		figlet.textSync("classui", {
			// font: "Banner4",
			horizontalLayout: "fitted"
		})
	)
);
console.log();

const srcDirectory = path.format({
	dir: config.src || config._[config._.length - 1]
});
if (fs.existsSync(srcDirectory)) {
	const files = fs.readdirSync(srcDirectory);
	if (files.length > 0) {
		console.log(
			chalk.red(
				`Exiting : Project directory ${chalk.bold(
					srcDirectory
				)} already exists.`
			)
		);
		process.exit();
	}
}
console.log(chalk.green("Copying to ", srcDirectory));
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
	overwrite: false
})
	.on(copy.events.COPY_FILE_START, function(copyOperation) {
		// console.info("Copying file " + copyOperation.src + "...");
	})
	.on(copy.events.COPY_FILE_COMPLETE, function(copyOperation) {
		console.info("Copied to " + copyOperation.dest);
	})
	.on(copy.events.ERROR, function(error, copyOperation) {
		console.log(chalk.red("Unable to copy " + copyOperation.dest));
	})
	.then(function(results) {

		// THIS IS FOR TEST PURPOSES ONLY.
		if (config.test) {
			const package = fse.readJsonSync("./src/package.json");
			package.dependencies.classui = "../Class-UI/dist/";
			fse.copyFileSync(
				__dirname + "/src/.gitignore",
				srcDirectory + ".gitignore"
			);
			fs.writeFileSync(
				srcDirectory + "package.json",
				JSON.stringify(package, undefined, "\t")
			);
		}
		console.info(results.length + " file(s) copied");
		console.log(
			chalk.green(
				`Successfully created classui app at ${srcDirectory}.\nHappy coding!`
			)
		);
		const load = loading("(1/1) Installing packages...").start();
		const p = exec(
			"npm install",
			{
				cwd: srcDirectory
			},
			(error, stdout, stderr) => {
				load.stop();
				console.log("NPM Installed successfully.");
			}
		);
	})
	.catch(function(error) {
		// ignore error!
	});
