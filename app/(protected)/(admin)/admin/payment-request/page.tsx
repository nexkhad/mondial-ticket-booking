import { PrismaClient } from "@prisma/client";
import MainModal from "../../_components/mainModal";

export default async function DepositRequest() {
  const prisma = new PrismaClient();

  const depositRequests = await prisma.depositRequest.findMany({
    include: {
        user: true, //This includes the related User data
    }
  });
  await prisma.$disconnect();




  return (
     <div>
       <MainModal depositRequests={depositRequests} />
     </div>
    

  );
}