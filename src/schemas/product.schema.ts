import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const createProductValidationSchema = z.object({
  name: requiredString,
  description: requiredString,
  price: z.coerce.number().min(0, { message: "Price must be at least $0" }),
  category: z.string().min(1),
  inventoryCount: z.coerce.number().min(0),
  onSale: z.boolean().optional().default(false),
  discountedPrice: z.coerce
    .number()
    .min(0, { message: "Discounted Price must be at least $0" })
    .optional(),
});

export const updateProductValidationSchema = z.object({
  name: requiredString,
  description: requiredString,
  price: z.coerce.number().min(0, { message: "Price must be at least $0" }),
  category: requiredString,
  inventoryCount: z.coerce.number().min(0),
  onSale: z.boolean().optional().default(false),
  discountedPrice: z.coerce
    .number()
    .min(0, { message: "Discounted Price must be at least $0" })
    .optional(),
});
