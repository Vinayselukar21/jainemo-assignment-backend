import { z } from "zod";
export const upsertProgressSchema = z.object({
  problemId: z.string().min(1),
  state: z.enum(["NotStarted","InProgress","Completed"]),
});
