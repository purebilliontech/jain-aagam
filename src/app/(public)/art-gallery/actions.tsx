"use server"

import { handleServerActionError } from "@/helpers/error"
import { db } from "@/lib/db"
import { ReservationForm } from "@/schema/reservations"

export const createReservation = async (reservation: ReservationForm) => {
    try {

        const existingReservation = await db.reservation.findUnique({
            where: {
                email: reservation.email,
            }
        })

        if (existingReservation) {
            return {
                success: false,
                message: "Reservation already exists"
            }
        }

        await db.reservation.create({
            data: reservation
        })

        return {
            success: true,
            message: "Reservation created successfully",
        }
    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            message: "Reservation creation failed",
        }
    }
}