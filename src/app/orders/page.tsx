"use client";
import React, { useEffect, useState } from "react";
import {
  AdminLayout,
  OrderFoodsHover,
  OrderStatus,
  OrderTableHeader,
} from "@/app/_components";
import { OrderType } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Button,
  Command,
  CommandGroup,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  let foodOrderStatuses = ["PENDING", "CANCELED", "DELIVERED"];
  const [value, setValue] = useState<string>("");
  console.log(value, "SLECTEDVALUE");

  // const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  const getOrders = async () => {
    const res = await fetch("http://localhost:4000/api/orders");
    const { data } = await res.json();
    console.log(data, "data");

    setOrders(data);
  };
  useEffect(() => {
    getOrders();
  }, []);

  // const handleCheckStatus = (orderId: string) => {
  //   setSelectedOrderId(orderId);
  //   console.log(setSelectedOrderId, "setSelectedOrderId");
  // };

  // const handleChangeOrderStatus = async () => {
  //   const response = await fetch("http://localhost:4000/api/orders", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({}),
  //   });
  // };

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
                <Button
                  // onClick={() => handleChangeOrderStatus()}
                  className="rounded-full"
                >
                  Change delivery state
                </Button>
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
                    {/* <OrderStatus orderStatus={order.status} /> */}
                    <Select value={value} onValueChange={setValue}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={order.status} />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {foodOrderStatuses.map((foodOrderStatus) => (
                            <SelectItem value={foodOrderStatus}>
                              {foodOrderStatus}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
