import React from 'react';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface CounterProps {
  name: string;
  value: number;
  min: number;
  max: number;
  onChange: (name: string, value: number) => void;
}

export const Counter: React.FC<CounterProps> = ({ name, value, min, max, onChange }) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(name, value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(name, value - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
      variant={"outline"}
        className=" rounded"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <span>{value}</span>
      <Button
      variant={"outline"}
        className=" rounded"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};