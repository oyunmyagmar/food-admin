"use client";
import React, { useState } from "react";
import { Badge, Button } from "@/components/ui";
import { useFood } from "../_hooks/use-food";
import {
  CategorizedFoods,
  CreateCategoryDialog,
  PrintCategoryDialog,
} from "@/app/products/_components";
import { AdminLayout } from "../_components";

const ProductsPage = () => {
  const { categories, foods, refetchGetCategories, refetchGetNewFoods } =
    useFood();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const handleDisplayAllFoods = () => {
    setSelectedCategoryId("");
  };

  const handleFilteredFoodsByCategories = (cateId: string) => {
    setSelectedCategoryId(cateId);
  };

  return (
    <AdminLayout>
      <div className="w-[1171px] h-screen ml-6 mr-10 bg-secondary flex flex-col gap-6">
        <div className="p-6 bg-background rounded-xl flex flex-col gap-4">
          <div className="w-full text-xl leading-7 font-semibold text-foreground">
            Dishes category
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleDisplayAllFoods}
              variant={"outline"}
              className={`rounded-full px-4 py-2 leading-5 text-secondary-foreground items-center cursor-pointer ${
                !selectedCategoryId && "border-red-500"
              }`}
            >
              All Dishes
              <Badge className="rounded-full px-2.5 leading-4 font-semibold">
                {foods.length}
              </Badge>
            </Button>

            {categories.length > 0
              ? categories.map((category) => {
                  const { categoryName, _id } = category;
                  return (
                    <Button
                      onClick={() => handleFilteredFoodsByCategories(_id)}
                      key={_id}
                      type="button"
                      variant={"outline"}
                      className={`rounded-full px-4 py-2 cursor-pointer ${
                        selectedCategoryId === _id && "border-red-500"
                      }`}
                    >
                      <PrintCategoryDialog
                        key={_id}
                        _id={_id}
                        categoryName={categoryName}
                        refetchGetCategories={() => refetchGetCategories()}
                        foods={foods}
                        setSelectedCategoryId={setSelectedCategoryId}
                      />
                    </Button>
                  );
                })
              : null}

            <CreateCategoryDialog
              refetchGetCategories={() => refetchGetCategories()}
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
                    refetchGetNewFoods={() => refetchGetNewFoods()}
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
                  refetchGetNewFoods={() => refetchGetNewFoods()}
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
