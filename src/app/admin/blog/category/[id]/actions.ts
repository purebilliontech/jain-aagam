"use server";

import { db } from "@/lib/db";
import { handleServerActionError } from "@/helpers/error";
import {
    BlogCategoryDTOSchema,
    BlogCategoryForm,
    BlogCategoryFormSchema
} from "@/schema/blogCategory";
import { authorizeUser } from "@/lib/auth";


export const getCategoryById = async (id: string) => {
    try {

        const user = await authorizeUser(["view:blog-category"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        if (id === "new") return { success: true, data: null };

        const category = await db.blogCategory.findUnique({
            where: { id },
        });

        if (!category) return { success: false, data: null };

        return {
            success: true,
            data: BlogCategoryDTOSchema.parse(category)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};

export const createCategory = async (data: BlogCategoryForm) => {
    try {

        const user = await authorizeUser(["modify:blog-category"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        // Validate form data
        const validatedData = BlogCategoryFormSchema.parse(data);

        const category = await db.blogCategory.create({
            data: validatedData,
        });

        return {
            success: true,
            data: BlogCategoryDTOSchema.parse(category)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};

export const updateCategoryById = async (
    id: string,
    data: BlogCategoryForm
) => {
    try {
        const user = await authorizeUser(["modify:blog-category"]);
        if (!user.success) {
            throw new Error(user.message);
        }        // Validate form data
        const validatedData = BlogCategoryFormSchema.parse(data);

        const category = await db.blogCategory.update({
            where: { id },
            data: validatedData,
        });

        return {
            success: true,
            data: BlogCategoryDTOSchema.parse(category)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};
