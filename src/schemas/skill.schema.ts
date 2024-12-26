import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const createSkillValidationSchema = z.object({
  name: requiredString,
});

export const updateSkillValidationSchema = z.object({
  name: requiredString,
});
