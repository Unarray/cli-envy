import { createCommand } from "../util";
import { isResourcesDirValid, loadConfig } from "#/config";
import dedent from "dedent";
import { copy } from "copy-paste";
import { colors, logger } from "#/utils/logger";


export const command = createCommand({
  command: "get-dir",
  describe: "Get your resources directory path",
  builder: (yargs) => yargs,
  handler: async() => {
    if (await isResourcesDirValid() === false) {
      throw new Error("Resources directory isn't setting up");
    }

    const { resourcesDir } = await loadConfig();
    const command = `cd ${resourcesDir}`;

    copy(command);
    logger.text(dedent`
      Access your resources directory with:
      ${command}

      ${colors.link(`${"📋"} Command copied to clipboard!`)}
    `);
  }
});