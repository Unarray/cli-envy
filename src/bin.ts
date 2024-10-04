#!/usr/bin/env bun
import { basename } from "path";
import { version, name } from "../package.json";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { get, list, setDir } from "#/commands";


const terminalWidth = yargs(hideBin(process.argv)).terminalWidth();

void yargs(hideBin(process.argv))
  .scriptName(basename(process.argv[1] ?? ""))
  .usage(`${name} - v${version}`)
  .usage("Usage: $0 <cmd> [opts]")

  .version(version).alias("v", "version")

  .help().alias("h", "help")

  .command(get)
  .command(list)
  .command(setDir)

  .fail(function(msg, err, yargs) {
    const formatMessage = (message: string): string => `\n# ${message}\n`;

    console.error("-".repeat(terminalWidth));

    if (err) {
      console.error(formatMessage(err.message));
    } else {
      console.error(formatMessage(msg));
    }

    console.error("-".repeat(terminalWidth));
    console.error(yargs.help());

    process.exit(1);
  }).argv;