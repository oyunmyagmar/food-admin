"use client";

import { useEffect, useState } from "react";
import { OrderType } from "@/lib/types";

export const useOrder = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const getOrders = async () => {
    const res = await fetch("https://food-next-backend.vercel.app/api/orders");
    const { data } = await res.json();

    setOrders(data);
  };
  useEffect(() => {
    getOrders();
  }, []);

  return { orders, refetchGetOrders: getOrders };
};
