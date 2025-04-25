// blog.ts - Schema updates
import { z } from "zod"; 
import { dateDTOSchema, genericDTOSchema, genericSchema } from "./generic"; 
import { MediaDTOSchema } from "./media"; 

// Define the Tag schema correctly based on the prisma schema
export const TagSchema = genericSchema.extend({
  name: z.string(),
  slug: z.string().optional(),
  active: z.boolean().optional(),
  // No need for blogToTags reference here
});

export const TagsToBlogSchema = z.object({
  id: z.string(),
  tagId: z.string(),
  blogId: z.string(),
  tag: TagSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

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
}); 

export type Blog = z.infer<typeof BlogSchema>;  

// for returning response 
export const BlogDTOSchema = BlogSchema.merge(genericDTOSchema).extend({ 
  publishedAt: dateDTOSchema.optional() 
});  

export type BlogDTO = z.infer<typeof BlogDTOSchema>;  

export const BlogWithTagsSchema = BlogDTOSchema.extend({
  blogToTags: z.array(TagsToBlogSchema).default([]),
}); 

export type BlogWithTags = z.infer<typeof BlogWithTagsSchema>;  

// for admin table - this is the one with the issue
export const BlogDataTableRowSchema = BlogWithTagsSchema.extend({
  banner: MediaDTOSchema.optional(),
  tagsString: z.string().optional(),
}).omit({
  contentJson: true,
});

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
    blogToTags: z.array(TagsToBlogSchema).default([]),
}); 

export type BlogDetail = z.infer<typeof BlogDetailSchema>;  

export const BlogFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    synopsis: z.string().min(1, "Synopsis is required"),
    contentJson: z.object({}).passthrough(),
    authorName: z.string().min(1, "Author name is required"),
    readingTimeSeconds: z.number().min(0),
    slug: z.string().min(1, "Slug is required"),
    banner: MediaDTOSchema,
    published: z.boolean(),
    tags: z.array(z.string()).default([]),
});

export type BlogForm = z.infer<typeof BlogFormSchema>;