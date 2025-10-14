import React, { ChangeEvent, useState, useEffect } from "react";
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
import { LuPen } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { LuImage } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import { CategoryType, FoodType } from "./types";

export const EditFoodDialog = ({
  foodTitle,
  foodPrice,
  foodIngredients,
  foodImage,
  foodId,
  getFoods,
}: {
  foodTitle: string;
  foodPrice: number;
  foodIngredients: string;
  foodImage: string;
  foodId: string;
  getFoods: Function;
}) => {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(foodImage);
  const [foodNameEdited, setFoodNameEdited] = useState<string>(foodTitle);
  const [categorySelected, setCategorySelected] = useState<string>("");
  const [ingredientsEdited, setIngredientsEdited] =
    useState<string>(foodIngredients);
  const [priceEdited, setPriceEdited] = useState<number>(foodPrice);

  const [foodsEdited, setFoodsEdoted] = useState<FoodType[]>([]);
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

  const saveChangeHandler = async (id: string) => {
    await fetch(`http://localhost:4000/api/foods${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodNameEdited: foodNameEdited,
        categorySelected: categorySelected,
        ingredientsEdited: ingredientsEdited,
        priceEdited: priceEdited,
      }),
    });

    await getFoods();
    alert("Dish is being updated to the menu!");
  };

  const deleteFoodHandler = async (id: string) => {
    if (confirm("Are you sure you want to delete this food?")) {
      try {
        const response = await fetch(`http://localhost:4000/api/foods/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `Delete failed with status ${response.status}: ${errorText}`
          );
          return;
        }

        const resultText = await response.text();
        console.log(`Delete successful, ${resultText}`);
        await getFoods();
        setEditIsOpen(false);
      } catch (error) {
        console.error("Network or unexpected error:", error);
      }
    }
  };
  const foodNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFoodNameEdited(e.target.value);
  };
  const categoryChangeHandler = (value: string) => {
    console.log("SELECT VALUE", value);
    setCategorySelected(value);
  };
  const ingredientsChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIngredientsEdited(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceEdited(Number(e.target.value));
  };

  return (
    <div>
      <Dialog open={editIsOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="absolute w-11 h-11 rounded-full bottom-5 right-5"
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

          <div>
            <div className="flex gap-4 my-3">
              <Label
                htmlFor="foodName"
                className="w-30 text-xs leading-4 font-normal text-muted-foreground flex items-start"
              >
                Dish name
              </Label>
              <Input
                id="foodName"
                name="foodName"
                type="text"
                className="text-sm leading-5 py-2"
                defaultValue={foodTitle}
                onChange={foodNameChangeHandler}
              />
            </div>

            <div className="flex gap-4 my-3">
              <Label
                htmlFor="category"
                className="w-30 text-xs leading-4 font-normal text-muted-foreground flex items-start"
              >
                Dish category
              </Label>
              <Select onValueChange={categoryChangeHandler}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>All Dishes</SelectLabel>

                    {categories.map((el) => (
                      <SelectItem value={el._id} key={el._id}>
                        {el.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 my-3">
              <Label
                htmlFor="ingredients"
                className="w-30 text-xs leading-4 font-normal text-muted-foreground flex items-start"
              >
                Ingredients
              </Label>
              <Textarea
                id="ingredients"
                name="ingredients"
                className="text-sm leading-5 h-20"
                defaultValue={foodIngredients}
                onChange={ingredientsChangeHandler}
              />
            </div>

            <div className="flex gap-4 my-3">
              <Label
                htmlFor="price"
                className="w-30 text-xs leading-4 font-normal text-muted-foreground flex items-start"
              >
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                className="text-sm leading-5 py-2"
                defaultValue={foodPrice}
                onChange={priceChangeHandler}
              />
            </div>

            <div className="flex gap-4 my-3">
              <Label
                htmlFor="image"
                className="w-30 text-xs leading-4 font-normal text-muted-foreground flex items-start"
              >
                Image
              </Label>

              {foodImage ? (
                <div className="w-72 h-29 rounded-md relative overflow-hidden">
                  <Image
                    src={foodImage}
                    alt="imagePreview"
                    width={288}
                    height={116}
                    objectFit="cover"
                    unoptimized
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="absolute w-9 h-9 rounded-full right-2 top-2"
                    onClick={() => {
                      setImagePreview("");
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
                    // onChange={}
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
                onClick={() => deleteFoodHandler(foodId)}
              >
                <LuTrash size={16} className="text-destructive" />
              </Button>

              <Button
                type="button"
                size={"lg"}
                className="w-fit leading-5 py-2.5 px-4"
                onClick={() => saveChangeHandler(foodId)}
              >
                Save changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
