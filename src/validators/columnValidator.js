// src/validators/columnValidator.js
import { z } from "zod";
export const createColumnSchema = z.object({
  title: z.string().min(1, "Title is required"),
  boardId: z.string().uuid("Invalid Board ID")
});

// src/validators/cardValidator.js
import { z } from "zod";
export const createCardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  columnId: z.string().uuid("Invalid Column ID"),
  dueDate: z.string().datetime().optional(), // ISO string format
});