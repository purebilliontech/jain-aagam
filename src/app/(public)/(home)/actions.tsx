"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { HomepageDTOSchema } from "@/schema/staticPage";
import BlogsListPage from "../blogs/BlogsListPage";
import { BlogWithTagsAndBannerSchema } from "@/schema/blog";

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

        const latestBlogs = await db.blog.findMany({
            where: {
                published: true,
            },
            include: {
                banner: true,
                blogToTags: {
                    include: {
                        tag: true,
                    },
                },
            },
            take: 6,
            orderBy: {
                publishedAt: "desc"
            }
        });

        return {
            success: true,
            data: {
                homepage: HomepageDTOSchema.parse(homepage),
                latestBlogs: latestBlogs.map(blog => BlogWithTagsAndBannerSchema.parse(blog))
            }
        };

    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}
