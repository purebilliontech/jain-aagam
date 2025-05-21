"use server";

import { handleServerActionError } from "@/helpers/error";
import { authorizeUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReservationDTOSchema } from "@/schema/reservations";

const ITEMS_PER_PAGE = 20;

export const getReservations = async (page = 0, query = "") => {
    try {
        const user = await authorizeUser(["view:reservations"]);
        if (!user.success) {
            throw new Error(user.message);
        }
        const offset = page * ITEMS_PER_PAGE;

        const whereQuery: {
            OR?: Array<{ name?: { contains: string, mode: "insensitive" }; city?: { contains: string, mode: "insensitive" }; email?: { contains: string, mode: "insensitive" } }>;
        } = {};

        if (query !== undefined) {
            const caseInsensitiveQuery = query.toLowerCase();
            whereQuery.OR = [
                { name: { contains: caseInsensitiveQuery, mode: "insensitive" } },
                { city: { contains: caseInsensitiveQuery, mode: "insensitive" } },
                { email: { contains: caseInsensitiveQuery, mode: "insensitive" } },
            ];
        }

        const [reservations, totalCount] = await Promise.all([
            db.reservation.findMany({
                where: whereQuery,
                take: ITEMS_PER_PAGE,
                skip: offset,
                orderBy: { id: "desc" },
            }),
            db.reservation.count({ where: whereQuery }),
        ]);

        const reservationList = reservations.map((reservation) => ReservationDTOSchema.parse(reservation));

        return {
            success: true,
            data: {
                reservationList,
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
                reservationList: [],
                meta: {
                    totalCount: 0,
                    currentPage: page,
                    totalPages: 0,
                }
            }
        };
    }
};
