"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { handleServerActionError } from "@/helpers/error";
import {
    BlogCategoryDTOSchema,
    BlogCategoryForm,
    BlogCategoryFormSchema
} from "@/schema/blogCategory";


export const getCategoryById = async (id: string) => {
    try {
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
        // Validate form data
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
