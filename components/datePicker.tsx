"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({children, setDate}: {children: React.ReactNode, setDate: React.Dispatch<React.SetStateAction<Date>>|React.Dispatch<React.SetStateAction<Date|undefined>>}) {
 
    const [open, setOpen] = React.useState(false)
    const selectDate = (date: Date) => {
        if(date !== new Date()){
        setDate(date)
        setOpen(false)
        }
    }
  return (
    <Popover open={open}>
      <PopoverTrigger asChild onClick={() => setOpen(!open)}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={new Date()}
          onSelect={selectDate as any}
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  )
}
