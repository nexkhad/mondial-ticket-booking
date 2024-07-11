import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Passengers } from './custom/searchbox';
import { Counter } from './counter';

export function WhoSelector({ children, setWho, who }: { children: React.ReactNode, setWho: React.Dispatch<React.SetStateAction<Passengers>>, who: Passengers }) {
  
  const handlePassengerChange = (name: string, value: number) => {
    setWho({
      ...who,
      [name]: value,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Passengers</h4>
            <p className="text-sm text-muted-foreground">
              Set the number of passengers.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="adults">Adult</Label>
              <Counter
                name="adults"
                value={who.adults}
                min={0}
                max={5}
                onChange={handlePassengerChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="children">Child</Label>
              <Counter
                name="children"
                value={who.children}
                min={0}
                max={5}
                onChange={handlePassengerChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="infants">Infant</Label>
              <Counter
                name="infants"
                value={who.infants}
                min={0}
                max={5}
                onChange={handlePassengerChange}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
