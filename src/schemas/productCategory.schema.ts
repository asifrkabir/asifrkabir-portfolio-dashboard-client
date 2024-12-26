import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const createProductCategoryValidationSchema = z.object({
  name: requiredString,
});

export const updateProductCategoryValidationSchema = z.object({
  name: requiredString,
});
