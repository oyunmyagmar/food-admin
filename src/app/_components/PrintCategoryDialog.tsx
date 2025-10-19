"use client";
import React from "react";
import { Badge } from "@/components/ui";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { NewFoodType } from "@/lib/types";

export const PrintCategoryDialog = ({
  _id,
  categoryName,
  refetchGetCategories,
  foods,
}: {
  _id: string;
  categoryName: string;
  refetchGetCategories: () => Promise<void>;
  foods: NewFoodType[];
}) => {
  const foodCoount = foods.filter(
    (food) => food.categoryId?._id === _id
  ).length;

  return (
    <div className="flex gap-2 items-center leading-5 text-secondary-foreground">
      {categoryName}
      {foodCoount > 0 && (
        <Badge className="rounded-full px-2.5 leading-4 font-semibold">
          {foodCoount}
        </Badge>
      )}

      <DeleteCategoryDialog
        refetchGetCategories={refetchGetCategories}
        categoryId={_id}
      />
    </div>
  );
};
