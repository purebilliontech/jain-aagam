import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { genericDTOSchema, GenericOmit, genericSchema } from "./generic";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type FrontendPlaylistModel = Prisma.FrontendPlaylistGetPayload<{}>;

// for checking prisma validations
export const FrontendPlaylistSchema = genericSchema.extend({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
    videos: z.array(z.string().url({ message: "Invalid video URL" })),
}) satisfies z.Schema<FrontendPlaylistModel>;

export type FrontendPlaylist = z.infer<typeof FrontendPlaylistSchema>;

// for returning response
export const FrontendPlaylistDTOSchema =
    FrontendPlaylistSchema.merge(genericDTOSchema);

export type FrontendPlaylistDTO = z.infer<typeof FrontendPlaylistDTOSchema>;

export const FrontendPlaylistFormSchema = FrontendPlaylistDTOSchema.omit(GenericOmit);
export type FrontendPlaylistForm = z.infer<typeof FrontendPlaylistFormSchema>;
