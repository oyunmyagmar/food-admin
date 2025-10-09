"use client";
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
  Badge,
  Label,
} from "@/components/ui";
import { GoPlus } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";

interface FoodCategory {
  categoryId?: {};
  categoryName: string;
  createdAt?: Date;
  updated?: Date;
}

export const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState<string>("");

  const [categories, setCategories] = useState<FoodCategory[]>([]);

  const getCategories = async () => {
    const result = await fetch("http://localhost:4000/api/categories");
    const responseData = await result.json();
    const { data } = responseData;
    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const categoryNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const createCategoryHandler = async () => {
    try {
      await fetch("http://localhost:4000/api/categories", {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName }),
      });
      setCategoryName("");
      setOpen(false);
      // if (result.ok) {
      await getCategories();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteCategoryHandler = async (categoryName: string) => {
  //   await fetch("http://localhost:4000/api/categories", {
  //     method: "DELETE",
  //     mode: "cors",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ categoryName }),
  //   });
  // };

  return (
    <div className="p-6 bg-background rounded-xl">
      <div className="flex flex-wrap gap-3">
        <p className="text-xl leading-7 font-semibold text-foreground w-full">
          Dishes category
        </p>

        {categories.map((category) => (
          <Button
            key={category.categoryName}
            type="button"
            variant={"outline"}
            className="rounded-full px-4 py-2"
          >
            <div className="flex gap-2 items-center">
              <p className="leading-5 text-secondary-foreground">
                {category.categoryName}
              </p>

              <Badge className="rounded-full px-2.5">
                <p className="leading-4 font-semibold">{100}</p>
              </Badge>
              <div
              // onClick={() => deleteCategoryHandler(category.categoryName)}
              >
                <IoCloseOutline />
              </div>
            </div>
          </Button>
        ))}

        <Dialog open={open}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant={"destructive"}
              className="w-9 h-9 rounded-full bg-red-500"
              onClick={() => setOpen(true)}
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
                // defaultValue={categoryName}
                value={categoryName}
                onChange={categoryNameChangeHandler}
              />
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                onClick={createCategoryHandler}
                onKeyDown={(e) => e.key === "Enter" && createCategoryHandler()}
              >
                <p className="leading-5">Add category</p>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
