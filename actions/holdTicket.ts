"use server"

import { getCurrentUser } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const holdTicket = async (ticketId: string) => {
    const prisma = new PrismaClient()
    
    try {
        const user = await getCurrentUser()
        if (!user) {
            throw new Error("User not authenticated")
        }

        // Find the ticket
        const ticket = await prisma.ticket.findUnique({
            where: { id: ticketId }
        })

        if (!ticket) {
            throw new Error("Ticket not found")
        }

        if(ticket.availableSeats === null){
            return { success: false, error: "No available seats" }
        }

        // Check if there are available seats
        if (ticket.availableSeats <= ticket.heldSeats) {
            throw new Error("No available seats to hold")
        }

        // Calculate expiration time (2 hours from now)
        const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000)

        // Create a new hold
        const hold = await prisma.hold.create({
            data: {
                ticketId: ticket.id,
                userId: user.id,
                expiresAt: expiresAt
            }
        })

        // Update the ticket's held seats countz
        await prisma.ticket.update({
            where: { id: ticketId },
            data: { heldSeats: { increment: 1 } }
        })

        // Revalidate the tickets page to reflect the changes
        // revalidatePath('/')

        return { success: true, holdId: hold.id }
    } catch (error) {
        console.error("Error holding ticket:", error)
        return { success: false, error: (error as Error).message }
    } finally {
        await prisma.$disconnect()
    }
}