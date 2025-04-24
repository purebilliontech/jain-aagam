"use server";

import { db } from "@/lib/db";
import { handleServerActionError } from "@/helpers/error";
import {
    YoutubeVideoDTOSchema,
    YoutubeVideoForm,
    YoutubeVideoFormSchema,
    YoutubeVideoWithTagsSchema
} from "@/schema/video";
import { authorizeUser } from "@/lib/auth";
import { VideoTagsDTOSchema } from "@/schema/videoTag";


export const getVideoById = async (id: string) => {
    try {

        const user = await authorizeUser(["view:video"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        if (id === "new") return { success: true, data: null };

        const video = await db.youtubeVideo.findUnique({
            where: { id },
            include: {
                tagsToVideo: {
                    include: {
                        videoTag: true
                    }
                }
            }
        });
        console.log(video);

        if (!video) return { success: false, data: null };

        return {
            success: true,
            data: YoutubeVideoWithTagsSchema.parse(video)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};

export const getTags = async () => {
    try {

        const user = await authorizeUser(["view:video-tag"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        const videoTags = await db.videoTag.findMany({});

        const videoTagsDTO = videoTags.map((tag: any) => VideoTagsDTOSchema.parse(tag));

        return {
            success: true,
            data: videoTagsDTO
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: [] };
    }
};

export const createVideo = async (data: YoutubeVideoForm) => {
    try {

        const user = await authorizeUser(["modify:video"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        // Validate form data
        const validatedData = YoutubeVideoFormSchema.parse(data);

        const video = await db.youtubeVideo.create({
            data: {
                name: validatedData.name,
                url: validatedData.url,
                tagsToVideo: {
                    createMany: {
                        data: validatedData.tags.map(tagId => ({
                            videoTagsId: tagId
                        }))
                    }
                }
            },
        });

        return {
            success: true,
            data: YoutubeVideoDTOSchema.parse(video)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};

export const updateVideoById = async (
    id: string,
    data: YoutubeVideoForm
) => {
    try {
        const user = await authorizeUser(["modify:video"]);
        if (!user.success) {
            throw new Error(user.message);
        }
        // Validate form data
        const validatedData = YoutubeVideoFormSchema.parse(data);

        const video = await db.youtubeVideo.update({
            where: { id },
            data: {
                name: validatedData.name,
                url: validatedData.url,
                tagsToVideo: {
                    deleteMany: {
                        videoId: id
                    },
                    createMany: {
                        data: validatedData.tags.map(tagId => ({
                            videoTagsId: tagId
                        }))
                    }
                }
            },
        });

        return {
            success: true,
            data: YoutubeVideoDTOSchema.parse(video)
        };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};
