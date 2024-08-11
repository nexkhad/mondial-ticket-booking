"use client";
import { Circle, Info } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import FlightCard from "../flightCard";
import { Ticket } from "@prisma/client";
import { getTime, getTimeDiff } from "@/lib/dateAndTime";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { holdTicket } from "@/actions/holdTicket";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ListPricing } from "../pricingModal";

const FlightData = ({ flight }: { flight: Ticket }) => {
  function formatIndianRupee(amount: number): string {
    // Convert the number to a string
    const numStr = amount.toString();

    // Split the string into integer and decimal parts (if any)
    const [integerPart, decimalPart] = numStr.split(".");

    // Add commas to the integer part
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    // Combine the parts with the Rupee symbol
    let result = `₹ ${formattedIntegerPart}`;

    // Add decimal part if it exists
    if (decimalPart) {
      result += `.${decimalPart}`;
    }

    return result;
  }

  return (
    // TODO: add flight details and chang gap with justify around or between
    <div className="m-1 border-2 border-gray-300 p-3 rounded-md shadow-lg">
      <div className="flex">
        <div className="w-1/2 flex gap-10">
          <div className="logo flex gap-2 ">
            <img
              className="rounded-md"
              src={"https://placehold.co/50x50"}
              alt={"flight"}
            />
            <div className="text-left w-fit">
              <p className="text-sm font-semibold">{flight.airline}</p>
              <p className="text-[10px] text-muted-foreground">
                {flight.flightNo}
              </p>
            </div>
          </div>

          <div className="flightTime flex gap-2 items-center">
            <div>
              <p className="text-sm font-semibold">
                {getTime(flight.flightDeparture)}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {flight.departureAirport}
              </p>
            </div>
            <div className="flex items-center relative mx-3">
              <div className="border-b-2 border-[#cacaca] h-1 w-10"></div>
              <i className="text-[#cacaca] inline-block border-2 border-[#cacaca] w-2 h-2 rounded-full bg-white absolute left-1/2 transform -translate-x-1/2 mt-[1x]"></i>
            </div>
            <div>
              <p className="text-sm font-semibold">
                {getTime(flight.flightArrival)}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {flight.arrivalAirport}
              </p>
            </div>
          </div>
        </div>
        <Separator className="mx-2" orientation="vertical" />

        <div className="flex w-1/2">
          <div className="w-1/3 text-left my-auto">
            <p className="text-sm font-semibold">
              {getTimeDiff(flight.flightDeparture, flight.flightArrival)}
            </p>
            <p className="text-[10px] text-muted-foreground">
              1 stop <Info className="inline-block h-3 w-3" />
            </p>
          </div>

          <div className="w-2/3 my-auto">
            <div className="flex gap-3 items-center ml-auto justify-end">
              <p className="text-xs font-semibold text-red-700">
                {flight.availableSeats} left at
              </p>
              {/* rupee symbol */}
              <h4 className="text-md font-semibold">
                {formatIndianRupee(flight.adultPrice_A)}
              </h4>

              <ListPricing ticket={flight}>
                  <span className="text-red-700 font-semibold">View Fares</span>
              </ListPricing>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mx-3 mt-2" orientation="horizontal" />
      <div className="w-full justify-start">
        <Collapsible asChild>
          <>
            <CollapsibleTrigger asChild>
              <p className="text-xs text-left text-blue-500 cursor-pointer my-4">
                Flight Details
              </p>
            </CollapsibleTrigger>
            <CollapsibleContent asChild>
              <FlightCard flight={flight} />
            </CollapsibleContent>
          </>
        </Collapsible>
      </div>
    </div>
  );
};

export default FlightData;

// const ListPricing = ({ children, ticket }: { children: React.ReactNode, ticket: Ticket }) => {
//   const user = useCurrentUser();
//   const handleHold = async () => {
//           if (ticket.id) {
//             console.log("Hold seat for ticket ID:", ticket.id);
//             let res = await holdTicket(ticket.id);
//             console.log(res);
//             // TODO: Implement the hold seat functionality using the ticketId
//           } else {
//             console.error("No ticket ID found");
//           }
//   }
//   return (
//     <Dialog>
//       <DialogTrigger>{children}</DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Book a seat</DialogTitle>
//           <DialogDescription>Book a seat or hold a seat</DialogDescription>
//         </DialogHeader>
//         <div className="flex w-full justify-around">
//               <Button variant="default" size="icon" className="w-full">Book Now</Button>
//               {<Button variant="outline" size="icon" className="w-full" onClick={handleHold}>Hold Seat</Button>}
//              </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
