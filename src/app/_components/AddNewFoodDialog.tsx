"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Input,
  Textarea,
  Label,
} from "@/components/ui";
import Image from "next/image";
import { LuImage } from "react-icons/lu";
import { IoCloseOutline, IoAddOutline } from "react-icons/io5";
import { CategoryType } from "@/lib/types";

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

  const addFoodHandler = async () => {
    if (!foodName || !price || !ingredients || !image) {
      alert("All fields are required!");
      return;
    }

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
    alert("New dish is being added to the menu!");
    setFoodName("");
    setPrice(0);
    setIngredients("");
    setImage(undefined);
    setIsOpen(false);
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
            className="w-10 h-10 rounded-full bg-red-500"
          >
            <IoAddOutline size={16} />
          </Button>
          <p className="w-[154px] text-center text-sm leading-5 font-medium text-secondary-foreground">
            Add new Dish to {category.categoryName}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="w-115 gap-6 rounded-xl">
        <DialogHeader className="gap-0">
          <DialogTitle className="flex gap-2.5 items-center mb-4">
            <p className="flex-1 leading-7 text-foreground">
              Add new Dish to {category.categoryName}
            </p>
            <Button
              type="button"
              variant="secondary"
              className="w-9 h-9 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <IoCloseOutline size={16} />
            </Button>
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <div className="flex gap-6">
          <div className="w-1/2 flex flex-col gap-2">
            <Label htmlFor="foodName" className="text-foreground">
              Food name
            </Label>
            <Input
              id="foodName"
              name="foodName"
              type="text"
              placeholder="Type food name"
              className="text-sm leading-5 py-2"
              value={foodName}
              onChange={foodNameChangeHandler}
            />
          </div>

          <div className="w-1/2 flex flex-col gap-2">
            <Label htmlFor="price" className="text-foreground">
              Food price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price..."
              className="text-sm leading-5 py-2"
              value={price}
              onChange={priceChangeHandler}
            />
          </div>
        </div>

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

        <div className="flex flex-col gap-2">
          <Label htmlFor="image" className="text-foreground">
            Food image
          </Label>
          {image ? (
            <div className="w-103 h-[138px] rounded-md relative overflow-hidden">
              <Image
                src={imagePreview}
                alt="imagePreview"
                width={412}
                height={138}
                className="object-cover w-full h-full"
                unoptimized
              />
              <Button
                type="button"
                variant="outline"
                className="absolute w-9 h-9 rounded-full right-2 top-2"
                onClick={() => {
                  setImage(undefined);
                }}
              >
                <IoCloseOutline size={16} />
              </Button>
            </div>
          ) : (
            <div className="w-full h-[138px] bg-[#2563EB]/5 flex justify-center items-center p-4 rounded-md border border-dashed border-[#2563EB]/20 relative">
              <input
                id="image"
                name="image"
                type="file"
                className="absolute inset-0 opacity-0"
                onChange={fileChangeHandler}
              />
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-background flex justify-center items-center">
                  <LuImage size={16} />
                </div>
                <p className="text-sm leading-5 font-medium text-primary">
                  Choose a file or drag & drop it here
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button
            type="button"
            size={"lg"}
            className="w-fit leading-5 px-4"
            onClick={addFoodHandler}
          >
            Add Dish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
