import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { dateDTOSchema, genericDTOSchema, GenericOmit, genericSchema } from "./generic";

import { MediaDTOSchema } from "./media";
import { TagsToBlogWithTagSchema } from "./blogTag";

export type Content = {
  attrs: {
    id: string;
    level: number;
    alt: string;
    width: number;
    height: string;
    src: string;
  };
  type: string;
  content: [
    {
      text: string;
      type: string;
    },
  ];
};


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type BlogModel = Prisma.BlogGetPayload<{}>;

// for checking prisma validations
export const BlogSchema = genericSchema.extend({
  title: z.string().min(1, { message: "Title is required" }),
  synopsis: z.string(),
  bannerId: z.string(),
  authorName: z.string(),
  readingTimeSeconds: z.number(),
  slug: z.string().min(1, { message: "Slug is required" }),
  published: z.boolean(),
  publishedAt: z.date(),
  contentJson: z.object({}).passthrough(),
}) satisfies z.Schema<BlogModel>;

export type Blog = z.infer<typeof BlogSchema>;

// for returning response
export const BlogDTOSchema =
  BlogSchema.merge(genericDTOSchema).extend({ publishedAt: dateDTOSchema.optional() });

export type BlogDTO = z.infer<typeof BlogDTOSchema>;

export const BlogWithTagsSchema = BlogDTOSchema.extend({
  blogToTags: z.array(TagsToBlogWithTagSchema),
});
export type BlogWithTags = z.infer<typeof BlogWithTagsSchema>;

// for admin table
export const BlogDataTableRowSchema = BlogWithTagsSchema.omit({
  contentJson: true,
})
export type BlogDataTableRow = z.infer<typeof BlogDataTableRowSchema>;

// for frontend list
export const BlogWithTagsAndBannerSchema = BlogWithTagsSchema.extend({
  banner: MediaDTOSchema
}).omit({
  contentJson: true,
});
export type BlogWithTagsAndBanner = z.infer<typeof BlogWithTagsAndBannerSchema>;

// for blog detail page
export const BlogDetailSchema = BlogDTOSchema.extend({
  banner: MediaDTOSchema,
  blogToTags: z.array(TagsToBlogWithTagSchema),
});
export type BlogDetail = z.infer<typeof BlogDetailSchema>;

export const BlogFormSchema = BlogDetailSchema.pick({
  title: true,
  synopsis: true,
  contentJson: true,
  authorName: true,
  readingTimeSeconds: true,
  slug: true,
  banner: true,
  published: true,
}).extend({
  tags: z.array(z.string().cuid())
})

export type BlogForm = z.infer<typeof BlogFormSchema>;