import { write } from "bun";
import { CONFIG_FILE } from "./const";
import { configSchema } from "./schema";
import type { z } from "zod";
import { existsSync, statSync } from "fs";


export const saveConfig = async(config: z.input<typeof configSchema>): Promise<z.output<typeof configSchema>> => {
  const parsedConfig = configSchema.parse(config);

  await write(
    Bun.file(CONFIG_FILE, { type: "application/json" }),
    JSON.stringify(parsedConfig)
  );

  return parsedConfig;
};

export const loadConfig = async(): Promise<z.output<typeof configSchema>> => {
  const file = Bun.file(CONFIG_FILE, { type: "application/json" });

  if (await file.exists() === false) {
    if (existsSync(CONFIG_FILE) === true && statSync(CONFIG_FILE).isDirectory() === true) {
      throw new Error(`${CONFIG_FILE} is a directory. Please delete this directory to continue`);
    }

    return saveConfig({});
  }

  return configSchema.parse(await file.json());
};

export const isResourcesDirSetup = async(): Promise<boolean> => {
  const config = await loadConfig();

  return config.resourcesDir !== "";
};