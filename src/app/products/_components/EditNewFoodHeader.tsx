import React from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui";

export const EditNewFoodHeader = () => {
  return (
    <DialogHeader className="gap-0">
      <DialogTitle className="flex gap-2.5 items-center">
        <p className="flex-1 leading-7 text-foreground">Dishes info</p>
      </DialogTitle>
      <DialogDescription className="hidden" />
    </DialogHeader>
  );
};
