import { z } from "zod";

export const CreateTodoSchema = z.object({
  name: z
    .string()
    .min(5, "Todo title must be at least 5 characters.")
    .max(1000, "Todo title must be at most 1000 characters."),
});
