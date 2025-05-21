import { z } from "zod";
import { Prisma } from "@prisma/client";
import { genericDTOSchema, GenericOmit, genericSchema } from "./generic";

/** Schema to validate object pertaining to Reservation Model */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ReservationModel = Prisma.ReservationGetPayload<{}>;
export const ReservationSchema = genericSchema.extend({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(100, { message: "Name cannot exceed 100 characters" })
        .refine((name) => /^[a-zA-Z\s.\-']+$/.test(name), {
            message:
                "Name should only contain letters, spaces, hyphens, periods, and apostrophes",
        }),

    city: z
        .string()
        .min(2, { message: "City name must be at least 2 characters" })
        .max(50, { message: "City name cannot exceed 50 characters" })
        .refine((city) => /^[a-zA-Z\s.\-']+$/.test(city), {
            message:
                "City should only contain letters, spaces, hyphens, and apostrophes",
        }),

    contact: z
        .string()
        .min(8, { message: "Contact number must be at least 8 digits" })
        .max(15, { message: "Contact number cannot exceed 15 digits" })
        .refine((phone) => /^[+\d\s\-()]+$/.test(phone), {
            message: "Please enter a valid phone number format",
        }),

    email: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .min(5, { message: "Email must be at least 5 characters" })
        .max(100, { message: "Email cannot exceed 100 characters" })
        .refine((email) => !email.endsWith(".con"), {
            message: "Did you mean .com instead of .con?",
        }),
}) satisfies z.Schema<ReservationModel>;

export type Reservation = z.infer<typeof ReservationSchema>;

export const ReservationDTOSchema = ReservationSchema.merge(genericDTOSchema);
export type ReservationDTO = z.infer<typeof ReservationDTOSchema>;

export const ReservationFormSchema = ReservationDTOSchema.omit(GenericOmit);
export type ReservationForm = z.infer<typeof ReservationFormSchema>;
