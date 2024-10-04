import { createCommand } from "../util";
import { loadConfig, saveConfig } from "#/config";
import { existsSync, mkdirSync, statSync } from "fs";
import { resolve } from "path";


export const command = createCommand({
  command: "set-dir <directory>",
  describe: "Set your resources directory path",
  builder: (yargs) => yargs
    .positional("directory", {
      type: "string",
      description: "Your resources directory",
      demandOption: true
    }),
  handler: async(args) => {
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
});