import SearchBox from "@/components/custom/searchbox";
import { getCurrentUser } from "@/lib/auth";
import {AllDates} from "@/components/custom/dates";
import flightDetails from '@/public/pc.png'
import Image from "next/image";
import FlightData from "@/components/custom/FlightData";
import { PrismaClient } from "@prisma/client";
export default async function Home() {
  const client = new PrismaClient()
  const user = await getCurrentUser();

  const flights = await client.ticket.findMany({})
  return (
    <main className="min-h-screen text-center mt-24">
    <SearchBox/>
    <AllDates/>

    <div className="w-10/12 mx-auto flex mt-10">
      <div className="left w-full md:w-9/12 flex flex-col gap-0">
      {flights.map((flight) => (
      <FlightData flight={flight} key={flight.id}/>
      ))}
      </div>
      <div className="right">
        <img src={'https://placehold.co/900x1200'} alt={"flight"}/>
      </div>
    </div>
    </main>
  );
}
