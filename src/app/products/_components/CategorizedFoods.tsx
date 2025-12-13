import React from "react";
import Image from "next/image";
import { CategoryType, NewFoodType } from "@/lib/types";
import {
  AddNewFoodDialog,
  EditNewFoodDialog,
} from "@/app/products/_components";

export const CategorizedFoods = ({
  refetchGetNewFoods,
  foods,
  category,
  categories,
}: {
  refetchGetNewFoods: () => Promise<void>;
  foods: NewFoodType[];
  category: CategoryType;
  categories: CategoryType[];
}) => {
  return (
    <div className="p-5 bg-background rounded-xl flex flex-wrap gap-4">
      <div className="w-full text-xl leading-7 font-semibold text-foreground flex gap-2">
        <div>{category.categoryName}</div>
        <div>{foods.length > 0 && foods.length}</div>
      </div>

      <AddNewFoodDialog
        category={category}
        refetchGetNewFoods={refetchGetNewFoods}
      />

      {foods.map((food) => (
        <div
          key={food._id}
          className="w-[270.75px] p-4 border border-border rounded-[20px] flex flex-col gap-5"
        >
          <div className="w-full h-[129px] rounded-xl relative overflow-hidden">
            {food.image ? (
              <Image
                src={food.image}
                alt="imagePreview"
                width={270.75}
                height={129}
                className="object-cover w-full h-full"
                unoptimized
              />
            ) : (
              ""
            )}
            <EditNewFoodDialog
              food={food}
              refetchGetNewFoods={refetchGetNewFoods}
              categories={categories}
              category={category}
            />
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
