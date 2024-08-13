import SearchBox from "@/components/custom/searchbox";
import { getCurrentUser } from "@/lib/auth";
import {AllDates} from "@/components/custom/dates";
import flightDetails from '@/public/pc.png'
import Image from "next/image";
import FlightData from "@/components/custom/FlightData";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { SectionNav } from "@/components/sectionNav";
import PopularDestinations from "@/components/popularDestinations";
import SpecialOffers from "@/components/SpecialOffers";
import Newsletter from "@/components/Newsletter";


export default async function Home() {

  return (
    <main className="min-h-screen">
    <div className="relative h-[500px]">
      <Image
        src="https://images.pexels.com/photos/8281055/pexels-photo-8281055.jpeg"
        alt="Airplane flying over a city"
        layout="fill"
        objectFit="cover"
        className="brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Flight</h1>
        <p className="text-xl mb-8">Discover amazing destinations at the best prices</p>
        <SectionNav />
        <SearchBox />
      </div>
    </div>

    <PopularDestinations />
    <SpecialOffers />
    <Newsletter />
  </main>
  );
}