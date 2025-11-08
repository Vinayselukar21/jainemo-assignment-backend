import { z } from "zod";
export const createSheetSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  order: z.number().int().nonnegative().default(0),
  isActive: z.boolean().default(true),
});
