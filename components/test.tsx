import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
const formSchema = z.object({
  airline: z.string().min(1).max(255),
  flightNo: z.string().min(1).max(255),
  seatsCount: z.coerce.number().gte(1).lte(9999999999),
  flightDeparture: z.date(),
  flightArrival: z.date(),
  departureAirport: z.string().min(1).max(255),
  arrivalAirport: z.string().min(1).max(255),
  adultPrice_A: z.number().gte(1).lte(255),
  childPrice_A: z.number().gte(1).lte(9999999999),
  infantPrice_A: z.number().gte(1).lte(9999999999),
  adultPrice_B: z.number().gte(1).lte(9999999999),
  childPrice_B: z.number().gte(1).lte(9999999999),
  infantPrice_B: z.number().gte(1).lte(9999999999),
  checkInBaggage: z.number().gte(1).lte(9999999999),
  cabinBaggage: z.number().gte(1).lte(9999999999),
  class: z.string().min(1).max(255),
});

export function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      airline: "string",
      flightNo: "string",
      seatsCount: 1,
      departureAirport: "string",
      arrivalAirport: "string",
      adultPrice_A: 1,
      childPrice_A: 1,
      infantPrice_A: 1,
      adultPrice_B: 1,
      childPrice_B: 1,
      infantPrice_B: 1,
      checkInBaggage: 1,
      cabinBaggage: 1,
      class: "string",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="airline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Airline</FormLabel>
              <FormControl>
                <Input placeholder="eg: American Airlines" {...field} />
              </FormControl>
              <FormDescription>Select the airline company</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="flightNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Flight Number</FormLabel>
              <FormControl>
                <Input placeholder="eg: BA 222" {...field} />
              </FormControl>
              <FormDescription>enter the flight number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seatsCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avaliable Seats</FormLabel>
              <FormControl>
                <Input type="number" placeholder="eg:9" {...field} />
              </FormControl>
              <FormDescription>
                Enter how much seats are avaliable
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="flightDeparture"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Departure date and time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) =>
                    //   date > new Date() || date < new Date("1900-01-01")
                    // }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                select the departure time and date
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="flightArrival"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Arrival date and time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) =>
                    //   date > new Date() || date < new Date("1900-01-01")
                    // }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                select the arrival time and date
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departureAirport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>select the departure airport</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="arrivalAirport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>select the arrival airport</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adultPrice_A"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adult</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="childPrice_A"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Child</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="infantPrice_A"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Infant</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adultPrice_B"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adult</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="childPrice_B"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Child</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="infantPrice_B"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Infant</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="checkInBaggage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>checkinBaggage</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Placeholder" {...field} />
              </FormControl>
              <FormDescription>Description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cabinBaggage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>cabinBaggage</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Placeholder" {...field} />
              </FormControl>
              <FormDescription>Description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
              <FormControl>
                <Input placeholder="Placeholder" {...field} />
              </FormControl>
              <FormDescription>Description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
