"use server";

import { handleServerActionError } from "@/helpers/error";
import { authorizeUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { EnglishAgamContactDTOSchema } from "@/schema/englishAagam";

const ITEMS_PER_PAGE = 20;

export const getEnglishAagams = async (page = 0, query = "") => {
    try {
        const user = await authorizeUser(["view:english-agam"]);
        if (!user.success) {
            throw new Error(user.message);
        }
        const offset = page * ITEMS_PER_PAGE;

        const whereQuery: {
            OR?: Array<{ name?: { contains: string, mode: "insensitive" }; city?: { contains: string, mode: "insensitive" }; country?: { contains: string, mode: "insensitive" } }>;
        } = {};

        if (query !== undefined) {
            const caseInsensitiveQuery = query.toLowerCase();
            whereQuery.OR = [
                { name: { contains: caseInsensitiveQuery, mode: "insensitive" } },
                { city: { contains: caseInsensitiveQuery, mode: "insensitive" } },
                { country: { contains: caseInsensitiveQuery, mode: "insensitive" } },
            ];
        }

        const [englishAagams, totalCount] = await Promise.all([
            db.englishAgamContact.findMany({
                where: whereQuery,
                take: ITEMS_PER_PAGE,
                skip: offset,
                orderBy: { id: "desc" },
            }),
            db.englishAgamContact.count({ where: whereQuery }),
        ]);

        const englishAagamList = englishAagams.map((aagam) => EnglishAgamContactDTOSchema.parse(aagam));

        return {
            success: true,
            data: {
                englishAagamList,
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
                englishAagamList: [],
                meta: {
                    totalCount: 0,
                    currentPage: page,
                    totalPages: 0,
                }
            }
        };
    }
};
