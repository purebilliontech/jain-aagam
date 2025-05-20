import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { dateDTOSchema, genericDTOSchema, GenericOmit, genericSchema } from "./generic";
import { TagsToVideoWithTagSchema } from "./videoTag";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type YoutubeVideoModel = Prisma.YoutubeVideoGetPayload<{}>;

// for checking prisma validations
export const YoutubeVideoSchema = genericSchema.extend({
    url: z.string().url({ message: "Invalid URL" }),
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
}) satisfies z.Schema<YoutubeVideoModel>;

export type YoutubeVideo = z.infer<typeof YoutubeVideoSchema>;

// for returning response
export const YoutubeVideoDTOSchema =
    YoutubeVideoSchema.merge(genericDTOSchema);

export type YoutubeVideoDTO = z.infer<typeof YoutubeVideoDTOSchema>;

export const YoutubeVideoWithTagsSchema = YoutubeVideoDTOSchema.extend({
    tagsToVideo: z.array(TagsToVideoWithTagSchema),
});
export type YoutubeVideoWithTags = z.infer<typeof YoutubeVideoWithTagsSchema>;


export const YoutubeVideoFormSchema = YoutubeVideoDTOSchema.pick({
    url: true,
    name: true,
}).extend({
    tags: z.array(z.string().cuid())
})

export type YoutubeVideoForm = z.infer<typeof YoutubeVideoFormSchema>;