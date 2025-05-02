// components/DistrictSelector.tsx
import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface DistrictSelectorProps {
  selectedDistrictId: string | number | null;
  onDistrictSelect: (districtId: string | number) => void;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({ 
  selectedCityId,
  selectedDistrictId,
  onDistrictSelect,
 }) => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (selectedCityId) {
      setLoading(true);
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(
            `https://nzl-backend.com/api/districts?city_id=${selectedCityId}`
          );
          setDistricts(response.data.data);
        } catch (error) {
          console.error("Error fetching districts:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedCityId]);


  const selectedDistrict = districts.find(district => district.id === selectedDistrictId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full] justify-between text-black"
        >
          {selectedDistrict ? selectedDistrict.name_ar : "اختر المنطقة"}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-full] p-0">
        <Command>
          <CommandInput placeholder="ابحث عن منطقة..." />
          <CommandList className="text-black max-h-[200px] overflow-y-auto">
            {districts.map((district) => (
              <CommandItem
                key={district.id}
                onSelect={() => {
                  onDistrictSelect(district.id);
                  setOpen(false);
                }}
                className="text-black"
              >
                {district.name_ar}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DistrictSelector;