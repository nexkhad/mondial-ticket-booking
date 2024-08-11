import { frameworks } from "@/data/airports";
import { SearchParamsProps } from "@/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getFilteredFlights(searchParams: SearchParamsProps) {
  const { from, to, departure, returnDate, adults, children, infants, class: travelClass } = searchParams;
  const totalMembers = Number(adults) + Number(children) + Number(infants);

  const fromAirport = from ? frameworks.find((f) => f.value === from)?.label.split(",")[0] : undefined;
  const toAirport = to ? frameworks.find((f) => f.value === to)?.label.split(",")[0] : undefined;

  if (!from || !to || !departure || !totalMembers) return [];

  console.log(departure, '\n', returnDate);
  
  // Set the time to 00:00:00 for the start of the day
  const departureStart = departure ? new Date(departure) : undefined;
  if (departureStart) {
    departureStart.setUTCHours(0, 0, 0, 0);
  }

  // Set the time to 23:59:59 for the end of the day
  const departureEnd = departureStart ? new Date(departureStart) : undefined;
  if (departureEnd) {
    departureEnd.setUTCHours(23, 59, 59, 999);
  }

  // Do the same for return date if it exists
  const returnStart = returnDate ? new Date(returnDate) : undefined;
  const returnEnd = returnDate ? new Date(returnDate) : undefined;
  if (returnStart) {
    returnStart.setUTCHours(0, 0, 0, 0);
  }
  if (returnEnd) {
    returnEnd.setUTCHours(23, 59, 59, 999);
  }

  console.log([
    from ? { departureAirport: fromAirport } : {},
        to ? { arrivalAirport: toAirport } : {},
        departureStart && departureEnd
          ? {
              flightDeparture: {
                gte: departureStart,
                lte: departureEnd,
              },
            }
          : {},
        returnStart && returnEnd
          ? {
              flightArrival: {
                gte: returnStart,
                lte: returnEnd,
              },
            }
          : {},
        travelClass ? { class: travelClass } : {},
        { availableSeats: { gte: totalMembers } },
  ])

  const flights = await prisma.ticket.findMany({
    where: {
      AND: [
        from ? { departureAirport: fromAirport } : {},
        to ? { arrivalAirport: toAirport } : {},
        departureStart && departureEnd
          ? {
              flightDeparture: {
                gte: departureStart,
                lte: departureEnd,
              },
            }
          : {},
        returnStart && returnEnd
          ? {
              flightArrival: {
                gte: returnStart,
                lte: returnEnd,
              },
            }
          : {},
        travelClass ? { class: travelClass } : {},
        { availableSeats: { gte: totalMembers } },
      ],
    },
    orderBy: {
      flightDeparture: 'asc',
    },
  });

  await prisma.$disconnect();
  return flights;
}