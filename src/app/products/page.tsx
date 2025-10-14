"use client";
import React from "react";
import {
  AdminLayout,
  CreateFoodDialog,
  CreateCategoryDialog,
} from "@/app/_components";

const ProductsPage = () => {
  return (
    <AdminLayout>
      <div className="h-screen pl-6 pr-10 bg-secondary flex flex-col gap-6">
        <div className="p-6 bg-background rounded-xl">
          <div className="flex flex-wrap gap-3">
            <p className="text-xl leading-7 font-semibold text-foreground w-full">
              Dishes category
            </p>
          </div>
        </div>

        <CreateCategoryDialog />
        <CreateFoodDialog />
      </div>
    </AdminLayout>
  );
};
export default ProductsPage;
