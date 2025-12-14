"use client";

import { useEffect, useState } from "react";
import { OrderType } from "@/lib/types";

export const useOrder = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const getOrders = async () => {
    const res = await fetch("http://localhost:4000/api/orders");
    const { data } = await res.json();
    console.log(data, "data");

    setOrders(data);
  };
  useEffect(() => {
    getOrders();
  }, []);

  return { orders, refetchGetOrders: getOrders };
};
