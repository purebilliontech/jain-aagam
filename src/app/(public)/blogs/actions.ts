"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { BlogWithCategoryAndBannerSchema } from "@/schema/blog";

export const getBlogsList = async () => {

    try {

        const blogs = await db.blog.findMany({
            where: {
                published: true,
            },
            include: {
                category: true,
                banner: true,
            },
        });

        return {
            success: true,
            data: blogs.map(blog => BlogWithCategoryAndBannerSchema.parse(blog)),
        };

    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: [] };
    }

}