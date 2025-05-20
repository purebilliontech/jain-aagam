"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { FrontendPlaylistDTOSchema } from "@/schema/frontendPlaylist";
import { BhagwanMahavirPageDTOSchema } from "@/schema/staticPage";


export const getBhagwanMahavirPageData = async () => {
    try {

        const bhagwanMahavirPage = await db.staticPage.findUnique({
            where: {
                slug: "bhagwan-mahavir"
            },
            include: {
                CoverImage: {
                    include: {
                        media: true
                    }
                }
            }
        });

        const shortFilms = await db.frontendPlaylist.findUnique({
            where: {
                slug: "short-films-drama"
            }
        });

        return {
            success: true,
            data: BhagwanMahavirPageDTOSchema.parse(bhagwanMahavirPage),
            shortFilms: FrontendPlaylistDTOSchema.parse(shortFilms)
        };


    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            data: null
        }
    }
}
