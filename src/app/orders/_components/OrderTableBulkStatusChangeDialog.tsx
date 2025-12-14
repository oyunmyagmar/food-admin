"use client";

import React, { Dispatch } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components/ui";

export const OrderTableBulkStatusChangeDialog = ({
  openChangeState,
  setOpenChangeState,
  foodOrderStatuses,
  bulkStatus,
  setBulkStatus,
  handleChangeBulkStatus,
}: {
  openChangeState: boolean;
  setOpenChangeState: Dispatch<React.SetStateAction<boolean>>;
  foodOrderStatuses: string[];
  bulkStatus: string | null;
  setBulkStatus: Dispatch<React.SetStateAction<string | null>>;
  handleChangeBulkStatus: () => Promise<void>;
}) => {
  return (
    <AlertDialog open={openChangeState} onOpenChange={setOpenChangeState}>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full cursor-pointer">
          Change delivery state
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-91">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex justify-between items-center">
            <div>Change delivery state</div>
            <Button
              variant={"secondary"}
              onClick={() => setOpenChangeState(false)}
              className="rounded-full cursor-pointer"
            >
              x
            </Button>
          </AlertDialogTitle>
          <AlertDialogDescription hidden />
        </AlertDialogHeader>

        <div className="w-full flex justify-between">
          {foodOrderStatuses.map((status) => (
            <Button
              key={status}
              onClick={() => setBulkStatus(status)}
              size={"sm"}
              variant={"secondary"}
              className={`rounded-full cursor-pointer text-gray-500 ${
                bulkStatus === status && bulkStatus === "PENDING"
                  ? "border-red-500 hover:bg-red-500/10 text-red-500"
                  : bulkStatus === status && bulkStatus === "CANCELED"
                  ? "border-border hover:bg-border/20 text-primary"
                  : bulkStatus === status && bulkStatus === "DELIVERED"
                  ? "border-green-500 hover:bg-green-500/10 text-green-500"
                  : ""
              }`}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </Button>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleChangeBulkStatus}
            className="w-full rounded-full cursor-pointer"
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
