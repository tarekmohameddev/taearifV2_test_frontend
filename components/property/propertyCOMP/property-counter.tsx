"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface PropertyCounterProps {
  label: string;
  value: number | null | undefined;
  onChange: (value: number) => void;
}

export function PropertyCounter({
  label,
  value,
  onChange,
}: PropertyCounterProps) {
  const increment = () => {
    const currentValue = value ?? 0;
    onChange(Number(currentValue) + 1);
  };

  const decrement = () => {
    const currentValue = value ?? 0;
    onChange(Number(currentValue) > 0 ? Number(currentValue) - 1 : 0);
  };

  return (
    <div className="flex items-center border rounded-md overflow-hidden h-10">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none"
        onClick={increment}
      >
        <Plus className="h-4 w-4" />
      </Button>

      <div className="flex-1 flex items-center justify-center h-full">
        {value == null || value == undefined || !value ? (
          <span className="text-gray-500 text-xs text-center">{label}</span>
        ) : (
          <div className="flex items-center space-x-2 gap-2">
            <span className="text-gray-500 text-xs">{label}</span>
            <span className="font-medium text-black text-lg">{value}</span>
          </div>
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-none"
        onClick={decrement}
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
}
