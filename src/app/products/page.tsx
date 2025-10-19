"use client";
import React, { useEffect, useState } from "react";
import {
  AdminLayout,
  CreateCategoryDialog,
  CategorizedFoods,
  PrintCategoryDialog,
} from "@/app/_components";
import { CategoryType, NewFoodType } from "@/lib/types";
import { Badge, Button } from "@/components/ui";

const ProductsPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [foods, setFoods] = useState<NewFoodType[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

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

  const handleDisplayAllFoods = () => {};

  const handleFilteredFoodsByCategories = (cateId: string) => {
    setSelectedCategoryId(cateId);
    console.log(selectedCategoryId);
  };

  return (
    <AdminLayout>
      <div className="h-100vh pl-6 pr-10 bg-secondary flex flex-col gap-6">
        <div className="p-6 bg-background rounded-xl">
          <p className="text-xl leading-7 font-semibold text-foreground w-full mb-4">
            Dishes category
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleDisplayAllFoods} // all dish darahad buh hool haragdah
              variant={"outline"}
              className="rounded-full px-4 py-2 leading-5 text-secondary-foreground"
            >
              All Dishes
              <Badge className="rounded-full px-2.5 leading-4 font-semibold">
                {foods.length}
              </Badge>
            </Button>

            {categories.map((category) => (
              <Button
                onClick={() => handleFilteredFoodsByCategories(category._id)}
                key={category._id}
                type="button"
                variant={"outline"}
                className="rounded-full px-4 py-2"
              >
                <PrintCategoryDialog
                  key={category._id}
                  category={category}
                  refetchGetCategories={() => getCategories()}
                  selectedCategoryId={selectedCategoryId}
                  foods={foods}
                />
              </Button>
            ))}
            <CreateCategoryDialog
              refetchGetCategories={() => getCategories()}
            />
          </div>
        </div>

        {selectedCategoryId
          ? categories.length > 0 &&
            categories.map(
              (category) =>
                category._id === selectedCategoryId && (
                  <CategorizedFoods
                    key={category._id}
                    refetchGetNewFoods={() => getNewFoods()}
                    foods={foods.filter(
                      (food) => food.categoryId?._id === category._id
                    )}
                    category={category}
                    categories={categories}
                  />
                )
            )
          : categories.length > 0 &&
            categories.map((category) => {
              return (
                <CategorizedFoods
                  key={category._id}
                  refetchGetNewFoods={() => getNewFoods()}
                  foods={foods.filter(
                    (food) => food.categoryId?._id === category._id
                  )}
                  category={category}
                  categories={categories}
                />
              );
            })}
      </div>
    </AdminLayout>
  );
};
export default ProductsPage;
