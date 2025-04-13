import { z } from "zod";

export const genericSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const dateDTOSchema = z
  .date()
  .transform((z) => z.toISOString())
  .pipe(z.string().datetime())
  .or(z.string().datetime());

export const genericDTOSchema = genericSchema.extend({
  createdAt: dateDTOSchema,
  updatedAt: dateDTOSchema,
});

export const GenericOmit = {
  id: true as const,
  createdAt: true as const,
  updatedAt: true as const,
};

const responseSchema = z.object({
  success: z.boolean(),
  data: z.record(z.any(), z.any()),
  errorMessage: z.string(),
  cause: z.string().optional(),
  unique: z.record(z.string(), z.string()).optional(),
  meta: z.any().optional(),
});

export const errorResponseSchema = responseSchema
  .pick({
    success: true,
    errorMessage: true,
    cause: true,
    meta: true,
    unique: true,
  })
  .extend({ success: z.boolean().default(false) });
export const successResponseSchema = responseSchema
  .pick({ success: true, data: true })
  .extend({ success: z.boolean().default(true) });

export type errorResponse = z.infer<typeof errorResponseSchema>;
export type successResponse = z.infer<typeof successResponseSchema>;

export type apiResponse = errorResponse | successResponse;
