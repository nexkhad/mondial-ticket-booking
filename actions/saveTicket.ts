"use server";
import { getUserByEmail } from '@/data/user';
import { formDataToJson } from '@/lib/server-utils';
import { PrismaClient } from '@prisma/client'
// import connectMongo from "@/lib/dbConnect";
// import userModel from "@/models/user.model";
export async function saveTicket(formData: Flight) {
    try {
    const prisma = new PrismaClient()
    const saved = await prisma.ticket.create({ data: formData })
    await prisma.$disconnect()
    return {
        success: { message:  "ticket successfully created" },
        status: 200
    };

    } catch (error) {
        console.log(error);
        
        return {
            error: { message: "An error occured while creating ticket" },
            status: 500
        }

    }
}


interface Flight {
    airline: string;
    flightNo: string;
    totalSeatsCount: number;
    flightDeparture: Date;
    flightArrival: Date;
    departureAirport: string;
    arrivalAirport: string;
    checkInBaggage: number;
    cabinBaggage: number;
    class: string;
    adultPrice_A: number;
    childPrice_A: number;
    infantPrice_A: number;
    adultPrice_B: number;
    childPrice_B: number;
    infantPrice_B: number;
}