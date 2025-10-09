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
  Textarea,
  Label,
} from "@/components/ui";
import Image from "next/image";
import { LuPen } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";
import { LuImage } from "react-icons/lu";

export const ChangeFoodDialog = ({ foods, imagePreview }) => {
  return (
    <div>
      {foods.map((food) => (
        <div
          key={food.foodName}
          className="w-[270.75px] p-4 border border-border rounded-[20px] flex flex-col gap-5"
        >
          <div className="w-full h-[129px] rounded-xl relative overflow-hidden">
            <Image
              src={imagePreview}
              alt="imagePreview"
              fill
              objectFit="cover"
            />

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
                    <p className="flex-1 leading-7 text-foreground">
                      Dishes info
                    </p>
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
                      defaultValue={foodName}
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
                    <Input
                      id="category"
                      name="category"
                      type="text"
                      className="text-sm leading-5 py-2"
                      value={category}
                      onChange={categoryChangeHandler}
                    />
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
                      value={ingredients}
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
                      value={price}
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

                    {image ? (
                      <div className="w-full h-29 rounded-md relative overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="imagePreview"
                          fill
                          objectFit="cover"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="absolute w-9 h-9 rounded-full right-2 top-2"
                          onClick={() => {
                            setImage("");
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
                    >
                      <LuTrash size={16} className="text-destructive" />
                    </Button>

                    <Button
                      type="button"
                      size={"lg"}
                      className="w-fit leading-5 py-2.5 px-4"
                    >
                      Save changes
                    </Button>
                  </div>
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
  );
};
