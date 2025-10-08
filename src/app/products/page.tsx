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
        <CreateCategoryDialog />
        <CreateFoodDialog />
      </div>
    </AdminLayout>
  );
};
export default ProductsPage;
