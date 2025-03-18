"use client";

import type React from "react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  label,
}) => {
  const [inputValue, setInputValue] = useState(color);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    // Only update the actual color if it's a valid hex color
    if (/^#([0-9A-F]{3}){1,2}$/i.test(e.target.value)) {
      onChange(e.target.value);
    }
  };

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
    setInputValue(newColor);
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-10 h-10 p-0 border-2"
              style={{ backgroundColor: color }}
            >
              <span className="sr-only">اختر لوناً</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <HexColorPicker color={color} onChange={handleColorChange} />
          </PopoverContent>
        </Popover>

        <Input
          value={inputValue}
          onChange={handleInputChange}
          className="w-28 font-mono"
          maxLength={7}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
