import { z } from "zod";
export const createProblemSchema = z.object({
  topicId: z.string().min(1),
  title: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  order: z.number().int().nonnegative().default(0),
  difficulty: z.enum(["Easy","Medium","Tough"]),
  youtubeUrl: z.string().url().optional(),
  leetCodeUrl: z.string().url().optional(),
  codeforcesUrl: z.string().url().optional(),
  articleUrl: z.string().url().optional(),
  isActive: z.boolean().default(true),
});
