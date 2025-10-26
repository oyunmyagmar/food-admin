"use client";
import React, { useEffect, useState } from "react";
import { AdminLayout, OrderStatus } from "@/app/_components";
import { OrderType, UserType } from "@/lib/types";
import {
  Table,
  TableBody,
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
      <div className="w-[1171px] h-100vh ml-6 mr-10 bg-secondary flex flex-col">
        <div className="w-full h-500 rounded-lg bg-background">
          <div className="flex justify-between items-center p-4">
            <div>
              <div className="text-xl leading-7 font-bold text-foreground">
                Orders
              </div>
              <div className="text-xs leading-4 font-medium text-muted-foreground">
                {orders.length} items
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div>Date picker from to</div>
              <div>
                <Button className="rounded-full">Change delivery state</Button>
              </div>
            </div>
          </div>

          <Table>
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
                        {order.foodOrderItems?.map((foodOrderItem) => (
                          <SelectItem
                            key={foodOrderItem.food._id}
                            value={foodOrderItem.food.foodName}
                          >
                            {foodOrderItem.food.foodName}
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

                  <TableCell>
                    <OrderStatus order={order} orderStatus={order.status} />
                  </TableCell>
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
