import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const createCouponValidationSchema = z.object({
  code: requiredString,
  discountPercentage: z.coerce
    .number()
    .min(0, { message: "Discount percentage must be at least 0" })
    .max(100, { message: "Discount percentage cannot be greater than 100" }),
});

export const updateCouponValidationSchema = z.object({
  code: requiredString,
  discountPercentage: z.coerce
    .number()
    .min(0, { message: "Discount percentage must be at least 0" })
    .max(100, { message: "Discount percentage cannot be greater than 100" }),
});
