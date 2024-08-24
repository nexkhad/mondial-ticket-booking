import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest ) {
  try {
    const records = await prisma.depositRequest.findMany(
      {  include: {
            user: true, }}
    );
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error('Error fetching records:', error);
    return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma Client is disconnected
  }
}