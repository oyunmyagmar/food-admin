import React from "react";
import { TableHead, TableHeader, TableRow, Checkbox } from "@/components/ui";
import { ChevronsUpDown } from "lucide-react";
import { LuChevronsUpDown } from "react-icons/lu";

export const OrderTableHeader = () => {
  return (
    <TableHeader className="bg-[#F4F4F5]/80">
      <TableRow>
        <TableHead className="w-12 p-4">
          <Checkbox className="border-primary" />
        </TableHead>
        <TableHead className="w-14 p-4">№</TableHead>
        <TableHead className="w-[213.5px] p-4 text-muted-foreground">
          Customer
        </TableHead>
        <TableHead className="w-40 p-4 text-muted-foreground">Food</TableHead>
        <TableHead className="w-40 p-4 text-muted-foreground">
          <div className="flex justify-between items-center">
            <div>Date</div>
            <ChevronsUpDown
              size={16}
              className="text-foreground stroke-[2px]"
            />
          </div>
        </TableHead>
        <TableHead className="w-40 p-4 text-muted-foreground">Total</TableHead>
        <TableHead className="w-[213.5px] py-3 px-4 text-muted-foreground">
          Delivery Address
        </TableHead>
        <TableHead className="w-40 py-3 px-4 text-muted-foreground">
          <div className="flex justify-between items-center">
            <div>Delivery state</div>{" "}
            <ChevronsUpDown
              size={16}
              className="text-foreground stroke-[2px]"
            />
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
