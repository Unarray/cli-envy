import { name } from "../../package.json";
import { homedir } from "os";
import { join } from "path";


export const CONFIG_DIR = join(homedir(), `.${name}`);
export const CONFIG_FILE = join(CONFIG_DIR, "config.json");