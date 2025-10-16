import React from "react";
import { IoCloseOutline } from "react-icons/io5";

export const DeleteCategoryDialog = ({
  refetchGetCategories,
  categoryId,
}: {
  refetchGetCategories: () => Promise<void>;
  categoryId: string;
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

        const resultText = await response.text();
        console.log(`Delete successful, ${resultText}`);
        await refetchGetCategories();
      } catch (error) {
        console.error("Network or unexpected error:", error);
      }
    }
  };

  return (
    <div onClick={() => deleteCategoryHandler(categoryId)}>
      <IoCloseOutline />
    </div>
  );
};
