import React from "react";
import { LuTrash } from "react-icons/lu";
import { Button, DialogFooter } from "@/components/ui";

export const EditNewFoodDeleteAndEditBtn = ({
  loading,
  deleteFoodHandler,
  foodId,
  isLoading,
  saveChangeHandler,
}: {
  loading: boolean;
  deleteFoodHandler: (foodId: string) => Promise<void>;
  foodId: string;
  isLoading: boolean;
  saveChangeHandler: () => Promise<void>;
}) => {
  return (
    <DialogFooter className="mt-6">
      <div className="w-full flex justify-between items-center">
        <Button
          type="button"
          size={"lg"}
          variant="outline"
          disabled={loading}
          onClick={() => deleteFoodHandler(foodId)}
          className="border-destructive cursor-pointer"
        >
          <LuTrash size={16} className="text-destructive" />
        </Button>

        <Button
          type="button"
          size={"lg"}
          disabled={isLoading}
          onClick={saveChangeHandler}
          className="w-fit leading-5 py-2.5 px-4 cursor-pointer"
        >
          Save changes
        </Button>
      </div>
    </DialogFooter>
  );
};
