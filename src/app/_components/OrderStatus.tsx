"use client";
import React, { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
} from "@/components/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

let foodOrderStatuses = [
  { value: "PENDING", label: "PENDING" },
  { value: "CANCELED", label: "CANCELED" },
  { value: "DELIVERED", label: "DELIVERED" },
];

export const OrderStatus = ({ orderStatus }: { orderStatus: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  console.log(value, "SELECTEDVALUE");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-32 m-0 p-0 gap-2.5">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-min-[102px] rounded-full text-foreground mx-0 px-0 font-semibold ${
            orderStatus === "PENDING" && "border-red-500"
          } ${orderStatus === "DELIVERED" && "border-[#18BA51]/50"} ${
            orderStatus === "CANCELED" && "border-border"
          } ${value === "PENDING" && "border-red-500"} ${
            value === "DELIVERED" && "border-[#18BA51]/50"
          } ${value === "CANCELED" && "border-border"}`}
        >
          {value
            ? (() => {
                const selected = foodOrderStatuses.find(
                  (foodOrderStatus) => foodOrderStatus.value === value
                )?.label;
                return selected
                  ? selected.charAt(0) + selected.slice(1).toLowerCase()
                  : "";
              })()
            : orderStatus.charAt(0) + orderStatus.slice(1).toLowerCase()}

          <ChevronsUpDown size={16} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-36 p-1 border-0">
        <Command>
          <CommandGroup>
            {foodOrderStatuses.map((foodOrderStatus) => (
              <CommandItem
                key={foodOrderStatus.value}
                value={foodOrderStatus.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
                className="w-fit text-xs leading-4 text-primary bg-secondary rounded-full my-2 px-2.5 py-0.5"
              >
                {foodOrderStatus.label.charAt(0) +
                  foodOrderStatus.label.slice(1).toLowerCase()}
                {/* <Check
                  className={cn(
                    "ml-auto",
                    value === foodOrderStatus.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                /> */}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
