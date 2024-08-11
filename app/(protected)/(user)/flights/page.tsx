import SearchBox from "@/components/custom/searchbox";
import { getCurrentUser } from "@/lib/auth";
import {AllDates} from "@/components/custom/dates";
import flightDetails from '@/public/pc.png'
import Image from "next/image";
import FlightData from "@/components/custom/FlightData";
import { PrismaClient } from "@prisma/client";
import { SearchParamsProps } from "@/types";
import { getFilteredFlights } from "@/lib/queries/flight";
export default async function Home({ searchParams }: { searchParams: SearchParamsProps }) {
  const flights = await getFilteredFlights(searchParams);
  return (
    <main className="min-h-[calc(100dvh-24rem)] text-center mt-24">
    <SearchBox data={searchParams}/>
    {/* <AllDates/> */}

    <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-5  mt-10">
      <div className="left w-full flex flex-col gap-0 md:col-span-3">
      {flights.map((flight) => (
      <FlightData flight={flight} key={flight.id}/>
      ))}
      </div>
      <div className="right col-span-2">
        <img src={'https://placehold.co/900x1200'} alt={"flight"}/>
      </div>
    </div>
    </main>
  );
}
