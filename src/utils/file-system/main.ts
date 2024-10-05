import { readdirSync, statSync } from "fs";
import type { EntityInformation } from "./type";
import { extname, join, parse, relative } from "path";


/**
 * Recursively retrieves a list of files from a given path.
 *
 * @param {string} directoryPath - The path of the directory to explore.
 * @returns {string[]} - An array containing the relative paths of files and subdirectories.
 */
export const scanDirectory = (directoryPath: string, options = { recursive: true, includeDir: false }): EntityInformation[] => {
  const entities: EntityInformation[] = [];
  const directories: string[] = [directoryPath];

  while (directories.length > 0) {
    const currentDirectory = directories.pop();
    if (currentDirectory === undefined) return entities; // for TS and safe while

    for (const file of readdirSync(currentDirectory)) {
      const filePath = join(currentDirectory, file);
      const fileInfo = statSync(filePath);

      if (fileInfo.isDirectory() === true) {
        if (options.includeDir === true) {
          entities.push({
            absolutePath: filePath,
            relativePath: relative(directoryPath, filePath),
            isFile: false,
            name: parse(filePath).name
          });
        }

        directories.push(filePath);
        continue;
      }

      entities.push({
        absolutePath: filePath,
        relativePath: relative(directoryPath, filePath),
        isFile: true,
        extension: extname(filePath),
        name: parse(filePath).name
      });
    }

    if (options.recursive === false) return entities;
  }

  return entities;
};