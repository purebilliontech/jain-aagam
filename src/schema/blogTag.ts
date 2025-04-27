import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { genericDTOSchema, GenericOmit, genericSchema } from "./generic";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type BlogTagsModel = Prisma.BlogTagsGetPayload<{}>;

// for checking prisma validations
export const BlogTagsSchema = genericSchema.extend({
  name: z.string(),
  slug: z.string(),
  active: z.boolean(),
}) satisfies z.Schema<BlogTagsModel>;

export type BlogTags = z.infer<typeof BlogTagsSchema>;

// for returning response
export const BlogTagsDTOSchema =
  BlogTagsSchema.merge(genericDTOSchema).extend({});

export type BlogTagsDTO = z.infer<typeof BlogTagsDTOSchema>;

export const BlogTagsFormSchema = BlogTagsDTOSchema.omit(GenericOmit);
export type BlogTagsForm = z.infer<typeof BlogTagsFormSchema>;




// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TagsToBlogModel = Prisma.TagsToBlogGetPayload<{}>;

// for checking prisma validations
export const TagsToBlogSchema = genericSchema.extend({
  blogId: z.string(),
  tagId: z.string(),
}) satisfies z.Schema<TagsToBlogModel>;

export type TagsToBlog = z.infer<typeof TagsToBlogSchema>;

// for returning response
export const TagsToBlogDTOSchema =
  TagsToBlogSchema.merge(genericDTOSchema);

export type TagsToBlogDTO = z.infer<typeof TagsToBlogDTOSchema>;

export const TagsToBlogWithTagSchema = TagsToBlogDTOSchema.extend({
  tag: BlogTagsDTOSchema,
});
export type TagsToBlogWithTag = z.infer<typeof TagsToBlogWithTagSchema>;