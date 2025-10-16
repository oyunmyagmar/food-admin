import React from "react";
import Image from "next/image";
import { AddNewFoodDialog, EditNewFoodDialog } from "@/app/_components";
import { CategoryType, NewFoodType } from "@/lib/types";

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
    <div>
      <div className="p-5 bg-background rounded-xl flex flex-wrap gap-4">
        <div className="w-full text-xl leading-7 font-semibold text-foreground">
          {category.categoryName}
          <span className="ml-2">{foods.length}</span>
        </div>
        <AddNewFoodDialog
          categoryId={category._id}
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
    </div>
  );
};
