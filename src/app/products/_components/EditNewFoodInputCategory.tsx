import React from "react";
import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { CategoryType } from "@/lib/types";

export const EditNewFoodInputCategory = ({
  categories,
  categoryChangeHandler,
  editedCategorySelected,
}: {
  categories: CategoryType[];
  categoryChangeHandler: (value: string) => void;
  editedCategorySelected: string;
}) => {
  return (
    <div className="flex gap-4 my-3">
      <Label
        htmlFor="editedCategorySelected"
        className="w-30 text-xs leading-4 font-normal text-muted-foreground items-start"
      >
        Dish category
      </Label>
      <Select
        onValueChange={categoryChangeHandler}
        name="editedCategorySelected"
        defaultValue={editedCategorySelected}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" className="leading-5" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-primary font-medium py-0.5 my-2">
              All Dishes
            </SelectLabel>

            {categories.map((category) => (
              <SelectItem
                value={category._id}
                key={category._id}
                id="editedCategorySelected"
                className="text-xs text-primary font-medium py-0.5 my-2 rounded-full"
              >
                {category.categoryName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
