import React from "react";
import Image from "next/image";
import { CategoryType, NewFoodType } from "./types";
import { EditNewFoodDialog } from "./EditNewFoodDialog";

export const PrintNewFoodCards = ({
  foods,
  getNewFoods,
  categories,
}: {
  foods: NewFoodType[];
  getNewFoods: Function;
  categories: CategoryType[];
}) => {
  return (
    <div>
      {foods.map((food) => (
        <div className="w-[270.75px] p-4 border border-border rounded-[20px] flex flex-col gap-5">
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
            <EditNewFoodDialog
              foodTitle={food.name}
              foodPrice={food.price}
              foodIngredients={food.ingredients}
              foodImage={food.image}
              foodId={food._id}
              getNewFoods={getNewFoods}
              categories={categories}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <div className="text-sm leading-5 font-medium text-red-500 flex-1 items-center">
                {food.name}
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
