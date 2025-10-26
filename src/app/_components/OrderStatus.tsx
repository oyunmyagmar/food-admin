"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { OrderType } from "@/lib/types";

export const OrderStatus = ({
  order,
  orderStatus,
}: {
  order: OrderType;
  orderStatus: string;
}) => {
  let foodOrderStatus = ["PENDING", "CANCELED", "DELIVERED"];
  const [status, setStatus] = useState<string>(orderStatus);
  //   console.log(order._id, status, "status");

  const orderStatusChangeHandler = (value: string) => {
    setStatus(value);
  };
  return (
    <Select onValueChange={orderStatusChangeHandler}>
      <SelectTrigger
        className={`w-40 rounded-full ${
          status === "PENDING" && "border-red-500"
        } ${status === "CANCELED" && "border-border"} ${
          status === "DELIVERED" && "border-[#18BA51]/50"
        }`}
      >
        <SelectValue placeholder={orderStatus} />
      </SelectTrigger>
      <SelectContent>
        {foodOrderStatus?.map((statusItem) => (
          <SelectItem value={statusItem}>{statusItem}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
