import React from "react";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui";
import { CategoryType } from "@/lib/types";

export const AddNewFoodHeader = ({ category }: { category: CategoryType }) => {
  return (
    <DialogHeader className="gap-0">
      <DialogTitle className="flex gap-2.5 items-center mb-4">
        <div className="flex-1 leading-7 text-foreground">
          Add new Dish to {category.categoryName}
        </div>
      </DialogTitle>
      <DialogDescription />
    </DialogHeader>
  );
};
