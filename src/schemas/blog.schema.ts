import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const createBlogValidationSchema = z.object({
  title: requiredString,
  content: requiredString,
  tags: z.string().optional(),
});

export const updateBlogValidationSchema = z.object({
  title: requiredString,
  content: requiredString,
  tags: z.string().optional(),
});
