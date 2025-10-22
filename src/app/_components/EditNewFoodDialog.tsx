import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui";
import { IoCloseOutline } from "react-icons/io5";
import { LuImage, LuTrash, LuPen } from "react-icons/lu";
import { CategoryType, NewFoodType } from "@/lib/types";

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

  const saveChangeHandler = async () => {
    const editedForm = new FormData();

    editedForm.append("editedFoodName", editedFoodName);
    editedForm.append("editedCategorySelected", editedCategorySelected);
    editedForm.append("editedIngredients", editedIngredients);
    editedForm.append("editedPrice", String(editedPrice));
    if (editedImagePreview !== food.image && editedImage) {
      editedForm.append("editedImage", editedImage);
    } else editedForm.append("editedImage", food.image);
    editedForm.append("selectedFoodId", food._id);

    await fetch(`https://food-next-backend.vercel.app/api/newfoods`, {
      method: "PUT",
      body: editedForm,
    });

    await refetchGetNewFoods();
    alert("Dish is being updated to the menu!");
    setEditIsOpen(false);
  };

  const deleteFoodHandler = async (foodId: string) => {
    if (confirm("Are you sure you want to delete this food?")) {
      try {
        const response = await fetch(
          `https://food-next-backend.vercel.app/api/newfoods/${foodId}`,
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
        await refetchGetNewFoods();
        setEditIsOpen(false);
      } catch (error) {
        console.error("Network or unexpected error:", error);
      }
    }
  };
  const foodNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedFoodName(e.target.value);
  };
  const categoryChangeHandler = (value: string) => {
    console.log("SELECT VALUE", value);
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
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer absolute w-11 h-11 rounded-full bottom-5 right-5"
          onClick={() => setEditIsOpen(true)}
        >
          <LuPen size={16} className="text-red-500" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-118 gap-3 rounded-xl">
        <DialogHeader className="gap-0">
          <DialogTitle className="flex gap-2.5 items-center">
            <p className="flex-1 leading-7 text-foreground">Dishes info</p>
            <Button
              variant={"secondary"}
              className="w-9 h-9 rounded-full"
              onClick={() => setEditIsOpen(false)}
            >
              <IoCloseOutline size={16} />
            </Button>
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>

        <div className="w-full">
          <div className="flex gap-4 my-3">
            <Label
              htmlFor="editedFoodName"
              className="w-30 text-xs leading-4 font-normal text-muted-foreground items-start"
            >
              Dish name
            </Label>
            <Input
              id="editedFoodName"
              name="editedFoodName"
              type="text"
              className="text-sm leading-5 py-2"
              defaultValue={food.foodName}
              onChange={foodNameChangeHandler}
            />
          </div>

          <div className="flex gap-4 my-3">
            <Label
              htmlFor="editedCategorySelected"
              className="w-30 text-xs leading-4 font-normal text-muted-foreground items-start"
            >
              Dish category
            </Label>
            <Select
              onValueChange={categoryChangeHandler}
              name="editedCategorySelected"
              defaultValue={editedCategorySelected}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Select a category"
                  className="leading-5"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-primary font-medium py-0.5 my-2">
                    All Dishes
                  </SelectLabel>

                  {categories.map((category) => (
                    <SelectItem
                      value={category._id}
                      key={category._id}
                      id="editedCategorySelected"
                      className="text-xs text-primary font-medium py-0.5 my-2 rounded-full"
                    >
                      {category.categoryName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 my-3">
            <Label
              htmlFor="ingredients"
              className="w-30 text-xs leading-4 font-normal text-muted-foreground items-start"
            >
              Ingredients
            </Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              className="text-sm leading-5 h-20"
              defaultValue={food.ingredients}
              onChange={ingredientsChangeHandler}
            />
          </div>

          <div className="flex gap-4 my-3">
            <Label
              htmlFor="price"
              className="w-30 text-xs leading-4 font-normal text-muted-foreground items-start"
            >
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              className="text-sm leading-5 py-2"
              defaultValue={food.price}
              onChange={priceChangeHandler}
            />
          </div>

          <div className="flex gap-4 my-3">
            <Label
              htmlFor="image"
              className="w-30 text-xs leading-4 font-normal text-muted-foreground items-start"
            >
              Image
            </Label>
            {editedImagePreview ? (
              <div className="w-full h-29 rounded-md relative overflow-hidden">
                <Image
                  src={editedImagePreview}
                  alt="imagePreview"
                  width={288}
                  height={116}
                  className="object-cover w-full h-full"
                  unoptimized
                />
                <Button
                  type="button"
                  variant="outline"
                  className="absolute w-9 h-9 rounded-full right-2 top-2"
                  onClick={() => {
                    setEditedImage(undefined);
                    setEditedImagePreview("");
                  }}
                >
                  <IoCloseOutline size={16} />
                </Button>
              </div>
            ) : (
              <div className="w-full h-29 bg-[#2563EB]/5 flex justify-center items-center p-4 rounded-md border border-dashed border-[#2563EB]/20 relative">
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
        </div>

        <DialogFooter className="mt-6">
          <div className="w-full flex justify-between items-center">
            <Button
              type="button"
              size={"lg"}
              variant="outline"
              className="border-destructive"
              onClick={() => deleteFoodHandler(food._id)}
            >
              <LuTrash size={16} className="text-destructive" />
            </Button>

            <Button
              type="button"
              size={"lg"}
              className="w-fit leading-5 py-2.5 px-4"
              onClick={saveChangeHandler}
            >
              Save changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
