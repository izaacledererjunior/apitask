import { z } from "zod";

export const createTaskSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  status: z.string().min(1, "Status is required"),
  userId: z.number().int().positive("User ID must be a positive integer"),
});

export const updateTaskSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  status: z.string().min(1, "Status is required").optional(),
  userId: z
    .number()
    .int()
    .positive("User ID must be a positive integer")
    .optional(),
});
