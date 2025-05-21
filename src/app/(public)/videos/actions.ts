"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { FrontendPlaylistDTO, FrontendPlaylistDTOSchema } from "@/schema/frontendPlaylist";

export async function getVideosPageContent() {
    try {

        const highlights = await db.frontendPlaylist.findUnique({
            where: {
                slug: "video-page-featured-videos"
            },
        })

        const shreeSuyagadangSutra = await db.frontendPlaylist.findUnique({
            where: {
                slug: "shree-suyagadang-sutra"
            },
        })
        const shreeNandiSutra = await db.frontendPlaylist.findUnique({
            where: {
                slug: "shree-nandi-sutra"
            },
        })
        const shreeDashvaikalikSutra = await db.frontendPlaylist.findUnique({
            where: {
                slug: "shree-dashvaikalik-sutra"
            },
        })
        const shreeUttaradhyayanSutra = await db.frontendPlaylist.findUnique({
            where: {
                slug: "shree-uttaradhyayan-sutra"
            },
        })

        return {
            success: true,
            data: {
                highlights: FrontendPlaylistDTOSchema.parse(highlights),
                shreeSuyagadangSutra: FrontendPlaylistDTOSchema.parse(shreeSuyagadangSutra),
                shreeNandiSutra: FrontendPlaylistDTOSchema.parse(shreeNandiSutra),
                shreeDashvaikalikSutra: FrontendPlaylistDTOSchema.parse(shreeDashvaikalikSutra),
                shreeUttaradhyayanSutra: FrontendPlaylistDTOSchema.parse(shreeUttaradhyayanSutra)
            },
            message: "Videos page content fetched successfully"
        }
    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            data: {
                highlights: null,
                shreeSuyagadangSutra: null,
                shreeNandiSutra: null,
                shreeDashvaikalikSutra: null,
                shreeUttaradhyayanSutra: null
            },
            message: "Failed to get videos page content"
        }
    }
}
