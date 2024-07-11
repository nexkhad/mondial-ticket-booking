import { PrismaClient } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { email } });

    await prisma.$disconnect();
    return user;
  } catch (error) {
    return null
  }
};



export const getUserById = async (id: string) => {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { id } });
    await prisma.$disconnect()
    return user;
  } catch (error) {
    return null
  }
}
