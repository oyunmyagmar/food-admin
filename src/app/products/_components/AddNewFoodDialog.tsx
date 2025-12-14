"use client";

import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Textarea,
  Label,
} from "@/components/ui";
import { IoAddOutline } from "react-icons/io5";
import { CategoryType } from "@/lib/types";
import { toast } from "sonner";
import {
  AddNewFoodBtn,
  AddNewFoodHeader,
  AddNewFoodInputImage,
  AddNewFoodNameAndPrice,
} from "@/app/products/_components";

export const AddNewFoodDialog = ({
  category,
  refetchGetNewFoods,
}: {
  category: CategoryType;
  refetchGetNewFoods: () => Promise<void>;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [foodName, setFoodName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [ingredients, setIngredients] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const addFoodHandler = async () => {
    if (!foodName || !price || !ingredients || !image) {
      toast.warning("All fields are required!");
      return;
    }

    setLoading(true);
    const newForm = new FormData();

    newForm.append("foodName", foodName);
    newForm.append("price", String(price));
    newForm.append("categoryId", category._id);
    newForm.append("ingredients", ingredients);
    newForm.append("image", image); // File object

    await fetch("https://food-next-backend.vercel.app/api/newfoods", {
      method: "POST",
      body: newForm,
    });

    await refetchGetNewFoods();
    toast.success("New dish added to the menu!");
    setFoodName("");
    setPrice(0);
    setIngredients("");
    setImage(undefined);
    setIsOpen(false);
    setLoading(false);
  };

  const foodNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFoodName(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const ingredientsChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIngredients(e.target.value);
  };
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      const filePreview = URL.createObjectURL(e.target.files[0]);
      setImagePreview(filePreview);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="cursor-pointer w-[270.75px] h-[241px] py-2 px-4 border border-dashed border-red-500 flex flex-col items-center justify-center gap-6 rounded-[20px]"
          onClick={() => setIsOpen(true)}
        >
          <Button
            type="button"
            variant="destructive"
            className="w-10 h-10 rounded-full bg-red-500 cursor-pointer"
          >
            <IoAddOutline size={16} />
          </Button>
          <div className="w-[154px] text-center text-sm leading-5 font-medium text-secondary-foreground">
            Add new Dish to {category.categoryName}
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="w-115 gap-6 rounded-xl">
        <AddNewFoodHeader category={category} />

        <AddNewFoodNameAndPrice
          foodName={foodName}
          foodNameChangeHandler={foodNameChangeHandler}
          price={price}
          priceChangeHandler={priceChangeHandler}
        />

        <div className="flex flex-col gap-2">
          <Label htmlFor="ingredients" className="text-foreground">
            Ingredients
          </Label>
          <Textarea
            id="ingredients"
            name="ingredients"
            placeholder="List ingredients..."
            className="text-sm leading-5 h-[90px]"
            value={ingredients}
            onChange={ingredientsChangeHandler}
          />
        </div>

        <AddNewFoodInputImage
          image={image}
          imagePreview={imagePreview}
          setImage={setImage}
          fileChangeHandler={fileChangeHandler}
        />

        <AddNewFoodBtn loading={loading} addFoodHandler={addFoodHandler} />
      </DialogContent>
    </Dialog>
  );
};
