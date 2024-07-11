"use server";
import { computeSHA256 } from "@/lib/encrypt";
import { getSignedURL } from "./bucket";
import { formDataToJson } from "@/lib/server-utils";
import { PrismaClient } from '@prisma/client'

  
export async function AddAirline(formData: FormData) {
    let airlineImage
    try {
        const prisma = new PrismaClient()
        const data = formDataToJson(formData)
        delete data.logoUrl
        const airlineImg = formData.get("logoUrl") as File
         airlineImage = await getSignedURL(airlineImg.type, airlineImg.size, await computeSHA256(airlineImg))
        const url = await putFile(airlineImg, airlineImage.success.url)
        data.logoUrl = url
        let airline = await prisma.airline.create({ data:data as any  })
        console.log(airline);
        
        await prisma.$disconnect()

        return {
            success: { message:  "airline successfully added" },
            status: 200
        };


    } catch (error) {
        console.log(error);
        
        return {
            error: { message: (error as Error).message },
            status: 500
        }
    }
}

const putFile = async(file:File, url: string) => {
    try {
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      })    
      return url.split('?')[0]
    } catch (error) {
      console.log(error);
      throw new Error("Failed to upload file");
    }
  }