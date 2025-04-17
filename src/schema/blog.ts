import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { dateDTOSchema, genericDTOSchema, GenericOmit, genericSchema } from "./generic";
import { BlogCategoryDTOSchema } from "./blogCategory";
import { MediaDTOSchema } from "./media";


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

export const BlogWithCategorySchema = BlogDTOSchema.extend({
    category: BlogCategoryDTOSchema,
});
export type BlogWithCategory = z.infer<typeof BlogWithCategorySchema>;

// for admin table
export const BlogDataTableRowSchema = BlogWithCategorySchema.omit({
    contentJson: true,
})
export type BlogDataTableRow = z.infer<typeof BlogDataTableRowSchema>;

// for frontend list
export const BlogWithCategoryAndBannerSchema = BlogWithCategorySchema.extend({
    banner: MediaDTOSchema
}).omit({
    contentJson: true,
});
export type BlogWithCategoryAndBanner = z.infer<typeof BlogWithCategoryAndBannerSchema>;

// for blog detail page
export const BlogDetailSchema = BlogDTOSchema.extend({
    banner: MediaDTOSchema,
    category: BlogCategoryDTOSchema,
});
export type BlogDetail = z.infer<typeof BlogDetailSchema>;

export const BlogFormSchema = BlogDetailSchema.pick({
    title: true,
    synopsis: true,
    contentJson: true,
    authorName: true,
    readingTimeSeconds: true,
    slug: true,
    tags: true,
    categoryId: true,
    banner: true,
    published: true,
})

export type BlogForm = z.infer<typeof BlogFormSchema>;