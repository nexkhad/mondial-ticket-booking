"use server";
import { getUserByEmail } from '@/data/user';
import { formDataToJson } from '@/lib/server-utils';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
// import connectMongo from "@/lib/dbConnect";
// import userModel from "@/models/user.model";
export async function signUpUser(formData: FormData) {
    // await connectMongo()
    const prisma = new PrismaClient()
    formData.delete('confirmPassword')
    const data = formDataToJson(formData)
    const isExist = await getUserByEmail(data.email)
    
    if(isExist){
      throw new Error('email already exist')
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(data.password, salt)
    data.password = hashedPassword;
    const user = await prisma.user.create({ data:data as any  })
    await prisma.$disconnect()
    return {
        success: { message:  "user successfully signed up" },
        status: 200
    };
}

  