"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { BlogDetailSchema, type Content } from "@/schema/blog";
import { MediaDTOSchema } from "@/schema/media";
import { getMediaIds } from "@/utils/blog-client";

export const getBlogBySlug = async (slug: string) => {
    try {

        const blog = await db.blog.findUnique({
            where: {
                slug,
            },
            include: {
                banner: true, 
                blogToTags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        const mediaIds = getMediaIds(blog?.contentJson as { content: Content[] });

        const media = await db.media.findMany({
            where: {
                id: {
                    in: mediaIds,
                },
            },
        });
        const mediaList = media.map((media) => MediaDTOSchema.parse(media));

        return {
            success: true,
            data: {
                blog: BlogDetailSchema.parse(blog),
                mediaList
            },
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}