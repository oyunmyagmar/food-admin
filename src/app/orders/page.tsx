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
} from "@/components/ui";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const OrdersPage = () => {
  let foodOrderStatuses = [
    { value: "PENDING", label: "PENDING" },
    { value: "CANCELED", label: "CANCELED" },
    { value: "DELIVERED", label: "DELIVERED" },
  ];

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  console.log(value, "SELECTEDVALUE");

  const [changedStatus, setChangedStatus] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<string>("");

  const getOrders = async () => {
    const res = await fetch("http://localhost:4000/api/orders");
    const resData = await res.json();
    const { data } = resData;
    // console.log(data, "data");

    setOrders(data);
  };
  useEffect(() => {
    getOrders();
  }, []);

  const handleCheckStatus = (statusValue: string) => {
    setChangedStatus(statusValue);
    console.log(changedStatus, "changedStatus");
  };

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

          <Table className="text-muted-foreground font-medium">
            <OrderTableHeader />

            <TableBody>
              {orders?.map((order, i) => (
                <TableRow key={order._id}>
                  <TableCell className="p-4">
                    <Checkbox
                      className="border-primary"
                      onClick={() => handleCheckStatus(value)}
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
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild className="w-32 m-0 p-0 gap-2.5">
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={`w-min-[102px] rounded-full text-foreground mx-0 px-0 font-semibold ${
                            order.status === "PENDING" && "border-red-500"
                          } ${
                            order.status === "DELIVERED" &&
                            "border-[#18BA51]/50"
                          } ${order.status === "CANCELED" && "border-border"} ${
                            value === "PENDING" && "border-red-500"
                          } ${value === "DELIVERED" && "border-[#18BA51]/50"} ${
                            value === "CANCELED" && "border-border"
                          }`}
                        >
                          {value
                            ? (() => {
                                const selected = foodOrderStatuses.find(
                                  (foodOrderStatus) =>
                                    foodOrderStatus.value === value
                                )?.label;
                                return selected
                                  ? selected.charAt(0) +
                                      selected.slice(1).toLowerCase()
                                  : "";
                              })()
                            : order.status.charAt(0) +
                              order.status.slice(1).toLowerCase()}

                          <ChevronsUpDown size={16} />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-36 p-1 border-0">
                        <Command>
                          <CommandGroup>
                            {foodOrderStatuses.map((foodOrderStatus) => (
                              <CommandItem
                                key={foodOrderStatus.value}
                                value={foodOrderStatus.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                                className="w-fit text-xs leading-4 text-primary bg-secondary rounded-full my-2 px-2.5 py-0.5"
                              >
                                {foodOrderStatus.label.charAt(0) +
                                  foodOrderStatus.label.slice(1).toLowerCase()}
                                {/* <Check
                  className={cn(
                    "ml-auto",
                    value === foodOrderStatus.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                /> */}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
