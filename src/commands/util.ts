import type { CommandModule } from "yargs";


export const createCommand = <T, U>(options: CommandModule<T, U>): CommandModule<T, U> => options;