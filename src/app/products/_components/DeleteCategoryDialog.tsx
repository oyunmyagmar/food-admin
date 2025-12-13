"use client";

import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "sonner";

export const DeleteCategoryDialog = ({
  refetchGetCategories,
  categoryId,
  setSelectedCategoryId,
}: {
  refetchGetCategories: () => Promise<void>;
  categoryId: string;
  setSelectedCategoryId: (selectedCategoryId: string) => void;
}) => {
  const deleteCategoryHandler = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/categories/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Delete failed with status ${response.status}: ${errorText}`
          );
          return;
        }

        toast.success("Category deleted successfully!");
        await refetchGetCategories();
        setSelectedCategoryId("");
      } catch (error) {
        console.error("Network or unexpected error:", error);
      }
    }
  };

  return (
    <div onClick={() => deleteCategoryHandler(categoryId)}>
      <IoCloseOutline size={16} />
    </div>
  );
};
