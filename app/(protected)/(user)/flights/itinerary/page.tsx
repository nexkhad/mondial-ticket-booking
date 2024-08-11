"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function itinerary() {
  return (
    <main className="mt-36">
      <div className="flex flex-col lg:flex-row gap-8 p-8 md:p-12 md:m-24">
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold my-24">1. Review your itinerary</h1>
            <div>
              <h2 className="text-lg font-semibold">Kozhikode → Kochi</h2>
              <p className="text-sm text-muted-foreground">Fri, 9 Aug 2024</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <PlaneIcon className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm font-medium">09:30 CCJ</p>
                  <p className="text-xs text-muted-foreground">
                    Kozhikode, Terminal 1, Kozhikode
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">0h 35m</p>
              </div>
              <div className="flex items-center space-x-2">
                <PlaneIcon className="w-6 h-6 text-primary rotate-90" />
                <div>
                  <p className="text-sm font-medium">10:05 COK</p>
                  <p className="text-xs text-muted-foreground">
                    Cochin International Airport, Terminal 1, Kochi
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-100 rounded-md">
              <p className="text-sm font-medium">
                Ever-changing plans making you unsure?
              </p>
              <p className="text-xs text-muted-foreground">
                Get free date change with{" "}
                <span className="text-primary">ClearChoice Plus</span> or free
                cancellation/date change with{" "}
                <span className="text-primary">ClearChoice Max</span>. T&C apply
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Select your fare</h2>
              <RadioGroup
                defaultValue="standard"
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="p-4 border rounded-md cursor-pointer">
                  <RadioGroupItem
                    value="standard"
                    id="standard"
                    className="peer"
                  />
                  <Label htmlFor="standard" className="block cursor-pointer">
                    <h3 className="text-sm font-medium">Standard fare</h3>
                    <p className="text-xl font-bold">₹3,004</p>
                    <p className="text-xs text-muted-foreground">
                      Standard airline cancellation and date change penalties
                      apply
                    </p>
                  </Label>
                </div>
                <div className="p-4 border rounded-md cursor-pointer">
                  <RadioGroupItem
                    value="clearChoice-plus"
                    id="clearChoice-plus"
                    className="peer"
                  />
                  <Label htmlFor="clearChoice-plus" className="block cursor-pointer" >
                    <h3 className="text-sm font-medium">ClearChoice Plus</h3>
                    <p className="text-xl font-bold">₹3,004 + ₹349</p>
                    <p className="text-xs text-muted-foreground">
                      Free date change even when switching airlines. Pay fare
                      difference, if any.{" "}
                      <a href="#" className="text-primary">
                        Learn more
                      </a>
                    </p>
                  </Label>
                </div>
                <div className="p-4 border rounded-md cursor-pointer">
                  <RadioGroupItem
                    value="clearChoice-max"
                    id="clearChoice-max"
                    className="peer"
                  />
                  <Label htmlFor="clearChoice-max" className="block cursor-pointer">
                    <h3 className="text-sm font-medium">ClearChoice Max</h3>
                    <p className="text-xl font-bold">₹3,004 + ₹849</p>
                    <p className="text-xs text-muted-foreground">
                      Get full refund of ₹3,004 on cancellation or free date
                      change even when switching airlines. Pay fare difference,
                      if any.{" "}
                      <a href="#" className="text-primary">
                        Learn more
                      </a>
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">CCJ → COK: Standard fare</h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <InfoIcon className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Cancellation fee starts from ₹2,553
                </p>
              </li>
              <li className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Date change allowed from ₹2,553
                </p>
              </li>
              <li className="flex items-center space-x-2">
                <BriefcaseIcon className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Cabin/person: 7kg
                </p>
              </li>
              <li className="flex items-center space-x-2">
                <CheckIcon className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Check-in/person: 15kg(1 Piece)
                </p>
              </li>
              <li className="flex items-center space-x-2">
                <UtensilsIcon className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Paid meal</p>
              </li>
              <li className="flex items-center space-x-2">
                <RockingChairIcon className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Paid seat</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-1/3 space-y-4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold">Total price</h2>
            <p className="text-xl font-bold">₹3,004</p>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">1 adult</p>
              <div className="flex justify-between text-xs text-muted-foreground">
                <p>Base fare (1 traveller)</p>
                <p>₹2,053</p>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <p>Taxes and fees</p>
                <p>₹951</p>
              </div>
            </div>
            <div className="p-2 bg-gray-100 rounded-md mt-2">
              <p className="text-xs text-muted-foreground">
                Pay in 6 interest free EMIs at ₹501/mo.{" "}
                <a href="#" className="text-primary">
                  View plans
                </a>{" "}
                with your credit card
              </p>
            </div>
          </Card>
        </div>

        <Button/>
      </div>
    </main>
  );
}

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function InfoIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function PlaneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function RockingChairIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3.5 2 6.5 12.5 18 12.5" />
      <line x1="9.5" x2="5.5" y1="12.5" y2="20" />
      <line x1="15" x2="18.5" y1="12.5" y2="20" />
      <path d="M2.75 18a13 13 0 0 0 18.5 0" />
    </svg>
  );
}

function UtensilsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
