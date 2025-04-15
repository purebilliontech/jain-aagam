import { z } from "zod";
import { Prisma } from "@prisma/client";
import { genericDTOSchema, GenericOmit, genericSchema } from "./generic";

/** Schema to validate object pertaining to Media Model */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MediaModel = Prisma.MediaGetPayload<{}>;
export const MediaSchema = genericSchema.extend({
    id: z.string().cuid(),
    type: z.string(),
    url: z.string().url(),
    alt: z.string(),
    title: z.string(),
    cta: z.string().nullable(),
}) satisfies z.Schema<MediaModel>;
export type Media = z.infer<typeof MediaSchema>;

export const MediaDTOSchema = MediaSchema.merge(genericDTOSchema);
export type MediaDTO = z.infer<typeof MediaDTOSchema>;

/** Schema to be used for creating a new Media */
export const CreateMediaSchema = MediaDTOSchema.omit(GenericOmit);
export type CreateMedia = z.infer<typeof CreateMediaSchema>;

/** Schema to be used for creating a new Media */
export const MediaFormSchema = MediaDTOSchema.pick({
    title: true,
    alt: true,
    cta: true,
});
export type MediaForm = z.infer<typeof MediaFormSchema>;