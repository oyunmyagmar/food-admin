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
  Label,
} from "@/components/ui";
import { IoAddOutline } from "react-icons/io5";
import { toast } from "sonner";

export const CreateCategoryDialog = ({
  refetchGetCategories,
}: {
  refetchGetCategories: () => Promise<void>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const categoryNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const createCategoryHandler = async () => {
    if (!categoryName) {
      toast.warning("Category name is required!");
      return;
    }

    try {
      setLoading(true);

      await fetch("http://localhost:4000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName: categoryName }),
      });

      await refetchGetCategories();
      toast.success("New Category added to the menu!");
      setCategoryName("");
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={"destructive"}
          onClick={() => setOpen(true)}
          className="cursor-pointer w-9 h-9 rounded-full bg-red-500"
        >
          <IoAddOutline size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-115 gap-10 rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex gap-2.5 items-center">
            <div className="flex-1 leading-7 text-foreground">
              Add new category
            </div>
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
            value={categoryName}
            onChange={categoryNameChangeHandler}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            disabled={loading}
            onClick={createCategoryHandler}
            size={"lg"}
            className="w-fit px-4"
          >
            Add category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
