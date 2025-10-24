"use client";
import React, { useEffect, useState } from "react";
import { AdminLayout } from "../_components";
import { OrderType, UserType } from "@/lib/types";
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
  Button,
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
      <div className="h-100vh pl-6 pr-10 bg-secondary flex flex-col">
        <div className="w-full h-500 rounded-lg bg-background">
          <div className="p-4 rounded-t-lg">
            <div>
              <div className="bg-background">Orders</div>
              <div>{orders.length}</div>
            </div>
            <div></div>
            <div>
              <Button>Change delivery state</Button>
            </div>
          </div>

          <Table>
            <TableCaption />
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableHead>#</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Food</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Delivery Address</TableHead>
                <TableHead>Delivery state</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order, i) => (
                <TableRow key={order._id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{order.userId.email}</TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`foods ${order.foodOrderItems.length}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {order.foodOrderItems?.map((item) => (
                          <SelectItem key={item.food._id} value="light">
                            {item.food.foodName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {order.createdAt?.toLocaleString().split("T")[0]}
                  </TableCell>
                  <TableCell>${order.totalPrice}</TableCell>
                  <TableCell>{order.userId.address}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};
export default OrdersPage;
