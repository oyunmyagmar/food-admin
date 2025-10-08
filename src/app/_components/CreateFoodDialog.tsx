"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Input,
  Textarea,
  Badge,
  Label,
} from "@/components/ui";
import Image from "next/image";
import { LuImage } from "react-icons/lu";
import { LuPen } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

interface Food {
  foodId?: {};
  foodName: string;
  price: number;
  image?: string;
  ingredients: string;
  category?: {};
  createdAt?: Date;
  updated?: Date;
}

export const CreateFoodDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState("");

  const [foodName, setFoodName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();

  const [foods, setFoods] = useState<Food[]>([]);

  function imageChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  }

  const getFoods = async () => {
    const result = await fetch("http://localhost:3000/api/foods");
    const response = await result.json();
    const { data } = response;
    setFoods(data);
  };
  useEffect(() => {
    getFoods();
  }, []);

  const foodNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFoodName(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const ingredientsChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIngredients(e.target.value);
  };

  const createFoodHandler = async () => {
    const result = await fetch("http://localhost:3000/api/foods", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodName, price, ingredients }),
    });
    setFoodName("");
    setPrice(0);
    setIngredients("");
    setIsOpen(false);
    // if (result.ok) {
    await getFoods();
    // }
  };

  return (
    <div>
      <div className="p-5 bg-background rounded-xl">
        <div className="flex flex-wrap gap-4">
          <div className="w-full flex gap-2">
            <p>Appetizers</p>
            <span>(6)</span>
          </div>

          <Dialog open={isOpen}>
            <DialogTrigger asChild>
              <div
                className="w-[270.75px] h-[241px] py-2 px-4 border border-dashed border-red-500 flex flex-col items-center justify-center gap-6 rounded-[20px]"
                onClick={() => setIsOpen(true)}
              >
                <Button
                  type="button"
                  variant="destructive"
                  className="w-10 h-10 rounded-full bg-red-500"
                >
                  <GoPlus size={16} />
                </Button>
                <p className="w-[154px] text-center text-sm leading-5 font-medium text-secondary-foreground">
                  Add new Dish to Appetizers
                </p>
              </div>
            </DialogTrigger>
            <DialogContent className="w-115 gap-6 rounded-xl">
              <DialogHeader className="gap-0">
                <DialogTitle className="flex gap-2.5 items-center mb-4">
                  <p className="flex-1 leading-7 text-foreground">
                    Add new Dish to Appetizers
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
              </DialogHeader>

              <div className="flex gap-6">
                <div className="w-1/2 flex flex-col gap-2">
                  <Label htmlFor="name" className="text-foreground">
                    Food name
                  </Label>
                  <Input
                    id="foodName"
                    name="foodName"
                    type="text"
                    placeholder="Type food name"
                    className="text-sm leading-5 py-2"
                    // defaultValue={foodName}
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
                    // defaultValue="0"
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
                  // defaultValue={ingredients}
                  value={ingredients}
                  onChange={ingredientsChangeHandler}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="image" className="text-foreground">
                  Food image
                </Label>
                {preview ? (
                  <div className="w-full h-[138px] rounded-md relative overflow-hidden">
                    <Image src={preview} alt="" fill objectFit="cover" />
                    <Button
                      type="button"
                      variant="outline"
                      className="absolute w-9 h-9 rounded-full right-2 top-2"
                      onClick={() => {
                        setPreview("");
                      }}
                    >
                      <IoCloseOutline className="size-[16px]" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-[138px] bg-[#2563EB]/5 flex justify-center items-center p-4 rounded-md border border-dashed border-[#2563EB]/20 relative">
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="absolute inset-0 opacity-0"
                      onChange={imageChangeHandler}
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
                  onClick={createFoodHandler}
                  onKeyDown={(e) => e.key === "Enter" && createFoodHandler()}
                >
                  <p className="leading-5">Add Dish</p>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* After Add garch ireh card => edit card */}

          {foods.map((food) => (
            <div
              key={food.foodName}
              className="w-[270.75px] p-4 border border-border rounded-[20px] flex flex-col gap-5"
            >
              <div className="w-[238.75px] h-[129px] rounded-xl relative overflow-hidden">
                <Image src={preview} alt="" fill objectFit="cover" />

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="absolute w-11 h-11 rounded-full bottom-5 right-5"
                    >
                      <LuPen />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dishes info</DialogTitle>
                    </DialogHeader>
                    <div>
                      <p>Dish name</p>
                      <Input></Input>
                    </div>
                    <div>
                      <p>Dish category</p>
                      <Input></Input>
                    </div>
                    <div>
                      <p>Ingredients</p>
                      <Input></Input>
                    </div>
                    <div>
                      <p>Price</p>
                      <Input></Input>
                    </div>
                    <div>
                      <p>Image</p>
                      <Input></Input>
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-destructive"
                      >
                        <LuTrash className="text-destructive" />
                      </Button>
                      <Button type="button">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="text-sm leading-5 font-medium text-red-500 flex-1 items-center">
                    {food.foodName}
                  </div>
                  <div className="text-xs leading-4 text-foreground">
                    ${food.price}
                  </div>
                </div>
                <div className="text-xs leading-4 text-foreground">
                  {food.ingredients}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
