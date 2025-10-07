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
  Badge,
  Label,
} from "@/components/ui";
import { GoPlus } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { LuImage } from "react-icons/lu";
import { AdminLayout } from "@/app/_components";
import { LuPen } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";

const ProductsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");
  const [image, setImage] = useState<File | undefined>();

  const [categoryName, setCategoryName] = useState<string>("");

  function imageChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  }
  const categories = [
    "All Dishes",
    "Apetizers",
    "Salads",
    "Pizzas",
    "Lunch favorites",
    "Main dishes",
    "Fish & Sea foods",
    "Brunch",
    "Side dish",
    "Desserts",
    "Beverages",
  ];
  const addFoodHandler = () => {
    console.log({ name, price, ingredients });
    fetch("http://localhost:3000/create-food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, ingredients }),
    });
    setName("");
    setPrice(0);
    setIngredients("");
    // alert("New dish is being added to the menu");
  };

  const addCategoryHandler = () => {
    console.log({ categoryName });
    fetch("http://localhost:3000/create-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName }),
    });
    setCategoryName("");
    // alert("New Category is being added to the menu");
  };

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const ingredientsChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIngredients(e.target.value);
  };
  const categoryNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  return (
    <AdminLayout>
      <div className="h-screen pl-6 pr-10 bg-secondary flex flex-col gap-6">
        <div className="p-6 bg-background rounded-xl">
          <div className="flex flex-wrap gap-3">
            <p className="text-xl leading-7 font-semibold text-foreground w-full">
              Dishes category
            </p>
            {categories.map((category) => (
              <Button
                type="button"
                key={category}
                variant={"outline"}
                className="rounded-full px-4 py-2"
              >
                <div className="flex gap-2 items-center">
                  <p className="leading-5 text-secondary-foreground">
                    {category}
                  </p>
                  <Badge className="rounded-full px-2.5">
                    <p className="leading-4 font-semibold">{100}</p>
                  </Badge>
                </div>
              </Button>
            ))}

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant={"destructive"}
                  className="w-9 h-9 rounded-full bg-red-500"
                  onClick={addCategoryHandler}
                >
                  <GoPlus size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-115 gap-6 rounded-xl">
                <DialogHeader>
                  <DialogTitle className="flex gap-2.5 items-center mb-4">
                    <p className="flex-1 leading-7 text-foreground">
                      Add new category
                    </p>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-9 h-9 rounded-full"
                      onClick={() => setOpen(false)}
                    >
                      <IoCloseOutline size={16} />
                    </Button>
                  </DialogTitle>
                  <DialogDescription className="hidden" />
                </DialogHeader>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="categoryName" className="text-foreground">
                    Category name
                  </Label>
                  <Input
                    id="categoryName"
                    name="categoryName"
                    type="text"
                    placeholder="Type category name..."
                    className="text-sm leading-5 py-2"
                    defaultValue={categoryName}
                    value={categoryName}
                    onChange={categoryNameHandler}
                  />
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" onClick={addCategoryHandler}>
                    <p className="leading-5">Add category</p>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="p-5 bg-background rounded-xl">
          <div className="flex gap-2">
            <p>Appetizers</p>
            <span>(6)</span>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <div className="w-[270.75px] h-[241px] py-2 px-4 border border-dashed border-red-500 flex flex-col items-center justify-center gap-6 rounded-[20px]">
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
                <DialogDescription className="hidden" />
              </DialogHeader>

              <div className="flex gap-6">
                <div className="w-1/2 flex flex-col gap-2">
                  <Label htmlFor="name" className="text-foreground">
                    Food name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Type food name"
                    className="text-sm leading-5 py-2"
                    defaultValue={name}
                    value={name}
                    onChange={nameChangeHandler}
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
                    defaultValue="0"
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
                  defaultValue={ingredients}
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
                  onClick={addFoodHandler}
                  onKeyDown={(e) => e.key === "Enter" && addFoodHandler()}
                >
                  <p className="leading-5">Add Dish</p>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div>Garch ireh card + edit card</div>

          <div className="w-[270.75px] p-4 border border-border rounded-[20px] flex flex-col gap-5">
            <div className="w-[238.75px] h-[129px] rounded-xl relative overflow-hidden">
              <Image src={""} alt="" fill objectFit="cover" />

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
                    <DialogDescription className="hidden" />
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
                  Product Name
                </div>
                <div className="text-xs leading-4 text-foreground">$Pr.Pr</div>
              </div>
              <div className="text-xs leading-4 text-foreground">
                Product Description
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default ProductsPage;
{
  /* <div className="w-[270.75px] h-[241px] py-2 px-4 border border-dashed border-red-500 flex flex-col items-center justify-center gap-6 rounded-[20px]">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-10 h-10 rounded-full bg-red-500"
                >
                  <GoPlus size={16} />
                </Button>
              </DialogTrigger> */
}

{
  /* <DialogContent className="w-[460px] gap-6 rounded-xl"> */
}
{
  /* <DialogHeader className="gap-0"> */
}
{
  /* <DialogTitle className="flex gap-2.5 items-center mb-4">
                    <p className="flex-1 leading-7 text-foreground">
                      Add new Dish to Appetizers
                    </p>
                    <Button
                      variant="secondary"
                      className="w-9 h-9 rounded-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <IoCloseOutline size={16} />
                    </Button>
                  </DialogTitle>
                  <DialogDescription className="hidden" />
                </DialogHeader> */
}

{
  /* <div className="flex gap-6">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-2">
                      Food name
                    </p>
                    <Input
                      type="text"
                      placeholder="Type food name"
                      className="text-sm leading-5 py-2"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-2">
                      Food price
                    </p>
                    <Input
                      type="text"
                      placeholder="Enter price..."
                      className="text-sm leading-5 py-2"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Ingredients
                  </p>
                  <Textarea
                    placeholder="List ingredients..."
                    className="text-sm leading-5 h-[90px] w-full"
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Food image
                  </p>
                  {preview ? (
                    <div className="w-[412px] h-[138px] rounded-md relative overflow-hidden">
                      <Image src={preview} alt="" fill objectFit="cover" />
                      <Button
                        variant="outline"
                        className="absolute w-9 h-9 rounded-full right-2 top-2"
                        onClick={() => {
                          setPreview("");
                        }}
                      >
                        <IoCloseOutline />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-[412px] h-[138px] bg-[#2563EB]/5 flex justify-center items-center p-4 rounded-md border border-dashed border-[#2563EB]/20 relative">
                      <input
                        type="file"
                        onChange={handleImage}
                        className="absolute inset-0 opacity-0"
                      />
                      <div className="flex flex-col justify-center items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-background flex justify-center items-center">
                          <LuImage size={16} />
                        </div>
                        <p>Choose a file or drag & drop it here</p>
                      </div>
                    </div>
                  )}
                </div> */
}

{
  /* <DialogFooter className="mt-6">
                  <Button className="w-[93px] h-10">Add Dish</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> */
}
{
  /* <p className="w-[154px] text-center text-sm leading-5 font-medium text-secondary-foreground">
              Add new Dish to Appetizers
            </p>
          </div> */
}
