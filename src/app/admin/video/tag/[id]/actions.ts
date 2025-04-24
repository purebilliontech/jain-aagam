"use server";

import { db } from "@/lib/db";
import { handleServerActionError } from "@/helpers/error";
import {
    VideoTagsDTOSchema,
    VideoTagsForm,
    VideoTagsFormSchema
} from "@/schema/videoTag";
import { authorizeUser } from "@/lib/auth";


export const getTagById = async (id: string) => {
    try {

        const user = await authorizeUser(["view:video-tag"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        if (id === "new") return { success: true, data: null };

        const tag = await db.videoTag.findUnique({
            where: { id },
        });

        if (!tag) return { success: false, data: null };

        return {
            success: true,
            data: VideoTagsDTOSchema.parse(tag)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};

export const createTag = async (data: VideoTagsForm) => {
    try {

        const user = await authorizeUser(["modify:video-tag"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        // Validate form data
        const validatedData = VideoTagsFormSchema.parse(data);

        const tag = await db.videoTag.create({
            data: validatedData,
        });

        return {
            success: true,
            data: VideoTagsDTOSchema.parse(tag)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};

export const updateTagById = async (
    id: string,
    data: VideoTagsForm
) => {
    try {
        const user = await authorizeUser(["modify:video-tag"]);
        if (!user.success) {
            throw new Error(user.message);
        }
        // Validate form data
        const validatedData = VideoTagsFormSchema.parse(data);

        const tag = await db.videoTag.update({
            where: { id },
            data: validatedData,
        });

        return {
            success: true,
            data: VideoTagsDTOSchema.parse(tag)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};
