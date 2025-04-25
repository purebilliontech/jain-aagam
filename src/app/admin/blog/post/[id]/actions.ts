"use server";

import { handleServerActionError } from "@/helpers/error";
import { authorizeUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { BlogDetailSchema, type BlogForm } from "@/schema/blog";
import { formatContentJson } from "@/utils/blog";

export const getBlogPostById = async (id: string) => {
    try {
        const user = await authorizeUser(["modify:blog"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        if (id === "new") return { success: true, data: null };

        const post = await db.blog.findUnique({
            where: { id },
            include: {
                banner: true,
                blogToTags: {
                    include: {
                        tag: true
                    }
                }
            },
        });

        if (!post) return { success: false, data: null };

        return {
            success: true,
            data: BlogDetailSchema.parse(post)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}

export const getTagsList = async () => {
    try {
        const user = await authorizeUser(["view:blog"]);
        if (!user.success) {
            throw new Error(user.message);
        }
        const tagsList = await db.blogTags.findMany();
        return { success: true, data: tagsList };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: [] };
    }
}

export const createBlogPost = async (data: BlogForm, contentJsonString: string) => {
    try {
        const user = await authorizeUser(["modify:blog"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        // Create the blog post first
        const newPost = await db.blog.create({
            data: {
                title: data.title,
                synopsis: data.synopsis,
                contentJson: formatContentJson(contentJsonString),
                authorName: data.authorName,
                readingTimeSeconds: data.readingTimeSeconds,
                slug: data.slug,
                published: data.published,
                publishedAt: new Date(),
                bannerId: data.banner.id,
            },
            include: {
                banner: true,
            },
        });

        // Then connect the tags in a separate operation
        if (data.tags && data.tags.length > 0) {
            await Promise.all(data.tags.map(tagId => 
                db.tagsToBlog.create({
                    data: {
                        blogId: newPost.id,
                        tagId: tagId
                    }
                })
            ));
        }

        return {
            success: true,
            data: newPost,
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}

export const updateBlogPostById = async (id: string, data: BlogForm, contentJsonString: string) => {
    try {
        const user = await authorizeUser(["modify:blog"]);
        if (!user.success) {
            throw new Error(user.message);
        }
        
        // First, update the main blog post
        const updatedPost = await db.blog.update({
            where: { id },
            data: {
                title: data.title,
                synopsis: data.synopsis,
                contentJson: formatContentJson(contentJsonString),
                authorName: data.authorName,
                readingTimeSeconds: data.readingTimeSeconds,
                slug: data.slug,
                published: data.published,
                publishedAt: new Date(),
                bannerId: data.banner.id,
            },
        });

        // Next, handle the tags - first delete existing relationships
        await db.tagsToBlog.deleteMany({
            where: {
                blogId: id
            }
        });

        // Then create new tag relationships
        if (data.tags && data.tags.length > 0) {
            await Promise.all(data.tags.map(tagId => 
                db.tagsToBlog.create({
                    data: {
                        blogId: id,
                        tagId: tagId
                    }
                })
            ));
        }

        return {
            success: true,
            data: updatedPost,
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}