import React from "react";
import { Input, Label, Textarea } from "@/components/ui";

export const EditNewFoodInputIngredientsAndPrice = ({
  foodIngredients,
  foodPrice,
  ingredientsChangeHandler,
  priceChangeHandler,
}: {
  foodIngredients: string;
  foodPrice: number;
  ingredientsChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  priceChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <div className="flex gap-4 my-3">
        <Label
          htmlFor="ingredients"
          className="w-30 text-xs leading-4 font-normal text-muted-foreground items-start"
        >
          Ingredients
        </Label>
        <Textarea
          id="ingredients"
          name="ingredients"
          className="text-sm leading-5 h-20"
          defaultValue={foodIngredients}
          onChange={ingredientsChangeHandler}
        />
      </div>
      <div className="flex gap-4 my-3">
        <Label
          htmlFor="price"
          className="w-30 text-xs leading-4 font-normal text-muted-foreground items-start"
        >
          Price
        </Label>
        <Input
          id="price"
          name="price"
          type="number"
          className="text-sm leading-5 py-2"
          defaultValue={foodPrice}
          onChange={priceChangeHandler}
        />
      </div>
    </div>
  );
};
