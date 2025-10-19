"use client";
import React from "react";
import { Badge } from "@/components/ui";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { CategoryType, NewFoodType } from "@/lib/types";

export const PrintCategoryDialog = ({
  category,
  refetchGetCategories,
  foods,
  selectedCategoryId,
}: {
  category: CategoryType;
  refetchGetCategories: () => Promise<void>;
  foods: NewFoodType[];
  selectedCategoryId: string;
}) => {
  return (
    <div className="flex gap-2 items-center leading-5 text-secondary-foreground">
      {category.categoryName}
      <Badge className="rounded-full px-2.5 leading-4 font-semibold">
        {category._id &&
          foods.filter((food) => food.categoryId?._id === category._id).length}
      </Badge>
      <DeleteCategoryDialog
        refetchGetCategories={refetchGetCategories}
        categoryId={category._id}
      />
    </div>
  );
};
