"use server";

import { db } from "@/lib/db";
import { handleServerActionError } from "@/helpers/error";
import {
    BlogTagsDTOSchema,
    BlogTagsForm,
    BlogTagsFormSchema
} from "@/schema/blogTag";
import { authorizeUser } from "@/lib/auth";


export const getTagById = async (id: string) => {
    try {

        const user = await authorizeUser(["view:blog-tag"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        if (id === "new") return { success: true, data: null };

        const tag = await db.blogTags.findUnique({
            where: { id },
        });

        if (!tag) return { success: false, data: null };

        return {
            success: true,
            data: BlogTagsDTOSchema.parse(tag)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};

export const createTag = async (data: BlogTagsForm) => {
    try {

        const user = await authorizeUser(["modify:blog-tag"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        // Validate form data
        const validatedData = BlogTagsFormSchema.parse(data);

        const tag = await db.blogTags.create({
            data: validatedData,
        });

        return {
            success: true,
            data: BlogTagsDTOSchema.parse(tag)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};

export const updateTagById = async (
    id: string,
    data: BlogTagsForm
) => {
    try {
        const user = await authorizeUser(["modify:blog-tag"]);
        if (!user.success) {
            throw new Error(user.message);
        }
        // Validate form data
        const validatedData = BlogTagsFormSchema.parse(data);

        const tag = await db.blogTags.update({
            where: { id },
            data: validatedData,
        });

        return {
            success: true,
            data: BlogTagsDTOSchema.parse(tag)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};
