"use client";

import React from "react";
import { Badge } from "@/components/ui";
import { NewFoodType } from "@/lib/types";
import { DeleteCategoryDialog } from "@/app/products/_components";

export const PrintCategoryDialog = ({
  _id,
  categoryName,
  refetchGetCategories,
  foods,
  setSelectedCategoryId,
}: {
  _id: string;
  categoryName: string;
  refetchGetCategories: () => Promise<void>;
  foods: NewFoodType[];
  setSelectedCategoryId: (selectedCategoryId: string) => void;
}) => {
  const foodCount = foods.filter((food) => food.categoryId?._id === _id).length;

  return (
    <div className="flex gap-2 items-center leading-5 text-secondary-foreground">
      <div>{categoryName}</div>

      <div>
        {foodCount > 0 && (
          <Badge className="rounded-full px-2.5 leading-4 font-semibold">
            {foodCount}
          </Badge>
        )}
      </div>

      <DeleteCategoryDialog
        refetchGetCategories={refetchGetCategories}
        categoryId={_id}
        setSelectedCategoryId={setSelectedCategoryId}
      />
    </div>
  );
};
