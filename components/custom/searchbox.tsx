"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Airports, { frameworks } from "../airportSelector"
import { DatePicker } from "../datePicker"
import { WhoSelector } from "../whoSelector"
import { ClassSelector } from "../classSelector"
import { Button } from "../ui/button"
import { Search } from "lucide-react"
import { SearchParamsProps } from "@/types"

export interface Passengers {
    children: number
    infants: number
    adults: number
}

type Airport = {
    value: string
    label: string
}

export type FlightClass = "Economy" | "Business" | "First Class" | "Premium Economy"

const SearchBox = ({ data }: { data?: SearchParamsProps }) => {
    const router = useRouter()
    const [departure, setDeparture] = useState<Date>(data?.departure ? new Date(data.departure) : new Date())
    const [from, setFrom] = useState<Airport>(
        
        data?.from ? { value: data.from, label: "---" } : { value: "", label: "---" })
    const [to, setTo] = useState<Airport>(
        data?.to ? { value: data.to, label: "---" } : { value: "", label: "---" }
    )
    const [returnDate, setReturnDate] = useState<Date | undefined>(data?.returnDate ? new Date(data.returnDate) : undefined)
    const [passengers, setPassengers] = useState<Passengers>({
        children: Number(data?.children) || 0,
        infants: Number(data?.infants) || 0,
        adults: Number(data?.adults) || 1
    })
    const [flightClass, setFlightClass] = useState<FlightClass>(data?.class as FlightClass || "Economy")
console.log(" from the search    from:", from);

    useEffect(() => {
        if (data) {
            setDeparture(data.departure ? new Date(data.departure) : new Date())
            setFrom({ value: data.from || "", label: frameworks.find((f) => f.value === data.from)?.label || "---" })
            setTo({ value: data.to || "", label: frameworks.find((f) => f.value === data.to)?.label || "---" })
            setReturnDate(data.returnDate ? new Date(data.returnDate) : undefined)
            setPassengers({
                children: Number(data.children) || 0,
                infants: Number(data.infants) || 0,
                adults: Number(data.adults) || 1
            })
            setFlightClass(data.class as FlightClass || "Economy")
        }
    }, [data])

    const handleSearch = () => {
        console.log('departure', departure);
        
        const searchParams = new URLSearchParams({
            from: from.value,
            to: to.value,
            departure: departure.toISOString(),
            returnDate: returnDate ? returnDate.toISOString() : '',
            adults: passengers.adults.toString(),
            children: passengers.children.toString(),
            infants: passengers.infants.toString(),
            class: flightClass
        })

        router.push(`/flights?${searchParams.toString()}`)
    }

    return (
        <div className="border-2 w-10/12 mx-auto rounded-md py-2 px-5 grid grid-cols-7 justify-around gap-3 align-middle items-center bg-white !text-black">
            <Airports airport={from.value} setData={setFrom}>
                <div className="">
                    <h4 className="text-md font-semibold text-left">From</h4>
                    <p className="text-sm text-gray-600 text-left">{from?.label}</p>
                </div>
            </Airports>
            <Airports setData={setTo} airport={to.value}>
                <div className="border-l-2 pl-5">
                    <h4 className="text-md font-semibold text-left">To</h4>
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
                    <p className="text-sm text-gray-600 text-left">
                        {passengers.adults > 0 && `${passengers.adults} Adult${passengers.adults > 1 ? 's' : ''} `}
                        {passengers.children > 0 && `${passengers.children} Child${passengers.children > 1 ? 'ren' : ''} `}
                        {passengers.infants > 0 && `${passengers.infants} Infant${passengers.infants > 1 ? 's' : ''}`}
                    </p>
                </div>
            </WhoSelector>
            <ClassSelector setClass={setFlightClass}>
                <div className="border-l-2 pl-5">
                    <h4 className={`text-md font-semibold text-left`}>Class</h4>
                    <p className="text-sm text-gray-600 text-left">{flightClass}</p>
                </div>
            </ClassSelector>
            <Button 
                className="bg-blue-800 text-white font-semibold rounded-md w-fit p-5 my-auto ml-auto" 
                onClick={handleSearch}
            >
                <Search className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default SearchBox