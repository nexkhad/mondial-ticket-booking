"use server"

import { getCurrentUser } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"

export async function getHoldInfo(ticketId: string) {
    try {
        const user = await getCurrentUser()
        const prisma = new PrismaClient()
        if (!user) {
            throw new Error("User not authenticated")
        }

        const hold = await prisma.hold.findFirst({
            where: {
                ticketId: ticketId,
                userId: user.id,
                expiresAt: {
                    gt: new Date() // Only get holds that haven't expired yet
                }
            },
            select: {
                id: true,
                expiresAt: true
            }
        })

        if (!hold) {
            return null
        }

        return {
            id: hold.id,
            expiresAt: hold.expiresAt
        }
    } catch (error) {
        console.error("Error fetching hold info:", error)
        throw new Error("Failed to fetch hold information")
    }
}