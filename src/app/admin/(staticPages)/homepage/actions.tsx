"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { HomepageDTOSchema, type HomepageForm } from "@/schema/staticPage";

export const getHomepageContent = async () => {
    try {
        const homepage = await db.staticPage.findUnique({
            where: {
                slug: "homepage"
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
            data: HomepageDTOSchema.parse(homepage)
        };

    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}

export const updateHomepageContent = async (data: HomepageForm) => {
    try {
        const homepage = await db.staticPage.update({
            where: {
                slug: "homepage"
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
            data: HomepageDTOSchema.parse(homepage)
        };

    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}
