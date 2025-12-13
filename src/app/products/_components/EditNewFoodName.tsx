import React from "react";
import { Input, Label } from "@/components/ui";

export const EditNewFoodName = ({
  foodName,
  foodNameChangeHandler,
}: {
  foodName: string;
  foodNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex gap-4 my-3">
      <Label
        htmlFor="editedFoodName"
        className="w-30 text-xs leading-4 font-normal text-muted-foreground items-start"
      >
        Dish name
      </Label>
      <Input
        id="editedFoodName"
        name="editedFoodName"
        type="text"
        className="text-sm leading-5 py-2"
        defaultValue={foodName}
        onChange={foodNameChangeHandler}
      />
    </div>
  );
};
