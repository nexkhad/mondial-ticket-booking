import { BaggageClaimIcon, Clock, PlaneIcon, Utensils } from "lucide-react"
import { Separator } from "./ui/separator"
import { Ticket } from "@prisma/client"
import { getTime, getTimeDiff } from "@/lib/dateAndTime"

const FlightCard = ({flight}: {flight: Ticket}) => {
    return(
        <div className="mx-3">

      <div className="logo flex gap-2 items-center">
        <img className="rounded-md" src={"https://placehold.co/30x30"} alt={"flight"} />
        <div className="text-left w-fit">
          <p className="text-sm font-semibold my-auto">{flight.airline}, {flight.flightNo} <span className="text-[10px] font-light text-muted-foreground">(Economy)</span></p>
        </div>
      </div>

      <Separator className=" my-2" orientation="horizontal"/>

      <div className="flex justify-around">
        <div className="left text-left">
            <p className="text-sm font-medium">{flight.departureAirport}</p>
            <p className="text-sm font-semibold">{getTime(flight.flightDeparture)}</p>

            <p className="text-[10px] font-semibold">{flight.flightDeparture.toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
            <p className="text-[10px] text-muted-foreground">{flight.departureAirport}</p>
        </div>
        <div className="middle flex flex-col gap-2">
            <p className="text-[10px] text-muted-foreground"><Clock className="inline-block h-3 w-3 my-auto mr-1"/> {`${getTimeDiff(flight.flightDeparture, flight.flightArrival).split(':').join('h ')}m`}</p>
            <div className="flex items-center relative mx-3">
          <div className="border-b-2 border-[#cacaca] h-1 w-24"></div>
          <FlightIcon className=" w-4 h-4 rotate-90 ml-3" color="#cacaca"/>
        </div>
            <p className="text-[10px] text-muted-foreground">1 stop</p>
        </div>
        <div className="right">
        <div className="left text-left">
            <p className="text-sm font-medium">{flight.arrivalAirport}</p>
            <p className="text-sm font-semibold">{getTime(flight.flightArrival)}</p>

            <p className="text-[10px] font-semibold">{flight.flightArrival.toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
            <p className="text-[10px] text-muted-foreground">{flight.arrivalAirport}</p>
        </div>
        </div>
      </div>

      <div className="info w-3/6 mx-auto flex justify-around bg-gray-200 rounded-md px-2 py-1 mt-4">
        <p className="text-[10px] text-muted-foreground">Checkedin Baggage <BaggageClaimIcon className="inline-block h-3 w-3 my-auto mr-1"/> {flight.checkInBaggage} Kg</p>
        <p className="text-[10px] text-muted-foreground">Cabin Baggage <BaggageClaimIcon className="inline-block h-3 w-3 my-auto mr-1"/> {flight.cabinBaggage} Kg</p>
        {/* <p className="text-[10px] text-muted-foreground"><Utensils className="inline-block h-3 w-3 my-auto mr-1"/> Paid Meal</p> */}
      </div>

      <div className="mt-10"></div>
        </div>
    )
}

export default FlightCard



const FlightIcon = ({className, color="#000000"}:{className:string, color:string}) => {
    return(
<svg version="1.1" className={className} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 256 256" enableBackground="new 0 0 256 256" xmlSpace="preserve">
<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
<g><g><path fill={color} d="M141.5,157.4c0.2-3.6,4.4-2.4,4.4-2.4l32.7,6.7l67.4,25.7c0-12.6-2-14-5-16.2l-96.2-69c0,0-2.6-31.6-2.6-59.5c0-12.9-6.2-41.2-14.3-41.2s-14.3,28.7-14.3,41.2c0,26.4-2.6,59.5-2.6,59.5l-96.2,69c-3.7,2.6-5,4.1-5,16.2l67.4-25.7l32.6-6.6c0,0,4.2-1.3,4.4,2.4c0.2,3.6-0.6,36.4,3.1,53.8c0.5,2.3-1.3,2.5-2.5,3.9l-27.4,17.3c-0.9,1-1.3,3.8-1.3,3.8l-0.5,9.8l35.8-8.4l6.3,16.8l6.3-16.8l35.8,8.4l-0.5-9.8c0.1,0-0.4-2.8-1.3-3.8l-27.4-17.3c-1.2-1.4-3-1.6-2.5-3.9C142.1,193.8,141.3,161.1,141.5,157.4z"/></g></g>
</svg>
    )
}

