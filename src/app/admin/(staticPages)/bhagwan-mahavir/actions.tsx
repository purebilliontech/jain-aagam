"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { BhagwanMahavirPageDTOSchema, type BhagwanMahavirPageForm } from "@/schema/staticPage";

export const getBhagwanMahavirContent = async () => {
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
        return { success: false, data: null };
    }
}

export const updateBhagwanMahavirContent = async (data: BhagwanMahavirPageForm) => {
    try {
        const bhagwanMahavirPage = await db.staticPage.update({
            where: {
                slug: "bhagwan-mahavir"
            },
            data: {
                CoverImage: {
                    upsert: {
                        create: {
                            mediaId: data.CoverImage?.media.id || "",
                        },
                        update: {
                            mediaId: data.CoverImage?.media.id || "",
                        }
                    }
                }
            },
            include: {
                CoverImage: {
                    include: {
                        media: true
                    }
                }
            }
        })

        return {
            success: true,
            data: BhagwanMahavirPageDTOSchema.parse(bhagwanMahavirPage)
        };

    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}
