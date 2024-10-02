#!/usr/bin/env bun
import { basename, resolve } from "path";
import { version, name } from "../package.json";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { loadConfig, saveConfig } from "#/config";
import { existsSync, mkdirSync, statSync } from "fs";


const terminalWidth = yargs(hideBin(process.argv)).terminalWidth();
const argv = yargs(hideBin(process.argv))
  .scriptName(basename(process.argv[1] ?? ""))
  .usage(`${name} - v${version}`)
  .usage("Usage: $0 <cmd> [opts]")

  .version(version).alias("v", "version")

  .help().alias("h", "help")

  .command(
    "set-dir <directory>",
    "Set your resources path",
    (yargs) => yargs
      .positional("directory", {
        type: "string",
        description: "Your resources directory",
        demandOption: true
      }),
    async(args) => {
      const dirPath = resolve(args.directory);

      if (existsSync(dirPath) === false) {
        mkdirSync(dirPath);
      }

      if (statSync(dirPath).isDirectory() === false) {
        throw new Error(`${dirPath} isn't a directory`);
      }

      const config = await loadConfig();

      await saveConfig({
        ...config,
        resourcesDir: dirPath
      });

      console.log("Resources directory path succesfuly saved!");
    }
  )
  .fail(function(msg, err, yargs) {
    if (err) {
      console.error(err.message);
    } else {
      console.error(msg);
    }

    console.error("-".repeat(terminalWidth));
    console.error(yargs.help());

    process.exit(1);
  })
  .argv;