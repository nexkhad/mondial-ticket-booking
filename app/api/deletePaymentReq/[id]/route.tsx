import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;


  if (!id) {
    return NextResponse.json({ error: 'ID parameter is missing' }, { status: 400 });
  }

  try {
    await prisma.depositRequest.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Record deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma Client is disconnected
  }
}
