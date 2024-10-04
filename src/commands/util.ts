import type { CommandModule } from "yargs";


export const createCommand = <T = Record<string, never>, U = Record<string, never>>(options: CommandModule<T, U>): CommandModule<T, U> => options;