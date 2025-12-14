import React from "react";
import { Checkbox, TableCell } from "@/components/ui";
import { OrderTableFoodsHover } from "./OrderTableFoodsHover";
import { OrderType } from "@/lib/types";

export const OrderTableCellOthers = ({
  order,
  checkedOrders,
  handleCheckedBox,
  i,
}: {
  order: OrderType;
  checkedOrders: string[];
  handleCheckedBox: (orderId: string) => void;
  i: number;
}) => {
  return (
    <>
      <TableCell className="p-4">
        <Checkbox
          id={order._id}
          checked={checkedOrders.includes(order._id)}
          onCheckedChange={() => handleCheckedBox(order._id)}
          className="border-primary"
        />
      </TableCell>

      <TableCell className="p-4 text-foreground">{i + 1}</TableCell>

      <TableCell className="p-4">{order.userId?.email}</TableCell>

      <TableCell className="p-4">
        <OrderTableFoodsHover order={order} />
      </TableCell>

      <TableCell className="p-4">
        {order.createdAt?.toLocaleString().split("T")[0]}
      </TableCell>

      <TableCell className="p-4">${order.totalPrice}</TableCell>

      <TableCell className="w-[213.5px] py-3 px-4 whitespace-normal text-xs leading-4">
        <div className="line-clamp-2">{order.userId?.address}</div>
      </TableCell>
    </>
  );
};
