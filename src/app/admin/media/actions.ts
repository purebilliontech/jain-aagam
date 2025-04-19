"use server";

import { handleServerActionError } from "@/helpers/error";
import { uploadFileToSupabase } from "@/helpers/supabase";
import { authorizeUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { MediaDTOSchema, type MediaDTO } from "@/schema/media";
import slugify from "slugify";


const ITEMS_PER_PAGE = 20;
export const getMedia = async (page = 0, query = "") => {
    try {
        const user = await authorizeUser(["view:media"]);
        if (!user.success) {
            return { success: false, data: null, message: user.message };
        }
        const offset = (page) * ITEMS_PER_PAGE;

        const whereQuery: {
            OR?: Array<{ title?: { contains: string, mode: "insensitive" }; alt?: { contains: string, mode: "insensitive" }; url?: { contains: string, mode: "insensitive" } }>;
        } = {};

        if (query !== undefined) {
            const caseInsensitiveQuery = query.toLowerCase();
            whereQuery.OR = [
                { title: { contains: caseInsensitiveQuery, mode: "insensitive" } },
                { alt: { contains: caseInsensitiveQuery, mode: "insensitive" } },
                { url: { contains: caseInsensitiveQuery, mode: "insensitive" } },
            ];
        }
        console.log(whereQuery, ITEMS_PER_PAGE, offset);
        const [media, totalCount] = await Promise.all([
            db.media.findMany({
                where: whereQuery,
                take: ITEMS_PER_PAGE,
                skip: offset,
                orderBy: { id: "desc" },
            }),
            db.media.count({ where: whereQuery }),
        ]);

        const mediaList = media.map((media) => MediaDTOSchema.parse(media));

        return {
            success: true,
            data: {
                mediaList,
                meta: {
                    totalCount,
                    currentPage: page,
                    totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
                }
            }
        };
    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            data: {
                mediaList: [],
                meta: {
                    totalCount: 0,
                    currentPage: page,
                    totalPages: 0,
                }
            }
        };
    }
};

export const deleteMediaById = async (mediaId: string) => {
    try {
        const user = await authorizeUser(["view:media"]);
        if (!user.success) {
            return { success: false, data: null, message: user.message };
        }
        await db.media.delete({
            where: { id: mediaId },
        });
        return { success: true, data: { message: "Media deleted successfully" } };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}


export const uploadMedia = async (formData: FormData, fileKey: string = "file", fileName: string, type: string) => {
    try {
        const user = await authorizeUser(["view:media"]);
        if (!user.success) {
            return { success: false, data: null, message: user.message };
        }
        const file = formData.getAll(fileKey)[0] as File;

        if (!file) {
            return { success: false, message: "Invalid Media" };
        }

        const fileBuffer = await file.arrayBuffer();
        const mediaPath = slugify(`${Date.now()}_${file.name}`, {
            lower: true, strict: true,
        });
        const { publicUrl } = await uploadFileToSupabase(
            mediaPath,
            Buffer.from(fileBuffer),
            "media",
            file.type,
        );

        const newMedia = await db.media.create({
            data: {
                title: fileName || "",
                alt: "",
                url: publicUrl || "",
                type: type.includes("image") ? "image" : "video",
            },
        });

        const media = MediaDTOSchema.parse(newMedia);

        return { success: true, data: media };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};

export const changeMedia = async (id: string, formData: FormData, fileKey: string = "file") => {
    try {
        const user = await authorizeUser(["view:media"]);
        if (!user.success) {
            return { success: false, data: null, message: user.message };
        }
        const file = formData.getAll(fileKey)[0] as File;

        if (!file) {
            return { success: false, message: "Invalid Media" };
        }

        const fileBuffer = await file.arrayBuffer();
        const mediaPath = slugify(`${Date.now()}_${file.name}`, {
            lower: true, strict: true,
        });

        const { publicUrl } = await uploadFileToSupabase(
            mediaPath,
            Buffer.from(fileBuffer),
            "media",
            file.type,
        );

        const newMedia = await db.media.update({
            where: {
                id,
            },
            data: {
                url: publicUrl || "",
            },
        });

        const media = MediaDTOSchema.parse(newMedia);

        return { success: true, data: media };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
};


export const updateMediaMetadata = async (mediaId: string, data: Partial<MediaDTO>) => {
    try {
        const user = await authorizeUser(["view:media"]);
        if (!user.success) {
            return { success: false, data: null, message: user.message };
        }
        const updatedMedia = await db.media.update({
            where: { id: mediaId },
            data: {
                title: data.title,
                alt: data.alt,
                cta: data.cta,
            },
        });
        const media = MediaDTOSchema.parse(updatedMedia);

        return { success: true, data: media };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: null };
    }
}


