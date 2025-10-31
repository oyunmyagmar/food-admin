"use client";
import React, { useState } from "react";
import {
  AdminLayout,
  OrderFoodsHover,
  OrderStatusSelect,
  OrderTableHeader,
} from "@/app/_components";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useOrder } from "../_hooks/use-order";

const OrdersPage = () => {
  const { orders, refetchGetOrders } = useOrder();
  const foodOrderStatuses = ["PENDING", "CANCELED", "DELIVERED"];
  const [value, setValue] = useState<string>("");
  console.log(value, "SLECTEDVALUE");

  return (
    <AdminLayout>
      <div className="w-[1171px] h-100vh ml-6 mr-10 bg-secondary flex flex-col">
        <div className="w-full h-500 rounded-lg bg-background border border-border">
          <div className="flex justify-between items-center p-4 border-b border-border">
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

          <Table className="text-muted-foreground font-medium">
            <OrderTableHeader />

            <TableBody>
              {orders?.map((order, i) => (
                <TableRow key={order._id}>
                  <TableCell className="p-4">
                    <Checkbox
                      className="border-primary"
                      // onChange={() => handleCheckStatus(order._id)}
                    />
                  </TableCell>
                  <TableCell className="p-4 text-foreground">{i + 1}</TableCell>
                  <TableCell className="p-4">{order.userId.email}</TableCell>
                  <TableCell className="p-4">
                    <OrderFoodsHover order={order} />
                  </TableCell>
                  <TableCell className="p-4">
                    {order.createdAt?.toLocaleString().split("T")[0]}
                  </TableCell>
                  <TableCell className="p-4">${order.totalPrice}</TableCell>
                  <TableCell className="w-[213.5px] py-3 px-4 whitespace-normal text-xs leading-4">
                    <div className="line-clamp-2">{order.userId.address}</div>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <OrderStatusSelect
                      order={order}
                      statuses={foodOrderStatuses}
                    />
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
