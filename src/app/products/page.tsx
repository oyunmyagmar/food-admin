"use client";
import React, { useEffect, useState } from "react";
import {
  AdminLayout,
  CreateFoodDialog,
  CreateCategoryDialog,
} from "@/app/_components";
import { CategoryType } from "../_components/types";

const ProductsPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategories = async () => {
    const res = await fetch("http://localhost:4000/api/categories");
    const resData = await res.json();
    const { data } = resData;

    setCategories(data);
  };
  useEffect(() => {
    getCategories();
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
          <div>
            <div className="p-5 bg-background rounded-xl flex flex-wrap gap-4">
              <div className="w-full text-xl leading-7 font-semibold text-foreground mr-2">
                {category.name} <span>(6)</span>
              </div>
              <CreateFoodDialog
                categoryId={category._id}
                categoryName={category.name}
              />
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};
export default ProductsPage;
