import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { dateDTOSchema, genericDTOSchema, GenericOmit, genericSchema } from "./generic";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type BlogCategoryModel = Prisma.BlogCategoryGetPayload<{}>;

// for checking prisma validations
export const BlogCategorySchema = genericSchema.extend({
    name: z.string(),
    slug: z.string(),
    active: z.boolean(),
}) satisfies z.Schema<BlogCategoryModel>;

export type BlogCategory = z.infer<typeof BlogCategorySchema>;

// for returning response
export const BlogCategoryDTOSchema =
    BlogCategorySchema.merge(genericDTOSchema).extend({});

export type BlogCategoryDTO = z.infer<typeof BlogCategoryDTOSchema>;

export const BlogCategoryFormSchema = BlogCategoryDTOSchema.omit(GenericOmit);
export type BlogCategoryForm = z.infer<typeof BlogCategoryFormSchema>;