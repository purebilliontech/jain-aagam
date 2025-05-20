import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { dateDTOSchema, genericDTOSchema, GenericOmit, genericSchema } from "./generic";
import { YoutubeVideoDTOSchema } from "./video";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type PlaylistVideosModel = Prisma.PlaylistVideosGetPayload<{}>;

// for checking prisma validations
export const PlaylistVideosSchema = genericSchema.extend({
    playlistId: z.string().cuid(),
    videoId: z.string().cuid(),
}) satisfies z.Schema<PlaylistVideosModel>;

export type PlaylistVideos = z.infer<typeof PlaylistVideosSchema>;

// for returning response
export const PlaylistVideosDTOSchema =
    PlaylistVideosSchema.merge(genericDTOSchema);

export type PlaylistVideosDTO = z.infer<typeof PlaylistVideosDTOSchema>;

export const PlaylistVideosWithVideoSchema = PlaylistVideosDTOSchema.extend({
    video: YoutubeVideoDTOSchema,
});
export type PlaylistVideosWithVideo = z.infer<typeof PlaylistVideosWithVideoSchema>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type PlaylistModel = Prisma.PlaylistGetPayload<{}>;

// for checking prisma validations
export const PlaylistSchema = genericSchema.extend({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
    description: z.string(),
}) satisfies z.Schema<PlaylistModel>;

export type Playlist = z.infer<typeof PlaylistSchema>;

// for returning response
export const PlaylistDTOSchema =
    PlaylistSchema.merge(genericDTOSchema);

export type PlaylistDTO = z.infer<typeof PlaylistDTOSchema>;

export const PlaylistWithVideosSchema = PlaylistDTOSchema.extend({
    playlistVideos: z.array(PlaylistVideosWithVideoSchema),
});
export type PlaylistWithVideos = z.infer<typeof PlaylistWithVideosSchema>;

export const PlaylistFormSchema = PlaylistDTOSchema.pick({
    name: true,
    slug: true,
    description: true,
}).extend({
    videos: z.array(z.string().cuid())
})

export type PlaylistForm = z.infer<typeof PlaylistFormSchema>;