import { z } from "zod";

const requiredString = z.string().trim().min(1);
const optionalString = z.string().trim().optional();

export const createReviewValidationSchema = z.object({
  comment: optionalString,
});

export const replyToReviewValidationSchema = z.object({
  reply: requiredString,
});
