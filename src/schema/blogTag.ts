import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { genericDTOSchema, GenericOmit, genericSchema } from "./generic";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type BlogTagsModel = Prisma.BlogTagsGetPayload<{
  include: {
    blogToTags: true;
  };
}>;

// for checking prisma validations
export const BlogTagsSchema = genericSchema.extend({
  name: z.string(),
  slug: z.string(),
  active: z.boolean(),
  blogToTags: z.array(
    z.object({
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      blogId: z.string(),
      tagId: z.string(),
    })
  ),
}) satisfies z.Schema<BlogTagsModel>;

export type BlogTags = z.infer<typeof BlogTagsSchema>;

// for returning response
export const BlogTagsDTOSchema = BlogTagsSchema.merge(genericDTOSchema);

export type BlogTagsDTO = z.infer<typeof BlogTagsDTOSchema>;

export const BlogTagsFormSchema = BlogTagsDTOSchema.omit(GenericOmit);
export type BlogTagsForm = z.infer<typeof BlogTagsFormSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TagsToBlogModel = Prisma.TagsToBlogGetPayload<{
  include: {
    tag: true;
  };
}>;

// for checking prisma validations
export const TagsToBlogSchema = genericSchema.extend({
  blogId: z.string(),
  tagId: z.string(),
  tag: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    active: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
}) satisfies z.Schema<TagsToBlogModel>;

export type TagsToBlog = z.infer<typeof TagsToBlogSchema>;

// for returning response
export const TagsToBlogDTOSchema = TagsToBlogSchema.merge(genericDTOSchema);

export type TagsToBlogDTO = z.infer<typeof TagsToBlogDTOSchema>;

export const TagsToBlogWithTagSchema = TagsToBlogDTOSchema.extend({
  tag: BlogTagsDTOSchema,
});
export type TagsToBlogWithTag = z.infer<typeof TagsToBlogWithTagSchema>;
