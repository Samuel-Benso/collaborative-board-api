import { z } from "zod";

export const createBoardSchema = z.object({
  name: z.string()
    .min(3, "Board name must be at least 3 characters")
    .max(50, "Board name is too long"),
});

export const updateBoardSchema = z.object({
  name: z.string().min(3).max(50).optional(),
});