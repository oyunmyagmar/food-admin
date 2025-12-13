import React from "react";
import { Button, DialogFooter } from "@/components/ui";

export const AddNewFoodBtn = ({
  loading,
  addFoodHandler,
}: {
  loading: boolean;
  addFoodHandler: () => Promise<void>;
}) => {
  return (
    <DialogFooter className="mt-6">
      <Button
        type="button"
        size={"lg"}
        disabled={loading}
        onClick={addFoodHandler}
        className="w-fit px-4 cursor-pointer"
      >
        Add Dish
      </Button>
    </DialogFooter>
  );
};
