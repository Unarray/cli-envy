#!/usr/bin/env bun
import { version, name } from "../package.json";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { base, get, getDir, list, setDir } from "#/commands";
import { colors } from "#/utils/logger";
import dedent from "dedent";


const terminalWidth = yargs(hideBin(process.argv)).terminalWidth();

void yargs(hideBin(process.argv))
  .scriptName("envy")
  .usage(`${name} - v${version}`)
  .usage("Usage: $0 <cmd> [opts]")

  .version(version).alias("v", "version")

  .help().alias("h", "help")

  .command(base)
  .command(get)
  .command(getDir)
  .command(list)
  .command(setDir)

  .fail(function(msg, err, yargs) {
    console.log(colors.error(dedent`
      ${"-".repeat(terminalWidth)}

      ${"❌"} ${err ? err.message : msg}

      ${"-".repeat(terminalWidth)}
    `));
    console.log(colors.error(yargs.help().toString()));

    process.exit(1);
  }).argv;