"use client";
import React, { useEffect, useState } from "react";
import { AdminLayout } from "../_components";
import { OrderType } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

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
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox />
              </TableHead>
              <TableHead>#</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Food</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead>Delivery state</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {orders.map((order, i) => (
                <div>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{"customer"}</TableCell>{" "}
                  <TableCell>{"123@gmail.com"}</TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="foods" />
                      </SelectTrigger>
                      <SelectContent>
                        {order.foodOrderItems.map((item) => (
                          <SelectItem value="light">
                            {item.food.foodName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>
                    {order.foodOrderItems.map((item) => item.food.price)}
                  </TableCell>
                  <TableCell>{"delivery address"}</TableCell>
                  <TableCell>8</TableCell>
                </div>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};
export default OrdersPage;
