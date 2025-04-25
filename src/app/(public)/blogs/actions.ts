"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { BlogWithTagsAndBannerSchema } from "@/schema/blog";

export const getBlogsList = async () => {

    try {

        const blogs = await db.blog.findMany({
            where: {
                published: true,
            },
            include: {
                blogToTags: {
                    include: {
                        tag: true,
                    },
                },
                banner: true,
            },
        });

        return {
            success: true,
            data: blogs.map(blog => BlogWithTagsAndBannerSchema.parse(blog)),
        };

    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: [] };
    }

}