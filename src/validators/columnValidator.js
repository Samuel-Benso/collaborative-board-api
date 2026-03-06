import { z } from "zod";

// Change the name here to match what boardRoutes.js is importing
export const createColumnSchema = z.object({
  title: z.string().min(1, "Title is required"),
  boardId: z.string().uuid("Invalid board ID"),
});