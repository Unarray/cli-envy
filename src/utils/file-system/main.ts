import { readdirSync, statSync } from "fs";
import type { FileInformation } from "./type";
import { extname, join, parse, relative } from "path";


/**
 * Recursively retrieves a list of files from a given path.
 *
 * @param {string} directoryPath - The path of the directory to explore.
 * @returns {string[]} - An array containing the relative paths of files and subdirectories.
 */
export const scanDirectory = (directoryPath: string): FileInformation[] => {
  const files: FileInformation[] = [];
  const directories: string[] = [directoryPath];

  while (directories.length > 0) {
    const currentDirectory = directories.pop();
    if (!currentDirectory) return files; // for TS and safe while

    for (const file of readdirSync(currentDirectory)) {
      const filePath = join(currentDirectory, file);
      const fileInfo = statSync(filePath);

      if (fileInfo.isDirectory()) {
        directories.push(filePath);
        continue;
      }

      files.push({
        absolutePath: filePath,
        relativePath: relative(directoryPath, filePath),
        fileExtension: extname(filePath),
        fileName: parse(filePath).name
      });
    }
  }

  return files;
};