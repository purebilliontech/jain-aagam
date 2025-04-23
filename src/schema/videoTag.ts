import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { dateDTOSchema, genericDTOSchema, GenericOmit, genericSchema } from "./generic";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type VideoTagsModel = Prisma.VideoTagGetPayload<{}>;

// for checking prisma validations
export const VideoTagsSchema = genericSchema.extend({
    name: z.string(),
    slug: z.string(),
    active: z.boolean(),
}) satisfies z.Schema<VideoTagsModel>;

export type VideoTags = z.infer<typeof VideoTagsSchema>;

// for returning response
export const VideoTagsDTOSchema =
    VideoTagsSchema.merge(genericDTOSchema).extend({});

export type VideoTagsDTO = z.infer<typeof VideoTagsDTOSchema>;

export const VideoTagsFormSchema = VideoTagsDTOSchema.omit(GenericOmit);
export type VideoTagsForm = z.infer<typeof VideoTagsFormSchema>;




// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TagsToVideoModel = Prisma.TagsToVideoGetPayload<{}>;

// for checking prisma validations
export const TagsToVideoSchema = genericSchema.extend({
    : z.string(),
    tagId: z.string(),
}) satisfies z.Schema<TagsToVideoModel>;

export type TagsToVideo = z.infer<typeof TagsToVideoSchema>;

// for returning response
export const TagsToVideoDTOSchema =
    TagsToVideoSchema.merge(genericDTOSchema);

export type TagsToVideoDTO = z.infer<typeof TagsToVideoDTOSchema>;

export const TagsToVideoWithTagSchema = TagsToVideoDTOSchema.extend({
    tag: VideoTagsDTOSchema,
});
export type TagsToVideoWithTag = z.infer<typeof TagsToVideoWithTagSchema>;
