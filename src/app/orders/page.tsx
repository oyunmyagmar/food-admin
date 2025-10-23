"use client";
import React, { useEffect, useState } from "react";
import { AdminLayout } from "../_components";
import { OrderType } from "@/lib/types";

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  const getOrders = async () => {
    const res = await fetch("http://localhost:4000/api/orders");
    const resData = await res.json();
    const { data } = resData;

    console.log(data, "data");

    setOrders(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <AdminLayout>
      <div className="w-full h-10 bg-amber-100">
        {orders.map((order) => order.totalPrice)}
      </div>
    </AdminLayout>
  );
};
export default OrdersPage;
