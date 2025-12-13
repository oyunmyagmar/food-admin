"use client";

import React from "react";
import { Input, Label } from "@/components/ui";

export const AddNewFoodNameAndPrice = ({
  foodName,
  foodNameChangeHandler,
  price,
  priceChangeHandler,
}: {
  foodName: string;
  foodNameChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  price: number | undefined;
  priceChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
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
  );
};
