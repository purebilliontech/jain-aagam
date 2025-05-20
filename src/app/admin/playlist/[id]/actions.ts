"use server";

import { db } from "@/lib/db";
import { handleServerActionError } from "@/helpers/error";
import {
    FrontendPlaylistDTOSchema,
    FrontendPlaylistForm,
    FrontendPlaylistFormSchema
} from "@/schema/frontendPlaylist";
import { authorizeUser } from "@/lib/auth";

export const getPlaylistById = async (id: string) => {
    try {
        const user = await authorizeUser(["view:frontend-playlist"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        if (id === "new") return { success: true, data: null };

        const playlist = await db.frontendPlaylist.findUnique({
            where: { id },
        });

        if (!playlist) return { success: false, data: null };

        return {
            success: true,
            data: FrontendPlaylistDTOSchema.parse(playlist)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};

export const createPlaylist = async (data: FrontendPlaylistForm) => {
    try {
        const user = await authorizeUser(["modify:frontend-playlist"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        // Validate form data
        const validatedData = FrontendPlaylistFormSchema.parse(data);

        const playlist = await db.frontendPlaylist.create({
            data: validatedData,
        });

        return {
            success: true,
            data: FrontendPlaylistDTOSchema.parse(playlist)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};

export const updatePlaylistById = async (
    id: string,
    data: FrontendPlaylistForm
) => {
    try {
        const user = await authorizeUser(["modify:frontend-playlist"]);
        if (!user.success) {
            throw new Error(user.message);
        }
        // Validate form data
        const validatedData = FrontendPlaylistFormSchema.parse(data);

        const playlist = await db.frontendPlaylist.update({
            where: { id },
            data: validatedData,
        });

        return {
            success: true,
            data: FrontendPlaylistDTOSchema.parse(playlist)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};
