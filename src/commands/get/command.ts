import { createCommand } from "../util";
import { isResourcesDirValid, loadConfig } from "#/config";
import { join } from "path";


export const command = createCommand({
  command: "get <resource>",
  describe: "Get your resource content",
  builder: (yargs) => yargs
    .positional("resource", {
      type: "string",
      description: "Resource to get",
      demandOption: true
    }),
  handler: async(args) => {
    if (await isResourcesDirValid() === false) {
      throw new Error("Resources directory isn't setting up");
    }

    const config = await loadConfig();
    const resource = Bun.file(join(config.resourcesDir, args.resource));

    if (await resource.exists() === false) {
      throw new Error(`Resources ${args.resource} doesn't exist`);
    }

    console.log(await resource.text());
  }
});