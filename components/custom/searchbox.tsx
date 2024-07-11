"use client"
  

// https://www.cleartrip.com/places/airports/search?string=dubai

import { useState } from "react"
import Airports from "../airportSelector"
import { DatePicker } from "../datePicker";
import { Separator } from "@/components/ui/separator"
import { WhoSelector } from "../whoSelector";
import { ClassSelector } from "../classSelector";
import { Button } from "../ui/button";
import { Search } from "lucide-react";


export interface Passengers {
    children: number;
    infants: number;
    adults: number;
}
type Airport = {
    value: string
    label: string
  }

export type FlightClass = "Economy" | "Business" | "First Class" | "Premium Economy"

const SearchBox = () => {
    const [arrival, setArrival] = useState<Date>()
    const [departure, setDeparture] = useState<Date>(new Date())
    const [from, setFrom] = useState<Airport>({
        value: "",
        label: "---"
    })
    const [to, setTo] = useState<Airport>({
        value: "",
        label: "---"
    })
    const [returnDate, setReturnDate] = useState<Date | undefined>()
    const [passengers, setPassengers] = useState<Passengers>({
        children: 0,
        infants: 0,
        adults: 1
    })
    const [flightClass, setFlightClass] = useState<FlightClass>("Economy")
    
    
    return(
        <div className="border-2 w-10/12 mx-auto rounded-md py-2 px-5 grid grid-cols-7 justify-around gap-3 align-middl items-center">
            <Airports setData={setFrom}>
                <div className="">
                    <h4 className="text-md font-semibold text-left">From</h4>
                    <p className="text-sm text-gray-600 text-left">{from?.label}</p>
                </div>
            </Airports>
            <Airports setData={setTo}>
                <div className="border-l-2 pl-5">
                    <h4 className="text-md font-semibold text-left">From</h4>
                    <p className="text-sm text-gray-600 text-left">{to?.label}</p>
                </div>
            </Airports>

            <DatePicker setDate={setDeparture}>
            <div className="border-l-2 pl-5">
                    <h4 className="text-md font-semibold text-left">Departure</h4>
                    <p className="text-sm text-gray-600 text-left">{departure.toDateString()}</p>
                </div>
            </DatePicker>

            <DatePicker setDate={setReturnDate}>
            <div className="border-l-2 pl-5">
                    <h4 className={`text-md font-semibold text-left ${returnDate ? "text-black" : "text-gray-600"}`}>Return</h4>
                    <p className="text-sm text-gray-600 text-left">{returnDate?.toDateString()}</p>
                </div>
            </DatePicker>
            
            <WhoSelector setWho={setPassengers} who={passengers}>
            <div className="border-l-2 pl-5">
                    <h4 className={`text-md font-semibold text-left`}>Who</h4>
                    {/* i need to show the passengers data here like 2 Adults 1 child 1 infant if the value is 0 then show no data */}
                    <p className="text-sm text-gray-600 text-left">{passengers.adults} Adults {passengers.children} children {passengers.infants} infants</p>
                </div>
            </WhoSelector>
            <ClassSelector setClass={setFlightClass}>
            <div className="border-l-2 pl-5">
                    <h4 className={`text-md font-semibold text-left`}>Class</h4>
                    <p className="text-sm text-gray-600 text-left">{flightClass}</p>
                </div>
            </ClassSelector>
            <Button className=" bg-blue-800 text-white font-semibold rounded-md w-fit p-5 my-auto ml-auto">
                <Search className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default SearchBox