"use client";
import React, { useEffect, useState } from "react";
import {
  AdminLayout,
  CreateFoodDialog,
  CreateCategoryDialog,
} from "@/app/_components";

const ProductsPage = () => {
  interface FoodCategory {
    _id: string;
    name: string;
  }

  const [categories, setCategories] = useState<FoodCategory[]>([]);
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
      <div className="h-screen pl-6 pr-10 bg-secondary flex flex-col gap-6">
        <div className="p-6 bg-background rounded-xl flex flex-col gap-4">
          <p className="text-xl leading-7 font-semibold text-foreground w-full">
            Dishes category
          </p>
          <CreateCategoryDialog />
        </div>

        <div className="p-5 bg-background rounded-xl">
          {categories.map((categor) => (
            <CreateFoodDialog title={categor.name} id={categor._id} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
export default ProductsPage;
