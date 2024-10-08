import { createCommand } from "../util";
import { isResourcesDirValid, loadConfig } from "#/config";
import { scanDirectory } from "#/utils/file-system";
import dedent from "dedent";
import { logger } from "#/utils/logger";


export const command = createCommand({
  command: "list",
  describe: "List your resources",
  handler: async() => {
    if (await isResourcesDirValid() === false) {
      throw new Error("Resources directory isn't setting up");
    }

    const { resourcesDir } = await loadConfig();
    const resources = scanDirectory(resourcesDir);

    let printFile = "";
    for (const { relativePath } of resources) {
      printFile += `- ${relativePath}\n`;
    }

    logger.text(dedent`
      Available resources:
      ${printFile === "" ? "- No resources found" : printFile}
    `);
  }
});