import { z } from "zod";
import { Prisma } from "@prisma/client";
import { genericDTOSchema, GenericOmit, genericSchema } from "./generic";

/** Schema to validate object pertaining to EnglishAgamContact Model */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type EnglishAgamContactModel = Prisma.EnglishAgamContactGetPayload<{}>;
export const EnglishAgamContactSchema = genericSchema.extend({
    id: z.string().cuid(),
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    contactNumber: z.string().min(10, { message: "Please enter a valid contact number" }),
    city: z.string().min(2, { message: "City is required" }),
    country: z.string().min(2, { message: "Country is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
}) satisfies z.Schema<EnglishAgamContactModel>;
export type EnglishAgamContact = z.infer<typeof EnglishAgamContactSchema>;

export const EnglishAgamContactDTOSchema = EnglishAgamContactSchema.merge(genericDTOSchema);
export type EnglishAgamContactDTO = z.infer<typeof EnglishAgamContactDTOSchema>;

/** Schema to be used for creating a new EnglishAgamContact */
export const CreateEnglishAgamContactSchema = EnglishAgamContactDTOSchema.omit(GenericOmit);
export type CreateEnglishAgamContact = z.infer<typeof CreateEnglishAgamContactSchema>;

/** Schema to be used for creating a new EnglishAgamContact */
export const EnglishAgamContactFormSchema = EnglishAgamContactDTOSchema.pick({
    name: true,
    contactNumber: true,
    city: true,
    country: true,
    email: true,
});
export type EnglishAgamContactForm = z.infer<typeof EnglishAgamContactFormSchema>;