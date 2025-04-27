"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
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

        return {
            success: true,
            data: BhagwanMahavirPageDTOSchema.parse(bhagwanMahavirPage)
        };


    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            data: null
        }
    }
}
