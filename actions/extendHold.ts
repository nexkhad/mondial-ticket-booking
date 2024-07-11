"use server"

import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { PrismaClient } from "@prisma/client"

export async function extendHold(holdId: string) {
    try {
        const user = await getCurrentUser()
        const prisma = new PrismaClient()
        if (!user) {
            throw new Error("User not authenticated")
        }

        // Find the current hold
        const currentHold = await prisma.hold.findUnique({
            where: {
                id: holdId,
                userId: user.id
            },
            include: {
                ticket: true
            }
        })

        if (!currentHold) {
            throw new Error("Hold not found or does not belong to the current user")
        }

        // Check if the hold has already expired
        if (currentHold.expiresAt < new Date()) {
            throw new Error("Hold has already expired and cannot be extended")
        }

        // Calculate new expiration time (2 more hours from now)
        const newExpiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000)

        // Update the hold with the new expiration time
        const updatedHold = await prisma.hold.update({
            where: { id: holdId },
            data: {
                expiresAt: newExpiresAt
            }
        })

        // Revalidate the tickets page to reflect the changes
        revalidatePath('/tickets')

        return {
            success: true,
            holdId: updatedHold.id,
            newExpiresAt: updatedHold.expiresAt
        }
    } catch (error) {
        console.error("Error extending hold:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        }
    }
}