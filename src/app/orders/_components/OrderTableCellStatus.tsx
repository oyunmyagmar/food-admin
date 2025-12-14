import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TableCell,
} from "@/components/ui";
import { OrderType } from "@/lib/types";

export const OrderTableCellStatus = ({
  order,
  foodOrderStatuses,
  handleChangeSingleStatus,
}: {
  order: OrderType;
  foodOrderStatuses: string[];
  handleChangeSingleStatus: (
    orderId: string,
    newStatus: string
  ) => Promise<void>;
}) => {
  return (
    <TableCell className="py-3 px-4">
      <Select
        value={order.status}
        onValueChange={(newStatus) =>
          handleChangeSingleStatus(order._id, newStatus)
        }
      >
        <SelectTrigger
          className={`w-full rounded-full text-xs leading-4 font-semibold text-primary ${
            order.status === "PENDING"
              ? "border-red-500"
              : order.status === "CANCELED"
              ? "border-border"
              : order.status === "DELIVERED"
              ? "border-green-500"
              : ""
          }`}
        >
          <SelectValue placeholder={order.status} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {foodOrderStatuses.map((status) => (
              <SelectItem
                key={status}
                value={status}
                className="text-xs leading-4 font-medium text-primary"
              >
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </TableCell>
  );
};
