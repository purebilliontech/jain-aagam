"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { BlogDetailSchema, type BlogForm } from "@/schema/blog";
import { BlogCategoryDTOSchema } from "@/schema/blogCategory";
import { date } from "zod";

export const getBlogPostById = async (id: string) => {
    try {
        if (id === "new") return { success: true, data: null };

        const post = await db.blog.findUnique({
            where: { id },
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

export const getCategoriesList = async () => {
    try {
        const categoriesList = await db.blogCategory.findMany();
        const categories = categoriesList.map(category => BlogCategoryDTOSchema.parse(category));
        return { success: true, data: categories };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: [] };
    }
}

export const createBlogPost = async (data: BlogForm) => {
    try {
        console.log(data);
        const newPost = await db.blog.create({
            data: {
                title: data.title,
                synopsis: data.synopsis,
                contentJson: data.contentJson,
                authorName: data.authorName,
                readingTimeSeconds: data.readingTimeSeconds,
                slug: data.slug,
                categoryId: data.categoryId,
                tags: data.tags,
                tagsString: data.tags.join(", "),
                published: data.published,
                publishedAt: new Date(),
                bannerId: data.banner.id,
            },
            include: {
                category: true,
                banner: true,
            }
        });

        const post = BlogDetailSchema.parse(newPost);

        return {
            success: true,
            data: newPost,
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}

export const updateBlogPostById = async (id: string, data: BlogForm) => {
    try {
        const updatedPost = await db.blog.update({
            where: { id },
            data: {
                title: data.title,
                synopsis: data.synopsis,
                contentJson: data.contentJson,
                authorName: data.authorName,
                readingTimeSeconds: data.readingTimeSeconds,
                slug: data.slug,
                categoryId: data.categoryId,
                tags: data.tags,
                tagsString: data.tags.join(", "),
                published: false,
                publishedAt: new Date(),
                bannerId: data.banner.id,
            },
        });

        return {
            success: true,
            data: updatedPost,
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}