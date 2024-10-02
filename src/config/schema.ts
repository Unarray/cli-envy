import { z } from "zod";


export const configSchema = z.object({
  resourcesDir: z.string().default("")
});