import React from "react";
import { Badge, Button } from "@/components/ui";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { CategoryType } from "@/lib/types";

export const PrintCategoryDialog = ({
  category,
  refetchGetCategories,
}: {
  category: CategoryType;
  refetchGetCategories: () => Promise<void>;
}) => {
  return (
    <Button
      key={category._id}
      type="button"
      variant={"outline"}
      className="rounded-full px-4 py-2"
    >
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
    </Button>
  );
};
