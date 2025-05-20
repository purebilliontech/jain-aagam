import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { dateDTOSchema, genericDTOSchema, GenericOmit, genericSchema } from "./generic";
import { CoverImageDTOSchema, CoverImageFormDTOSchema } from "./pageComponents";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type StaticPageModel = Prisma.StaticPageGetPayload<{}>;

// for checking prisma validations
export const StaticPageSchema = genericSchema.extend({
    title: z.string().min(3, { message: "Title must be at least 3 characters" }),
    slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
}) satisfies z.Schema<StaticPageModel>;

export type StaticPage = z.infer<typeof StaticPageSchema>;

export const StaticPageDTOSchema = StaticPageSchema.merge(genericDTOSchema);

export type StaticPageDTO = z.infer<typeof StaticPageDTOSchema>;

export const BaseStaticPageDTOSchema = StaticPageDTOSchema.extend({
    CoverImage: CoverImageDTOSchema.nullable().optional()
});
export type BaseStaticPageDTO = z.infer<typeof BaseStaticPageDTOSchema>;


/**
-----------------------------------------------------------------------------    
Homepage --------------------------------------------------------------------    
-----------------------------------------------------------------------------    
*/

export const HomepageDTOSchema = BaseStaticPageDTOSchema.pick({
    CoverImage: true,
    ...GenericOmit
})
export type HomepageDTO = z.infer<typeof HomepageDTOSchema>;

export const HomepageFormSchema = z.object({
    CoverImage: CoverImageFormDTOSchema.optional(),
})

export type HomepageForm = z.infer<typeof HomepageFormSchema>;



/**
-----------------------------------------------------------------------------    
Bhagwan Mahavir Page --------------------------------------------------------    
-----------------------------------------------------------------------------    
*/

export const BhagwanMahavirPageDTOSchema = BaseStaticPageDTOSchema.pick({
    CoverImage: true,
    ...GenericOmit
})
export type BhagwanMahavirPageDTO = z.infer<typeof BhagwanMahavirPageDTOSchema>;

export const BhagwanMahavirPageFormSchema = z.object({
    CoverImage: CoverImageFormDTOSchema.optional(),
})
export type BhagwanMahavirPageForm = z.infer<typeof BhagwanMahavirPageFormSchema>;
