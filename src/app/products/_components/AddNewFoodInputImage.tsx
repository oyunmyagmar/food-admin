"use client";

import React, { Dispatch } from "react";
import { Button, Label } from "@/components/ui";
import Image from "next/image";
import { LuImage } from "react-icons/lu";
import { IoCloseOutline } from "react-icons/io5";

export const AddNewFoodInputImage = ({
  image,
  imagePreview,
  setImage,
  fileChangeHandler,
}: {
  image: File | undefined;
  imagePreview: string;
  setImage: Dispatch<React.SetStateAction<File | undefined>>;
  fileChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
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
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={fileChangeHandler}
          />
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-background flex justify-center items-center">
              <LuImage size={16} />
            </div>
            <div className="text-sm leading-5 font-medium text-primary">
              Choose a file or drag & drop it here
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
