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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import { useOrder } from "../_hooks/use-order";

const OrdersPage = () => {
  const { orders, refetchGetOrders } = useOrder();
  const foodOrderStatuses = ["PENDING", "CANCELED", "DELIVERED"];

  const [checkedOrders, setCheckedOrders] = useState<string[]>([]);
  // console.log(checkedOrders);
  const [isOpenChangeState, setIsOpenChangeState] = useState<boolean>(false);

  const handleCheckedBox = (orderId: string) => {
    setCheckedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleChangeOrderStatus = () => {
    console.log(checkedOrders, "SENDING");
  };
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

              <AlertDialog
                open={isOpenChangeState}
                onOpenChange={setIsOpenChangeState}
              >
                <AlertDialogTrigger>
                  <Button className="rounded-full">
                    Change delivery state
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="w-91">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex justify-between">
                      <div>Change delivery state</div>
                      <Button
                        variant={"secondary"}
                        onClick={() => setIsOpenChangeState(false)}
                        className="rounded-full"
                      >
                        X
                      </Button>
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="w-full flex gap-4">
                    {foodOrderStatuses.map((status) => (
                      <Button variant={"secondary"} className="rounded-full">
                        {status}
                      </Button>
                    ))}
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={handleChangeOrderStatus}
                      className="w-full rounded-full"
                    >
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <Table className="text-muted-foreground font-medium">
            <OrderTableHeader />

            <TableBody>
              {orders?.map((order, i) => (
                <TableRow key={order._id}>
                  <TableCell className="p-4">
                    <Checkbox
                      id={order._id}
                      checked={checkedOrders.includes(order._id)}
                      onCheckedChange={() => handleCheckedBox(order._id)}
                      className="border-primary"
                      // onChange={() => handleCheckedBox(order._id)}
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
