import React from "react";
import { TableHead, TableHeader, TableRow, Checkbox } from "@/components/ui";
import { ChevronsUpDown } from "lucide-react";

export const OrderTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12 p-4">
          <Checkbox className="border-primary" />
        </TableHead>
        <TableHead className="w-14 p-4">№</TableHead>
        <TableHead className="w-[213.5px] p-4 text-muted-foreground">
          Customer
        </TableHead>
        <TableHead className="w-40 p-4 text-muted-foreground">Food</TableHead>
        <TableHead className="w-40 p-4 text-muted-foreground">Date</TableHead>
        <TableHead className="w-40 p-4 text-muted-foreground">Total</TableHead>
        <TableHead className="w-[213.5px] py-3 px-4 text-muted-foreground">
          Delivery Address
        </TableHead>
        <TableHead className="w-40 py-3 px-4 text-muted-foreground">
          <div className="flex items-center justify-between">
            <div>Delivery state</div> <ChevronsUpDown size={16} />
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
