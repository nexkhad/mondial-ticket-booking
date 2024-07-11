import { useState, useEffect } from "react";
import { getHoldInfo } from "@/actions/getHoldInfo"; // You need to create this server action
import { Ticket } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { holdTicket } from "@/actions/holdTicket";
import { extendHold } from "@/actions/extendHold";
const Timer = ({ expiresAt }: { expiresAt: Date }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = new Date(expiresAt).getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        setTimeLeft("Expired");
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  return <span>{timeLeft}</span>;
};

export const ListPricing = ({
  children,
  ticket,
}: {
  children: React.ReactNode;
  ticket: Ticket;
}) => {
  const user = useCurrentUser();
  const [holdInfo, setHoldInfo] = useState<{
    id: string;
    expiresAt: Date;
  } | null>(null);

  useEffect(() => {
    const fetchHoldInfo = async () => {
      if (ticket.id) {
        const info = await getHoldInfo(ticket.id);
        setHoldInfo(info);
      }
    };

    fetchHoldInfo();
  }, [ticket.id]);

  const handleHold = async () => {
    if (ticket.id) {
      console.log("Hold seat for ticket ID:", ticket.id);
      let res = await holdTicket(ticket.id);
      console.log(res);
      // Refetch hold info after holding
      const info = await getHoldInfo(ticket.id);
      setHoldInfo(info);
    } else {
      console.error("No ticket ID found");
    }
  };

  const handleExtendHold = async () => {
    if (holdInfo?.id) {
      const res = await extendHold(holdInfo.id);
      console.log(res);
      // TODO: Implement the extend hold functionality using the holdId
      console.log("Extend hold for hold ID:", holdInfo.id);

      // Refetch hold info after extending
      const info = await getHoldInfo(ticket.id);
      setHoldInfo(info);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book a seat</DialogTitle>
          <DialogDescription>
            {holdInfo ? `Hold expires in: ` : `Book a seat or hold a seat`}
            {holdInfo && <Timer expiresAt={holdInfo.expiresAt} />}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-around">
          <Button variant="default" size="icon" className="w-full">
            Book Now
          </Button>
          {holdInfo ? (
            <Button
              variant="outline"
              size="icon"
              className="w-full"
              onClick={handleExtendHold}
            >
              Extend Hold
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="w-full"
              onClick={handleHold}
            >
              Hold Seat
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
