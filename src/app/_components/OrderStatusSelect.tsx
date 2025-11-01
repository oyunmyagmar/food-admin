"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { OrderType } from "@/lib/types";

export const OrderStatusSelect = ({
  order,
  statuses,
}: {
  order: OrderType;
  statuses: string[];
}) => {
  const [value, setValue] = useState<string>(order.status);
  // console.log(value, "SELECTEDstatusVALUE");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        className={`w-full rounded-full text-xs leading-4 font-semibold text-primary ${
          value === "PENDING" && "border-red-500"
        } ${value === "CANCELED" && "border-border"} ${
          value === "DELIVERED" && "border-[#18BA51]/50"
        }`}
      >
        <SelectValue placeholder={order.status} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem
              key={status}
              value={status}
              className="text-xs leading-4 font-medium text-primary"
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
