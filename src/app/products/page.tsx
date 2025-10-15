"use client";
import React, { useEffect, useState } from "react";
import {
  AdminLayout,
  CreateFoodDialog,
  CreateCategoryDialog,
  AddNewFoodDialog,
  EditNewFoodDialog,
} from "@/app/_components";
import { CategoryType, NewFoodType } from "../_components/types";
import Image from "next/image";

const ProductsPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<NewFoodType[]>([]);

  const getCategories = async () => {
    const res = await fetch("http://localhost:4000/api/categories");
    const resData = await res.json();
    const { data } = resData;

    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const getNewFoods = async () => {
    const res = await fetch("http://localhost:4000/api/newfoods");
    const resData = await res.json();
    const { data } = resData;

    setFoods(data);
  };
  useEffect(() => {
    getNewFoods();
  }, []);

  return (
    <AdminLayout>
      <div className="h-100vh pl-6 pr-10 bg-secondary flex flex-col gap-6">
        <div className="p-6 bg-background rounded-xl">
          <p className="text-xl leading-7 font-semibold text-foreground w-full mb-4">
            Dishes category
          </p>
          <CreateCategoryDialog />
        </div>

        {categories.map((category) => (
          <div
            key={category._id}
            className="p-5 bg-background rounded-xl flex flex-wrap gap-4"
          >
            <div className="w-full text-xl leading-7 font-semibold text-foreground mr-2">
              {category.name} <span>(6)</span>
            </div>
            <CreateFoodDialog
              categoryId={category._id}
              categoryName={category.name}
            />
          </div>
        ))}

        {/* add card initially foodCategory select-tei */}
        <div className="p-5 bg-red-100 rounded-xl flex flex-wrap gap-4">
          <AddNewFoodDialog categories={categories} />

          {/* {foods.map((food) => (
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
          ))} */}
        </div>
      </div>
    </AdminLayout>
  );
};
export default ProductsPage;
