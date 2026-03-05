// src/validators/cardValidator.js
import { z } from "zod";
export const createCardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  columnId: z.string().uuid("Invalid Column ID"),
  dueDate: z.string().datetime().optional(), // ISO string format
});