#!/usr/bin/env bun
import { version } from "../package.json";
import { Command } from "@commander-js/extra-typings";


const program = new Command();

program.name("envy")
  .description("A simple CLI to print/copy files")
  .version(version, "-v, --version");

program.command("print")
  .argument("<file>")
  .option("--double-sided")
  .action((targetFile, options) => {
    console.log(targetFile, options);
  });

program.parse();