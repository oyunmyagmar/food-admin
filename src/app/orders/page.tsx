"use client";

import React, { useState } from "react";
import { Table, TableBody, TableRow } from "@/components/ui";
import { useOrder } from "../_hooks/use-order";
import { toast } from "sonner";
import { AdminLayout } from "../_components";
import {
  OrderTableBulkStatusChangeDialog,
  OrderTableCellOthers,
  OrderTableCellStatus,
  OrderTableHeader,
} from "@/app/orders/_components";

const OrdersPage = () => {
  const { orders, refetchGetOrders } = useOrder();
  const foodOrderStatuses = ["PENDING", "CANCELED", "DELIVERED"];
  const [checkedOrders, setCheckedOrders] = useState<string[]>([]);
  const [openChangeState, setOpenChangeState] = useState<boolean>(false);
  const [bulkStatus, setBulkStatus] = useState<string | null>(null);

  const handleChangeSingleStatus = async (
    orderId: string,
    newStatus: string
  ) => {
    await fetch("https://food-next-backend.vercel.app/api/orders/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, newStatus }),
    });
    await refetchGetOrders();
  };

  const handleCheckedBox = (orderId: string) => {
    setCheckedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleChangeBulkStatus = async () => {
    if (!bulkStatus || checkedOrders.length === 0) {
      toast.warning("Select orders or statu!s");
    }

    await fetch("https://food-next-backend.vercel.app/api/orders/bulk-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ordersId: checkedOrders,
        newStatus: bulkStatus,
      }),
    });

    setCheckedOrders([]);
    setBulkStatus(null);
    setOpenChangeState(false);
    await refetchGetOrders();
  };
  return (
    <AdminLayout>
      <div className="w-[1171px] h-100vh ml-6 mr-10 bg-secondary flex flex-col">
        <div className="w-full h-fit rounded-lg bg-background border border-border">
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

              <OrderTableBulkStatusChangeDialog
                openChangeState={openChangeState}
                setOpenChangeState={setOpenChangeState}
                foodOrderStatuses={foodOrderStatuses}
                bulkStatus={bulkStatus}
                setBulkStatus={setBulkStatus}
                handleChangeBulkStatus={handleChangeBulkStatus}
              />
            </div>
          </div>

          <Table className="text-muted-foreground font-medium">
            <OrderTableHeader />

            <TableBody>
              {orders?.map((order, i) => (
                <TableRow key={order._id}>
                  <OrderTableCellOthers
                    order={order}
                    checkedOrders={checkedOrders}
                    handleCheckedBox={handleCheckedBox}
                    i={i}
                  />

                  <OrderTableCellStatus
                    order={order}
                    foodOrderStatuses={foodOrderStatuses}
                    handleChangeSingleStatus={handleChangeSingleStatus}
                  />
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
