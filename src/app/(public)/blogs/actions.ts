"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { BlogWithTagsAndBannerSchema } from "@/schema/blog";

export const getBlogsList = async () => {

    try {
        console.log("Fetching blogs list...");
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
        console.log("Blogs fetched successfully:", blogs);

        return {
            success: true,
            data: blogs.map(blog => BlogWithTagsAndBannerSchema.parse(blog)),
        };

    } catch (error) {
        console.error("Error fetching blogs list:", error);
        handleServerActionError(error);
        return { success: false, data: [] };
    }

}

export const getAllBlogTags = async () => {
    try {
        console.log("Fetching all blog tags...");
        const tags = await db.blogTags.findMany({
            where: {
                active: true,
            },
            select: {
                id: true,
                name: true,
            },
        });
        console.log("Blog tags fetched successfully:", tags);

        return {
            success: true,
            data: tags,
        };

    } catch (error) {
        console.error("Error fetching blog tags:", error);
        handleServerActionError(error);
        return { success: false, data: [] };
    }
}

