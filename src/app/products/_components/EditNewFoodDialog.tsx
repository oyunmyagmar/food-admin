"use client";

import React, { ChangeEvent, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui";
import { CategoryType, NewFoodType } from "@/lib/types";
import { toast } from "sonner";
import {
  EditNewFoodDeleteAndEditBtn,
  EditNewFoodDialogTrigger,
  EditNewFoodHeader,
  EditNewFoodInputCategory,
  EditNewFoodInputImage,
  EditNewFoodInputIngredientsAndPrice,
  EditNewFoodName,
} from "@/app/products/_components";

export const EditNewFoodDialog = ({
  food,
  refetchGetNewFoods,
  categories,
  category,
}: {
  food: NewFoodType;
  refetchGetNewFoods: () => Promise<void>;
  categories: CategoryType[];
  category: CategoryType;
}) => {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [editedImagePreview, setEditedImagePreview] = useState<string>(
    food.image
  );
  const [editedFoodName, setEditedFoodName] = useState<string>(food.foodName);
  const [editedCategorySelected, setEditedCategorySelected] = useState<string>(
    category._id
  );
  const [editedIngredients, setEditedIngredients] = useState<string>(
    food.ingredients
  );
  const [editedPrice, setEditedPrice] = useState<number>(food.price);
  const [editedImage, setEditedImage] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const saveChangeHandler = async () => {
    setIsLoading(true);

    const editedForm = new FormData();

    editedForm.append("editedFoodName", editedFoodName);
    editedForm.append("editedCategorySelected", editedCategorySelected);
    editedForm.append("editedIngredients", editedIngredients);
    editedForm.append("editedPrice", String(editedPrice));
    if (editedImagePreview !== food.image && editedImage) {
      editedForm.append("editedImage", editedImage);
    } else editedForm.append("editedImage", food.image);
    editedForm.append("selectedFoodId", food._id);

    await fetch(`http://localhost:4000/api/newfoods`, {
      method: "PUT",
      body: editedForm,
    });

    await refetchGetNewFoods();
    toast.success("Dish updated successfully!");
    setEditIsOpen(false);
    setIsLoading(false);
  };

  const deleteFoodHandler = async (foodId: string) => {
    if (confirm("Are you sure you want to delete this food?")) {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:4000/api/newfoods/${foodId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          toast.error("Delete failed!");
        }

        toast.success("Dish deleted successfully!");
        await refetchGetNewFoods();
        setEditIsOpen(false);
      } catch (error) {
        console.error("Network or unexpected error:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const foodNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedFoodName(e.target.value);
  };
  const categoryChangeHandler = (value: string) => {
    setEditedCategorySelected(value);
  };
  const ingredientsChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedIngredients(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedPrice(Number(e.target.value));
  };
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!editedImagePreview) {
      if (e.target.files) {
        setEditedImage(e.target.files[0]);
        const filePreview = URL.createObjectURL(e.target.files[0]);
        setEditedImagePreview(filePreview);
      }
    }
  };

  return (
    <Dialog open={editIsOpen} onOpenChange={setEditIsOpen}>
      <EditNewFoodDialogTrigger setEditIsOpen={setEditIsOpen} />

      <DialogContent className="w-118 gap-3 rounded-xl">
        <EditNewFoodHeader />

        <div className="w-full">
          <EditNewFoodName
            foodName={food.foodName}
            foodNameChangeHandler={foodNameChangeHandler}
          />

          <EditNewFoodInputCategory
            categories={categories}
            categoryChangeHandler={categoryChangeHandler}
            editedCategorySelected={editedCategorySelected}
          />

          <EditNewFoodInputIngredientsAndPrice
            foodIngredients={food.ingredients}
            foodPrice={food.price}
            ingredientsChangeHandler={ingredientsChangeHandler}
            priceChangeHandler={priceChangeHandler}
          />

          <EditNewFoodInputImage
            editedImagePreview={editedImagePreview}
            setEditedImage={setEditedImage}
            setEditedImagePreview={setEditedImagePreview}
            fileChangeHandler={fileChangeHandler}
          />
        </div>

        <EditNewFoodDeleteAndEditBtn
          loading={loading}
          deleteFoodHandler={deleteFoodHandler}
          foodId={food._id}
          isLoading={isLoading}
          saveChangeHandler={saveChangeHandler}
        />
      </DialogContent>
    </Dialog>
  );
};
