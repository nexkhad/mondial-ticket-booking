"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { CalendarIcon, PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { TimePicker } from "@/components/ui/timePicker";
import { saveTicket } from "@/actions/saveTicket";
import { jsToFormData } from "@/lib/encrypt";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  airline: z.string().min(1).max(255),
  flightNo: z.string().min(1).max(255),
  totalSeatsCount: z.coerce.number().gte(1).lte(9999999999),
  flightDeparture: z.date(),
  flightArrival: z.date(),
  departureAirport: z.string().min(1).max(255),
  arrivalAirport: z.string().min(1).max(255),
  checkInBaggage: z.coerce.number().gte(1).lte(9999999999),
  cabinBaggage: z.coerce.number().gte(1).lte(9999999999),
  class: z.string().min(1).max(255),
  adultPrice_A: z.coerce.number().gte(1).lte(255),
  childPrice_A: z.coerce.number().gte(1).lte(9999999999),
  infantPrice_A: z.coerce.number().gte(1).lte(9999999999),
  adultPrice_B: z.coerce.number().gte(1).lte(9999999999),
  childPrice_B: z.coerce.number().gte(1).lte(9999999999),
  infantPrice_B: z.coerce.number().gte(1).lte(9999999999),
});

export function TicketForm() {
  const [files, setFiles] = useState<File[] | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const {toast} = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);

      const data = jsToFormData(values);

      data.forEach((value, key) => {
        console.log(key, typeof(value));
        
      });
      
      let res = await saveTicket(values);
      if(res.success){
        alert(res.success.message)
        toast({
          title: res.success.message,
        })
      }
      if(res.error){
        alert(res.error.message)
        toast({
          title: res.error.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      
    }
  }

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="flightNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flight Number</FormLabel>
                        <FormControl>
                          <Input placeholder="eg: BA 222" {...field} />
                        </FormControl>
                        <FormDescription>
                          enter the flight number
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalSeatsCount"
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
                                variant="outline"
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP HH:mm:ss")
                                ) : (
                                  <span>Pick a date</span>
                                )}
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

                            <div className="p-3 border-t border-border">
                              <TimePicker
                                setDate={field.onChange}
                                date={field.value}
                              />
                            </div>
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
                                variant="outline"
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP HH:mm:ss")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value as any}
                              onSelect={field.onChange}
                              // disabled={(date) =>
                              //   date > new Date() || date < new Date("1900-01-01")
                              // }
                              initialFocus
                            />
                            <div className="p-3 border-t border-border">
                              <TimePicker
                                setDate={field.onChange}
                                date={field.value}
                              />
                            </div>
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
                        <FormDescription>
                          select the departure airport
                        </FormDescription>
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
                        <FormDescription>
                          select the arrival airport
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="checkInBaggage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Checkin Baggage</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Placeholder"
                            {...field}
                          />
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
                          <Input type="number" {...field} />
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
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pricing G-1</CardTitle>
                <CardDescription>
                  Configure the price of the Ticket.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]"></TableHead>
                      <TableHead className="w-[100px] font-semibold">
                        Price
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">Adult</TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name="adultPrice_A"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Label htmlFor="price-1" className="sr-only">
                                  Price
                                </Label>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder=" "
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Child</TableCell>

                      <TableCell>
                        <FormField
                          control={form.control}
                          name="childPrice_A"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Label htmlFor="price-2" className="sr-only">
                                  Price
                                </Label>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder=""
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Infant</TableCell>

                      <TableCell>
                        <FormField
                          control={form.control}
                          name="infantPrice_A"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Label htmlFor="price-3" className="sr-only">
                                  Stock
                                </Label>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder=""
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pricing G-2</CardTitle>
                <CardDescription>
                  Configure the price of the Ticket.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]"></TableHead>
                      <TableHead className="w-[100px] font-semibold">
                        Price
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">Adult</TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name="adultPrice_B"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Label htmlFor="price-1" className="sr-only">
                                  Price
                                </Label>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder=" "
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Child</TableCell>

                      <TableCell>
                        <FormField
                          control={form.control}
                          name="childPrice_B"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Label htmlFor="price-2" className="sr-only">
                                  Price
                                </Label>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder=""
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">Infant</TableCell>

                      <TableCell>
                        <FormField
                          control={form.control}
                          name="infantPrice_B"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Label htmlFor="price-3" className="sr-only">
                                  Stock
                                </Label>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder=""
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Airline Details</CardTitle>
                <CardDescription>
                  Select the appropriate Airline Company.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <FormField
                      control={form.control}
                      name="airline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Airline Company</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Airline" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="air_india">
                                Air India
                              </SelectItem>
                              <SelectItem value="indigo">Indigo</SelectItem>
                              <SelectItem value="spicejet">Spicejet</SelectItem>
                              <SelectItem value="goAir">GoAir</SelectItem>
                              <SelectItem value="vistara">Vistara</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
};
