import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const createExperienceValidationSchema = z.object({
  title: requiredString,
  company: requiredString,
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().optional(),
  description: requiredString,
  technologies: z.string().optional(),
});

export const updateExperienceValidationSchema = z.object({
  title: requiredString,
  company: requiredString,
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().optional(),
  description: z.string().optional(),
  technologies: z.string().optional(),
});
