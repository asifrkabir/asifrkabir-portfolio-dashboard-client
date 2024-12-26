import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const createPaymentValidationSchema = z.object({
  order: requiredString,
  amount: z.coerce.number().min(0, { message: "Price must be at least $0" }),
});
