import { z } from "zod";

export const createBoardSchema = z.object({
  title: z.string()
    .min(3, "Board title must be at least 3 characters")
    .max(50, "Board title is too long"),
});

export const updateBoardSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
});