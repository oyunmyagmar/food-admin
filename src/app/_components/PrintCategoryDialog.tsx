import React from "react";
import { Badge, Button } from "@/components/ui";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { CategoryType } from "@/lib/types";

export const PrintCategoryDialog = ({
  categories,
  getCategories,
}: {
  categories: CategoryType[];
  getCategories: Function;
}) => {
  return (
    <div>
      {categories.map((category) => (
        <Button
          key={category._id}
          type="button"
          variant={"outline"}
          className="rounded-full px-4 py-2"
        >
          <div className="flex gap-2 items-center">
            <p className="leading-5 text-secondary-foreground">
              {category.categoryName}
            </p>

            <Badge className="rounded-full px-2.5">
              <p className="leading-4 font-semibold">{100}</p>
            </Badge>

            <DeleteCategoryDialog
              getCategories={getCategories}
              categoryId={category._id}
            />
          </div>
        </Button>
      ))}
    </div>
  );
};
