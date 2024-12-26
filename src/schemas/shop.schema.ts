import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");
const optionalString = z.string().trim().optional();

export const createShopValidationSchema = z.object({
  name: requiredString,
  description: requiredString,
});

export const updateShopValidationSchema = z.object({
  name: requiredString,
  description: optionalString,
});
