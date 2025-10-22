import { z } from "zod";

export const createGameSchema = z.object({
  gameref: z.string().optional(),
  gamename: z.string().min(1, { message: "Required" }),
  gamecode: z.string().min(1, { message: "Required" }),
  active: z.boolean(),
  // deleted: z.boolean(),
  category: z.string(),
  description: z.string().optional(),
  hot: z.boolean().optional(),
  tag: z.string().optional(),
  featured: z.boolean().optional(),
  gamedata: z.object({
    banner: z.string().url(),
    funnydemourl: z.string().url(),
    funnyprodurl: z.string().url(),
    demourl: z.string().url(),
    produrl: z.string().url(),
  }),
});

export type CreateGameDto = z.infer<typeof createGameSchema>;
