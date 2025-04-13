import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { dateDTOSchema, genericDTOSchema, GenericOmit, genericSchema } from "./generic";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type BlogModel = Prisma.BlogGetPayload<{}>;

// for checking prisma validations
export const BlogSchema = genericSchema.extend({
    title: z.string(),
    synopsis: z.string(),
    bannerId: z.string(),
    authorName: z.string(),
    readingTimeSeconds: z.number(),
    slug: z.string(),
    published: z.boolean(),
    publishedAt: z.date(),
    contentJson: z.object({}).passthrough(),
    tags: z.array(z.string()),
    tagsString: z.string(),
    categoryId: z.string(),
}) satisfies z.Schema<BlogModel>;

export type Blog = z.infer<typeof BlogSchema>;

// for returning response
export const BlogDTOSchema =
    BlogSchema.merge(genericDTOSchema).extend({ publishedAt: dateDTOSchema.optional() });

export type BlogDTO = z.infer<typeof BlogDTOSchema>;

// for creating blog
export const CreateBlogSchema = BlogSchema.omit(GenericOmit);
export type CreateBlog = z.infer<typeof CreateBlogSchema>;

// for updating blog
export const UpdateBlogSchema = BlogSchema.omit(GenericOmit).partial();
export type UpdateBlog = z.infer<typeof UpdateBlogSchema>;