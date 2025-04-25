import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { genericDTOSchema, GenericOmit, genericSchema } from "./generic";
import { MediaDTOSchema } from "./media";

type CoverImageModel = Prisma.CoverImageGetPayload<object>;

export const CoverImageSchema = genericSchema.extend({
    mediaId: z.string(),
    pageId: z.string(),
    media: MediaDTOSchema
}) satisfies z.Schema<CoverImageModel>;
export type CoverImage = z.infer<typeof CoverImageSchema>;

export const CoverImageDTOSchema = CoverImageSchema.merge(genericDTOSchema);
export type CoverImageDTO = z.infer<typeof CoverImageDTOSchema>;

export const CoverImageFormDTOSchema = CoverImageDTOSchema.pick({
    media: true
})
export type CoverImageFormDTO = z.infer<typeof CoverImageFormDTOSchema>;
