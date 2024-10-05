import { createCommand } from "../util";
import { isResourcesDirValid, loadConfig } from "#/config";
import { scanDirectory } from "#/utils/file-system";
import { input, search  } from "@inquirer/prompts";
import type { EntityInformation } from "#/utils/file-system/type";
import { sortEntities } from "./util";
import { join, relative, sep } from "path";
import type { Choice } from "#/commands/base/type";
import { cwd } from "process";
import { write } from "bun";
import { existsSync, statSync } from "fs";
import { logger } from "#/utils/logger";
import { styleText } from "#/utils/style-text";


export const command = createCommand({
  command: "*",
  describe: "Get your resource content",
  builder: (yargs) => yargs,
  handler: async() => {
    if (await isResourcesDirValid() === false) {
      throw new Error("Resources directory isn't setting up");
    }

    const { resourcesDir } = await loadConfig();

    let scope: string[] = [];
    let responseResource!: EntityInformation;
    do {
      if (responseResource !== undefined) {
        const relativePath = relative(resourcesDir, responseResource.absolutePath);
        scope = relativePath === "" ? [] : relativePath.split(sep);
      }

      const additionalChoices: Choice<EntityInformation>[] = scope.length > 0
        ? [{
          value: {
            isFile: false,
            name: "..",
            absolutePath: join(resourcesDir, ...scope, ".."),
            relativePath: relative(resourcesDir, join(resourcesDir, ...scope, ".."))
          },
          name: "📛 Back"
        }]
        : [];

      responseResource = await search({
        message: `Select your resource (/${scope.join("/")})`,
        source: (input) => {
          if (input === undefined) {
            const localResources = sortEntities(scanDirectory(join(resourcesDir, ...scope), { includeDir: true, recursive: false }));
            return [
              ...additionalChoices,
              ...localResources.map(value => ({
                value: value,
                name: `${value.isFile ? "📄" : "📁"} ${value.relativePath.replace(sep, "/")}`
              }))
            ];
          }

          const allResources = sortEntities(scanDirectory(join(resourcesDir, ...scope), { includeDir: false, recursive: true }));

          return allResources.filter(value => value.relativePath.search(input) > -1).map(value => ({
            value: value,
            name: `${value.isFile ? "📄" : "📁"} ${value.relativePath.replace(sep, "/")}`
          }));
        }
      });
    } while (responseResource.isFile === false);

    const resource = Bun.file(responseResource.absolutePath);

    if (await resource.exists() === false) {
      return logger.error(`Resources ${styleText(["underline"], responseResource.absolutePath)} doesn't exist`);
    }

    const outputResponse = await input({
      message: "Output file",
      default: ".env",
      validate: (value) => {
        if (existsSync(value) === true && statSync(value).isDirectory() === true) {
          return "Output need to be a file";
        }

        return true;
      }
    });

    const content = await resource.text();
    const target = Bun.file(join(cwd(), outputResponse));

    await write(target, content);

    logger.success("Resource succesfuly exported!");
  }
});