import React from "react";
import Image from "next/image";
import { EditFoodDialog } from "./EditFoodDialog";

interface Food {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category?: string;
  createdAt?: Date;
  updated?: Date;
}

export const PrintFoodCards = ({
  foods,
  getFoods,
}: {
  foods: Food[];
  getFoods: Function;
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {foods.map((food) => (
        <div
          key={food.foodName}
          className="w-[270.75px] p-4 border border-border rounded-[20px] flex flex-col gap-5"
        >
          <div className="w-full h-[129px] rounded-xl relative overflow-hidden">
            {food.image ? (
              <Image
                src={food.image}
                alt="imagePreview"
                width={270.75}
                height={129}
                objectFit="cover"
                unoptimized
              />
            ) : (
              ""
            )}
            <EditFoodDialog
              foodTitle={food.foodName}
              foodPrice={food.price}
              foodIngredients={food.ingredients}
              foodImage={food.image}
              foodId={food._id}
              getFoods={getFoods}
            ></EditFoodDialog>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <div className="text-sm leading-5 font-medium text-red-500 flex-1 items-center">
                {food.foodName}
              </div>
              <div className="text-xs leading-4 text-foreground">
                ${food.price}
              </div>
            </div>
            <div className="text-xs leading-4 text-foreground">
              {food.ingredients}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
