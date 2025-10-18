"use client";
import React, { useState } from "react";
import { Badge, Button } from "@/components/ui";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { CategoryType, NewFoodType } from "@/lib/types";
import { CategorizedFoods } from "./CategorizedFoods";

export const PrintCategoryDialog = ({
  category,
  refetchGetCategories,
}: {
  category: CategoryType;
  refetchGetCategories: () => Promise<void>;
}) => {
  return (
    <div className="flex gap-2 items-center leading-5 text-secondary-foreground">
      {category.categoryName}
      <Badge className="rounded-full px-2.5 leading-4 font-semibold">
        {10}
      </Badge>
      <DeleteCategoryDialog
        refetchGetCategories={refetchGetCategories}
        categoryId={category._id}
      />
    </div>
  );
};
