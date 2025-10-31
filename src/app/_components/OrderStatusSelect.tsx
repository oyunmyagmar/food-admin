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
  console.log(value, "SELECTEDstatusVALUE");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={order.status} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
