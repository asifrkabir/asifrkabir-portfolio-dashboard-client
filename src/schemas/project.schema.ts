import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const createProjectValidationSchema = z.object({
  title: requiredString,
  description: requiredString,
  technologies: requiredString,
  repositoryUrls: z.string().optional(),
  liveDemoUrl: z.string().optional(),
});

export const updateProjectValidationSchema = z.object({
  title: requiredString,
  description: requiredString,
  technologies: requiredString,
  repositoryUrls: z.string().optional(),
  liveDemoUrl: z.string().optional(),
});
